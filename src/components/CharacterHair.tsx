import React, { useMemo, useRef, useEffect } from 'react';
import { createPortal, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { HairStyleId } from '../types';
import { useCharacterStore, HAIR_COLOR_SWATCHES } from '../store/useCharacterStore';

export interface CharacterHairProps {
  /**
   * Optional explicit reference to the character's Head bone/node (`THREE.Bone` or `THREE.Object3D`).
   * If omitted, `<CharacterHair />` will either attach via `scene.getObjectByName('Head')`
   * or render directly inside the parent `<group name="Head">` node.
   */
  headBone?: THREE.Object3D | null;
  /**
   * Optional override for hairStyle; defaults to reading from `useCharacterStore`.
   */
  hairStyle?: HairStyleId;
  /**
   * Optional override for hairColor hex; defaults to reading from `useCharacterStore`.
   */
  hairColor?: string;
  /**
   * Whether a traditional turban (`khan-dong`) is currently worn, compressing upper crown volume.
   */
  hasKhanDong?: boolean;
}

/**
 * Creates a customized `THREE.MeshStandardMaterial` tuned specifically for realistic silk hair:
 * - Slightly lower roughness (`0.34`) for natural hair luster without looking like glossy plastic
 * - Very low metalness (`0.06`)
 * - Subtle Kajiya-Kay-inspired anisotropic tangent highlight band injected via `onBeforeCompile`
 */
export function useHairStandardMaterial(baseHex: string) {
  return useMemo(() => {
    const swatch =
      HAIR_COLOR_SWATCHES.find((s) => s.hex.toLowerCase() === baseHex.toLowerCase()) ||
      HAIR_COLOR_SWATCHES[0];

    const baseColor = new THREE.Color(baseHex || '#181311');
    const highlightColor = new THREE.Color(swatch.specularHex || '#4A3C36');

    const mat = new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness: 0.34,
      metalness: 0.06,
      envMapIntensity: 0.55
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uHairHighlightColor = { value: highlightColor };
      shader.vertexShader = `
        varying vec3 vHairLocalPos;
        ${shader.vertexShader}
      `.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vHairLocalPos = position;
        `
      );

      shader.fragmentShader = `
        uniform vec3 uHairHighlightColor;
        varying vec3 vHairLocalPos;
        ${shader.fragmentShader}
      `.replace(
        '#include <dithering_fragment>',
        `
        // Subtle anisotropic-like horizontal halo band across hair crown & locks
        float crownBand = exp(-pow((vHairLocalPos.y - 0.12) * 5.5, 2.0));
        float secondaryBand = exp(-pow((vHairLocalPos.y + 0.18) * 6.5, 2.0)) * 0.45;
        float viewFresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.2);
        vec3 sheenContribution = uHairHighlightColor * (crownBand * 0.22 + secondaryBand * 0.14 + viewFresnel * 0.12);
        gl_FragColor.rgb += sheenContribution;
        #include <dithering_fragment>
        `
      );
    };

    mat.needsUpdate = true;
    return mat;
  }, [baseHex]);
}

/**
 * `<CharacterHair />`
 * Dynamically renders and swaps 3D hair meshes without reloading the scene.
 * Parented directly to the character's `Head` bone so idle breathing and head turns
 * move the hair naturally in real time.
 */
export const CharacterHair: React.FC<CharacterHairProps> = ({
  headBone,
  hairStyle: propHairStyle,
  hairColor: propHairColor,
  hasKhanDong = false
}) => {
  const storeHairStyle = useCharacterStore((state) => state.hairStyle);
  const storeHairColor = useCharacterStore((state) => state.hairColor);
  const idleBreathing = useCharacterStore((state) => state.idleBreathing);

  const activeHairStyle = propHairStyle || storeHairStyle;
  const activeHairColor = propHairColor || storeHairColor;

  const { scene } = useThree();
  const hairRootRef = useRef<THREE.Group>(null);
  const flowingLocksRef = useRef<THREE.Group>(null);
  const transitionScaleRef = useRef(1);

  // Trigger a subtle smooth pop-in interpolation when swapping hair meshes dynamically
  useEffect(() => {
    transitionScaleRef.current = 0.88;
  }, [activeHairStyle]);

  // Primary hair material (MeshStandardMaterial with lower roughness & subtle specular sheen)
  const hairMaterial = useHairStandardMaterial(activeHairColor);

  // Ornamental materials for traditional hairpins, silk ribbons & velvet wraps
  const goldOrnamentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D4AF37'),
        roughness: 0.22,
        metalness: 0.82
      }),
    []
  );

  const pearlMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FFFDF8'),
        roughness: 0.18,
        metalness: 0.12
      }),
    []
  );

  const crimsonSilkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#991B1E'),
        roughness: 0.42,
        metalness: 0.05
      }),
    []
  );

  // Pre-build curved 3D strand tube geometries so mesh swapping is zero-allocation
  const strandGeometries = useMemo(() => {
    // Left & right face-framing silk locks (for default_long, traditional_bun, half_up_flowing)
    const leftSideLockCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.24, 0.18, 0.14),
      new THREE.Vector3(-0.31, 0.02, 0.18),
      new THREE.Vector3(-0.29, -0.18, 0.16),
      new THREE.Vector3(-0.24, -0.36, 0.12)
    ]);
    const rightSideLockCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.24, 0.18, 0.14),
      new THREE.Vector3(0.31, 0.02, 0.18),
      new THREE.Vector3(0.29, -0.18, 0.16),
      new THREE.Vector3(0.24, -0.36, 0.12)
    ]);

    // Swept front bangs curves
    const leftCurtainBangCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.0, 0.28, 0.27),
      new THREE.Vector3(-0.14, 0.24, 0.29),
      new THREE.Vector3(-0.26, 0.12, 0.23),
      new THREE.Vector3(-0.29, -0.02, 0.16)
    ]);
    const rightCurtainBangCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.0, 0.28, 0.27),
      new THREE.Vector3(0.14, 0.24, 0.29),
      new THREE.Vector3(0.26, 0.12, 0.23),
      new THREE.Vector3(0.29, -0.02, 0.16)
    ]);

    // Long back flowing silk panels (for default_long & half_up_flowing)
    const backFlowLeftCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.18, 0.1, -0.18),
      new THREE.Vector3(-0.24, -0.25, -0.24),
      new THREE.Vector3(-0.26, -0.68, -0.22),
      new THREE.Vector3(-0.2, -1.08, -0.16)
    ]);
    const backFlowCenterCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.0, 0.12, -0.22),
      new THREE.Vector3(0.0, -0.28, -0.28),
      new THREE.Vector3(0.0, -0.72, -0.25),
      new THREE.Vector3(0.0, -1.14, -0.19)
    ]);
    const backFlowRightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.18, 0.1, -0.18),
      new THREE.Vector3(0.24, -0.25, -0.24),
      new THREE.Vector3(0.26, -0.68, -0.22),
      new THREE.Vector3(0.2, -1.08, -0.16)
    ]);

    // Short bob inward-curled side locks
    const bobLeftCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.22, 0.22, 0.12),
      new THREE.Vector3(-0.33, 0.04, 0.12),
      new THREE.Vector3(-0.32, -0.14, 0.11),
      new THREE.Vector3(-0.23, -0.24, 0.15)
    ]);
    const bobRightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.22, 0.22, 0.12),
      new THREE.Vector3(0.33, 0.04, 0.12),
      new THREE.Vector3(0.32, -0.14, 0.11),
      new THREE.Vector3(0.23, -0.24, 0.15)
    ]);

    return {
      leftSideLock: new THREE.TubeGeometry(leftSideLockCurve, 24, 0.042, 12, false),
      rightSideLock: new THREE.TubeGeometry(rightSideLockCurve, 24, 0.042, 12, false),
      leftCurtainBang: new THREE.TubeGeometry(leftCurtainBangCurve, 20, 0.055, 12, false),
      rightCurtainBang: new THREE.TubeGeometry(rightCurtainBangCurve, 20, 0.055, 12, false),
      backFlowLeft: new THREE.TubeGeometry(backFlowLeftCurve, 28, 0.13, 14, false),
      backFlowCenter: new THREE.TubeGeometry(backFlowCenterCurve, 28, 0.16, 14, false),
      backFlowRight: new THREE.TubeGeometry(backFlowRightCurve, 28, 0.13, 14, false),
      bobLeft: new THREE.TubeGeometry(bobLeftCurve, 22, 0.075, 12, false),
      bobRight: new THREE.TubeGeometry(bobRightCurve, 22, 0.075, 12, false)
    };
  }, []);

  // Animate smooth mesh swap transition & subtle secondary follow-through on long hair
  useFrame(({ clock }, delta) => {
    if (hairRootRef.current) {
      transitionScaleRef.current = THREE.MathUtils.lerp(
        transitionScaleRef.current,
        1.0,
        Math.min(1, delta * 14)
      );
      const s = transitionScaleRef.current;
      hairRootRef.current.scale.set(s, s, s);
    }

    if (flowingLocksRef.current) {
      if (idleBreathing) {
        const t = clock.getElapsedTime();
        // Secondary subtle sway delayed behind the Head bone's breathing rotation
        flowingLocksRef.current.rotation.x = Math.sin(t * 2.1 - 0.6) * 0.028 + 0.03;
        flowingLocksRef.current.rotation.z = Math.cos(t * 1.4 - 0.4) * 0.015;
      } else {
        flowingLocksRef.current.rotation.x = 0.02;
        flowingLocksRef.current.rotation.z = 0;
      }
    }
  });

  // Resolve target Head bone from prop or scene graph if available
  const resolvedHeadBone = useMemo(() => {
    if (headBone) return headBone;
    const found =
      scene.getObjectByName('Head') ||
      scene.getObjectByName('mixamorigHead') ||
      scene.getObjectByName('HeadBone');
    return found || null;
  }, [headBone, scene]);

  const hairHierarchy = (
    <group ref={hairRootRef} name="CharacterHairRoot">
      {/* Base Cranial Hair Cap (shared across styles, compressed if wearing Khăn Đóng) */}
      <mesh
        position={[0, hasKhanDong ? 0.06 : 0.11, -0.03]}
        scale={hasKhanDong ? [0.98, 0.82, 0.98] : [1.04, 1.02, 1.06]}
        material={hairMaterial}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[0.315, 32, 24]} />
      </mesh>

      {/* =====================================================================
          STYLE 1: DEFAULT_LONG — TÓC DÀI SUÔN MƯỢT TRUYỀN THỐNG
         ===================================================================== */}
      {activeHairStyle === 'default_long' && (
        <group name="HairMesh_DefaultLong">
          {/* Center-parted Curtain Bangs */}
          {!hasKhanDong && (
            <>
              <mesh geometry={strandGeometries.leftCurtainBang} material={hairMaterial} castShadow />
              <mesh geometry={strandGeometries.rightCurtainBang} material={hairMaterial} castShadow />
            </>
          )}

          {/* Soft Face-Framing Side Strands */}
          <mesh geometry={strandGeometries.leftSideLock} material={hairMaterial} castShadow />
          <mesh geometry={strandGeometries.rightSideLock} material={hairMaterial} castShadow />

          {/* Flowing Long Back Silk Cascade (with secondary breathing follow-through) */}
          <group ref={flowingLocksRef} position={[0, 0, 0]}>
            <mesh geometry={strandGeometries.backFlowLeft} material={hairMaterial} castShadow />
            <mesh geometry={strandGeometries.backFlowCenter} material={hairMaterial} castShadow />
            <mesh geometry={strandGeometries.backFlowRight} material={hairMaterial} castShadow />
          </group>
        </group>
      )}

      {/* =====================================================================
          STYLE 2: TRADITIONAL_BUN — TÓC BÚI TRÂM SEN CUNG ĐÌNH
         ===================================================================== */}
      {activeHairStyle === 'traditional_bun' && (
        <group name="HairMesh_TraditionalBun">
          {/* Sleek Side-Swept Bangs */}
          {!hasKhanDong && (
            <>
              <mesh geometry={strandGeometries.leftCurtainBang} material={hairMaterial} castShadow />
              <mesh geometry={strandGeometries.rightCurtainBang} material={hairMaterial} castShadow />
            </>
          )}

          {/* Delicate Temple Wisps */}
          <mesh
            geometry={strandGeometries.leftSideLock}
            material={hairMaterial}
            scale={[0.82, 0.78, 0.82]}
            castShadow
          />
          <mesh
            geometry={strandGeometries.rightSideLock}
            material={hairMaterial}
            scale={[0.82, 0.78, 0.82]}
            castShadow
          />

          {/* Sculpted High/Mid Chignon Bun at Back of Crown */}
          <group position={[0, 0.16, -0.32]}>
            <mesh material={hairMaterial} castShadow>
              <sphereGeometry args={[0.17, 28, 22]} />
            </mesh>
            {/* Braided coil ring wrapping the bun base */}
            <mesh rotation={[Math.PI / 2, 0, 0]} material={hairMaterial} castShadow>
              <torusGeometry args={[0.14, 0.042, 14, 28]} />
            </mesh>

            {/* Golden Lotus Hairpin (Trâm cài sen vàng) skewered through the bun */}
            <group rotation={[0.15, 0.2, -0.52]}>
              <mesh material={goldOrnamentMaterial} castShadow>
                <cylinderGeometry args={[0.012, 0.005, 0.56, 12]} />
              </mesh>
              {/* Lotus Pearl Finial */}
              <mesh position={[0, 0.29, 0]} material={goldOrnamentMaterial}>
                <sphereGeometry args={[0.032, 16, 16]} />
              </mesh>
              <mesh position={[0, 0.33, 0]} material={pearlMaterial}>
                <sphereGeometry args={[0.022, 16, 16]} />
              </mesh>
            </group>
          </group>
        </group>
      )}

      {/* =====================================================================
          STYLE 3: SHORT_BOB — TÓC BOB NGẮN CÁCH TÂN HIỆN ĐẠI
         ===================================================================== */}
      {activeHairStyle === 'short_bob' && (
        <group name="HairMesh_ShortBob">
          {/* Soft Airy Front Fringe */}
          {!hasKhanDong && (
            <group position={[0, 0.22, 0.25]}>
              <mesh position={[-0.09, 0, 0]} rotation={[0.25, 0, 0.12]} material={hairMaterial} castShadow>
                <capsuleGeometry args={[0.038, 0.11, 8, 12]} />
              </mesh>
              <mesh position={[0, 0.01, 0.02]} rotation={[0.28, 0, 0]} material={hairMaterial} castShadow>
                <capsuleGeometry args={[0.036, 0.11, 8, 12]} />
              </mesh>
              <mesh position={[0.09, 0, 0]} rotation={[0.25, 0, -0.12]} material={hairMaterial} castShadow>
                <capsuleGeometry args={[0.038, 0.11, 8, 12]} />
              </mesh>
            </group>
          )}

          {/* Chin-Length Curved Bob Side Volumes */}
          <mesh geometry={strandGeometries.bobLeft} material={hairMaterial} castShadow />
          <mesh geometry={strandGeometries.bobRight} material={hairMaterial} castShadow />

          {/* Rounded Back Bob Bell Silhouette */}
          <mesh position={[0, -0.04, -0.11]} scale={[1.12, 0.95, 1.05]} material={hairMaterial} castShadow>
            <cylinderGeometry args={[0.28, 0.31, 0.42, 28, 1, false, Math.PI * 0.65, Math.PI * 1.7]} />
          </mesh>
        </group>
      )}

      {/* =====================================================================
          STYLE 4: BRAIDED_CROWN — TÓC TẾT VẤN KHĂN NHUNG KINH BẮC
         ===================================================================== */}
      {activeHairStyle === 'braided_crown' && (
        <group name="HairMesh_BraidedCrown">
          {/* Classic Center-Parted Smooth Front */}
          <mesh geometry={strandGeometries.leftCurtainBang} material={hairMaterial} castShadow />
          <mesh geometry={strandGeometries.rightCurtainBang} material={hairMaterial} castShadow />

          {/* Halo Crown Roll (Vấn khăn nhung & tóc tết vòng quanh đỉnh đầu) */}
          {!hasKhanDong && (
            <group position={[0, 0.24, 0.01]} rotation={[1.28, 0, 0]}>
              {/* Main velvet-wrapped hair halo torus */}
              <mesh material={hairMaterial} castShadow>
                <torusGeometry args={[0.285, 0.068, 18, 36]} />
              </mesh>
              {/* Crimson silk brocade accent band interwoven with the crown */}
              <mesh scale={[1.01, 1.01, 0.85]} material={crimsonSilkMaterial}>
                <torusGeometry args={[0.288, 0.048, 14, 32, Math.PI * 1.35]} />
              </mesh>
              {/* Gold filigree pin at crown center */}
              <mesh position={[0, 0.29, 0.04]} material={goldOrnamentMaterial}>
                <sphereGeometry args={[0.026, 14, 14]} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* =====================================================================
          STYLE 5: HALF_UP_FLOWING — TÓC BUỘC NỬA NƠ LỤA NÀNG THƠ
         ===================================================================== */}
      {activeHairStyle === 'half_up_flowing' && (
        <group name="HairMesh_HalfUpFlowing">
          {/* Romantic Curtain Bangs & Face-Framing Locks */}
          {!hasKhanDong && (
            <>
              <mesh geometry={strandGeometries.leftCurtainBang} material={hairMaterial} castShadow />
              <mesh geometry={strandGeometries.rightCurtainBang} material={hairMaterial} castShadow />
            </>
          )}
          <mesh geometry={strandGeometries.leftSideLock} material={hairMaterial} castShadow />
          <mesh geometry={strandGeometries.rightSideLock} material={hairMaterial} castShadow />

          {/* Half-Up Crown Knot & Crimson Silk Ribbon Bow */}
          <group position={[0, 0.14, -0.29]}>
            <mesh material={hairMaterial} castShadow>
              <sphereGeometry args={[0.11, 20, 18]} />
            </mesh>
            {/* Left & Right Silk Bow Loops */}
            <mesh position={[-0.09, 0, -0.04]} rotation={[0, 0, 0.35]} material={crimsonSilkMaterial}>
              <torusGeometry args={[0.055, 0.018, 10, 20]} />
            </mesh>
            <mesh position={[0.09, 0, -0.04]} rotation={[0, 0, -0.35]} material={crimsonSilkMaterial}>
              <torusGeometry args={[0.055, 0.018, 10, 20]} />
            </mesh>
            <mesh position={[0, 0, -0.05]} material={goldOrnamentMaterial}>
              <sphereGeometry args={[0.022, 12, 12]} />
            </mesh>
          </group>

          {/* Flowing Lower Silk Cascade */}
          <group ref={flowingLocksRef} position={[0, -0.04, 0]} scale={[0.92, 0.94, 0.92]}>
            <mesh geometry={strandGeometries.backFlowLeft} material={hairMaterial} castShadow />
            <mesh geometry={strandGeometries.backFlowCenter} material={hairMaterial} castShadow />
            <mesh geometry={strandGeometries.backFlowRight} material={hairMaterial} castShadow />
          </group>
        </group>
      )}

      {/* =====================================================================
          STYLE 6: SCHOLAR_PARTED — TÓC RẼ NGÔI 7/3 NHO NHÃ LỊCH LÃM
         ===================================================================== */}
      {activeHairStyle === 'scholar_parted' && (
        <group name="HairMesh_ScholarParted">
          {!hasKhanDong && (
            <>
              {/* 7/3 Swept Side-Part Pompadour Volume */}
              <mesh
                position={[0.05, 0.28, 0.18]}
                rotation={[0.22, 0.12, -0.24]}
                scale={[1.25, 0.65, 1.05]}
                material={hairMaterial}
                castShadow
              >
                <sphereGeometry args={[0.19, 24, 18]} />
              </mesh>
              {/* Smaller Left Parting Side */}
              <mesh
                position={[-0.17, 0.23, 0.16]}
                rotation={[0.2, -0.15, 0.35]}
                scale={[0.95, 0.55, 0.9]}
                material={hairMaterial}
                castShadow
              >
                <sphereGeometry args={[0.13, 20, 16]} />
              </mesh>
            </>
          )}

          {/* Tapered Sideburns & Nape */}
          <mesh position={[-0.29, 0.02, 0.06]} scale={[0.28, 0.9, 0.45]} material={hairMaterial}>
            <capsuleGeometry args={[0.07, 0.14, 8, 12]} />
          </mesh>
          <mesh position={[0.29, 0.02, 0.06]} scale={[0.28, 0.9, 0.45]} material={hairMaterial}>
            <capsuleGeometry args={[0.07, 0.14, 8, 12]} />
          </mesh>
          <mesh position={[0, -0.04, -0.22]} scale={[1.1, 0.85, 0.65]} material={hairMaterial}>
            <sphereGeometry args={[0.22, 20, 16]} />
          </mesh>
        </group>
      )}
    </group>
  );

  // If a target Head bone/node exists outside our current JSX subtree, portal into it
  // so the hair inherits the Head bone's world matrix during skeletal animations.
  if (resolvedHeadBone) {
    return createPortal(hairHierarchy, resolvedHeadBone);
  }

  return hairHierarchy;
};
