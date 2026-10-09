import React from 'react';
import { SkinToneId, HairstyleId, OutfitId, ColorId } from '../types';

export type CharacterGender = 'female' | 'male';

export interface CharacterDefaultAvatarProps {
  gender: CharacterGender;
  skinTone?: SkinToneId;
  hairstyle?: HairstyleId;
  outfitId?: OutfitId;
  colorId?: ColorId;
  accessories?: string[];
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'responsive';
  showBadge?: boolean;
  showAttireLabel?: boolean;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  active?: boolean;
}

interface GarmentPalette {
  light: string;
  mid: string;
  dark: string;
  deep: string;
  stroke: string;
  accent: string;
  subAccent: string;
  isDark: boolean;
}

const GARMENT_COLOR_PALETTES: Record<ColorId, GarmentPalette> = {
  red: {
    light: '#C43237',
    mid: '#A3262A',
    dark: '#7D191D',
    deep: '#570F12',
    stroke: '#691417',
    accent: '#E2B45A',
    subAccent: '#FFF8E7',
    isDark: true
  },
  burgundy: {
    light: '#7A2430',
    mid: '#5E1B24',
    dark: '#451118',
    deep: '#2E090E',
    stroke: '#3B0D13',
    accent: '#E2B45A',
    subAccent: '#FAF0CA',
    isDark: true
  },
  yellow: {
    light: '#E3B256',
    mid: '#C8973E',
    dark: '#A37627',
    deep: '#7A5516',
    stroke: '#8F630D',
    accent: '#991B1E',
    subAccent: '#FFF8E7',
    isDark: false
  },
  blue: {
    light: '#3E6594',
    mid: '#2B4A6F',
    dark: '#1D3452',
    deep: '#112136',
    stroke: '#162840',
    accent: '#D9A94C',
    subAccent: '#E8EEF5',
    isDark: true
  },
  green: {
    light: '#43735A',
    mid: '#315643',
    dark: '#213D2F',
    deep: '#13261C',
    stroke: '#193024',
    accent: '#E2B45A',
    subAccent: '#E6F5EE',
    isDark: true
  },
  pastel: {
    light: '#F7E1E4',
    mid: '#E8C5C8',
    dark: '#CFA0A4',
    deep: '#B37E83',
    stroke: '#C49397',
    accent: '#991B1E',
    subAccent: '#FFFBFD',
    isDark: false
  },
  cream: {
    light: '#FFFFFF',
    mid: '#F5EFE6',
    dark: '#E5D8C6',
    deep: '#D4C3AC',
    stroke: '#C9B69C',
    accent: '#C8973E',
    subAccent: '#991B1E',
    isDark: false
  },
  black: {
    light: '#352F2B',
    mid: '#1E1B18',
    dark: '#12100E',
    deep: '#0B0908',
    stroke: '#2A2420',
    accent: '#D4AF37',
    subAccent: '#FAF8F5',
    isDark: true
  }
};

const OUTFIT_SHORT_NAMES: Record<OutfitId, string> = {
  'ao-dai': 'Áo Dài Truyền Thống',
  'ao-tac': 'Áo Tấc (Ngũ Thân Lễ Phục)',
  'ao-ngu-than': 'Áo Ngũ Thân Lập Lĩnh',
  'ao-nhat-binh': 'Áo Nhật Bình Cung Đình',
  'ao-tu-than': 'Áo Tứ Thân Kinh Bắc',
  'ao-ba-ba': 'Áo Bà Ba Nam Bộ',
  'giao-linh': 'Áo Giao Lĩnh Vạt Chéo',
  'vien-linh': 'Áo Viên Lĩnh Cổ Tròn',
  'doi-kham': 'Áo Đối Khâm Khoác Ngoài',
  'ao-tay-chen': 'Áo Ngũ Thân Tay Chẽn'
};

interface SkinPalette {
  base: string;
  highlight: string;
  shade: string;
  deepShade: string;
  blush: string;
  lips: string;
  ears: string;
  neckShade: string;
  nameVi: string;
  undertoneLabel: string;
}

const SKIN_TONE_PALETTES: Record<SkinToneId, SkinPalette> = {
  fair: {
    base: '#FDE0CC',
    highlight: '#FFF5EE',
    shade: '#EDBFA0',
    deepShade: '#DDAA89',
    blush: '#FB7185',
    lips: '#E11D48',
    ears: '#F8C8B0',
    neckShade: '#DEAE8F',
    nameVi: 'Da Sáng Hồng',
    undertoneLabel: 'Sắc tố mát (Cool)'
  },
  neutral: {
    base: '#F5CCB0',
    highlight: '#FFE8D6',
    shade: '#DEAC8D',
    deepShade: '#C99372',
    blush: '#F472B6',
    lips: '#BE123C',
    ears: '#EBBFA3',
    neckShade: '#D69C7A',
    nameVi: 'Da Tự Nhiên',
    undertoneLabel: 'Trung tính (Neutral)'
  },
  warm: {
    base: '#EFC194',
    highlight: '#FCE3C5',
    shade: '#D49D6C',
    deepShade: '#BC8350',
    blush: '#FB923C',
    lips: '#9F1239',
    ears: '#E2B080',
    neckShade: '#C98C58',
    nameVi: 'Da Vàng Châu Á',
    undertoneLabel: 'Ấm Á Đông (Warm)'
  },
  tan: {
    base: '#C7956D',
    highlight: '#DEB088',
    shade: '#A36E46',
    deepShade: '#885630',
    blush: '#EA580C',
    lips: '#881337',
    ears: '#B57F57',
    neckShade: '#915934',
    nameVi: 'Da Bánh Mật',
    undertoneLabel: 'Rám nắng (Deep-Warm)'
  }
};

const SIZE_CLASSES = {
  xs: 'w-8 h-8',
  sm: 'w-11 h-11',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-36 h-36',
  hero: 'w-48 h-48 sm:w-56 sm:h-56',
  responsive: 'w-full h-full'
};

