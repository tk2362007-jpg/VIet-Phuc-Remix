import { OutfitId, ColorId, StyleId, OccasionId } from '../types';

/**
 * ============================================================================
 * EXTENSIBLE CHARACTER CUSTOMIZATION ARCHITECTURE
 * ============================================================================
 * Character
 * ├── Gender
 * │   ├── Female ('female')
 * │   └── Male   ('male')
 * ├── Outfit
 * ├── Color
 * ├── Accessories
 * ├── Hair
 * └── Footwear
 */

export type CharacterGender = 'female' | 'male';

export interface CharacterOutfitConfig {
  id: string;
  mappedOutfitId: OutfitId; // Maps to global OutfitLookState.outfit for Result/Lookbook compatibility
  name: string;
  gender: CharacterGender | 'unisex';
  tunicLabel: string;
  pantsLabel: string;
  tunicPrimaryHex: string;
  tunicShadeHex: string;
  tunicHighlightHex: string;
  collarTrimHex: string;
  pantsPrimaryHex: string;
  pantsShadeHex: string;
  description: string;
  modelLayerPath: string;
}

export interface CharacterColorConfig {
  id: ColorId;
  name: string;
  hex: string;
  shadeHex: string;
  highlightHex: string;
}

export interface CharacterHairConfig {
  id: string;
  name: string;
  gender: CharacterGender;
  primaryHex: string;
  highlightHex: string;
  modelLayerPath: string;
}

export interface CharacterFootwearConfig {
  id: string;
  name: string;
  gender: CharacterGender | 'unisex';
  primaryHex: string;
  accentHex: string;
  modelLayerPath: string;
}

export interface CharacterAccessoryConfig {
  id: string;
  name: string;
  slot: 'head' | 'neck' | 'hand';
  modelLayerPath: string;
}

export interface CharacterCustomizationState {
  gender: CharacterGender;
  outfitId: string;
  colorId: ColorId;
  pantsColorHex: string;
  hairId: string;
  footwearId: string;
  accessoryIds: string[];
}

export interface CharacterPresetProfile {
  gender: CharacterGender;
  labelVi: string;
  labelEn: string;
  badge: string;
  defaultLookName: string;
  defaultLookSubtitle: string;
  description: string;
  defaultState: CharacterCustomizationState;
  mappedLookState: {
    outfit: OutfitId;
    color: ColorId;
    style: StyleId;
    occasion: OccasionId;
    accessories: string[];
  };
}

/**
 * Modular Hair Registry (Ready for future expansion)
 */
export const CHARACTER_HAIRS: Record<string, CharacterHairConfig> = {
  long: {
    id: 'long',
    name: 'Tóc dài',
    gender: 'female',
    primaryHex: '#151318',
    highlightHex: '#332E3A',
    modelLayerPath: '/hair/female/female-hair-long.png'
  },
  bun: {
    id: 'bun',
    name: 'Tóc búi',
    gender: 'female',
    primaryHex: '#151318',
    highlightHex: '#332E3A',
    modelLayerPath: '/hair/female/female-hair-bun.png'
  },
  braid: {
    id: 'braid',
    name: 'Tóc tết',
    gender: 'female',
    primaryHex: '#151318',
    highlightHex: '#332E3A',
    modelLayerPath: '/hair/female/female-hair-braid.png'
  },
  short: {
    id: 'short',
    name: 'Tóc ngắn',
    gender: 'female',
    primaryHex: '#151318',
    highlightHex: '#332E3A',
    modelLayerPath: '/hair/female/female-hair-short.png'
  },
  'female-long-silk': {
    id: 'female-long-silk',
    name: 'Tóc dài suôn mượt tự nhiên',
    gender: 'female',
    primaryHex: '#151318',
    highlightHex: '#332E3A',
    modelLayerPath: '/hair/female/female-hair-long.png'
  },
  'male-modern-parted': {
    id: 'male-modern-parted',
    name: 'Tóc nam rẽ ngôi lịch lãm',
    gender: 'male',
    primaryHex: '#181311',
    highlightHex: '#382C26',
    modelLayerPath: '/models/hair/male-modern-parted.glb'
  }
};

/**
 * Modular Outfit Registry (Separated from character base body)
 */
