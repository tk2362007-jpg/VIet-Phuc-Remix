import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OutfitId, ColorId, SkinToneId, HairStyleId } from '../types';
import { CharacterHair } from './CharacterHair';
import { useCharacterStore } from '../store/useCharacterStore';

export interface Character3DSceneProps {
  gender: 'female' | 'male';
  skinTone: SkinToneId;
  outfitId: OutfitId;
  colorId: ColorId;
  hairStyle?: HairStyleId | string;
  hairColor?: string;
  accessories: string[];
}

const HAIRSTYLE_MAP: Record<string, HairStyleId> = {
  long: 'default_long',
  bun: 'traditional_bun',
  braid: 'braided_crown',
  short: 'short_bob',
  'male-short': 'scholar_parted',
  'male-bun': 'traditional_bun',
  default_long: 'default_long',
  traditional_bun: 'traditional_bun',
  short_bob: 'short_bob',
  braided_crown: 'braided_crown',
  half_up_flowing: 'half_up_flowing',
  scholar_parted: 'scholar_parted'
};

const SKIN_HEX_MAP: Record<SkinToneId, { base: string; blush: string; lips: string }> = {
  fair: { base: '#FAD9C3', blush: '#F87171', lips: '#C84B4E' },
  neutral: { base: '#F2C2A2', blush: '#E88D84', lips: '#BA4346' },
  warm: { base: '#E6B384', blush: '#EA580C', lips: '#A83A3B' },
  tan: { base: '#C28D64', blush: '#B45309', lips: '#8F3132' }
};

const OUTFIT_COLOR_MAP: Record<
  ColorId,
  { primary: string; shade: string; accent: string; trim: string }
> = {
  red: { primary: '#A3262A', shade: '#6B1417', accent: '#C8973E', trim: '#F5EFE6' },
  burgundy: { primary: '#5E1B24', shade: '#380B12', accent: '#D4AF37', trim: '#FAF8F5' },
  cream: { primary: '#F5EFE6', shade: '#D6C8B4', accent: '#A3262A', trim: '#C8973E' },
  yellow: { primary: '#C8973E', shade: '#8A631E', accent: '#5E1B24', trim: '#FAF8F5' },
  blue: { primary: '#2B4A6F', shade: '#182C44', accent: '#C8973E', trim: '#F5EFE6' },
  green: { primary: '#315643', shade: '#1A3326', accent: '#C8973E', trim: '#F5EFE6' },
  black: { primary: '#1E1B18', shade: '#0E0C0B', accent: '#D4AF37', trim: '#FAF8F5' },
  pastel: { primary: '#E8C5C8', shade: '#BD969A', accent: '#A3262A', trim: '#5E1B24' }
};

interface RiggedCharacterModelProps extends Character3DSceneProps {
  rotationY: number;
}

