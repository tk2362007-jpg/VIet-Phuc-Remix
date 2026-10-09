import React from 'react';
import { OutfitId, ColorId, SkinToneId, HairstyleId } from '../types';
import { COLORS_DATA } from '../data/colors';
import { getFemaleHairstyleById, getMaleHairstyleById } from '../data/hairstyles.js';

export type CharacterGender = 'female' | 'male';

export interface Stylized3DCharacterProps {
  gender: CharacterGender;
  skinTone?: SkinToneId;
  hairstyle?: HairstyleId;
  outfitId?: OutfitId;
  colorId: ColorId;
  accessories?: string[];
  lastChangedAccessory?: string | null;
  isTransitioning?: boolean;
  fitContainer?: boolean;
  className?: string;
}

interface ColorPaletteShader {
  primary: string;
  shade: string;
  highlight: string;
  accent: string;
  trim: string;
}

interface SkinShaderPalette {
  faceHighlight: string;
  faceMid: string;
  faceShade: string;
  neckHighlight: string;
  neckMid: string;
  neckShade: string;
  bodyHighlight: string;
  bodyMid: string;
  bodyShade: string;
  blush: string;
  chinShadow: string;
}

const SKIN_SHADERS: Record<SkinToneId, SkinShaderPalette> = {
  fair: {
    faceHighlight: '#FFF3EB',
    faceMid: '#FDE0CC',
    faceShade: '#EBBFA3',
    neckHighlight: '#F5CCA9',
    neckMid: '#FDE0CC',
    neckShade: '#DEAE8F',
    bodyHighlight: '#FFF0E5',
    bodyMid: '#FAD9C3',
    bodyShade: '#E2B295',
    blush: '#F87171',
    chinShadow: 'rgba(180, 115, 85, 0.28)'
  },
  neutral: {
    faceHighlight: '#FFE8D6',
    faceMid: '#F5CCB0',
    faceShade: '#DFA887',
    neckHighlight: '#EBC0A2',
    neckMid: '#F5CCB0',
    neckShade: '#D69C7A',
    bodyHighlight: '#FFE4D0',
    bodyMid: '#F5C8A8',
    bodyShade: '#D99E7C',
    blush: '#E88D84',
    chinShadow: 'rgba(166, 110, 82, 0.35)'
  },
  warm: {
    faceHighlight: '#FDE8CE',
    faceMid: '#EFC194',
    faceShade: '#D49D6C',
    neckHighlight: '#E2B080',
    neckMid: '#EFC194',
    neckShade: '#C98C58',
    bodyHighlight: '#FCE3C5',
    bodyMid: '#EAB98B',
    bodyShade: '#CD905E',
    blush: '#EA580C',
    chinShadow: 'rgba(155, 95, 55, 0.40)'
  },
  tan: {
    faceHighlight: '#E8BE96',
    faceMid: '#C7956D',
    faceShade: '#A06C47',
    neckHighlight: '#B57F57',
    neckMid: '#C7956D',
    neckShade: '#915934',
    bodyHighlight: '#E2B388',
    bodyMid: '#BF8A60',
    bodyShade: '#99633D',
    blush: '#B45309',
    chinShadow: 'rgba(120, 65, 30, 0.48)'
  }
};

const COLOR_SHADERS: Record<ColorId, ColorPaletteShader> = {
  red: {
    primary: '#A3262A',
    shade: '#6B1417',
    highlight: '#D6454A',
    accent: '#C8973E',
    trim: '#F5EFE6'
  },
  burgundy: {
    primary: '#5E1B24',
    shade: '#380B12',
    highlight: '#8A2E3B',
    accent: '#D4AF37',
    trim: '#FAF8F5'
  },
  cream: {
    primary: '#F5EFE6',
    shade: '#D6C8B4',
    highlight: '#FFFFFF',
    accent: '#A3262A',
    trim: '#C8973E'
  },
  yellow: {
    primary: '#C8973E',
    shade: '#8A631E',
    highlight: '#F0B84D',
    accent: '#5E1B24',
    trim: '#FAF8F5'
  },
  blue: {
    primary: '#2B4A6F',
    shade: '#182C44',
    highlight: '#4872A3',
    accent: '#C8973E',
    trim: '#F5EFE6'
  },
  green: {
    primary: '#315643',
    shade: '#1A3326',
    highlight: '#4D8065',
    accent: '#C8973E',
    trim: '#F5EFE6'
  },
  black: {
    primary: '#1E1B18',
    shade: '#0E0C0B',
    highlight: '#3D3630',
    accent: '#D4AF37',
    trim: '#FAF8F5'
  },
  pastel: {
    primary: '#E8C5C8',
    shade: '#BD969A',
    highlight: '#FFF0F2',
    accent: '#A3262A',
    trim: '#5E1B24'
  }
};

