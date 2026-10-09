import React, { useState } from 'react';
import { OutfitId, ColorId, StyleId } from '../types';
import {
  colors as PIXEL_COLORS,
  outfits as PIXEL_OUTFITS,
  accessories as PIXEL_ACCESSORIES,
  PIXEL_BASE_ASSETS
} from '../data/pixelStudioData';

interface PixelCharacterAvatarProps {
  outfitId: OutfitId;
  colorId: ColorId;
  styleId: StyleId;
  accessoryIds: string[];
  isRandomizing?: boolean;
  lastChangedLayer?: 'outfit' | 'color' | 'accessory' | 'style' | null;
}

/**
 * Optional PNG layer loader:
 * When the developer replaces or adds PNG files in `/public/pixel/...`,
 * this layer renders the PNG with `image-rendering: pixelated`.
 * If no external PNG exists yet (404), it seamlessly hides so the built-in
 * dynamic pixel-art layer renders without broken image icons.
 */
const OptionalExternalPngLayer: React.FC<{
  src: string;
  alt: string;
  zIndex: number;
  className?: string;
}> = ({ src, alt, zIndex, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (!PIXEL_BASE_ASSETS.useExternalPngs || errored) return null;

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      onError={() => setErrored(true)}
      style={{
        zIndex,
        imageRendering: 'pixelated',
        opacity: loaded ? 1 : 0
      }}
      className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-200 ${className}`}
    />
  );
};

export const PixelCharacterAvatar: React.FC<PixelCharacterAvatarProps> = ({
  outfitId,
  colorId,
  styleId,
  accessoryIds,
  isRandomizing = false,
  lastChangedLayer = null
}) => {
  const activeColor =
    PIXEL_COLORS.find((c) => c.id === colorId) || PIXEL_COLORS[0];
  const activeOutfit =
    PIXEL_OUTFITS.find((o) => o.id === outfitId) || PIXEL_OUTFITS[0];

  const primaryHex = activeColor.hex;
  const shadeHex = activeColor.secondaryHex;
  const trimHex = activeColor.accentHex;
  const isLightFabric = colorId === 'cream' || colorId === 'pastel';
  const outlineColor = '#231915';

  // Equipped accessories lookup
  const hasKhanDong = accessoryIds.includes('khan-dong');
  const hasNonQuaiThao = accessoryIds.includes('non-quai-thao');
  const hasKiengBac = accessoryIds.includes('vong-kieng-bac');
  const hasNgocTrai = accessoryIds.includes('chuoi-ngoc-trai');
  const hasNonLa = accessoryIds.includes('non-la-truyen-thong');
  const hasSneaker = accessoryIds.includes('sneakers-retro-trang');
  const hasSandal = accessoryIds.includes('sandal-day-manh');
  const hasGuocMoc = accessoryIds.includes('guoc-moc-quai-nhung');

  // Determine active footwear (prioritize user selection, fallback to bare/default slippers)
  const activeFootwear: 'sneaker' | 'sandal' | 'guoc' | 'default' = hasSneaker
    ? 'sneaker'
    : hasGuocMoc
    ? 'guoc'
    : hasSandal
    ? 'sandal'
    : 'default';

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none transition-transform duration-300 ${
        isRandomizing
          ? 'scale-95 animate-pulse'
          : lastChangedLayer === 'outfit'
          ? 'scale-[1.02]'
          : 'scale-100'
      }`}
    >
      {/* Ambient Heritage Halo behind character */}
      <div
        className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full blur-2xl opacity-30 transition-colors duration-500 pointer-events-none"
        style={{ backgroundColor: primaryHex }}
      />

      {/* Decorative Traditional Lattice Circle Behind Avatar */}
      <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-[#D8C7B2]/80 bg-[#FFFDF9]/60 flex items-center justify-center pointer-events-none shadow-inner">
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-dashed border-[#C8973E]/40" />
      </div>

      {/* =====================================================================
          LAYERED PIXEL ART ENGINE (32x44 Crisp Pixel Grid)
          Architecture:
          1. BASE        (/pixel/base.png)
          2. HAIR        (/pixel/hair/default.png)
          3. OUTFIT      (/pixel/outfits/{outfit}.png)
          4. COLOR       (Dynamic palette-mapped pixel layer)
          5. ACCESSORIES (/pixel/accessories/{acc}.png)
          6. FOOTWEAR    (/pixel/footwear/{shoe}.png)
         ===================================================================== */}
      <div className="relative w-56 h-72 sm:w-64 sm:h-80 flex items-center justify-center">
        {/* External PNG Layers (Ready for drop-in PNG replacements in /public/pixel/...) */}
        <OptionalExternalPngLayer
          src={PIXEL_BASE_ASSETS.base}
          alt="Base Character Layer"
          zIndex={10}
        />
        <OptionalExternalPngLayer
          src={activeOutfit.image}
          alt={`Outfit Layer: ${activeOutfit.name}`}
          zIndex={20}
        />
        {accessoryIds.map((accId, idx) => {
          const accObj = PIXEL_ACCESSORIES.find((a) => a.id === accId);
          if (!accObj) return null;
          return (
            <OptionalExternalPngLayer
              key={accObj.id}
              src={accObj.image}
              alt={`Accessory Layer: ${accObj.name}`}
              zIndex={accObj.layer === 'FOOTWEAR' ? 30 : 40 + idx}
            />
          );
        })}

        {/* Built-in Multi-Layer Pixel Art Renderer (32x44 Crisp Grid) */}
        <svg
          viewBox="0 0 32 44"
          shapeRendering="crispEdges"
          className="w-full h-full drop-shadow-[0_8px_16px_rgba(28,25,23,0.14)]"
          aria-label={`Pixel character wearing ${activeOutfit.name} in ${activeColor.name}`}
        >
          {/* GROUND SHADOW */}
          <g id="layer-0-shadow">
            <rect x="9" y="40" width="14" height="2" fill="#D5C6B3" />
            <rect x="11" y="41" width="10" height="1" fill="#C2B09B" />
          </g>

          {/* BACK LAYER OF NÓN QUAI THAO (if equipped, wide flat rim behind head) */}
          {hasNonQuaiThao && (
            <g id="layer-accessory-back-non-quai-thao">
              <rect x="4" y="3" width="24" height="3" fill="#8C6239" />
              <rect x="3" y="4" width="26" height="9" fill="#C8973E" />
              <rect x="5" y="5" width="22" height="7" fill="#A67B2E" />
              {/* Silk tassels hanging on both sides */}
              <rect x="5" y="13" width="1" height="8" fill="#991B1E" />
              <rect x="26" y="13" width="1" height="8" fill="#991B1E" />
              <rect x="5" y="21" width="1" height="2" fill="#D4AF37" />
              <rect x="26" y="21" width="1" height="2" fill="#D4AF37" />
            </g>
          )}

          {/* ===============================================================
              LAYER 1: BASE CHARACTER (Head, Ears, Neck, Hands, Legs)
             =============================================================== */}
          <g id="layer-1-base">
            {/* Back Hair Depth */}
            <rect x="10" y="7" width="12" height="11" fill="#1C1613" />
            <rect x="9" y="9" width="14" height="8" fill="#29201C" />

            {/* Neck */}
            <rect x="14" y="16" width="4" height="3" fill="#E8B89A" />
            <rect x="14" y="16" width="4" height="1" fill="#D49F7E" />

            {/* Face / Head */}
            <rect x="11" y="7" width="10" height="9" fill="#F7D3BA" />
            <rect x="12" y="6" width="8" height="1" fill="#F7D3BA" />
            {/* Ears */}
            <rect x="10" y="11" width="1" height="3" fill="#E8B89A" />
            <rect x="21" y="11" width="1" height="3" fill="#E8B89A" />

            {/* Eyes (Pixel expressive eyes) */}
            <rect x="13" y="11" width="2" height="2" fill="#1C1917" />
            <rect x="17" y="11" width="2" height="2" fill="#1C1917" />
            <rect x="13" y="11" width="1" height="1" fill="#FFFFFF" />
            <rect x="17" y="11" width="1" height="1" fill="#FFFFFF" />

            {/* Eyebrows */}
            <rect x="13" y="9" width="2" height="1" fill="#3B2D26" />
            <rect x="17" y="9" width="2" height="1" fill="#3B2D26" />

            {/* Soft Blush & Rosy Lips */}
            <rect x="12" y="13" width="2" height="1" fill="#ECA198" />
            <rect x="18" y="13" width="2" height="1" fill="#ECA198" />
            <rect x="15" y="14" width="2" height="1" fill="#B83B3E" />

            {/* Arms / Hands Base (visible below sleeves) */}
            <rect x="8" y="25" width="2" height="3" fill="#F7D3BA" />
            <rect x="22" y="25" width="2" height="3" fill="#F7D3BA" />

            {/* Legs / Ankles Base */}
            <rect x="12" y="36" width="3" height="3" fill="#F7D3BA" />
            <rect x="17" y="36" width="3" height="3" fill="#F7D3BA" />
          </g>

          {/* ===============================================================
              LAYER 2: HAIR (Changes slightly with style or headwear)
             =============================================================== */}
          <g id="layer-2-hair">
            {/* Top Crown & Bangs */}
            <rect x="11" y="5" width="10" height="3" fill="#1C1613" />
            <rect x="10" y="6" width="2" height="5" fill="#1C1613" />
            <rect x="20" y="6" width="2" height="5" fill="#1C1613" />
            {/* Side locks framing face */}
            <rect x="10" y="11" width="1" height="7" fill="#29201C" />
            <rect x="21" y="11" width="1" height="7" fill="#29201C" />
            {/* Parted bangs detail */}
            <rect x="12" y="7" width="3" height="2" fill="#1C1613" />
            <rect x="17" y="7" width="3" height="2" fill="#1C1613" />
            {/* Hair shine pixels */}
            <rect x="13" y="6" width="2" height="1" fill="#473933" />
            <rect x="18" y="6" width="2" height="1" fill="#473933" />
            {/* Traditional Hair Bun or Gold Hairpin when Heritage style */}
            {styleId === 'traditional' && !hasKhanDong && (
              <>
                <rect x="13" y="3" width="6" height="2" fill="#1C1613" />
                <rect x="11" y="4" width="2" height="1" fill="#D4AF37" />
                <rect x="19" y="4" width="3" height="1" fill="#D4AF37" />
              </>
            )}
          </g>

          {/* ===============================================================
              LAYER 3 & 4: OUTFIT + DYNAMIC COLOR PALETTE
              (Áo dài | Áo tứ thân | Áo ngũ thân | Áo bà ba)
             =============================================================== */}
          <g
            id="layer-3-4-outfit-and-color"
            className="transition-all duration-300"
          >
            {/* ---------------- OUTFIT 1: ÁO DÀI ---------------- */}
            {outfitId === 'ao-dai' && (
              <g id="outfit-ao-dai">
                {/* Wide Silk Trousers (Quần lụa ống rộng) */}
                <rect
                  x="11"
                  y="27"
                  width="4"
                  height="11"
                  fill={isLightFabric ? '#991B1E' : '#FAF7F2'}
                />
                <rect
                  x="17"
                  y="27"
                  width="4"
                  height="11"
                  fill={isLightFabric ? '#991B1E' : '#FAF7F2'}
                />
                {/* Trouser inner shadow */}
                <rect
                  x="14"
                  y="28"
                  width="1"
                  height="10"
                  fill={isLightFabric ? '#781316' : '#E5DAC9'}
                />
                <rect
                  x="17"
                  y="28"
                  width="1"
                  height="10"
                  fill={isLightFabric ? '#781316' : '#E5DAC9'}
                />

                {/* High Mandarin Collar (Cổ cao) */}
                <rect x="13" y="17" width="6" height="2" fill={primaryHex} />
                <rect x="13" y="17" width="6" height="1" fill={trimHex} />

                {/* Upper Bodice & Fitted Waist */}
                <rect x="11" y="18" width="10" height="6" fill={primaryHex} />
                <rect x="12" y="24" width="8" height="2" fill={shadeHex} />

                {/* Diagonal Snap Seam (Đường khuy chéo ngực phải) */}
                <rect x="15" y="18" width="1" height="1" fill={trimHex} />
                <rect x="17" y="19" width="1" height="1" fill={trimHex} />
                <rect x="18" y="21" width="1" height="1" fill={trimHex} />
                <rect x="18" y="23" width="1" height="1" fill={trimHex} />

                {/* Sleeves */}
                <rect x="9" y="19" width="2" height="6" fill={primaryHex} />
                <rect x="21" y="19" width="2" height="6" fill={primaryHex} />
                <rect x="8" y="22" width="2" height="3" fill={shadeHex} />
                <rect x="22" y="22" width="2" height="3" fill={shadeHex} />

                {/* Flowing Long Tunic Panels (Tà áo dài xẻ tà) */}
                <rect x="12" y="26" width="8" height="10" fill={primaryHex} />
                <rect x="13" y="36" width="6" height="1" fill={primaryHex} />
                {/* Side Slits & Shading */}
                <rect x="12" y="26" width="1" height="10" fill={shadeHex} />
                <rect x="19" y="26" width="1" height="10" fill={shadeHex} />
                {/* Subtle Embroidery Motif on Front Panel */}
                <rect x="15" y="29" width="2" height="2" fill={trimHex} />
                <rect x="14" y="30" width="1" height="1" fill={trimHex} />
                <rect x="17" y="30" width="1" height="1" fill={trimHex} />
                {/* Bottom Hem Border */}
                <rect x="13" y="36" width="6" height="1" fill={trimHex} />
              </g>
            )}

            {/* ---------------- OUTFIT 2: ÁO TỨ THÂN ---------------- */}
            {outfitId === 'ao-tu-than' && (
              <g id="outfit-ao-tu-than">
                {/* Traditional Dark Skirt (Váy đụp / Chân váy lụa đen) */}
                <rect x="10" y="26" width="12" height="12" fill="#231F1D" />
                <rect x="11" y="27" width="1" height="11" fill="#38322E" />
                <rect x="15" y="27" width="1" height="11" fill="#38322E" />
                <rect x="19" y="27" width="1" height="11" fill="#38322E" />

                {/* Inner Bodice (Yếm đào cổ xây) */}
                <rect x="13" y="18" width="6" height="6" fill="#B8292F" />
                <rect x="14" y="17" width="4" height="1" fill="#D4AF37" />

                {/* Outer 4-Panel Robe (Vạt áo tứ thân khoác ngoài) */}
                <rect x="10" y="18" width="3" height="8" fill={primaryHex} />
                <rect x="19" y="18" width="3" height="8" fill={primaryHex} />
                {/* Sleeves */}
                <rect x="8" y="19" width="2" height="6" fill={primaryHex} />
                <rect x="22" y="19" width="2" height="6" fill={primaryHex} />

                {/* Silk Waist Sash (Thắt lưng lụa xanh/vàng thắt nút) */}
                <rect x="11" y="24" width="10" height="2" fill={trimHex} />
                <rect x="15" y="24" width="2" height="5" fill={trimHex} />

                {/* Flowing Layered Front Flaps (Tà tứ thân buộc vạt) */}
                <rect x="11" y="26" width="3" height="9" fill={primaryHex} />
                <rect x="18" y="26" width="3" height="9" fill={primaryHex} />
                <rect x="14" y="26" width="4" height="7" fill={shadeHex} />
              </g>
            )}

            {/* ---------------- OUTFIT 3: ÁO NGŨ THÂN ---------------- */}
            {outfitId === 'ao-ngu-than' && (
              <g id="outfit-ao-ngu-than">
                {/* White Silk Wide Trousers (Quần trắng ống rộng) */}
                <rect x="11" y="30" width="4" height="8" fill="#FAF7F2" />
                <rect x="17" y="30" width="4" height="8" fill="#FAF7F2" />
                <rect x="14" y="31" width="1" height="7" fill="#E2D5C1" />
                <rect x="17" y="31" width="1" height="7" fill="#E2D5C1" />

                {/* Upright Collar (Cổ lập lĩnh vuông vức) */}
                <rect x="13" y="17" width="6" height="2" fill={primaryHex} />
                <rect x="14" y="17" width="4" height="1" fill="#FAF7F2" />

                {/* Loose Regal 5-Panel Silhouette (Phom suông trang nhã) */}
                <rect x="10" y="19" width="12" height="15" fill={primaryHex} />
                <rect x="10" y="20" width="1" height="14" fill={shadeHex} />
                <rect x="21" y="20" width="1" height="14" fill={shadeHex} />

                {/* Wide Dignified Sleeves (Tay áo ngũ thân) */}
                <rect x="8" y="19" width="2" height="7" fill={primaryHex} />
                <rect x="22" y="19" width="2" height="7" fill={primaryHex} />
                <rect x="8" y="25" width="2" height="1" fill="#FAF7F2" />
                <rect x="22" y="25" width="2" height="1" fill="#FAF7F2" />

                {/* 5 Brass/Gold Buttons (Ngũ thường: Nhân, Lễ, Nghĩa, Trí, Tín) */}
                <rect x="15" y="19" width="1" height="1" fill="#D4AF37" />
                <rect x="18" y="20" width="1" height="1" fill="#D4AF37" />
                <rect x="19" y="22" width="1" height="1" fill="#D4AF37" />
                <rect x="19" y="25" width="1" height="1" fill="#D4AF37" />
                <rect x="19" y="28" width="1" height="1" fill="#D4AF37" />

                {/* Center Vertical Seam (Đường trung phùng) */}
                <rect x="16" y="19" width="1" height="15" fill={shadeHex} />
                {/* Curved Hem Highlight */}
                <rect x="11" y="33" width="10" height="1" fill={trimHex} />
              </g>
            )}

            {/* ---------------- OUTFIT 4: ÁO BÀ BA ---------------- */}
            {outfitId === 'ao-ba-ba' && (
              <g id="outfit-ao-ba-ba">
                {/* Black Satin Pants (Quần lụa đen Nam Bộ) */}
                <rect x="11" y="27" width="4" height="11" fill="#1E1B18" />
                <rect x="17" y="27" width="4" height="11" fill="#1E1B18" />
                <rect x="12" y="28" width="1" height="9" fill="#332E2A" />
                <rect x="18" y="28" width="1" height="9" fill="#332E2A" />

                {/* Collarless Round Neckline & Short Split Tunic */}
                <rect x="11" y="18" width="10" height="9" fill={primaryHex} />
                <rect x="14" y="18" width="4" height="1" fill="#F7D3BA" />

                {/* Sleeves */}
                <rect x="9" y="19" width="2" height="6" fill={primaryHex} />
                <rect x="21" y="19" width="2" height="6" fill={primaryHex} />

                {/* Center Button Row */}
                <rect x="15" y="19" width="2" height="8" fill={shadeHex} />
                <rect x="15" y="20" width="1" height="1" fill="#FAF7F2" />
                <rect x="15" y="22" width="1" height="1" fill="#FAF7F2" />
                <rect x="15" y="24" width="1" height="1" fill="#FAF7F2" />

                {/* Two Front Pockets (Hai túi đắp đặc trưng) */}
                <rect x="12" y="24" width="2" height="2" fill={shadeHex} />
                <rect x="18" y="24" width="2" height="2" fill={shadeHex} />
                <rect x="12" y="24" width="2" height="1" fill={trimHex} />
                <rect x="18" y="24" width="2" height="1" fill={trimHex} />
              </g>
            )}

            {/* ---------------- OUTFIT 5: ÁO ĐỐI KHÂM ---------------- */}
            {outfitId === 'doi-kham' && (
              <g id="outfit-doi-kham">
                {/* Pleated Hạ Thường Skirt */}
                <rect x="9" y="26" width="14" height="12" fill="#FAF7F2" />
                <rect x="11" y="27" width="1" height="11" fill="#E2D5C1" />
                <rect x="14" y="27" width="1" height="11" fill="#E2D5C1" />
                <rect x="17" y="27" width="1" height="11" fill="#E2D5C1" />
                <rect x="20" y="27" width="1" height="11" fill="#E2D5C1" />
                <rect x="9" y="37" width="14" height="1" fill="#D4AF37" />

                {/* Inner Yếm Đào Bodice */}
                <rect x="13" y="18" width="6" height="7" fill="#991B1E" />
                <rect x="15" y="20" width="2" height="2" fill="#D4AF37" />
                <rect x="13" y="24" width="6" height="2" fill={trimHex} />

                {/* Wide Sleeves (Quảng tụ) */}
                <rect x="6" y="19" width="4" height="9" fill={primaryHex} />
                <rect x="22" y="19" width="4" height="9" fill={primaryHex} />
                <rect x="6" y="27" width="4" height="1" fill="#D4AF37" />
                <rect x="22" y="27" width="4" height="1" fill="#D4AF37" />

                {/* Two Symmetrical Parallel Front Panels (Hai vạt đối khâm song song) */}
                <rect x="10" y="18" width="3" height="17" fill={primaryHex} />
                <rect x="19" y="18" width="3" height="17" fill={primaryHex} />
                {/* Straight Collar & Edge Trim (Nẹp cổ trực lĩnh song song) */}
                <rect x="12" y="17" width="1" height="18" fill="#D4AF37" />
                <rect x="19" y="17" width="1" height="18" fill="#D4AF37" />
                {/* Chest Tie String */}
                <rect x="13" y="21" width="6" height="1" fill="#D4AF37" />
              </g>
            )}

            {/*Outline frame pixels on shoulders for crisp game sprite feel */}
            {isLightFabric && (
              <>
                <rect x="10" y="18" width="1" height="8" fill={outlineColor} opacity="0.25" />
                <rect x="21" y="18" width="1" height="8" fill={outlineColor} opacity="0.25" />
              </>
            )}
          </g>

          {/* ===============================================================
              LAYER 5: ACCESSORIES (Headwear, Jewelry, Handheld)
             =============================================================== */}
          <g id="layer-5-accessories">
            {/* ACCESSORY: Khăn đóng (Wrapped Headpiece with Chữ Nhất pleats) */}
            {hasKhanDong && (
              <g id="acc-khan-dong">
                <rect x="10" y="4" width="12" height="4" fill={primaryHex} />
                <rect x="9" y="5" width="14" height="2" fill={shadeHex} />
                {/* Chữ Nhất V-fold on forehead */}
                <rect x="13" y="6" width="6" height="1" fill={trimHex} />
                <rect x="15" y="5" width="2" height="1" fill="#D4AF37" />
              </g>
            )}

            {/* ACCESSORY: Nón quai thao front crown strap */}
            {hasNonQuaiThao && (
              <g id="acc-non-quai-thao-front">
                <rect x="10" y="5" width="12" height="2" fill="#8C6239" />
                <rect x="12" y="15" width="8" height="1" fill="#991B1E" />
              </g>
            )}

            {/* ACCESSORY: Kiềng bạc (Silver Torc Necklace) */}
            {hasKiengBac && (
              <g id="acc-kieng-bac">
                <rect x="12" y="18" width="8" height="1" fill="#E2E8F0" />
                <rect x="13" y="19" width="6" height="1" fill="#CBD5E1" />
                <rect x="15" y="19" width="2" height="1" fill="#F8FAFC" />
              </g>
            )}

            {/* ACCESSORY: Chuỗi ngọc trai (Pearl Necklace) */}
            {hasNgocTrai && (
              <g id="acc-ngoc-trai">
                <rect x="12" y="18" width="1" height="1" fill="#FFFDF9" />
                <rect x="13" y="20" width="1" height="1" fill="#FFFDF9" />
                <rect x="15" y="21" width="2" height="1" fill="#FFFDF9" />
                <rect x="18" y="20" width="1" height="1" fill="#FFFDF9" />
                <rect x="19" y="18" width="1" height="1" fill="#FFFDF9" />
              </g>
            )}

            {/* ACCESSORY: Nón lá truyền thống (Held in right hand) */}
            {hasNonLa && (
              <g id="acc-non-la">
                <rect x="22" y="24" width="7" height="2" fill="#E6C994" />
                <rect x="23" y="22" width="5" height="2" fill="#F2DEC0" />
                <rect x="24" y="21" width="3" height="1" fill="#D9B87C" />
                <rect x="25" y="20" width="1" height="1" fill="#991B1E" />
              </g>
            )}
          </g>

          {/* ===============================================================
              LAYER 6: FOOTWEAR (Sandal | Sneaker | Guốc mộc | Default)
             =============================================================== */}
          <g id="layer-6-footwear">
            {activeFootwear === 'sneaker' && (
              <g id="shoe-sneaker">
                {/* Chunky White Gen Z Retro Sneakers with Crimson Accent */}
                <rect x="10" y="38" width="5" height="3" fill="#FFFFFF" />
                <rect x="17" y="38" width="5" height="3" fill="#FFFFFF" />
                <rect x="11" y="39" width="2" height="1" fill="#991B1E" />
                <rect x="19" y="39" width="2" height="1" fill="#991B1E" />
                <rect x="10" y="40" width="5" height="1" fill="#CBD5E1" />
                <rect x="17" y="40" width="5" height="1" fill="#CBD5E1" />
              </g>
            )}

            {activeFootwear === 'sandal' && (
              <g id="shoe-sandal">
                {/* Minimalist Strappy Sandals */}
                <rect x="11" y="38" width="4" height="1" fill="#8C583A" />
                <rect x="17" y="38" width="4" height="1" fill="#8C583A" />
                <rect x="11" y="40" width="4" height="1" fill="#5C3824" />
                <rect x="17" y="40" width="4" height="1" fill="#5C3824" />
              </g>
            )}

            {activeFootwear === 'guoc' && (
              <g id="shoe-guoc-moc">
                {/* Wooden Clogs with Velvet Strap */}
                <rect x="11" y="38" width="4" height="1" fill="#991B1E" />
                <rect x="17" y="38" width="4" height="1" fill="#991B1E" />
                <rect x="11" y="39" width="4" height="2" fill="#B5835A" />
                <rect x="17" y="39" width="4" height="2" fill="#B5835A" />
              </g>
            )}

            {activeFootwear === 'default' && (
              <g id="shoe-default">
                {/* Subtle Silk Slippers */}
                <rect x="11" y="39" width="4" height="2" fill="#3B2D26" />
                <rect x="17" y="39" width="4" height="2" fill="#3B2D26" />
              </g>
            )}
          </g>

          {/* PIXEL SPARKLE OVERLAYS (Active during randomize or item switch) */}
          {(isRandomizing || lastChangedLayer) && (
            <g id="layer-sparkles">
              <rect x="5" y="8" width="1" height="3" fill="#D4AF37" />
              <rect x="4" y="9" width="3" height="1" fill="#D4AF37" />
              <rect x="26" y="12" width="1" height="3" fill="#991B1E" />
              <rect x="25" y="13" width="3" height="1" fill="#991B1E" />
              <rect x="6" y="28" width="2" height="2" fill="#C8973E" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

/**
 * Pixel-art thumbnail preview for each Outfit card and Accessory card.
 * Also supports loading external PNG from `imageSrc` with automatic fallback
 * to crisp pixel-art SVG sprite.
 */
export const PixelItemThumbnail: React.FC<{
  type: 'outfit' | 'accessory';
  itemId: string;
  imageSrc: string;
  tintHex?: string;
}> = ({ type, itemId, imageSrc, tintHex = '#991B1E' }) => {
  const [pngLoaded, setPngLoaded] = useState(false);
  const [pngErrored, setPngErrored] = useState(false);

  return (
    <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
      {PIXEL_BASE_ASSETS.useExternalPngs && !pngErrored && (
        <img
          src={imageSrc}
          alt={itemId}
          onLoad={() => setPngLoaded(true)}
          onError={() => setPngErrored(true)}
          style={{
            imageRendering: 'pixelated',
            opacity: pngLoaded ? 1 : 0
          }}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
      )}

      {!pngLoaded && (
        <svg
          viewBox="0 0 16 16"
          shapeRendering="crispEdges"
          className="w-11 h-11 sm:w-12 sm:h-12"
        >
          {/* OUTFIT THUMBNAILS */}
          {type === 'outfit' && itemId === 'ao-dai' && (
            <g>
              <rect x="6" y="2" width="4" height="1" fill="#D4AF37" />
              <rect x="5" y="3" width="6" height="4" fill={tintHex} />
              <rect x="3" y="3" width="2" height="4" fill={tintHex} />
              <rect x="11" y="3" width="2" height="4" fill={tintHex} />
              <rect x="5" y="7" width="6" height="7" fill={tintHex} />
              <rect x="7" y="8" width="2" height="6" fill="#FAF7F2" />
            </g>
          )}

          {type === 'outfit' && itemId === 'ao-tu-than' && (
            <g>
              <rect x="6" y="3" width="4" height="4" fill="#B8292F" />
              <rect x="4" y="3" width="2" height="6" fill={tintHex} />
              <rect x="10" y="3" width="2" height="6" fill={tintHex} />
              <rect x="5" y="7" width="6" height="2" fill="#D4AF37" />
              <rect x="4" y="9" width="8" height="5" fill="#231F1D" />
              <rect x="6" y="9" width="4" height="4" fill={tintHex} />
            </g>
          )}

          {type === 'outfit' && itemId === 'ao-ngu-than' && (
            <g>
              <rect x="6" y="2" width="4" height="1" fill="#FAF7F2" />
              <rect x="4" y="3" width="8" height="9" fill={tintHex} />
              <rect x="2" y="3" width="2" height="5" fill={tintHex} />
              <rect x="12" y="3" width="2" height="5" fill={tintHex} />
              <rect x="9" y="4" width="1" height="1" fill="#D4AF37" />
              <rect x="9" y="6" width="1" height="1" fill="#D4AF37" />
              <rect x="9" y="8" width="1" height="1" fill="#D4AF37" />
              <rect x="5" y="12" width="6" height="2" fill="#FAF7F2" />
            </g>
          )}

          {type === 'outfit' && itemId === 'ao-ba-ba' && (
            <g>
              <rect x="4" y="3" width="8" height="6" fill={tintHex} />
              <rect x="2" y="4" width="2" height="4" fill={tintHex} />
              <rect x="12" y="4" width="2" height="4" fill={tintHex} />
              <rect x="7" y="4" width="2" height="5" fill="#FAF7F2" />
              <rect x="5" y="7" width="2" height="1" fill="#D4AF37" />
              <rect x="9" y="7" width="2" height="1" fill="#D4AF37" />
              <rect x="5" y="9" width="6" height="5" fill="#1E1B18" />
            </g>
          )}

          {/* ACCESSORY THUMBNAILS */}
          {type === 'accessory' && itemId === 'khan-dong' && (
            <g>
              <rect x="3" y="5" width="10" height="5" fill="#991B1E" />
              <rect x="4" y="4" width="8" height="1" fill="#781316" />
              <rect x="6" y="7" width="4" height="2" fill="#D4AF37" />
            </g>
          )}

          {type === 'accessory' && itemId === 'vong-kieng-bac' && (
            <g>
              <rect x="4" y="4" width="8" height="2" fill="#CBD5E1" />
              <rect x="3" y="6" width="2" height="4" fill="#CBD5E1" />
              <rect x="11" y="6" width="2" height="4" fill="#CBD5E1" />
              <rect x="4" y="10" width="8" height="2" fill="#94A3B8" />
              <rect x="7" y="11" width="2" height="1" fill="#F8FAFC" />
            </g>
          )}

          {type === 'accessory' && itemId === 'non-quai-thao' && (
            <g>
              <rect x="1" y="5" width="14" height="3" fill="#C8973E" />
              <rect x="3" y="4" width="10" height="1" fill="#8C6239" />
              <rect x="2" y="8" width="1" height="5" fill="#991B1E" />
              <rect x="13" y="8" width="1" height="5" fill="#991B1E" />
            </g>
          )}

          {type === 'accessory' && itemId === 'chuoi-ngoc-trai' && (
            <g>
              <rect x="4" y="4" width="2" height="2" fill="#FFFDF9" />
              <rect x="10" y="4" width="2" height="2" fill="#FFFDF9" />
              <rect x="3" y="7" width="2" height="2" fill="#FFFDF9" />
              <rect x="11" y="7" width="2" height="2" fill="#FFFDF9" />
              <rect x="5" y="10" width="2" height="2" fill="#FFFDF9" />
              <rect x="9" y="10" width="2" height="2" fill="#FFFDF9" />
              <rect x="7" y="11" width="2" height="2" fill="#D4AF37" />
            </g>
          )}

          {type === 'accessory' && itemId === 'sandal-day-manh' && (
            <g>
              <rect x="3" y="11" width="10" height="2" fill="#5C3824" />
              <rect x="4" y="9" width="8" height="1" fill="#8C583A" />
              <rect x="5" y="6" width="6" height="1" fill="#8C583A" />
            </g>
          )}

          {type === 'accessory' && itemId === 'sneakers-retro-trang' && (
            <g>
              <rect x="3" y="7" width="9" height="4" fill="#FFFFFF" />
              <rect x="2" y="11" width="11" height="2" fill="#CBD5E1" />
              <rect x="5" y="9" width="4" height="1" fill="#991B1E" />
            </g>
          )}

          {type === 'accessory' && itemId === 'non-la-truyen-thong' && (
            <g>
              <rect x="7" y="3" width="2" height="2" fill="#D9B87C" />
              <rect x="5" y="5" width="6" height="2" fill="#E6C994" />
              <rect x="3" y="7" width="10" height="2" fill="#F2DEC0" />
              <rect x="2" y="9" width="12" height="2" fill="#D9B87C" />
            </g>
          )}

          {type === 'accessory' && itemId === 'guoc-moc-quai-nhung' && (
            <g>
              <rect x="4" y="7" width="7" height="2" fill="#991B1E" />
              <rect x="3" y="9" width="10" height="3" fill="#B5835A" />
              <rect x="4" y="12" width="2" height="2" fill="#8C583A" />
              <rect x="10" y="12" width="2" height="2" fill="#8C583A" />
            </g>
          )}
        </svg>
      )}
    </div>
  );
};
