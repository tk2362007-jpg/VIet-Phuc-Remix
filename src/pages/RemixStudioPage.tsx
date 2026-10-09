import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Check,
  Sparkles,
  RotateCcw,
  Heart,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  User,
  ShieldCheck,
  Palette,
  Eye,
  AlertCircle,
  X,
  Layers,
  GraduationCap,
  HeartHandshake,
  Camera,
  Coffee,
  Landmark,
  Compass,
  Sun,
  SlidersHorizontal,
  Wand2,
  Info,
  Lock,
  Scissors,
  Download,
  Share2,
  Calendar as CalendarIcon,
  MapPin,
  CloudSun,
  CloudRain,
  Droplets,
  Wind,
  Briefcase,
  Plane,
  Sparkle,
  Flower2,
  Sliders
} from 'lucide-react';
import {
  OutfitLookState,
  OutfitId,
  OccasionId,
  StyleId,
  ColorId,
  SkinToneId,
  HairstyleId,
  HairstyleOption,
  SavedLook,
  CultureCheckData
} from '../types';
import { OUTFITS_DATA } from '../data/outfits';
import aoDaiNamImg from '../assets/images/ao_dai_nam_1791198228388.jpg';
import { OCCASIONS_DATA } from '../data/occasions';
import { STYLES_DATA } from '../data/styles';
import {
  FEMALE_HAIRSTYLES,
  DEFAULT_FEMALE_HAIRSTYLE,
  getFemaleHairstyleById,
  MALE_HAIRSTYLES,
  DEFAULT_MALE_HAIRSTYLE,
  getMaleHairstyleById
} from '../data/hairstyles.js';
import {
  COLORS_DATA,
  SKIN_TONES_DATA,
  evaluateColorHarmony,
  COLOR_HARMONY_PRESETS,
  ColorHarmonyPreset
} from '../data/colors';
import { evaluateCultureCheck } from '../data/cultureNotes';
import {
  ACCESSORIES_DATA,
  getOutfitAccessoryRecommendation,
  getSuggestedAccessoriesForOutfit
} from '../data/accessories';
import { CulturalInsightPopover } from '../components/CulturalInsightPopover';
import { CultureCheckCard } from '../components/CultureCheckCard';
import { Stylized3DCharacter, CharacterGender } from '../components/Stylized3DCharacter';
import { CharacterDefaultAvatar } from '../components/CharacterDefaultAvatar';
import { SocialShareCardModal } from '../components/SocialShareCardModal';
import {
  VIETNAM_LOCATIONS,
  TIME_OF_DAY_OPTIONS,
  TimeOfDayId,
  formatVietnameseDate,
  getWeatherForecast,
  WeatherInfo
} from '../services/weatherService';
import { generatePersonalizedInitialLook } from '../services/aiSuggestion';

export interface AiStyleSuggestionResult {
  suggestedColorId: ColorId;
  suggestedColorName: string;
  colorRationale: string;
  suggestedAccessories: string[];
  accessoriesRationale: string;
  overallAdvice: string;
  weatherAdaptationTip: string;
  culturalScore: number;
  sourceType?: string;
}

interface RemixStudioPageProps {
  currentLook: OutfitLookState;
  onChangeLook: (look: OutfitLookState) => void;
  onCreateLook: () => void;
  onSaveLook?: (look: SavedLook) => void;
  isAlreadySaved?: boolean;
  preparationContext?: {
    dateString?: string;
    locationName?: string;
    weather?: {
      temp: number;
      condition: string;
      humidity: number;
      clothingAdvice: string;
      rainProbability?: number;
      conditionCode?: string;
    };
    timeOfDay?: string;
  } | null;
  onReopenPreparation?: () => void;
}

export interface StudioOutfitItem {
  id: OutfitId;
  name: string;
  shortLabel: string;
  vietnameseName: string;
  era: string;
  gender: 'female' | 'male';
  image: string;
  maleImage?: string;
  desc: string;
  highlightTag: string;
  occasions: OccasionId[];
  styles: StyleId[];
  availableColors: ColorId[];
  defaultColor: ColorId;
}

interface StudioAccessoryItem {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  iconType:
    | 'khan-dong'
    | 'kieng-bac'
    | 'non-quai-thao'
    | 'ngoc-trai'
    | 'sandal'
    | 'sneakers'
    | 'umbrella';
}

// 10 Full Historical and Traditional Garments from Data
const ALL_STUDIO_OUTFITS: StudioOutfitItem[] = [
  {
    id: 'ao-dai',
    name: 'Áo dài',
    shortLabel: 'Áo dài',
    vietnameseName: 'Áo Dài Truyền Thống & Cách Tân',
    era: 'Thế kỷ 18 đến nay',
    gender: 'female',
    image: OUTFITS_DATA[0].image,
    maleImage: aoDaiNamImg,
    desc: 'Cổ cao, hai tà buông tha thướt qua gối',
    highlightTag: 'Quốc phục thanh lịch',
    occasions: ['school', 'festival', 'photoshoot', 'wedding', 'cultural-event', 'casual'],
    styles: ['modern', 'elegant', 'minimal', 'romantic', 'traditional'],
    availableColors: ['cream', 'red', 'pastel', 'blue', 'yellow', 'burgundy', 'green', 'black'],
    defaultColor: 'cream'
  },
  {
    id: 'ao-tu-than',
    name: 'Áo tứ thân',
    shortLabel: 'Tứ thân',
    vietnameseName: 'Áo Tứ Thân Kinh Bắc',
    era: 'Thế kỷ 12 - 20 (Miền Bắc)',
    gender: 'female',
    image: OUTFITS_DATA[1].image,
    desc: '4 vạt mở buộc eo, lộ yếm lụa đào duyên dáng',
    highlightTag: 'Kinh Bắc duyên dáng',
    occasions: ['festival', 'photoshoot', 'cultural-event'],
    styles: ['traditional', 'romantic', 'modern', 'street'],
    availableColors: ['burgundy', 'yellow', 'red', 'green', 'pastel', 'cream'],
    defaultColor: 'burgundy'
  },
  {
    id: 'ao-ngu-than',
    name: 'Áo ngũ thân',
    shortLabel: 'Ngũ thân',
    vietnameseName: 'Áo Ngũ Thân Lập Lĩnh',
    era: 'Thời Nguyễn (Thế kỷ 18–20)',
    gender: 'male',
    image: OUTFITS_DATA[2].image,
    desc: '5 thân lập lĩnh, vạt cài 5 cúc đồng ngũ thường',
    highlightTag: 'Đạo lý ngũ thường',
    occasions: ['wedding', 'cultural-event', 'photoshoot', 'festival'],
    styles: ['traditional', 'elegant', 'modern', 'minimal'],
    availableColors: ['black', 'blue', 'burgundy', 'cream', 'green', 'yellow', 'red'],
    defaultColor: 'black'
  },
  {
    id: 'ao-ba-ba',
    name: 'Áo bà ba',
    shortLabel: 'Bà ba',
    vietnameseName: 'Áo Bà Ba Nam Bộ',
    era: 'Thế kỷ 19 (Nam Bộ)',
    gender: 'female',
    image: OUTFITS_DATA[3].image,
    desc: 'Cổ tròn xẻ tà hai bên hông, túi đắp tiện dụng',
    highlightTag: 'Nam Bộ phóng khoáng',
    occasions: ['casual', 'school', 'photoshoot', 'festival'],
    styles: ['minimal', 'modern', 'street', 'romantic', 'traditional'],
    availableColors: ['pastel', 'cream', 'yellow', 'blue', 'green', 'red', 'black'],
    defaultColor: 'pastel'
  },
  {
    id: 'ao-nhat-binh',
    name: 'Áo Nhật Bình',
    shortLabel: 'Nhật Bình',
    vietnameseName: 'Áo Nhật Bình Cung Đình Triều Nguyễn',
    era: 'Triều Nguyễn (1802–1945)',
    gender: 'female',
    image: OUTFITS_DATA[4]?.image || OUTFITS_DATA[0].image,
    desc: 'Cổ chữ nhật thêu chỉ kim tuyến, dải ngũ sắc cổ tay',
    highlightTag: 'Cung đình quý phái',
    occasions: ['wedding', 'cultural-event', 'photoshoot', 'festival'],
    styles: ['elegant', 'traditional', 'romantic'],
    availableColors: ['red', 'yellow', 'burgundy', 'blue', 'green', 'pastel', 'cream'],
    defaultColor: 'red'
  },
  {
    id: 'ao-tac',
    name: 'Áo Tấc',
    shortLabel: 'Áo Tấc',
    vietnameseName: 'Áo Tấc Ngũ Thân Tay Thụng',
    era: 'Thời Nguyễn (Đại lễ phục)',
    gender: 'male',
    image: OUTFITS_DATA[5]?.image || OUTFITS_DATA[2].image,
    desc: 'Đôi tay thụng dài rộng bề thế, mặc cùng quần trắng',
    highlightTag: 'Tay thụng đại lễ',
    occasions: ['wedding', 'cultural-event', 'festival'],
    styles: ['traditional', 'elegant', 'minimal'],
    availableColors: ['blue', 'red', 'burgundy', 'yellow', 'black', 'green', 'cream'],
    defaultColor: 'blue'
  },
  {
    id: 'ao-tay-chen',
    name: 'Áo Tay Chẽn',
    shortLabel: 'Tay Chẽn',
    vietnameseName: 'Áo Ngũ Thân Tay Chẽn',
    era: 'Thời Nguyễn (Thế kỷ 18–19)',
    gender: 'male',
    image: OUTFITS_DATA[6]?.image || OUTFITS_DATA[2].image,
    desc: 'Tay ôm gọn gàng, phom suông lịch thiệp nho nhã',
    highlightTag: 'Nho nhã & Tân thời',
    occasions: ['school', 'cultural-event', 'casual', 'photoshoot'],
    styles: ['modern', 'minimal', 'traditional', 'street'],
    availableColors: ['black', 'cream', 'blue', 'burgundy', 'green', 'yellow'],
    defaultColor: 'black'
  },
  {
    id: 'giao-linh',
    name: 'Áo Giao Lĩnh',
    shortLabel: 'Giao Lĩnh',
    vietnameseName: 'Áo Giao Lĩnh Cổ Chéo Thời Lý - Trần - Lê',
    era: 'Thế kỷ 11–18 (Lý - Trần - Lê)',
    gender: 'female',
    image: OUTFITS_DATA[7]?.image || OUTFITS_DATA[1].image,
    desc: 'Cổ đắp chéo chữ V phóng khoáng, dải thắt lưng lụa',
    highlightTag: 'Hào khí Đại Việt',
    occasions: ['festival', 'cultural-event', 'photoshoot'],
    styles: ['traditional', 'romantic', 'minimal'],
    availableColors: ['red', 'burgundy', 'cream', 'yellow', 'green', 'blue'],
    defaultColor: 'red'
  },
  {
    id: 'vien-linh',
    name: 'Áo Viên Lĩnh',
    shortLabel: 'Viên Lĩnh',
    vietnameseName: 'Áo Viên Lĩnh Cổ Tròn Quan Phục',
    era: 'Thế kỷ 15–19 (Lê Sơ – Nguyễn)',
    gender: 'male',
    image: OUTFITS_DATA[8]?.image || OUTFITS_DATA[2].image,
    desc: 'Cổ tròn ôm sát chân cổ, khuy vai phải bệ vệ',
    highlightTag: 'Quan phục uy nghiêm',
    occasions: ['cultural-event', 'wedding', 'festival'],
    styles: ['traditional', 'elegant', 'minimal'],
    availableColors: ['burgundy', 'blue', 'red', 'yellow', 'green', 'black'],
    defaultColor: 'burgundy'
  },
  {
    id: 'doi-kham',
    name: 'Áo Đối Khâm',
    shortLabel: 'Đối Khâm',
    vietnameseName: 'Áo Đối Khâm Khoác Ngoài',
    era: 'Thời Lý - Trần - Lê - Nguyễn',
    gender: 'female',
    image: OUTFITS_DATA[9]?.image || OUTFITS_DATA[1].image,
    desc: 'Hai vạt song song buông mở, lộ yếm lụa bên trong',
    highlightTag: 'Hai vạt song song',
    occasions: ['photoshoot', 'casual', 'festival', 'cultural-event'],
    styles: ['modern', 'romantic', 'street', 'elegant'],
    availableColors: ['burgundy', 'red', 'pastel', 'cream', 'yellow', 'blue', 'green'],
    defaultColor: 'burgundy'
  }
];

const STUDIO_ACCESSORIES: StudioAccessoryItem[] = [
  {
    id: 'khan-dong',
    name: 'Khăn đóng',
    shortLabel: 'Khăn đóng',
    category: 'Phụ kiện đầu',
    iconType: 'khan-dong'
  },
  {
    id: 'vong-kieng-bac',
    name: 'Kiềng bạc',
    shortLabel: 'Kiềng bạc',
    category: 'Trang sức',
    iconType: 'kieng-bac'
  },
  {
    id: 'non-quai-thao',
    name: 'Nón quai thao',
    shortLabel: 'Nón quai thao',
    category: 'Phụ kiện đầu',
    iconType: 'non-quai-thao'
  },
  {
    id: 'chuoi-ngoc-trai',
    name: 'Chuỗi ngọc trai',
    shortLabel: 'Ngọc trai',
    category: 'Trang sức',
    iconType: 'ngoc-trai'
  },
  {
    id: 'sandal-day-manh',
    name: 'Sandal quai mảnh',
    shortLabel: 'Sandal',
    category: 'Giày dép',
    iconType: 'sandal'
  },
  {
    id: 'sneakers-retro-trang',
    name: 'Sneakers retro',
    shortLabel: 'Sneakers',
    category: 'Giày dép',
    iconType: 'sneakers'
  },
  {
    id: 'o-truyen-thong',
    name: 'Ô truyền thống',
    shortLabel: 'Ô',
    category: 'Cầm tay',
    iconType: 'umbrella'
  }
];

/**
 * Line-art thumbnail for accessory items
 */