export const Stylized3DCharacter: React.FC<Stylized3DCharacterProps> = ({
  gender = 'female',
  skinTone = 'neutral',
  hairstyle = 'long',
  outfitId = 'ao-dai',
  colorId = 'cream',
  accessories = [],
  lastChangedAccessory = null,
  isTransitioning = false,
  fitContainer = false,
  className = ''
}) => {
  const isFemale = gender === 'female';
  const isUnderwearOnly = false;
  const shader = COLOR_SHADERS[colorId] || COLOR_SHADERS.burgundy;
  const skinShader = SKIN_SHADERS[skinTone] || SKIN_SHADERS.neutral;
  const activeFemaleHair = getFemaleHairstyleById(hairstyle);
  const activeMaleHair = getMaleHairstyleById(hairstyle);

  // Accessory toggles
  const hasKhanDong = accessories.includes('khan-dong');
  const hasKiengBac = accessories.includes('vong-kieng-bac');
  const hasNgocTrai = accessories.includes('chuoi-ngoc-trai');
  const hasNonQuaiThao = accessories.includes('non-quai-thao');
  const hasSneakers = accessories.includes('sneakers-retro-trang');
  const hasSandal = accessories.includes('sandal-day-manh');
  const holdingUmbrella =
    accessories.includes('o-truyen-thong') ||
    accessories.includes('umbrella') ||
    accessories.includes('o');

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center select-none transition-all duration-300 ease-out ${
        isTransitioning ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
      } ${className}`}
    >
      {/* 3D Ambient Spotlight Halo */}
      {!fitContainer && (
        <div
          className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
          style={{
            background: isFemale
              ? 'radial-gradient(circle, rgba(255,253,249,0.95) 0%, rgba(200,151,62,0.18) 60%, transparent 100%)'
              : 'radial-gradient(circle, rgba(200,151,62,0.22) 0%, rgba(153,27,30,0.12) 60%, transparent 100%)'
          }}
        />
      )}

      {/* Main 3D Canvas */}
      <div
        className={`relative flex items-center justify-center ${
          fitContainer
            ? 'w-full h-full max-h-full min-h-0'
            : 'w-64 h-[420px] sm:w-80 sm:h-[500px]'
        }`}
      >
        <svg
          viewBox="-8 -6 256 392"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full max-h-full overflow-visible drop-shadow-[0_18px_28px_rgba(28,25,23,0.16)]"
          aria-label={`Nhân vật ${isFemale ? 'Nữ' : 'Nam'} trong trang phục ${outfitId}`}
        >
          <defs>
            {/* Skin Shaders - Dynamically matching chosen SkinTone */}
            <radialGradient id="skinFace3D" cx="45%" cy="38%" r="60%">
              <stop offset="0%" stopColor={skinShader.faceHighlight} />
              <stop offset="65%" stopColor={skinShader.faceMid} />
              <stop offset="100%" stopColor={skinShader.faceShade} />
            </radialGradient>

            <linearGradient id="skinNeck3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={skinShader.neckHighlight} />
              <stop offset="50%" stopColor={skinShader.neckMid} />
              <stop offset="100%" stopColor={skinShader.neckShade} />
            </linearGradient>

            <linearGradient id="skinBody3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={skinShader.bodyHighlight} />
              <stop offset="70%" stopColor={skinShader.bodyMid} />
              <stop offset="100%" stopColor={skinShader.bodyShade} />
            </linearGradient>

            {/* Natural Black Silk Hair Shaders (Modern Game Character Creator Aesthetic) */}
            <linearGradient id="hairShader" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#232028" />
              <stop offset="28%" stopColor="#16141A" />
              <stop offset="70%" stopColor="#100E13" />
              <stop offset="100%" stopColor="#09080B" />
            </linearGradient>

            <linearGradient id="hairBackDepthShader" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#151319" />
              <stop offset="45%" stopColor="#0E0D12" />
              <stop offset="85%" stopColor="#141218" />
              <stop offset="100%" stopColor="#0A090C" />
            </linearGradient>

            <linearGradient id="hairSilkSheen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B3544" stopOpacity="0" />
              <stop offset="35%" stopColor="#4A4356" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#665D75" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#4A4356" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#3B3544" stopOpacity="0" />
            </linearGradient>

            {/* Dynamic Outfit Tunic Shader */}
            <linearGradient id="dynamicTunicShader" x1="15%" y1="5%" x2="85%" y2="95%">
              <stop offset="0%" stopColor={shader.highlight} />
              <stop offset="50%" stopColor={shader.primary} />
              <stop offset="100%" stopColor={shader.shade} />
            </linearGradient>

            <linearGradient id="dynamicTunicFold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={shader.shade} />
              <stop offset="50%" stopColor={shader.primary} />
              <stop offset="100%" stopColor={shader.shade} />
            </linearGradient>

            {/* Male Traditional Silk Tunic 3D Cylindrical Shader */}
            <linearGradient id="maleTunicSilk3D" x1="12%" y1="8%" x2="88%" y2="92%">
              <stop offset="0%" stopColor={shader.highlight} />
              <stop offset="38%" stopColor={shader.primary} />
              <stop offset="82%" stopColor={shader.primary} />
              <stop offset="100%" stopColor={shader.shade} />
            </linearGradient>

            {/* Male Traditional White Silk Trousers Shader */}
            <linearGradient id="maleWhiteSilkPants" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FAF8F5" />
              <stop offset="100%" stopColor="#EAE1D3" />
            </linearGradient>

            {/* Undergarment Silk Shader */}
            <linearGradient id="undergarmentSilk" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="45%" stopColor="#F5EFE6" />
              <stop offset="100%" stopColor="#E0D4C3" />
            </linearGradient>

            {/* Silver Torque (Kiềng Bạc) Shader */}
            <linearGradient id="silverKiengShader" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#E2E8F0" />
              <stop offset="80%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            {/* Gold Accents */}
            <linearGradient id="goldAccentShader" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9E7225" />
              <stop offset="50%" stopColor="#F5D587" />
              <stop offset="100%" stopColor="#9E7225" />
            </linearGradient>

            {/* Pedestal Shaders */}
            <linearGradient id="pedestalTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="60%" stopColor="#EFE5D5" />
              <stop offset="100%" stopColor="#DECBB2" />
            </linearGradient>
            <linearGradient id="pedestalSide" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BBA68E" />
              <stop offset="50%" stopColor="#E6D7C3" />
              <stop offset="100%" stopColor="#A89279" />
            </linearGradient>

            {/* Traditional Vietnamese Oiled Silk Umbrella Shaders */}
            <linearGradient id="umbrellaCanopyShader" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#C22932" />
              <stop offset="35%" stopColor="#991B1E" />
              <stop offset="80%" stopColor="#6B1417" />
              <stop offset="100%" stopColor="#450A0C" />
            </linearGradient>
            <linearGradient id="umbrellaBambooShaftShader" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A301E" />
              <stop offset="45%" stopColor="#7C5233" />
              <stop offset="70%" stopColor="#936642" />
              <stop offset="100%" stopColor="#3E2718" />
            </linearGradient>

            {/* Authentic Vietnamese Nón Quai Thao (Nón Ba Tầm) Shaders */}
            <linearGradient id="nonBrimShader" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9F2E6" />
              <stop offset="35%" stopColor="#EDE0CC" />
              <stop offset="70%" stopColor="#DECBB0" />
              <stop offset="100%" stopColor="#C9B392" />
            </linearGradient>
            <radialGradient id="nonDomeShader" cx="45%" cy="38%" r="60%">
              <stop offset="0%" stopColor="#F7EADB" />
              <stop offset="50%" stopColor="#E2CCA8" />
              <stop offset="100%" stopColor="#B3956D" />
            </radialGradient>
            <linearGradient id="quaiThaoSilkShader" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="35%" stopColor="#B91C1C" />
              <stop offset="70%" stopColor="#991B1E" />
              <stop offset="100%" stopColor="#6E1114" />
            </linearGradient>
            <radialGradient id="quaiThaoGoldBead" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#854D0E" />
            </radialGradient>
          </defs>

          {/* =================================================================
              LAYER 0: 3D TURNTABLE PEDESTAL
             ================================================================= */}
          <g id="pedestal">
            <ellipse cx="120" cy="358" rx="78" ry="16" fill="rgba(28, 25, 23, 0.14)" />
            <path d="M 48 340 L 48 350 A 72 14 0 0 0 192 350 L 192 340 Z" fill="url(#pedestalSide)" />
            <ellipse cx="120" cy="340" rx="72" ry="14" fill="url(#pedestalTop)" stroke="url(#goldAccentShader)" strokeWidth="1.5" />
            <ellipse cx="120" cy="340" rx="58" ry="10.5" fill="none" stroke="#C8973E" strokeWidth="0.75" strokeDasharray="4 3" opacity="0.65" />
            <ellipse cx="120" cy="341" rx="34" ry="7" fill="rgba(28, 25, 23, 0.22)" />
          </g>

          {/* =================================================================
              LAYER 1: BACK HAIR (UNIFIED FEMALE HAIRSTYLE SYSTEM: LONG / BUN / BRAID / SHORT)
              - Cùng một hệ thống thiết kế nhân vật, màu đen tự nhiên, mềm mại, tôn cổ áo dài
             ================================================================= */}
          {isFemale && (
            <g id="hair-back">
              {/* [1] TÓC DÀI (LONG) */}
              {activeFemaleHair.id === 'long' && (
                <g id="hair-back-long">
                  <path
                    d={
                      hasKhanDong
                        ? 'M 90 48 C 84 72, 79 102, 77 136 C 75 162, 80 185, 88 198 C 93 192, 95 186, 97 199 C 106 204, 114 205, 120 205 C 126 205, 134 204, 143 199 C 145 186, 147 192, 152 198 C 160 185, 165 162, 163 136 C 161 102, 156 72, 150 48 Z'
                        : 'M 120 20 C 99 20, 88 32, 87 50 C 86 68, 81 92, 78 122 C 75 152, 79 180, 87 197 C 92 190, 94 185, 97 199 C 105 204, 113 205, 120 205 C 127 205, 135 204, 143 199 C 146 185, 148 190, 153 197 C 161 180, 165 152, 162 122 C 159 92, 154 68, 153 50 C 152 32, 141 20, 120 20 Z'
                    }
                    fill="url(#hairBackDepthShader)"
                  />
                  <path
                    d="M 88 54 C 84 78, 80 108, 80 140 C 80 165, 84 184, 91 196 C 96 182, 98 152, 100 116 L 140 116 C 142 152, 144 182, 149 196 C 156 184, 160 165, 160 140 C 160 108, 156 78, 152 54 Z"
                    fill="url(#hairShader)"
                    opacity="0.92"
                  />
                  <ellipse cx="120" cy="88" rx="22" ry="18" fill="#08070A" opacity="0.85" />
                  <path d="M 86 72 C 83 106, 82 144, 87 184" stroke="#35303E" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55" />
                  <path d="M 91 84 C 89 118, 88 152, 93 190" stroke="#28242F" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.5" />
                  <path d="M 154 72 C 157 106, 158 144, 153 184" stroke="#35303E" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55" />
                  <path d="M 149 84 C 151 118, 152 152, 147 190" stroke="#28242F" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.5" />
                </g>
              )}

              {/* [2] TÓC BÚI (BUN) — Búi gọn hiện đại phía sau đầu, không phụ kiện/trâm cài, khoe trọn cổ áo dài */}
              {activeFemaleHair.id === 'bun' && (
                <g id="hair-back-bun">
                  {!hasKhanDong && !hasNonQuaiThao && (
                    <g id="clean-modern-back-bun">
                      {/* Compact, neat modern chignon bun positioned slightly high at the back of the crown */}
                      <ellipse cx="120" cy="19.5" rx="16.5" ry="9.5" fill="url(#hairBackDepthShader)" />
                      <ellipse cx="120" cy="19" rx="14.5" ry="8" fill="url(#hairShader)" />
                      {/* Soft natural twisted silk wrap lines on the bun (no pins or ornaments) */}
                      <path
                        d="M 108 18.5 Q 120 13.5 132 18.5"
                        stroke="#383242"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.7"
                      />
                      <path
                        d="M 111 21.5 Q 120 17.5 129 21.5"
                        stroke="url(#hairSilkSheen)"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                  )}
                  {/* Sleek, tidy back-of-head hair shell swept cleanly up toward the bun */}
                  <path
                    d={
                      hasKhanDong
                        ? 'M 90 48 C 89 60, 95 71, 109 75 L 131 75 C 145 71, 151 60, 150 48 Z'
                        : 'M 120 20 C 99 20, 88 32, 88 49 C 88 62, 95 72, 109 75 L 131 75 C 145 72, 152 62, 152 49 C 152 32, 141 20, 120 20 Z'
                    }
                    fill="url(#hairBackDepthShader)"
                  />
                </g>
              )}

              {/* [3] TÓC TẾT (BRAID) — Phần tóc sau đầu gọn gàng dẫn xuống bím tóc tết */}
              {activeFemaleHair.id === 'braid' && (
                <g id="hair-back-braid">
                  <path
                    d={
                      hasKhanDong
                        ? 'M 90 48 C 88 62, 92 74, 106 78 L 134 78 C 148 74, 152 62, 150 48 Z'
                        : 'M 120 20 C 99 20, 88 32, 87 50 C 87 64, 93 74, 106 78 L 134 78 C 147 74, 153 64, 153 50 C 152 32, 141 20, 120 20 Z'
                    }
                    fill="url(#hairBackDepthShader)"
                  />
                  {/* Soft depth behind neck */}
                  <ellipse cx="120" cy="80" rx="16" ry="9" fill="#08070A" opacity="0.65" />
                </g>
              )}

              {/* [4] TÓC NGẮN (SHORT) — Tóc ngắn bob hiện đại ngang cằm/trên vai uốn cụp chữ C mềm mại */}
              {activeFemaleHair.id === 'short' && (
                <g id="hair-back-short">
                  <path
                    d={
                      hasKhanDong
                        ? 'M 89 48 C 84 62, 82 77, 89 87 C 95 91, 103 90, 109 86 L 131 86 C 137 90, 145 91, 151 87 C 158 77, 156 62, 151 48 Z'
                        : 'M 120 20 C 99 20, 88 32, 86 50 C 83 66, 82 79, 89 87 C 95 91, 103 90, 109 86 L 131 86 C 137 90, 145 91, 151 87 C 158 79, 157 66, 154 50 C 152 32, 141 20, 120 20 Z'
                    }
                    fill="url(#hairBackDepthShader)"
                  />
                  {/* Outer silky bob layer curving gently inward at the nape */}
                  <path
                    d="M 87 52 C 84 66, 84 78, 90 86 C 95 89, 101 88, 106 85 L 134 85 C 139 88, 145 89, 150 86 C 156 78, 156 66, 153 52 Z"
                    fill="url(#hairShader)"
                    opacity="0.94"
                  />
                  {/* Deep shadow under chin/nape to separate bob from neck */}
                  <ellipse cx="120" cy="83" rx="18" ry="8" fill="#08070A" opacity="0.8" />
                  {/* Subtle inward C-curl sheen on back bob */}
                  <path d="M 87 64 C 85 74, 86 82, 92 86" stroke="#35303E" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
                  <path d="M 153 64 C 155 74, 154 82, 148 86" stroke="#35303E" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
                </g>
              )}
            </g>
          )}

          {/* =================================================================
              LAYER 1B: MALE BACK HAIR (5 TRADITIONAL & CLASSIC MALE HAIRSTYLES)
              - Positioned strictly behind cranium, ears, neck & standing collar
             ================================================================= */}
          {!isFemale && (
            <g id="hair-male-back">
              {/* [1] TÓC NGẮN TRUYỀN THỐNG (MALE-SHORT) */}
              {activeMaleHair.id === 'male-short' && (
                <g id="hair-male-back-short">
                  <path
                    d={
                      hasKhanDong
                        ? 'M 91 44 C 91 56, 96 66, 107 72 L 133 72 C 144 66, 149 56, 149 44 Z'
                        : 'M 120 19 C 98 19, 89 30, 89 45 C 89 56, 95 66, 107 72 L 133 72 C 145 66, 151 56, 151 45 C 151 30, 142 19, 120 19 Z'
                    }
                    fill="url(#hairBackDepthShader)"
                  />
                </g>
              )}

              {/* [2] TÓC BÚI CAO CỔ TRANG VIỆT NAM (MALE-BUN) */}
              {activeMaleHair.id === 'male-bun' && (
                <g id="hair-male-back-bun">
                  {!hasKhanDong && !hasNonQuaiThao && (
                    <g id="male-ancient-topknot">
                      {/* Sculpted high topknot bun (Búi tó / búi củ hành cổ trang Đại Việt) */}
                      <ellipse cx="120" cy="12.5" rx="12.5" ry="9" fill="url(#hairBackDepthShader)" />
                      <ellipse cx="120" cy="12" rx="11" ry="7.8" fill="url(#hairShader)" />
                      {/* Traditional wooden/jade hairpin (Trâm cài cổ trang) */}
                      <line x1="102" y1="12.5" x2="138" y2="12.5" stroke="#8C6239" strokeWidth="2.2" strokeLinecap="round" />
                      <circle cx="102" cy="12.5" r="2" fill="#C8973E" />
                      <circle cx="138" cy="12.5" r="1.6" fill="#C8973E" />
                      {/* Twisted hair coil highlights on the topknot */}
                      <path d="M 111 10.5 Q 120 6.5 129 10.5" stroke="#3D3647" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.75" />
                      <path d="M 112 14 Q 120 10.5 128 14" stroke="url(#hairSilkSheen)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      {/* Traditional silk/bronze base ring (Mão quyển cố định búi tóc) */}
                      <rect x="110.5" y="17.8" width="19" height="3.8" rx="1.8" fill="#2A211B" stroke="#C8973E" strokeWidth="0.9" />
                    </g>
                  )}
                  {/* Sleek upward-swept back cranial shell */}
                  <path
                    d={
                      hasKhanDong
                        ? 'M 91 44 C 91 56, 96 66, 107 72 L 133 72 C 144 66, 149 56, 149 44 Z'
                        : 'M 120 19 C 98 19, 89 30, 89 45 C 89 56, 95 66, 107 72 L 133 72 C 145 66, 151 56, 151 45 C 151 30, 142 19, 120 19 Z'
                    }
                    fill="url(#hairBackDepthShader)"
                  />
                </g>
              )}

              {/* [3] TÓC DÀI BUỘC SAU (MALE-PONYTAIL) */}
              {activeMaleHair.id === 'male-ponytail' && (
                <g id="hair-male-back-ponytail">
                  {/* Main cranial back shell */}
                  <path
                    d={
                      hasKhanDong
                        ? 'M 90 44 C 89 58, 94 70, 105 76 L 135 76 C 146 70, 151 58, 150 44 Z'
                        : 'M 120 18.5 C 97 18.5, 88 30, 88 45 C 88 58, 94 70, 105 76 L 135 76 C 146 70, 152 58, 152 45 C 152 30, 143 18.5, 120 18.5 Z'
                    }
                    fill="url(#hairBackDepthShader)"
                  />
                  {/* Gathered low ponytail behind nape & upper back (visible behind neck/shoulders without clipping collar) */}
                  <path
                    d="M 101 68 C 96 78, 93 90, 95 102 L 145 102 C 147 90, 144 78, 139 68 Z"
                    fill="url(#hairBackDepthShader)"
                  />
                  <path
                    d="M 104 72 C 99 81, 97 91, 99 100 L 141 100 C 143 91, 141 81, 136 72 Z"
                    fill="url(#hairShader)"
                    opacity="0.92"
                  />
                  {/* Subtle silk strand lines sweeping toward back ponytail tie */}
                  <path d="M 98 74 C 96 82, 96 90, 99 96" stroke="#3B3544" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.65" />
                  <path d="M 142 74 C 144 82, 144 90, 141 96" stroke="#3B3544" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.65" />
                </g>
              )}

              {/* [4] TÓC RẼ NGÔI CỔ ĐIỂN (MALE-PARTED) */}
              {activeMaleHair.id === 'male-parted' && (
                <g id="hair-male-back-parted">
                  <path
                    d={
                      hasKhanDong
                        ? 'M 90 44 C 90 56, 95 66, 107 72 L 133 72 C 145 66, 150 56, 150 44 Z'
                        : 'M 120 18.5 C 97 18.5, 88 29, 88.5 45 C 89 56, 95 66, 107 72 L 133 72 C 145 66, 151 56, 151.5 45 C 152 29, 143 18.5, 120 18.5 Z'
                    }
                    fill="url(#hairBackDepthShader)"
                  />
                </g>
              )}

              {/* [5] TÓC BUỘC NỬA ĐẦU (MALE-HALF-UP) */}
              {activeMaleHair.id === 'male-half-up' && (
                <g id="hair-male-back-half-up">
                  {/* Upper half-up scholar crown knot (Búi/buộc nửa đầu thư sinh) */}
                  {!hasKhanDong && (
                    <g id="male-half-up-crown-knot">
                      <ellipse cx="120" cy="15" rx="10.5" ry="6.5" fill="url(#hairBackDepthShader)" />
                      <ellipse cx="120" cy="14.5" rx="9.2" ry="5.5" fill="url(#hairShader)" />
                      <path d="M 113 13.5 Q 120 10.5 127 13.5" stroke="url(#hairSilkSheen)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                      <rect x="112" y="18.2" width="16" height="2.6" rx="1.3" fill="#2A211B" stroke="#C8973E" strokeWidth="0.7" />
                    </g>
                  )}
                  {/* Flowing lower hair cascading neatly behind ears, neck & outer shoulders (completely behind collar) */}
                  <path
                    d={
                      hasKhanDong
                        ? 'M 89 45 C 85 64, 82 86, 84 106 C 88 103, 91 99, 94 107 C 102 110, 138 110, 146 107 C 149 99, 152 103, 156 106 C 158 86, 155 64, 151 45 Z'
                        : 'M 120 19 C 97 19, 88 30, 87 46 C 84 64, 81 86, 84 106 C 88 103, 91 99, 94 107 C 102 110, 138 110, 146 107 C 149 99, 152 103, 156 106 C 159 86, 156 64, 153 46 C 152 30, 143 19, 120 19 Z'
                    }
                    fill="url(#hairBackDepthShader)"
                  />
                  <path
                    d="M 88 52 C 85 68, 84 86, 86 103 C 90 100, 93 97, 96 104 L 144 104 C 147 97, 150 100, 154 103 C 156 86, 155 68, 152 52 Z"
                    fill="url(#hairShader)"
                    opacity="0.94"
                  />
                  {/* Deep neck shadow so jaw & standing collar pop cleanly */}
                  <ellipse cx="120" cy="82" rx="20" ry="12" fill="#08070A" opacity="0.82" />
                  {/* Silky back shoulder waves */}
                  <path d="M 88 66 C 86 80, 86 92, 89 102" stroke="#3B3544" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.65" />
                  <path d="M 93 72 C 91 84, 91 94, 94 103" stroke="#2D2836" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.55" />
                  <path d="M 152 66 C 154 80, 154 92, 151 102" stroke="#3B3544" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.65" />
                  <path d="M 147 72 C 149 84, 149 94, 146 103" stroke="#2D2836" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.55" />
                </g>
              )}
            </g>
          )}

          {/* =================================================================
              LAYER 2: BARE BODY & UNDERWEAR FOUNDATION
             ================================================================= */}
          <g id="bare-human-body">
            {/* Neck */}
            <rect
              x={isFemale ? '111' : '108'}
              y="76"
              width={isFemale ? '18' : '24'}
              height="24"
              rx="8"
              fill="url(#skinNeck3D)"
            />
            {/* Chin shadow on neck */}
            <ellipse cx="120" cy="82" rx={isFemale ? '9' : '11'} ry="4" fill={skinShader.chinShadow} />

            {/* Torso & Shoulders (Base anatomy) */}
            {isFemale ? (
              <path
                d="M 88 100 C 95 94, 145 94, 152 100 C 145 130, 142 160, 140 190 L 100 190 C 98 160, 95 130, 88 100 Z"
                fill="url(#skinBody3D)"
              />
            ) : (
              <path
                d="M 76 96 C 90 88, 150 88, 164 96 C 158 135, 155 165, 152 195 L 88 195 C 85 165, 82 135, 76 96 Z"
                fill="url(#skinBody3D)"
              />
            )}

            {/* Arms & Hands */}
            {isFemale ? (
              <g id="female-arms">
                {/* Left arm */}
                <path
                  d={
                    holdingUmbrella
                      ? "M 88 100 C 80 125, 73 158, 70 192 L 77 194 C 81 160, 87 132, 94 110 Z"
                      : "M 88 100 C 82 125, 76 160, 72 205 L 78 206 C 82 165, 88 135, 94 110 Z"
                  }
                  fill="url(#skinBody3D)"
                />
                <ellipse
                  cx={holdingUmbrella ? "72" : "73"}
                  cy={holdingUmbrella ? "196" : "208"}
                  rx="6.5"
                  ry="9.5"
                  transform={holdingUmbrella ? "rotate(14 72 196)" : "rotate(8 73 208)"}
                  fill="url(#skinFace3D)"
                />
                {/* Right arm */}
                {!holdingUmbrella ? (
                  <>
                    <path d="M 152 100 C 158 125, 164 160, 168 205 L 162 206 C 158 165, 152 135, 146 110 Z" fill="url(#skinBody3D)" />
                    <ellipse cx="167" cy="208" rx="6.5" ry="9.5" transform="rotate(-8 167 208)" fill="url(#skinFace3D)" />
                  </>
                ) : (
                  /* UMBRELLA HOLDING POSE: BENT RIGHT ARM RAISING TOWARDS UMBRELLA SHAFT */
                  <g id="female-arm-holding-umbrella">
                    <path
                      d="M 150 100 C 158 114, 168 128, 174 142 L 166 145 C 160 132, 152 120, 144 110 Z"
                      fill="url(#skinBody3D)"
                    />
                    <path
                      d="M 174 142 C 168 132, 160 122, 154 116 L 158 112 C 166 118, 172 128, 178 138 Z"
                      fill="url(#skinBody3D)"
                    />
                    <g id="female-hand-grip" transform="translate(154, 114)">
                      <ellipse cx="0" cy="0" rx="5.5" ry="7.5" transform="rotate(-24)" fill="url(#skinFace3D)" />
                      <path d="M -3.5 -1.5 C -2.5 -4.5, 0.5 -4.5, 1.5 -2" stroke="url(#skinBody3D)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                      <path d="M -2.5 1.5 C -1 3.5, 2 3.5, 3.5 1.5" stroke={skinShader.chinShadow} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
                    </g>
                  </g>
                )}
              </g>
            ) : (
              <g id="male-arms">
                {/* Left arm */}
                <path
                  d={
                    holdingUmbrella
                      ? "M 78 96 C 68 126, 62 160, 60 192 L 70 194 C 73 162, 78 132, 86 112 Z"
                      : "M 78 96 C 70 128, 65 164, 63 200 L 73 202 C 75 168, 80 136, 86 112 Z"
                  }
                  fill="url(#skinBody3D)"
                />
                <ellipse
                  cx={holdingUmbrella ? "65" : "67.5"}
                  cy={holdingUmbrella ? "196" : "208"}
                  rx="6.2"
                  ry="9.2"
                  transform={holdingUmbrella ? "rotate(12 65 196)" : "rotate(6 67.5 208)"}
                  fill="url(#skinFace3D)"
                />
                {/* Right arm */}
                {!holdingUmbrella ? (
                  <>
                    <path d="M 162 96 C 170 128, 175 164, 177 200 L 167 202 C 165 168, 160 136, 154 112 Z" fill="url(#skinBody3D)" />
                    <ellipse cx="172.5" cy="208" rx="6.2" ry="9.2" transform="rotate(-6 172.5 208)" fill="url(#skinFace3D)" />
                  </>
                ) : (
                  /* UMBRELLA HOLDING POSE FOR MALE: BROADER SHOULDERS, MASCULINE GRIP */
                  <g id="male-arm-holding-umbrella">
                    <path
                      d="M 164 96 C 172 112, 180 128, 184 142 L 175 145 C 170 131, 162 118, 154 108 Z"
                      fill="url(#skinBody3D)"
                    />
                    <path
                      d="M 184 142 C 178 131, 170 120, 163 112 L 168 108 C 176 116, 182 127, 188 138 Z"
                      fill="url(#skinBody3D)"
                    />
                    <g id="male-hand-grip" transform="translate(163, 110)">
                      <ellipse cx="0" cy="0" rx="6.2" ry="8.4" transform="rotate(-22)" fill="url(#skinFace3D)" />
                      <path d="M -3.8 -1.8 C -2.8 -5, 0.8 -5, 1.8 -2.2" stroke="url(#skinBody3D)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                      <path d="M -2.8 1.8 C -1 4, 2.5 4, 4.2 1.8" stroke={skinShader.chinShadow} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.6" />
                    </g>
                  </g>
                )}
              </g>
            )}

            {/* ===============================================================
                UNDERGARMENTS (ĐỒ LÓT MỘC TRUYỀN THỐNG - CULTURALLY RESPECTFUL)
                - Nữ: Áo yếm lụa thắt dây + Quần lụa lót / xà cạp mộc
                - Nam: Áo may ô lót mộc + Quần đùi lụa mộc
               =============================================================== */}
            {isFemale ? (
              /* FEMALE UNDERGARMENT: ÁO YẾM LỤA MỘC */
              <g id="undergarment-female-yem">
                {/* Neck ribbon string */}
                <path d="M 112 88 Q 120 94 128 88" stroke="#D1C3B0" strokeWidth="1.8" fill="none" />
                <circle cx="120" cy="94" r="1.5" fill="#C8973E" />
                {/* Diamond/curved silk Yếm bodice */}
                <path
                  d="M 106 100 Q 120 106 134 100 L 138 160 Q 120 166 102 160 Z"
                  fill={isUnderwearOnly ? 'url(#undergarmentSilk)' : '#FAF5ED'}
                  stroke="#D8CEBE"
                  strokeWidth="1.2"
                />
                {/* Yếm side contour & waist tie ribbon */}
                <path d="M 102 160 Q 120 164 138 160" stroke="#C8973E" strokeWidth="1.5" fill="none" />
                <path d="M 120 162 L 118 182" stroke="#C8973E" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 120 162 L 123 180" stroke="#C8973E" strokeWidth="1.5" strokeLinecap="round" />

                {/* Quần lót lụa / Xà cạp mộc (Silk briefs / inner culottes) */}
                <path
                  d="M 96 160 L 144 160 L 146 242 C 138 248, 124 246, 120 236 C 116 246, 102 248, 94 242 Z"
                  fill="url(#undergarmentSilk)"
                  stroke="#D8CEBE"
                  strokeWidth="1.2"
                />
                {/* Silk folds */}
                <path d="M 108 175 Q 120 182 132 175" stroke="#E2D7C5" strokeWidth="1.2" fill="none" />
              </g>
            ) : (
              /* MALE UNDERGARMENT: ÁO CÁNH LÓT MAY-Ô MỘC & QUẦN ĐÙI LỤA MỘC */
              <g id="undergarment-male">
                {/* May-ô / Áo cánh lót mộc */}
                <path
                  d="M 90 98 C 100 93, 140 93, 150 98 L 148 185 L 92 185 Z"
                  fill="url(#undergarmentSilk)"
                  stroke="#D8CEBE"
                  strokeWidth="1.2"
                />
                {/* Tank top scoops */}
                <path d="M 106 95 Q 120 112 134 95" fill="url(#skinNeck3D)" stroke="#D8CEBE" strokeWidth="1.2" />
                {/* Ribbed lines */}
                <line x1="110" y1="120" x2="110" y2="180" stroke="#E6DCCF" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="120" y1="120" x2="120" y2="180" stroke="#E6DCCF" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="130" y1="120" x2="130" y2="180" stroke="#E6DCCF" strokeWidth="1" strokeDasharray="3 3" />

                {/* Quần đùi lụa mộc nam */}
                <path
                  d="M 88 180 L 152 180 L 150 248 C 140 252, 126 250, 120 240 C 114 250, 100 252, 90 248 Z"
                  fill="url(#undergarmentSilk)"
                  stroke="#D8CEBE"
                  strokeWidth="1.2"
                />
                {/* Elastic drawstring */}
                <rect x="92" y="180" width="56" height="6" rx="2" fill="#E6DCCF" />
                <line x1="120" y1="184" x2="120" y2="198" stroke="#C8973E" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            )}

            {/* Head & Facial Features */}
            <g id="head-mesh">
              {/* Ears */}
              <ellipse cx={isFemale ? '94' : '91'} cy="56" rx="4.5" ry="7.5" fill="url(#skinNeck3D)" />
              <ellipse cx={isFemale ? '146' : '149'} cy="56" rx="4.5" ry="7.5" fill="url(#skinNeck3D)" />

              {/* Face Shape */}
              {isFemale ? (
                <path
                  d="M 95 46 C 95 26, 145 26, 145 46 C 145 66, 134 81, 120 82 C 106 81, 95 66, 95 46 Z"
                  fill="url(#skinFace3D)"
                />
              ) : (
                <path
                  d="M 92 44 C 92 23, 148 23, 148 44 C 148 63, 142 75, 131 81 C 124 84, 116 84, 109 81 C 98 75, 92 63, 92 44 Z"
                  fill="url(#skinFace3D)"
                />
              )}

              {/* Cheeks Blush */}
              <ellipse cx="105" cy="61" rx="5.5" ry="3" fill={skinShader.blush} opacity={isFemale ? 0.42 : 0.2} />
              <ellipse cx="135" cy="61" rx="5.5" ry="3" fill={skinShader.blush} opacity={isFemale ? 0.42 : 0.2} />

              {/* Eyebrows */}
              {isFemale ? (
                <>
                  <path d="M 102 47 Q 108 44.5 114 47" stroke="#2E221D" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M 126 47 Q 132 44.5 138 47" stroke="#2E221D" strokeWidth="2" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <path d="M 100 46.5 L 114 48" stroke="#231A16" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M 140 46.5 L 126 48" stroke="#231A16" strokeWidth="2.8" strokeLinecap="round" />
                </>
              )}

              {/* Eyes */}
              <g id="eyes">
                <ellipse cx="108" cy="54" rx="5" ry="3.8" fill="#FFFFFF" />
                <circle cx="108" cy="54" r="3.2" fill="#291D18" />
                <circle cx="109.2" cy="52.8" r="1.1" fill="#FFFFFF" />
                <path d="M 102.5 53 Q 108 49.5 113.5 53.5" stroke="#1C1411" strokeWidth={isFemale ? 2.2 : 1.8} strokeLinecap="round" fill="none" />

                <ellipse cx="132" cy="54" rx="5" ry="3.8" fill="#FFFFFF" />
                <circle cx="132" cy="54" r="3.2" fill="#291D18" />
                <circle cx="133.2" cy="52.8" r="1.1" fill="#FFFFFF" />
                <path d="M 126.5 53.5 Q 132 49.5 137.5 53" stroke="#1C1411" strokeWidth={isFemale ? 2.2 : 1.8} strokeLinecap="round" fill="none" />
              </g>

              {/* Nose */}
              <path d="M 119.5 53 L 118.5 62 Q 120 63.5 121.5 62" stroke="#D49572" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <circle cx="120" cy="61" r="1" fill="#FFF5ED" opacity="0.7" />

              {/* Lips */}
              {isFemale ? (
                <g id="female-lips">
                  <path d="M 114.5 69 Q 120 67.5 125.5 69 Q 120 73.5 114.5 69 Z" fill="#C84B4E" />
                  <ellipse cx="120" cy="70.5" rx="2.5" ry="0.7" fill="#FFE3E3" opacity="0.65" />
                </g>
              ) : (
                <g id="male-lips">
                  <path d="M 114 69.5 Q 120 71 126 69.5" stroke="#B56E5B" strokeWidth="2" strokeLinecap="round" fill="none" />
                </g>
              )}
            </g>
          </g>

          {/* =================================================================
              LAYER 3: SILK TROUSERS / PANTS (WHEN OUTER OUTFIT IS EQUIPPED)
             ================================================================= */}
          {!isUnderwearOnly && (
            <g id="mesh-trousers">
              {isFemale ? (
                <>
                  {/* Left Pant Leg */}
                  <path
                    d="M 92 185 L 118 185 L 116 330 C 107 334, 95 334, 88 330 Z"
                    fill="#FAF8F5"
                    stroke="#D8CEBE"
                    strokeWidth="1"
                  />
                  {/* Right Pant Leg */}
                  <path
                    d="M 122 185 L 148 185 L 152 330 C 145 334, 133 334, 124 330 Z"
                    fill="#FAF8F5"
                    stroke="#D8CEBE"
                    strokeWidth="1"
                  />
                  {/* Drapery Fold lines */}
                  <line x1="102" y1="220" x2="100" y2="326" stroke="#DFD5C5" strokeWidth="1.2" />
                  <line x1="138" y1="220" x2="140" y2="326" stroke="#DFD5C5" strokeWidth="1.2" />
                </>
              ) : (
                /* MALE TRADITIONAL WHITE SILK TROUSERS (Quần lụa trắng ống rộng truyền thống) */
                <g id="male-traditional-white-trousers">
                  {/* Upper waist & hip bridge so trousers sit seamlessly under tunic side slits */}
                  <path
                    d="M 87 180 L 153 180 L 154 224 L 86 224 Z"
                    fill="url(#maleWhiteSilkPants)"
                  />
                  {/* Left Wide-Leg White Silk Trouser */}
                  <path
                    d="M 86 184 L 119.5 184 L 117 329 C 108 334, 92 334, 83 329 Z"
                    fill="url(#maleWhiteSilkPants)"
                    stroke="#D8CEBE"
                    strokeWidth="1.05"
                  />
                  {/* Right Wide-Leg White Silk Trouser */}
                  <path
                    d="M 120.5 184 L 154 184 L 157 329 C 148 334, 132 334, 123 329 Z"
                    fill="url(#maleWhiteSilkPants)"
                    stroke="#D8CEBE"
                    strokeWidth="1.05"
                  />
                  {/* Center inner leg shadow crease */}
                  <path d="M 119.5 216 L 117.5 328 M 120.5 216 L 122.5 328" stroke="#D2C5B3" strokeWidth="0.9" fill="none" />
                  {/* Soft natural vertical silk drapery folds & highlights on white pants */}
                  <path d="M 96 208 C 95 252, 94 292, 93 328" stroke="#DFD4C3" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M 104 218 C 103.5 260, 103 296, 102.5 329" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                  <path d="M 110 245 C 109.5 278, 109 304, 108.5 329" stroke="#E4DACB" strokeWidth="1" strokeLinecap="round" fill="none" />
                  <path d="M 144 208 C 145 252, 146 292, 147 328" stroke="#DFD4C3" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M 136 218 C 136.5 260, 137 296, 137.5 329" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                  <path d="M 130 245 C 130.5 278, 131 304, 131.5 329" stroke="#E4DACB" strokeWidth="1" strokeLinecap="round" fill="none" />
                </g>
              )}
            </g>
          )}

          {/* =================================================================
              LAYER 4: OUTER OUTFIT GARMENTS (SWAPPABLE BASED ON OUTFIT ID)
             ================================================================= */}
          {!isUnderwearOnly && (
            <g id="mesh-outer-outfit">
              {/* ----------------- [1] ÁO DÀI (TRUYỀN THỐNG / CÁCH TÂN) ----------------- */}
              {outfitId === 'ao-dai' &&
                (isFemale ? (
                  <g id="garment-ao-dai">
                    {/* Back Tunic Panel */}
                    <path d="M 92 170 L 148 170 L 144 316 L 96 316 Z" fill={shader.shade} />

                    {/* Left Fitted Sleeve */}
                    <path
                      d="M 91 100 C 81 124, 75 162, 69 200 L 79 202 C 85 168, 91 136, 97 114 Z"
                      fill="url(#dynamicTunicShader)"
                      stroke={shader.shade}
                      strokeWidth="1"
                    />
                    {/* Right Fitted Sleeve */}
                    {!holdingUmbrella ? (
                      <path
                        d="M 149 100 C 159 124, 165 162, 171 200 L 161 202 C 155 168, 149 136, 143 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                    ) : (
                      <g id="ao-dai-female-right-sleeve-holding">
                        <path
                          d="M 149 100 C 158 114, 169 129, 176 144 C 172 147, 166 147, 162 144 C 154 130, 146 118, 143 114 Z"
                          fill="url(#dynamicTunicShader)"
                          stroke={shader.shade}
                          strokeWidth="1"
                        />
                        <path
                          d="M 176 144 C 170 133, 162 122, 154 116 L 160 111 C 168 118, 175 129, 181 140 Z"
                          fill="url(#dynamicTunicShader)"
                          stroke={shader.shade}
                          strokeWidth="1"
                        />
                        <path d="M 153 117 Q 157 113 161 110" stroke="#FAF8F5" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                        <path d="M 165 140 Q 170 142 174 143" stroke={shader.shade} strokeWidth="1" fill="none" opacity="0.6" />
                      </g>
                    )}

                    {/* Fitted Bodice */}
                    <path
                      d="M 91 100 C 102 95, 138 95, 149 100 L 143 136 C 140 150, 138 160, 141 172 L 99 172 C 102 160, 100 150, 97 136 Z"
                      fill="url(#dynamicTunicShader)"
                      stroke={shader.shade}
                      strokeWidth="1"
                    />

                    {/* Mandarin Standing Collar */}
                    <path
                      d="M 108 87 Q 120 91 132 87 L 134 98 Q 120 103 106 98 Z"
                      fill={shader.primary}
                      stroke={shader.accent}
                      strokeWidth="1.2"
                    />

                    {/* Diagonal Raglan Seam & Gold Buttons */}
                    <path d="M 120 99 Q 134 104 141 128" stroke={shader.shade} strokeWidth="1.3" fill="none" />
                    <circle cx="125" cy="101" r="1.5" fill={shader.accent} />
                    <circle cx="133" cy="108" r="1.5" fill={shader.accent} />
                    <circle cx="138" cy="118" r="1.5" fill={shader.accent} />

                    {/* Flowing Front Tunic Panel */}
                    <path
                      d="M 99 170 Q 120 173 141 170 L 138 318 C 126 322, 114 322, 102 318 Z"
                      fill="url(#dynamicTunicShader)"
                      stroke={shader.shade}
                      strokeWidth="1.1"
                    />
                    {/* Silk vertical sheen */}
                    <path d="M 114 180 L 112 314" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.35" />
                  </g>
                ) : (
                  /* REDESIGNED MALE ÁO DÀI TRUYỀN THỐNG (Chuẩn phom Việt phục nam cổ đứng, tà rõ ràng, nếp vải mềm mại) */
                  <g id="garment-ao-dai-male">
                    {/* 1. Back Tunic Panel (Tà sau buông dài tạo chiều sâu ở hai bên xẻ tà) */}
                    <path
                      d="M 84 166 L 156 166 L 159 298 C 138 305, 102 305, 81 298 Z"
                      fill={shader.shade}
                      stroke={shader.shade}
                      strokeWidth="1"
                    />
                    {/* Subtle white inner silk lining peeking along side slits */}
                    <path d="M 84.5 170 L 82 295" stroke="#FAF8F5" strokeWidth="1.1" opacity="0.55" strokeLinecap="round" />
                    <path d="M 155.5 170 L 158 295" stroke="#FAF8F5" strokeWidth="1.1" opacity="0.55" strokeLinecap="round" />

                    {/* 2. Natural Sloping Traditional Sleeves (Tay áo nối xuôi tự nhiên, cổ tay lót lụa trắng vừa vặn vai nam x=75..165) */}
                    {/* Left Sleeve */}
                    <path
                      d="M 75 95 C 67.5 120, 63 158, 60 200.5 C 64.5 204.5, 70.5 204.5, 75 202 C 78.5 168, 83.5 138, 89.5 116 Z"
                      fill="url(#maleTunicSilk3D)"
                      stroke={shader.shade}
                      strokeWidth="1.15"
                    />
                    {/* Right Sleeve */}
                    {!holdingUmbrella ? (
                      <>
                        <path
                          d="M 165 95 C 172.5 120, 177 158, 180 200.5 C 175.5 204.5, 169.5 204.5, 165 202 C 161.5 168, 156.5 138, 150.5 116 Z"
                          fill="url(#maleTunicSilk3D)"
                          stroke={shader.shade}
                          strokeWidth="1.15"
                        />
                        {/* Inner White Silk Cuff Trim (Lót cổ tay trắng thanh lịch ôm trọn cổ tay) */}
                        <path d="M 165.5 202 Q 172.5 204.5 179.5 200.5" stroke="#FAF8F5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                        <path d="M 166 104 C 171 132, 175 164, 177 196" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.16" />
                        <path d="M 160 116 C 164 145, 166 172, 167 198" stroke={shader.shade} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.55" />
                      </>
                    ) : (
                      <g id="ao-dai-male-right-sleeve-holding">
                        <path
                          d="M 165 95 C 174 112, 183 129, 188 144 C 182 148, 175 148, 171 144 C 163 128, 155 116, 150.5 116 Z"
                          fill="url(#maleTunicSilk3D)"
                          stroke={shader.shade}
                          strokeWidth="1.15"
                        />
                        <path
                          d="M 188 144 C 181 132, 172 120, 163 112 L 170 107 C 178 116, 186 128, 193 140 Z"
                          fill="url(#maleTunicSilk3D)"
                          stroke={shader.shade}
                          strokeWidth="1.15"
                        />
                        <path d="M 162 113 Q 166.5 109 171 106" stroke="#FAF8F5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                        <path d="M 174 140 Q 180 143 186 144" stroke={shader.shade} strokeWidth="1.1" fill="none" opacity="0.6" />
                      </g>
                    )}

                    {/* 3. Continuous Balanced Masculine Body & Flowing Front Tunic (Thân áo liền mạch vừa vặn khung vai nam x=75..165) */}
                    <path
                      d="M 104.5 88.5 C 93 89, 82.5 91, 75 95 L 82 116 C 84 136, 86 154, 87.5 172 L 83 294 C 103 303, 137 303, 157 294 L 152.5 172 C 154 154, 156 136, 158 116 L 165 95 C 157.5 91, 147 89, 135.5 88.5 Z"
                      fill="url(#maleTunicSilk3D)"
                      stroke={shader.shade}
                      strokeWidth="1.2"
                    />
                    {/* Subtle traditional shoulder-to-sleeve seam (Đường nối tay cổ truyền) */}
                    <path d="M 75 95 Q 78.5 106 82 116" stroke={shader.shade} strokeWidth="1" fill="none" opacity="0.65" />
                    <path d="M 165 95 Q 161.5 106 158 116" stroke={shader.shade} strokeWidth="1" fill="none" opacity="0.65" />

                    {/* 4. Traditional Upright Collar with White Inner Lining (Cổ đứng lập lĩnh & cổ lót trắng hộ lĩnh) */}
                    <path
                      d="M 106 83.2 Q 120 88.2 134 83.2 L 135 90 Q 120 95 105 90 Z"
                      fill="#FAF8F5"
                      stroke="#D8CEBE"
                      strokeWidth="0.9"
                    />
                    <path
                      d="M 104.5 86 Q 120 91.2 135.5 86 L 136.5 96.5 Q 120 101.5 103.5 96.5 Z"
                      fill={shader.primary}
                      stroke={shader.accent}
                      strokeWidth="1.2"
                    />
                    {/* Collar vertical join slit at center throat */}
                    <line x1="120" y1="88.5" x2="120" y2="99" stroke={shader.shade} strokeWidth="1.2" />

                    {/* 5. Authentic Việt Phục Nam Seams, Right Lapel Overlap (Hữu Nhẫm) & 5 Buttons (Ngũ Thường) */}
                    {/* Center Vertical Seam (Đường trung phùng) */}
                    <line x1="120" y1="99" x2="120" y2="300" stroke={shader.shade} strokeWidth="1.3" opacity="0.8" />
                    <line x1="119" y1="102" x2="119" y2="298" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.18" />

                    {/* Overlapping Right Front Lapel (Đường vạt cả đắp chéo sang nách phải rồi chạy dọc sườn) */}
                    <path
                      d="M 120 97.5 C 131 101, 141 109, 148.5 121 L 149.5 168"
                      stroke={shader.shade}
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M 120 98.5 C 130.5 102, 140.5 110, 147.5 121.5 L 148.5 168"
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                      fill="none"
                      opacity="0.24"
                    />

                    {/* 5 Traditional Brass/Gold Buttons (5 cúc đồng Ngũ Thường: Nhân - Nghĩa - Lễ - Trí - Tín) */}
                    <circle cx="123" cy="99.5" r="2.1" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.5" />
                    <circle cx="135.5" cy="107" r="2.1" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.5" />
                    <circle cx="146" cy="119" r="2.1" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.5" />
                    <circle cx="147.5" cy="142" r="2.1" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.5" />
                    <circle cx="148.5" cy="164" r="2.1" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.5" />

                    {/* 6. Soft Flowing Silk Drapery Folds on Front Tunic (Nếp vải mềm mại tự nhiên trên tà áo) */}
                    <path d="M 105 124 C 102 178, 98 238, 94 294" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.2" />
                    <path d="M 98 164 C 95 208, 92 252, 89 292" stroke={shader.shade} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
                    <path d="M 111 174 C 109 216, 108 256, 106 297" stroke={shader.shade} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.45" />
                    <path d="M 131 174 C 133 216, 134 256, 136 297" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.16" />
                    <path d="M 141 164 C 144 208, 147 252, 150 292" stroke={shader.shade} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
                    {/* Subtle bottom hem border sheen */}
                    <path d="M 85.5 292.5 C 104 301, 136 301, 154.5 292.5" stroke="#FFFFFF" strokeWidth="0.9" fill="none" opacity="0.22" />
                  </g>
                ))}

              {/* ----------------- [2] ÁO TỨ THÂN (KINH BẮC TRUYỀN THỐNG) ----------------- */}
              {outfitId === 'ao-tu-than' && (
                <g id="garment-ao-tu-than">
                  {/* Back long panels */}
                  <path d="M 90 170 L 150 170 L 146 324 L 94 324 Z" fill={shader.shade} opacity="0.85" />

                  {/* Left Sleeve */}
                  <path
                    d="M 91 100 C 78 126, 72 165, 66 204 L 78 206 C 84 170, 90 136, 97 114 Z"
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  {/* Right Sleeve */}
                  {!holdingUmbrella ? (
                    <path
                      d="M 149 100 C 162 126, 168 165, 174 204 L 162 206 C 156 170, 150 136, 143 114 Z"
                      fill="url(#dynamicTunicShader)"
                      stroke={shader.shade}
                      strokeWidth="1"
                    />
                  ) : (
                    <g id="ao-tu-than-right-sleeve-holding">
                      <path
                        d="M 149 100 C 158 114, 169 129, 176 144 C 172 147, 166 147, 162 144 C 154 130, 146 118, 143 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 176 144 C 170 133, 162 122, 154 116 L 160 111 C 168 118, 175 129, 181 140 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path d="M 153 117 Q 157 113 161 110" stroke="#FAF8F5" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                      <path d="M 165 140 Q 170 142 174 143" stroke={shader.shade} strokeWidth="1" fill="none" opacity="0.6" />
                    </g>
                  )}

                  {/* Open front panels tied at the waist (Lộ Yếm lót bên trong!) */}
                  {/* Left open flap */}
                  <path
                    d="M 92 100 L 108 100 L 102 168 L 96 168 Z"
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  {/* Right open flap */}
                  <path
                    d="M 148 100 L 132 100 L 138 168 L 144 168 Z"
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />

                  {/* Dải thắt lưng ruột tượng (Silk sash wrapped around waist) */}
                  <rect x="98" y="162" width="44" height="8" rx="2" fill="#C8973E" stroke="#8A631E" strokeWidth="1" />
                  {/* Front tied bow flaps hanging down */}
                  <path d="M 116 170 L 110 240 L 118 242 L 120 170 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1" />
                  <path d="M 124 170 L 130 236 L 122 238 L 120 170 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1" />
                </g>
              )}

              {/* ----------------- [3] ÁO NGŨ THÂN (CỔ PHONG LẬP LĨNH) ----------------- */}
              {outfitId === 'ao-ngu-than' && (
                <g id="garment-ao-ngu-than">
                  {/* Back tunic panel (Tà sau rộng rãi, buông dài chuẩn mực) */}
                  <path
                    d="M 82 166 L 158 166 L 160 298 C 138 305, 102 305, 80 298 Z"
                    fill={shader.shade}
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <path d="M 83 170 L 81 295" stroke="#FAF8F5" strokeWidth="1.1" opacity="0.55" strokeLinecap="round" />
                  <path d="M 157 170 L 159 295" stroke="#FAF8F5" strokeWidth="1.1" opacity="0.55" strokeLinecap="round" />

                  {/* Left Sleeve */}
                  <path
                    d="M 75 95 C 67 118, 61 158, 57.5 201 C 63 205.5, 70.5 206, 76 203 C 80 170, 84.5 138, 89.5 116 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.15"
                  />
                  {/* Right Sleeve */}
                  {!holdingUmbrella ? (
                    <>
                      <path
                        d="M 165 95 C 173 118, 179 158, 182.5 201 C 177 205.5, 169.5 206, 164 203 C 160 170, 155.5 138, 150.5 116 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <path d="M 164.5 203 Q 173 205.5 182 201" stroke="#FAF8F5" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                      <path d="M 166 106 C 172 134, 177 166, 179 198" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.16" />
                    </>
                  ) : (
                    <g id="ao-ngu-than-right-sleeve-holding">
                      <path
                        d="M 165 95 C 174 112, 183 129, 188 144 C 182 148, 175 148, 171 144 C 163 128, 155 116, 150.5 116 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <path
                        d="M 188 144 C 181 132, 172 120, 163 112 L 170 107 C 178 116, 186 128, 193 140 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <path d="M 162 113 Q 166.5 109 171 106" stroke="#FAF8F5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                      <path d="M 174 140 Q 180 143 186 144" stroke={shader.shade} strokeWidth="1.1" fill="none" opacity="0.6" />
                    </g>
                  )}
                  {/* Left sleeve inner cuff trim & crease */}
                  <path d="M 58 201 Q 67 205.5 75.5 203" stroke="#FAF8F5" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M 74 106 C 68 134, 63 166, 61 198" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.2" />

                  {/* Continuous Five-Panel Tunic Body & Front Tà (Thân áo 5 thân liền mạch vừa vặn khung vai nam x=75..165) */}
                  <path
                    d="M 104.5 88.5 C 93 89, 82.5 91, 75 95 L 82 116 C 84 136, 86 154, 87 172 L 82.5 294 C 103 303, 137 303, 157.5 294 L 153 172 C 154 154, 156 136, 158 116 L 165 95 C 157.5 91, 147 89, 135.5 88.5 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.2"
                  />

                  {/* Inner white collar (Cổ lót trắng) */}
                  <path d="M 106 83 Q 120 88 134 83 L 135 90 Q 120 95 105 90 Z" fill="#FAF8F5" stroke="#D8CEBE" strokeWidth="0.9" />
                  {/* Upright Mandarin Collar (Cổ Lập Lĩnh) */}
                  <path d="M 104.5 86 Q 120 91 135.5 86 L 136.5 97 Q 120 102 103.5 97 Z" fill={shader.primary} stroke={shader.accent} strokeWidth="1.2" />
                  <line x1="120" y1="88.5" x2="120" y2="99" stroke={shader.shade} strokeWidth="1.2" />

                  {/* Center Vertical Seam (Đường trung phùng) */}
                  <line x1="120" y1="99" x2="120" y2="300" stroke={shader.shade} strokeWidth="1.4" opacity="0.85" />
                  <line x1="119" y1="102" x2="119" y2="298" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.2" />

                  {/* Overlapping Right Lapel & 5 Brass Buttons (5 cúc đồng Ngũ Thường) */}
                  <path d="M 120 98 C 131 101.5, 141 110, 149 122 L 150.5 170" stroke={shader.shade} strokeWidth="1.5" fill="none" />
                  <path d="M 120 99 C 130.5 102.5, 140.5 111, 148 122.5 L 149.5 170" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.22" />
                  <circle cx="123" cy="100" r="2.2" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.5" />
                  <circle cx="136" cy="108" r="2.2" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.5" />
                  <circle cx="146.5" cy="120" r="2.2" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.5" />
                  <circle cx="148.5" cy="144" r="2.2" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.5" />
                  <circle cx="149.5" cy="167" r="2.2" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.5" />

                  {/* Soft Silk Drapery Folds on Front Tà */}
                  <path d="M 104 126 C 101 180, 97 238, 93 294" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.2" />
                  <path d="M 96 168 C 93 212, 90 254, 87 292" stroke={shader.shade} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
                  <path d="M 132 174 C 134 216, 136 256, 138 297" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.16" />
                  <path d="M 143 168 C 146 212, 149 254, 152 292" stroke={shader.shade} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
                </g>
              )}

              {/* ----------------- [4] ÁO BÀ BA (NAM BỘ PHÓNG KHOÁNG) ----------------- */}
              {outfitId === 'ao-ba-ba' && (
                <g id="garment-ao-ba-ba">
                  {/* Left Sleeve */}
                  <path
                    d="M 91 100 C 81 124, 75 162, 70 198 L 80 200 C 85 168, 91 136, 97 114 Z"
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  {/* Right Sleeve */}
                  {!holdingUmbrella ? (
                    <path
                      d="M 149 100 C 159 124, 165 162, 170 198 L 160 200 C 155 168, 149 136, 143 114 Z"
                      fill="url(#dynamicTunicShader)"
                      stroke={shader.shade}
                      strokeWidth="1"
                    />
                  ) : (
                    <g id="ao-ba-ba-right-sleeve-holding">
                      <path
                        d="M 149 100 C 158 114, 169 129, 176 144 C 172 147, 166 147, 162 144 C 154 130, 146 118, 143 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 176 144 C 170 133, 162 122, 154 116 L 160 111 C 168 118, 175 129, 181 140 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path d="M 153 117 Q 157 113 161 110" stroke="#FAF8F5" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                      <path d="M 165 140 Q 170 142 174 143" stroke={shader.shade} strokeWidth="1" fill="none" opacity="0.6" />
                    </g>
                  )}

                  {/* Main Body (Dáng ôm vừa vặn xẻ tà ngang hông) */}
                  <path
                    d="M 91 100 C 102 96, 138 96, 149 100 L 144 185 C 136 198, 136 215, 142 225 L 98 225 C 104 215, 104 198, 96 185 Z"
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />

                  {/* Collarless Round Neck (Cổ thìa tròn) */}
                  <path d="M 108 96 Q 120 110 132 96" fill="url(#skinNeck3D)" stroke={shader.shade} strokeWidth="1.2" />

                  {/* Center Button Placket */}
                  <line x1="120" y1="108" x2="120" y2="225" stroke={shader.shade} strokeWidth="1.2" />
                  <circle cx="120" cy="120" r="1.8" fill="#FAF8F5" />
                  <circle cx="120" cy="140" r="1.8" fill="#FAF8F5" />
                  <circle cx="120" cy="160" r="1.8" fill="#FAF8F5" />
                  <circle cx="120" cy="180" r="1.8" fill="#FAF8F5" />
                  <circle cx="120" cy="200" r="1.8" fill="#FAF8F5" />

                  {/* Two Front Patch Pockets (2 túi đắp đặc trưng bà ba) */}
                  <rect x="102" y="185" width="12" height="15" rx="1.5" fill="none" stroke={shader.shade} strokeWidth="1" />
                  <rect x="126" y="185" width="12" height="15" rx="1.5" fill="none" stroke={shader.shade} strokeWidth="1" />
                </g>
              )}

              {/* ----------------- [5] ÁO NHẬT BÌNH (CUNG ĐÌNH TRIỀU NGUYỄN) ----------------- */}
              {outfitId === 'ao-nhat-binh' && (
                <g id="garment-ao-nhat-binh">
                  <defs>
                    {/* Clip paths for Left & Right Wide Sleeves so Ngũ Sắc bands follow the exact 3D sleeve curvature */}
                    <clipPath id="nhatBinhLeftSleeveClip">
                      <path d="M 90 97 C 73 116, 55 152, 46 196 C 54 214, 72 220, 86 213 C 88 178, 91 144, 96 116 Z" />
                    </clipPath>
                    <clipPath id="nhatBinhRightSleeveClip">
                      <path d="M 150 97 C 167 116, 185 152, 194 196 C 186 214, 168 220, 154 213 C 152 178, 149 144, 144 116 Z" />
                    </clipPath>
                    {/* Clip paths for Left & Right Đối Khâm Front Panels (for Thủy Ba & Giang Nha hem border) */}
                    <clipPath id="nhatBinhLeftPanelClip">
                      <path d="M 90 97 C 99 94, 110 94, 119.5 95 L 119.5 315 C 105 318, 93 316, 84 311 L 91 160 Z" />
                    </clipPath>
                    <clipPath id="nhatBinhRightPanelClip">
                      <path d="M 150 97 C 141 94, 130 94, 120.5 95 L 120.5 315 C 135 318, 147 316, 156 311 L 149 160 Z" />
                    </clipPath>
                    {/* Royal Brocade Collar Gradient */}
                    <linearGradient id="nhatBinhCollarBrocade" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFDF7" />
                      <stop offset="50%" stopColor="#FCEFD2" />
                      <stop offset="100%" stopColor="#F3D999" />
                    </linearGradient>
                    {/* Reusable Loan Phượng Ổ (Royal Phoenix Medallion) */}
                    <g id="loanPhuongRoundel">
                      {/* Outer beaded gold filigree ring */}
                      <circle cx="0" cy="0" r="9.5" fill={shader.shade} fillOpacity="0.45" stroke="url(#goldAccentShader)" strokeWidth="1.3" strokeDasharray="2 1" />
                      <circle cx="0" cy="0" r="7.6" fill="none" stroke="#F5D587" strokeWidth="0.6" opacity="0.85" />
                      {/* Auspicious cloud petals inside medallion */}
                      <circle cx="0" cy="-5.2" r="1.4" fill="#10B981" opacity="0.85" />
                      <circle cx="0" cy="5.2" r="1.4" fill="#E11D48" opacity="0.85" />
                      <circle cx="-5.2" cy="0" r="1.4" fill="#3B82F6" opacity="0.85" />
                      <circle cx="5.2" cy="0" r="1.4" fill="#FAF8F5" opacity="0.9" />
                      {/* Soaring Golden Phoenix (Chim Phượng Hoàng tung cánh) */}
                      <path
                        d="M -5.5 -1.5 Q -2.5 -5 0 -1.8 Q 2.5 -5 5.5 -1.5 Q 3 1.5 0 0.8 Q -3 1.5 -5.5 -1.5 Z"
                        fill="url(#goldAccentShader)"
                      />
                      {/* Phoenix head & crown */}
                      <circle cx="0" cy="-2.8" r="1.3" fill="#FFFDF9" />
                      <path d="M -1.2 -4.2 L 0 -5.6 L 1.2 -4.2" stroke="#F5D587" strokeWidth="0.9" fill="none" strokeLinecap="round" />
                      {/* Flowing 3-plume phoenix tail */}
                      <path d="M -2.8 3.8 Q -1.2 1.8 0 0.8 Q 1.2 1.8 2.8 3.8" stroke="url(#goldAccentShader)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      <path d="M 0 0.8 L 0 5.2" stroke="#F5D587" strokeWidth="1.1" strokeLinecap="round" />
                    </g>
                  </defs>

                  {/* 1. BACK ROYAL PANEL & INNER WHITE UNDER-ROBE (ÁO LÓT NGŨ THÂN TRẮNG) */}
                  <path
                    d="M 82 166 L 158 166 L 158 317 C 138 322, 102 322, 82 317 Z"
                    fill={shader.shade}
                    stroke="url(#goldAccentShader)"
                    strokeWidth="0.8"
                  />
                  {/* Inner white silk under-robe peeking at side slits */}
                  <path d="M 83 215 L 91 215 L 87 312 L 81 310 Z" fill="url(#undergarmentSilk)" opacity="0.95" />
                  <path d="M 157 215 L 149 215 L 153 312 L 159 310 Z" fill="url(#undergarmentSilk)" opacity="0.95" />

                  {/* Inner White Standing Collar (Cổ Lập Lĩnh Áo Lót Trắng bên trong cổ Nhật Bình) */}
                  <path
                    d="M 106 83 Q 120 88 134 83 L 135 97 Q 120 103 105 97 Z"
                    fill="url(#undergarmentSilk)"
                    stroke="#D8CEBE"
                    strokeWidth="1"
                  />
                  {/* Inner white chest overlap visible inside the rectangular collar window */}
                  <path
                    d="M 106 94 Q 120 99 134 94 L 133 116 L 107 116 Z"
                    fill="#FFFDF9"
                    stroke="#E5DAC9"
                    strokeWidth="0.9"
                  />
                  <path d="M 116 96 L 128 114" stroke="#D8CEBE" strokeWidth="1" fill="none" />
                  <circle cx="120" cy="91.5" r="1.5" fill="url(#goldAccentShader)" />

                  {/* 2. WIDE CEREMONIAL SLEEVES (TAY THỤNG CUNG ĐÌNH) & NGŨ HÀNH SẮC ĐỚI */}
                  {/* Left Sleeve Inner White Silk Lining & Delicate Hand */}
                  <path
                    d="M 45 194 C 53 214, 72 221, 86 214 L 85 206 C 72 212, 55 206, 48 190 Z"
                    fill="#FFFDF9"
                    stroke="#DFD4C3"
                    strokeWidth="0.9"
                  />
                  <ellipse cx="64" cy="212" rx="6" ry="4.5" transform="rotate(14 64 212)" fill="url(#skinFace3D)" />

                  {/* Right Sleeve Inner White Silk Lining & Delicate Hand */}
                  {!holdingUmbrella && (
                    <>
                      <path
                        d="M 195 194 C 187 214, 168 221, 154 214 L 155 206 C 168 212, 185 206, 192 190 Z"
                        fill="#FFFDF9"
                        stroke="#DFD4C3"
                        strokeWidth="0.9"
                      />
                      <ellipse cx="176" cy="212" rx="6" ry="4.5" transform="rotate(-14 176 212)" fill="url(#skinFace3D)" />
                    </>
                  )}

                  {/* Left Wide Ceremonial Sleeve Base */}
                  <path
                    d="M 90 97 C 73 116, 55 152, 46 196 C 54 214, 72 220, 86 213 C 88 178, 91 144, 96 116 Z"
                    fill="url(#dynamicTunicShader)"
                    stroke="url(#goldAccentShader)"
                    strokeWidth="1.1"
                  />
                  {/* Left Sleeve 5-Color Elemental Bands (Dải Ngũ Hành Sắc Đới: Lục - Vàng - Lam - Trắng - Đỏ) */}
                  <g clipPath="url(#nhatBinhLeftSleeveClip)">
                    {/* Band 1: Lục (Mộc) */}
                    <path d="M 42 164 Q 66 177 92 170 L 92 179 Q 66 186 42 173 Z" fill="#15803D" />
                    {/* Band 2: Vàng Hoàng Kim (Thổ) */}
                    <path d="M 42 173 Q 66 186 92 179 L 92 188 Q 66 195 42 182 Z" fill="#EAB308" />
                    {/* Band 3: Lam (Thủy) */}
                    <path d="M 42 182 Q 66 195 92 188 L 92 197 Q 66 204 42 191 Z" fill="#1D4ED8" />
                    {/* Band 4: Trắng Ngà (Kim) */}
                    <path d="M 42 191 Q 66 204 92 197 L 92 206 Q 66 213 42 200 Z" fill="#FAF8F5" />
                    {/* Band 5: Đỏ Chu Sa (Hỏa) */}
                    <path d="M 42 200 Q 66 213 92 206 L 92 222 Q 66 226 42 212 Z" fill="#BE123C" />
                    {/* Gold brocade thread dividers between the 5 bands */}
                    <path d="M 42 164 Q 66 177 92 170" stroke="url(#goldAccentShader)" strokeWidth="1.4" fill="none" />
                    <path d="M 42 173 Q 66 186 92 179" stroke="#F5D587" strokeWidth="0.9" fill="none" />
                    <path d="M 42 182 Q 66 195 92 188" stroke="#F5D587" strokeWidth="0.9" fill="none" />
                    <path d="M 42 191 Q 66 204 92 197" stroke="#F5D587" strokeWidth="0.9" fill="none" />
                    <path d="M 42 200 Q 66 213 92 206" stroke="#F5D587" strokeWidth="0.9" fill="none" />
                    {/* Shoulder Phoenix Roundel on Left Sleeve */}
                    <use href="#loanPhuongRoundel" transform="translate(74, 138) scale(0.82)" />
                  </g>
                  {/* Left Sleeve Outer Gold Border */}
                  <path
                    d="M 90 97 C 73 116, 55 152, 46 196 C 54 214, 72 220, 86 213"
                    fill="none"
                    stroke="url(#goldAccentShader)"
                    strokeWidth="1.2"
                  />

                  {/* Right Wide Ceremonial Sleeve Base */}
                  {!holdingUmbrella ? (
                    <>
                      <path
                        d="M 150 97 C 167 116, 185 152, 194 196 C 186 214, 168 220, 154 213 C 152 178, 149 144, 144 116 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke="url(#goldAccentShader)"
                        strokeWidth="1.1"
                      />
                      {/* Right Sleeve 5-Color Elemental Bands (Dải Ngũ Hành Sắc Đới: Lục - Vàng - Lam - Trắng - Đỏ) */}
                      <g clipPath="url(#nhatBinhRightSleeveClip)">
                        {/* Band 1: Lục (Mộc) */}
                        <path d="M 198 164 Q 174 177 148 170 L 148 179 Q 174 186 198 173 Z" fill="#15803D" />
                        {/* Band 2: Vàng Hoàng Kim (Thổ) */}
                        <path d="M 198 173 Q 174 186 148 179 L 148 188 Q 174 195 198 182 Z" fill="#EAB308" />
                        {/* Band 3: Lam (Thủy) */}
                        <path d="M 198 182 Q 174 195 148 188 L 148 197 Q 174 204 198 191 Z" fill="#1D4ED8" />
                        {/* Band 4: Trắng Ngà (Kim) */}
                        <path d="M 198 191 Q 174 204 148 197 L 148 206 Q 174 213 198 200 Z" fill="#FAF8F5" />
                        {/* Band 5: Đỏ Chu Sa (Hỏa) */}
                        <path d="M 198 200 Q 174 213 148 206 L 148 222 Q 174 226 198 212 Z" fill="#BE123C" />
                        {/* Gold brocade thread dividers between the 5 bands */}
                        <path d="M 198 164 Q 174 177 148 170" stroke="url(#goldAccentShader)" strokeWidth="1.4" fill="none" />
                        <path d="M 198 173 Q 174 186 148 179" stroke="#F5D587" strokeWidth="0.9" fill="none" />
                        <path d="M 198 182 Q 174 195 148 188" stroke="#F5D587" strokeWidth="0.9" fill="none" />
                        <path d="M 198 191 Q 174 204 148 197" stroke="#F5D587" strokeWidth="0.9" fill="none" />
                        <path d="M 198 200 Q 174 213 148 206" stroke="#F5D587" strokeWidth="0.9" fill="none" />
                        {/* Shoulder Phoenix Roundel on Right Sleeve */}
                        <use href="#loanPhuongRoundel" transform="translate(166, 138) scale(0.82)" />
                      </g>
                      {/* Right Sleeve Outer Gold Border */}
                      <path
                        d="M 150 97 C 167 116, 185 152, 194 196 C 186 214, 168 220, 154 213"
                        fill="none"
                        stroke="url(#goldAccentShader)"
                        strokeWidth="1.2"
                      />
                    </>
                  ) : (
                    <g id="ao-nhat-binh-right-sleeve-holding">
                      <path
                        d="M 150 97 C 166 116, 178 136, 182 144 C 176 133, 168 122, 158 116 L 165 110 C 174 118, 185 138, 190 162 C 184 192, 168 206, 154 200 C 152 174, 148 144, 144 116 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke="url(#goldAccentShader)"
                        strokeWidth="1.1"
                      />
                      <path d="M 188 152 Q 175 162 158 158" stroke="#15803D" strokeWidth="2.2" fill="none" />
                      <path d="M 189 157 Q 175 167 157 163" stroke="#EAB308" strokeWidth="2.2" fill="none" />
                      <path d="M 190 162 Q 175 172 156 168" stroke="#1D4ED8" strokeWidth="2.2" fill="none" />
                      <path d="M 189 167 Q 175 177 155 173" stroke="#FAF8F5" strokeWidth="2.2" fill="none" />
                      <path d="M 187 172 Q 174 182 154 178" stroke="#BE123C" strokeWidth="2.2" fill="none" />
                      <path d="M 157 117 Q 161 113 166 110" stroke="#FAF8F5" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    </g>
                  )}

                  {/* 3. OUTER ROBE BODY: HAI VẠT ĐỐI KHÂM DÁNG CHỮ A & GẤU THỦY BA - GIANG NHA */}
                  {/* Left Symmetrical Front Panel */}
                  <path
                    d="M 90 97 C 99 94, 110 94, 119.5 95 L 119.5 315 C 105 318, 93 316, 84 311 L 91 160 Z"
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  {/* Right Symmetrical Front Panel */}
                  <path
                    d="M 150 97 C 141 94, 130 94, 120.5 95 L 120.5 315 C 135 318, 147 316, 156 311 L 149 160 Z"
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />

                  {/* Silk Damask Sheen & Drapery Folds */}
                  <path d="M 97 166 L 91 278" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.22" strokeLinecap="round" />
                  <path d="M 143 166 L 149 278" stroke={shader.shade} strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />

                  {/* GẤU ÁO THỦY BA & GIANG NHA (Royal Wave & Diagonal Polychrome Hem on Left Panel) */}
                  <g clipPath="url(#nhatBinhLeftPanelClip)">
                    {/* Giang Nha (Diagonal 5-color stripes at bottom hem y=292..318) */}
                    <rect x="80" y="286" width="42" height="32" fill="#BE123C" />
                    <path d="M 82 318 L 92 290 L 97 290 L 87 318 Z" fill="#15803D" />
                    <path d="M 90 318 L 100 290 L 105 290 L 95 318 Z" fill="#EAB308" />
                    <path d="M 98 318 L 108 290 L 113 290 L 103 318 Z" fill="#1D4ED8" />
                    <path d="M 106 318 L 116 290 L 121 290 L 111 318 Z" fill="#FAF8F5" />
                    <path d="M 114 318 L 124 290 L 128 290 L 118 318 Z" fill="#15803D" />
                    {/* Thủy Ba (Rolling golden-crested ocean waves y=278..294) */}
                    <path
                      d="M 82 292 Q 91 281 101 291 Q 110 281 120 291 L 120 297 L 82 297 Z"
                      fill="#1D4ED8"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M 82 286 Q 91 277 101 286 Q 110 277 120 286"
                      fill="none"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.5"
                    />
                    {/* Auspicious Pearl & Cloud crests above waves */}
                    <circle cx="91" cy="283" r="1.8" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="0.7" />
                    <circle cx="110" cy="283" r="1.8" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="0.7" />
                  </g>

                  {/* GẤU ÁO THỦY BA & GIANG NHA (Royal Wave & Diagonal Polychrome Hem on Right Panel) */}
                  <g clipPath="url(#nhatBinhRightPanelClip)">
                    {/* Giang Nha (Diagonal 5-color stripes at bottom hem y=292..318) */}
                    <rect x="118" y="286" width="42" height="32" fill="#BE123C" />
                    <path d="M 158 318 L 148 290 L 143 290 L 153 318 Z" fill="#15803D" />
                    <path d="M 150 318 L 140 290 L 135 290 L 145 318 Z" fill="#EAB308" />
                    <path d="M 142 318 L 132 290 L 127 290 L 137 318 Z" fill="#1D4ED8" />
                    <path d="M 134 318 L 124 290 L 119 290 L 129 318 Z" fill="#FAF8F5" />
                    <path d="M 126 318 L 116 290 L 112 290 L 122 318 Z" fill="#15803D" />
                    {/* Thủy Ba (Rolling golden-crested ocean waves y=278..294) */}
                    <path
                      d="M 120 291 Q 130 281 139 291 Q 149 281 158 292 L 158 297 L 120 297 Z"
                      fill="#1D4ED8"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M 120 286 Q 130 277 139 286 Q 149 277 158 286"
                      fill="none"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.5"
                    />
                    {/* Auspicious Pearl & Cloud crests above waves */}
                    <circle cx="130" cy="283" r="1.8" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="0.7" />
                    <circle cx="149" cy="283" r="1.8" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="0.7" />
                  </g>

                  {/* Gold Brocade Trim Along Center Opening, Side Slits & Hem */}
                  <path
                    d="M 90 97 L 91 160 L 84 311 C 93 316, 105 318, 119.3 315 L 119.3 145"
                    fill="none"
                    stroke="url(#goldAccentShader)"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M 150 97 L 149 160 L 156 311 C 147 316, 135 318, 120.7 315 L 120.7 145"
                    fill="none"
                    stroke="url(#goldAccentShader)"
                    strokeWidth="1.4"
                  />

                  {/* 4. ĐỒ ÁN LOAN PHƯỢNG Ổ (ROYAL PHOENIX MEDALLIONS) & VÂN MÂY BÁT BỬU */}
                  {/* Upper-Mid Body Symmetrical Phoenix Roundels */}
                  <use href="#loanPhuongRoundel" transform="translate(103, 174)" />
                  <use href="#loanPhuongRoundel" transform="translate(137, 174)" />
                  {/* Lower-Mid Body Symmetrical Phoenix Roundels */}
                  <use href="#loanPhuongRoundel" transform="translate(101, 222) scale(0.95)" />
                  <use href="#loanPhuongRoundel" transform="translate(139, 222) scale(0.95)" />
                  {/* Above-Wave Symmetrical Phoenix Roundels */}
                  <use href="#loanPhuongRoundel" transform="translate(99, 263) scale(0.82)" />
                  <use href="#loanPhuongRoundel" transform="translate(141, 263) scale(0.82)" />

                  {/* Auspicious Golden Cloud Scrolls (Vân Mây Ngũ Sắc) between medallions */}
                  <path d="M 96 198 Q 103 194 110 198 Q 106 202 96 198 Z" fill="url(#goldAccentShader)" opacity="0.8" />
                  <path d="M 144 198 Q 137 194 130 198 Q 134 202 144 198 Z" fill="url(#goldAccentShader)" opacity="0.8" />
                  <path d="M 94 244 Q 101 240 108 244" stroke="url(#goldAccentShader)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  <path d="M 146 244 Q 139 240 132 244" stroke="url(#goldAccentShader)" strokeWidth="1.3" fill="none" strokeLinecap="round" />

                  {/* 5. CỔ ÁO NHẬT BÌNH BẢN LỚN (PHƯƠNG LĨNH CHỮ NHẬT THÊU KIM TUYẾN) */}
                  <g id="nhat-binh-rectangular-collar">
                    {/* Drop shadow behind the heavy gold-embroidered collar */}
                    <path
                      d="M 96 89 L 107 89 L 107 115 L 133 115 L 133 89 L 144 89 L 144 147 L 96 147 Z"
                      fill="rgba(28, 20, 17, 0.28)"
                      transform="translate(0, 2)"
                    />
                    {/* Left Half of the Rectangular Collar (Ghép tạo hình chữ Nhật 日) */}
                    <path
                      d="M 96.5 88.5 L 107.5 88.5 L 107.5 115 L 119.6 115 L 119.6 146 L 96.5 146 Z"
                      fill="url(#nhatBinhCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="2"
                    />
                    {/* Right Half of the Rectangular Collar */}
                    <path
                      d="M 143.5 88.5 L 132.5 88.5 L 132.5 115 L 120.4 115 L 120.4 146 L 143.5 146 Z"
                      fill="url(#nhatBinhCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="2"
                    />
                    {/* Inner Fretwork Frame (Viền Hồi Văn Kim Tuyến tạo chữ Nhật 日) */}
                    <rect x="99" y="91" width="6.5" height="52" fill="none" stroke="#B45309" strokeWidth="0.8" strokeDasharray="2 1" />
                    <rect x="134.5" y="91" width="6.5" height="52" fill="none" stroke="#B45309" strokeWidth="0.8" strokeDasharray="2 1" />
                    <line x1="97" y1="129" x2="143" y2="129" stroke="#D97706" strokeWidth="1.2" />

                    {/* Intricate Phoenix & Peony Motifs Embroidered on the Collar Plates */}
                    <circle cx="102" cy="102" r="2.3" fill="#BE123C" stroke="#D4AF37" strokeWidth="0.8" />
                    <circle cx="138" cy="102" r="2.3" fill="#BE123C" stroke="#D4AF37" strokeWidth="0.8" />
                    <circle cx="102" cy="116" r="2" fill="#15803D" stroke="#D4AF37" strokeWidth="0.7" />
                    <circle cx="138" cy="116" r="2" fill="#15803D" stroke="#D4AF37" strokeWidth="0.7" />
                    <circle cx="111" cy="122" r="3.2" fill="#BE123C" stroke="url(#goldAccentShader)" strokeWidth="1" />
                    <circle cx="129" cy="122" r="3.2" fill="#BE123C" stroke="url(#goldAccentShader)" strokeWidth="1" />
                    <circle cx="109" cy="137" r="3" fill="#1D4ED8" stroke="url(#goldAccentShader)" strokeWidth="1" />
                    <circle cx="131" cy="137" r="3" fill="#1D4ED8" stroke="url(#goldAccentShader)" strokeWidth="1" />
                    {/* Gold filigree vines inside collar */}
                    <path d="M 103 137 Q 111 133 117 138" stroke="#B45309" strokeWidth="1.1" fill="none" />
                    <path d="M 137 137 Q 129 133 123 138" stroke="#B45309" strokeWidth="1.1" fill="none" />

                    {/* 6. KHUY KIM HOÀN & DÂY BUỘC TUA RUA HOÀNG GIA (ROYAL PHOENIX CLASPS & SILK TASSELS) */}
                    {/* Upper collar tie (forming top bar of chữ Nhật) */}
                    <path d="M 107.5 103 Q 120 105.5 132.5 103" stroke="#BE123C" strokeWidth="1.6" fill="none" />
                    <circle cx="120" cy="104" r="2.4" fill="url(#goldAccentShader)" stroke="#991B1E" strokeWidth="0.8" />

                    {/* Middle collar clasp */}
                    <circle cx="120" cy="122" r="3.2" fill="url(#goldAccentShader)" stroke="#781316" strokeWidth="0.9" />
                    <circle cx="120" cy="122" r="1.2" fill="#BE123C" />

                    {/* Lower collar clasp & Flowing Crimson-Gold Silk Cord Tassels */}
                    <circle cx="120" cy="144" r="3.5" fill="url(#goldAccentShader)" stroke="#781316" strokeWidth="0.9" />
                    <circle cx="120" cy="144" r="1.4" fill="#BE123C" />
                    {/* Left & Right Ribbon Loops */}
                    <path d="M 120 144 C 111 139, 109 149, 120 146" stroke="#BE123C" strokeWidth="1.6" fill="none" />
                    <path d="M 120 144 C 129 139, 131 149, 120 146" stroke="#BE123C" strokeWidth="1.6" fill="none" />
                    {/* Hanging Silk & Gold Tassels (Tua rua phượng hoàng) */}
                    <path d="M 118.5 147 C 117 162, 115 176, 114 190" stroke="#BE123C" strokeWidth="1.7" strokeLinecap="round" fill="none" />
                    <path d="M 121.5 147 C 123 162, 125 176, 126 190" stroke="#BE123C" strokeWidth="1.7" strokeLinecap="round" fill="none" />
                    <path d="M 119 147 C 118 160, 116.5 172, 115.5 184" stroke="url(#goldAccentShader)" strokeWidth="1" strokeLinecap="round" fill="none" />
                    <path d="M 121 147 C 122 160, 123.5 172, 124.5 184" stroke="url(#goldAccentShader)" strokeWidth="1" strokeLinecap="round" fill="none" />
                    <circle cx="114.5" cy="186" r="1.8" fill="url(#goldAccentShader)" />
                    <circle cx="125.5" cy="186" r="1.8" fill="url(#goldAccentShader)" />
                  </g>
                </g>
              )}

              {/* ----------------- [6] ÁO TẤC (NGŨ THÂN TAY THỤNG ĐẠI LỄ) ----------------- */}
              {outfitId === 'ao-tac' && (
                <g id="garment-ao-tac">
                  {/* Back tunic panel */}
                  <path d="M 80 168 L 160 168 L 162 302 C 138 309, 102 309, 78 302 Z" fill={shader.shade} />
                  {/* Left Sleeve Inner White Lining */}
                  <path
                    d="M 45 216 C 53 229, 70 232, 82 224 L 81 215 C 69 221, 54 218, 48 208 Z"
                    fill="#FAF8F5"
                    stroke="#D8CEBE"
                    strokeWidth="0.9"
                  />
                  {/* Left Sleeve Base */}
                  <path
                    d="M 82 96 C 64 118, 51 162, 45 216 C 54 226, 70 228, 82 220 C 84 176, 87 138, 91 116 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.2"
                  />
                  {/* Left Sleeve Fold */}
                  <path d="M 74 124 C 65 154, 58 186, 55 216" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.2" />

                  {/* Right Sleeve */}
                  {!holdingUmbrella ? (
                    <>
                      <path
                        d="M 195 216 C 187 229, 170 232, 158 224 L 159 215 C 171 221, 186 218, 192 208 Z"
                        fill="#FAF8F5"
                        stroke="#D8CEBE"
                        strokeWidth="0.9"
                      />
                      <path
                        d="M 158 96 C 176 118, 189 162, 195 216 C 186 226, 170 228, 158 220 C 156 176, 153 138, 149 116 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.2"
                      />
                      <path d="M 166 124 C 175 154, 182 186, 185 216" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.16" />
                    </>
                  ) : (
                    <g id="ao-tac-right-sleeve-holding">
                      <path
                        d="M 158 96 C 176 118, 188 144, 188 144 C 182 132, 174 122, 164 114 L 172 108 C 182 118, 192 136, 196 156 C 192 186, 176 210, 162 205 C 160 178, 156 148, 149 116 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.2"
                      />
                      <path d="M 162 205 C 176 210, 192 186, 196 156" stroke="#FAF8F5" strokeWidth="1.2" fill="none" />
                      <path d="M 163 115 Q 168 110 173 107" stroke="#FAF8F5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                    </g>
                  )}

                  {/* Broad ceremonial body & flowing front tà */}
                  <path
                    d="M 105 90 C 95 91, 88 93, 82 96 L 88 168 L 82 298 C 104 306, 136 306, 158 298 L 152 168 L 158 96 C 152 93, 145 91, 135 90 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.2"
                  />
                  {/* Inner white collar */}
                  <path d="M 106 83 Q 120 88 134 83 L 135 89 Q 120 94 105 89 Z" fill="#FAF8F5" stroke="#D8CEBE" strokeWidth="0.9" />
                  {/* Mandarin standing collar */}
                  <path d="M 104.5 86 Q 120 91 135.5 86 L 136.5 97 Q 120 102 103.5 97 Z" fill={shader.primary} stroke={shader.accent} strokeWidth="1.2" />
                  <line x1="120" y1="88.5" x2="120" y2="303" stroke={shader.shade} strokeWidth="1.4" opacity="0.85" />
                  {/* Right Lapel Overlap & 5 Buttons */}
                  <path d="M 120 98 C 132 102, 142 110, 150 122 L 151 170" stroke={shader.shade} strokeWidth="1.5" fill="none" />
                  <circle cx="123" cy="100" r="2.3" fill="url(#goldAccentShader)" />
                  <circle cx="136" cy="109" r="2.3" fill="url(#goldAccentShader)" />
                  <circle cx="147" cy="121" r="2.3" fill="url(#goldAccentShader)" />
                  <circle cx="149" cy="145" r="2.3" fill="url(#goldAccentShader)" />
                  <circle cx="150" cy="168" r="2.3" fill="url(#goldAccentShader)" />
                  {/* Soft Drapery Folds */}
                  <path d="M 103 130 C 100 184, 96 242, 92 297" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.2" />
                  <path d="M 138 170 C 141 214, 144 256, 147 296" stroke={shader.shade} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
                </g>
              )}

              {/* ----------------- [7] ÁO TAY CHẼN (NGŨ THÂN TAY CHẼN NAM ĐĨNH ĐẠC, VỪA VẶN PHOM NAM) ----------------- */}
              {outfitId === 'ao-tay-chen' && (
                <g id="garment-ao-tay-chen">
                  {/* 1. Tà sau & Vạt con bên trong (Back Tunic Panel & Inner 5th Flap at Side Slits) */}
                  <path
                    d="M 83 170 L 157 170 L 160 298 C 137 306, 103 306, 80 298 Z"
                    fill={shader.shade}
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  {/* Inner white silk lining (Lót lụa trắng) & Vạt con peeking subtly at the side hip slits */}
                  <path
                    d="M 85 174 L 88 174 L 84 294 L 80.5 296 Z"
                    fill="#FAF8F5"
                    opacity="0.75"
                  />
                  <path
                    d="M 155 174 L 152 174 L 156 294 L 159.5 296 Z"
                    fill="#FAF8F5"
                    opacity="0.75"
                  />

                  {/* 2. Đôi Tay Áo Chẽn Nam Tính (Tailored Masculine Fitted Sleeves - Ôm gọn vai & cánh tay model nam) */}
                  {/* Left Fitted Sleeve (Covers bare shoulder x=76..78 y=96 and arm down to wrist y=201) */}
                  <path
                    d="M 74.5 95 C 67.5 123, 63.2 161, 61.2 200.5 C 65.5 204, 70.8 204.5, 75 202 C 77.2 168, 81.5 136, 86.5 114 L 83 91 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.15"
                  />
                  {/* Right Fitted Sleeve */}
                  {!holdingUmbrella ? (
                    <>
                      <path
                        d="M 165.5 95 C 172.5 123, 176.8 161, 178.8 200.5 C 174.5 204, 169.2 204.5, 165 202 C 162.8 168, 158.5 136, 153.5 114 L 157 91 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <path
                        d="M 165.6 201.8 Q 172 204.2 178.2 200.5"
                        stroke="#FAF8F5"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M 165 196.5 Q 171.5 198.8 177.8 195.5"
                        stroke={shader.shade}
                        strokeWidth="0.9"
                        fill="none"
                        opacity="0.7"
                      />
                    </>
                  ) : (
                    <g id="ao-tay-chen-right-sleeve-holding">
                      <path
                        d="M 165 95 C 174 112, 183 129, 188 144 C 182 148, 175 148, 171 144 C 163 128, 155 116, 150.5 116 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <path
                        d="M 188 144 C 181 132, 172 120, 163 112 L 170 107 C 178 116, 186 128, 193 140 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <path d="M 162 113 Q 166.5 109 171 106" stroke="#FAF8F5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                      <path d="M 174 140 Q 180 143 186 144" stroke={shader.shade} strokeWidth="1.1" fill="none" opacity="0.6" />
                    </g>
                  )}

                  {/* Natural 3D Sleeve Highlights & Elbow Creases */}
                  <path
                    d="M 73.5 104 C 68.5 132, 65.5 164, 63.8 195"
                    stroke="#FFFFFF"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.22"
                  />
                  <path
                    d="M 80 116 C 76.5 144, 74 170, 72.5 196"
                    stroke={shader.shade}
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.55"
                  />
                  <path
                    d="M 166.5 104 C 171.5 132, 174.5 164, 176.2 195"
                    stroke="#FFFFFF"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.18"
                  />
                  <path
                    d="M 160 116 C 163.5 144, 166 170, 167.5 196"
                    stroke={shader.shade}
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.55"
                  />

                  {/* 3. Thân Áo Ngũ Thân Nam Tính Vừa Vặn Khung Vai - Ngực - Eo (Tailored Masculine 5-Panel Body & Tà Trước) */}
                  <path
                    d="M 104.5 88.5 C 93 88.5, 82.5 90.5, 74.5 95 L 80.5 115 C 82 136, 84 156, 85.5 174 L 81 294 C 103 303, 137 303, 159 294 L 154.5 174 C 156 156, 158 136, 159.5 115 L 165.5 95 C 157.5 90.5, 147 88.5, 135.5 88.5 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.2"
                  />

                  {/* 4. Đường Ráp Nối Tay Truyền Thống (Traditional Shoulder-to-Underarm Join Seams) */}
                  <path
                    d="M 84 91 C 82.5 99, 81.5 107, 80.5 115"
                    stroke={shader.shade}
                    strokeWidth="1.1"
                    fill="none"
                    opacity="0.7"
                  />
                  <path
                    d="M 156 91 C 157.5 99, 158.5 107, 159.5 115"
                    stroke={shader.shade}
                    strokeWidth="1.1"
                    fill="none"
                    opacity="0.7"
                  />

                  {/* 5. Cổ Đứng Lập Lĩnh & Cổ Lót Trắng Hộ Lĩnh (Upright Standing Collar & White Inner Collar) */}
                  {/* White Hộ Lĩnh Inner Collar */}
                  <path
                    d="M 105.5 82.8 Q 120 87.8 134.5 82.8 L 135.5 89.5 Q 120 94.5 104.5 89.5 Z"
                    fill="#FAF8F5"
                    stroke="#D8CEBE"
                    strokeWidth="0.95"
                  />
                  {/* Outer Standing Collar (Bâu cổ lập lĩnh ôm gọn cổ nam) */}
                  <path
                    d="M 104 85.5 Q 120 90.8 136 85.5 L 137 96.5 Q 120 101.8 103 96.5 Z"
                    fill={shader.primary}
                    stroke={shader.accent}
                    strokeWidth="1.25"
                  />
                  {/* Center Collar Slit */}
                  <line x1="120" y1="88" x2="120" y2="99" stroke={shader.shade} strokeWidth="1.25" />

                  {/* 6. Đường Trung Phùng (Center Vertical Seam of 5-Panel Tunic) */}
                  <line x1="120" y1="99" x2="120" y2="300.5" stroke={shader.shade} strokeWidth="1.35" opacity="0.85" />
                  <line x1="118.8" y1="101" x2="118.8" y2="299" stroke="#FFFFFF" strokeWidth="0.85" opacity="0.22" />

                  {/* 7. Vạt Cả Hữu Nhẫm (Overlapping Right Lapel S-Curve) & 5 Cúc Đồng Ngũ Thường */}
                  <path
                    d="M 120 97.5 C 133 101, 146 108.5, 155.5 121 L 154 173"
                    stroke={shader.shade}
                    strokeWidth="1.55"
                    fill="none"
                  />
                  <path
                    d="M 120 98.7 C 132.5 102, 145 109.5, 154.3 121.8 L 152.8 173"
                    stroke="#FFFFFF"
                    strokeWidth="0.85"
                    fill="none"
                    opacity="0.25"
                  />

                  {/* Traditional Knotted Button Loops (Khuyết cài cúc) & 5 Brass/Gold Buttons (Nhân - Nghĩa - Lễ - Trí - Tín) */}
                  <line x1="120" y1="99.5" x2="124" y2="99.5" stroke={shader.accent} strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="123.5" cy="99.5" r="2.2" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.55" />

                  <line x1="136.5" y1="105.5" x2="140.5" y2="106.5" stroke={shader.accent} strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="139" cy="106" r="2.2" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.55" />

                  <line x1="150.5" y1="118.5" x2="154.5" y2="119.5" stroke={shader.accent} strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="152.5" cy="119" r="2.2" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.55" />

                  <line x1="151.5" y1="145" x2="155" y2="145" stroke={shader.accent} strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="153" cy="145" r="2.2" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.55" />

                  <line x1="151" y1="170" x2="154.5" y2="170" stroke={shader.accent} strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="152.5" cy="170" r="2.2" fill="url(#goldAccentShader)" stroke={shader.shade} strokeWidth="0.55" />

                  {/* 8. Nếp Vải Lụa Tự Nhiên & Độ Rủ Tà Áo (3D Masculine Drapery Folds & Hem Trim) */}
                  <path
                    d="M 96 112 C 94 134, 93 154, 92 172"
                    stroke="#FFFFFF"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.18"
                  />
                  <path
                    d="M 104 128 C 101 182, 97 238, 93 294"
                    stroke="#FFFFFF"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.22"
                  />
                  <path
                    d="M 95 174 C 92 216, 89 256, 86 292"
                    stroke={shader.shade}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.55"
                  />
                  <path
                    d="M 134 174 C 136 216, 138 256, 140 296"
                    stroke="#FFFFFF"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.16"
                  />
                  <path
                    d="M 145 174 C 148 216, 151 256, 154 292"
                    stroke={shader.shade}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.55"
                  />
                  {/* Subtle hem border highlight ("Tà bất chạm địa") */}
                  <path
                    d="M 82 292.5 C 103 301.5, 137 301.5, 158 292.5"
                    stroke="#FFFFFF"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.24"
                  />
                </g>
              )}

              {/* ----------------- [8] ÁO GIAO LĨNH (CỔ CHÉO CHỮ Y LÝ - TRẦN - LÊ ĐẠI VIỆT) ----------------- */}
              {outfitId === 'giao-linh' && (
                <g id="garment-giao-linh">
                  <defs>
                    {/* Contrasting Pleated Thường (Lower Wrap Skirt) Gradient */}
                    <linearGradient id="giaoLinhSkirtSilk" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFDF9" />
                      <stop offset="55%" stopColor="#F6ECDC" />
                      <stop offset="100%" stopColor="#E5D3B8" />
                    </linearGradient>
                    {/* Contrasting Collar & Cuff Brocade Gradient */}
                    <linearGradient id="giaoLinhCollarBrocade" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFDF8" />
                      <stop offset="50%" stopColor="#FBF0D9" />
                      <stop offset="100%" stopColor="#EDD5AA" />
                    </linearGradient>
                    {/* Clip paths for Wide Quảng Tụ Sleeves */}
                    <clipPath id="giaoLinhLeftSleeveClip">
                      <path d="M 89 96 C 71 116, 52 152, 44 198 C 52 217, 72 223, 86 214 C 88 178, 91 144, 96 116 Z" />
                    </clipPath>
                    <clipPath id="giaoLinhRightSleeveClip">
                      <path d="M 151 96 C 169 116, 188 152, 196 198 C 188 217, 168 223, 154 214 C 152 178, 149 144, 144 116 Z" />
                    </clipPath>
                    {/* Reusable Đại Việt Đoàn Hoa Cúc / Sen (Chrysanthemum & Lotus Medallion) */}
                    <g id="daiVietDoanHoa">
                      <circle cx="0" cy="0" r="8.5" fill="none" stroke="url(#goldAccentShader)" strokeWidth="1.1" strokeDasharray="2 1.2" />
                      <circle cx="0" cy="0" r="6.2" fill={shader.shade} fillOpacity="0.35" stroke="#F5D587" strokeWidth="0.6" />
                      {/* 8-petal lotus/chrysanthemum blossom */}
                      <path
                        d="M 0 -5.2 Q 1.8 -2 0 0 Q -1.8 -2 0 -5.2 Z M 0 5.2 Q 1.8 2 0 0 Q -1.8 2 0 5.2 Z M -5.2 0 Q -2 1.8 0 0 Q -2 -1.8 -5.2 0 Z M 5.2 0 Q 2 1.8 0 0 Q 2 -1.8 5.2 0 Z"
                        fill="url(#goldAccentShader)"
                      />
                      <path
                        d="M -3.6 -3.6 Q -0.5 -2 0 0 Q -2 -0.5 -3.6 -3.6 Z M 3.6 -3.6 Q 2 -0.5 0 0 Q 0.5 -2 3.6 -3.6 Z M -3.6 3.6 Q -2 0.5 0 0 Q -0.5 2 -3.6 3.6 Z M 3.6 3.6 Q 0.5 2 0 0 Q 2 0.5 3.6 3.6 Z"
                        fill="#F5D587"
                        opacity="0.85"
                      />
                      <circle cx="0" cy="0" r="1.6" fill="#BE123C" stroke="#FFFDF9" strokeWidth="0.5" />
                    </g>
                  </defs>

                  {/* 1. HẠ THƯỜNG XẾP LY (PLEATED SILK WRAP SKIRT - THƯỜNG LỤA ĐẠI VIỆT) */}
                  <g id="giao-linh-pleated-thuong">
                    {/* Main flowing A-line wrap skirt covering down to ankles */}
                    <path
                      d="M 90 164 L 150 164 L 164 324 C 142 331, 98 331, 76 324 Z"
                      fill="url(#giaoLinhSkirtSilk)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.1"
                    />
                    {/* Accordion silk pleats (Nếp xếp ly thường uyển chuyển) */}
                    <line x1="98" y1="170" x2="85" y2="323" stroke="#D9C6A8" strokeWidth="1.1" />
                    <line x1="105" y1="170" x2="96" y2="325" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.65" />
                    <line x1="112" y1="170" x2="107" y2="326" stroke="#D9C6A8" strokeWidth="1.1" />
                    <line x1="120" y1="170" x2="120" y2="327" stroke="#D9C6A8" strokeWidth="1.1" />
                    <line x1="128" y1="170" x2="133" y2="326" stroke="#D9C6A8" strokeWidth="1.1" />
                    <line x1="135" y1="170" x2="144" y2="325" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.65" />
                    <line x1="142" y1="170" x2="155" y2="323" stroke="#D9C6A8" strokeWidth="1.1" />

                    {/* Woven Gold Lotus & Cloud Scroll Hem Border on Thường (y = 310..325) */}
                    <path
                      d="M 78 312 C 98 318, 142 318, 162 312 L 164 324 C 142 331, 98 331, 76 324 Z"
                      fill={shader.shade}
                      fillOpacity="0.85"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1"
                    />
                    <path
                      d="M 80 318 Q 90 313 100 318 Q 110 313 120 318 Q 130 313 140 318 Q 150 313 160 318"
                      fill="none"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.3"
                    />
                  </g>

                  {/* 2. LỚP ÁO LÓT TRUNG Y ĐẠI VIỆT (MASCULINE INNER WHITE TRUNG Y CROSSED COLLAR) */}
                  <g id="giao-linh-inner-layers">
                    {/* White silk Trung Y (inner crossed collar) left & right lapels tailored for male chest */}
                    <path
                      d="M 135 83 L 115 116 L 122 120 L 139 86 Z"
                      fill="#FAF8F5"
                      stroke="#DFD4C3"
                      strokeWidth="0.9"
                    />
                    <path
                      d="M 105 83 L 125 119 L 118 123 L 101 86 Z"
                      fill="#FFFDF9"
                      stroke="#DFD4C3"
                      strokeWidth="1"
                    />
                  </g>

                  {/* 3. TAY ÁO QUẢNG TỤ / ĐẠI TỤ (WIDE FLOWING SLEEVES WITH BROCADE CUFFS - VỪA KHUNG VAI NAM x=75..165) */}
                  {/* Left Sleeve Inner White Trung Y Cuff & Masculine Hand */}
                  <path
                    d="M 43 196 C 51 217, 72 224, 86 215 L 85 207 C 72 214, 54 208, 47 192 Z"
                    fill="#FFFDF9"
                    stroke="#DFD4C3"
                    strokeWidth="0.9"
                  />
                  <ellipse cx="64" cy="213" rx="6.5" ry="5" transform="rotate(14 64 213)" fill="url(#skinFace3D)" />

                  {/* Right Sleeve Inner White Trung Y Cuff & Masculine Hand */}
                  {!holdingUmbrella && (
                    <>
                      <path
                        d="M 197 196 C 189 217, 168 224, 154 215 L 155 207 C 168 214, 186 208, 193 192 Z"
                        fill="#FFFDF9"
                        stroke="#DFD4C3"
                        strokeWidth="0.9"
                      />
                      <ellipse cx="176" cy="213" rx="6.5" ry="5" transform="rotate(-14 176 213)" fill="url(#skinFace3D)" />
                    </>
                  )}

                  {/* Left Wide Quảng Tụ Sleeve fitting male shoulder at x=75 */}
                  <path
                    d="M 75 95 C 62 116, 50 152, 44 198 C 52 217, 72 223, 86 214 C 88 178, 91 144, 96 116 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.15"
                  />
                  <g clipPath="url(#giaoLinhLeftSleeveClip)">
                    {/* Wide Embroidered Brocade Cuff Band (Nẹp gấm cửa tay trái) */}
                    <path
                      d="M 40 184 C 52 203, 72 209, 90 200 L 90 220 C 72 227, 50 221, 40 200 Z"
                      fill="url(#giaoLinhCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.4"
                    />
                    {/* Chrysanthemum scroll motif on left cuff */}
                    <path
                      d="M 48 198 Q 58 206 68 205 Q 78 204 85 208"
                      fill="none"
                      stroke="#D97706"
                      strokeWidth="1.1"
                      strokeDasharray="2 1.5"
                    />
                    {/* Shoulder Medallion */}
                    <use href="#daiVietDoanHoa" transform="translate(73, 140) scale(0.85)" />
                  </g>

                  {/* Right Wide Quảng Tụ Sleeve fitting male shoulder at x=165 */}
                  {!holdingUmbrella ? (
                    <>
                      <path
                        d="M 165 95 C 178 116, 190 152, 196 198 C 188 217, 168 223, 154 214 C 152 178, 149 144, 144 116 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <g clipPath="url(#giaoLinhRightSleeveClip)">
                        {/* Wide Embroidered Brocade Cuff Band (Nẹp gấm cửa tay phải) */}
                        <path
                          d="M 200 184 C 188 203, 168 209, 150 200 L 150 220 C 168 227, 190 221, 200 200 Z"
                          fill="url(#giaoLinhCollarBrocade)"
                          stroke="url(#goldAccentShader)"
                          strokeWidth="1.4"
                        />
                        {/* Chrysanthemum scroll motif on right cuff */}
                        <path
                          d="M 192 198 Q 182 206 172 205 Q 162 204 155 208"
                          fill="none"
                          stroke="#D97706"
                          strokeWidth="1.1"
                          strokeDasharray="2 1.5"
                        />
                        {/* Shoulder Medallion */}
                        <use href="#daiVietDoanHoa" transform="translate(167, 140) scale(0.85)" />
                      </g>
                    </>
                  ) : (
                    <g id="giao-linh-right-sleeve-holding">
                      <path
                        d="M 165 95 C 178 116, 186 136, 190 144 C 184 133, 176 122, 166 114 L 173 108 C 182 118, 192 138, 196 160 C 190 190, 174 206, 158 200 C 154 174, 149 144, 144 116 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <path d="M 195 156 Q 180 172 160 166" stroke="url(#goldAccentShader)" strokeWidth="3" fill="none" />
                      <path d="M 165 115 Q 169.5 111 174 107" stroke="#FAF8F5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                    </g>
                  )}

                  {/* 4. THÂN ÁO GIAO LĨNH HỮU NHẪM (VẠT TRÁI ĐẮP CHÉO ĐÈ LÊN VẠT PHẢI - PHOM NAM ĐĨNH ĐẠC) */}
                  {/* Right Under-Lapel Tunic Body (Vạt phải nằm lớp dưới) */}
                  <path
                    d="M 135 88 C 144 91, 154 92, 165 95 L 156 160 L 160 274 C 148 280, 132 282, 118 280 L 114 120 Z"
                    fill={shader.shade}
                    stroke={shader.shade}
                    strokeWidth="0.9"
                  />
                  {/* Left Over-Lapel Tunic Body sweeping diagonally across chest to right hip & down to knee (Hữu Nhẫm) */}
                  <path
                    d="M 104.5 88 C 94 91, 84 92, 75 95 L 84 160 L 80 276 C 100 285, 136 285, 156 276 L 152 152 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.2"
                  />

                  {/* Diagonal Overlap Edge & Side-Slit Brocade Trim on Lower Tunic */}
                  <path
                    d="M 84 270 C 102 279, 134 279, 152 270 L 152 276 C 134 285, 102 285, 84 276 Z"
                    fill="url(#giaoLinhCollarBrocade)"
                    stroke="url(#goldAccentShader)"
                    strokeWidth="1"
                  />
                  {/* Subtle silk drapery lines on upper and lower Giao Lĩnh body */}
                  <path d="M 100 118 L 112 154" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.24" strokeLinecap="round" />
                  <path d="M 96 182 L 91 264" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.22" strokeLinecap="round" />
                  <path d="M 140 182 L 145 264" stroke={shader.shade} strokeWidth="1.4" opacity="0.4" strokeLinecap="round" />

                  {/* Embroidered Đại Việt Đoàn Hoa Medallions on Tunic Body */}
                  <use href="#daiVietDoanHoa" transform="translate(105, 136) scale(0.82)" />
                  <use href="#daiVietDoanHoa" transform="translate(104, 206)" />
                  <use href="#daiVietDoanHoa" transform="translate(136, 206)" />
                  <use href="#daiVietDoanHoa" transform="translate(102, 248) scale(0.86)" />
                  <use href="#daiVietDoanHoa" transform="translate(138, 248) scale(0.86)" />

                  {/* 5. BÂU CỔ GIAO LĨNH CHỮ Y BẢN RỘNG (Y-SHAPED CROSSED BROCADE COLLAR) */}
                  <g id="giao-linh-y-collar">
                    {/* Right Under-Collar Band (tucked beneath left lapel at x=120, y=118) */}
                    <path
                      d="M 132 84 L 140 88 L 123 123 L 116 117 Z"
                      fill="url(#giaoLinhCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.5"
                    />
                    {/* Left Over-Collar Band sweeping from left neck (108,84) to right waist (148,156) */}
                    <path
                      d="M 100 88 L 108 84 L 149 148 L 143 156 Z"
                      fill="url(#giaoLinhCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.7"
                    />
                    {/* Intricate Lotus/Chrysanthemum Scroll Embroidery inside the Y-Collar */}
                    <path
                      d="M 104 88 Q 114 102 124 116 Q 134 132 145 150"
                      fill="none"
                      stroke="#D97706"
                      strokeWidth="1.2"
                      strokeDasharray="2.5 1.5"
                    />
                    <circle cx="112" cy="99" r="1.8" fill="#BE123C" stroke="#D4AF37" strokeWidth="0.6" />
                    <circle cx="124" cy="117" r="2" fill="#15803D" stroke="#D4AF37" strokeWidth="0.6" />
                    <circle cx="136" cy="135" r="1.8" fill="#BE123C" stroke="#D4AF37" strokeWidth="0.6" />
                    <circle cx="130" cy="99" r="1.7" fill="#BE123C" stroke="#D4AF37" strokeWidth="0.6" />

                    {/* Right-Side Fastening Silk Tie (Dây buộc cố định vạt áo bên sườn phải) */}
                    <path d="M 146 149 C 154 146, 156 154, 148 155" stroke="#BE123C" strokeWidth="1.5" fill="none" />
                    <circle cx="147" cy="152" r="2" fill="url(#goldAccentShader)" />
                  </g>

                  {/* 6. ĐAI LƯNG ĐẠI ĐỚI, NÚT THẮT ĐỒNG TÂM & NGỌC BỘI (WAIST SASH & JADE PENDANT) */}
                  <g id="giao-linh-dai-doi-sash">
                    {/* Drop shadow under waist sash */}
                    <rect x="90" y="157" width="60" height="13" rx="3" fill="rgba(28, 20, 17, 0.26)" />
                    {/* Main Wide Silk Sash (Đại Đới) */}
                    <path
                      d="M 90 155 Q 120 159 150 155 L 151 167 Q 120 171 89 167 Z"
                      fill="#991B1E"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.5"
                    />
                    {/* Horizontal pleated silk bands on Đại Đới */}
                    <path d="M 91 159 Q 120 163 149 159" stroke="#F5D587" strokeWidth="0.9" fill="none" opacity="0.85" />
                    <path d="M 91 163 Q 120 167 149 163" stroke="#5E1114" strokeWidth="1.1" fill="none" />

                    {/* Long Flowing Silk Sash Ribbons (Dải đới lụa buông dài thướt tha) */}
                    <path
                      d="M 116 166 C 112 204, 108 248, 105 292 L 112 294 C 115 250, 118 206, 120 167 Z"
                      fill="url(#giaoLinhCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1"
                    />
                    <path
                      d="M 124 166 C 128 204, 132 248, 135 290 L 128 292 C 125 250, 122 206, 120 167 Z"
                      fill="url(#giaoLinhCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1"
                    />

                    {/* Jade Pendant (Ngọc Bội Lý - Trần) suspended from right waist */}
                    <line x1="133" y1="167" x2="135" y2="196" stroke="#BE123C" strokeWidth="1.3" />
                    <circle cx="135" cy="199" r="5.5" fill="#10B981" stroke="url(#goldAccentShader)" strokeWidth="1.4" />
                    <circle cx="135" cy="199" r="2.2" fill="#ECFDF5" />
                    {/* Crimson silk tassel below jade pendant */}
                    <path d="M 135 205 L 133 224 M 135 205 L 135 226 M 135 205 L 137 224" stroke="#BE123C" strokeWidth="1.1" strokeLinecap="round" />
                    <circle cx="135" cy="205" r="1.5" fill="url(#goldAccentShader)" />

                    {/* Central Nút Thắt Đồng Tâm (Auspicious Double-Loop Court Knot) */}
                    <path d="M 120 161 C 109 154, 107 168, 120 164" stroke="url(#goldAccentShader)" strokeWidth="2" fill="#991B1E" />
                    <path d="M 120 161 C 131 154, 133 168, 120 164" stroke="url(#goldAccentShader)" strokeWidth="2" fill="#991B1E" />
                    <circle cx="120" cy="162" r="3.8" fill="url(#goldAccentShader)" stroke="#781316" strokeWidth="1" />
                    <circle cx="120" cy="162" r="1.5" fill="#10B981" />
                  </g>
                </g>
              )}

              {/* ----------------- [9] ÁO VIÊN LĨNH (CỔ TRÒN BỆ VỆ PHOM NAM ĐĨNH ĐẠC) ----------------- */}
              {outfitId === 'vien-linh' && (
                <g id="garment-vien-linh">
                  <path d="M 82 170 L 158 170 L 160 298 C 138 305, 102 305, 80 298 Z" fill={shader.shade} />
                  {/* Left Sleeve fitting male shoulder at x=75, wrist at y=201 */}
                  <path
                    d="M 75 95 C 67 118, 61 158, 57.5 201 C 63 205.5, 70.5 206, 76 203 C 80 170, 84.5 138, 89.5 116 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.15"
                  />
                  {/* Right Sleeve fitting male shoulder at x=165 */}
                  {!holdingUmbrella ? (
                    <>
                      <path
                        d="M 165 95 C 173 118, 179 158, 182.5 201 C 177 205.5, 169.5 206, 164 203 C 160 170, 155.5 138, 150.5 116 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <path d="M 164.5 203 Q 173 205.5 182 201" stroke="#FAF8F5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                    </>
                  ) : (
                    <g id="vien-linh-right-sleeve-holding">
                      <path
                        d="M 165 95 C 174 112, 183 129, 188 144 C 182 148, 175 148, 171 144 C 163 128, 155 116, 150.5 116 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <path
                        d="M 188 144 C 181 132, 172 120, 163 112 L 170 107 C 178 116, 186 128, 193 140 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <path d="M 162 113 Q 166.5 109 171 106" stroke="#FAF8F5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                      <path d="M 174 140 Q 180 143 186 144" stroke={shader.shade} strokeWidth="1.1" fill="none" opacity="0.6" />
                    </g>
                  )}
                  {/* Left white inner cuff trim */}
                  <path d="M 58 201 Q 67 205.5 75.5 203" stroke="#FAF8F5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                  {/* Broad ceremonial body fitting male shoulders x=75..165 */}
                  <path
                    d="M 104.5 88.5 C 93 89, 82.5 91, 75 95 L 82 116 C 84 136, 86 154, 87.5 172 L 83 295 C 103 303, 137 303, 157 295 L 152.5 172 C 154 154, 156 136, 158 116 L 165 95 C 157.5 91, 147 89, 135.5 88.5 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.2"
                  />
                  {/* Round closed collar (Viên Lĩnh khép kín quanh cổ lộ lót trắng) */}
                  <ellipse cx="120" cy="89.5" rx="14.5" ry="6.5" fill="#FAF8F5" stroke="#D8CEBE" strokeWidth="0.9" />
                  <ellipse cx="120" cy="91.5" rx="14.5" ry="7" fill={shader.primary} stroke={shader.accent} strokeWidth="1.6" />
                  <path d="M 120 98.5 C 132 102, 142 110, 149 122 L 150 168" stroke={shader.shade} strokeWidth="1.4" fill="none" />
                  <circle cx="134" cy="91.5" r="2" fill="url(#goldAccentShader)" />
                  <circle cx="145" cy="112" r="2" fill="url(#goldAccentShader)" />
                  {/* Square Court Badge / Bổ Tử on Chest */}
                  <rect x="107" y="120" width="26" height="26" rx="2" fill="url(#goldAccentShader)" opacity="0.9" stroke="#8A631E" strokeWidth="1" />
                  <rect x="110" y="123" width="20" height="20" rx="1" fill={shader.primary} />
                  <circle cx="120" cy="133" r="5" fill="none" stroke="url(#goldAccentShader)" strokeWidth="1.2" />
                </g>
              )}

              {/* ----------------- [10] ÁO ĐỐI KHÂM (TRỰC LĨNH ĐỐI KHÂM ĐA LỚP LÝ - TRẦN - LÊ - NGUYỄN) ----------------- */}
              {outfitId === 'doi-kham' && (
                <g id="garment-doi-kham">
                  <defs>
                    {/* Contrasting Pleated Hạ Thường (Lower Wrap Skirt) Silk Gradient */}
                    <linearGradient id="doiKhamSkirtSilk" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFDF9" />
                      <stop offset="55%" stopColor="#F6ECDC" />
                      <stop offset="100%" stopColor="#E3CFB2" />
                    </linearGradient>
                    {/* Inner Embroidered Yếm Đào Silk Brocade Gradient */}
                    <linearGradient id="doiKhamYemBrocade" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C8232C" />
                      <stop offset="50%" stopColor="#991B1E" />
                      <stop offset="100%" stopColor="#630E11" />
                    </linearGradient>
                    {/* Straight Trực Lĩnh Collar & Wide Sleeve Cuff Brocade Gradient */}
                    <linearGradient id="doiKhamCollarBrocade" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFDF8" />
                      <stop offset="50%" stopColor="#FBF0D9" />
                      <stop offset="100%" stopColor="#EDD5AA" />
                    </linearGradient>
                    {/* Clip Paths for Wide Flowing Quảng Tụ Sleeves */}
                    <clipPath id="doiKhamLeftSleeveClip">
                      <path d="M 89 96 C 72 116, 53 152, 45 197 C 53 216, 72 222, 86 213 C 88 177, 91 144, 96 116 Z" />
                    </clipPath>
                    <clipPath id="doiKhamRightSleeveClip">
                      <path d="M 151 96 C 168 116, 187 152, 195 197 C 187 216, 168 222, 154 213 C 152 177, 149 144, 144 116 Z" />
                    </clipPath>
                    {/* Clip Paths for Left & Right Parallel Front Panels */}
                    <clipPath id="doiKhamLeftPanelClip">
                      <path d="M 89 96 C 96 93, 102 93, 108.5 94 L 107.5 314 C 96 317, 86 314, 79 309 L 88 158 Z" />
                    </clipPath>
                    <clipPath id="doiKhamRightPanelClip">
                      <path d="M 151 96 C 144 93, 138 93, 131.5 94 L 132.5 314 C 144 317, 154 314, 161 309 L 152 158 Z" />
                    </clipPath>
                    {/* Reusable Đoàn Hoa Liên Mẫu Đơn (Royal Lotus & Peony Medallion) */}
                    <g id="doiKhamLienHoaRoundel">
                      <circle cx="0" cy="0" r="8" fill={shader.shade} fillOpacity="0.38" stroke="url(#goldAccentShader)" strokeWidth="1.1" strokeDasharray="2 1" />
                      <circle cx="0" cy="0" r="5.8" fill="none" stroke="#F5D587" strokeWidth="0.55" opacity="0.85" />
                      <path
                        d="M 0 -4.8 Q 1.6 -1.8 0 0 Q -1.6 -1.8 0 -4.8 Z M 0 4.8 Q 1.6 1.8 0 0 Q -1.6 1.8 0 4.8 Z M -4.8 0 Q -1.8 1.6 0 0 Q -1.8 -1.6 -4.8 0 Z M 4.8 0 Q 1.8 1.6 0 0 Q 1.8 -1.6 4.8 0 Z"
                        fill="url(#goldAccentShader)"
                      />
                      <path
                        d="M -3.3 -3.3 Q -0.5 -1.8 0 0 Q -1.8 -0.5 -3.3 -3.3 Z M 3.3 -3.3 Q 1.8 -0.5 0 0 Q 0.5 -1.8 3.3 -3.3 Z M -3.3 3.3 Q -1.8 0.5 0 0 Q -0.5 1.8 -3.3 3.3 Z M 3.3 3.3 Q 0.5 1.8 0 0 Q 1.8 0.5 3.3 3.3 Z"
                        fill="#FFFDF9"
                        opacity="0.85"
                      />
                      <circle cx="0" cy="0" r="1.5" fill="#BE123C" stroke="#F5D587" strokeWidth="0.5" />
                    </g>
                  </defs>

                  {/* 1. HẠ THƯỜNG XẾP LY & XIÊM Y ĐA TẦNG (PLEATED LOWER WRAP SKIRT) */}
                  <g id="doi-kham-pleated-thuong">
                    {/* Back outer robe shadow layer for depth at side slits */}
                    <path
                      d="M 82 164 L 158 164 L 156 313 C 136 318, 104 318, 84 313 Z"
                      fill={shader.shade}
                      opacity="0.9"
                    />
                    {/* Flowing A-line Pleated Silk Thường covering down to ankles */}
                    <path
                      d="M 90 158 L 150 158 L 164 324 C 142 331, 98 331, 76 324 Z"
                      fill="url(#doiKhamSkirtSilk)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.1"
                    />
                    {/* Delicate Accordion Silk Pleats (Nếp xếp ly thường uyển chuyển lộ giữa hai vạt áo) */}
                    <line x1="98" y1="164" x2="86" y2="323" stroke="#D9C6A8" strokeWidth="1" />
                    <line x1="106" y1="164" x2="98" y2="325" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.7" />
                    <line x1="112" y1="164" x2="109" y2="326" stroke="#D4BFA0" strokeWidth="1.1" />
                    <line x1="116" y1="164" x2="115" y2="327" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.75" />
                    <line x1="120" y1="164" x2="120" y2="327" stroke="#C9B290" strokeWidth="1.15" />
                    <line x1="124" y1="164" x2="125" y2="327" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.75" />
                    <line x1="128" y1="164" x2="131" y2="326" stroke="#D4BFA0" strokeWidth="1.1" />
                    <line x1="134" y1="164" x2="142" y2="325" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.7" />
                    <line x1="142" y1="164" x2="154" y2="323" stroke="#D9C6A8" strokeWidth="1" />

                    {/* Woven Golden Lotus & Cloud Hem Border on Hạ Thường */}
                    <path
                      d="M 78 313 C 98 319, 142 319, 162 313 L 164 324 C 142 331, 98 331, 76 324 Z"
                      fill={shader.shade}
                      fillOpacity="0.88"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1"
                    />
                    <path
                      d="M 82 319 Q 95 314 108 319 Q 120 314 132 319 Q 145 314 158 319"
                      fill="none"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.2"
                    />
                  </g>

                  {/* 2. NỘI Y TRUNG Y LỤA TRẮNG ĐẠI VIỆT (MASCULINE INNER TRUNG Y CROSSED COLLAR) */}
                  <g id="doi-kham-inner-yem-dao">
                    {/* Inner White Silk Trung Y Collar & Chest Lining */}
                    <path
                      d="M 103 87 Q 120 94 137 87 L 136 156 L 104 156 Z"
                      fill="#FFFDF9"
                      stroke="#E2D5C3"
                      strokeWidth="0.9"
                    />
                    {/* Inner crossed collar lapels of Trung Y */}
                    <path d="M 134 84 L 115 116 L 122 120 L 138 87 Z" fill="#FAF8F5" stroke="#DFD4C3" strokeWidth="0.9" />
                    <path d="M 106 84 L 125 119 L 119 123 L 102 87 Z" fill="#FFFDF9" stroke="#DFD4C3" strokeWidth="1" />
                    <line x1="120" y1="122" x2="120" y2="156" stroke="#DFD4C3" strokeWidth="1.1" />
                  </g>

                  {/* 3. ĐAI LƯNG LỤA CHIẾT EO, DẢI CUNG THAO & NGỌC BỘI (INNER WAIST SASH & JADE PENDANT) */}
                  <g id="doi-kham-inner-waist-sash">
                    {/* Drop shadow under inner waist sash */}
                    <rect x="94" y="153" width="52" height="11" rx="2.5" fill="rgba(28, 20, 17, 0.22)" />
                    {/* Pleated Silk Waist Sash (Thắt lưng lụa chiết eo bên trong áo khoác Đối Khâm) */}
                    <path
                      d="M 94 151 Q 120 155 146 151 L 147 161 Q 120 165 93 161 Z"
                      fill="url(#doiKhamCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.3"
                    />
                    <path d="M 96 156 Q 120 160 144 156" stroke="#BE123C" strokeWidth="1" fill="none" opacity="0.8" />

                    {/* Twin Flowing Silk Ribbons (Dải cung thao buông dài giữa tà váy xếp ly) */}
                    <path
                      d="M 116 161 C 114 198, 112 242, 110 286 L 115.5 288 C 117 244, 118.5 200, 119.5 162 Z"
                      fill="url(#doiKhamYemBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="0.8"
                    />
                    <path
                      d="M 124 161 C 126 198, 128 242, 130 286 L 124.5 288 C 123 244, 121.5 200, 120.5 162 Z"
                      fill="url(#doiKhamYemBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="0.8"
                    />

                    {/* Central Jade Pendant (Bội Ngọc Lục Bảo) hanging at center waist */}
                    <line x1="120" y1="162" x2="120" y2="192" stroke="url(#goldAccentShader)" strokeWidth="1.2" />
                    <circle cx="120" cy="197" r="5.2" fill="#10B981" stroke="url(#goldAccentShader)" strokeWidth="1.3" />
                    <circle cx="120" cy="197" r="2" fill="#ECFDF5" />
                    {/* Crimson silk tassel under jade ring */}
                    <path d="M 120 202.5 L 118 220 M 120 202.5 L 120 222 M 120 202.5 L 122 220" stroke="#BE123C" strokeWidth="1.1" strokeLinecap="round" />
                    <circle cx="120" cy="202.5" r="1.4" fill="url(#goldAccentShader)" />

                    {/* Central Court Knot (Nút Thắt Đồng Tâm) */}
                    <circle cx="120" cy="157" r="3.4" fill="#BE123C" stroke="url(#goldAccentShader)" strokeWidth="1.1" />
                    <circle cx="120" cy="157" r="1.2" fill="#FFFDF9" />
                  </g>

                  {/* 4. TAY ÁO QUẢNG TỤ / TAY THỤNG PHỐI CỬA TAY GẤM (WIDE GRACEFUL SLEEVES FITTING MALE SHOULDERS x=75..165) */}
                  {/* Left Sleeve Inner White Silk Cuff & Masculine Hand */}
                  <path
                    d="M 44 195 C 52 216, 72 223, 86 214 L 85 206 C 72 213, 55 207, 48 191 Z"
                    fill="#FFFDF9"
                    stroke="#DFD4C3"
                    strokeWidth="0.9"
                  />
                  <ellipse cx="64" cy="212" rx="6.5" ry="5" transform="rotate(14 64 212)" fill="url(#skinFace3D)" />

                  {/* Right Sleeve Inner White Silk Cuff & Masculine Hand */}
                  {!holdingUmbrella && (
                    <>
                      <path
                        d="M 196 195 C 188 216, 168 223, 154 214 L 155 206 C 168 213, 185 207, 192 191 Z"
                        fill="#FFFDF9"
                        stroke="#DFD4C3"
                        strokeWidth="0.9"
                      />
                      <ellipse cx="176" cy="212" rx="6.5" ry="5" transform="rotate(-14 176 212)" fill="url(#skinFace3D)" />
                    </>
                  )}

                  {/* Left Wide Flowing Sleeve fitting male shoulder at x=75 */}
                  <path
                    d="M 75 95 C 62 116, 50 152, 45 197 C 53 216, 72 222, 86 213 C 88 177, 91 144, 96 116 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.15"
                  />
                  <g clipPath="url(#doiKhamLeftSleeveClip)">
                    {/* Contrasting Brocade Cuff Band on Left Sleeve */}
                    <path
                      d="M 41 183 C 53 202, 72 208, 90 199 L 90 219 C 72 226, 51 220, 41 199 Z"
                      fill="url(#doiKhamCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M 48 197 Q 60 205 70 204 Q 79 203 86 207"
                      fill="none"
                      stroke="#D97706"
                      strokeWidth="1.1"
                      strokeDasharray="2 1.5"
                    />
                    <use href="#doiKhamLienHoaRoundel" transform="translate(73, 140) scale(0.84)" />
                  </g>

                  {/* Right Wide Flowing Sleeve fitting male shoulder at x=165 */}
                  {!holdingUmbrella ? (
                    <>
                      <path
                        d="M 165 95 C 178 116, 190 152, 195 197 C 187 216, 168 222, 154 213 C 152 177, 149 144, 144 116 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <g clipPath="url(#doiKhamRightSleeveClip)">
                        {/* Contrasting Brocade Cuff Band on Right Sleeve */}
                        <path
                          d="M 199 183 C 187 202, 168 208, 150 199 L 150 219 C 168 226, 189 220, 199 199 Z"
                          fill="url(#doiKhamCollarBrocade)"
                          stroke="url(#goldAccentShader)"
                          strokeWidth="1.3"
                        />
                        <path
                          d="M 192 197 Q 180 205 170 204 Q 161 203 154 207"
                          fill="none"
                          stroke="#D97706"
                          strokeWidth="1.1"
                          strokeDasharray="2 1.5"
                        />
                        <use href="#doiKhamLienHoaRoundel" transform="translate(167, 140) scale(0.84)" />
                      </g>
                    </>
                  ) : (
                    <g id="doi-kham-right-sleeve-holding">
                      <path
                        d="M 165 95 C 178 116, 186 136, 190 144 C 184 133, 176 122, 166 114 L 173 108 C 182 118, 192 138, 196 160 C 190 190, 174 206, 158 200 C 154 174, 149 144, 144 116 Z"
                        fill="url(#maleTunicSilk3D)"
                        stroke={shader.shade}
                        strokeWidth="1.15"
                      />
                      <path d="M 195 156 Q 180 172 160 166" stroke="url(#goldAccentShader)" strokeWidth="3" fill="none" />
                      <path d="M 165 115 Q 169.5 111 174 107" stroke="#FAF8F5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                    </g>
                  )}

                  {/* 5. HAI VẠT TRƯỚC ĐỐI KHÂM SONG SONG (SYMMETRICAL PARALLEL OPEN FRONT PANELS FITTING MALE FRAME) */}
                  {/* Left Parallel Outer Panel */}
                  <path
                    d="M 75 95 C 84 92, 94 92, 108.5 94 L 107.5 314 C 96 317, 86 314, 79 309 L 88 158 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.15"
                  />
                  {/* Right Parallel Outer Panel */}
                  <path
                    d="M 165 95 C 156 92, 146 92, 131.5 94 L 132.5 314 C 144 317, 154 314, 161 309 L 152 158 Z"
                    fill="url(#maleTunicSilk3D)"
                    stroke={shader.shade}
                    strokeWidth="1.15"
                  />

                  {/* Left Panel Brocade Hem & Cloud-Wave Scroll */}
                  <g clipPath="url(#doiKhamLeftPanelClip)">
                    <path
                      d="M 76 294 C 88 300, 98 301, 110 298 L 110 318 L 76 318 Z"
                      fill="url(#doiKhamCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M 80 305 Q 88 299 96 305 Q 103 299 109 305"
                      fill="none"
                      stroke="#BE123C"
                      strokeWidth="1.2"
                    />
                    {/* Symmetrical Lotus & Peony Medallions along Left Panel */}
                    <use href="#doiKhamLienHoaRoundel" transform="translate(95, 178) scale(0.88)" />
                    <use href="#doiKhamLienHoaRoundel" transform="translate(94, 228) scale(0.92)" />
                    <use href="#doiKhamLienHoaRoundel" transform="translate(92, 274) scale(0.82)" />
                    {/* Silk drapery sheen on left panel */}
                    <path d="M 92 122 L 86 286" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.24" strokeLinecap="round" />
                  </g>

                  {/* Right Panel Brocade Hem & Cloud-Wave Scroll */}
                  <g clipPath="url(#doiKhamRightPanelClip)">
                    <path
                      d="M 164 294 C 152 300, 142 301, 130 298 L 130 318 L 164 318 Z"
                      fill="url(#doiKhamCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M 131 305 Q 137 299 144 305 Q 152 299 160 305"
                      fill="none"
                      stroke="#BE123C"
                      strokeWidth="1.2"
                    />
                    {/* Symmetrical Lotus & Peony Medallions along Right Panel */}
                    <use href="#doiKhamLienHoaRoundel" transform="translate(145, 178) scale(0.88)" />
                    <use href="#doiKhamLienHoaRoundel" transform="translate(146, 228) scale(0.92)" />
                    <use href="#doiKhamLienHoaRoundel" transform="translate(148, 274) scale(0.82)" />
                    {/* Silk drapery shade on right panel */}
                    <path d="M 148 122 L 154 286" stroke={shader.shade} strokeWidth="1.4" opacity="0.35" strokeLinecap="round" />
                  </g>

                  {/* 6. BÂU CỔ TRỰC LĨNH ĐỐI KHÂM BẢN RỘNG & KHUY KIM HOÀN DÂY NƠ LỤA */}
                  <g id="doi-kham-truc-linh-collar-and-clasp">
                    {/* Left Straight Parallel Brocade Collar Band (Nẹp cổ trực lĩnh trái) */}
                    <path
                      d="M 102 86 L 109.5 85 L 108.5 248 L 102 248 Z"
                      fill="url(#doiKhamCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.4"
                    />
                    {/* Right Straight Parallel Brocade Collar Band (Nẹp cổ trực lĩnh phải) */}
                    <path
                      d="M 138 86 L 130.5 85 L 131.5 248 L 138 248 Z"
                      fill="url(#doiKhamCollarBrocade)"
                      stroke="url(#goldAccentShader)"
                      strokeWidth="1.4"
                    />

                    {/* Gold Filigree Vine & Gem Dots along Left & Right Parallel Collar Bands */}
                    <line x1="105.5" y1="92" x2="105" y2="242" stroke="#D97706" strokeWidth="0.9" strokeDasharray="2.5 2" />
                    <line x1="134.5" y1="92" x2="135" y2="242" stroke="#D97706" strokeWidth="0.9" strokeDasharray="2.5 2" />
                    <circle cx="105.5" cy="100" r="1.5" fill="#BE123C" />
                    <circle cx="134.5" cy="100" r="1.5" fill="#BE123C" />
                    <circle cx="105.5" cy="134" r="1.5" fill="#15803D" />
                    <circle cx="134.5" cy="134" r="1.5" fill="#15803D" />
                    <circle cx="105.2" cy="168" r="1.5" fill="#BE123C" />
                    <circle cx="134.8" cy="168" r="1.5" fill="#BE123C" />
                    <circle cx="105" cy="204" r="1.5" fill="#1D4ED8" />
                    <circle cx="135" cy="204" r="1.5" fill="#1D4ED8" />

                    {/* Royal Gold Filigree Clasps & Silk Bow Tie Across Chest (Khuy kim hoàn & Dây nơ lụa ngang ngực) */}
                    <circle cx="106" cy="114" r="2.6" fill="url(#goldAccentShader)" stroke="#781316" strokeWidth="0.8" />
                    <circle cx="134" cy="114" r="2.6" fill="url(#goldAccentShader)" stroke="#781316" strokeWidth="0.8" />
                    {/* Silk Tie Bridging Parallel Lapels */}
                    <path d="M 106 114 Q 120 118 134 114" stroke="#BE123C" strokeWidth="1.8" fill="none" />
                    <path d="M 106 114 Q 120 118 134 114" stroke="url(#goldAccentShader)" strokeWidth="0.8" strokeDasharray="2 1" fill="none" />
                    {/* Delicate Double-Loop Silk Bow at Center Chest */}
                    <path d="M 120 115.5 C 111 110, 109 120, 120 117.5" stroke="#BE123C" strokeWidth="1.5" fill="none" />
                    <path d="M 120 115.5 C 129 110, 131 120, 120 117.5" stroke="#BE123C" strokeWidth="1.5" fill="none" />
                    <path d="M 119 117 C 117 126, 115 135, 114 143" stroke="#BE123C" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                    <path d="M 121 117 C 123 126, 125 135, 126 143" stroke="#BE123C" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                    <circle cx="120" cy="116" r="2.4" fill="url(#goldAccentShader)" stroke="#781316" strokeWidth="0.7" />
                    <circle cx="114" cy="144" r="1.5" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="0.6" />
                    <circle cx="126" cy="144" r="1.5" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="0.6" />
                  </g>
                </g>
              )}
            </g>
          )}

          {/* =================================================================
              LAYER 5: FRONT HAIR & HEAD ACCESSORIES (UNIFIED FEMALE HAIRSTYLE SYSTEM)
             ================================================================= */}
          {/* Front Sculpted Hair */}
          {!hasKhanDong && (
            <g id="hair-front">
              {isFemale ? (
                <g id={`hair-female-front-${activeFemaleHair.id}`}>
                  {/* ---------------------------------------------------------
                      STYLE-SPECIFIC LOWER LOCKS (LONG / BRAID / SHORT / BUN)
                     --------------------------------------------------------- */}
                  {/* [1] TÓC DÀI: Soft outer shoulder silk locks */}
                  {activeFemaleHair.id === 'long' && (
                    <g id="front-locks-long">
                      <path
                        d="M 88 64 C 84 84, 81 112, 83 144 C 85 152, 88 154, 90 146 C 89 118, 90 90, 93 66 Z"
                        fill="url(#hairShader)"
                        opacity="0.95"
                      />
                      <path
                        d="M 152 64 C 156 84, 159 112, 157 144 C 155 152, 152 154, 150 146 C 151 118, 150 90, 147 66 Z"
                        fill="url(#hairShader)"
                        opacity="0.95"
                      />
                      <path
                        d="M 85.5 96 Q 84 118 86 138"
                        stroke="#433D4E"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.6"
                      />
                      <path
                        d="M 154.5 96 Q 156 118 154 138"
                        stroke="#433D4E"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.6"
                      />
                    </g>
                  )}

                  {/* [3] TÓC TẾT: Articulated low shoulder braids with unmistakable woven plait silhouette */}
                  {activeFemaleHair.id === 'braid' && (
                    <g id="front-locks-braid">
                      {/* Left Low Shoulder Braid (x = 78..92, y = 62..174, completely clear of collar) */}
                      <g id="braid-left">
                        {/* Plait Segment 1 */}
                        <path
                          d="M 89 62 C 81 65, 79 75, 84 82 C 88 84, 92 78, 92 70 Z"
                          fill="url(#hairShader)"
                        />
                        {/* Plait Segment 2 */}
                        <path
                          d="M 85 79 C 78 83, 77 93, 83 100 C 88 102, 92 95, 91 86 Z"
                          fill="url(#hairBackDepthShader)"
                        />
                        {/* Plait Segment 3 */}
                        <path
                          d="M 84 97 C 77 101, 76 111, 82 118 C 87 120, 91 113, 90 104 Z"
                          fill="url(#hairShader)"
                        />
                        {/* Plait Segment 4 */}
                        <path
                          d="M 83 115 C 77 119, 76 129, 82 136 C 86 138, 90 131, 89 122 Z"
                          fill="url(#hairBackDepthShader)"
                        />
                        {/* Plait Segment 5 */}
                        <path
                          d="M 82 133 C 77 137, 77 146, 82 152 C 86 153, 89 147, 88 139 Z"
                          fill="url(#hairShader)"
                        />
                        {/* Minimal dark hair tie (no flowers or bulky accessories) */}
                        <rect x="79.5" y="151" width="7.5" height="2.6" rx="1.3" fill="#2A2533" stroke="#0E0C12" strokeWidth="0.6" />
                        {/* Soft tapered braid tail */}
                        <path
                          d="M 80.5 153.5 C 78 161, 79 169, 83 175 C 85 170, 87 162, 86.5 153.5 Z"
                          fill="url(#hairShader)"
                        />
                        {/* Diagonal woven crease & silk highlights on left braid */}
                        <path
                          d="M 82 72 Q 86 77 89 81 M 81 90 Q 85 95 88 99 M 80 108 Q 84 113 87 117 M 80 126 Q 84 131 87 135 M 80 143 Q 83 147 86 150"
                          stroke="#484156"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          fill="none"
                          opacity="0.8"
                        />
                      </g>

                      {/* Right Low Shoulder Braid (x = 148..162, y = 62..174, completely clear of collar) */}
                      <g id="braid-right">
                        {/* Plait Segment 1 */}
                        <path
                          d="M 151 62 C 159 65, 161 75, 156 82 C 152 84, 148 78, 148 70 Z"
                          fill="url(#hairShader)"
                        />
                        {/* Plait Segment 2 */}
                        <path
                          d="M 155 79 C 162 83, 163 93, 157 100 C 152 102, 148 95, 149 86 Z"
                          fill="url(#hairBackDepthShader)"
                        />
                        {/* Plait Segment 3 */}
                        <path
                          d="M 156 97 C 163 101, 164 111, 158 118 C 153 120, 149 113, 150 104 Z"
                          fill="url(#hairShader)"
                        />
                        {/* Plait Segment 4 */}
                        <path
                          d="M 157 115 C 163 119, 164 129, 158 136 C 154 138, 150 131, 151 122 Z"
                          fill="url(#hairBackDepthShader)"
                        />
                        {/* Plait Segment 5 */}
                        <path
                          d="M 158 133 C 163 137, 163 146, 158 152 C 154 153, 151 147, 152 139 Z"
                          fill="url(#hairShader)"
                        />
                        {/* Minimal dark hair tie */}
                        <rect x="153" y="151" width="7.5" height="2.6" rx="1.3" fill="#2A2533" stroke="#0E0C12" strokeWidth="0.6" />
                        {/* Soft tapered braid tail */}
                        <path
                          d="M 159.5 153.5 C 162 161, 161 169, 157 175 C 155 170, 153 162, 153.5 153.5 Z"
                          fill="url(#hairShader)"
                        />
                        {/* Diagonal woven crease & silk highlights on right braid */}
                        <path
                          d="M 158 72 Q 154 77 151 81 M 159 90 Q 155 95 152 99 M 160 108 Q 156 113 153 117 M 160 126 Q 156 131 153 135 M 160 143 Q 157 147 154 150"
                          stroke="#484156"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          fill="none"
                          opacity="0.8"
                        />
                      </g>
                    </g>
                  )}

                  {/* [4] TÓC NGẮN: Sleek modern C-curl Bob side locks hugging outer jawline (chin-to-nape length) */}
                  {activeFemaleHair.id === 'short' && (
                    <g id="front-locks-short">
                      {/* Left C-curl Bob Side Lock (hugs outer cheek/jaw without distorting face, ends at y=86 above collar) */}
                      <path
                        d="M 89 44 C 85 57, 84 73, 90 84 C 94 88, 99 88, 102 84 C 96 79, 94.5 65, 95 46 Z"
                        fill="url(#hairShader)"
                      />
                      {/* Right C-curl Bob Side Lock */}
                      <path
                        d="M 151 44 C 155 57, 156 73, 150 84 C 146 88, 141 88, 138 84 C 144 79, 145.5 65, 145 46 Z"
                        fill="url(#hairShader)"
                      />
                      {/* Soft silk highlight on bob C-curls */}
                      <path
                        d="M 89 56 C 87.5 67, 88.5 77, 94 83"
                        stroke="#453E52"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.7"
                      />
                      <path
                        d="M 151 56 C 152.5 67, 151.5 77, 146 83"
                        stroke="#453E52"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.7"
                      />
                    </g>
                  )}

                  {/* ---------------------------------------------------------
                      SHARED UNIFIED CROWN, HAIRLINE, PARTING & TEMPLE WISPS
                      (Guarantees all 4 hairstyles look like the exact same female character)
                     --------------------------------------------------------- */}
                  {/* Main Crown & Soft 6:4 Curtain Parting (Airy, above eyebrows, tucked behind ears) */}
                  <path
                    d="M 89 50 C 87 31, 98 19, 116 20 C 118 20, 121 21, 123 20 C 141 19, 153 31, 151 50 C 149 44, 146 39, 140 35 C 132 31, 122 29, 116 28 C 110 30, 102 33, 96 38 C 92 41, 90 45, 89 50 Z"
                    fill="url(#hairShader)"
                  />

                  {/* Delicate Gen Z wispy side-swept temple strands (slightly longer & softer on bun/braid for elegance) */}
                  <path
                    d={
                      activeFemaleHair.id === 'bun' || activeFemaleHair.id === 'braid'
                        ? 'M 96 36 C 92.2 44, 91.5 55, 94.5 66 C 91.8 58, 90.5 48, 92 38 Z'
                        : 'M 96 36 C 93 43, 92.5 52, 94.2 61 C 92 55, 90.5 47, 92 38 Z'
                    }
                    fill="url(#hairShader)"
                  />
                  <path
                    d={
                      activeFemaleHair.id === 'bun' || activeFemaleHair.id === 'braid'
                        ? 'M 144 36 C 147.8 44, 148.5 55, 145.5 66 C 148.2 58, 149.5 48, 148 38 Z'
                        : 'M 144 36 C 147 43, 147.5 52, 145.8 61 C 148 55, 149.5 47, 148 38 Z'
                    }
                    fill="url(#hairShader)"
                  />

                  {/* Subtle airy baby-hair / curtain feathering near parting */}
                  <path
                    d="M 116 28 C 111 32, 103 35, 96 41"
                    stroke="#1C1922"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.85"
                  />
                  <path
                    d="M 116 28 C 123 31, 134 34, 144 41"
                    stroke="#1C1922"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.85"
                  />

                  {/* Natural scalp parting line (6:4 soft part) */}
                  <path
                    d="M 115.5 21.5 Q 116 25 116.5 28.5"
                    stroke={skinShader.faceMid}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.75"
                  />

                  {/* Game Character Creator Anisotropic Silk Angel-Ring Highlights */}
                  <path
                    d="M 98 30 Q 107 25.5 114 27"
                    stroke="url(#hairSilkSheen)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 119 27 Q 131 25.5 142 31"
                    stroke="url(#hairSilkSheen)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              ) : (
                /* =============================================================
                   UNIFIED MALE FRONT HAIRSTYLE SYSTEM (5 STYLES)
                   - Zero clipping with face, eyebrows, ears (cx=91,149 cy=56) or collar
                   ============================================================= */
                <g id={`hair-male-front-${activeMaleHair.id}`}>
                  {/* [1] TÓC NGẮN TRUYỀN THỐNG, GỌN GÀNG (MALE-SHORT) */}
                  {activeMaleHair.id === 'male-short' && (
                    <g id="front-male-short">
                      {/* Crisp traditional masculine short crown & natural arched hairline */}
                      <path
                        d="M 90 48 C 89 26, 101 18.5, 120 18.5 C 139 18.5, 151 26, 150 48 C 148 39, 144 33, 136 31 C 128 29, 124 30.5, 120 31.5 C 116 30.5, 112 29, 104 31 C 96 33, 92 39, 90 48 Z"
                        fill="url(#hairShader)"
                      />
                      {/* Neat tapered sideburns above ears */}
                      <path d="M 90.5 43 C 90.5 48, 91.5 52, 93 54.5 C 93.8 50, 93.5 45, 92.5 41 Z" fill="url(#hairShader)" />
                      <path d="M 149.5 43 C 149.5 48, 148.5 52, 147 54.5 C 146.2 50, 146.5 45, 147.5 41 Z" fill="url(#hairShader)" />
                      {/* Subtle short textured crown sheen */}
                      <path d="M 101 27.5 Q 120 22.5 139 27.5" stroke="url(#hairSilkSheen)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                      <path d="M 108 30.5 Q 120 28 132 30.5" stroke="#2B2633" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.7" />
                    </g>
                  )}

                  {/* [2] TÓC BÚI CAO PHONG CÁCH CỔ TRANG VIỆT NAM (MALE-BUN) */}
                  {activeMaleHair.id === 'male-bun' && (
                    <g id="front-male-bun">
                      {/* Sleek upward-pulled cổ trang hairline revealing noble forehead */}
                      <path
                        d="M 90 48 C 88.5 26, 101 19, 120 19 C 139 19, 151.5 26, 150 48 C 148 38, 143 32, 134 29.5 C 126 27.5, 122 29, 120 30 C 118 29, 114 27.5, 106 29.5 C 97 32, 92 38, 90 48 Z"
                        fill="url(#hairShader)"
                      />
                      {/* Clean temple sideburns swept upward */}
                      <path d="M 90.5 43 C 90.5 48, 91.2 52, 92.8 54 C 93.5 49.5, 93.2 44.5, 92.2 40.5 Z" fill="url(#hairShader)" />
                      <path d="M 149.5 43 C 149.5 48, 148.8 52, 147.2 54 C 146.5 49.5, 146.8 44.5, 147.8 40.5 Z" fill="url(#hairShader)" />
                      {/* Upward combed hair strand lines converging toward the topknot */}
                      <path d="M 102 29 Q 110 22 117 19.5" stroke="#3E374B" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />
                      <path d="M 112 28.5 Q 116 22 119.5 19.5" stroke="#3E374B" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />
                      <path d="M 128 28.5 Q 124 22 120.5 19.5" stroke="#3E374B" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />
                      <path d="M 138 29 Q 130 22 123 19.5" stroke="#3E374B" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />
                      <path d="M 103 26.5 Q 120 22 137 26.5" stroke="url(#hairSilkSheen)" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </g>
                  )}

                  {/* [3] TÓC DÀI BUỘC SAU (MALE-PONYTAIL) */}
                  {activeMaleHair.id === 'male-ponytail' && (
                    <g id="front-male-ponytail">
                      {/* Swept-back center-parted crown */}
                      <path
                        d="M 89.5 48 C 88 25, 100 18.5, 120 19 C 140 18.5, 152 25, 150.5 48 C 148 38, 142 32, 132 29.5 C 125 28, 121.5 29, 120 30.5 C 118.5 29, 115 28, 108 29.5 C 98 32, 92 38, 89.5 48 Z"
                        fill="url(#hairShader)"
                      />
                      {/* Refined face-framing temple locks (Tóc mai lãng tử gọn gàng trên tai, không chắn mắt/mặt) */}
                      <path
                        d="M 95 32.5 C 91.5 39, 90.5 47, 92 56.5 C 90 50, 89.5 42, 91.5 34.5 Z"
                        fill="url(#hairShader)"
                      />
                      <path
                        d="M 145 32.5 C 148.5 39, 149.5 47, 148 56.5 C 150 50, 150.5 42, 148.5 34.5 Z"
                        fill="url(#hairShader)"
                      />
                      {/* Center scalp parting crease & silk sheen */}
                      <path d="M 120 19.5 L 120 29.5" stroke={skinShader.faceMid} strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
                      <path d="M 99 28 Q 110 23.5 118 25.5" stroke="url(#hairSilkSheen)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                      <path d="M 122 25.5 Q 130 23.5 141 28" stroke="url(#hairSilkSheen)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    </g>
                  )}

                  {/* [4] TÓC RẼ NGÔI CỔ ĐIỂN (MALE-PARTED) */}
                  {activeMaleHair.id === 'male-parted' && (
                    <g id="front-male-parted">
                      {/* Classic 7/3 side-parted crown volume (sweeping gracefully without touching eyebrows) */}
                      <path
                        d="M 89.5 48 C 88 24, 100 18.5, 108 19.5 C 112 18.5, 139 17.5, 150.5 48 C 147.5 38, 139 33, 128 31.5 C 118 30, 112 28.5, 108.5 27 C 104 31, 96 36, 89.5 48 Z"
                        fill="url(#hairShader)"
                      />
                      {/* Neat tapered classic sideburns */}
                      <path d="M 90.5 43 C 90.5 48, 91.5 52.5, 93 55 C 93.8 50.5, 93.5 45, 92.5 41 Z" fill="url(#hairShader)" />
                      <path d="M 149.5 43 C 149.5 48, 148.5 52.5, 147 55 C 146.2 50.5, 146.5 45, 147.5 41 Z" fill="url(#hairShader)" />
                      {/* 7/3 Scalp parting line */}
                      <path d="M 107.8 20 Q 108.2 23.8 108.6 27.5" stroke={skinShader.faceMid} strokeWidth="1.2" strokeLinecap="round" opacity="0.78" />
                      {/* Swept wave texture & silk highlight */}
                      <path d="M 109 27 C 118 29, 131 31, 143 37" stroke="#231F2B" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8" />
                      <path d="M 96 29 Q 102 25.5 106.5 26" stroke="url(#hairSilkSheen)" strokeWidth="2" strokeLinecap="round" fill="none" />
                      <path d="M 112 25.5 Q 127 23 141 29.5" stroke="url(#hairSilkSheen)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                    </g>
                  )}

                  {/* [5] TÓC BUỘC NỬA ĐẦU (MALE-HALF-UP) */}
                  {activeMaleHair.id === 'male-half-up' && (
                    <g id="front-male-half-up">
                      {/* Soft scholar curtain-parted crown swept into half-up knot */}
                      <path
                        d="M 89 49 C 87.5 25, 99 18.5, 117 19.5 C 119 19.5, 121 19.5, 123 19.5 C 141 18.5, 152.5 25, 151 49 C 148.5 40, 143 34, 134 30.5 C 127 28, 122 27.5, 118.5 27 C 113 28.5, 104 31.5, 97 36 C 93 39, 90.5 43.5, 89 49 Z"
                        fill="url(#hairShader)"
                      />
                      {/* Soft temple strands framing outer upper face and tucking behind ears */}
                      <path
                        d="M 95.5 34 C 91.8 41, 91 50, 93 59 C 90.5 52, 89.8 43, 92 35.5 Z"
                        fill="url(#hairShader)"
                      />
                      <path
                        d="M 144.5 34 C 148.2 41, 149 50, 147 59 C 149.5 52, 150.2 43, 148 35.5 Z"
                        fill="url(#hairShader)"
                      />
                      {/* Natural parting & silk sheen */}
                      <path d="M 118.2 20 Q 118.5 23.5 118.8 27" stroke={skinShader.faceMid} strokeWidth="1.15" strokeLinecap="round" opacity="0.75" />
                      <path d="M 98 28.5 Q 108 24 116 25.5" stroke="url(#hairSilkSheen)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                      <path d="M 121 25.5 Q 132 24 142 29" stroke="url(#hairSilkSheen)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    </g>
                  )}
                </g>
              )}
            </g>
          )}

          {/* ACCESSORY: KHĂN ĐÓNG / KHĂN VÀNH CUNG ĐÌNH (TRADITIONAL HEAD TURBAN) */}
          {hasKhanDong && (
            <g id="acc-khan-dong" className="animate-acc-head">
              {outfitId === 'ao-nhat-binh' ? (
                /* Khăn Vành / Mấn Phượng Cung Đình Huế khi mặc Áo Nhật Bình */
                <g id="acc-khan-vanh-cung-dinh">
                  <ellipse cx="120" cy="34" rx="33" ry="15" fill="#380B12" stroke="url(#goldAccentShader)" strokeWidth="1.5" />
                  <path d="M 88 35 C 90 17, 150 17, 152 35 C 149 43, 91 43, 88 35 Z" fill="#5E1B24" stroke="url(#goldAccentShader)" strokeWidth="1" />
                  {/* Pleated royal rings (Nếp xếp chữ Nhất cung đình) */}
                  <path d="M 90 31 Q 120 21 150 31" stroke="url(#goldAccentShader)" strokeWidth="1.5" fill="none" />
                  <path d="M 92 35 Q 120 26 148 35" stroke="#F5D587" strokeWidth="1.1" fill="none" opacity="0.85" />
                  <path d="M 95 39 Q 120 31 145 39" stroke="#380B12" strokeWidth="1.3" fill="none" />
                  {/* Central Royal Phoenix Hairpin Crest (Bác Sơn / Trâm Phượng Kim Hoàn) */}
                  <circle cx="120" cy="27" r="3.8" fill="url(#goldAccentShader)" stroke="#991B1E" strokeWidth="0.8" />
                  <circle cx="120" cy="27" r="1.5" fill="#BE123C" />
                  <path d="M 112 28 Q 116 23 120 25 Q 124 23 128 28" stroke="url(#goldAccentShader)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                </g>
              ) : (
                /* Traditional Khăn Đóng */
                <g>
                  <ellipse cx="120" cy="36" rx="30" ry="14" fill="#1E1B18" stroke="#D4AF37" strokeWidth="1" />
                  <path d="M 90 36 C 92 20, 148 20, 150 36 C 148 44, 92 44, 90 36 Z" fill="#2A2420" />
                  <path d="M 92 32 Q 120 24 148 32" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
                  <path d="M 94 38 Q 120 30 146 38" stroke="#14110F" strokeWidth="1.5" fill="none" />
                </g>
              )}
            </g>
          )}

          {/* ACCESSORY: KIỀNG BẠC (SILVER TORQUE COLLAR) */}
          {hasKiengBac && (
            <g id="acc-kieng-bac" className="animate-acc-neck">
              <path
                d="M 110 93 C 108 106, 132 106, 130 93"
                stroke="url(#silverKiengShader)"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="120" cy="103" r="2" fill="#FFFFFF" />
            </g>
          )}

          {/* ACCESSORY: CHUỖI NGỌC TRAI (PEARL STRAND) */}
          {hasNgocTrai && (
            <g id="acc-chuoi-ngoc-trai" className="animate-acc-neck">
              <path d="M 108 92 C 104 122, 136 122, 132 92" stroke="#E2D4C3" strokeWidth="1" strokeDasharray="1 3" fill="none" />
              <circle cx="108" cy="95" r="1.8" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
              <circle cx="111" cy="102" r="1.9" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
              <circle cx="115" cy="110" r="2.1" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
              <circle cx="120" cy="114" r="2.3" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
              <circle cx="125" cy="110" r="2.1" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
              <circle cx="129" cy="102" r="1.9" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
              <circle cx="132" cy="95" r="1.8" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
            </g>
          )}

          {/* ACCESSORY: NÓN QUAI THAO (WORN DIRECTLY ON HEAD - AUTHENTIC PROPORTIONS & LAYER FIT) */}
          {hasNonQuaiThao && (() => {
            const hatY = isFemale ? 26.5 : 24.5;
            return (
              <g id="acc-non-quai-thao" className="animate-acc-head">
                {/* 1. SOFT SHADOW CAST BY NÓN QUAI THAO ON FOREHEAD & HAIR */}
                <ellipse
                  cx="120"
                  cy={hatY + 18.5}
                  rx="44"
                  ry="7.5"
                  fill="rgba(28, 25, 23, 0.28)"
                />
                <ellipse
                  cx="120"
                  cy={hatY + 24}
                  rx="32"
                  ry="5"
                  fill="rgba(28, 25, 23, 0.16)"
                />

                {/* 2. DẢI QUAI THAO LỤA THAO PHÍA SAU TAI (UPPER STRAP ATTACHMENT) */}
                {/* Left upper anchor */}
                <path
                  d={`M 81 ${hatY + 4} Q 74 ${hatY + 22} 76 ${hatY + 44}`}
                  stroke="#7F1D1D"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d={`M 81 ${hatY + 4} Q 74 ${hatY + 22} 76 ${hatY + 44}`}
                  stroke="url(#quaiThaoSilkShader)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Right upper anchor */}
                <path
                  d={`M 159 ${hatY + 4} Q 166 ${hatY + 22} 164 ${hatY + 44}`}
                  stroke="#7F1D1D"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d={`M 159 ${hatY + 4} Q 166 ${hatY + 22} 164 ${hatY + 44}`}
                  stroke="url(#quaiThaoSilkShader)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* 3. VÀNH NÓN BA TẦM (MAIN WOVEN PALM LEAF FLAT CIRCULAR BRIM) */}
                {/* Outer Bamboo Rim Shadow */}
                <ellipse
                  cx="120"
                  cy={hatY + 1}
                  rx="62"
                  ry="17.5"
                  fill="rgba(28, 25, 23, 0.14)"
                />
                {/* Woven Palm Leaf Disc Surface */}
                <ellipse
                  cx="120"
                  cy={hatY}
                  rx="62"
                  ry="17.5"
                  fill="url(#nonBrimShader)"
                  stroke="#9E805B"
                  strokeWidth="1.6"
                />

                {/* Concentric Bamboo Stitching Rings (Các đường khâu nan tre truyền thống) */}
                <ellipse
                  cx="120"
                  cy={hatY}
                  rx="54"
                  ry="15.2"
                  fill="none"
                  stroke="#C6B08E"
                  strokeWidth="1"
                  strokeDasharray="4.5 2.2"
                />
                <ellipse
                  cx="120"
                  cy={hatY}
                  rx="45"
                  ry="12.6"
                  fill="none"
                  stroke="#B89F7B"
                  strokeWidth="0.9"
                  strokeDasharray="3.5 2"
                />
                <ellipse
                  cx="120"
                  cy={hatY}
                  rx="35"
                  ry="9.8"
                  fill="none"
                  stroke="#AA9370"
                  strokeWidth="0.85"
                  strokeDasharray="3 1.8"
                />
                <ellipse
                  cx="120"
                  cy={hatY}
                  rx="26"
                  ry="7.2"
                  fill="none"
                  stroke="#A08864"
                  strokeWidth="0.75"
                  strokeDasharray="2.5 1.5"
                />

                {/* Radial Fine Bamboo Ribs (16 nan tre tỏa đều từ tâm) */}
                <g stroke="#D1BE9E" strokeWidth="0.65" opacity="0.8">
                  <line x1="120" y1={hatY - 7} x2="120" y2={hatY - 17.5} />
                  <line x1="120" y1={hatY + 7} x2="120" y2={hatY + 17.5} />
                  <line x1="145" y1={hatY} x2="182" y2={hatY} />
                  <line x1="95" y1={hatY} x2="58" y2={hatY} />
                  <line x1="138" y1={hatY - 4.5} x2="164" y2={hatY - 12.5} />
                  <line x1="102" y1={hatY - 4.5} x2="76" y2={hatY - 12.5} />
                  <line x1="138" y1={hatY + 4.5} x2="164" y2={hatY + 12.5} />
                  <line x1="102" y1={hatY + 4.5} x2="76" y2={hatY + 12.5} />
                  <line x1="130" y1={hatY - 6} x2="145" y2={hatY - 15.5} />
                  <line x1="110" y1={hatY - 6} x2="95" y2={hatY - 15.5} />
                  <line x1="130" y1={hatY + 6} x2="145" y2={hatY + 15.5} />
                  <line x1="110" y1={hatY + 6} x2="95" y2={hatY + 15.5} />
                </g>

                {/* 4. KHÙA NÓN TRUNG TÂM (RAISED SHALLOW WOVEN CENTER DOME) */}
                <ellipse
                  cx="120"
                  cy={hatY - 2.8}
                  rx="24"
                  ry="7.2"
                  fill="url(#nonDomeShader)"
                  stroke="#9E805B"
                  strokeWidth="1.2"
                />
                <ellipse
                  cx="120"
                  cy={hatY - 4.2}
                  rx="15"
                  ry="4.5"
                  fill="#D7C099"
                  stroke="#8B6E4B"
                  strokeWidth="0.8"
                />

                {/* Central Red Silk Knot Button & Gold Accent (Đinh nón chóp chỉ đỏ) */}
                <circle
                  cx="120"
                  cy={hatY - 5.8}
                  r="2.8"
                  fill="#991B1E"
                  stroke="#5E1B24"
                  strokeWidth="0.7"
                />
                <circle cx="120" cy={hatY - 5.8} r="1.1" fill="#FEF08A" />

                {/* 5. DẢI QUAI THAO LỤA DÀI RỦ TRƯỚC NGỰC & TÀ ÁO (FLOWING SILK RIBBONS & TASSELS) */}
                {/* Left Cascading Silk Ribbon */}
                <g id="quai-thao-ribbon-left">
                  {/* Silk Ribbon Body (Dải lụa mềm mại rủ dọc ngực) */}
                  <path
                    d="M 76 70 C 72 95, 68 130, 77 172 L 83 172 C 75 130, 78 95, 81 70 Z"
                    fill="url(#quaiThaoSilkShader)"
                    stroke="#7F1D1D"
                    strokeWidth="0.7"
                  />
                  {/* Silk fold specular sheen */}
                  <path
                    d="M 78 72 C 74 96, 71 130, 79 170"
                    stroke="#EF4444"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.8"
                  />
                  {/* Golden Sphere Bead (Quả nhạc mạ vàng) */}
                  <circle
                    cx="80"
                    cy="174"
                    r="2.5"
                    fill="url(#quaiThaoGoldBead)"
                    stroke="#854D0E"
                    strokeWidth="0.6"
                  />
                  {/* Red Silk Tassel Fringe (Chùm tua rua tơ thao đỏ) */}
                  <path
                    d="M 77 176 L 76 195 M 78.5 176 L 78 197 M 80 176 L 80 198 M 81.5 176 L 82 197 M 83 176 L 84 195"
                    stroke="#991B1E"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 79 176 L 79.5 196"
                    stroke="#BE123C"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                </g>

                {/* Right Cascading Silk Ribbon */}
                <g id="quai-thao-ribbon-right">
                  {/* Silk Ribbon Body (Dải lụa mềm mại rủ dọc ngực phải) */}
                  <path
                    d="M 164 70 C 168 95, 172 130, 163 172 L 157 172 C 165 130, 162 95, 159 70 Z"
                    fill="url(#quaiThaoSilkShader)"
                    stroke="#7F1D1D"
                    strokeWidth="0.7"
                  />
                  {/* Silk fold specular sheen */}
                  <path
                    d="M 162 72 C 166 96, 169 130, 161 170"
                    stroke="#EF4444"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.8"
                  />
                  {/* Golden Sphere Bead (Quả nhạc mạ vàng) */}
                  <circle
                    cx="160"
                    cy="174"
                    r="2.5"
                    fill="url(#quaiThaoGoldBead)"
                    stroke="#854D0E"
                    strokeWidth="0.6"
                  />
                  {/* Red Silk Tassel Fringe (Chùm tua rua tơ thao đỏ) */}
                  <path
                    d="M 157 176 L 156 195 M 158.5 176 L 158 197 M 160 176 L 160 198 M 161.5 176 L 162 197 M 163 176 L 164 195"
                    stroke="#991B1E"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 161 176 L 160.5 196"
                    stroke="#BE123C"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            );
          })()}

          {/* ACCESSORY: Ô TRUYỀN THỐNG VIỆT NAM (OILED SILK / BAMBOO UMBRELLA) */}
          {holdingUmbrella && (
            <g id="acc-o-truyen-thong" className="animate-acc-hand">
              {/* 1. Tán Ô (Canopy Sheltered Above Head, tilted naturally 16 degrees) */}
              <g transform="translate(136, 26) rotate(16)">
                {/* Soft ambient under-canopy shadow */}
                <ellipse cx="0" cy="18" rx="58" ry="14" fill="rgba(28, 25, 23, 0.2)" />

                {/* Classical Oiled Silk / Bamboo Dome */}
                <path
                  d="M -64 18 C -64 -6, 64 -6, 64 18 C 50 21, 38 18, 26 21 C 14 18, 0 21, -12 18 C -24 21, -36 18, -48 21 C -56 18, -64 18, -64 18 Z"
                  fill="url(#umbrellaCanopyShader)"
                  stroke="#5E1B24"
                  strokeWidth="1.5"
                />

                {/* Translucent silk sheen */}
                <path
                  d="M -60 16 C -60 -3, 60 -3, 60 16 Z"
                  fill="#FFFFFF"
                  opacity="0.12"
                />

                {/* 16 Radiating Golden Bamboo Ribs (Nan tre vàng óng) */}
                <path d="M 0 -6 L -58 19" stroke="#EAB308" strokeWidth="1.1" opacity="0.9" />
                <path d="M 0 -6 L -42 20" stroke="#EAB308" strokeWidth="1.1" opacity="0.9" />
                <path d="M 0 -6 L -26 21" stroke="#EAB308" strokeWidth="1.1" opacity="0.9" />
                <path d="M 0 -6 L -10 21" stroke="#EAB308" strokeWidth="1.1" opacity="0.9" />
                <path d="M 0 -6 L 6 21" stroke="#EAB308" strokeWidth="1.1" opacity="0.9" />
                <path d="M 0 -6 L 22 21" stroke="#EAB308" strokeWidth="1.1" opacity="0.9" />
                <path d="M 0 -6 L 38 20" stroke="#EAB308" strokeWidth="1.1" opacity="0.9" />
                <path d="M 0 -6 L 54 19" stroke="#EAB308" strokeWidth="1.1" opacity="0.9" />

                {/* Scalloped Golden Silk Edge Piping (Viền lụa lượn sóng) */}
                <path
                  d="M -64 18 C -56 21, -48 18, -36 21 C -24 18, -12 21, 0 18 C 14 21, 26 18, 38 21 C 50 18, 64 18, 64 18"
                  stroke="url(#goldAccentShader)"
                  strokeWidth="1.4"
                  fill="none"
                />

                {/* Carved Top Wooden Ferrule & Brass Cap (Chóp ô) */}
                <polygon points="-3,-6 0,-14 3,-6" fill="#3D2617" stroke="url(#goldAccentShader)" strokeWidth="0.9" />
                <circle cx="0" cy="-6" r="2.8" fill="url(#goldAccentShader)" stroke="#991B1E" strokeWidth="0.8" />
              </g>

              {/* 2. Slender Polished Bamboo Shaft (Cán trúc thẳng thanh mảnh xuyên qua tay) */}
              {/* Upper shaft connecting canopy to hand */}
              <line
                x1="136"
                y1="26"
                x2={isFemale ? "154" : "163"}
                y2={isFemale ? "114" : "110"}
                stroke="url(#umbrellaBambooShaftShader)"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <line
                x1="137"
                y1="26"
                x2={isFemale ? "155" : "164"}
                y2={isFemale ? "114" : "110"}
                stroke="#D4AF37"
                strokeWidth="0.8"
                opacity="0.8"
              />

              {/* Lower shaft extending below hand down to handle */}
              <line
                x1={isFemale ? "154" : "163"}
                y1={isFemale ? "114" : "110"}
                x2={isFemale ? "166" : "175"}
                y2={isFemale ? "168" : "165"}
                stroke="url(#umbrellaBambooShaftShader)"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <line
                x1={isFemale ? "155" : "164"}
                y1={isFemale ? "114" : "110"}
                x2={isFemale ? "167" : "176"}
                y2={isFemale ? "168" : "165"}
                stroke="#D4AF37"
                strokeWidth="0.8"
                opacity="0.8"
              />

              {/* Brass collar spacers */}
              <circle cx={isFemale ? "145" : "150"} cy="70" r="2" fill="url(#goldAccentShader)" />
              <circle cx={isFemale ? "160" : "169"} cy="140" r="2" fill="url(#goldAccentShader)" />

              {/* 3. Curved Bamboo Root Handle (Tay cầm cong mộc mạc) */}
              <path
                d={
                  isFemale
                    ? "M 166 168 C 168 174, 166 179, 160 180 C 156 181, 153 177, 155 174"
                    : "M 175 165 C 177 171, 175 176, 169 177 C 165 178, 162 174, 164 171"
                }
                stroke="url(#umbrellaBambooShaftShader)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />

              {/* 4. Crimson Silk Tassel (Tua rua lụa đỏ son truyền thống) */}
              <g transform={`translate(${isFemale ? 155 : 164}, ${isFemale ? 175 : 172})`}>
                <circle cx="0" cy="2" r="2.2" fill="url(#goldAccentShader)" stroke="#991B1E" strokeWidth="0.6" />
                <rect x="-2" y="4" width="4" height="4.5" rx="1.2" fill="#991B1E" stroke="#5E1B24" strokeWidth="0.6" />
                <path d="M 0 8.5 L -2 28 M 0 8.5 L 0 30 M 0 8.5 L 2 28 M -1 8.5 L -1 29 M 1 8.5 L 1 29" stroke="#BE123C" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 0 8.5 L 3 26" stroke="#991B1E" strokeWidth="0.8" strokeLinecap="round" />
              </g>
            </g>
          )}

          {/* =================================================================
              LAYER 6: FOOTWEAR
             ================================================================= */}
          <g id="footwear">
            {hasSneakers ? (
              /* MODERN RETRO SNEAKERS */
              <g id="acc-sneakers" className="animate-acc-foot">
                <path d="M 88 326 L 115 326 L 116 339 C 108 342, 88 342, 84 338 Z" fill="#FFFFFF" stroke="#D1C3B0" strokeWidth="1" />
                <path d="M 86 335 L 116 335" stroke="#991B1E" strokeWidth="2" />
                <path d="M 125 326 L 152 326 L 156 338 C 152 342, 132 342, 124 339 Z" fill="#FFFFFF" stroke="#D1C3B0" strokeWidth="1" />
                <path d="M 124 335 L 154 335" stroke="#991B1E" strokeWidth="2" />
              </g>
            ) : hasSandal ? (
              /* SANDAL QUAI MẢNH / GUỐC */
              <g id="acc-sandal" className="animate-acc-foot">
                <path d="M 94 328 L 114 328 L 115 338 C 108 341, 96 341, 92 338 Z" fill="#C8973E" />
                <line x1="96" y1="332" x2="112" y2="332" stroke="#5E1B24" strokeWidth="1.5" />
                <path d="M 126 328 L 146 328 L 148 338 C 144 341, 132 341, 124 338 Z" fill="#C8973E" />
                <line x1="128" y1="332" x2="144" y2="332" stroke="#5E1B24" strokeWidth="1.5" />
              </g>
            ) : isFemale ? (
              /* DEFAULT CLASSIC SHOES */
              <g id="female-default-heels">
                <path d="M 95 326 L 113 326 L 115 339 C 109 342, 97 342, 93 338 Z" fill="#FAF8F5" stroke="#D0C4B2" strokeWidth="1" />
                <path d="M 127 326 L 145 326 L 147 338 C 143 342, 131 342, 125 339 Z" fill="#FAF8F5" stroke="#D0C4B2" strokeWidth="1" />
              </g>
            ) : (
              <g id="male-default-shoes">
                <path d="M 88 325 L 114 325 L 115 339 C 106 343, 89 343, 85 338 Z" fill="#181512" />
                <path d="M 126 325 L 152 325 L 155 338 C 151 343, 134 343, 125 339 Z" fill="#181512" />
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Floating Status Tag Under Canvas */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2 bg-[#FFFDF9]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E0D3C1] shadow-xs text-xs">
        <span className="w-2 h-2 rounded-full bg-[#166534] animate-pulse" />
        <span className="font-semibold text-[#1C1917]">
          {isFemale ? 'Người mẫu Nữ' : 'Người mẫu Nam'}
        </span>
        <span className="text-[#8A7968]">·</span>
        <span className="text-[#45362E] font-medium">
          {isFemale ? activeFemaleHair.name : activeMaleHair.name}
        </span>
        <span className="text-[#8A7968]">·</span>
        <span className="text-[#991B1E] font-medium">
          {outfitId === 'ao-dai'
            ? colorId === 'black'
              ? 'Áo Dài Đen (Nho nhã)'
              : colorId === 'cream'
              ? 'Áo Dài Trắng (Tinh khôi)'
              : 'Áo Dài Truyền Thống'
            : outfitId === 'ao-nhat-binh'
            ? 'Áo Nhật Bình Cung Đình'
            : outfitId === 'ao-tu-than'
            ? 'Áo Tứ Thân Kinh Bắc'
            : outfitId === 'ao-ngu-than'
            ? 'Áo Ngũ Thân Lập Lĩnh'
            : outfitId === 'ao-ba-ba'
            ? 'Áo Bà Ba Nam Bộ'
            : outfitId === 'ao-tac'
            ? 'Áo Tấc Đại Lễ'
            : outfitId === 'ao-tay-chen'
            ? 'Áo Ngũ Thân Tay Chẽn'
            : outfitId === 'giao-linh'
            ? 'Áo Giao Lĩnh Cổ Chéo'
            : outfitId === 'vien-linh'
            ? 'Áo Viên Lĩnh Cổ Tròn'
            : outfitId === 'doi-kham'
            ? 'Áo Đối Khâm Đa Lớp'
            : outfitId}
        </span>
        {accessories.length > 0 && (
          <>
            <span className="text-[#8A7968]">·</span>
            <span className="text-[#594C42]">{accessories.length} phụ kiện</span>
          </>
        )}
      </div>
    </div>
  );
};