export const CharacterDefaultAvatar: React.FC<CharacterDefaultAvatarProps> = ({
  gender,
  skinTone = 'neutral',
  hairstyle = 'long',
  outfitId = 'ao-dai',
  colorId,
  accessories = [],
  size = 'md',
  showBadge = false,
  showAttireLabel = false,
  className = '',
  onClick,
  interactive = false,
  active = false
}) => {
  const isFemale = gender === 'female';
  const hasKhanDong = accessories.includes('khan-dong');
  const hasKiengBac =
    accessories.includes('vong-kieng-bac') ||
    accessories.includes('kieng-bac');
  const hasNgocTrai =
    accessories.includes('chuoi-ngoc-trai') ||
    accessories.includes('ngoc-trai');
  const hasNonQuaiThao = accessories.includes('non-quai-thao');
  const holdingUmbrella =
    accessories.includes('o-truyen-thong') ||
    accessories.includes('umbrella') ||
    accessories.includes('o');
  const skin = SKIN_TONE_PALETTES[skinTone] || SKIN_TONE_PALETTES.neutral;
  const resolvedColorId: ColorId = colorId || 'cream';
  const garment = GARMENT_COLOR_PALETTES[resolvedColorId] || GARMENT_COLOR_PALETTES.cream;
  const outfitLabel = OUTFIT_SHORT_NAMES[outfitId] || 'Áo Dài Trắng';
  const sizeClass = SIZE_CLASSES[size];

  // SVG Unique clip & gradient ID generator based on props to prevent collisions
  const uid = `${gender}-${skinTone}-${hairstyle}-${outfitId}-${resolvedColorId}-${size}`;

  // Dynamic Y-anchor and proportional offset for 2D Nón Quai Thao
  // Perfectly seated on crown of head without floating or piercing skull
  const nonQuaiThaoY = isFemale
    ? hairstyle === 'bun'
      ? 44.5
      : 45.5
    : 45;

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center select-none ${
        interactive ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      <div
        className={`relative ${sizeClass} rounded-full overflow-hidden transition-all duration-300 ${
          active
            ? 'ring-3 ring-[#991B1E] shadow-md scale-[1.03]'
            : interactive
            ? 'hover:ring-2 hover:ring-[#C8973E] hover:scale-105 shadow-xs'
            : 'shadow-xs'
        }`}
      >
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background Studio Radial Glow */}
            <radialGradient id={`bgGlow-${uid}`} cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="60%" stopColor="#F5EBDD" />
              <stop offset="100%" stopColor={isFemale ? '#E8D2C4' : '#D5C8BA'} />
            </radialGradient>

            {/* Cultural Halo Circular Ring */}
            <linearGradient id={`haloGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8973E" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#991B1E" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#C8973E" stopOpacity="0.5" />
            </linearGradient>

            {/* Face Soft 3D Lighting Gradient */}
            <linearGradient id={`faceGrad-${uid}`} x1="30%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor={skin.highlight} />
              <stop offset="45%" stopColor={skin.base} />
              <stop offset="100%" stopColor={skin.shade} />
            </linearGradient>

            {/* Neck Shade Gradient */}
            <linearGradient id={`neckGrad-${uid}`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor={skin.deepShade} />
              <stop offset="60%" stopColor={skin.neckShade} />
              <stop offset="100%" stopColor={skin.base} />
            </linearGradient>

            {/* Dynamic Garment Silk Gradient */}
            <linearGradient id={`garmentGrad-${uid}`} x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor={garment.light} />
              <stop offset="40%" stopColor={garment.mid} />
              <stop offset="85%" stopColor={garment.dark} />
              <stop offset="100%" stopColor={garment.deep} />
            </linearGradient>

            {/* Gold Accents Gradient */}
            <linearGradient id={`goldGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9DF98" />
              <stop offset="50%" stopColor="#C8973E" />
              <stop offset="100%" stopColor="#8E661C" />
            </linearGradient>

            {/* Natural Black Silk Hair Lustre (Modern Game Character Creator Aesthetic) */}
            <linearGradient id={`hairGrad-${uid}`} x1="25%" y1="0%" x2="75%" y2="100%">
              <stop offset="0%" stopColor="#242129" />
              <stop offset="35%" stopColor="#17151B" />
              <stop offset="75%" stopColor="#100F14" />
              <stop offset="100%" stopColor="#09080B" />
            </linearGradient>

            <linearGradient id={`hairBackDepth-${uid}`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#16141A" />
              <stop offset="50%" stopColor="#0D0C10" />
              <stop offset="100%" stopColor="#080709" />
            </linearGradient>

            <linearGradient id={`hairSheen-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3D3747" stopOpacity="0" />
              <stop offset="50%" stopColor="#685E78" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#3D3747" stopOpacity="0" />
            </linearGradient>

            {/* Silver Torque Gradient (Kiềng Bạc) */}
            <linearGradient id={`silverKieng-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#E2E8F0" />
              <stop offset="60%" stopColor="#94A3B8" />
              <stop offset="85%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            {/* Pearl Sheen Radial Gradient (Chuỗi Ngọc Trai) */}
            <radialGradient id={`pearlGrad-${uid}`} cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#FDFBF7" />
              <stop offset="80%" stopColor="#E8DFD0" />
              <stop offset="100%" stopColor="#D5C5B0" />
            </radialGradient>

            {/* Umbrella Canopy Silk Gradient (Ô Truyền Thống) */}
            <linearGradient id={`umbrellaCanopy-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#BE123C" />
              <stop offset="40%" stopColor="#991B1E" />
              <stop offset="85%" stopColor="#7F1D1D" />
              <stop offset="100%" stopColor="#4C0519" />
            </linearGradient>

            {/* Bamboo Shaft Gradient */}
            <linearGradient id={`umbrellaShaft-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#854D0E" />
              <stop offset="50%" stopColor="#CA8A04" />
              <stop offset="100%" stopColor="#713F12" />
            </linearGradient>

            {/* Nón Quai Thao Palm Leaf Weave Gradient */}
            <linearGradient id={`nonBrimGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF0E1" />
              <stop offset="35%" stopColor="#EAD6B8" />
              <stop offset="70%" stopColor="#DFCCA8" />
              <stop offset="100%" stopColor="#C4AC82" />
            </linearGradient>

            {/* Royal Khăn Vành Cung Đình Huế (Áo Nhật Bình) */}
            <linearGradient id={`khanVanhGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5E1B24" />
              <stop offset="50%" stopColor="#380B12" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>

            {/* Traditional Male Khăn Đóng Brocade Gradient */}
            <linearGradient id={`khanDongMaleGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D2825" />
              <stop offset="45%" stopColor="#1A1715" />
              <stop offset="80%" stopColor="#12100E" />
              <stop offset="100%" stopColor="#241E1B" />
            </linearGradient>
          </defs>

          {/* 1. STUDIO BACKGROUND */}
          <rect width="240" height="240" fill={`url(#bgGlow-${uid})`} />

          {/* Heritage Circular Watermark (Trống đồng subtle ring) */}
          <circle
            cx="120"
            cy="115"
            r="82"
            fill="none"
            stroke={`url(#haloGrad-${uid})`}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <circle
            cx="120"
            cy="115"
            r="92"
            fill="none"
            stroke={`url(#haloGrad-${uid})`}
            strokeWidth="0.8"
            opacity="0.6"
          />

          {isFemale ? (
            /* ===============================================================
               FEMALE AVATAR: NỮ GIỚI DIỆN VIỆT PHỤC THEO MẪU ĐƯỢC CHỌN
               UNIFIED HAIRSTYLE SYSTEM: LONG / BUN / BRAID / SHORT
               =============================================================== */
            <g id="female-model-avatar">
              {/* -------------------------------------------------------------
                  1. BACK HAIR LAYER (BY HAIRSTYLE ID)
                 ------------------------------------------------------------- */}
              {hairstyle === 'long' && (
                <g id="avatar-hair-back-long">
                  {/* Long Flowing Natural Black Back Hair (Cascading smoothly behind neck & shoulders) */}
                  <path
                    d="M 120 46 C 88 46, 72 64, 70 94 C 68 122, 62 158, 58 216 L 86 226 C 90 186, 96 156, 102 138 L 138 138 C 144 156, 150 186, 154 226 L 182 216 C 178 158, 172 122, 170 94 C 168 64, 152 46, 120 46 Z"
                    fill={`url(#hairBackDepth-${uid})`}
                  />
                  {/* Soft outer silk layer behind ears */}
                  <path
                    d="M 73 86 C 69 116, 65 154, 63 206 L 82 212 C 84 172, 90 144, 96 124 L 144 124 C 150 144, 156 172, 158 212 L 177 206 C 175 154, 171 116, 167 86 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                  {/* Deep shadow behind neck so collar & jawline stand out */}
                  <ellipse cx="120" cy="142" rx="28" ry="20" fill="#070609" opacity="0.85" />
                  {/* Subtle silk flow strands in back hair */}
                  <path d="M 71 118 C 68 148, 66 178, 68 208" stroke="#363040" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55" />
                  <path d="M 169 118 C 172 148, 174 178, 172 208" stroke="#363040" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55" />
                </g>
              )}

              {hairstyle === 'bun' && (
                <g id="avatar-hair-back-bun">
                  {!hasKhanDong && !hasNonQuaiThao && (
                    <>
                      {/* Clean, compact modern bun positioned neatly behind upper crown (no hairpins/ornaments) */}
                      <ellipse cx="120" cy="43" rx="25" ry="14" fill={`url(#hairBackDepth-${uid})`} />
                      <ellipse cx="120" cy="42" rx="22" ry="12" fill={`url(#hairGrad-${uid})`} />
                      {/* Subtle natural twisted silk wrap creases on the bun */}
                      <path
                        d="M 102 41 Q 120 34 138 41"
                        stroke="#383242"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.7"
                      />
                      <path
                        d="M 106 45 Q 120 39 134 45"
                        stroke={`url(#hairSheen-${uid})`}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </>
                  )}
                  {/* Sleek back-of-head hair shell swept cleanly upward into the bun */}
                  <path
                    d="M 120 46 C 88 46, 74 64, 74 92 C 74 112, 84 127, 104 132 L 136 132 C 156 127, 166 112, 166 92 C 166 64, 152 46, 120 46 Z"
                    fill={`url(#hairBackDepth-${uid})`}
                  />
                </g>
              )}

              {hairstyle === 'braid' && (
                <g id="avatar-hair-back-braid">
                  {/* Neat back-of-head crown shell gathering smoothly toward the low braids */}
                  <path
                    d="M 120 46 C 88 46, 73 64, 73 93 C 73 114, 83 129, 102 135 L 138 135 C 157 129, 167 114, 167 93 C 167 64, 152 46, 120 46 Z"
                    fill={`url(#hairBackDepth-${uid})`}
                  />
                  <ellipse cx="120" cy="136" rx="22" ry="12" fill="#070609" opacity="0.7" />
                </g>
              )}

              {hairstyle === 'short' && (
                <g id="avatar-hair-back-short">
                  {/* Modern chin-to-nape C-curl Bob back silhouette */}
                  <path
                    d="M 120 46 C 88 46, 72 64, 69 94 C 66 118, 66 136, 76 147 C 84 152, 95 151, 104 146 L 136 146 C 145 151, 156 152, 164 147 C 174 136, 174 118, 171 94 C 168 64, 152 46, 120 46 Z"
                    fill={`url(#hairBackDepth-${uid})`}
                  />
                  <path
                    d="M 72 88 C 68 112, 68 132, 77 144 C 84 149, 93 148, 101 143 L 139 143 C 147 148, 156 149, 163 144 C 172 132, 172 112, 168 88 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                  <ellipse cx="120" cy="141" rx="25" ry="12" fill="#070609" opacity="0.82" />
                  <path d="M 72 108 C 69 124, 71 136, 79 143" stroke="#363040" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
                  <path d="M 168 108 C 171 124, 169 136, 161 143" stroke="#363040" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
                </g>
              )}

              {/* =============================================================
                  FEMALE GARMENT BODY & DETAILS BY OUTFIT ID
                 ============================================================= */}
              <g id={`female-garment-body-${outfitId}`}>
                {/* Base Shoulder & Torso Silhouette */}
                <path
                  d={
                    outfitId === 'ao-tac' || outfitId === 'ao-nhat-binh' || outfitId === 'giao-linh' || outfitId === 'vien-linh'
                      ? 'M 42 240 C 48 178, 76 164, 102 160 L 138 160 C 164 164, 192 178, 198 240 Z'
                      : 'M 52 240 C 56 182, 82 168, 102 162 L 138 162 C 158 168, 184 182, 188 240 Z'
                  }
                  fill={`url(#garmentGrad-${uid})`}
                  stroke={garment.stroke}
                  strokeWidth="1.1"
                />

                {/* 1. ÁO DÀI TRUYỀN THỐNG: Đường ráp lăng mềm mại */}
                {outfitId === 'ao-dai' && (
                  <g id="detail-female-ao-dai">
                    <path d="M 104 162 C 96 182, 80 208, 62 236" stroke={garment.stroke} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.85" />
                    <path d="M 136 162 C 144 182, 160 208, 178 236" stroke={garment.stroke} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.85" />
                    <path d="M 120 164 C 132 169, 142 178, 146 192" stroke={garment.accent} strokeWidth="1" fill="none" opacity="0.7" />
                  </g>
                )}

                {/* 2. ÁO NHẬT BÌNH CUNG ĐÌNH: Cổ vuông to bản + Hoa văn bát bửu + Dây kim tuyến */}
                {outfitId === 'ao-nhat-binh' && (
                  <g id="detail-female-nhat-binh">
                    {/* Inner white/red silk layer at chest */}
                    <path d="M 96 160 L 144 160 L 140 240 L 100 240 Z" fill="#FAF6F0" opacity="0.92" />
                    {/* Left & Right Brocade Panels */}
                    <path d="M 42 240 C 48 178, 76 164, 96 160 L 96 240 Z" fill={`url(#garmentGrad-${uid})`} />
                    <path d="M 198 240 C 192 178, 164 164, 144 160 L 144 240 Z" fill={`url(#garmentGrad-${uid})`} />
                    {/* Rectangular Nhat Binh Gold & Crimson Collar Band (Phi Phong chữ Nhật) */}
                    <path d="M 84 158 L 98 158 L 98 214 L 142 214 L 142 158 L 156 158 L 156 226 L 84 226 Z" fill={`url(#goldGrad-${uid})`} stroke="#781316" strokeWidth="1.2" />
                    {/* Inner decorative border on Nhat Binh collar */}
                    <rect x="88" y="162" width="6" height="58" rx="1" fill="#991B1E" opacity="0.85" />
                    <rect x="146" y="162" width="6" height="58" rx="1" fill="#991B1E" opacity="0.85" />
                    <rect x="96" y="216.5" width="48" height="6" rx="1" fill="#991B1E" opacity="0.85" />
                    {/* Phoenix / Floral medallions */}
                    <circle cx="91" cy="182" r="2.8" fill="#F9DF98" />
                    <circle cx="149" cy="182" r="2.8" fill="#F9DF98" />
                    <circle cx="120" cy="219.5" r="3.2" fill="#F9DF98" />
                    <circle cx="106" cy="219.5" r="2.2" fill="#166534" />
                    <circle cx="134" cy="219.5" r="2.2" fill="#166534" />
                  </g>
                )}

                {/* 3. ÁO TỨ THÂN KINH BẮC: Yếm đào thắm bên trong + Vạt tứ thân khoác ngoài + Thắt lưng lụa */}
                {outfitId === 'ao-tu-than' && (
                  <g id="detail-female-tu-than">
                    {/* Inner Yếm Đào (Crimson/Rose Bodice) */}
                    <path d="M 104 160 L 120 154 L 136 160 L 146 240 L 94 240 Z" fill="#991B1E" stroke="#F9DF98" strokeWidth="0.9" />
                    {/* Yếm neck tie strings */}
                    <path d="M 114 156 L 108 142 M 126 156 L 132 142" stroke="#991B1E" strokeWidth="1.8" strokeLinecap="round" />
                    {/* Yếm gold lotus motif */}
                    <circle cx="120" cy="186" r="4.5" fill="none" stroke="#F9DF98" strokeWidth="1" />
                    <circle cx="120" cy="186" r="1.8" fill="#F9DF98" />
                    {/* Outer lapel folds (Vạt áo tứ thân buông mềm hai bên) */}
                    <path d="M 102 160 L 78 240 L 98 240 L 108 162 Z" fill={garment.dark} stroke={garment.stroke} strokeWidth="0.9" />
                    <path d="M 138 160 L 162 240 L 142 240 L 132 162 Z" fill={garment.dark} stroke={garment.stroke} strokeWidth="0.9" />
                    {/* Silk sash ribbon at lower chest (Ruột tượng / Thắt lưng xanh) */}
                    <rect x="86" y="224" width="68" height="10" rx="3" fill="#146949" stroke="#F9DF98" strokeWidth="0.8" />
                  </g>
                )}

                {/* 4. ÁO BÀ BA NAM BỘ: Cổ tim tròn không bâu + Hàng cúc giữa thân mộc mạc */}
                {outfitId === 'ao-ba-ba' && (
                  <g id="detail-female-ba-ba">
                    {/* Center button placket */}
                    <line x1="120" y1="168" x2="120" y2="240" stroke={garment.stroke} strokeWidth="1.5" />
                    <path d="M 102 162 C 95 184, 78 210, 62 238" stroke={garment.stroke} strokeWidth="1.1" fill="none" opacity="0.7" />
                    <path d="M 138 162 C 145 184, 162 210, 178 238" stroke={garment.stroke} strokeWidth="1.1" fill="none" opacity="0.7" />
                    {/* Pearl/mother-of-pearl buttons along center */}
                    <circle cx="120" cy="176" r="2.3" fill="#FFFDF9" stroke={garment.stroke} strokeWidth="0.7" />
                    <circle cx="120" cy="192" r="2.3" fill="#FFFDF9" stroke={garment.stroke} strokeWidth="0.7" />
                    <circle cx="120" cy="208" r="2.3" fill="#FFFDF9" stroke={garment.stroke} strokeWidth="0.7" />
                    <circle cx="120" cy="224" r="2.3" fill="#FFFDF9" stroke={garment.stroke} strokeWidth="0.7" />
                  </g>
                )}

                {/* 5. ÁO GIAO LĨNH VẠT CHÉO: Cổ giao lĩnh chữ Y vạt trái đè vạt phải + Lót cổ trắng */}
                {outfitId === 'giao-linh' && (
                  <g id="detail-female-giao-linh">
                    {/* Inner white silk under-robe */}
                    <path d="M 102 156 L 120 184 L 138 156 Z" fill="#FAF8F5" stroke="#D6C7B2" strokeWidth="1" />
                    {/* Right lapel under */}
                    <path d="M 138 156 L 106 206 L 116 212 L 146 162 Z" fill={garment.dark} stroke={garment.accent} strokeWidth="0.9" />
                    {/* Left lapel crossing over to right side (Giao lĩnh) */}
                    <path d="M 102 156 L 148 214 L 138 222 L 94 162 Z" fill={garment.mid} stroke={`url(#goldGrad-${uid})`} strokeWidth="1.3" />
                    {/* Side ribbon tie */}
                    <circle cx="144" cy="212" r="2.6" fill="#C8973E" />
                    <path d="M 144 212 Q 154 222 150 236" stroke="#C8973E" strokeWidth="1.5" fill="none" />
                  </g>
                )}

                {/* 6. ÁO VIÊN LĨNH CỔ TRÒN: Cổ tròn ôm sát + Đoàn văn bổ tử / hoa văn ngực + Hàng cúc bên hữu */}
                {outfitId === 'vien-linh' && (
                  <g id="detail-female-vien-linh">
                    <line x1="120" y1="166" x2="120" y2="240" stroke={garment.stroke} strokeWidth="1.1" opacity="0.6" />
                    {/* Right curved overlap seam */}
                    <path d="M 120 163 C 136 168, 146 178, 152 194 L 150 240" stroke={garment.accent} strokeWidth="1.3" fill="none" />
                    {/* Circular Royal Medallion (Đoàn hoa / Đoàn phượng trên ngực) */}
                    <circle cx="120" cy="198" r="16" fill={garment.deep} stroke={`url(#goldGrad-${uid})`} strokeWidth="1.5" />
                    <circle cx="120" cy="198" r="11" fill="none" stroke="#F9DF98" strokeWidth="0.9" strokeDasharray="3 2" />
                    <circle cx="120" cy="198" r="4" fill="#F9DF98" />
                    {/* 3 Gold buttons on right curve */}
                    <circle cx="126" cy="164" r="2.2" fill="#D4AF37" />
                    <circle cx="140" cy="173" r="2.2" fill="#D4AF37" />
                    <circle cx="150" cy="188" r="2.2" fill="#D4AF37" />
                  </g>
                )}

                {/* 7. ÁO ĐỐI KHÂM KHOÁC NGOÀI: Hai vạt song song buông thẳng + Yếm/Áo lót trong tinh khôi */}
                {outfitId === 'doi-kham' && (
                  <g id="detail-female-doi-kham">
                    {/* Inner silk top & embellished chest panel (Mạt ngực) */}
                    <rect x="104" y="160" width="32" height="80" fill="#FAF7F2" />
                    <rect x="104" y="178" width="32" height="62" fill="#991B1E" opacity="0.9" />
                    <line x1="104" y1="178" x2="136" y2="178" stroke="#F9DF98" strokeWidth="1.8" />
                    <circle cx="120" cy="198" r="5" fill="none" stroke="#F9DF98" strokeWidth="1.2" />
                    {/* Parallel vertical borders of Đối Khâm outer cloak */}
                    <rect x="95" y="158" width="9" height="82" fill={`url(#goldGrad-${uid})`} stroke={garment.stroke} strokeWidth="0.8" />
                    <rect x="136" y="158" width="9" height="82" fill={`url(#goldGrad-${uid})`} stroke={garment.stroke} strokeWidth="0.8" />
                    {/* Gold clasp across chest */}
                    <line x1="104" y1="184" x2="136" y2="184" stroke="#F9DF98" strokeWidth="1.5" />
                    <circle cx="104" cy="184" r="2.4" fill="#D4AF37" />
                    <circle cx="136" cy="184" r="2.4" fill="#D4AF37" />
                  </g>
                )}

                {/* 8. ÁO TẤC / ÁO NGŨ THÂN TAY CHẼN / ÁO TAY CHẼN: Đường trung phùng + Vạt chéo + 5 hạt cúc ngũ thường */}
                {(outfitId === 'ao-tac' || outfitId === 'ao-ngu-than' || outfitId === 'ao-tay-chen') && (
                  <g id={`detail-female-${outfitId}`}>
                    {/* Center vertical seam (Đường trung phùng) */}
                    <line x1="120" y1="164" x2="120" y2="240" stroke={garment.stroke} strokeWidth="1.4" />
                    {/* Right diagonal flap (Vạt cả cài bên hữu) */}
                    <path
                      d="M 120 162 C 134 168, 144 177, 150 189 L 148 240"
                      stroke={outfitId === 'ao-tac' ? '#D4AF37' : garment.stroke}
                      strokeWidth="1.5"
                      fill="none"
                    />
                    {/* Wide ceremonial sleeve fold lines for Áo Tấc */}
                    {outfitId === 'ao-tac' && (
                      <>
                        <path d="M 86 176 C 78 198, 70 218, 64 238" stroke={garment.accent} strokeWidth="1.4" fill="none" opacity="0.65" />
                        <path d="M 154 176 C 162 198, 170 218, 176 238" stroke={garment.accent} strokeWidth="1.4" fill="none" opacity="0.65" />
                      </>
                    )}
                    {/* 5 Traditional Brass/Jade Buttons (Ngũ thường cúc) */}
                    <circle cx="123" cy="161" r="2.2" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
                    <circle cx="135" cy="169" r="2.2" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
                    <circle cx="145" cy="182" r="2.2" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
                    <circle cx="148" cy="203" r="2.2" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
                    <circle cx="147.5" cy="224" r="2.2" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
                  </g>
                )}
              </g>

              {/* -------------------------------------------------------------
                  2. LOWER SHOULDER HAIR LOCKS (LONG / BRAID)
                     Positioned cleanly outside collar (x < 92 or x > 148)
                 ------------------------------------------------------------- */}
              {hairstyle === 'long' && (
                <g id="avatar-shoulder-locks-long">
                  <path
                    d="M 73 122 C 69 148, 67 178, 70 212 C 74 218, 79 218, 82 208 C 80 180, 82 150, 86 126 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                  <path
                    d="M 167 122 C 171 148, 173 178, 170 212 C 166 218, 161 218, 158 208 C 160 180, 158 150, 154 126 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                </g>
              )}

              {hairstyle === 'braid' && (
                <g id="avatar-shoulder-locks-braid">
                  {/* Left Woven Braid Plait over outer shoulder */}
                  <g id="avatar-braid-left">
                    <path d="M 76 118 C 65 123, 63 137, 71 147 C 77 149, 83 140, 82 128 Z" fill={`url(#hairGrad-${uid})`} />
                    <path d="M 71 142 C 61 148, 60 162, 69 172 C 76 174, 82 164, 80 152 Z" fill={`url(#hairBackDepth-${uid})`} />
                    <path d="M 69 167 C 60 173, 59 187, 68 196 C 75 198, 80 189, 78 177 Z" fill={`url(#hairGrad-${uid})`} />
                    <path d="M 68 191 C 61 196, 61 208, 68 216 C 74 217, 78 209, 76 198 Z" fill={`url(#hairBackDepth-${uid})`} />
                    {/* Minimal dark hair tie */}
                    <rect x="64" y="214" width="10.5" height="3.5" rx="1.7" fill="#2A2533" stroke="#0E0C12" strokeWidth="0.8" />
                    {/* Soft tapered braid tail */}
                    <path d="M 65.5 217.5 C 62 226, 64 234, 69 239 C 72 234, 75 225, 73.5 217.5 Z" fill={`url(#hairGrad-${uid})`} />
                    {/* Woven plait highlight lines */}
                    <path
                      d="M 67 132 Q 73 139 78 144 M 65 157 Q 71 164 76 169 M 64 181 Q 70 188 74 193 M 64 203 Q 69 209 73 213"
                      stroke="#4A4258"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.82"
                    />
                  </g>
                  {/* Right Woven Braid Plait over outer shoulder */}
                  <g id="avatar-braid-right">
                    <path d="M 164 118 C 175 123, 177 137, 169 147 C 163 149, 157 140, 158 128 Z" fill={`url(#hairGrad-${uid})`} />
                    <path d="M 169 142 C 179 148, 180 162, 171 172 C 164 174, 158 164, 160 152 Z" fill={`url(#hairBackDepth-${uid})`} />
                    <path d="M 171 167 C 180 173, 181 187, 172 196 C 165 198, 160 189, 162 177 Z" fill={`url(#hairGrad-${uid})`} />
                    <path d="M 172 191 C 179 196, 179 208, 172 216 C 166 217, 162 209, 164 198 Z" fill={`url(#hairBackDepth-${uid})`} />
                    {/* Minimal dark hair tie */}
                    <rect x="165.5" y="214" width="10.5" height="3.5" rx="1.7" fill="#2A2533" stroke="#0E0C12" strokeWidth="0.8" />
                    {/* Soft tapered braid tail */}
                    <path d="M 174.5 217.5 C 178 226, 176 234, 171 239 C 168 234, 165 225, 166.5 217.5 Z" fill={`url(#hairGrad-${uid})`} />
                    {/* Woven plait highlight lines */}
                    <path
                      d="M 173 132 Q 167 139 162 144 M 175 157 Q 169 164 164 169 M 176 181 Q 170 188 166 193 M 176 203 Q 171 209 167 213"
                      stroke="#4A4258"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.82"
                    />
                  </g>
                </g>
              )}

              {/* Elegant Neck */}
              <path
                d="M 110 128 L 110 162 C 114 165, 126 165, 130 162 L 130 128 Z"
                fill={`url(#neckGrad-${uid})`}
              />

              {/* =============================================================
                  FEMALE COLLAR VARIATIONS BY OUTFIT ID
                 ============================================================= */}
              {outfitId === 'ao-nhat-binh' ? (
                /* Cổ Nhật Bình: Lót cổ trắng + Nẹp cổ vuông kim tuyến vàng đính cúc ngọc */
                <g id="collar-female-nhat-binh">
                  <path
                    d="M 100 152 L 106 164 L 134 164 L 140 152 L 132 150 C 125 156, 115 156, 108 150 Z"
                    fill="#FAF8F5"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 96 155 L 104 165 L 136 165 L 144 155"
                    fill="none"
                    stroke={`url(#goldGrad-${uid})`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="120" cy="162" r="2.8" fill="#991B1E" stroke="#F9DF98" strokeWidth="0.9" />
                </g>
              ) : outfitId === 'ao-tu-than' ? (
                /* Cổ Áo Tứ Thân: Cổ yếm đào chữ V kết hợp nẹp áo tứ thân mềm mại */
                <g id="collar-female-tu-than">
                  <path d="M 104 150 L 120 165 L 136 150" fill="none" stroke={garment.dark} strokeWidth="4" strokeLinecap="round" />
                  <path d="M 108 152 L 120 162 L 132 152 Z" fill="#991B1E" stroke="#F9DF98" strokeWidth="0.9" />
                </g>
              ) : outfitId === 'ao-ba-ba' ? (
                /* Cổ Áo Bà Ba: Cổ tròn tim khoét nhẹ không bâu đứng */
                <g id="collar-female-ba-ba">
                  <path
                    d="M 105 156 Q 120 168 135 156 L 137 163 Q 120 173 103 163 Z"
                    fill={garment.mid}
                    stroke={garment.stroke}
                    strokeWidth="1"
                  />
                  <circle cx="120" cy="166" r="2.1" fill="#FFFDF9" stroke={garment.stroke} strokeWidth="0.7" />
                </g>
              ) : outfitId === 'giao-linh' ? (
                /* Cổ Giao Lĩnh: Hai vạt cổ giao nhau chữ Y (Hữu nhiệm) */
                <g id="collar-female-giao-linh">
                  <path d="M 105 147 L 120 165 L 135 147" fill="none" stroke="#FAF8F5" strokeWidth="4.2" strokeLinecap="round" />
                  <path d="M 136 148 L 116 166" stroke={garment.dark} strokeWidth="3.8" strokeLinecap="round" />
                  <path d="M 104 148 L 125 167" stroke={`url(#goldGrad-${uid})`} strokeWidth="4" strokeLinecap="round" />
                </g>
              ) : outfitId === 'vien-linh' ? (
                /* Cổ Viên Lĩnh: Cổ tròn ôm khít chân cổ đính cúc vàng bên phải */
                <g id="collar-female-vien-linh">
                  <path
                    d="M 105 150 C 110 159, 130 159, 135 150 L 137 161 C 128 168, 112 168, 103 161 Z"
                    fill={garment.mid}
                    stroke={`url(#goldGrad-${uid})`}
                    strokeWidth="1.2"
                  />
                  <circle cx="129" cy="159" r="2.2" fill="#D4AF37" />
                </g>
              ) : outfitId === 'doi-kham' ? (
                /* Cổ Đối Khâm: Hai nẹp cổ song song mở thẳng trước ngực */
                <g id="collar-female-doi-kham">
                  <path d="M 103 149 L 103 165" stroke={`url(#goldGrad-${uid})`} strokeWidth="4.2" strokeLinecap="round" />
                  <path d="M 137 149 L 137 165" stroke={`url(#goldGrad-${uid})`} strokeWidth="4.2" strokeLinecap="round" />
                </g>
              ) : (
                /* Cổ Lập Lĩnh Truyền Thống (Áo Dài, Áo Tấc, Áo Ngũ Thân, Áo Tay Chẽn) */
                <g id="collar-female-lap-linh">
                  {/* Lót cổ trắng hộ lĩnh cho hệ Áo Ngũ Thân / Áo Tấc / Áo Tay Chẽn */}
                  {(outfitId === 'ao-tac' || outfitId === 'ao-ngu-than' || outfitId === 'ao-tay-chen') && (
                    <path
                      d="M 105.5 145.5 C 105.5 140, 134.5 140, 134.5 145.5 L 135.5 160 C 129 163, 111 163, 104.5 160 Z"
                      fill="#FAF8F5"
                      stroke="#D6C7B2"
                      strokeWidth="0.8"
                    />
                  )}
                  <path
                    d="M 106 148 C 106 142, 134 142, 134 148 L 136 164 C 130 167, 110 167, 104 164 Z"
                    fill={garment.mid}
                    stroke={garment.stroke}
                    strokeWidth="1"
                  />
                  <path d="M 120 148 L 120 164" stroke={garment.stroke} strokeWidth="1" />
                  <circle cx="120" cy="156" r="2.2" fill="#D4AF37" />
                </g>
              )}

              {/* ACCESSORIES (TRANG SỨC VÙNG CỔ & NGỰC NỮ): KIỀNG BẠC / CHUỖI NGỌC TRAI */}
              {hasKiengBac && (
                <g id={`acc-avatar-kieng-female-${uid}`} className="animate-acc-neck">
                  {/* Silver Torque Body */}
                  <path
                    d="M 102 155 C 102 179, 138 179, 138 155"
                    stroke={`url(#silverKieng-${uid})`}
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Silver Specular Highlight Line */}
                  <path
                    d="M 104 156 C 105 176, 135 176, 136 156"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.85"
                  />
                  {/* Central Silver Drop / Traditional Longevity Medallion Motif */}
                  <circle cx="120" cy="173.5" r="2.8" fill={`url(#silverKieng-${uid})`} stroke="#94A3B8" strokeWidth="0.6" />
                  <circle cx="120" cy="173.5" r="1.3" fill="#FFFFFF" />
                </g>
              )}

              {hasNgocTrai && (
                <g id={`acc-avatar-pearls-female-${uid}`} className="animate-acc-neck">
                  <path
                    d="M 100 150 C 96 186, 144 186, 140 150"
                    stroke="#E2D4C3"
                    strokeWidth="0.8"
                    strokeDasharray="1 3"
                    fill="none"
                    opacity="0.6"
                  />
                  {[
                    { cx: 99, cy: 152, r: 2.2 },
                    { cx: 101, cy: 160, r: 2.3 },
                    { cx: 104, cy: 168, r: 2.5 },
                    { cx: 109, cy: 175, r: 2.7 },
                    { cx: 114, cy: 180, r: 2.8 },
                    { cx: 120, cy: 182, r: 3.1 },
                    { cx: 126, cy: 180, r: 2.8 },
                    { cx: 131, cy: 175, r: 2.7 },
                    { cx: 136, cy: 168, r: 2.5 },
                    { cx: 139, cy: 160, r: 2.3 },
                    { cx: 141, cy: 152, r: 2.2 }
                  ].map((p, i) => (
                    <g key={i}>
                      <circle cx={p.cx} cy={p.cy} r={p.r} fill={`url(#pearlGrad-${uid})`} stroke="#E8DDD0" strokeWidth="0.5" />
                      <circle cx={p.cx - p.r * 0.3} cy={p.cy - p.r * 0.3} r={p.r * 0.32} fill="#FFFFFF" opacity="0.9" />
                    </g>
                  ))}
                </g>
              )}

              {/* Ears */}
              <ellipse cx="78" cy="108" rx="6" ry="11" fill={skin.ears} />
              <ellipse cx="162" cy="108" rx="6" ry="11" fill={skin.ears} />
              {/* Pearl Earrings */}
              <circle cx="77" cy="116" r="2.5" fill="#FFFDF8" stroke="#D6C4AD" strokeWidth="0.5" />
              <circle cx="163" cy="116" r="2.5" fill="#FFFDF8" stroke="#D6C4AD" strokeWidth="0.5" />

              {/* Face Shape (V-line duyên dáng Việt Nam) */}
              <path
                d="M 80 94 C 80 64, 160 64, 160 94 C 160 120, 142 144, 120 144 C 98 144, 80 120, 80 94 Z"
                fill={`url(#faceGrad-${uid})`}
              />

              {/* Soft Cheek Blush */}
              <ellipse cx="94" cy="112" rx="10" ry="5.5" fill={skin.blush} opacity="0.32" />
              <ellipse cx="146" cy="112" rx="10" ry="5.5" fill={skin.blush} opacity="0.32" />

              {/* Delicate Eyebrows (Lông mày lá liễu thanh tú) */}
              <path
                d="M 90 92 Q 101 88 111 92"
                stroke="#2B211D"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 129 92 Q 139 88 150 92"
                stroke="#2B211D"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />

              {/* Gentle Expressive Eyes */}
              <g id="female-eyes">
                {/* Left Eye */}
                <path
                  d="M 92 99 Q 102 95 111 99"
                  stroke="#1C1512"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="102" cy="101" r="3.2" fill="#201815" />
                <circle cx="103" cy="100" r="1.1" fill="#FFFFFF" />

                {/* Right Eye */}
                <path
                  d="M 129 99 Q 138 95 148 99"
                  stroke="#1C1512"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="138" cy="101" r="3.2" fill="#201815" />
                <circle cx="139" cy="100" r="1.1" fill="#FFFFFF" />
              </g>

              {/* Nose */}
              <path
                d="M 119 104 Q 120 114 122 116"
                stroke={skin.shade}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Lips (Môi hồng duyên dáng) */}
              <path
                d="M 112 126 Q 120 123 128 126 Q 120 132 112 126 Z"
                fill={skin.lips}
                opacity="0.88"
              />
              <path
                d="M 114 126 Q 120 128 126 126"
                stroke="#4A0516"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
              />

              {/* -------------------------------------------------------------
                  3. FRONT HAIR: SHORT BOB SIDE LOCKS & UNIFIED 6:4 CROWN
                 ------------------------------------------------------------- */}
              {hairstyle === 'short' && (
                <g id="avatar-front-locks-short">
                  {/* Left C-curl Bob side lock hugging outer cheek/jawline */}
                  <path
                    d="M 74 86 C 68 106, 67 128, 76 143 C 82 149, 90 148, 95 143 C 86 136, 82 116, 82 92 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                  {/* Right C-curl Bob side lock hugging outer cheek/jawline */}
                  <path
                    d="M 166 86 C 172 106, 173 128, 164 143 C 158 149, 150 148, 145 143 C 154 136, 158 116, 158 92 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                  {/* Soft C-curl highlights */}
                  <path d="M 74 104 C 72 119, 74 132, 82 141" stroke="#463F54" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.7" />
                  <path d="M 166 104 C 168 119, 166 132, 158 141" stroke="#463F54" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.7" />
                </g>
              )}

              {/* Shared Crown & Airy 6:4 Curtain Parting (Identical Hairline Across All 4 Hairstyles) */}
              <path
                d="M 75 94 C 73 62, 92 45, 115 46 C 118 46, 121 47, 124 46 C 148 45, 167 62, 165 94 C 161 84, 155 76, 146 71 C 135 65, 122 62, 115 60 C 107 63, 95 67, 86 74 C 80 79, 77 86, 75 94 Z"
                fill={`url(#hairGrad-${uid})`}
              />
              {/* Delicate wispy temple strands (slightly softer/longer on bun & braid for feminine elegance) */}
              <path
                d={
                  hairstyle === 'bun' || hairstyle === 'braid'
                    ? 'M 85 73 C 79 85, 78 100, 82.5 117 C 77.5 106, 75.5 91, 79 76 Z'
                    : 'M 85 73 C 80 83, 79 96, 81.5 110 C 78 101, 76 89, 79 76 Z'
                }
                fill={`url(#hairGrad-${uid})`}
              />
              <path
                d={
                  hairstyle === 'bun' || hairstyle === 'braid'
                    ? 'M 155 73 C 161 85, 162 100, 157.5 117 C 162.5 106, 164.5 91, 161 76 Z'
                    : 'M 155 73 C 160 83, 161 96, 158.5 110 C 162 101, 164 89, 161 76 Z'
                }
                fill={`url(#hairGrad-${uid})`}
              />
              {/* Natural Scalp Parting Crease */}
              <path
                d="M 114.5 48 Q 115 54 115.5 60"
                stroke={skin.base}
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Silky Crown Specular Highlight */}
              <path
                d="M 90 64 Q 102 56 112 58"
                stroke={`url(#hairSheen-${uid})`}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 119 58 Q 135 56 150 65"
                stroke={`url(#hairSheen-${uid})`}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />

              {/* ACCESSORIES (PHỤ KIỆN ĐỘI ĐẦU NỮ): KHĂN ĐÓNG / KHĂN VÀNH & NÓN QUAI THAO */}
              {hasKhanDong && (
                <g id={`acc-avatar-khan-dong-female-${uid}`} className="animate-acc-head">
                  {outfitId === 'ao-nhat-binh' ? (
                    /* Khăn Vành / Mấn Phượng Cung Đình Huế khi mặc Áo Nhật Bình */
                    <g id={`acc-avatar-khan-vanh-${uid}`}>
                      <ellipse cx="120" cy="46" rx="46" ry="18" fill="#380B12" stroke={`url(#goldGrad-${uid})`} strokeWidth="1.8" />
                      <path
                        d="M 75 48 C 77 24, 163 24, 165 48 C 160 58, 80 58, 75 48 Z"
                        fill={`url(#khanVanhGrad-${uid})`}
                        stroke={`url(#goldGrad-${uid})`}
                        strokeWidth="1.2"
                      />
                      {/* Nếp xếp chữ Nhất hoàng gia */}
                      <path d="M 78 43 Q 120 28 162 43" stroke={`url(#goldGrad-${uid})`} strokeWidth="1.8" fill="none" />
                      <path d="M 81 48 Q 120 34 159 48" stroke="#F9DF98" strokeWidth="1.4" fill="none" opacity="0.9" />
                      <path d="M 85 53 Q 120 40 155 53" stroke={`url(#goldGrad-${uid})`} strokeWidth="1.5" fill="none" />
                      {/* Central Royal Phoenix Crest / Trâm Phượng Kim Hoàn */}
                      <circle cx="120" cy="38" r="4.2" fill={`url(#goldGrad-${uid})`} stroke="#991B1E" strokeWidth="1" />
                      <circle cx="120" cy="38" r="2" fill="#BE123C" />
                      <path d="M 111 39 Q 115 33 120 35 Q 125 33 129 39" stroke={`url(#goldGrad-${uid})`} strokeWidth="1.6" fill="none" strokeLinecap="round" />
                    </g>
                  ) : (
                    /* Traditional Female Khăn Đóng / Mấn Lụa */
                    <g id={`acc-avatar-man-lua-${uid}`}>
                      <ellipse cx="120" cy="48" rx="42" ry="17" fill="#1E1B18" stroke={`url(#goldGrad-${uid})`} strokeWidth="1.2" />
                      <path
                        d="M 79 50 C 81 28, 159 28, 161 50 C 158 59, 82 59, 79 50 Z"
                        fill="#2C2420"
                        stroke="#181412"
                        strokeWidth="1"
                      />
                      <path d="M 82 45 Q 120 32 158 45" stroke={`url(#goldGrad-${uid})`} strokeWidth="1.6" fill="none" />
                      <path d="M 85 52 Q 120 39 155 52" stroke="#483D36" strokeWidth="1.8" fill="none" />
                      <path d="M 88 58 Q 120 47 152 58" stroke="#1A1613" strokeWidth="1.4" fill="none" />
                    </g>
                  )}
                </g>
              )}

              {hasNonQuaiThao && (
                <g id={`acc-avatar-non-quai-thao-female-${uid}`} className="animate-acc-head">
                  <g transform={`translate(0, ${nonQuaiThaoY - 45})`}>
                    {/* Shadow cast naturally on hair and forehead */}
                    <ellipse cx="120" cy="49" rx="72" ry="19" fill="rgba(28, 25, 23, 0.22)" />
                    {/* Woven Brim */}
                    <ellipse cx="120" cy="45" rx="74" ry="19.5" fill={`url(#nonBrimGrad-${uid})`} stroke="#B89B77" strokeWidth="1.8" />
                    <ellipse cx="120" cy="45" rx="62" ry="16" fill="none" stroke="#CBB492" strokeWidth="1.1" strokeDasharray="4 2" />
                    <ellipse cx="120" cy="44" rx="49" ry="12.5" fill="none" stroke="#BA9F7B" strokeWidth="1.1" strokeDasharray="3 2" />
                    {/* Raised Center Dome */}
                    <ellipse cx="120" cy="42.5" rx="31" ry="8.5" fill="#DFCCA8" stroke="#A98A65" strokeWidth="1.2" />
                    <ellipse cx="120" cy="40.5" rx="19" ry="5.2" fill="#CBB492" />
                    <circle cx="120" cy="38.5" r="3" fill="#991B1E" stroke="#5E1B24" strokeWidth="0.8" />
                    {/* Quai thao ribbons */}
                    <path
                      d="M 72 50 C 67 82, 65 130, 78 184 C 82 190, 87 188, 85 182 C 73 135, 74 86, 78 52 Z"
                      fill="#991B1E"
                      stroke="#7F1D1D"
                      strokeWidth="0.8"
                    />
                    <path d="M 74 53 C 70 85, 69 131, 80 182" stroke="#BE123C" strokeWidth="1.2" fill="none" opacity="0.8" />
                    <circle cx="81" cy="185" r="2.2" fill={`url(#goldGrad-${uid})`} />
                    <path
                      d="M 168 50 C 173 82, 175 130, 162 184 C 158 190, 153 188, 155 182 C 167 135, 166 86, 162 52 Z"
                      fill="#991B1E"
                      stroke="#7F1D1D"
                      strokeWidth="0.8"
                    />
                    <path d="M 166 53 C 170 85, 171 131, 160 182" stroke="#BE123C" strokeWidth="1.2" fill="none" opacity="0.8" />
                    <circle cx="159" cy="185" r="2.2" fill={`url(#goldGrad-${uid})`} />
                  </g>
                </g>
              )}
            </g>
          ) : (
            /* ===============================================================
               MALE AVATAR: NAM GIỚI DIỆN ÁO DÀI ĐEN LẬP LĨNH NHO NHÃ
               UNIFIED MALE HAIRSTYLE SYSTEM:
               - male-short | male-bun | male-ponytail | male-parted | male-half-up
               =============================================================== */
            <g id="male-model-avatar">
              {/* 1. BACK HAIR LAYER BY MALE HAIRSTYLE */}
              {hairstyle === 'male-bun' && (
                <g id="avatar-male-back-bun">
                  {!hasKhanDong && !hasNonQuaiThao && (
                    <>
                      {/* High cổ trang topknot bun (Búi củ hành Đại Việt) */}
                      <ellipse cx="120" cy="36" rx="18" ry="13" fill={`url(#hairBackDepth-${uid})`} />
                      <ellipse cx="120" cy="35" rx="16" ry="11.5" fill={`url(#hairGrad-${uid})`} />
                      {/* Wooden/jade hairpin */}
                      <line x1="95" y1="35" x2="145" y2="35" stroke="#8C6239" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="95" cy="35" r="2.8" fill="#C8973E" />
                      <circle cx="145" cy="35" r="2.2" fill="#C8973E" />
                      <path d="M 107 32.5 Q 120 27 133 32.5" stroke={`url(#hairSheen-${uid})`} strokeWidth="2" strokeLinecap="round" fill="none" />
                      {/* Base crown band (Mão quyển) */}
                      <rect x="106" y="43.5" width="28" height="5.5" rx="2.5" fill="#2A211B" stroke="#C8973E" strokeWidth="1.2" />
                    </>
                  )}
                  <path
                    d="M 120 46 C 88 46, 75 64, 75 90 C 75 108, 84 123, 102 129 L 138 129 C 156 123, 165 108, 165 90 C 165 64, 152 46, 120 46 Z"
                    fill={`url(#hairBackDepth-${uid})`}
                  />
                </g>
              )}

              {hairstyle === 'male-ponytail' && (
                <g id="avatar-male-back-ponytail">
                  <path
                    d="M 120 45 C 87 45, 74 63, 74 90 C 74 110, 84 126, 100 133 L 140 133 C 156 126, 166 110, 166 90 C 166 63, 153 45, 120 45 Z"
                    fill={`url(#hairBackDepth-${uid})`}
                  />
                  {/* Gathered low ponytail visible behind neck & shoulders */}
                  <path
                    d="M 96 124 C 90 140, 87 156, 90 172 L 150 172 C 153 156, 150 140, 144 124 Z"
                    fill={`url(#hairBackDepth-${uid})`}
                  />
                  <path
                    d="M 99 128 C 94 142, 92 156, 95 168 L 145 168 C 148 156, 146 142, 141 128 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                </g>
              )}

              {hairstyle === 'male-half-up' && (
                <g id="avatar-male-back-half-up">
                  {/* Upper half-up scholar knot */}
                  <ellipse cx="120" cy="39" rx="15" ry="9.5" fill={`url(#hairBackDepth-${uid})`} />
                  <ellipse cx="120" cy="38.5" rx="13" ry="8" fill={`url(#hairGrad-${uid})`} />
                  <rect x="109" y="44.5" width="22" height="3.8" rx="1.8" fill="#2A211B" stroke="#C8973E" strokeWidth="1" />
                  {/* Lower flowing shoulder hair behind neck and collar */}
                  <path
                    d="M 120 45 C 86 45, 72 64, 70 92 C 67 118, 64 146, 67 174 L 98 172 L 142 172 L 173 174 C 176 146, 173 118, 170 92 C 168 64, 154 45, 120 45 Z"
                    fill={`url(#hairBackDepth-${uid})`}
                  />
                  <path
                    d="M 73 88 C 70 116, 68 144, 71 170 L 94 168 L 146 168 L 169 170 C 172 144, 170 116, 167 88 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                  <ellipse cx="120" cy="140" rx="28" ry="16" fill="#070609" opacity="0.82" />
                </g>
              )}

              {(hairstyle !== 'male-bun' && hairstyle !== 'male-ponytail' && hairstyle !== 'male-half-up') && (
                /* Default neat back cranial shell for male-short & male-parted */
                <path
                  d="M 120 45 C 87 45, 74 63, 74 89 C 74 108, 84 123, 102 129 L 138 129 C 156 123, 166 108, 166 89 C 166 63, 153 45, 120 45 Z"
                  fill={`url(#hairBackDepth-${uid})`}
                />
              )}

              {/* =============================================================
                  2. MALE GARMENT BODY & DETAILS BY OUTFIT ID
                 ============================================================= */}
              <g id={`male-garment-body-${outfitId}`}>
                <path
                  d={
                    outfitId === 'ao-tac' || outfitId === 'giao-linh' || outfitId === 'vien-linh'
                      ? 'M 36 240 C 42 176, 72 162, 100 156 L 140 156 C 168 162, 198 176, 204 240 Z'
                      : 'M 44 240 C 49 180, 76 164, 100 158 L 140 158 C 164 164, 191 180, 196 240 Z'
                  }
                  fill={`url(#garmentGrad-${uid})`}
                  stroke={garment.stroke}
                  strokeWidth="1.1"
                />

                {outfitId === 'ao-ba-ba' ? (
                  /* ÁO BÀ BA NAM: Xẻ tà giữa đính cúc mộc */
                  <g id="detail-male-ba-ba">
                    <line x1="120" y1="166" x2="120" y2="240" stroke={garment.stroke} strokeWidth="1.6" />
                    <path d="M 92 178 C 86 198, 80 218, 76 238" stroke={garment.stroke} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
                    <path d="M 148 178 C 154 198, 160 218, 164 238" stroke={garment.stroke} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
                    <circle cx="120" cy="175" r="2.4" fill="#FAF8F5" stroke={garment.stroke} strokeWidth="0.7" />
                    <circle cx="120" cy="193" r="2.4" fill="#FAF8F5" stroke={garment.stroke} strokeWidth="0.7" />
                    <circle cx="120" cy="211" r="2.4" fill="#FAF8F5" stroke={garment.stroke} strokeWidth="0.7" />
                    <circle cx="120" cy="229" r="2.4" fill="#FAF8F5" stroke={garment.stroke} strokeWidth="0.7" />
                  </g>
                ) : outfitId === 'giao-linh' ? (
                  /* ÁO GIAO LĨNH NAM: Vạt chéo chữ Y giao nhau + Lót trắng */
                  <g id="detail-male-giao-linh">
                    <path d="M 100 154 L 120 184 L 140 154 Z" fill="#FAF8F5" stroke="#D6C7B2" strokeWidth="1" />
                    <path d="M 140 154 L 104 208 L 115 215 L 148 160 Z" fill={garment.dark} stroke={garment.accent} strokeWidth="1" />
                    <path d="M 100 154 L 150 216 L 139 224 L 92 160 Z" fill={garment.mid} stroke={`url(#goldGrad-${uid})`} strokeWidth="1.4" />
                    <circle cx="146" cy="214" r="2.8" fill="#C8973E" />
                  </g>
                ) : outfitId === 'vien-linh' ? (
                  /* ÁO VIÊN LĨNH NAM: Cổ tròn quan phục + Bổ tử / Đoàn long trước ngực */
                  <g id="detail-male-vien-linh">
                    <line x1="120" y1="164" x2="120" y2="240" stroke={garment.stroke} strokeWidth="1.2" opacity="0.55" />
                    <path d="M 120 161 C 136 167, 147 177, 153 192 L 151 240" stroke={garment.accent} strokeWidth="1.4" fill="none" />
                    <rect x="103" y="182" width="34" height="34" rx="4" fill={garment.deep} stroke={`url(#goldGrad-${uid})`} strokeWidth="1.5" />
                    <circle cx="120" cy="199" r="9.5" fill="none" stroke="#F9DF98" strokeWidth="1.1" strokeDasharray="3 2" />
                    <circle cx="120" cy="199" r="3.5" fill="#F9DF98" />
                    <circle cx="125" cy="162" r="2.3" fill="#D4AF37" />
                    <circle cx="139" cy="171" r="2.3" fill="#D4AF37" />
                    <circle cx="150" cy="186" r="2.3" fill="#D4AF37" />
                  </g>
                ) : outfitId === 'doi-kham' ? (
                  /* ÁO ĐỐI KHÂM NAM: Khoác ngoài hai vạt song song đối xứng */
                  <g id="detail-male-doi-kham">
                    <rect x="103" y="158" width="34" height="82" fill="#FAF8F5" />
                    <line x1="120" y1="158" x2="120" y2="240" stroke="#D6C7B2" strokeWidth="1.2" />
                    <rect x="93" y="156" width="10" height="84" fill={`url(#goldGrad-${uid})`} stroke={garment.stroke} strokeWidth="0.9" />
                    <rect x="137" y="156" width="10" height="84" fill={`url(#goldGrad-${uid})`} stroke={garment.stroke} strokeWidth="0.9" />
                    <line x1="103" y1="186" x2="137" y2="186" stroke="#C8973E" strokeWidth="1.8" />
                    <circle cx="103" cy="186" r="2.5" fill="#D4AF37" />
                    <circle cx="137" cy="186" r="2.5" fill="#D4AF37" />
                  </g>
                ) : (
                  /* HỆ ÁO NGŨ THÂN NAM (ÁO DÀI NAM, ÁO TẤC, ÁO NGŨ THÂN TAY CHẼN, ÁO TAY CHẼN) */
                  <g id={`detail-male-${outfitId}`}>
                    {/* Center Vertical Seam (Đường trung phùng đặc trưng áo dài ngũ thân nam) */}
                    <line x1="120" y1="163" x2="120" y2="240" stroke={garment.deep} strokeWidth="1.5" />
                    <line x1="118.8" y1="164" x2="118.8" y2="240" stroke={garment.light} strokeWidth="0.8" opacity="0.55" />

                    {/* Right Vạt Chéo (Tà áo ngũ thân lập lĩnh cài cúc bên hữu) */}
                    <path
                      d="M 120 161 C 134 167, 144 176, 150 188 L 148 240"
                      stroke={outfitId === 'ao-tac' ? '#D4AF37' : garment.deep}
                      strokeWidth="1.6"
                      fill="none"
                    />
                    <path
                      d="M 120 162 C 133.5 168, 143 177, 149 188.5 L 147 240"
                      stroke={garment.light}
                      strokeWidth="0.9"
                      fill="none"
                      opacity="0.6"
                    />

                    {/* Ceremonial wide-sleeve brocade trim for Áo Tấc */}
                    {outfitId === 'ao-tac' && (
                      <>
                        <circle cx="120" cy="198" r="12" fill="none" stroke={`url(#goldGrad-${uid})`} strokeWidth="1.2" opacity="0.75" />
                        <path d="M 84 174 C 76 196, 68 218, 62 238" stroke={`url(#goldGrad-${uid})`} strokeWidth="1.5" fill="none" opacity="0.7" />
                        <path d="M 156 174 C 164 196, 172 218, 178 238" stroke={`url(#goldGrad-${uid})`} strokeWidth="1.5" fill="none" opacity="0.7" />
                      </>
                    )}

                    {/* Tailored shoulder-to-underarm seams & knotted loops for Áo Tay Chẽn */}
                    {outfitId === 'ao-tay-chen' && (
                      <>
                        <path d="M 78 164 C 82 186, 84 212, 85 240" stroke={garment.deep} strokeWidth="1.3" fill="none" opacity="0.75" />
                        <path d="M 162 164 C 158 186, 156 212, 155 240" stroke={garment.deep} strokeWidth="1.3" fill="none" opacity="0.75" />
                        <line x1="120" y1="159" x2="125" y2="159" stroke="#C8973E" strokeWidth="1.1" strokeLinecap="round" />
                        <line x1="132" y1="168" x2="137" y2="168" stroke="#C8973E" strokeWidth="1.1" strokeLinecap="round" />
                        <line x1="142" y1="182" x2="147" y2="182" stroke="#C8973E" strokeWidth="1.1" strokeLinecap="round" />
                        <line x1="144" y1="204" x2="149" y2="204" stroke="#C8973E" strokeWidth="1.1" strokeLinecap="round" />
                        <line x1="143.5" y1="226" x2="148.5" y2="226" stroke="#C8973E" strokeWidth="1.1" strokeLinecap="round" />
                      </>
                    )}

                    {/* Soft Silk Drapery Folds on Chest */}
                    <path d="M 92 178 C 86 198, 80 218, 76 238" stroke={garment.light} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.5" />
                    <path d="M 156 182 C 162 200, 167 220, 171 238" stroke={garment.light} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />

                    {/* 5 Traditional Brass/Gold Buttons (Ngũ thường cúc đồng) */}
                    <circle cx="124" cy="159" r="2.3" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
                    <circle cx="136" cy="168" r="2.3" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
                    <circle cx="146" cy="182" r="2.3" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
                    <circle cx="148" cy="204" r="2.3" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
                    <circle cx="147.5" cy="226" r="2.3" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
                  </g>
                )}
              </g>

              {/* Strong Masculine Neck */}
              <path
                d="M 107 126 L 107 160 C 112 163, 128 163, 133 160 L 133 126 Z"
                fill={`url(#neckGrad-${uid})`}
              />

              {/* =============================================================
                  MALE COLLAR VARIATIONS BY OUTFIT ID
                 ============================================================= */}
              {outfitId === 'ao-ba-ba' ? (
                <g id="collar-male-ba-ba">
                  <path
                    d="M 103 154 Q 120 166 137 154 L 139 162 Q 120 172 101 162 Z"
                    fill={garment.mid}
                    stroke={garment.stroke}
                    strokeWidth="1"
                  />
                </g>
              ) : outfitId === 'giao-linh' ? (
                <g id="collar-male-giao-linh">
                  <path d="M 103 145 L 120 164 L 137 145" fill="none" stroke="#FAF8F5" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M 138 146 L 116 165" stroke={garment.dark} strokeWidth="4" strokeLinecap="round" />
                  <path d="M 102 146 L 126 166" stroke={`url(#goldGrad-${uid})`} strokeWidth="4.2" strokeLinecap="round" />
                </g>
              ) : outfitId === 'vien-linh' ? (
                <g id="collar-male-vien-linh">
                  <path
                    d="M 103 148 C 109 157, 131 157, 137 148 L 139 160 C 129 167, 111 167, 101 160 Z"
                    fill={garment.mid}
                    stroke={`url(#goldGrad-${uid})`}
                    strokeWidth="1.2"
                  />
                  <circle cx="130" cy="157" r="2.3" fill="#D4AF37" />
                </g>
              ) : outfitId === 'doi-kham' ? (
                <g id="collar-male-doi-kham">
                  <path d="M 101 147 L 101 163" stroke={`url(#goldGrad-${uid})`} strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M 139 147 L 139 163" stroke={`url(#goldGrad-${uid})`} strokeWidth="4.5" strokeLinecap="round" />
                </g>
              ) : (
                <g id="collar-male-lap-linh">
                  {/* Inner White Collar (Lót Cổ Trắng Hộ Lĩnh Tinh Tế của Áo Ngũ Thân Nam) */}
                  <path
                    d="M 103 145 C 103 139, 137 139, 137 145 L 138 160 C 130 163, 110 163, 102 160 Z"
                    fill="#FAF8F5"
                    stroke="#D6C7B2"
                    strokeWidth="0.9"
                  />

                  {/* Outer Standing Collar (Cổ Đứng Lập Lĩnh Quyền Quý) */}
                  <path
                    d="M 102.5 148.5 C 102.5 143.5, 137.5 143.5, 137.5 148.5 L 138.5 163 C 130 166.5, 110 166.5, 101.5 163 Z"
                    fill={garment.mid}
                    stroke="#C8973E"
                    strokeWidth="1"
                  />
                  <line x1="120" y1="145" x2="120" y2="165" stroke={garment.deep} strokeWidth="1.2" />
                </g>
              )}

              {/* ACCESSORIES (TRANG SỨC VÙNG CỔ & NGỰC NAM): KIỀNG BẠC / CHUỖI NGỌC TRAI */}
              {hasKiengBac && (
                <g id={`acc-avatar-kieng-male-${uid}`} className="animate-acc-neck">
                  <path
                    d="M 100 152 C 100 178, 140 178, 140 152"
                    stroke={`url(#silverKieng-${uid})`}
                    strokeWidth="4.6"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 102 153 C 103 175, 137 175, 138 153"
                    stroke="#FFFFFF"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.8"
                  />
                  <circle cx="120" cy="172" r="3" fill={`url(#silverKieng-${uid})`} stroke="#64748B" strokeWidth="0.7" />
                  <circle cx="120" cy="172" r="1.4" fill="#FFFFFF" />
                </g>
              )}

              {hasNgocTrai && (
                <g id={`acc-avatar-pearls-male-${uid}`} className="animate-acc-neck">
                  <path
                    d="M 98 150 C 94 186, 146 186, 142 150"
                    stroke="#E2D4C3"
                    strokeWidth="0.8"
                    strokeDasharray="1 3"
                    fill="none"
                    opacity="0.6"
                  />
                  {[
                    { cx: 98, cy: 152, r: 2.2 },
                    { cx: 100, cy: 160, r: 2.3 },
                    { cx: 103, cy: 168, r: 2.5 },
                    { cx: 108, cy: 175, r: 2.7 },
                    { cx: 114, cy: 180, r: 2.8 },
                    { cx: 120, cy: 182, r: 3.1 },
                    { cx: 126, cy: 180, r: 2.8 },
                    { cx: 132, cy: 175, r: 2.7 },
                    { cx: 137, cy: 168, r: 2.5 },
                    { cx: 140, cy: 160, r: 2.3 },
                    { cx: 142, cy: 152, r: 2.2 }
                  ].map((p, i) => (
                    <g key={i}>
                      <circle cx={p.cx} cy={p.cy} r={p.r} fill={`url(#pearlGrad-${uid})`} stroke="#E8DDD0" strokeWidth="0.5" />
                      <circle cx={p.cx - p.r * 0.3} cy={p.cy - p.r * 0.3} r={p.r * 0.32} fill="#FFFFFF" opacity="0.9" />
                    </g>
                  ))}
                </g>
              )}

              {/* Ears */}
              <ellipse cx="76" cy="107" rx="7" ry="12" fill={skin.ears} />
              <ellipse cx="164" cy="107" rx="7" ry="12" fill={skin.ears} />

              {/* Masculine Jawline Face */}
              <path
                d="M 78 90 C 78 62, 162 62, 162 90 C 162 118, 146 142, 120 142 C 94 142, 78 118, 78 90 Z"
                fill={`url(#faceGrad-${uid})`}
              />

              {/* Subtle Natural Warmth on Cheeks */}
              <ellipse cx="94" cy="112" rx="9" ry="4.5" fill={skin.blush} opacity="0.20" />
              <ellipse cx="146" cy="112" rx="9" ry="4.5" fill={skin.blush} opacity="0.20" />

              {/* Strong Male Eyebrows (Kiếm mi đĩnh đạc) */}
              <path
                d="M 88 90 L 112 88"
                stroke="#1B1410"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M 128 88 L 152 90"
                stroke="#1B1410"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Confident Eyes */}
              <g id="male-eyes">
                {/* Left Eye */}
                <path
                  d="M 90 98 Q 100 95 111 98"
                  stroke="#18120F"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="101" cy="99" r="3.2" fill="#1C1410" />
                <circle cx="102" cy="98.5" r="1.1" fill="#FFFFFF" />

                {/* Right Eye */}
                <path
                  d="M 129 98 Q 140 95 150 98"
                  stroke="#18120F"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="139" cy="99" r="3.2" fill="#1C1410" />
                <circle cx="140" cy="98.5" r="1.1" fill="#FFFFFF" />
              </g>

              {/* Structured Male Nose */}
              <path
                d="M 119 100 L 120 114 L 123 115"
                stroke={skin.shade}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Male Lips */}
              <path
                d="M 112 125 Q 120 123 128 125 Q 120 129 112 125 Z"
                fill={skin.lips}
                opacity="0.80"
              />
              <line x1="113" y1="125" x2="127" y2="125" stroke="#3A1D16" strokeWidth="0.8" />

              {/* 3. FRONT HAIR LAYER BY MALE HAIRSTYLE */}
              {hairstyle === 'male-bun' ? (
                <g id="avatar-male-front-bun">
                  <path
                    d="M 76 90 C 75 56, 94 45, 120 45 C 146 45, 165 56, 164 90 C 160 76, 152 66, 139 63 C 128 60, 123 62, 120 63.5 C 117 62, 112 60, 101 63 C 88 66, 80 76, 76 90 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                  <path d="M 78 85 L 79 102" stroke="#181412" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M 162 85 L 161 102" stroke="#181412" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M 96 60 Q 108 50 116 46 M 144 60 Q 132 50 124 46" stroke="#3D3647" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                </g>
              ) : hairstyle === 'male-ponytail' ? (
                <g id="avatar-male-front-ponytail">
                  <path
                    d="M 75 90 C 74 55, 93 44, 120 45 C 147 44, 166 55, 165 90 C 160 76, 151 66, 137 63 C 127 60.5, 122 62, 120 64 C 118 62, 113 60.5, 103 63 C 89 66, 80 76, 75 90 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                  {/* Refined temple locks */}
                  <path d="M 84 68 C 78 79, 77 92, 80 106 C 76 96, 75 83, 79 71 Z" fill={`url(#hairGrad-${uid})`} />
                  <path d="M 156 68 C 162 79, 163 92, 160 106 C 164 96, 165 83, 161 71 Z" fill={`url(#hairGrad-${uid})`} />
                  <path d="M 120 46 L 120 63" stroke={skin.base} strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
                </g>
              ) : hairstyle === 'male-parted' ? (
                <g id="avatar-male-front-parted">
                  <path
                    d="M 75 90 C 74 54, 92 45, 104 46 C 112 44, 148 43, 165 90 C 159 75, 146 67, 131 65 C 118 63, 109 60.5, 104 58 C 97 65, 85 73, 75 90 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                  <path d="M 103.5 46.5 L 104.5 58.5" stroke={skin.base} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                  <path d="M 78 86 L 79 103" stroke="#181412" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 162 86 L 161 103" stroke="#181412" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 110 56 Q 130 52 150 62" stroke={`url(#hairSheen-${uid})`} strokeWidth="2.8" strokeLinecap="round" fill="none" />
                </g>
              ) : hairstyle === 'male-half-up' ? (
                <g id="avatar-male-front-half-up">
                  <path
                    d="M 75 91 C 73 55, 92 44, 116 45.5 C 119 45.5, 121 45.5, 124 45.5 C 148 44, 167 55, 165 91 C 160 77, 151 67, 138 63 C 128 60, 121 59, 117 58 C 109 61, 96 66, 87 73 C 81 78, 77 84, 75 91 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                  <path d="M 85 70 C 79 81, 78 95, 81 109 C 77 99, 76 85, 80 72 Z" fill={`url(#hairGrad-${uid})`} />
                  <path d="M 155 70 C 161 81, 162 95, 159 109 C 163 99, 164 85, 160 72 Z" fill={`url(#hairGrad-${uid})`} />
                  <path d="M 116.5 46.5 L 117 58" stroke={skin.base} strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
                </g>
              ) : (
                /* [DEFAULT] MALE-SHORT: TÓC NGẮN TRUYỀN THỐNG GỌN GÀNG */
                <g id="avatar-male-front-short">
                  <path
                    d="M 76 89 C 75 55, 94 44.5, 120 44.5 C 146 44.5, 165 55, 164 89 C 160 76, 153 67, 141 64 C 130 61, 125 63, 120 64.5 C 115 63, 110 61, 99 64 C 87 67, 80 76, 76 89 Z"
                    fill={`url(#hairGrad-${uid})`}
                  />
                  <path d="M 78 85 L 79 102" stroke="#181412" strokeWidth="2.6" strokeLinecap="round" />
                  <path d="M 162 85 L 161 102" stroke="#181412" strokeWidth="2.6" strokeLinecap="round" />
                  <path d="M 94 58 Q 120 51 146 58" stroke={`url(#hairSheen-${uid})`} strokeWidth="2.8" strokeLinecap="round" fill="none" />
                </g>
              )}

              {/* ACCESSORIES (PHỤ KIỆN ĐỘI ĐẦU NAM): KHĂN ĐÓNG NAM & NÓN QUAI THAO */}
              {hasKhanDong && (
                <g id={`acc-avatar-khan-dong-male-${uid}`} className="animate-acc-head">
                  {/* Male Khăn Đóng: Deep black/indigo silk brocade with traditional chevron center fold */}
                  <ellipse cx="120" cy="46" rx="45" ry="18" fill="#14110F" stroke="#3D332B" strokeWidth="1.2" />
                  <path
                    d="M 76 48 C 78 24, 162 24, 164 48 C 160 59, 80 59, 76 48 Z"
                    fill={`url(#khanDongMaleGrad-${uid})`}
                    stroke="#1C1815"
                    strokeWidth="1.2"
                  />
                  {/* Traditional Chữ Nhân (Chevron) front folds */}
                  <path d="M 78 45 L 120 35 L 162 45" stroke="#3A3029" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M 82 52 L 120 42 L 158 52" stroke="#4D4037" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M 86 58 L 120 49 L 154 58" stroke="#1A1613" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="120" cy="42" r="1.8" fill={`url(#goldGrad-${uid})`} opacity="0.85" />
                </g>
              )}

              {hasNonQuaiThao && (
                <g id={`acc-avatar-non-quai-thao-male-${uid}`} className="animate-acc-head">
                  <g transform={`translate(0, ${nonQuaiThaoY - 45})`}>
                    {/* Shadow cast naturally on hair and forehead */}
                    <ellipse cx="120" cy="49" rx="72" ry="19" fill="rgba(28, 25, 23, 0.22)" />
                    {/* Woven Brim */}
                    <ellipse cx="120" cy="45" rx="74" ry="19.5" fill={`url(#nonBrimGrad-${uid})`} stroke="#B89B77" strokeWidth="1.8" />
                    <ellipse cx="120" cy="45" rx="62" ry="16" fill="none" stroke="#CBB492" strokeWidth="1.1" strokeDasharray="4 2" />
                    <ellipse cx="120" cy="44" rx="49" ry="12.5" fill="none" stroke="#BA9F7B" strokeWidth="1.1" strokeDasharray="3 2" />
                    {/* Raised Center Dome */}
                    <ellipse cx="120" cy="42.5" rx="31" ry="8.5" fill="#DFCCA8" stroke="#A98A65" strokeWidth="1.2" />
                    <ellipse cx="120" cy="40.5" rx="19" ry="5.2" fill="#CBB492" />
                    <circle cx="120" cy="38.5" r="3" fill="#991B1E" stroke="#5E1B24" strokeWidth="0.8" />
                    {/* Quai thao ribbons */}
                    <path
                      d="M 72 50 C 67 82, 65 130, 78 184 C 82 190, 87 188, 85 182 C 73 135, 74 86, 78 52 Z"
                      fill="#991B1E"
                      stroke="#7F1D1D"
                      strokeWidth="0.8"
                    />
                    <path d="M 74 53 C 70 85, 69 131, 80 182" stroke="#BE123C" strokeWidth="1.2" fill="none" opacity="0.8" />
                    <circle cx="81" cy="185" r="2.2" fill={`url(#goldGrad-${uid})`} />
                    <path
                      d="M 168 50 C 173 82, 175 130, 162 184 C 158 190, 153 188, 155 182 C 167 135, 166 86, 162 52 Z"
                      fill="#991B1E"
                      stroke="#7F1D1D"
                      strokeWidth="0.8"
                    />
                    <path d="M 166 53 C 170 85, 171 131, 160 182" stroke="#BE123C" strokeWidth="1.2" fill="none" opacity="0.8" />
                    <circle cx="159" cy="185" r="2.2" fill={`url(#goldGrad-${uid})`} />
                  </g>
                </g>
              )}
            </g>
          )}

          {/* ACCESSORY & POSE: Ô TRUYỀN THỐNG VIỆT NAM (SYNCHRONIZED AVATAR POSE) */}
          {holdingUmbrella && (
            <g id={`avatar-umbrella-${uid}`} className="animate-acc-hand">
              {/* Umbrella Canopy sheltered gracefully above head */}
              <g transform="translate(142, 28) rotate(16)">
                {/* Soft ambient under-canopy shadow */}
                <ellipse cx="0" cy="22" rx="72" ry="16" fill="rgba(28, 25, 23, 0.22)" />

                {/* Canopy Dome */}
                <path
                  d="M -75 22 C -75 -6, 75 -6, 75 22 C 60 25, 45 22, 30 25 C 15 22, 0 25, -15 22 C -30 25, -45 22, -60 25 C -68 22, -75 22, -75 22 Z"
                  fill={`url(#umbrellaCanopy-${uid})`}
                  stroke="#5E1B24"
                  strokeWidth="1.6"
                />
                {/* Inner sheen gradient overlay */}
                <path
                  d="M -72 20 C -72 -4, 72 -4, 72 20 Z"
                  fill="#FFFFFF"
                  opacity="0.14"
                />
                {/* Top ferrule hub & brass finial cap */}
                <polygon points="-3,-5 0,-13 3,-5" fill="#3D2617" stroke={`url(#goldGrad-${uid})`} strokeWidth="1" />
                <circle cx="0" cy="-5" r="2.8" fill={`url(#goldGrad-${uid})`} stroke="#991B1E" strokeWidth="0.8" />

                {/* Radiating Bamboo ribs */}
                <path d="M 0 -5 L -68 22" stroke="#EAB308" strokeWidth="1.2" opacity="0.9" />
                <path d="M 0 -5 L -48 24" stroke="#EAB308" strokeWidth="1.2" opacity="0.9" />
                <path d="M 0 -5 L -26 25" stroke="#EAB308" strokeWidth="1.2" opacity="0.9" />
                <path d="M 0 -5 L 0 25" stroke="#EAB308" strokeWidth="1.2" opacity="0.9" />
                <path d="M 0 -5 L 26 25" stroke="#EAB308" strokeWidth="1.2" opacity="0.9" />
                <path d="M 0 -5 L 48 24" stroke="#EAB308" strokeWidth="1.2" opacity="0.9" />
                <path d="M 0 -5 L 68 22" stroke="#EAB308" strokeWidth="1.2" opacity="0.9" />

                {/* Scalloped Gold Silk Border Piping */}
                <path
                  d="M -75 22 C -68 25, -60 22, -45 25 C -30 22, -15 25, 0 22 C 15 25, 30 22, 45 25 C 60 22, 75 22, 75 22"
                  stroke={`url(#goldGrad-${uid})`}
                  strokeWidth="1.4"
                  fill="none"
                />
              </g>

              {/* Slender Bamboo Shaft extending diagonally from canopy through character's shoulder down to hand */}
              <line x1="142" y1="28" x2="182" y2="188" stroke={`url(#umbrellaShaft-${uid})`} strokeWidth="3" strokeLinecap="round" />
              <line x1="143" y1="28" x2="183" y2="188" stroke="#F9DF98" strokeWidth="0.8" opacity="0.8" />
              <circle cx="156" cy="88" r="2.2" fill={`url(#goldGrad-${uid})`} />

              {/* Hand holding the shaft near the lower-right edge of avatar */}
              <g transform="translate(176, 168)">
                {/* Sleeve cuff of the raised arm in active outfit color */}
                <ellipse cx="-4" cy="5" rx="14" ry="9" transform="rotate(-35)" fill={garment.mid} stroke={garment.deep} strokeWidth="1.2" />
                <ellipse cx="-3" cy="4" rx="11" ry="6.5" transform="rotate(-35)" fill="#FAF8F5" />
                {/* Hand & fingers wrapped around bamboo shaft */}
                <ellipse cx="2" cy="-2" rx="7.5" ry="9.5" transform="rotate(-20)" fill={skin.base} stroke={skin.deepShade} strokeWidth="1" />
                {/* Thumb curved over front of shaft */}
                <path d="M -2 -6 C 1 -7, 5 -5, 4 -1" stroke={skin.base} strokeWidth="3.2" strokeLinecap="round" fill="none" />
                <path d="M -1 -5 C 2 -6, 4 -4, 3 -1" stroke={skin.deepShade} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.5" />
              </g>

              {/* Lower Shaft Handle & Red Silk Tassel */}
              <line x1="182" y1="188" x2="189" y2="216" stroke={`url(#umbrellaShaft-${uid})`} strokeWidth="3" strokeLinecap="round" />
              {/* Curved Bamboo Root Handle */}
              <path d="M 189 216 C 191 222, 189 226, 184 227 C 180 228, 178 224, 180 221" stroke={`url(#umbrellaShaft-${uid})`} strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Traditional Crimson Silk Tassel */}
              <g transform="translate(180, 222)">
                <circle cx="0" cy="1" r="1.8" fill={`url(#goldGrad-${uid})`} />
                <rect x="-1.5" y="2.5" width="3" height="3" rx="0.8" fill="#991B1E" />
                <path d="M 0 5.5 L -1 16 M 0 5.5 L 0 17 M 0 5.5 L 1 16" stroke="#BE123C" strokeWidth="1" strokeLinecap="round" />
              </g>
            </g>
          )}

          {/* Golden Outer Rim Ring */}
          <circle
            cx="120"
            cy="120"
            r="118.5"
            fill="none"
            stroke={isFemale ? '#D4AF37' : '#991B1E'}
            strokeWidth="2.5"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Optional Badge Indicator */}
      {showBadge && (
        <span
          className={`absolute -bottom-1 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs border ${
            isFemale
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-stone-800 text-stone-100 border-stone-600'
          }`}
        >
          {isFemale ? `Nữ • ${outfitLabel}` : `Nam • ${outfitLabel}`}
        </span>
      )}

      {/* Optional Attire Label */}
      {showAttireLabel && (
        <div className="mt-1 text-center">
          <div className="text-[11px] font-bold text-[#1C1917]">
            {isFemale ? 'Nữ Giới' : 'Nam Giới'}
          </div>
          <div className="text-[10px] text-[#991B1E] font-medium">
            {outfitLabel}
          </div>
        </div>
      )}
    </div>
  );
};
