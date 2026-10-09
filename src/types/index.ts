export type OutfitId =
  | 'ao-dai'
  | 'ao-tu-than'
  | 'ao-ngu-than'
  | 'ao-ba-ba'
  | 'ao-nhat-binh'
  | 'ao-tac'
  | 'ao-tay-chen'
  | 'giao-linh'
  | 'vien-linh'
  | 'doi-kham';

export type OccasionId =
  | 'casual'
  | 'school'
  | 'work'
  | 'tet'
  | 'festival'
  | 'wedding'
  | 'photoshoot'
  | 'cultural-event'
  | 'travel'
  | 'other';

export type StyleId =
  | 'traditional'
  | 'modern'
  | 'minimal'
  | 'elegant'
  | 'street'
  | 'romantic';

export type ColorId =
  | 'red'
  | 'burgundy'
  | 'cream'
  | 'yellow'
  | 'blue'
  | 'green'
  | 'black'
  | 'pastel';

export type AccessoryCategory = 'khan' | 'non' | 'tui' | 'trang-suc' | 'giay' | 'cam-tay';

export interface Outfit {
  id: OutfitId;
  name: string;
  vietnameseName: string;
  subtitle: string;
  era: string;
  gender: 'female' | 'male';
  description: string;
  context: string;
  features: string[];
  significance: string;
  whenAppropriate: string;
  image: string;
  maleImage?: string;
  placeholderComment: string;
  styles: StyleId[];
  colors: ColorId[];
  occasions: OccasionId[];
  cultureNote: string;
}

export interface Occasion {
  id: OccasionId;
  name: string;
  nameVi: string;
  description: string;
  vibe: string;
  icon: string;
}

export interface StyleOption {
  id: StyleId;
  name: string;
  nameVi: string;
  description: string;
  keywords: string[];
}

export interface ColorOption {
  id: ColorId;
  name: string;
  nameVi: string;
  hex: string;
  borderHex?: string;
  textColor: string;
  culturalMeaning: string;
}

export interface Accessory {
  id: string;
  category: AccessoryCategory;
  categoryName: string;
  name: string;
  type: 'traditional' | 'modern' | 'hybrid';
  description: string;
}

export type SkinToneId = 'fair' | 'neutral' | 'warm' | 'tan';

export type HairstyleId =
  | 'long'
  | 'bun'
  | 'braid'
  | 'short'
  | 'male-short'
  | 'male-bun'
  | 'male-ponytail'
  | 'male-parted'
  | 'male-half-up';

export interface HairstyleOption {
  id: HairstyleId;
  name: string;
  image: string;
  available: boolean;
  subtitle?: string;
  description?: string;
}

export type HairStyleId =
  | 'default_long'
  | 'traditional_bun'
  | 'short_bob'
  | 'braided_crown'
  | 'half_up_flowing'
  | 'scholar_parted';

export interface HairStyleOption {
  id: HairStyleId;
  name: string;
  shortLabel: string;
  category: string;
  eraOrVibe: string;
  recommendedGender: 'female' | 'male' | 'unisex';
  description: string;
}

export interface SkinToneOption {
  id: SkinToneId;
  name: string;
  nameVi: string;
  description: string;
  undertone: 'cool' | 'neutral' | 'warm' | 'deep-warm';
  sampleHex: string;
  recommendedColors: ColorId[];
  discouragedColors?: ColorId[];
  harmonyTip: string;
}

export interface OutfitLookState {
  gender?: 'female' | 'male';
  skinTone?: SkinToneId;
  hairstyle?: HairstyleId;
  occasion: OccasionId | '';
  outfit: OutfitId | '';
  style: StyleId | '';
  color: ColorId | '';
  accessories: string[];
  stylistRationale?: string;
}

export interface CultureCheckData {
  outfitName: string;
  retainedPoints: string[];
  modernRemixPoints: string[];
  culturalNote: string;
  indicatorScore: number; // e.g. 8 or 9 out of 10
  statusText: string; // e.g. "Respectful Remix"
  contextSuitability: string;
  whyThisWorks: {
    colorHarmony: string;
    traditionalIdentity: string;
    modernTouch: string;
  };
}

export interface SavedLook {
  id: string;
  createdAt: string;
  gender?: 'female' | 'male';
  skinTone?: SkinToneId;
  hairstyle?: HairstyleId;
  title: string;
  subtitle: string;
  occasion: OccasionId;
  occasionName: string;
  outfit: OutfitId;
  outfitName: string;
  style: StyleId;
  styleName: string;
  color: ColorId;
  colorName: string;
  colorHex: string;
  accessories: string[];
  cultureCheck: CultureCheckData;
  image: string;
}