export const CHARACTER_OUTFITS: Record<string, CharacterOutfitConfig> = {
  'female-white-ao-dai': {
    id: 'female-white-ao-dai',
    mappedOutfitId: 'ao-dai',
    name: 'Áo dài trắng',
    gender: 'female',
    tunicLabel: 'Áo dài trắng lụa tơ tằm',
    pantsLabel: 'Quần lụa trắng ống rộng',
    tunicPrimaryHex: '#FAF8F5',
    tunicShadeHex: '#E5DEC9',
    tunicHighlightHex: '#FFFFFF',
    collarTrimHex: '#D8CEBE',
    pantsPrimaryHex: '#F3EFE6',
    pantsShadeHex: '#DDD3C2',
    description:
      'Áo dài trắng truyền thống đứng chính diện toàn thân, cổ cao thanh lịch, tôn vinh vẻ đẹp tinh khôi Việt Nam.',
    modelLayerPath: '/models/outfits/female-white-ao-dai.glb'
  },
  'male-black-ao-dai': {
    id: 'male-black-ao-dai',
    mappedOutfitId: 'ao-dai',
    name: 'Áo dài đen + Quần trắng',
    gender: 'male',
    tunicLabel: 'Áo dài đen cổ lập lĩnh',
    pantsLabel: 'Quần lụa trắng truyền thống',
    tunicPrimaryHex: '#1E1B18',
    tunicShadeHex: '#110F0D',
    tunicHighlightHex: '#3A342E',
    collarTrimHex: '#C8973E',
    pantsPrimaryHex: '#FAF8F5',
    pantsShadeHex: '#E2D9C8',
    description:
      'Áo dài nam sắc đen thạch mặc uy nghiêm phối cùng quần lụa trắng tương phản chuẩn mực cổ truyền.',
    modelLayerPath: '/models/outfits/male-black-ao-dai.glb'
  }
};

/**
 * Modular Footwear Registry
 */
export const CHARACTER_FOOTWEAR: Record<string, CharacterFootwearConfig> = {
  'female-pearl-heels': {
    id: 'female-pearl-heels',
    name: 'Guốc / Sandal trắng thanh lịch',
    gender: 'female',
    primaryHex: '#F5EFE6',
    accentHex: '#C8973E',
    modelLayerPath: '/models/footwear/female-pearl-heels.glb'
  },
  'male-classic-shoes': {
    id: 'male-classic-shoes',
    name: 'Giày đen cổ điển',
    gender: 'male',
    primaryHex: '#181512',
    accentHex: '#C8973E',
    modelLayerPath: '/models/footwear/male-classic-shoes.glb'
  }
};

/**
 * Default Character Presets for the Remix Studio Demo:
 * 1. NỮ (Default selected): Female character wearing White Áo Dài
 * 2. NAM: Male character wearing Black Áo Dài + White Pants
 */
export const DEFAULT_CHARACTER_PRESETS: Record<
  CharacterGender,
  CharacterPresetProfile
> = {
  female: {
    gender: 'female',
    labelVi: 'NỮ',
    labelEn: 'FEMALE',
    badge: 'DEFAULT · NỮ VIỆT NAM',
    defaultLookName: 'Áo dài trắng',
    defaultLookSubtitle: 'Áo dài lụa trắng · Quần lụa trắng',
    description:
      'Nhân vật nữ Việt Nam mặc áo dài trắng tinh khôi, phom dáng truyền thống kết hợp nét hiện đại.',
    defaultState: {
      gender: 'female',
      outfitId: 'female-white-ao-dai',
      colorId: 'cream',
      pantsColorHex: '#F3EFE6',
      hairId: 'female-long-silk',
      footwearId: 'female-pearl-heels',
      accessoryIds: []
    },
    mappedLookState: {
      outfit: 'ao-dai',
      color: 'cream',
      style: 'modern',
      occasion: 'festival',
      accessories: ['sandal-day-manh']
    }
  },
  male: {
    gender: 'male',
    labelVi: 'NAM',
    labelEn: 'MALE',
    badge: 'DEFAULT · NAM VIỆT NAM',
    defaultLookName: 'Áo dài đen + Quần trắng',
    defaultLookSubtitle: 'Áo dài đen cổ lập lĩnh · Quần lụa trắng',
    description:
      'Nhân vật nam Việt Nam mặc áo dài đen đĩnh đạc kết hợp quần trắng ống rộng truyền thống.',
    defaultState: {
      gender: 'male',
      outfitId: 'male-black-ao-dai',
      colorId: 'black',
      pantsColorHex: '#FAF8F5',
      hairId: 'male-modern-parted',
      footwearId: 'male-classic-shoes',
      accessoryIds: []
    },
    mappedLookState: {
      outfit: 'ao-dai',
      color: 'black',
      style: 'traditional',
      occasion: 'festival',
      accessories: []
    }
  }
};