const RiggedCharacterModel: React.FC<RiggedCharacterModelProps> = ({
  gender,
  skinTone,
  outfitId,
  colorId,
  hairStyle,
  hairColor,
  accessories,
  rotationY
}) => {
  const isFemale = gender === 'female';
  const idleBreathing = useCharacterStore((state) => state.idleBreathing);

  // Hierarchical Bone Refs: Root -> Spine -> Chest -> Neck -> Head
  const characterRootRef = useRef<THREE.Group>(null);
  const spineBoneRef = useRef<THREE.Group>(null);
  const chestBoneRef = useRef<THREE.Group>(null);
  const neckBoneRef = useRef<THREE.Group>(null);
  const [headBoneNode, setHeadBoneNode] = useState<THREE.Group | null>(null);

  const skinPalette = SKIN_HEX_MAP[skinTone] || SKIN_HEX_MAP.neutral;
  const outfitPalette = OUTFIT_COLOR_MAP[colorId] || OUTFIT_COLOR_MAP.cream;

  const hasKhanDong = accessories.includes('khan-dong');
  const hasKiengBac = accessories.includes('vong-kieng-bac');
  const hasNgocTrai = accessories.includes('chuoi-ngoc-trai');
  const hasNonQuaiThao = accessories.includes('non-quai-thao');
  const hasSneakers = accessories.includes('sneakers-retro-trang');
  const holdingUmbrella =
    accessories.includes('o-truyen-thong') ||
    accessories.includes('umbrella') ||
    accessories.includes('o');

  const mappedHairStyle: HairStyleId =
    (hairStyle && HAIRSTYLE_MAP[hairStyle]) || (isFemale ? 'default_long' : 'scholar_parted');

  // Calibrated PBR Materials
  const materials = useMemo(() => {
    return {
      skin: new THREE.MeshStandardMaterial({
        color: new THREE.Color(skinPalette.base),
        roughness: 0.62,
        metalness: 0.02
      }),
      blush: new THREE.MeshStandardMaterial({
        color: new THREE.Color(skinPalette.blush),
        roughness: 0.7,
        transparent: true,
        opacity: isFemale ? 0.38 : 0.18
      }),
      lips: new THREE.MeshStandardMaterial({
        color: new THREE.Color(skinPalette.lips),
        roughness: 0.38,
        metalness: 0.04
      }),
      tunicPrimary: new THREE.MeshStandardMaterial({
        color: new THREE.Color(outfitPalette.primary),
        roughness: 0.48,
        metalness: 0.06
      }),
      tunicShade: new THREE.MeshStandardMaterial({
        color: new THREE.Color(outfitPalette.shade),
        roughness: 0.55,
        metalness: 0.04
      }),
      silkPants: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FAF8F5'),
        roughness: 0.42,
        metalness: 0.05
      }),
      goldTrim: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D4AF37'),
        roughness: 0.25,
        metalness: 0.78
      }),
      silverTorque: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E2E8F0'),
        roughness: 0.18,
        metalness: 0.88
      }),
      eyeDark: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1C1411'),
        roughness: 0.2,
        metalness: 0.1
      }),
      pedestalTop: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F3ECE1'),
        roughness: 0.45,
        metalness: 0.08
      }),
      pedestalRim: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C8973E'),
        roughness: 0.3,
        metalness: 0.65
      }),
      umbrellaCanopy: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#991B1E'),
        roughness: 0.52,
        metalness: 0.08,
        side: THREE.DoubleSide
      }),
      bambooShaft: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#5C3D24'),
        roughness: 0.45,
        metalness: 0.12
      }),
      bambooRibs: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D4AF37'),
        roughness: 0.32,
        metalness: 0.65
      }),
      crimsonTassel: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#BE123C'),
        roughness: 0.65,
        metalness: 0.05
      })
    };
  }, [skinPalette, outfitPalette, isFemale]);

  // Idle Breathing & Natural Head Sway Animation on Bone Hierarchy
  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (characterRootRef.current) {
      characterRootRef.current.rotation.y = THREE.MathUtils.lerp(
        characterRootRef.current.rotation.y,
        rotationY,
        Math.min(1, delta * 10)
      );
    }

    if (idleBreathing) {
      const breathWave = Math.sin(t * 2.1);
      const secondaryWave = Math.cos(t * 1.35);

      if (spineBoneRef.current) {
        spineBoneRef.current.position.y = breathWave * 0.018;
      }

      if (chestBoneRef.current) {
        const chestExpand = 1 + breathWave * 0.016;
        chestBoneRef.current.scale.set(chestExpand, 1 + breathWave * 0.01, chestExpand);
        chestBoneRef.current.rotation.x = breathWave * 0.022;
      }

      if (neckBoneRef.current) {
        neckBoneRef.current.rotation.z = secondaryWave * 0.018;
      }

      if (headBoneNode) {
        // Subtle pitch & yaw on the Head bone — the parented <CharacterHair /> moves with it!
        headBoneNode.rotation.x = breathWave * 0.045 - 0.015;
        headBoneNode.rotation.y = Math.sin(t * 0.85) * 0.065;
        headBoneNode.rotation.z = secondaryWave * 0.025;
      }
    } else {
      if (spineBoneRef.current) spineBoneRef.current.position.y = 0;
      if (chestBoneRef.current) {
        chestBoneRef.current.scale.set(1, 1, 1);
        chestBoneRef.current.rotation.x = 0;
      }
      if (neckBoneRef.current) neckBoneRef.current.rotation.z = 0;
      if (headBoneNode) {
        headBoneNode.rotation.set(0, 0, 0);
      }
    }
  });

  const isWideSleeve =
    outfitId === 'ao-tac' ||
    outfitId === 'giao-linh' ||
    outfitId === 'ao-nhat-binh' ||
    outfitId === 'doi-kham';
  const isShortTunic = outfitId === 'ao-ba-ba';

  return (
    <group ref={characterRootRef} position={[0, -1.05, 0]}>
      {/* =====================================================================
          PEDESTAL TURNTABLE
         ===================================================================== */}
      <group position={[0, -0.32, 0]}>
        <mesh material={materials.pedestalTop} receiveShadow>
          <cylinderGeometry args={[0.88, 0.96, 0.14, 48]} />
        </mesh>
        <mesh position={[0, 0.072, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.pedestalRim}>
          <torusGeometry args={[0.86, 0.018, 12, 48]} />
        </mesh>
      </group>

      {/* =====================================================================
          LOWER BODY: SILK TROUSERS & FOOTWEAR
         ===================================================================== */}
      <group position={[0, 0.22, 0]}>
        {/* Left & Right Wide Silk Trousers */}
        <mesh position={[-0.14, 0, 0]} material={materials.silkPants} castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.165, 0.92, 24]} />
        </mesh>
        <mesh position={[0.14, 0, 0]} material={materials.silkPants} castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.165, 0.92, 24]} />
        </mesh>

        {/* Footwear */}
        <mesh
          position={[-0.14, -0.46, 0.06]}
          material={hasSneakers ? materials.silkPants : isFemale ? materials.goldTrim : materials.eyeDark}
          castShadow
        >
          <boxGeometry args={[0.15, 0.08, 0.28]} />
        </mesh>
        <mesh
          position={[0.14, -0.46, 0.06]}
          material={hasSneakers ? materials.silkPants : isFemale ? materials.goldTrim : materials.eyeDark}
          castShadow
        >
          <boxGeometry args={[0.15, 0.08, 0.28]} />
        </mesh>
      </group>

      {/* =====================================================================
          SKELETAL HIERARCHY: SPINE -> CHEST -> NECK -> HEAD BONE
         ===================================================================== */}
      <group ref={spineBoneRef} name="Spine" position={[0, 0.68, 0]}>
        <group ref={chestBoneRef} name="Chest" position={[0, 0.35, 0]}>
          {/* Upper Bodice */}
          <mesh
            position={[0, 0.02, 0]}
            scale={isFemale ? [0.92, 1, 0.76] : [1.14, 1.02, 0.88]}
            material={materials.tunicPrimary}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.24, 0.21, 0.56, 28]} />
          </mesh>

          {/* Flowing Front & Back Tunic Panels (Áo Dài / Cổ Phục) */}
          {!isShortTunic && (
            <>
              {/* Front Tà Áo (Split into 2 parallel panels when outfitId === 'doi-kham') */}
              {outfitId === 'doi-kham' ? (
                <>
                  <mesh
                    position={[-0.145, -0.54, 0.12]}
                    rotation={[-0.04, 0, 0]}
                    material={materials.tunicPrimary}
                    castShadow
                  >
                    <boxGeometry args={[isFemale ? 0.15 : 0.17, 0.86, 0.028]} />
                  </mesh>
                  <mesh
                    position={[0.145, -0.54, 0.12]}
                    rotation={[-0.04, 0, 0]}
                    material={materials.tunicPrimary}
                    castShadow
                  >
                    <boxGeometry args={[isFemale ? 0.15 : 0.17, 0.86, 0.028]} />
                  </mesh>
                </>
              ) : (
                <mesh
                  position={[0, -0.54, 0.12]}
                  rotation={[-0.04, 0, 0]}
                  material={materials.tunicPrimary}
                  castShadow
                >
                  <boxGeometry args={[isFemale ? 0.42 : 0.48, 0.86, 0.028]} />
                </mesh>
              )}
              {/* Back Tà Áo */}
              <mesh
                position={[0, -0.54, -0.12]}
                rotation={[0.04, 0, 0]}
                material={materials.tunicShade}
                castShadow
              >
                <boxGeometry args={[isFemale ? 0.44 : 0.5, 0.86, 0.028]} />
              </mesh>
            </>
          )}

          {/* Nhật Bình Royal Court Details: Rectangular Collar, Ngũ Sắc Sleeve Bands, Loan Phượng Ổ & Thủy Ba Hem */}
          {outfitId === 'ao-nhat-binh' && (
            <group name="NhatBinhRoyalDetails">
              {/* Rectangular Chữ Nhật Collar (Phương Lĩnh) */}
              <mesh position={[-0.085, 0.15, 0.178]} material={materials.goldTrim}>
                <boxGeometry args={[0.09, 0.28, 0.024]} />
              </mesh>
              <mesh position={[0.085, 0.15, 0.178]} material={materials.goldTrim}>
                <boxGeometry args={[0.09, 0.28, 0.024]} />
              </mesh>
              <mesh position={[0, 0.045, 0.18]} material={materials.goldTrim}>
                <boxGeometry args={[0.26, 0.09, 0.026]} />
              </mesh>
              {/* Inner white chest overlap inside collar */}
              <mesh position={[0, 0.18, 0.172]} material={materials.silkPants}>
                <boxGeometry args={[0.09, 0.17, 0.018]} />
              </mesh>
              {/* Center crimson-gold clasps & silk cord tassels */}
              <mesh position={[0, 0.14, 0.196]} material={materials.lips}>
                <sphereGeometry args={[0.022, 12, 12]} />
              </mesh>
              <mesh position={[0, 0.02, 0.196]} material={materials.lips}>
                <sphereGeometry args={[0.024, 12, 12]} />
              </mesh>
              <mesh position={[-0.025, -0.11, 0.188]} rotation={[0, 0, 0.08]} material={materials.lips}>
                <cylinderGeometry args={[0.008, 0.012, 0.24, 10]} />
              </mesh>
              <mesh position={[0.025, -0.11, 0.188]} rotation={[0, 0, -0.08]} material={materials.lips}>
                <cylinderGeometry args={[0.008, 0.012, 0.24, 10]} />
              </mesh>
              {/* Symmetrical Loan Phượng Ổ (Golden Phoenix Medallions) on Tunic */}
              <mesh position={[-0.11, -0.28, 0.138]} rotation={[Math.PI / 2 - 0.04, 0, 0]} material={materials.goldTrim}>
                <cylinderGeometry args={[0.058, 0.058, 0.012, 20]} />
              </mesh>
              <mesh position={[0.11, -0.28, 0.138]} rotation={[Math.PI / 2 - 0.04, 0, 0]} material={materials.goldTrim}>
                <cylinderGeometry args={[0.058, 0.058, 0.012, 20]} />
              </mesh>
              <mesh position={[-0.11, -0.56, 0.148]} rotation={[Math.PI / 2 - 0.04, 0, 0]} material={materials.goldTrim}>
                <cylinderGeometry args={[0.052, 0.052, 0.012, 20]} />
              </mesh>
              <mesh position={[0.11, -0.56, 0.148]} rotation={[Math.PI / 2 - 0.04, 0, 0]} material={materials.goldTrim}>
                <cylinderGeometry args={[0.052, 0.052, 0.012, 20]} />
              </mesh>
              {/* Thủy Ba & Giang Nha Golden Hem Border */}
              <mesh position={[0, -0.88, 0.155]} rotation={[-0.04, 0, 0]} material={materials.goldTrim}>
                <boxGeometry args={[0.43, 0.12, 0.032]} />
              </mesh>
            </group>
          )}

          {/* Giao Lĩnh Đại Việt Details: Y-Shaped Crossed Collar, Pleated Thường Skirt, Đại Đới Sash & Ngọc Bội */}
          {outfitId === 'giao-linh' && (
            <group name="GiaoLinhDaiVietDetails">
              {/* Pleated Thường (Lower Wrap Skirt Layer) */}
              <mesh position={[0, -0.58, 0]} material={materials.silkPants} castShadow receiveShadow>
                <cylinderGeometry args={[0.22, 0.34, 0.84, 28]} />
              </mesh>
              {/* Lotus Gold Hem Trim on Thường */}
              <mesh position={[0, -0.96, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.goldTrim}>
                <torusGeometry args={[0.335, 0.014, 12, 36]} />
              </mesh>
              {/* Right Under-Collar Band */}
              <mesh position={[0.055, 0.21, 0.176]} rotation={[0, 0, 0.56]} material={materials.silkPants}>
                <boxGeometry args={[0.048, 0.22, 0.022]} />
              </mesh>
              {/* Left Over-Collar Band (Giao Lĩnh Hữu Nhẫm: Left overlapping Right) */}
              <mesh position={[0.015, 0.15, 0.184]} rotation={[0, 0, -0.58]} material={materials.goldTrim}>
                <boxGeometry args={[0.058, 0.38, 0.026]} />
              </mesh>
              {/* Wide Silk Waist Sash (Đại Đới) */}
              <mesh position={[0, -0.16, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.lips}>
                <torusGeometry args={[0.215, 0.032, 14, 32]} />
              </mesh>
              <mesh position={[0, -0.16, 0.22]} material={materials.goldTrim}>
                <sphereGeometry args={[0.036, 14, 14]} />
              </mesh>
              {/* Flowing Sash Ribbons */}
              <mesh position={[-0.04, -0.48, 0.21]} rotation={[-0.08, 0, -0.05]} material={materials.goldTrim}>
                <boxGeometry args={[0.045, 0.58, 0.012]} />
              </mesh>
              <mesh position={[0.04, -0.48, 0.21]} rotation={[-0.08, 0, 0.05]} material={materials.goldTrim}>
                <boxGeometry args={[0.045, 0.58, 0.012]} />
              </mesh>
              {/* Celadon Jade Pendant (Ngọc Bội) */}
              <mesh position={[0.12, -0.36, 0.215]}>
                <torusGeometry args={[0.032, 0.009, 12, 24]} />
                <meshStandardMaterial color="#10B981" roughness={0.25} metalness={0.2} />
              </mesh>
            </group>
          )}

          {/* Đối Khâm Multi-Layered Details: Trực Lĩnh Parallel Collar, Inner Yếm Đào, Pleated Hạ Thường, Waist Sash & Ngọc Bội */}
          {outfitId === 'doi-kham' && (
            <group name="DoiKhamLayeringDetails">
              {/* Pleated Hạ Thường (Lower Wrap Skirt Layer visible between parallel panels) */}
              <mesh position={[0, -0.58, 0]} material={materials.silkPants} castShadow receiveShadow>
                <cylinderGeometry args={[0.215, 0.335, 0.84, 28]} />
              </mesh>
              {/* Lotus Gold Hem Trim on Hạ Thường */}
              <mesh position={[0, -0.96, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.goldTrim}>
                <torusGeometry args={[0.33, 0.014, 12, 36]} />
              </mesh>
              {/* Inner Crimson Yếm Đào Bodice exposed in the central chest window */}
              <mesh position={[0, 0.06, 0.168]} material={materials.lips}>
                <boxGeometry args={[0.13, 0.38, 0.02]} />
              </mesh>
              {/* Golden Lotus Emblem on center of Yếm Đào */}
              <mesh position={[0, 0.03, 0.182]} rotation={[Math.PI / 2, 0, 0]} material={materials.goldTrim}>
                <cylinderGeometry args={[0.036, 0.036, 0.01, 16]} />
              </mesh>
              {/* Left & Right Straight Parallel Trực Lĩnh Brocade Collar Bands */}
              <mesh position={[-0.072, -0.12, 0.18]} material={materials.goldTrim}>
                <boxGeometry args={[0.038, 0.78, 0.026]} />
              </mesh>
              <mesh position={[0.072, -0.12, 0.18]} material={materials.goldTrim}>
                <boxGeometry args={[0.038, 0.78, 0.026]} />
              </mesh>
              {/* Delicate Royal Chest Clasp & Silk Bow Tie bridging the two parallel lapels */}
              <mesh position={[0, 0.14, 0.194]} material={materials.goldTrim}>
                <boxGeometry args={[0.14, 0.018, 0.016]} />
              </mesh>
              <mesh position={[0, 0.14, 0.2]} material={materials.lips}>
                <sphereGeometry args={[0.022, 12, 12]} />
              </mesh>
              {/* Inner Waist Sash & Central Court Knot */}
              <mesh position={[0, -0.14, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.goldTrim}>
                <torusGeometry args={[0.21, 0.024, 12, 32]} />
              </mesh>
              {/* Twin Silk Ribbons & Central Jade Pendant (Ngọc Bội) hanging down center opening */}
              <mesh position={[-0.025, -0.46, 0.195]} rotation={[-0.06, 0, -0.03]} material={materials.lips}>
                <boxGeometry args={[0.032, 0.56, 0.01]} />
              </mesh>
              <mesh position={[0.025, -0.46, 0.195]} rotation={[-0.06, 0, 0.03]} material={materials.lips}>
                <boxGeometry args={[0.032, 0.56, 0.01]} />
              </mesh>
              <mesh position={[0, -0.34, 0.21]}>
                <torusGeometry args={[0.03, 0.009, 12, 24]} />
                <meshStandardMaterial color="#10B981" roughness={0.25} metalness={0.2} />
              </mesh>
              {/* Symmetrical Lotus Medallions on Left & Right Parallel Panels */}
              <mesh position={[-0.14, -0.32, 0.138]} rotation={[Math.PI / 2 - 0.04, 0, 0]} material={materials.goldTrim}>
                <cylinderGeometry args={[0.045, 0.045, 0.012, 18]} />
              </mesh>
              <mesh position={[0.14, -0.32, 0.138]} rotation={[Math.PI / 2 - 0.04, 0, 0]} material={materials.goldTrim}>
                <cylinderGeometry args={[0.045, 0.045, 0.012, 18]} />
              </mesh>
              <mesh position={[-0.14, -0.62, 0.148]} rotation={[Math.PI / 2 - 0.04, 0, 0]} material={materials.goldTrim}>
                <cylinderGeometry args={[0.045, 0.045, 0.012, 18]} />
              </mesh>
              <mesh position={[0.14, -0.62, 0.148]} rotation={[Math.PI / 2 - 0.04, 0, 0]} material={materials.goldTrim}>
                <cylinderGeometry args={[0.045, 0.045, 0.012, 18]} />
              </mesh>
            </group>
          )}

          {/* Left & Right Sleeves (Positioned to match shoulder width: female=0.27, male=0.31) */}
          <group
            position={[isFemale ? -0.27 : -0.31, 0.2, 0]}
            rotation={[holdingUmbrella ? 0.16 : 0, 0, holdingUmbrella ? (isFemale ? 0.32 : 0.28) : (isFemale ? 0.22 : 0.2)]}
          >
            <mesh
              position={[0, -0.22, 0]}
              material={materials.tunicPrimary}
              castShadow
            >
              <cylinderGeometry args={[isFemale ? 0.085 : 0.098, isWideSleeve ? 0.18 : isFemale ? 0.075 : 0.088, 0.52, 20]} />
            </mesh>
            {/* Embroidered Brocade Cuff Band on Left Sleeve for Áo Giao Lĩnh & Áo Đối Khâm */}
            {(outfitId === 'giao-linh' || outfitId === 'doi-kham') && (
              <mesh position={[0, -0.42, 0]} material={materials.goldTrim}>
                <cylinderGeometry args={[0.165, 0.182, 0.065, 20]} />
              </mesh>
            )}
            {/* 5-Color Ngũ Hành Sắc Đới Bands on Left Sleeve for Áo Nhật Bình */}
            {outfitId === 'ao-nhat-binh' && (
              <group position={[0, -0.36, 0]}>
                <mesh position={[0, 0.06, 0]}>
                  <cylinderGeometry args={[0.145, 0.152, 0.022, 20]} />
                  <meshStandardMaterial color="#15803D" roughness={0.4} />
                </mesh>
                <mesh position={[0, 0.035, 0]}>
                  <cylinderGeometry args={[0.152, 0.159, 0.022, 20]} />
                  <meshStandardMaterial color="#EAB308" roughness={0.35} metalness={0.3} />
                </mesh>
                <mesh position={[0, 0.01, 0]}>
                  <cylinderGeometry args={[0.159, 0.166, 0.022, 20]} />
                  <meshStandardMaterial color="#1D4ED8" roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.015, 0]}>
                  <cylinderGeometry args={[0.166, 0.173, 0.022, 20]} />
                  <meshStandardMaterial color="#FAF8F5" roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.04, 0]}>
                  <cylinderGeometry args={[0.173, 0.182, 0.024, 20]} />
                  <meshStandardMaterial color="#BE123C" roughness={0.4} />
                </mesh>
              </group>
            )}
            <mesh position={[0, -0.5, 0]} material={materials.skin}>
              <sphereGeometry args={[isFemale ? 0.058 : 0.064, 16, 16]} />
            </mesh>
          </group>

          {!holdingUmbrella ? (
            <group position={[isFemale ? 0.27 : 0.31, 0.2, 0]} rotation={[0, 0, isFemale ? -0.22 : -0.2]}>
              <mesh
                position={[0, -0.22, 0]}
                material={materials.tunicPrimary}
                castShadow
              >
                <cylinderGeometry args={[isFemale ? 0.085 : 0.098, isWideSleeve ? 0.18 : isFemale ? 0.075 : 0.088, 0.52, 20]} />
              </mesh>
              {/* Embroidered Brocade Cuff Band on Right Sleeve for Áo Giao Lĩnh & Áo Đối Khâm */}
              {(outfitId === 'giao-linh' || outfitId === 'doi-kham') && (
                <mesh position={[0, -0.42, 0]} material={materials.goldTrim}>
                  <cylinderGeometry args={[0.165, 0.182, 0.065, 20]} />
                </mesh>
              )}
              {/* 5-Color Ngũ Hành Sắc Đới Bands on Right Sleeve for Áo Nhật Bình */}
              {outfitId === 'ao-nhat-binh' && (
                <group position={[0, -0.36, 0]}>
                  <mesh position={[0, 0.06, 0]}>
                    <cylinderGeometry args={[0.145, 0.152, 0.022, 20]} />
                    <meshStandardMaterial color="#15803D" roughness={0.4} />
                  </mesh>
                  <mesh position={[0, 0.035, 0]}>
                    <cylinderGeometry args={[0.152, 0.159, 0.022, 20]} />
                    <meshStandardMaterial color="#EAB308" roughness={0.35} metalness={0.3} />
                  </mesh>
                  <mesh position={[0, 0.01, 0]}>
                    <cylinderGeometry args={[0.159, 0.166, 0.022, 20]} />
                    <meshStandardMaterial color="#1D4ED8" roughness={0.4} />
                  </mesh>
                  <mesh position={[0, -0.015, 0]}>
                    <cylinderGeometry args={[0.166, 0.173, 0.022, 20]} />
                    <meshStandardMaterial color="#FAF8F5" roughness={0.4} />
                  </mesh>
                  <mesh position={[0, -0.04, 0]}>
                    <cylinderGeometry args={[0.173, 0.182, 0.024, 20]} />
                    <meshStandardMaterial color="#BE123C" roughness={0.4} />
                  </mesh>
                </group>
              )}
              <mesh position={[0, -0.5, 0]} material={materials.skin}>
                <sphereGeometry args={[isFemale ? 0.058 : 0.064, 16, 16]} />
              </mesh>
            </group>
          ) : (
            /* HOLDING UMBRELLA SKELETAL POSE: BENT RIGHT ARM & LINKED 3D UMBRELLA */
            <group position={[isFemale ? 0.25 : 0.29, 0.18, 0.02]}>
              {/* Upper arm sleeve angled downward-forward */}
              <group rotation={[-0.45, -0.15, isFemale ? -0.42 : -0.38]}>
                <mesh position={[0, -0.14, 0]} material={materials.tunicPrimary} castShadow>
                  <cylinderGeometry args={[isFemale ? 0.085 : 0.098, isFemale ? 0.08 : 0.092, 0.28, 20]} />
                </mesh>
                {/* Elbow joint flexing upward-inward toward umbrella shaft */}
                <group position={[0, -0.28, 0]} rotation={[1.52, 0.18, 0.22]}>
                  <mesh position={[0, -0.13, 0]} material={materials.tunicPrimary} castShadow>
                    <cylinderGeometry args={[isFemale ? 0.08 : 0.092, isWideSleeve ? 0.16 : (isFemale ? 0.075 : 0.086), 0.26, 20]} />
                  </mesh>
                  {/* Inner silk cuff */}
                  <mesh position={[0, -0.25, 0]} material={materials.silkPants}>
                    <cylinderGeometry args={[isFemale ? 0.076 : 0.088, isFemale ? 0.078 : 0.09, 0.03, 20]} />
                  </mesh>
                  {/* Hand clasping the bamboo shaft */}
                  <mesh position={[0, -0.28, 0]} material={materials.skin} castShadow>
                    <sphereGeometry args={[isFemale ? 0.058 : 0.064, 16, 16]} />
                  </mesh>

                  {/* ==============================================================
                      3D TRADITIONAL VIETNAMESE UMBRELLA (SEAMLESSLY MOUNTED IN HAND)
                     ============================================================== */}
                  <group position={[0, -0.28, 0]} rotation={[-1.25, 0, 0.28]}>
                    {/* Bamboo shaft passing through hand */}
                    <mesh position={[0, 0.32, 0]} material={materials.bambooShaft} castShadow>
                      <cylinderGeometry args={[0.012, 0.014, 1.48, 16]} />
                    </mesh>
                    {/* Brass collar spacers */}
                    <mesh position={[0, -0.06, 0]} material={materials.goldTrim}>
                      <cylinderGeometry args={[0.016, 0.016, 0.02, 16]} />
                    </mesh>
                    <mesh position={[0, 0.06, 0]} material={materials.goldTrim}>
                      <cylinderGeometry args={[0.016, 0.016, 0.02, 16]} />
                    </mesh>
                    {/* Lower bamboo root handle hook */}
                    <mesh position={[-0.035, -0.38, 0]} rotation={[0, 0, Math.PI / 4]} material={materials.bambooShaft}>
                      <torusGeometry args={[0.045, 0.012, 10, 24, Math.PI]} />
                    </mesh>
                    {/* Crimson silk tassel hanging from handle */}
                    <group position={[-0.065, -0.42, 0]}>
                      <mesh material={materials.goldTrim}>
                        <sphereGeometry args={[0.012, 10, 10]} />
                      </mesh>
                      <mesh position={[0, -0.07, 0]} material={materials.crimsonTassel}>
                        <cylinderGeometry args={[0.01, 0.02, 0.12, 12]} />
                      </mesh>
                    </group>

                    {/* Umbrella Canopy sheltered majestically above head */}
                    <group position={[0, 0.98, 0]} rotation={[0.08, 0, -0.08]}>
                      {/* Top wooden ferrule & finial cap */}
                      <mesh position={[0, 0.08, 0]} material={materials.goldTrim}>
                        <coneGeometry args={[0.026, 0.08, 16]} />
                      </mesh>
                      {/* Flared conical silk canopy */}
                      <mesh material={materials.umbrellaCanopy} castShadow receiveShadow>
                        <coneGeometry args={[0.54, 0.18, 32, 1, true]} />
                      </mesh>
                      {/* Canopy underside rib ring */}
                      <mesh position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.bambooRibs}>
                        <torusGeometry args={[0.535, 0.008, 8, 36]} />
                      </mesh>
                      {/* Radiating golden bamboo ribs */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                        <mesh
                          key={deg}
                          position={[0, -0.02, 0]}
                          rotation={[0, (deg * Math.PI) / 180, 0.18]}
                          material={materials.bambooRibs}
                        >
                          <cylinderGeometry args={[0.004, 0.004, 0.52, 6]} />
                        </mesh>
                      ))}
                    </group>
                  </group>
                </group>
              </group>
            </group>
          )}

          {/* Standing Mandarin Collar / Inner White Collar Layer */}
          <mesh
            position={[0, 0.33, 0]}
            material={
              outfitId === 'ao-nhat-binh' ||
              outfitId === 'giao-linh' ||
              outfitId === 'doi-kham'
                ? materials.silkPants
                : materials.tunicPrimary
            }
          >
            <cylinderGeometry args={[isFemale ? 0.115 : 0.126, isFemale ? 0.125 : 0.138, 0.09, 24]} />
          </mesh>

          {/* Neck Accessories: Kiềng Bạc & Chuỗi Ngọc Trai */}
          {hasKiengBac && (
            <mesh
              position={[0, 0.27, 0.02]}
              rotation={[Math.PI / 2 + 0.22, 0, 0]}
              material={materials.silverTorque}
            >
              <torusGeometry args={[0.145, 0.016, 14, 32]} />
            </mesh>
          )}
          {hasNgocTrai && (
            <mesh
              position={[0, 0.23, 0.04]}
              rotation={[Math.PI / 2 + 0.32, 0, 0]}
              material={materials.silkPants}
            >
              <torusGeometry args={[0.16, 0.014, 12, 28]} />
            </mesh>
          )}

          {/* NECK BONE */}
          <group ref={neckBoneRef} name="Neck" position={[0, 0.36, 0]}>
            <mesh position={[0, 0.06, 0]} material={materials.skin} castShadow>
              <cylinderGeometry args={[isFemale ? 0.095 : 0.11, isFemale ? 0.105 : 0.12, 0.18, 20]} />
            </mesh>

            {/* ===============================================================
                HEAD BONE NODE ('Head')
                The <CharacterHair /> component is portaled directly into this
                Head bone so any animation on Spine/Chest/Neck/Head moves the
                hair mesh naturally as a unified skeletal unit!
               =============================================================== */}
            <group ref={setHeadBoneNode} name="Head" position={[0, 0.34, 0]}>
              {/* Sculpted Cranium & Jaw */}
              <mesh
                scale={isFemale ? [0.94, 1.06, 0.95] : [1.02, 1.08, 0.98]}
                material={materials.skin}
                castShadow
                receiveShadow
              >
                <sphereGeometry args={[0.3, 32, 28]} />
              </mesh>

              {/* Left & Right Ears */}
              <mesh position={[-0.28, -0.02, -0.02]} scale={[0.45, 0.85, 0.5]} material={materials.skin}>
                <sphereGeometry args={[0.075, 14, 14]} />
              </mesh>
              <mesh position={[0.28, -0.02, -0.02]} scale={[0.45, 0.85, 0.5]} material={materials.skin}>
                <sphereGeometry args={[0.075, 14, 14]} />
              </mesh>

              {/* Facial Features (Eyes, Brows, Nose, Cheek Blush, Lips) */}
              {/* Eyes */}
              <mesh position={[-0.1, 0.01, 0.265]} scale={[1.1, 0.85, 0.5]} material={materials.eyeDark}>
                <sphereGeometry args={[0.032, 16, 16]} />
              </mesh>
              <mesh position={[0.1, 0.01, 0.265]} scale={[1.1, 0.85, 0.5]} material={materials.eyeDark}>
                <sphereGeometry args={[0.032, 16, 16]} />
              </mesh>

              {/* Eye Specular Catchlights */}
              <mesh position={[-0.09, 0.02, 0.282]} material={materials.silkPants}>
                <sphereGeometry args={[0.009, 8, 8]} />
              </mesh>
              <mesh position={[0.11, 0.02, 0.282]} material={materials.silkPants}>
                <sphereGeometry args={[0.009, 8, 8]} />
              </mesh>

              {/* Eyebrows */}
              <mesh
                position={[-0.1, 0.085, 0.262]}
                rotation={[0, 0, isFemale ? 0.08 : -0.06]}
                material={materials.eyeDark}
              >
                <capsuleGeometry args={[0.01, 0.075, 6, 8]} />
              </mesh>
              <mesh
                position={[0.1, 0.085, 0.262]}
                rotation={[0, 0, isFemale ? -0.08 : 0.06]}
                material={materials.eyeDark}
              >
                <capsuleGeometry args={[0.01, 0.075, 6, 8]} />
              </mesh>

              {/* Nose Bridge */}
              <mesh position={[0, -0.03, 0.285]} rotation={[0.18, 0, 0]} material={materials.skin}>
                <capsuleGeometry args={[0.022, 0.055, 8, 10]} />
              </mesh>

              {/* Cheek Blush */}
              <mesh position={[-0.15, -0.05, 0.24]} scale={[1.3, 0.75, 0.4]} material={materials.blush}>
                <sphereGeometry args={[0.042, 12, 12]} />
              </mesh>
              <mesh position={[0.15, -0.05, 0.24]} scale={[1.3, 0.75, 0.4]} material={materials.blush}>
                <sphereGeometry args={[0.042, 12, 12]} />
              </mesh>

              {/* Lips */}
              <mesh
                position={[0, -0.125, 0.258]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[0.8, 1, 0.6]}
                material={materials.lips}
              >
                <capsuleGeometry args={[0.018, 0.055, 8, 12]} />
              </mesh>

              {/* Optional Head Turban (Khăn Đóng) attached to Head Bone */}
              {hasKhanDong && (
                <group position={[0, 0.16, 0]} rotation={[-0.08, 0, 0]}>
                  <mesh material={materials.eyeDark} castShadow>
                    <torusGeometry args={[0.255, 0.085, 18, 36]} />
                  </mesh>
                  <mesh position={[0, 0.02, 0.01]} material={materials.goldTrim}>
                    <torusGeometry args={[0.262, 0.012, 10, 32]} />
                  </mesh>
                </group>
              )}

              {/* Optional Nón Quai Thao attached directly to Head Bone */}
              {hasNonQuaiThao && (
                <group
                  name="Accessory_NonQuaiThao"
                  position={[0, isFemale ? 0.20 : 0.21, 0]}
                  rotation={[-0.03, 0, 0]}
                  scale={[1.8, 1.2, 1.8]}
                >
                  <mesh material={materials.pedestalTop} castShadow>
                    <cylinderGeometry args={[0.34, 0.34, 0.03, 32]} />
                  </mesh>
                  <mesh position={[0, 0.02, 0]} material={materials.goldTrim}>
                    <cylinderGeometry args={[0.16, 0.16, 0.015, 24]} />
                  </mesh>
                </group>
              )}

              {/* DYNAMIC <CharacterHair /> PARENTED TO HEAD BONE */}
              {headBoneNode && (
                <CharacterHair
                  headBone={headBoneNode}
                  hairStyle={mappedHairStyle}
                  hairColor={hairColor}
                  hasKhanDong={hasKhanDong || hasNonQuaiThao}
                />
              )}
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const Character3DScene: React.FC<Character3DSceneProps> = (props) => {
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastClientXRef = useRef(0);
  const [webglLost, setWebglLost] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    lastClientXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastClientXRef.current;
    lastClientXRef.current = e.clientX;
    setRotationY((prev) => prev + deltaX * 0.012);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  if (webglLost) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6 text-center text-xs text-[#68584B]">
        Đang khôi phục ngữ cảnh 3D WebGL...
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      title="Kéo ngang để xoay 360° kiểm tra kiểu tóc & trang phục"
    >
      <Canvas
        shadows
        camera={{ position: [0, 0.25, 3.35], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          canvas.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setWebglLost(true);
          });
          canvas.addEventListener('webglcontextrestored', () => {
            setWebglLost(false);
          });
        }}
      >
        {/* 3-Point Studio Lighting calibrated for Silk & Hair Sheen */}
        <ambientLight intensity={0.78} color="#FFF8F0" />
        {/* Warm Key Light */}
        <directionalLight
          position={[2.6, 3.8, 3.2]}
          intensity={1.45}
          color="#FFF5E4"
          castShadow
        />
        {/* Cool Fill Light */}
        <directionalLight position={[-2.8, 1.6, 2.0]} intensity={0.65} color="#E6EEF8" />
        {/* Back Rim Light to accentuate Hair Specular Highlight */}
        <spotLight
          position={[0, 3.2, -2.8]}
          intensity={1.35}
          angle={0.65}
          penumbra={0.8}
          color="#FDE6B8"
        />

        <RiggedCharacterModel {...props} rotationY={rotationY} />
      </Canvas>

      {/* Subtle 360 Rotation Quick Controls */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#DECBB3] shadow-2xs text-[10px] text-[#594C42]">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setRotationY((r) => r - Math.PI / 4);
          }}
          className="px-1.5 hover:text-[#991B1E] font-bold cursor-pointer"
          title="Xoay trái 45°"
        >
          ⟲
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setRotationY(0);
          }}
          className="px-1 hover:text-[#991B1E] font-medium cursor-pointer"
          title="Về góc chính diện"
        >
          Kéo xoay 360°
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setRotationY(Math.PI);
          }}
          className="px-1 hover:text-[#991B1E] font-semibold text-[#991B1E] cursor-pointer"
          title="Xem mặt sau kiểu tóc"
        >
          Sau lưng
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setRotationY((r) => r + Math.PI / 4);
          }}
          className="px-1.5 hover:text-[#991B1E] font-bold cursor-pointer"
          title="Xoay phải 45°"
        >
          ⟳
        </button>
      </div>
    </div>
  );
};