const AccessoryMiniGraphic: React.FC<{
  type: StudioAccessoryItem['iconType'];
  isSelected: boolean;
}> = ({ type, isSelected }) => {
  const strokeColor = isSelected ? '#991B1E' : '#45362E';
  const accentColor = '#C8973E';

  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" fill="none">
      {type === 'khan-dong' && (
        <g>
          <path d="M10 26C10 17 38 17 38 26C38 30 32 32 24 32C16 32 10 30 10 26Z" stroke={strokeColor} strokeWidth="2" />
          <path d="M14 22L24 28L34 22" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {type === 'kieng-bac' && (
        <g>
          <circle cx="24" cy="25" r="11" stroke={strokeColor} strokeWidth="2.2" />
          <path d="M19 15C22 13.5 26 13.5 29 15" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {type === 'non-quai-thao' && (
        <g>
          <ellipse cx="24" cy="22" rx="16" ry="5" stroke={strokeColor} strokeWidth="2" />
          <path d="M15 20C18 16 30 16 33 20" stroke={accentColor} strokeWidth="1.6" />
          <path d="M13 25V34C13 36 16 36 16 34V26" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M35 25V34C35 36 32 36 32 34V26" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}
      {type === 'ngoc-trai' && (
        <g>
          <circle cx="24" cy="14" r="2.2" fill={strokeColor} />
          <circle cx="17" cy="17" r="2.2" fill={strokeColor} />
          <circle cx="31" cy="17" r="2.2" fill={strokeColor} />
          <circle cx="14" cy="24" r="2.4" fill={strokeColor} />
          <circle cx="34" cy="24" r="2.4" fill={strokeColor} />
          <circle cx="24" cy="34" r="3" fill={accentColor} />
        </g>
      )}
      {type === 'sandal' && (
        <g>
          <path d="M11 32H37C38 32 39 34 37 35H11C9 35 9 32 11 32Z" stroke={strokeColor} strokeWidth="2" />
          <path d="M15 32V37M18 32C20 26 28 26 33 32" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {type === 'sneakers' && (
        <g>
          <path d="M10 33H38V36H10V33Z" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M11 33V23L19 23L26 28L36 29C38 29 38 33 38 33" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
          <path d="M18 29L25 31" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {type === 'umbrella' && (
        <g>
          {/* Canopy dome with silk/paper segments */}
          <path d="M8 23C8 12 40 12 40 23C36 25 32 23 28 25C24 23 20 25 16 23C12 25 8 23 8 23Z" fill={strokeColor} fillOpacity="0.14" stroke={strokeColor} strokeWidth="1.8" />
          {/* Bamboo shaft and curved handle */}
          <path d="M24 13V35C24 38 21 38 20 36" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M24 10V13" stroke={accentColor} strokeWidth="2.4" strokeLinecap="round" />
          {/* Bamboo umbrella ribs */}
          <path d="M24 13L13 23M24 13L35 23M24 13L24 24" stroke={accentColor} strokeWidth="1.2" />
          {/* Red silk tassel */}
          <path d="M20 36L18 41M20 36L21 42" stroke="#991B1E" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};

/**
 * Game Character Creator Hairstyle Card
 * - Unified Character Design System across all 4 hairstyles:
 *   "long" (Tóc dài), "bun" (Tóc búi), "braid" (Tóc tết), "short" (Tóc ngắn)
 * - Keeps identical head shape, facial proportions, 6:4 curtain hairline,
 *   natural black silk color, anisotropic lighting, and white Áo Dài collar
 */
const HairstyleOptionCard: React.FC<{
  item: HairstyleOption;
  isSelected: boolean;
  onSelect: (id: HairstyleId) => void;
}> = ({ item, isSelected, onSelect }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!item.available) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="group relative rounded-xl p-2 text-center flex flex-col items-center justify-between border border-[#D8C7B2]/60 bg-[#EFE7DC]/55 opacity-75 cursor-not-allowed select-none"
        title={`${item.name} — Sắp có`}
      >
        <div className="w-full flex items-center justify-between mb-1">
          <span className="text-[9px] font-semibold text-[#7A695B] truncate">
            Kiểu tóc
          </span>
          <span className="text-[9px] font-bold text-[#7A695B] bg-[#E2D5C3]/80 px-1.5 py-0.5 rounded-md whitespace-nowrap">
            Sắp có
          </span>
        </div>

        <div className="w-12 h-12 rounded-lg bg-[#E6DBD0]/60 border border-dashed border-[#CBB9A3] flex flex-col items-center justify-center my-0.5">
          <Lock className="w-3.5 h-3.5 text-[#8A7968] mb-0.5" />
          <span className="text-[8px] font-bold uppercase tracking-wider text-[#7A695B]">
            Sắp có
          </span>
        </div>

        <span className="font-serif text-xs font-bold leading-tight mt-1 text-[#68584B] truncate max-w-full">
          {item.name}
        </span>
      </button>
    );
  }

  const isMaleHair = item.id.startsWith('male-');
  const gradId = `previewHairGrad-${item.id}`;
  const depthGradId = `previewHairDepth-${item.id}`;

  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`group relative rounded-xl p-2 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between border ${
        isSelected
          ? 'bg-[#FFFDF9] border-[#991B1E] shadow-[0_4px_12px_rgba(153,27,30,0.14)] ring-1 ring-[#C8973E]/60'
          : 'bg-[#FFFDF9]/50 border-[#DECBB3]/80 hover:bg-[#FFFDF9] hover:border-[#C8973E]'
      }`}
      title={item.description || item.name}
    >
      <div className="w-full flex items-center justify-between mb-1">
        <span className="text-[9px] font-semibold text-[#991B1E] truncate">
          {isSelected ? 'Đang dùng' : 'Khả dụng'}
        </span>
        <span
          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
            isSelected
              ? 'bg-[#991B1E] text-white'
              : 'border border-[#D0C2B0] bg-white/60 text-transparent'
          }`}
        >
          <Check className="w-2 h-2" />
        </span>
      </div>

      {/* Character Creator Hair Preview Thumbnail */}
      <div className="relative w-12 h-12 rounded-lg bg-gradient-to-b from-[#FFFDF9] to-[#EFE6D8] border border-[#E2D4C0] flex items-center justify-center my-0.5 overflow-hidden">
        {!isMaleHair && !imgError && (
          <img
            src={item.image}
            alt={item.name}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${
              imgLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        )}
        {(isMaleHair || !imgLoaded) && (
          <svg
            viewBox="0 0 64 64"
            className="w-11 h-11 transition-transform duration-200 group-hover:scale-105"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={gradId} x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#26232C" />
                <stop offset="35%" stopColor="#17151C" />
                <stop offset="80%" stopColor="#100E13" />
                <stop offset="100%" stopColor="#09080B" />
              </linearGradient>
              <linearGradient id={depthGradId} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#16141A" />
                <stop offset="60%" stopColor="#0E0D12" />
                <stop offset="100%" stopColor="#08070A" />
              </linearGradient>
            </defs>

            {isMaleHair ? (
              <g>
                {/* =========================================================
                    MALE HAIRSTYLE ILLUSTRATIONS (5 STYLES)
                   ========================================================= */}
                {/* 1. Back Hair Layer for Male Styles */}
                {item.id === 'male-bun' && (
                  <g>
                    {/* High historical topknot (Búi tó cổ trang) */}
                    <ellipse cx="32" cy="8.5" rx="6.2" ry="5.4" fill={`url(#${depthGradId})`} />
                    <ellipse cx="32" cy="8" rx="5.4" ry="4.6" fill={`url(#${gradId})`} />
                    {/* Silk ribbon tie around topknot base */}
                    <rect x="26.8" y="11" width="10.4" height="2.3" rx="1.1" fill="#991B1E" stroke="#C8973E" strokeWidth="0.6" />
                    {/* Traditional hairpin (Trâm cài cổ trang) */}
                    <line x1="22" y1="9.5" x2="42" y2="7.5" stroke="#C8973E" strokeWidth="1.4" strokeLinecap="round" />
                    <circle cx="22" cy="9.5" r="1.4" fill="#D4AF37" />
                  </g>
                )}

                {item.id === 'male-ponytail' && (
                  <g>
                    {/* Long bound ponytail hanging behind neck & right shoulder */}
                    <path
                      d="M 28 31 C 25 39, 24 48, 26 57 C 29 58.5, 35 58.5, 38 57 C 40 48, 39 39, 36 31 Z"
                      fill={`url(#${depthGradId})`}
                    />
                    <rect x="28.2" y="33.5" width="7.6" height="2.2" rx="1" fill="#991B1E" stroke="#C8973E" strokeWidth="0.5" />
                    <path d="M 30 37 C 29.5 44, 30 51, 31 56 M 34 37 C 34.5 44, 34 51, 33 56" stroke="#4F475E" strokeWidth="0.8" strokeLinecap="round" />
                  </g>
                )}

                {item.id === 'male-half-up' && (
                  <g>
                    {/* Half-up crown knot */}
                    <ellipse cx="32" cy="9.2" rx="5" ry="3.5" fill={`url(#${gradId})`} />
                    <rect x="27.8" y="11.2" width="8.4" height="1.8" rx="0.9" fill="#2A232D" stroke="#C8973E" strokeWidth="0.5" />
                    {/* Flowing lower back hair */}
                    <path
                      d="M 19 25 C 16 34, 15 46, 17 56 C 21 57.5, 43 57.5, 47 56 C 49 46, 48 34, 45 25 Z"
                      fill={`url(#${depthGradId})`}
                    />
                    <path d="M 19 34 C 17.5 42, 17.5 49, 19 55 M 45 34 C 46.5 42, 46.5 49, 45 55" stroke="#4F475E" strokeWidth="0.85" strokeLinecap="round" />
                  </g>
                )}

                {/* Shared Male Neck & Traditional Black Áo Dài Ngũ Thân Collar */}
                <path d="M 27.2 34 L 27.2 43.5 Q 32 45.5 36.8 43.5 L 36.8 34 Z" fill="#E8BA9A" />
                {/* Traditional White Inner Collar Rim (Lót cổ trắng) */}
                <path
                  d="M 25.8 39.8 Q 32 42 38.2 39.8 L 38.8 43.8 Q 32 45.8 25.2 43.8 Z"
                  fill="#FAF8F5"
                  stroke="#D8C7B2"
                  strokeWidth="0.6"
                />
                {/* Male Black Áo Dài Shoulders & Standing Lập Lĩnh Collar */}
                <path
                  d="M 14 57 C 16 47, 21.5 43.8, 26.2 43 L 37.8 43 C 42.5 43.8, 48 47, 50 57 Z"
                  fill="#1C1917"
                  stroke="#3A332C"
                  strokeWidth="0.7"
                />
                <path
                  d="M 25.2 40.8 Q 32 43 38.8 40.8 L 39.6 45.8 Q 32 47.8 24.4 45.8 Z"
                  fill="#181512"
                  stroke="#C8973E"
                  strokeWidth="0.65"
                />
                {/* Ngũ Thân Diagonal Lapel & Brass Button */}
                <path d="M 32 45.5 L 40.5 49.5 L 41.5 56.5" stroke="#C8973E" strokeWidth="0.75" strokeLinecap="round" opacity="0.85" />
                <circle cx="33.5" cy="45.8" r="1.05" fill="#D4AF37" />
                <circle cx="39.5" cy="49.2" r="1.05" fill="#D4AF37" />

                {/* Sculpted Masculine Head, Ears & Jawline */}
                <ellipse cx="20.2" cy="25.5" rx="1.7" ry="3.2" fill="#E8BA9A" />
                <ellipse cx="43.8" cy="25.5" rx="1.7" ry="3.2" fill="#E8BA9A" />
                <path
                  d="M 20.8 22 C 20.8 13.8, 43.2 13.8, 43.2 22 C 43.2 29.5, 39.5 36.2, 32 36.5 C 24.5 36.2, 20.8 29.5, 20.8 22 Z"
                  fill="#F1C3A4"
                />
                {/* Subtle Masculine Brows */}
                <path d="M 24.5 22.2 Q 27.2 21.2 29.8 22" stroke="#2A211D" strokeWidth="1.15" strokeLinecap="round" />
                <path d="M 34.2 22 Q 36.8 21.2 39.5 22.2" stroke="#2A211D" strokeWidth="1.15" strokeLinecap="round" />

                {/* 2. Front / Crown Hair Silhouette per Male Style */}
                {item.id === 'male-short' && (
                  <g>
                    {/* Neat traditional short masculine crown & tapered sideburns */}
                    <path
                      d="M 19.8 23.8 C 18.8 14.2, 24.2 10.2, 32 10.2 C 39.8 10.2, 45.2 14.2, 44.2 23.8 L 42.8 24.5 L 42.3 19.5 C 40.5 16.2, 36.5 15.2, 32 15.2 C 27.5 15.2, 23.5 16.2, 21.7 19.5 L 21.2 24.5 Z"
                      fill={`url(#${gradId})`}
                    />
                    <path d="M 24.5 13.8 Q 32 12 39.5 13.8" stroke="#655C75" strokeWidth="1.2" strokeLinecap="round" />
                  </g>
                )}

                {item.id === 'male-bun' && (
                  <g>
                    {/* Sleek upward-pulled cổ trang hairline */}
                    <path
                      d="M 19.8 23.8 C 19 14.2, 24.5 10.5, 32 10.5 C 39.5 10.5, 45 14.2, 44.2 23.8 L 42.8 24.2 L 42.4 19 C 40.2 15.5, 36.2 14.6, 32 14.6 C 27.8 14.6, 23.8 15.5, 21.6 19 L 21.2 24.2 Z"
                      fill={`url(#${gradId})`}
                    />
                    {/* Upward combed tension lines toward topknot */}
                    <path d="M 26 14.2 L 29 11.2 M 32 13.8 L 32 10.8 M 38 14.2 L 35 11.2" stroke="#655C75" strokeWidth="0.95" strokeLinecap="round" />
                  </g>
                )}

                {item.id === 'male-ponytail' && (
                  <g>
                    {/* Classic swept back crown with subtle temple locks */}
                    <path
                      d="M 19.6 24.2 C 18.6 14, 24.2 10.2, 32 10.2 C 39.8 10.2, 45.4 14, 44.4 24.2 L 42.8 25 L 42.2 18.8 C 39.5 15.6, 35.8 14.8, 32 15.2 C 28.2 14.8, 24.5 15.6, 21.8 18.8 L 21.2 25 Z"
                      fill={`url(#${gradId})`}
                    />
                    <path d="M 24 14 Q 32 12.2 40 14" stroke="#655C75" strokeWidth="1.15" strokeLinecap="round" />
                  </g>
                )}

                {item.id === 'male-parted' && (
                  <g>
                    {/* Classic 7/3 side-parted scholar hairstyle */}
                    <path
                      d="M 19.5 24 C 18.5 13.8, 24 9.8, 32 9.8 C 40.2 9.8, 45.5 13.8, 44.5 24 L 42.8 24.5 L 42.2 19.2 C 39.2 17.8, 33.5 16.2, 27.2 14.2 C 24.8 16.5, 22.8 18.5, 21.5 20.2 L 21 24.5 Z"
                      fill={`url(#${gradId})`}
                    />
                    {/* 7/3 Scalp Parting Line on left */}
                    <path d="M 26.8 10.6 L 27.4 14.5" stroke="#F1C3A4" strokeWidth="1" strokeLinecap="round" opacity="0.85" />
                    <path d="M 29 13.2 Q 35.5 12.2 41 15" stroke="#655C75" strokeWidth="1.25" strokeLinecap="round" />
                  </g>
                )}

                {item.id === 'male-half-up' && (
                  <g>
                    {/* Half-up crown with soft masculine temple strands framing upper cheek */}
                    <path
                      d="M 19.5 24.5 C 18.5 14, 24.2 10.2, 32 10.2 C 39.8 10.2, 45.5 14, 44.5 24.5 L 42.8 25.2 L 42.2 18.8 C 39.2 15.8, 35.5 14.8, 32 15.5 C 28.5 14.8, 24.8 15.8, 21.8 18.8 L 21.2 25.2 Z"
                      fill={`url(#${gradId})`}
                    />
                    {/* Refined temple strands */}
                    <path d="M 21.2 18.5 C 20.2 22.5, 20.2 26.5, 21.4 30 C 19.8 27, 19.5 22.5, 20.4 19 Z" fill={`url(#${gradId})`} />
                    <path d="M 42.8 18.5 C 43.8 22.5, 43.8 26.5, 42.6 30 C 44.2 27, 44.5 22.5, 43.6 19 Z" fill={`url(#${gradId})`} />
                    <path d="M 24.5 13.8 Q 32 12 39.5 13.8" stroke="#655C75" strokeWidth="1.15" strokeLinecap="round" />
                  </g>
                )}
              </g>
            ) : (
              <g>
                {/* =============================================================
                    1. BACK HAIR SILHOUETTE BY FEMALE HAIRSTYLE ID
                   ============================================================= */}
                {item.id === 'long' && (
                  <g>
                    {/* Long flowing natural black back hair */}
                    <path
                      d="M 32 9 C 20 9, 15 16, 14 26 C 13 37, 11 46, 14 56 C 17 53, 19 50, 20 57 C 25 59, 39 59, 44 57 C 45 50, 47 53, 50 56 C 53 46, 51 37, 50 26 C 49 16, 44 9, 32 9 Z"
                      fill={`url(#${gradId})`}
                    />
                    <ellipse cx="32" cy="37" rx="8" ry="5" fill="#070609" opacity="0.75" />
                  </g>
                )}

                {item.id === 'bun' && (
                  <g>
                    {/* Clean, compact modern bun slightly high at the back of the crown */}
                    <ellipse cx="32" cy="8.2" rx="7.8" ry="4.5" fill={`url(#${depthGradId})`} />
                    <ellipse cx="32" cy="7.8" rx="6.8" ry="3.8" fill={`url(#${gradId})`} />
                    {/* Subtle twisted silk wrap crease on bun (no pins/flowers) */}
                    <path d="M 26.5 7.5 Q 32 5.2 37.5 7.5" stroke="#4F475E" strokeWidth="0.9" strokeLinecap="round" />
                    <path d="M 28 9 Q 32 7.2 36 9" stroke="#6E6482" strokeWidth="1" strokeLinecap="round" />
                    {/* Sleek back hair shell swept up neatly */}
                    <path
                      d="M 32 9 C 21 9, 17 16, 17 24 C 17 30, 20 34, 26 35.5 L 38 35.5 C 44 34, 47 30, 47 24 C 47 16, 43 9, 32 9 Z"
                      fill={`url(#${depthGradId})`}
                    />
                  </g>
                )}

                {item.id === 'braid' && (
                  <g>
                    {/* Neat crown back shell */}
                    <path
                      d="M 32 9 C 21 9, 17 16, 17 24 C 17 30, 20 35, 25 36.5 L 39 36.5 C 44 35, 47 30, 47 24 C 47 16, 43 9, 32 9 Z"
                      fill={`url(#${depthGradId})`}
                    />
                  </g>
                )}

                {item.id === 'short' && (
                  <g>
                    {/* Modern chin-to-above-shoulder C-curl Bob silhouette */}
                    <path
                      d="M 32 9 C 20 9, 15 16, 14 25 C 13 32, 13.5 37.5, 17.5 40.5 C 20.5 42.2, 24 41.5, 26.5 39.5 L 37.5 39.5 C 40 41.5, 43.5 42.2, 46.5 40.5 C 50.5 37.5, 51 32, 50 25 C 49 16, 44 9, 32 9 Z"
                      fill={`url(#${gradId})`}
                    />
                    <ellipse cx="32" cy="37.5" rx="7.5" ry="3.5" fill="#070609" opacity="0.8" />
                  </g>
                )}

                {/* =============================================================
                    2. SHARED MANNEQUIN NECK, ÁO DÀI COLLAR & FACE PROPORTIONS
                   ============================================================= */}
                {/* Neck */}
                <path d="M 28 34 L 28 43 Q 32 45 36 43 L 36 34 Z" fill="#EBC0A2" />
                {/* White Áo Dài standing collar & subtle shoulder line */}
                <path
                  d="M 16 56 C 18 47, 23 44, 27 43 L 37 43 C 41 44, 46 47, 48 56 Z"
                  fill="#FAF7F2"
                  stroke="#E2D4C0"
                  strokeWidth="0.7"
                />
                <path
                  d="M 26 40.5 Q 32 42.5 38 40.5 L 39 45.5 Q 32 47.5 25 45.5 Z"
                  fill="#FFFFFF"
                  stroke="#D8C7B2"
                  strokeWidth="0.8"
                />
                <circle cx="32" cy="43.2" r="0.9" fill="#D4AF37" />

                {/* Lower shoulder braids for 'braid' (drawn clearly over outer shoulders, clear of collar) */}
                {item.id === 'braid' && (
                  <g>
                    {/* Left articulated woven braid plait */}
                    <path d="M 18.5 30 C 14.5 31.5, 14 36, 17 39 C 19.5 39.5, 21.5 36.5, 21 33 Z" fill={`url(#${gradId})`} />
                    <path d="M 17 37.5 C 13.2 39.2, 13 43.8, 16.2 46.5 C 18.8 47, 20.8 44, 20 40.5 Z" fill={`url(#${depthGradId})`} />
                    <path d="M 16.2 45 C 13 46.8, 13 51, 16 53.5 C 18.2 54, 20 51.2, 19.2 48 Z" fill={`url(#${gradId})`} />
                    <rect x="14.5" y="53" width="4" height="1.4" rx="0.7" fill="#2A2533" />
                    <path d="M 15.2 54.4 C 14 57, 14.8 59.5, 16.5 61 C 17.8 59.5, 18.5 57, 18 54.4 Z" fill={`url(#${gradId})`} />
                    <path
                      d="M 15.5 34.5 L 19 37.5 M 14.8 42 L 18.2 45 M 14.5 49 L 17.8 52"
                      stroke="#5B526B"
                      strokeWidth="0.9"
                      strokeLinecap="round"
                    />

                    {/* Right articulated woven braid plait */}
                    <path d="M 45.5 30 C 49.5 31.5, 50 36, 47 39 C 44.5 39.5, 42.5 36.5, 43 33 Z" fill={`url(#${gradId})`} />
                    <path d="M 47 37.5 C 50.8 39.2, 51 43.8, 47.8 46.5 C 45.2 47, 43.2 44, 44 40.5 Z" fill={`url(#${depthGradId})`} />
                    <path d="M 47.8 45 C 51 46.8, 51 51, 48 53.5 C 45.8 54, 44 51.2, 44.8 48 Z" fill={`url(#${gradId})`} />
                    <rect x="45.5" y="53" width="4" height="1.4" rx="0.7" fill="#2A2533" />
                    <path d="M 48.8 54.4 C 50 57, 49.2 59.5, 47.5 61 C 46.2 59.5, 45.5 57, 46 54.4 Z" fill={`url(#${gradId})`} />
                    <path
                      d="M 48.5 34.5 L 45 37.5 M 49.2 42 L 45.8 45 M 49.5 49 L 46.2 52"
                      stroke="#5B526B"
                      strokeWidth="0.9"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {/* Identical Head & Face Oval */}
                <path
                  d="M 21 23 C 21 14, 43 14, 43 23 C 43 31, 38 36.5, 32 36.5 C 26 36.5, 21 31, 21 23 Z"
                  fill="#F5CCB0"
                />

                {/* =============================================================
                    3. FRONT LOCKS & SHARED 6:4 CURTAIN PARTING CROWN
                   ============================================================= */}
                {/* Short Bob inward C-curl cheek/jawline locks */}
                {item.id === 'short' && (
                  <g>
                    <path
                      d="M 18 21 C 15.5 27, 15.5 35, 19.5 39.5 C 21.5 41.2, 24.5 41, 26 39 C 22.5 36.5, 21 30, 21.2 22 Z"
                      fill={`url(#${gradId})`}
                    />
                    <path
                      d="M 46 21 C 48.5 27, 48.5 35, 44.5 39.5 C 42.5 41.2, 39.5 41, 38 39 C 41.5 36.5, 43 30, 42.8 22 Z"
                      fill={`url(#${gradId})`}
                    />
                    <path d="M 18 27 C 17 32, 18 36.5, 21.5 39" stroke="#584F68" strokeWidth="0.9" strokeLinecap="round" />
                    <path d="M 46 27 C 47 32, 46 36.5, 42.5 39" stroke="#584F68" strokeWidth="0.9" strokeLinecap="round" />
                  </g>
                )}

                {/* Shared 6:4 Curtain Parting Crown */}
                <path
                  d="M 19 23.5 C 18 13.5, 24 8.5, 31 9 C 32 9, 33 9, 34 9 C 41 8.5, 46 13.5, 45 23.5 C 43 19.5, 38 15.5, 31 14 C 26 15.5, 21 19.5, 19 23.5 Z"
                  fill={`url(#${gradId})`}
                />

                {/* Soft face-framing temple wisps */}
                <path
                  d={
                    item.id === 'bun' || item.id === 'braid'
                      ? 'M 22 17.5 C 20 22, 20 27.5, 21.8 32.5 C 19.5 28.5, 19 22, 20.2 18.5 Z'
                      : 'M 22 17.5 C 20.5 21.5, 20.5 25.5, 21.5 29.5 C 19.8 26.5, 19.2 21.5, 20.2 18.5 Z'
                  }
                  fill={`url(#${gradId})`}
                />
                <path
                  d={
                    item.id === 'bun' || item.id === 'braid'
                      ? 'M 42 17.5 C 44 22, 44 27.5, 42.2 32.5 C 44.5 28.5, 45 22, 43.8 18.5 Z'
                      : 'M 42 17.5 C 43.5 21.5, 43.5 25.5, 42.5 29.5 C 44.2 26.5, 44.8 21.5, 43.8 18.5 Z'
                  }
                  fill={`url(#${gradId})`}
                />

                {/* Natural 6:4 scalp parting line */}
                <path d="M 30.8 9.5 L 31.2 14" stroke="#F5CCB0" strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />

                {/* Silky crown highlight */}
                <path
                  d="M 24 14 Q 28 12 30.5 13 M 33 13 Q 37 12 40 14.5"
                  stroke="#655C75"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </g>
            )}
          </svg>
        )}
      </div>

      <span
        className={`font-serif text-xs font-bold leading-tight mt-1 truncate max-w-full ${
          isSelected ? 'text-[#991B1E]' : 'text-[#1C1917]'
        }`}
      >
        {item.name}
      </span>
    </button>
  );
};

export const DEFAULT_FEMALE_LOOK: OutfitLookState = {
  gender: 'female',
  skinTone: 'neutral',
  hairstyle: DEFAULT_FEMALE_HAIRSTYLE as HairstyleId,
  occasion: 'festival',
  outfit: 'ao-dai',
  style: 'traditional',
  color: 'cream',
  accessories: []
};

export const DEFAULT_MALE_LOOK: OutfitLookState = {
  gender: 'male',
  skinTone: 'neutral',
  hairstyle: DEFAULT_MALE_HAIRSTYLE as HairstyleId,
  occasion: 'festival',
  outfit: 'ao-dai',
  style: 'traditional',
  color: 'cream',
  accessories: []
};

export const RemixStudioPage: React.FC<RemixStudioPageProps> = ({
  currentLook,
  onChangeLook,
  onCreateLook,
  onSaveLook,
  isAlreadySaved = false,
  preparationContext,
  onReopenPreparation
}) => {
  // Active Gender State: 'female' | 'male'
  const [activeGender, setActiveGender] = useState<CharacterGender>(() => {
    return currentLook.gender || 'female';
  });

  // Independent look state for Female: persists female's outfit, color, hairstyle, accessories
  const [femaleLookState, setFemaleLookState] = useState<OutfitLookState>(() => {
    if (currentLook.gender === 'female') {
      return { ...DEFAULT_FEMALE_LOOK, ...currentLook, gender: 'female' };
    }
    return DEFAULT_FEMALE_LOOK;
  });

  // Independent look state for Male: persists male's outfit, color, hairstyle, accessories
  const [maleLookState, setMaleLookState] = useState<OutfitLookState>(() => {
    if (currentLook.gender === 'male') {
      return { ...DEFAULT_MALE_LOOK, ...currentLook, gender: 'male' };
    }
    return DEFAULT_MALE_LOOK;
  });

  // Refs to always hold the latest states synchronously without stale closures
  const maleLookRef = useRef<OutfitLookState>(maleLookState);
  maleLookRef.current = maleLookState;
  const femaleLookRef = useRef<OutfitLookState>(femaleLookState);
  femaleLookRef.current = femaleLookState;

  // Sync incoming currentLook (e.g. from single initial suggested outfit)
  useEffect(() => {
    if (currentLook.gender) {
      setActiveGender(currentLook.gender);
      if (currentLook.gender === 'male') {
        const updatedMale = { ...DEFAULT_MALE_LOOK, ...currentLook, gender: 'male' as const };
        setMaleLookState(updatedMale);
        maleLookRef.current = updatedMale;
      } else {
        const updatedFemale = { ...DEFAULT_FEMALE_LOOK, ...currentLook, gender: 'female' as const };
        setFemaleLookState(updatedFemale);
        femaleLookRef.current = updatedFemale;
      }
      if (currentLook.stylistRationale) {
        setSuggestionToast(`Gợi ý trang phục: ${currentLook.stylistRationale}`);
        const t = setTimeout(() => setSuggestionToast(null), 6500);
        return () => clearTimeout(t);
      }
    }
  }, [currentLook]);

  // Active gender alias for child components
  const gender = activeGender;

  // Active Look State corresponds strictly to the active gender
  const activeLookState: OutfitLookState =
    activeGender === 'male' ? maleLookState : femaleLookState;

  // Skin Tone State directly from activeLookState
  const skinTone: SkinToneId = (activeLookState.skinTone || 'neutral') as SkinToneId;

  // Filter Flattering Colors only toggle
  const [filterFlatteringOnly, setFilterFlatteringOnly] = useState<boolean>(false);

  // Flow gợi ý bối cảnh: mặc định không che modal, chỉ mở khi người dùng bấm nút yêu cầu
  const [showPrepWizard, setShowPrepWizard] = useState<boolean>(false);
  const [wizardStep, setWizardStep] = useState<1 | 2>(1);
  const [wizardGender, setWizardGender] = useState<'female' | 'male'>(() => activeGender);
  const [wizardDateMode, setWizardDateMode] = useState<'today' | 'tomorrow' | 'weekend' | 'custom'>('today');
  const [wizardCustomDate, setWizardCustomDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [wizardLocationId, setWizardLocationId] = useState<string>('hanoi');
  const [wizardTimeOfDay, setWizardTimeOfDay] = useState<TimeOfDayId>('morning');
  const [wizardOccasion, setWizardOccasion] = useState<OccasionId>(() => (activeLookState.occasion as OccasionId) || 'festival');
  const [localPrepContext, setLocalPrepContext] = useState(preparationContext || null);
  const [suggestionToast, setSuggestionToast] = useState<string | null>(() => {
    return currentLook.stylistRationale ? `Gợi ý trang phục: ${currentLook.stylistRationale}` : null;
  });

  // Sync incoming preparationContext prop to local state
  useEffect(() => {
    if (preparationContext) {
      setLocalPrepContext(preparationContext);
    }
  }, [preparationContext]);

  const wizardTargetDate = useMemo(() => {
    const now = new Date();
    if (wizardDateMode === 'today') return now;
    if (wizardDateMode === 'tomorrow') {
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      return tomorrow;
    }
    if (wizardDateMode === 'weekend') {
      const weekend = new Date(now);
      const day = now.getDay();
      const diff = day === 0 ? 0 : 6 - day;
      weekend.setDate(now.getDate() + diff);
      return weekend;
    }
    if (wizardCustomDate) {
      const parsed = new Date(wizardCustomDate);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return now;
  }, [wizardDateMode, wizardCustomDate]);

  const wizardWeather = useMemo(() => {
    return getWeatherForecast(wizardLocationId, wizardTargetDate, wizardTimeOfDay);
  }, [wizardLocationId, wizardTargetDate, wizardTimeOfDay]);

  const wizardFormattedDate = useMemo(() => {
    return formatVietnameseDate(wizardTargetDate);
  }, [wizardTargetDate]);

  const handleApplyInitialSuggestion = () => {
    const suggested = generatePersonalizedInitialLook({
      gender: wizardGender,
      occasion: wizardOccasion,
      temp: wizardWeather.temp,
      conditionCode: wizardWeather.conditionCode,
      rainProbability: wizardWeather.rainProbability
    });

    setActiveGender(wizardGender);

    if (wizardGender === 'male') {
      const nextMale = { ...DEFAULT_MALE_LOOK, ...suggested, gender: 'male' as const };
      maleLookRef.current = nextMale;
      setMaleLookState(nextMale);
      onChangeLook(nextMale);
    } else {
      const nextFemale = { ...DEFAULT_FEMALE_LOOK, ...suggested, gender: 'female' as const };
      femaleLookRef.current = nextFemale;
      setFemaleLookState(nextFemale);
      onChangeLook(nextFemale);
    }

    const newContext = {
      dateString: wizardFormattedDate,
      locationName: wizardWeather.location,
      weather: wizardWeather,
      timeOfDay: wizardTimeOfDay
    };
    setLocalPrepContext(newContext);
    setShowPrepWizard(false);
    setSuggestionToast(
      `Đã gợi ý trang phục cho dịp ${OCCASIONS_DATA.find((o) => o.id === wizardOccasion)?.nameVi || ''}: ${suggested.stylistRationale}`
    );
    setTimeout(() => setSuggestionToast(null), 6500);
  };

  // Nút "Tự phối đồ": Đóng wizard gợi ý, giữ outfit hiện tại và mở Studio tự do
  const handleSelfRemixClose = () => {
    setShowPrepWizard(false);
  };

  // Active selection states derived strictly from activeLookState
  const selectedOutfitId: OutfitId = (activeLookState.outfit || 'ao-dai') as OutfitId;
  const selectedColorId: ColorId = (activeLookState.color || 'cream') as ColorId;
  const activeHairstylesList = activeGender === 'male' ? MALE_HAIRSTYLES : FEMALE_HAIRSTYLES;
  const activeHairstyleObj =
    activeGender === 'male'
      ? getMaleHairstyleById(activeLookState.hairstyle || DEFAULT_MALE_HAIRSTYLE)
      : getFemaleHairstyleById(activeLookState.hairstyle || DEFAULT_FEMALE_HAIRSTYLE);
  const selectedHairstyleId: HairstyleId = activeHairstyleObj.id as HairstyleId;
  const selectedAccessories: string[] = activeLookState.accessories || [];
  const selectedOccasionId: OccasionId = (activeLookState.occasion || 'festival') as OccasionId;
  const selectedStyleId: StyleId = (activeLookState.style || 'traditional') as StyleId;

  // Per-outfit saved color map so each outfit remembers its selected color across switches
  const [outfitColorMap, setOutfitColorMap] = useState<Partial<Record<OutfitId, ColorId>>>(() => {
    try {
      const cached = sessionStorage.getItem('vietphuc_outfit_colors_v1');
      const parsed = cached ? (JSON.parse(cached) as Partial<Record<OutfitId, ColorId>>) : {};
      const aoDaiColor = parsed['ao-dai'] === 'black' ? 'cream' : (parsed['ao-dai'] || 'cream');
      return { ...parsed, 'ao-dai': aoDaiColor, [selectedOutfitId]: selectedColorId };
    } catch {
      return { 'ao-dai': 'cream', [selectedOutfitId]: selectedColorId };
    }
  });

  const saveOutfitColorMemory = (outfitId: OutfitId, colorId: ColorId) => {
    setOutfitColorMap((prev) => {
      const next = { ...prev, [outfitId]: colorId };
      try {
        sessionStorage.setItem('vietphuc_outfit_colors_v1', JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  // Helper to update only the active gender's look state without affecting the other gender
  const updateActiveLook = (
    updater: Partial<OutfitLookState> | ((prev: OutfitLookState) => OutfitLookState)
  ) => {
    setSavedToast(false);
    if (activeGender === 'male') {
      const current = maleLookRef.current;
      const next: OutfitLookState =
        typeof updater === 'function'
          ? updater(current)
          : { ...current, ...updater, gender: 'male' as const };
      maleLookRef.current = next;
      setMaleLookState(next);
      onChangeLook(next);
    } else {
      const current = femaleLookRef.current;
      const next: OutfitLookState =
        typeof updater === 'function'
          ? updater(current)
          : { ...current, ...updater, gender: 'female' as const };
      femaleLookRef.current = next;
      setFemaleLookState(next);
      onChangeLook(next);
    }
  };

  // Active Left Panel Tab: 'outfit' | 'hair' | 'color' | 'context'
  const [activeLeftTab, setActiveLeftTab] = useState<'outfit' | 'hair' | 'color' | 'context'>('outfit');

  // Active Right Panel Tab: 'all' | 'hair' | 'accessories'
  const [activeRightTab, setActiveRightTab] = useState<'all' | 'hair' | 'accessories'>('all');

  // Organization mode for Outfits: 'by-occasion' | 'by-style' | 'all'
  const [outfitViewMode, setOutfitViewMode] = useState<'by-occasion' | 'by-style' | 'all'>('by-occasion');

  // Center display mode: '3d-canvas' | 'avatar-portrait'
  const [centerViewMode, setCenterViewMode] = useState<'3d-canvas' | 'avatar-portrait'>('3d-canvas');

  // Filter chips
  const [activeOccasionFilter, setActiveOccasionFilter] = useState<OccasionId | 'all'>('all');
  const [activeStyleFilter, setActiveStyleFilter] = useState<StyleId | 'all'>('all');

  // Modals
  const [isInsightOpen, setIsInsightOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [isShareCardModalOpen, setIsShareCardModalOpen] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  // Notice when user clicks Apply Standard Accessories
  const [autoAppliedNotice, setAutoAppliedNotice] = useState<string | null>(null);

  const outfitAccessoryRec = getOutfitAccessoryRecommendation(selectedOutfitId);
  const primarySuggestedSet = getSuggestedAccessoriesForOutfit(selectedOutfitId, activeGender);
  const isWearingPrimarySet =
    primarySuggestedSet.length === selectedAccessories.length &&
    primarySuggestedSet.every((id) => selectedAccessories.includes(id));
  const mismatchedAccessoryIds = selectedAccessories.filter((id) =>
    outfitAccessoryRec.avoidIds.includes(id)
  );

  // Switch active gender: displays previously chosen state of that gender, without copying from other gender
  const handleSelectGender = (selectedGen: CharacterGender) => {
    setActiveGender(selectedGen);
    setAutoAppliedNotice(null);

    const targetLook = selectedGen === 'male' ? maleLookRef.current : femaleLookRef.current;
    onChangeLook(targetLook);
  };

  // Sync skin tone changes for active gender
  const handleSelectSkinTone = (selectedSkin: SkinToneId) => {
    updateActiveLook({ skinTone: selectedSkin });
  };

  // Select hairstyle for active gender (only available hairstyles can be selected)
  const handleSelectHairstyle = (hairId: HairstyleId) => {
    const list = activeGender === 'male' ? MALE_HAIRSTYLES : FEMALE_HAIRSTYLES;
    const found = list.find((h) => h.id === hairId);
    if (!found || !found.available) return;
    updateActiveLook({ hairstyle: hairId });
  };

  // Select outfit for active gender
  const handleSelectOutfit = (outfitId: OutfitId, suggestedOccasion?: OccasionId, suggestedStyle?: StyleId) => {
    setAutoAppliedNotice(null);

    const targetOutfit = ALL_STUDIO_OUTFITS.find((o) => o.id === outfitId);
    const savedColorForOutfit = outfitColorMap[outfitId];
    const nextColorId: ColorId =
      savedColorForOutfit && targetOutfit?.availableColors.includes(savedColorForOutfit)
        ? savedColorForOutfit
        : targetOutfit?.defaultColor || selectedColorId;

    saveOutfitColorMemory(outfitId, nextColorId);

    updateActiveLook((prev) => ({
      ...prev,
      outfit: outfitId,
      occasion: suggestedOccasion || prev.occasion || 'festival',
      style: suggestedStyle || prev.style || 'traditional',
      color: nextColorId
    }));
  };

  // Apply the recommended accessory set for the current outfit
  const handleApplyRecommendedAccessories = () => {
    const recommendedSet = getSuggestedAccessoriesForOutfit(selectedOutfitId, activeGender);
    setAutoAppliedNotice(
      `Đã áp dụng bộ phụ kiện chuẩn văn hóa cho ${activeOutfitObj.name}`
    );
    updateActiveLook({ accessories: recommendedSet });
  };

  // Remove culturally mismatched accessories for the current outfit
  const handleRemoveMismatchedAccessories = () => {
    const cleaned = selectedAccessories.filter(
      (id) => !outfitAccessoryRec.avoidIds.includes(id)
    );
    updateActiveLook({ accessories: cleaned });
  };

  // Select color for active gender
  const handleSelectColor = (colorId: ColorId) => {
    saveOutfitColorMemory(selectedOutfitId, colorId);
    updateActiveLook({ color: colorId });
  };

  // Apply 1-Click Color Harmony Preset
  const handleApplyColorPreset = (preset: ColorHarmonyPreset) => {
    updateActiveLook({
      color: preset.colorId,
      accessories: preset.suggestedAccessories
    });
  };

  // Toggle accessories for active gender
  const handleToggleAccessory = (accId: string) => {
    const exists = selectedAccessories.includes(accId);
    const nextAcc = exists
      ? selectedAccessories.filter((id) => id !== accId)
      : [...selectedAccessories, accId];

    updateActiveLook({ accessories: nextAcc });
  };

  // Select Occasion & Style
  const handleSelectOccasion = (occId: OccasionId) => {
    updateActiveLook({ occasion: occId });
  };

  const handleSelectStyle = (styId: StyleId) => {
    updateActiveLook({ style: styId });
  };

  // Reset Studio to default: cả Nam và Nữ về trạng thái mặc định Áo Dài trắng, quần trắng
  const handleResetStudio = () => {
    setSavedToast(false);
    try {
      sessionStorage.removeItem('vietphuc_outfit_colors_v1');
    } catch {
      // Ignore storage errors
    }
    setOutfitColorMap({ 'ao-dai': 'cream' });

    const resetFemale: OutfitLookState = {
      ...DEFAULT_FEMALE_LOOK,
      skinTone: femaleLookRef.current.skinTone || 'neutral'
    };
    const resetMale: OutfitLookState = {
      ...DEFAULT_MALE_LOOK,
      skinTone: maleLookRef.current.skinTone || 'neutral'
    };

    femaleLookRef.current = resetFemale;
    maleLookRef.current = resetMale;
    setFemaleLookState(resetFemale);
    setMaleLookState(resetMale);

    const activeReset = activeGender === 'male' ? resetMale : resetFemale;
    onChangeLook(activeReset);
  };

  // AI Style Suggestion states
  const [isLoadingAiSuggestion, setIsLoadingAiSuggestion] = useState(false);
  const [aiSuggestionResult, setAiSuggestionResult] = useState<AiStyleSuggestionResult | null>(null);
  const [showAiSuggestionModal, setShowAiSuggestionModal] = useState(false);

  // Request AI Style Suggestion from Gemini API based on weather and occasion in preparationContext
  const handleRequestAiSuggestion = async () => {
    setIsLoadingAiSuggestion(true);
    setShowAiSuggestionModal(true);

    try {
      const effectiveContext = localPrepContext || {
        dateString: 'Hôm nay',
        locationName: 'Hà Nội',
        timeOfDay: 'morning',
        weather: {
          temp: 24,
          condition: 'Trời mát mẻ, nắng nhẹ',
          humidity: 65,
          rainProbability: 15,
          clothingAdvice: 'Thời tiết ôn hòa lý tưởng diện trang phục truyền thống'
        }
      };

      const response = await fetch('/api/ai-style-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          outfitId: selectedOutfitId,
          gender: activeGender,
          preparationContext: effectiveContext,
          occasionId: selectedOccasionId,
          currentColorId: selectedColorId,
          currentAccessories: selectedAccessories
        })
      });

      if (!response.ok) {
        throw new Error('Không thể tải gợi ý từ máy chủ');
      }

      const data: AiStyleSuggestionResult = await response.json();
      setAiSuggestionResult(data);
    } catch {
      // Local culturally vetted fallback
      const temp = localPrepContext?.weather?.temp ?? 24;
      const isCold = temp <= 20;
      const isHot = temp >= 28;
      const isRainy = (localPrepContext?.weather?.rainProbability ?? 0) >= 50;

      let fallbackColor: ColorId = 'cream';
      let fallbackColorName = 'Kem Ngà / Lụa Mộc';
      if (selectedOccasionId === 'tet') {
        fallbackColor = isCold ? 'burgundy' : 'red';
        fallbackColorName = isCold ? 'Đỏ Rượu Quý Phái' : 'Đỏ Son Truyền Thống';
      } else if (selectedOccasionId === 'wedding') {
        fallbackColor = activeGender === 'female' ? 'red' : 'blue';
        fallbackColorName = activeGender === 'female' ? 'Đỏ Son Truyền Thống' : 'Xanh Chàm / Lam Cổ';
      } else if (isCold) {
        fallbackColor = 'burgundy';
        fallbackColorName = 'Đỏ Rượu Quý Phái';
      } else if (isHot) {
        fallbackColor = 'cream';
        fallbackColorName = 'Kem Ngà / Lụa Mộc';
      }

      const fallbackAccs = getSuggestedAccessoriesForOutfit(selectedOutfitId, activeGender);
      if (isRainy && !fallbackAccs.includes('o-truyen-thong')) {
        fallbackAccs.push('o-truyen-thong');
      }

      setAiSuggestionResult({
        suggestedColorId: fallbackColor,
        suggestedColorName: fallbackColorName,
        colorRationale: `Phối màu sắc hài hòa với trang phục ${activeOutfitObj.name} và nhiệt độ ${temp}°C tại ${localPrepContext?.locationName || 'Việt Nam'}.`,
        suggestedAccessories: fallbackAccs,
        accessoriesRationale: `Bộ phụ kiện chuẩn di sản cho ${activeOutfitObj.name}, tinh tế và chuẩn mực trong dịp ${OCCASIONS_DATA.find((o) => o.id === selectedOccasionId)?.nameVi || 'xuất hiện'}.`,
        overallAdvice: `Khi diện ${activeOutfitObj.name}, hãy giữ tư thế đĩnh đạc và tự tin lan tỏa nét đẹp cổ truyền.`,
        weatherAdaptationTip: isCold
          ? 'Thời tiết se lạnh: Nên mặc kèm áo lót lụa mềm giữ ấm.'
          : isHot
          ? 'Thời tiết nắng nóng: Ưu tiên chất vải tơ tằm thoáng mát, phụ kiện gọn nhẹ.'
          : 'Thời tiết mát mẻ rất đẹp để tà áo thả bay tự nhiên.',
        culturalScore: 9.6,
        sourceType: 'curated-stylist'
      });
    } finally {
      setIsLoadingAiSuggestion(false);
    }
  };

  const handleApplyAiColor = (colorId: ColorId) => {
    handleSelectColor(colorId);
    const col = COLORS_DATA.find((c) => c.id === colorId);
    setSuggestionToast(`Đã áp dụng màu ${col?.nameVi.split(' / ')[0] || colorId} theo gợi ý AI!`);
    setTimeout(() => setSuggestionToast(null), 3500);
  };

  const handleApplyAiAccessories = (accIds: string[]) => {
    updateActiveLook({ accessories: accIds });
    setSuggestionToast('Đã áp dụng các phụ kiện gợi ý từ AI!');
    setTimeout(() => setSuggestionToast(null), 3500);
  };

  const handleApplyAllAiSuggestions = () => {
    if (!aiSuggestionResult) return;
    saveOutfitColorMemory(selectedOutfitId, aiSuggestionResult.suggestedColorId);
    updateActiveLook({
      color: aiSuggestionResult.suggestedColorId,
      accessories: aiSuggestionResult.suggestedAccessories
    });
    setShowAiSuggestionModal(false);
    setSuggestionToast(
      `Đã áp dụng toàn bộ gợi ý AI: Màu ${aiSuggestionResult.suggestedColorName} & ${aiSuggestionResult.suggestedAccessories.length} phụ kiện!`
    );
    setTimeout(() => setSuggestionToast(null), 4500);
  };

  // Current Evaluation Object based on active settings
  const currentCultureCheck: CultureCheckData = evaluateCultureCheck({
    outfitId: selectedOutfitId,
    occasionId: selectedOccasionId,
    styleId: selectedStyleId,
    colorId: selectedColorId,
    accessoryIds: selectedAccessories
  });

  // Real-time Color Harmony & Skin Tone Rules Evaluation
  const colorHarmony = evaluateColorHarmony({
    skinTone,
    colorId: selectedColorId,
    outfitId: selectedOutfitId,
    accessories: selectedAccessories
  });

  // Prepare full SavedLook
  const buildSavedLook = (): SavedLook => {
    const fullOutfit =
      OUTFITS_DATA.find((o) => o.id === selectedOutfitId) || OUTFITS_DATA[0];
    const fullOccasion =
      OCCASIONS_DATA.find((o) => o.id === selectedOccasionId) || OCCASIONS_DATA[0];
    const fullStyle =
      STYLES_DATA.find((s) => s.id === selectedStyleId) || STYLES_DATA[0];
    const fullColor =
      COLORS_DATA.find((c) => c.id === selectedColorId) || COLORS_DATA[0];

    const equippedNames = selectedAccessories.map((id) => {
      const item = STUDIO_ACCESSORIES.find((a) => a.id === id);
      return item ? item.name : id;
    });

    return {
      id: `look-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      gender,
      skinTone,
      hairstyle: selectedHairstyleId,
      title: `${fullStyle.name.toUpperCase()} ${fullOutfit.name.toUpperCase()}`,
      subtitle: `${fullOccasion.name} × ${fullStyle.name}`,
      occasion: fullOccasion.id,
      occasionName: fullOccasion.name,
      outfit: selectedOutfitId,
      outfitName: fullOutfit.name,
      style: fullStyle.id,
      styleName: fullStyle.name,
      color: fullColor.id,
      colorName: fullColor.nameVi,
      colorHex: fullColor.hex,
      accessories: equippedNames,
      cultureCheck: currentCultureCheck,
      image: gender === 'male' && fullOutfit.maleImage ? fullOutfit.maleImage : fullOutfit.image
    };
  };

  // Open Submit Confirmation Modal
  const handleOpenSubmitModal = () => {
    setIsConfirmModalOpen(true);
  };

  // Confirm and Save Look
  const handleConfirmSave = () => {
    const newLook = buildSavedLook();
    if (onSaveLook) {
      onSaveLook(newLook);
    }
    setIsConfirmModalOpen(false);
    setSavedToast(true);
    setIsEvaluationModalOpen(true);
  };

  const activeColorObj = COLORS_DATA.find((c) => c.id === selectedColorId) || COLORS_DATA[0];
  const filteredStudioOutfits = ALL_STUDIO_OUTFITS.filter(
    (item) => item.gender === activeGender || item.id === 'ao-dai'
  );
  const activeOutfitObj = ALL_STUDIO_OUTFITS.find((o) => o.id === selectedOutfitId) || ALL_STUDIO_OUTFITS[0];
  const activeOutfitColors = activeOutfitObj.availableColors
    .map((cid) => COLORS_DATA.find((c) => c.id === cid))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const activeSkinToneObj = SKIN_TONES_DATA.find((s) => s.id === skinTone) || SKIN_TONES_DATA[1];

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-[#FAF7F2] select-none">
      {/* =====================================================================
          STUDIO TOP TOOLBAR: GENDER & STATUS CONTROLS
         ===================================================================== */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-4 pb-2 flex flex-wrap items-center justify-between gap-3 border-b border-[#E8DAC7]/60">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#991B1E] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            REMIX STUDIO
          </span>
          <span className="text-[#D0C0AC]">/</span>
          {localPrepContext ? (
            <button
              type="button"
              onClick={() => {
                if (onReopenPreparation) {
                  onReopenPreparation();
                } else {
                  setWizardStep(1);
                  setShowPrepWizard(true);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E1] text-[#7A4B15] border border-[#E5D2BA] text-[11px] font-medium cursor-pointer hover:bg-[#F3E5D0] transition-colors"
              title="Bấm để đổi ngày mặc & dịp xuất hiện"
            >
              <Compass className="w-3 h-3 text-[#C58B35]" />
              <span className="font-bold">{localPrepContext.locationName}</span>
              {localPrepContext.weather && <span>({localPrepContext.weather.temp}°C)</span>}
              <span>•</span>
              <span className="font-bold text-[#991B1E]">
                {OCCASIONS_DATA.find((o) => o.id === selectedOccasionId)?.nameVi || 'Dịp'}
              </span>
              <span className="text-[#991B1E] font-semibold underline ml-1">Đổi ngày & dịp</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (onReopenPreparation) {
                  onReopenPreparation();
                } else {
                  setWizardStep(1);
                  setShowPrepWizard(true);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#991B1E]/10 text-[#991B1E] border border-[#991B1E]/20 text-[11px] font-bold cursor-pointer hover:bg-[#991B1E]/15 transition-colors"
              title="Mở luồng gợi ý: Chọn ngày -> Chọn dịp -> Gợi ý 1 trang phục"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#991B1E]" />
              <span>Gợi ý theo ngày & dịp</span>
            </button>
          )}

          {/* AI Style Suggestion Button */}
          <button
            type="button"
            onClick={handleRequestAiSuggestion}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#991B1E] via-[#851619] to-[#C8973E] hover:from-[#781316] hover:to-[#B3802C] text-white text-xs font-bold shadow-xs hover:shadow-md hover:scale-102 transition-all cursor-pointer"
            title="Nhận gợi ý phối màu và phụ kiện thông minh từ Gemini AI theo bối cảnh thời tiết & dịp"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
            <span>AI Style Suggestion</span>
          </button>
        </div>

        {/* Skin Tone & Gender Controls */}
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {/* Skin Tone Filter Switcher */}
          <div className="inline-flex items-center gap-1 rounded-xl p-1 bg-[#EFE6D8]/80 border border-[#DACBB7]">
            <span className="text-[10px] font-bold text-[#7A695B] px-1.5 flex items-center gap-1 hidden sm:inline-flex">
              <Sun className="w-3 h-3 text-[#C8973E]" />
              <span>Tông da:</span>
            </span>
            <div className="flex items-center gap-0.5">
              {SKIN_TONES_DATA.map((st) => {
                const isSelected = skinTone === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleSelectSkinTone(st.id)}
                    className={`relative p-1 sm:px-2 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#991B1E] shadow-xs ring-1 ring-[#991B1E]/30'
                        : 'text-[#68584B] hover:text-[#1C1917] hover:bg-white/50'
                    }`}
                    title={`${st.nameVi}: ${st.description}`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs shrink-0"
                      style={{ backgroundColor: st.sampleHex }}
                    />
                    <span className="hidden md:inline">{st.name.split(' / ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gender Switcher Button with Default Character Avatars */}
          <div className="inline-flex rounded-xl p-1 bg-[#EFE6D8]/80 border border-[#DACBB7]">
            <button
              type="button"
              onClick={() => handleSelectGender('female')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeGender === 'female'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#594C42] hover:text-[#1C1917]'
              }`}
              title="Chuyển sang Nữ"
            >
              <CharacterDefaultAvatar
                gender="female"
                skinTone={femaleLookState.skinTone || 'neutral'}
                hairstyle={(femaleLookState.hairstyle || DEFAULT_FEMALE_HAIRSTYLE) as HairstyleId}
                outfitId={(femaleLookState.outfit || 'ao-dai') as OutfitId}
                colorId={(femaleLookState.color || 'cream') as ColorId}
                accessories={femaleLookState.accessories || []}
                size="xs"
              />
              <span className="hidden sm:inline">
                NỮ ({ALL_STUDIO_OUTFITS.find((o) => o.id === femaleLookState.outfit)?.shortLabel || 'Áo dài'})
              </span>
              <span className="sm:hidden">NỮ</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectGender('male')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeGender === 'male'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#594C42] hover:text-[#1C1917]'
              }`}
              title="Chuyển sang Nam"
            >
              <CharacterDefaultAvatar
                gender="male"
                skinTone={maleLookState.skinTone || 'neutral'}
                hairstyle={(maleLookState.hairstyle || DEFAULT_MALE_HAIRSTYLE) as HairstyleId}
                outfitId={(maleLookState.outfit || 'ao-dai') as OutfitId}
                colorId={(maleLookState.color || 'cream') as ColorId}
                accessories={maleLookState.accessories || []}
                size="xs"
              />
              <span className="hidden sm:inline">
                NAM ({ALL_STUDIO_OUTFITS.find((o) => o.id === maleLookState.outfit)?.shortLabel || 'Áo dài'})
              </span>
              <span className="sm:hidden">NAM</span>
            </button>
          </div>

          {/* Quick Initial Wizard Re-open Button */}
          <button
            type="button"
            onClick={() => {
              setWizardStep(1);
              setShowPrepWizard(true);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-[#DACBB7] hover:border-[#991B1E] text-[#991B1E] text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs hover:shadow-xs cursor-pointer"
            title="Đổi ngày mặc & bối cảnh để nhận gợi ý mới"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
            <span className="hidden sm:inline">Gợi ý mới</span>
          </button>
        </div>
      </div>

      {/* Suggestion Toast Notification */}
      {suggestionToast && (
        <div className="relative z-30 w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-2">
          <div className="p-3 px-4 rounded-xl bg-gradient-to-r from-[#991B1E] via-[#781316] to-[#59151A] text-white text-xs font-medium shadow-md flex items-center justify-between gap-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{suggestionToast}</span>
            </div>
            <button
              onClick={() => setSuggestionToast(null)}
              className="p-1 rounded-md hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          MAIN 3-ZONE STUDIO WORKSPACE
          - Left Panel: Kho Trang Phục (Sắp xếp theo Dịp & Phong Cách) + Màu Sắc
          - Center Section: 3D Character Mannequin Canvas
          - Right Panel: Kho Phụ Kiện
         ===================================================================== */}
      <div className="relative z-10 flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-5 lg:gap-6">
        {/* -------------------------------------------------------------------
            LEFT PANEL: DANH SÁCH TRANG PHỤC VIỆT PHỤC
           ------------------------------------------------------------------- */}
        <aside
          aria-label="Danh sách trang phục Việt phục"
          className="w-full lg:w-[28%] lg:min-w-[285px] lg:max-w-[340px] order-2 lg:order-1 h-fit max-h-[720px] flex flex-col rounded-2xl bg-[#FAF7F2]/75 backdrop-blur-md border border-[#D8C7B2]/80 shadow-[0_8px_24px_rgba(28,25,23,0.05)] p-4 transition-all"
        >
          <div className="pb-3 mb-3 border-b border-[#E5D7C5] flex items-baseline justify-between shrink-0">
            <h2 className="font-serif text-base font-bold text-[#1C1917]">
              Việt Phục
            </h2>
            <span className="text-xs text-[#7A695B] tabular-nums">
              {filteredStudioOutfits.length} trang phục
            </span>
          </div>

          {/* COMPACT OUTFIT COLOR PICKER (UPDATES PER SELECTED OUTFIT) */}
          {selectedOutfitId && (
            <div
              id="outfit-color-picker"
              className="mb-3 p-2.5 rounded-xl bg-[#FFFDF9]/90 border border-[#DECBB3] shadow-2xs shrink-0 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Palette className="w-3.5 h-3.5 text-[#991B1E] shrink-0" />
                  <span className="text-[11px] font-bold text-[#1C1917] truncate">
                    Màu vải: {activeOutfitObj.name}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#991B1E] bg-[#991B1E]/10 px-2 py-0.5 rounded-full truncate shrink-0">
                  <span
                    className="w-2 h-2 rounded-full border border-black/15 shrink-0"
                    style={{ backgroundColor: activeColorObj.hex }}
                  />
                  {activeColorObj.nameVi.split(' / ')[0]}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {activeOutfitColors.map((colorItem) => {
                  const isColorSelected = selectedColorId === colorItem.id;
                  const isLightSwatch = colorItem.id === 'cream' || colorItem.id === 'pastel';

                  return (
                    <button
                      key={colorItem.id}
                      type="button"
                      onClick={() => handleSelectColor(colorItem.id)}
                      title={`${colorItem.nameVi} — ${colorItem.culturalMeaning}`}
                      aria-label={`Chọn màu ${colorItem.nameVi} cho ${activeOutfitObj.name}`}
                      className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer ${
                        isColorSelected
                          ? 'ring-2 ring-[#991B1E] ring-offset-1 ring-offset-[#FFFDF9] scale-110 shadow-xs'
                          : 'hover:scale-110 opacity-90 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: colorItem.hex,
                        border: `1px solid ${colorItem.borderHex || 'rgba(28,25,23,0.18)'}`
                      }}
                    >
                      {isColorSelected && (
                        <Check
                          className={`w-3 h-3 ${
                            isLightSwatch ? 'text-[#1C1917]' : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* AI Style Suggestion Quick Button */}
              <button
                type="button"
                onClick={handleRequestAiSuggestion}
                className="w-full mt-2 py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-[#FAF0E1] via-[#FFFDF9] to-[#FAF0E1] border border-[#E5D2BA] hover:border-[#991B1E] text-[#991B1E] text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-xs transition-all"
                title="Sử dụng Gemini AI để phân tích thời tiết và dịp, gợi ý màu sắc và phụ kiện chuẩn di sản"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
                <span>AI Gợi Ý Màu & Phụ Kiện Phù Hợp</span>
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto max-h-[620px] pr-1 grid grid-cols-2 gap-2.5">
            {filteredStudioOutfits.map((item) => {
              const isSelected = selectedOutfitId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectOutfit(item.id)}
                  className={`group relative rounded-xl p-2.5 text-left transition-all duration-200 cursor-pointer flex flex-col border ${
                    isSelected
                      ? 'bg-[#FFFDF9] border-[#991B1E] shadow-[0_4px_14px_rgba(153,27,30,0.14)] ring-1 ring-[#C8973E]/60'
                      : 'bg-[#FFFDF9]/50 border-[#DECBB3]/70 hover:bg-[#FFFDF9] hover:border-[#C8973E]'
                  }`}
                >
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-[#F4ECE0] mb-2 border border-[#E5D8C6]/70 flex items-center justify-center">
                    <img
                      src={activeGender === 'male' && item.maleImage ? item.maleImage : item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-contain object-center transition-transform duration-200 ${
                        isSelected
                          ? 'scale-100'
                          : 'group-hover:scale-[1.02] opacity-95 group-hover:opacity-100'
                      }`}
                    />
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#991B1E] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <span
                    className={`font-serif text-xs font-bold leading-snug truncate w-full ${
                      isSelected ? 'text-[#991B1E]' : 'text-[#1C1917]'
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[#7A695B] truncate w-full mt-0.5">
                    {item.era}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* -------------------------------------------------------------------
            CENTER MODEL CHARACTER SECTION: DYNAMIC 3D CANVAS & AVATAR
           ------------------------------------------------------------------- */}
        <div className="w-full lg:w-[46%] flex-1 order-1 lg:order-2 flex flex-col items-center justify-center min-h-[460px] sm:min-h-[540px] relative px-2">
          {/* Mode Switcher: 3D Canvas vs Default Character Avatar Portrait */}
          <div className="mb-2.5 inline-flex items-center gap-1 p-1 bg-[#EFE6D8]/80 rounded-xl border border-[#DACBB7] shadow-2xs z-10">
            <button
              type="button"
              onClick={() => setCenterViewMode('3d-canvas')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                centerViewMode === '3d-canvas'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#68584B] hover:text-[#1C1917]'
              }`}
            >
              <span>Mô hình 3D Toàn thân</span>
            </button>
            <button
              type="button"
              onClick={() => setCenterViewMode('avatar-portrait')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                centerViewMode === 'avatar-portrait'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#68584B] hover:text-[#1C1917]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
              <span>Avatar Chân dung ({gender === 'female' ? 'Nữ' : 'Nam'} • {activeOutfitObj.shortLabel})</span>
            </button>
          </div>

          {centerViewMode === '3d-canvas' ? (
            /* Main 3D Stylized Character Engine */
            <Stylized3DCharacter
              gender={gender}
              skinTone={skinTone}
              hairstyle={selectedHairstyleId}
              outfitId={selectedOutfitId}
              colorId={selectedColorId}
              accessories={selectedAccessories}
            />
          ) : (
            /* High-fidelity Close-up Default Character Avatar Portrait */
            <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-white/95 to-[#FAF5EE]/95 border border-[#DECBB3] shadow-lg p-5 sm:p-6 flex flex-col items-center text-center animate-in fade-in duration-300">
              <div className="relative mb-3">
                <CharacterDefaultAvatar
                  gender={gender}
                  skinTone={skinTone}
                  hairstyle={selectedHairstyleId}
                  outfitId={selectedOutfitId}
                  colorId={selectedColorId}
                  accessories={selectedAccessories}
                  size="hero"
                  className="drop-shadow-md"
                />
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#991B1E] text-white shadow-xs whitespace-nowrap">
                  {activeOutfitObj.name} • {activeColorObj.nameVi.split(' / ')[0]}
                </span>
              </div>

              <div className="mt-3 space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  {activeOutfitObj.vietnameseName}
                </h3>
                <p className="text-xs text-[#7A695B]">
                  Tông da: <span className="font-bold text-[#991B1E]">{activeSkinToneObj.nameVi}</span>
                  {' '}· Kiểu tóc: <span className="font-bold text-[#1C1917]">{activeHairstyleObj.name}</span>
                </p>
                <p className="text-[11px] text-[#6E5D50] leading-relaxed max-w-xs mx-auto pt-1">
                  {`${activeOutfitObj.desc} (${activeColorObj.nameVi.split(' / ')[0]}). ${activeHairstyleObj.description || ''}`}
                </p>
              </div>

              {/* Quick Cultural Highlight Bar */}
              <div className="mt-4 w-full grid grid-cols-2 gap-2 text-left">
                <div className="p-2.5 rounded-xl bg-[#F5EFE6]/70 border border-[#E5D7C5]">
                  <span className="text-[9px] font-bold uppercase text-[#991B1E] block">Sắc độ & Làn da</span>
                  <span className="text-xs font-semibold text-[#1C1917]">
                    {skinTone === 'fair' ? 'Sáng hồng tương phản' : skinTone === 'neutral' ? 'Hài hòa tự nhiên' : skinTone === 'warm' ? 'Ấm áp Á Đông' : 'Bánh mật khỏe khoắn'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F5EFE6]/70 border border-[#E5D7C5]">
                  <span className="text-[9px] font-bold uppercase text-[#C8973E] block">Trang phục đang chọn</span>
                  <span className="text-xs font-semibold text-[#1C1917]">
                    {activeOutfitObj.name}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setWizardStep(1);
                  setShowPrepWizard(true);
                }}
                className="mt-4 text-xs font-bold text-[#991B1E] hover:text-[#781316] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
                <span>Chọn lại ngày & dịp xuất hiện →</span>
              </button>
            </div>
          )}

          {/* Quick Cultural & Color Score Floating Pills */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#FFFDF9]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D5C6B3] shadow-xs text-xs">
              <ShieldCheck className="w-4 h-4 text-[#166534]" />
              <span className="text-[#45362E] font-medium">Văn hóa:</span>
              <span className="font-bold text-[#991B1E]">{currentCultureCheck.indicatorScore}/10</span>
              <span className="text-[#C8973E]">✦</span>
              <span className="text-[11px] text-[#6E5D50] truncate max-w-[140px] sm:max-w-none">
                {currentCultureCheck.statusText}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#FFFDF9]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D5C6B3] shadow-xs text-xs">
              <Palette className="w-3.5 h-3.5 text-[#C8973E]" />
              <span className="text-[#45362E] font-medium">Hòa sắc:</span>
              <span className="font-bold text-[#991B1E]">{colorHarmony.harmonyScore}/10</span>
              <span className="text-[#C8973E]">✦</span>
              <span className="text-[11px] text-[#6E5D50] truncate max-w-[150px] sm:max-w-none">
                {colorHarmony.isWithinLimit ? '✓ Chuẩn 3 màu' : '⚠️ Quá 3 màu'} • {activeSkinToneObj.nameVi.split(' / ')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            RIGHT GLASS PANEL: TÓC / KIỂU TÓC (HAIRSTYLE SELECTION) & KHO PHỤ KIỆN
           ------------------------------------------------------------------- */}
        <aside
          aria-label="Chọn kiểu tóc và kho phụ kiện"
          className="w-full lg:w-[26%] lg:min-w-[270px] lg:max-w-[320px] order-3 h-fit max-h-[720px] overflow-y-auto rounded-2xl bg-[#FAF7F2]/65 backdrop-blur-md border border-[#D8C7B2]/80 shadow-[0_8px_24px_rgba(28,25,23,0.05)] p-4 transition-all space-y-3.5"
        >
          {/* Right Panel Tab Switcher: Tất Cả / Kiểu Tóc / Phụ Kiện */}
          <div className="flex items-center gap-1 p-1 bg-[#EFE6D8]/70 rounded-xl border border-[#E0D2BF] shrink-0">
            <button
              type="button"
              onClick={() => setActiveRightTab('all')}
              className={`flex-1 py-1.5 px-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap truncate ${
                activeRightTab === 'all'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#68584B] hover:text-[#1C1917]'
              }`}
            >
              Tất Cả
            </button>
            <button
              type="button"
              onClick={() => setActiveRightTab('hair')}
              className={`flex-1 py-1.5 px-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap truncate ${
                activeRightTab === 'hair'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#68584B] hover:text-[#1C1917]'
              }`}
            >
              <Scissors className="w-3 h-3 text-[#C8973E] shrink-0" />
              <span>Kiểu Tóc</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveRightTab('accessories')}
              className={`flex-1 py-1.5 px-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap truncate ${
                activeRightTab === 'accessories'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#68584B] hover:text-[#1C1917]'
              }`}
            >
              Phụ Kiện ({selectedAccessories.length})
            </button>
          </div>

          {/* =================================================================
              SECTION 1: TÓC / KIỂU TÓC (HAIRSTYLE SELECTION)
             ================================================================= */}
          {(activeRightTab === 'all' || activeRightTab === 'hair') && (
            <div id="hairstyle-selection-section" className="space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2D4C0]/70">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#991B1E] block">
                    TÓC
                  </span>
                  <h2 className="font-serif text-sm sm:text-base font-bold text-[#1C1917] tracking-wide">
                    KIỂU TÓC
                  </h2>
                </div>
                <span className="text-xs font-bold text-[#991B1E] bg-[#991B1E]/10 px-2.5 py-0.5 rounded-full">
                  {activeHairstyleObj.name}
                </span>
              </div>

              {/* Hairstyles Thumbnail Buttons 2-Column Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
                {activeHairstylesList.map((hair) => (
                  <HairstyleOptionCard
                    key={hair.id}
                    item={hair as HairstyleOption}
                    isSelected={selectedHairstyleId === hair.id && hair.available}
                    onSelect={handleSelectHairstyle}
                  />
                ))}
              </div>

              <div className="p-2.5 rounded-xl bg-white/75 border border-[#E2D5C3] text-xs space-y-1">
                <div className="font-serif font-bold text-[#991B1E] flex items-center justify-between">
                  <span>{activeHairstyleObj.name}</span>
                  {activeHairstyleObj.subtitle && (
                    <span className="text-[10px] font-sans font-semibold text-[#7A695B] bg-[#EFE6D8] px-2 py-0.5 rounded-full">
                      {activeHairstyleObj.subtitle}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#594C42] leading-relaxed">
                  {activeHairstyleObj.description}
                </p>
              </div>
            </div>
          )}

          {/* =================================================================
              SECTION 2: KHO PHỤ KIỆN & GỢI Ý TỰ ĐỘNG THEO TRANG PHỤC
             ================================================================= */}
          {(activeRightTab === 'all' || activeRightTab === 'accessories') && (
            <div className={activeRightTab === 'all' ? 'pt-2 border-t border-[#E2D4C0]/70 space-y-3' : 'space-y-3'}>
              {/* Panel Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E2D4C0]/70">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#991B1E] block">
                    KHO PHỤ KIỆN
                  </span>
                  <h2 className="font-serif text-sm sm:text-base font-bold text-[#1C1917] tracking-wide">
                    TRANG SỨC & NÓN
                  </h2>
                </div>
                <span className="text-xs font-bold text-[#991B1E] bg-[#991B1E]/10 px-2.5 py-0.5 rounded-full">
                  {selectedAccessories.length} đã mặc
                </span>
              </div>

              {/* RECOMMENDATION BOX BY SELECTED TRADITIONAL OUTFIT */}
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#FFFDF9] to-[#F6EFE4] border border-[#D8C2A6] shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Wand2 className="w-3.5 h-3.5 text-[#991B1E] shrink-0" />
                  <span className="text-[11px] font-bold text-[#991B1E] truncate">
                    Gợi ý chuẩn: {activeOutfitObj.name}
                  </span>
                </div>

                {/* Cultural & Aesthetic Rationale */}
                <p className="text-[11px] text-[#594C42] leading-relaxed">
                  {outfitAccessoryRec.culturalRationale}
                </p>

                {/* Recommended Primary Set Chips */}
                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                  {primarySuggestedSet.map((accId) => {
                    const accObj = STUDIO_ACCESSORIES.find((a) => a.id === accId);
                    if (!accObj) return null;
                    const isEquipped = selectedAccessories.includes(accId);
                    return (
                      <span
                        key={accId}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                          isEquipped
                            ? 'bg-[#166534]/10 text-[#166534] border-[#166534]/30'
                            : 'bg-white/80 text-[#68584B] border-[#DECBB3]'
                        }`}
                      >
                        {isEquipped && <Check className="w-2.5 h-2.5" />}
                        <span>{accObj.name}</span>
                      </span>
                    );
                  })}
                </div>

                {/* Action Button: Apply Standard Set or Confirmed Status */}
                <div className="pt-1 flex items-center justify-between gap-2">
                  {isWearingPrimarySet ? (
                    <div className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Đang diện bộ phụ kiện chuẩn văn hóa</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApplyRecommendedAccessories}
                      className="w-full py-1.5 px-2.5 rounded-lg bg-[#991B1E] hover:bg-[#781316] text-white text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Sparkles className="w-3 h-3 text-[#F3C66F]" />
                      <span>Áp dụng bộ chuẩn cho {activeOutfitObj.shortLabel}</span>
                    </button>
                  )}
                </div>

                {/* Secondary AI Suggestion Trigger in Accessories */}
                <button
                  type="button"
                  onClick={handleRequestAiSuggestion}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-[#FAF0E1] via-[#FFFDF9] to-[#FAF0E1] border border-[#E5D2BA] hover:border-[#991B1E] text-[#991B1E] text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs"
                >
                  <Sparkles className="w-3 h-3 text-[#C8973E]" />
                  <span>AI Gợi Ý Phụ Kiện Theo Thời Tiết & Dịp</span>
                </button>

                {autoAppliedNotice && (
                  <div className="text-[10px] text-[#166534] font-medium flex items-center justify-between pt-1 border-t border-[#E8DAC7]/80">
                    <span className="truncate">{autoAppliedNotice}</span>
                    <button
                      type="button"
                      onClick={() => setAutoAppliedNotice(null)}
                      className="text-[#7A695B] hover:text-[#1C1917] ml-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* CULTURAL ETIQUETTE WARNING IF USER SELECTS INCOMPATIBLE ACCESSORY */}
              {mismatchedAccessoryIds.length > 0 && (
                <div className="p-2.5 rounded-xl bg-amber-50/95 border border-amber-300 text-amber-950 space-y-1.5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Lưu ý chuẩn mực văn hóa</span>
                  </div>
                  <p className="text-[10px] text-amber-900/90 leading-relaxed">
                    {outfitAccessoryRec.avoidReasons[mismatchedAccessoryIds[0]] ||
                      'Phụ kiện đang chọn chưa đồng bộ với niên đại và lễ nghi của trang phục này.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleRemoveMismatchedAccessories}
                    className="w-full py-1 px-2 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    Gỡ phụ kiện lệch chuẩn
                  </button>
                </div>
              )}

              {/* Accessories 2-Column Grid (Sorted so recommended items appear prominently) */}
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                {[...STUDIO_ACCESSORIES]
                  .sort((a, b) => {
                    const aRec = outfitAccessoryRec.recommendedIds.includes(a.id) ? 1 : 0;
                    const bRec = outfitAccessoryRec.recommendedIds.includes(b.id) ? 1 : 0;
                    return bRec - aRec;
                  })
                  .map((acc) => {
                    const isSelected = selectedAccessories.includes(acc.id);
                    const isRecommended = outfitAccessoryRec.recommendedIds.includes(acc.id);
                    const isAvoid = outfitAccessoryRec.avoidIds.includes(acc.id);

                    return (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => {
                          setAutoAppliedNotice(null);
                          handleToggleAccessory(acc.id);
                        }}
                        title={
                          isAvoid
                            ? outfitAccessoryRec.avoidReasons[acc.id]
                            : isRecommended
                            ? `Phụ kiện chuẩn hợp với ${activeOutfitObj.name}`
                            : acc.name
                        }
                        className={`group relative rounded-xl p-2 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between border ${
                          isSelected
                            ? isAvoid
                              ? 'bg-amber-50/90 border-amber-600 shadow-xs ring-1 ring-amber-400'
                              : 'bg-[#FFFDF9] border-[#991B1E] shadow-[0_4px_12px_rgba(153,27,30,0.14)] ring-1 ring-[#C8973E]/60'
                            : isRecommended
                            ? 'bg-[#FFFDF9]/85 border-[#C8973E]/80 hover:bg-[#FFFDF9] hover:border-[#991B1E]'
                            : 'bg-[#FFFDF9]/40 border-[#DECBB3]/70 hover:bg-[#FFFDF9]/80 hover:border-[#C8973E]'
                        }`}
                      >
                        <div className="w-full flex items-center justify-between mb-0.5 gap-1">
                          {isRecommended ? (
                            <span className="text-[8px] font-bold text-[#991B1E] bg-[#C8973E]/20 px-1.5 py-0.5 rounded-sm truncate">
                              ★ Gợi ý
                            </span>
                          ) : isAvoid ? (
                            <span className="text-[8px] font-semibold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded-sm truncate">
                              Kỵ phối
                            </span>
                          ) : (
                            <span className="text-[8px] text-[#7A695B] truncate">
                              {acc.category}
                            </span>
                          )}
                          <span
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                              isSelected
                                ? isAvoid
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-[#991B1E] text-white'
                                : 'border border-[#D0C2B0] bg-white/60 text-transparent'
                            }`}
                          >
                            <Check className="w-2 h-2" />
                          </span>
                        </div>

                        <div className="w-10 h-10 rounded-lg bg-[#EFE6D8]/60 border border-[#E5D8C6]/60 flex items-center justify-center my-0.5">
                          <AccessoryMiniGraphic type={acc.iconType} isSelected={isSelected} />
                        </div>

                        <span
                          className={`font-serif text-xs font-bold leading-tight mt-1 truncate max-w-full ${
                            isSelected ? 'text-[#991B1E]' : 'text-[#1C1917]'
                          }`}
                        >
                          {acc.shortLabel}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Quick Cultural Insight Card Link */}
          <div className="mt-3 pt-3 border-t border-[#E8DAC7]/70">
            <button
              type="button"
              onClick={() => setIsInsightOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-white/60 hover:bg-white border border-[#D8C7B2] text-xs font-semibold text-[#991B1E] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Xem Di Sản & Điển Tích</span>
            </button>
          </div>
        </aside>
      </div>

      {/* =====================================================================
          BOTTOM ACTION BAR: RESET, SUBMIT & EVALUATION
         ===================================================================== */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-5 pt-1">
        <div className="rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#D8C7B2]/80 shadow-[0_4px_20px_rgba(28,25,23,0.06)] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left Actions: Reset */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetStudio}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/80 hover:bg-white text-[#45362E] border border-[#DECBB3] text-xs font-semibold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mặc định</span>
            </button>
          </div>

          {/* Right Actions: Export Share Card, View Evaluation & Submit Look */}
          <div className="flex flex-wrap items-center gap-2.5 ml-auto">
            {/* Export Social Share Card Button */}
            <button
              type="button"
              onClick={() => setIsShareCardModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/95 hover:bg-white text-[#991B1E] border border-[#C8973E] text-xs font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              title="Xuất thẻ hình ảnh phối đồ để chia sẻ lên mạng xã hội"
            >
              <Download className="w-4 h-4 text-[#C8973E]" />
              <span>Xuất Thẻ Ảnh</span>
            </button>

            {/* View Evaluation Button */}
            <button
              type="button"
              onClick={() => setIsEvaluationModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/90 hover:bg-white text-[#1C1917] border border-[#D5C6B3] text-xs font-bold transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#166534]" />
              <span className="hidden sm:inline">Xem Đánh Giá Văn Hóa</span>
              <span className="sm:hidden">Đánh Giá</span>
            </button>

            {/* Submit Selection (Pop-up Confirmation) */}
            <button
              type="button"
              onClick={handleOpenSubmitModal}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#991B1E] hover:bg-[#781316] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#C8973E]" />
              <span>Nộp Phối Đồ</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LUỒNG BAN ĐẦU REMIX STUDIO: CHỌN NGÀY -> CHỌN DỊP -> GỢI Ý 1 TRANG PHỤC
         ===================================================================== */}
      {showPrepWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border border-[#D8C7B2] shadow-2xl p-5 sm:p-7 overflow-hidden max-h-[92vh] overflow-y-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8973E]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close / Skip button */}
            <button
              type="button"
              onClick={handleSelfRemixClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EAE0D2] text-[#6E5D50] transition-colors cursor-pointer"
              title="Đóng & Tự phối đồ"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Stepper Header */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#991B1E]/10 text-[#991B1E] text-[10px] font-bold uppercase tracking-widest mb-2 border border-[#991B1E]/15">
                <Sparkles className="w-3 h-3 text-[#991B1E]" />
                <span>GỢI Ý TRANG PHỤC BAN ĐẦU • BƯỚC {wizardStep}/2</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                {wizardStep === 1
                  ? 'Bạn muốn mặc Việt phục vào ngày nào?'
                  : 'Bạn dự định xuất hiện vào dịp nào?'}
              </h3>

              <p className="text-xs sm:text-sm text-[#68584B] mt-1 max-w-lg mx-auto leading-relaxed">
                {wizardStep === 1
                  ? 'Tự động phân tích thời tiết và nhiệt độ để gợi ý chất liệu và trang phục phù hợp nhất.'
                  : 'Chọn bối cảnh xuất hiện để hệ thống tự động chuẩn bị 1 bộ trang phục ban đầu trong Remix Studio.'}
              </p>

              {/* Step indicator pills */}
              <div className="flex items-center justify-center gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setWizardStep(1)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    wizardStep === 1
                      ? 'bg-[#991B1E] text-white shadow-xs'
                      : 'bg-[#EFE6D8] text-[#594B40] hover:bg-[#E5D7C3]'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>Ngày Mặc & Thời Tiết</span>
                </button>

                <div className="w-4 h-[2px] bg-[#DACBB7]" />

                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    wizardStep === 2
                      ? 'bg-[#991B1E] text-white shadow-xs'
                      : 'bg-[#EFE6D8] text-[#594B40] hover:bg-[#E5D7C3]'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Chọn Dịp Xuất Hiện</span>
                </button>
              </div>
            </div>

            {/* BƯỚC 1: CHỌN NGÀY & THÔNG TIN THỜI TIẾT */}
            {wizardStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Chọn Giới Tính */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1E] block mb-1.5">
                    1. CHỌN GIỚI TÍNH NGƯỜI MẪU
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setWizardGender('female')}
                      className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
                        wizardGender === 'female'
                          ? 'bg-white border-[#991B1E] shadow-xs ring-2 ring-[#991B1E]/20 text-[#991B1E] font-bold'
                          : 'bg-white/70 border-[#DECBB3] hover:bg-white text-[#52453B]'
                      }`}
                    >
                      <User className="w-4 h-4 text-[#991B1E]" />
                      <span className="text-xs sm:text-sm">Trang Phục Nữ</span>
                      {wizardGender === 'female' && <Check className="w-3.5 h-3.5 ml-auto text-[#991B1E]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setWizardGender('male')}
                      className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
                        wizardGender === 'male'
                          ? 'bg-white border-[#991B1E] shadow-xs ring-2 ring-[#991B1E]/20 text-[#991B1E] font-bold'
                          : 'bg-white/70 border-[#DECBB3] hover:bg-white text-[#52453B]'
                      }`}
                    >
                      <User className="w-4 h-4 text-[#991B1E]" />
                      <span className="text-xs sm:text-sm">Trang Phục Nam</span>
                      {wizardGender === 'male' && <Check className="w-3.5 h-3.5 ml-auto text-[#991B1E]" />}
                    </button>
                  </div>
                </div>

                {/* Chọn Ngày Mặc */}
                <div className="p-4 rounded-2xl bg-white border border-[#DECBB3] space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#991B1E]" />
                      <span>2. Ngày Dự Kiến Mặc</span>
                    </span>
                    <span className="text-[11px] font-semibold text-[#991B1E] bg-[#991B1E]/10 px-2.5 py-0.5 rounded-full">
                      {wizardFormattedDate}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'today', label: 'Hôm nay' },
                      { id: 'tomorrow', label: 'Ngày mai' },
                      { id: 'weekend', label: 'Cuối tuần' },
                      { id: 'custom', label: 'Chọn ngày khác' }
                    ].map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setWizardDateMode(preset.id as any)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all border text-center cursor-pointer ${
                          wizardDateMode === preset.id
                            ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-2xs'
                            : 'bg-[#FAF7F2] text-[#4A3E35] border-[#E5DACB] hover:bg-[#F2ECE0]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {wizardDateMode === 'custom' && (
                    <div className="pt-1">
                      <input
                        type="date"
                        value={wizardCustomDate}
                        onChange={(e) => setWizardCustomDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#DACBBA] bg-white text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#991B1E]"
                      />
                    </div>
                  )}
                </div>

                {/* Chọn Khu Vực */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#DECBB3] space-y-2">
                  <span className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#991B1E]" />
                    <span>3. Khu Vực / Địa Điểm</span>
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                    {VIETNAM_LOCATIONS.map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setWizardLocationId(loc.id)}
                        className={`p-2 rounded-xl text-left border text-[11px] transition-all cursor-pointer ${
                          wizardLocationId === loc.id
                            ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-2xs font-bold'
                            : 'bg-[#FAF7F2] text-[#4A3E35] border-[#E5DACB] hover:bg-[#F2ECE0]'
                        }`}
                      >
                        <div className="truncate">{loc.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hiển Thị Thông Tin Thời Tiết Tự Động */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F3EADE] border border-[#DECBB3] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5D7C3]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#991B1E] flex items-center gap-1.5">
                      <CloudSun className="w-3.5 h-3.5 text-[#C58B35]" />
                      <span>Thời Tiết Tự Động Đồng Bộ</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                      Khớp ngày {wizardTargetDate.getDate()}/{wizardTargetDate.getMonth() + 1}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
                        {wizardWeather.temp}°C
                      </div>
                      <div className="text-xs font-semibold text-[#52453B]">
                        {wizardWeather.condition} tại {wizardWeather.location}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div className="p-2 rounded-xl bg-white/80 border border-[#E8DEC0]">
                        <CloudRain className="w-3 h-3 text-blue-500 mx-auto mb-0.5" />
                        <span className="text-[#7A6B5F] block">Mưa</span>
                        <strong className="text-[#1C1917]">{wizardWeather.rainProbability}%</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-white/80 border border-[#E8DEC0]">
                        <Droplets className="w-3 h-3 text-sky-500 mx-auto mb-0.5" />
                        <span className="text-[#7A6B5F] block">Độ ẩm</span>
                        <strong className="text-[#1C1917]">{wizardWeather.humidity}%</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-white/80 border border-[#E8DEC0]">
                        <Wind className="w-3 h-3 text-teal-500 mx-auto mb-0.5" />
                        <span className="text-[#7A6B5F] block">Gió</span>
                        <strong className="text-[#1C1917]">{wizardWeather.windSpeed}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FAF0E1] text-[11px] text-[#524338] border border-[#E5D2BA] leading-relaxed">
                    <strong className="text-[#7A4B15]">Gợi ý phối vải:</strong> {wizardWeather.clothingAdvice}
                  </div>
                </div>

                {/* Footer Controls Step 1 */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleSelfRemixClose}
                    className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#68584B] hover:text-[#1C1917] hover:bg-[#EAE0D2] transition-colors cursor-pointer"
                  >
                    Tự phối đồ (Bỏ qua gợi ý)
                  </button>

                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#991B1E] hover:bg-[#781316] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Tiếp tục: Chọn Dịp (Bước 2)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* BƯỚC 2: CHỌN DỊP (10 DỊP CHUẨN) */}
            {wizardStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Tóm tắt Bước 1 */}
                <div className="p-3 rounded-2xl bg-[#F4ECE0] border border-[#E0D2C0] flex items-center justify-between text-xs text-[#4A3E35]">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold text-[#991B1E]">{wizardGender === 'female' ? 'Nữ' : 'Nam'}</span>
                    <span>•</span>
                    <span>{wizardFormattedDate}</span>
                    <span>•</span>
                    <span>{wizardWeather.location} ({wizardWeather.temp}°C, {wizardWeather.condition})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="text-[#991B1E] font-bold hover:underline shrink-0 ml-2 cursor-pointer"
                  >
                    Đổi ngày
                  </button>
                </div>

                {/* Grid 10 Dịp Chuẩn */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 max-h-[46vh] overflow-y-auto p-1">
                  {OCCASIONS_DATA.map((occ) => {
                    const isSelected = wizardOccasion === occ.id;
                    return (
                      <div
                        key={occ.id}
                        onClick={() => setWizardOccasion(occ.id)}
                        className={`group cursor-pointer rounded-2xl p-3 border transition-all duration-200 flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-white border-[#991B1E] ring-2 ring-[#991B1E]/20 shadow-md scale-[1.02]'
                            : 'bg-white/70 border-[#E2D5C3] hover:border-[#C58B35] hover:bg-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#991B1E] text-white flex items-center justify-center shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-[#991B1E]/10' : 'bg-[#F2ECE0] group-hover:bg-[#FAF0E1]'
                            }`}
                          >
                            {occ.id === 'school' && <GraduationCap className="w-4 h-4 text-[#991B1E]" />}
                            {occ.id === 'work' && <Briefcase className="w-4 h-4 text-[#991B1E]" />}
                            {occ.id === 'tet' && <Flower2 className="w-4 h-4 text-[#991B1E]" />}
                            {occ.id === 'festival' && <Sparkles className="w-4 h-4 text-[#991B1E]" />}
                            {occ.id === 'wedding' && <HeartHandshake className="w-4 h-4 text-[#991B1E]" />}
                            {occ.id === 'photoshoot' && <Camera className="w-4 h-4 text-[#991B1E]" />}
                            {occ.id === 'cultural-event' && <Landmark className="w-4 h-4 text-[#991B1E]" />}
                            {occ.id === 'travel' && <Plane className="w-4 h-4 text-[#991B1E]" />}
                            {occ.id === 'casual' && <Coffee className="w-4 h-4 text-[#991B1E]" />}
                            {occ.id === 'other' && <Sparkle className="w-4 h-4 text-[#991B1E]" />}
                          </div>

                          <div>
                            <h4 className="font-serif text-xs sm:text-sm font-bold text-[#1C1917] group-hover:text-[#991B1E] transition-colors leading-tight">
                              {occ.nameVi}
                            </h4>
                            <span className="text-[9px] uppercase font-bold tracking-wider text-[#7A6B5F]">
                              {occ.name}
                            </span>
                          </div>

                          <p className="text-[10px] text-[#615247] line-clamp-2 leading-tight">
                            {occ.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Controls Step 2 */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E5DACB]">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#594C42] hover:text-[#1C1917] cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Quay lại</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSelfRemixClose}
                      className="px-3 py-2 text-xs font-medium text-[#7A6B5F] hover:text-[#1C1917] cursor-pointer"
                    >
                      Tự phối đồ
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyInitialSuggestion}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#991B1E] hover:bg-[#781316] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Tạo Gợi Ý & Mở Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          POP-UP 2: XÁC NHẬN NỘP PHỐI ĐỒ (CONFIRMATION MODAL)
         ===================================================================== */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#D8C7B2] shadow-2xl p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setIsConfirmModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EAE0D2] text-[#6E5D50] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-[#991B1E]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
                Xác Nhận Nộp Bộ Phối Đồ?
              </h3>
              <p className="text-xs text-[#68584B] mt-1">
                Bạn có chắc chắn muốn nộp và lưu lại bộ trang phục này vào Lookbook cá nhân không?
              </p>
            </div>

            {/* Recap Summary Box */}
            <div className="rounded-2xl bg-white border border-[#E0D2BF] p-4 mb-6 space-y-2.5">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0E5D5]">
                <span className="text-[#6E5D50]">Giới tính & Tông da:</span>
                <span className="font-bold text-[#1C1917] flex items-center gap-2">
                  <CharacterDefaultAvatar
                    gender={gender}
                    skinTone={skinTone}
                    hairstyle={selectedHairstyleId}
                    outfitId={selectedOutfitId}
                    colorId={selectedColorId}
                    accessories={selectedAccessories}
                    size="xs"
                  />
                  <span>{gender === 'female' ? 'Nữ' : 'Nam'} ({activeHairstyleObj.name})</span>
                  <span className="text-[#C8973E]">✦</span>
                  <span
                    className="w-3 h-3 rounded-full inline-block border border-black/10"
                    style={{ backgroundColor: activeSkinToneObj.sampleHex }}
                  />
                  <span>{activeSkinToneObj.nameVi.split(' / ')[0]}</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0E5D5]">
                <span className="text-[#6E5D50]">Trang phục đã chọn:</span>
                <span className="font-serif font-bold text-[#991B1E]">
                  {activeOutfitObj.vietnameseName}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0E5D5]">
                <span className="text-[#6E5D50]">Màu sắc chủ đạo:</span>
                <span className="font-bold flex items-center gap-1.5 text-[#1C1917]">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block border border-black/10"
                    style={{ backgroundColor: activeColorObj.hex }}
                  />
                  {activeColorObj.nameVi}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0E5D5]">
                <span className="text-[#6E5D50]">Phụ kiện đi kèm:</span>
                <span className="font-medium text-[#1C1917]">
                  {selectedAccessories.length > 0
                    ? `${selectedAccessories.length} món (${selectedAccessories.join(', ')})`
                    : 'Không đeo phụ kiện (Tối giản)'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0E5D5]">
                <span className="text-[#6E5D50]">Hòa sắc thời trang:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {colorHarmony.harmonyScore}/10 • {colorHarmony.isWithinLimit ? 'Chuẩn 3 màu' : 'Quá 3 màu'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#6E5D50]">Điểm văn hóa sơ bộ:</span>
                <span className="font-bold text-[#166534] bg-[#166534]/10 px-2 py-0.5 rounded-md">
                  {currentCultureCheck.indicatorScore}/10 — {currentCultureCheck.statusText}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="py-3 rounded-xl border border-[#D5C6B3] bg-white text-[#4A3E34] text-xs sm:text-sm font-bold transition-all hover:bg-[#F5EFE6] cursor-pointer"
              >
                Chỉnh sửa thêm
              </button>
              <button
                type="button"
                onClick={handleConfirmSave}
                className="py-3 rounded-xl bg-[#991B1E] hover:bg-[#781316] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                Xác nhận & Lưu lại ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          POP-UP 3: ĐÁNH GIÁ CÁCH PHỐI ĐỒ (EVALUATION MODAL)
         ===================================================================== */}
      {isEvaluationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF7F2] rounded-3xl border border-[#D8C7B2] shadow-2xl p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setIsEvaluationModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EAE0D2] text-[#6E5D50] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Evaluation Header */}
            <div className="text-center mb-6">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#166534] bg-[#166534]/10 px-3 py-1 rounded-full mb-2">
                KẾT QUẢ ĐÁNH GIÁ PHỐI ĐỒ
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                Bản Đánh Giá Di Sản & Hòa Sắc
              </h3>
              <p className="text-xs sm:text-sm text-[#68584B] mt-1">
                Phân tích dựa trên chuẩn mực di sản Việt Nam, quy luật phối màu thời trang và độ tôn da
              </p>
            </div>

            {/* Color Harmony Assessment Card */}
            <div className="mb-6 p-4 rounded-2xl bg-white border border-[#E0D2BF] shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0E5D5]">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#991B1E]" />
                  <span className="font-serif font-bold text-sm text-[#1C1917]">Đánh Giá Hòa Sắc & Tông Da</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {colorHarmony.harmonyScore}/10 Điểm
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${colorHarmony.isWithinLimit ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {colorHarmony.isWithinLimit ? '✓ Chuẩn 3 màu' : `⚠️ ${colorHarmony.totalColorCount} màu`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-[#FAF5EB] border border-[#EBE0D2]">
                  <span className="text-[10px] font-bold text-[#7A695B] uppercase block mb-1">
                    Tương thích Tông Da ({activeSkinToneObj.nameVi.split(' / ')[0]}):
                  </span>
                  <p className="text-[#594C42] leading-relaxed">
                    {colorHarmony.skinToneFeedback}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF5EB] border border-[#EBE0D2]">
                  <span className="text-[10px] font-bold text-[#7A695B] uppercase block mb-1">
                    Quy Tắc 3 Màu & Phân Bổ (60-30-10):
                  </span>
                  <p className="text-[#594C42] leading-relaxed">
                    {colorHarmony.limitAdvice}
                  </p>
                </div>
              </div>
            </div>

            {/* Culture Check Card Integration */}
            <CultureCheckCard data={currentCultureCheck} className="mb-6" />

            {/* Action Bottom */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E5D7C5]">
              <button
                type="button"
                onClick={() => setIsEvaluationModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-[#D5C6B3] bg-white text-[#4A3E34] text-xs font-bold transition-all hover:bg-[#F5EFE6] cursor-pointer"
              >
                Tiếp tục chỉnh sửa
              </button>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsEvaluationModalOpen(false);
                    setIsShareCardModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-[#C8973E] bg-white hover:bg-[#FAF5EB] text-[#991B1E] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#C8973E]" />
                  <span>Xuất Thẻ Ảnh Chia Sẻ</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEvaluationModalOpen(false);
                    onCreateLook();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#991B1E] hover:bg-[#781316] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  Xem Tổng Thể Kết Quả (Lookbook) →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Share Card Export Modal */}
      <SocialShareCardModal
        isOpen={isShareCardModalOpen}
        onClose={() => setIsShareCardModalOpen(false)}
        lookState={{
          gender,
          skinTone,
          hairstyle: selectedHairstyleId,
          outfit: selectedOutfitId,
          color: selectedColorId,
          occasion: selectedOccasionId,
          style: selectedStyleId,
          accessories: selectedAccessories
        }}
      />

      {/* Cultural Insight Popover */}
      <CulturalInsightPopover
        isOpen={isInsightOpen}
        onClose={() => setIsInsightOpen(false)}
        lookState={currentLook}
        initialTab="outfit"
      />

      {/* =====================================================================
          AI STYLE SUGGESTION MODAL (GEMINI ANALYZES WEATHER & OCCASION)
         ===================================================================== */}
      {showAiSuggestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl border border-[#D8C7B2] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#991B1E]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#C8973E]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="relative z-10 p-5 sm:p-6 pb-4 border-b border-[#E5DACB] flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#991B1E]/15 to-[#C8973E]/20 text-[#991B1E] text-[11px] font-bold uppercase tracking-wider border border-[#991B1E]/20">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8973E] animate-pulse" />
                  <span>AI Style Suggestion • Trợ Lý Phối Đồ Di Sản</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                  Gợi Ý Phong Cách Phối Đồ AI
                </h3>
                <p className="text-xs text-[#7A695B]">
                  Phân tích bởi Gemini AI dựa trên vi khí hậu thời tiết và dịp xuất hiện
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAiSuggestionModal(false)}
                className="p-2 rounded-xl text-[#7A695B] hover:text-[#1C1917] hover:bg-[#EAE0D1] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Analyzed Context Banner */}
            <div className="relative z-10 px-5 sm:px-6 py-2.5 bg-[#F2EAE0]/70 border-b border-[#E5DACB] flex flex-wrap items-center justify-between gap-2 text-xs text-[#4A3E35]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[#991B1E]">Bối cảnh:</span>
                <span>{activeOutfitObj.vietnameseName} ({activeGender === 'male' ? 'Nam' : 'Nữ'})</span>
                <span>•</span>
                <span className="font-semibold text-[#1C1917]">
                  {OCCASIONS_DATA.find((o) => o.id === selectedOccasionId)?.nameVi || 'Dịp xuất hiện'}
                </span>
                {localPrepContext?.locationName && (
                  <>
                    <span>•</span>
                    <span>
                      {localPrepContext.locationName}
                      {localPrepContext.weather && ` (${localPrepContext.weather.temp}°C, ${localPrepContext.weather.condition})`}
                    </span>
                  </>
                )}
              </div>
              {aiSuggestionResult?.sourceType === 'gemini-ai' && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Gemini 3.8 Flash
                </span>
              )}
            </div>

            {/* Modal Body */}
            <div className="relative z-10 p-5 sm:p-6 overflow-y-auto space-y-4">
              {isLoadingAiSuggestion ? (
                <div className="py-12 space-y-5 text-center">
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#991B1E] to-[#C8973E] animate-spin opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-[#991B1E] animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg font-bold text-[#1C1917]">
                      AI Đang Phân Tích & Phối Đồ...
                    </h4>
                    <p className="text-xs text-[#7A695B] max-w-sm mx-auto">
                      Đang đối chiếu thời tiết tại {localPrepContext?.locationName || 'địa phương'} cùng chuẩn mực di sản cho {activeOutfitObj.vietnameseName}...
                    </p>
                  </div>
                </div>
              ) : aiSuggestionResult ? (
                <>
                  {/* Card 1: Gợi ý phối màu sắc */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2D5C3] shadow-2xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0E5D5]">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-[#991B1E]" />
                        <h4 className="font-serif text-sm sm:text-base font-bold text-[#1C1917]">
                          Gợi Ý Phối Màu Vải
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1E] bg-[#991B1E]/10 px-2.5 py-0.5 rounded-full border border-[#991B1E]/20">
                        Màu Khuyên Dùng
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#FAF6EE] border border-[#EBE0D0]">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-8 h-8 rounded-full border-2 border-white shadow-xs shrink-0"
                          style={{
                            backgroundColor:
                              COLORS_DATA.find((c) => c.id === aiSuggestionResult.suggestedColorId)?.hex || '#F5EFE6'
                          }}
                        />
                        <div>
                          <div className="font-serif text-sm font-bold text-[#1C1917]">
                            {aiSuggestionResult.suggestedColorName}
                          </div>
                          <div className="text-[11px] text-[#7A695B]">
                            {COLORS_DATA.find((c) => c.id === aiSuggestionResult.suggestedColorId)?.culturalMeaning || ''}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleApplyAiColor(aiSuggestionResult.suggestedColorId)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                          selectedColorId === aiSuggestionResult.suggestedColorId
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#991B1E] hover:bg-[#781316] text-white'
                        }`}
                      >
                        {selectedColorId === aiSuggestionResult.suggestedColorId ? '✓ Đang mặc' : 'Áp dụng màu'}
                      </button>
                    </div>

                    <p className="text-xs text-[#524338] leading-relaxed">
                      {aiSuggestionResult.colorRationale}
                    </p>
                  </div>

                  {/* Card 2: Gợi ý phụ kiện */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2D5C3] shadow-2xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0E5D5]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#C8973E]" />
                        <h4 className="font-serif text-sm sm:text-base font-bold text-[#1C1917]">
                          Gợi Ý Tuyển Chọn Phụ Kiện
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8973E] bg-[#C8973E]/10 px-2.5 py-0.5 rounded-full border border-[#C8973E]/20">
                        {aiSuggestionResult.suggestedAccessories.length} Phụ Kiện
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {aiSuggestionResult.suggestedAccessories.map((accId) => {
                        const accObj = ACCESSORIES_DATA.find((a) => a.id === accId);
                        const isEquipped = selectedAccessories.includes(accId);
                        return (
                          <div
                            key={accId}
                            className={`p-2.5 rounded-xl border flex items-center justify-between gap-2.5 flex-1 min-w-[180px] ${
                              isEquipped
                                ? 'bg-[#FAF6EE] border-[#C8973E]/50'
                                : 'bg-[#FAF8F5] border-[#E8DEC0]'
                            }`}
                          >
                            <div>
                              <div className="text-xs font-bold text-[#1C1917]">
                                {accObj?.name || accId}
                              </div>
                              <div className="text-[10px] text-[#7A695B]">
                                {accObj?.description || ''}
                              </div>
                            </div>
                            {isEquipped && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                                ✓ Đã chọn
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-xs text-[#524338] leading-relaxed">
                      {aiSuggestionResult.accessoriesRationale}
                    </p>

                    <div className="pt-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleApplyAiAccessories(aiSuggestionResult.suggestedAccessories)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#FAF0E1] hover:bg-[#F3E5D0] text-[#7A4B15] border border-[#E5D2BA] text-xs font-bold cursor-pointer transition-colors"
                      >
                        Áp dụng riêng phụ kiện này
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Lời khuyên Stylist & Mẹo thời tiết */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF0E1]/80 via-[#FFFDF9] to-[#FAF0E1]/80 border border-[#E5D2BA] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#7A4B15]">
                      <Compass className="w-3.5 h-3.5 text-[#C8973E]" />
                      <span>Lời Khuyên Từ AI Stylist:</span>
                    </div>
                    <p className="text-xs text-[#524338] italic leading-relaxed">
                      "{aiSuggestionResult.overallAdvice}"
                    </p>
                    {aiSuggestionResult.weatherAdaptationTip && (
                      <div className="text-[11px] font-semibold text-[#991B1E] pt-1">
                        💡 {aiSuggestionResult.weatherAdaptationTip}
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>

            {/* Modal Footer Actions */}
            <div className="relative z-10 p-5 sm:p-6 pt-3 border-t border-[#E5DACB] bg-[#FAF7F2] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRequestAiSuggestion}
                disabled={isLoadingAiSuggestion}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#DACBBA] hover:bg-[#F0E8DC] text-[#594C42] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
                <span>Tạo gợi ý khác</span>
              </button>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setShowAiSuggestionModal(false)}
                  className="px-4 py-2.5 rounded-xl hover:bg-[#EAE0D1] text-[#594C42] text-xs font-bold transition-colors cursor-pointer"
                >
                  Đóng
                </button>

                {aiSuggestionResult && (
                  <button
                    type="button"
                    onClick={handleApplyAllAiSuggestions}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#991B1E] via-[#781316] to-[#991B1E] hover:from-[#781316] hover:to-[#59151A] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Check className="w-4 h-4" />
                    <span>Áp Dụng Toàn Bộ Gợi Ý</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
