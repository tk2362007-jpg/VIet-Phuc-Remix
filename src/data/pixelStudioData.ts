import { OutfitId, ColorId, StyleId, OccasionId } from '../types';

export interface PixelOutfitItem {
  id: OutfitId;
  name: string;
  shortDesc: string;
  era: string;
  image: string; // e.g. '/pixel/outfits/ao-dai.png'
  recommendedColors: ColorId[];
}

export interface PixelColorItem {
  id: ColorId;
  name: string;
  shortName: string;
  hex: string;
  secondaryHex: string;
  accentHex: string;
  borderHex?: string;
  isPrimaryPalette?: boolean;
  meaning: string;
}

export interface PixelAccessoryItem {
  id: string;
  name: string;
  shortName: string;
  category: 'headwear' | 'jewelry' | 'footwear' | 'handheld';
  layer: 'ACCESSORIES' | 'FOOTWEAR';
  subLayer: 'head' | 'neck' | 'hand' | 'feet';
  image: string; // e.g. '/pixel/accessories/khan-dong.png' or '/pixel/footwear/sandal.png'
  recommendedForStyles: StyleId[];
  culturalTip: string;
}

export interface PixelStyleItem {
  id: StyleId;
  label: string;
  nameVi: string;
  description: string;
  suggestedColors: ColorId[];
  suggestedAccessories: string[];
  stageBadge: string;
}

export const PIXEL_BASE_ASSETS = {
  /**
   * Set `useExternalPngs: true` once you place your custom PNG sprites inside `/public/pixel/`.
   * While `false`, the studio renders the built-in multi-layer crisp pixel-art engine
   * using the exact same layer hierarchy (`BASE -> HAIR -> OUTFIT -> COLOR -> ACCESSORIES -> FOOTWEAR`).
   */
  useExternalPngs: false,
  base: '/pixel/base.png',
  hairDefault: '/pixel/hair/default.png'
};

export const outfits: PixelOutfitItem[] = [
  {
    id: 'ao-dai',
    name: 'Áo dài',
    shortDesc: 'Cổ cao thanh lịch, hai tà thướt tha tôn dáng Việt.',
    era: 'Thế kỷ 19 – Đương đại',
    image: '/pixel/outfits/ao-dai.png',
    recommendedColors: ['red', 'burgundy', 'cream', 'green']
  },
  {
    id: 'ao-tu-than',
    name: 'Áo tứ thân',
    shortDesc: 'Bốn vạt buông mềm phối yếm đào và thắt lưng lụa Kinh Bắc.',
    era: 'Dân gian Bắc Bộ',
    image: '/pixel/outfits/ao-tu-than.png',
    recommendedColors: ['yellow', 'red', 'green', 'cream']
  },
  {
    id: 'ao-ngu-than',
    name: 'Áo ngũ thân',
    shortDesc: 'Cổ lập lĩnh, 5 cúc ngũ thường, phom dáng nho nhã cổ phong.',
    era: 'Triều Nguyễn (1744)',
    image: '/pixel/outfits/ao-ngu-than.png',
    recommendedColors: ['burgundy', 'red', 'yellow', 'blue']
  },
  {
    id: 'ao-ba-ba',
    name: 'Bà ba',
    shortDesc: 'Vạt ngắn xẻ tà phóng khoáng, đậm chất phóng khoáng phương Nam.',
    era: 'Nam Bộ xưa & nay',
    image: '/pixel/outfits/ba-ba.png',
    recommendedColors: ['cream', 'green', 'yellow', 'pastel']
  }
];

export const colors: PixelColorItem[] = [
  {
    id: 'red',
    name: 'Đỏ son',
    shortName: 'Đỏ',
    hex: '#991B1E',
    secondaryHex: '#781316',
    accentHex: '#D4AF37',
    isPrimaryPalette: true,
    meaning: 'Sắc đỏ son truyền thống — biểu tượng hỷ sự, nhiệt huyết và bản sắc Việt.'
  },
  {
    id: 'cream',
    name: 'Kem ngà',
    shortName: 'Kem',
    hex: '#F5EFE6',
    secondaryHex: '#E2D5C1',
    accentHex: '#991B1E',
    borderHex: '#D0C2AE',
    isPrimaryPalette: true,
    meaning: 'Màu tơ tằm mộc thanh khiết — tôn nét dịu dàng, tối giản và tinh khôi.'
  },
  {
    id: 'yellow',
    name: 'Hoàng thổ',
    shortName: 'Vàng',
    hex: '#C8973E',
    secondaryHex: '#9E7225',
    accentHex: '#5E1B24',
    isPrimaryPalette: true,
    meaning: 'Sắc vàng hoàng thổ & mùa lúa chín — ấm áp, vương giả và hoài cổ.'
  },
  {
    id: 'green',
    name: 'Xanh ngọc',
    shortName: 'Xanh',
    hex: '#315C55',
    secondaryHex: '#21423C',
    accentHex: '#E5C178',
    isPrimaryPalette: true,
    meaning: 'Sắc ngọc bích & lá sen — thanh tịnh, tươi mới và đầy sức sống Gen Z.'
  },
  {
    id: 'burgundy',
    name: 'Đỏ rượu',
    shortName: 'Rượu',
    hex: '#5E1B24',
    secondaryHex: '#3D0F16',
    accentHex: '#C8973E',
    isPrimaryPalette: false,
    meaning: 'Đỏ trầm cung đình — sang trọng, đĩnh đạc và có chiều sâu.'
  },
  {
    id: 'blue',
    name: 'Xanh chàm',
    shortName: 'Chàm',
    hex: '#2B4A6F',
    secondaryHex: '#1C324D',
    accentHex: '#D6C8B4',
    isPrimaryPalette: false,
    meaning: 'Chàm nhuộm thủ công — bền bỉ, điềm tĩnh và hiện đại.'
  },
  {
    id: 'black',
    name: 'Đen mực',
    shortName: 'Đen',
    hex: '#1E1B18',
    secondaryHex: '#332E2A',
    accentHex: '#C8973E',
    isPrimaryPalette: false,
    meaning: 'Thạch mặc cổ điển — cá tính, sắc sảo và tối giản.'
  },
  {
    id: 'pastel',
    name: 'Hồng phấn',
    shortName: 'Phấn',
    hex: '#E8C5C8',
    secondaryHex: '#CFA1A6',
    accentHex: '#991B1E',
    borderHex: '#CE9FA3',
    isPrimaryPalette: false,
    meaning: 'Sắc phấn đương đại — ngọt ngào, bay bổng cho những buổi chụp hình.'
  }
];

export const accessories: PixelAccessoryItem[] = [
  {
    id: 'khan-dong',
    name: 'Khăn đóng',
    shortName: 'Khăn đóng',
    category: 'headwear',
    layer: 'ACCESSORIES',
    subLayer: 'head',
    image: '/pixel/accessories/khan-dong.png',
    recommendedForStyles: ['traditional', 'modern'],
    culturalTip: 'Nếp xếp chữ Nhất trên trán tôn vẻ trang nghiêm, đài các.'
  },
  {
    id: 'vong-kieng-bac',
    name: 'Kiềng bạc',
    shortName: 'Kiềng bạc',
    category: 'jewelry',
    layer: 'ACCESSORIES',
    subLayer: 'neck',
    image: '/pixel/accessories/kieng-bac.png',
    recommendedForStyles: ['traditional', 'minimal'],
    culturalTip: 'Vòng bạc tròn biểu trưng cho sự viên mãn và nét duyên cổ truyền.'
  },
  {
    id: 'non-quai-thao',
    name: 'Nón quai thao',
    shortName: 'Nón quai thao',
    category: 'headwear',
    layer: 'ACCESSORIES',
    subLayer: 'head',
    image: '/pixel/accessories/non-quai-thao.png',
    recommendedForStyles: ['traditional'],
    culturalTip: 'Vành nón rộng với dải lụa thao đặc trưng của liền chị Kinh Bắc.'
  },
  {
    id: 'chuoi-ngoc-trai',
    name: 'Chuỗi ngọc trai',
    shortName: 'Ngọc trai',
    category: 'jewelry',
    layer: 'ACCESSORIES',
    subLayer: 'neck',
    image: '/pixel/accessories/ngoc-trai.png',
    recommendedForStyles: ['modern', 'minimal'],
    culturalTip: 'Tạo điểm nhấn thanh lịch kiểu tiểu thư Hà thành xưa & nay.'
  },
  {
    id: 'sandal-day-manh',
    name: 'Sandal',
    shortName: 'Sandal',
    category: 'footwear',
    layer: 'FOOTWEAR',
    subLayer: 'feet',
    image: '/pixel/footwear/sandal.png',
    recommendedForStyles: ['minimal', 'modern'],
    culturalTip: 'Quai mảnh thanh thoát giúp tôn dáng tà áo nhẹ nhàng.'
  },
  {
    id: 'sneakers-retro-trang',
    name: 'Sneakers',
    shortName: 'Sneaker',
    category: 'footwear',
    layer: 'FOOTWEAR',
    subLayer: 'feet',
    image: '/pixel/footwear/sneaker.png',
    recommendedForStyles: ['modern'],
    culturalTip: 'Phá cách năng động chuẩn Gen Z khi dạo phố cùng Việt phục.'
  },
  {
    id: 'non-la-truyen-thong',
    name: 'Nón lá',
    shortName: 'Nón lá',
    category: 'handheld',
    layer: 'ACCESSORIES',
    subLayer: 'hand',
    image: '/pixel/accessories/non-la.png',
    recommendedForStyles: ['traditional', 'minimal'],
    culturalTip: 'Biểu tượng mộc mạc che nắng mưa gắn liền với tà áo Việt.'
  },
  {
    id: 'guoc-moc-quai-nhung',
    name: 'Guốc mộc',
    shortName: 'Guốc mộc',
    category: 'footwear',
    layer: 'FOOTWEAR',
    subLayer: 'feet',
    image: '/pixel/footwear/guoc-moc.png',
    recommendedForStyles: ['traditional'],
    culturalTip: 'Tiếng guốc mộc lộc cộc gợi nhịp sống thong dong phố cổ.'
  }
];

export const studioStyles: PixelStyleItem[] = [
  {
    id: 'modern',
    label: 'MODERN',
    nameVi: 'Cách Tân Hiện Đại',
    description: 'Phối Việt phục năng động cùng phụ kiện đương đại như ngọc trai, sneaker hoặc sandal.',
    suggestedColors: ['red', 'green', 'pastel'],
    suggestedAccessories: ['chuoi-ngoc-trai', 'sneakers-retro-trang'],
    stageBadge: 'GEN Z REMIX · MODERN'
  },
  {
    id: 'minimal',
    label: 'MINIMAL',
    nameVi: 'Tối Giản Tinh Tế',
    description: 'Ưu tiên gam màu nhã nhặn, phom dáng tinh gọn và phụ kiện mảnh nhẹ nhàng.',
    suggestedColors: ['cream', 'yellow', 'black'],
    suggestedAccessories: ['vong-kieng-bac', 'sandal-day-manh'],
    stageBadge: 'CLEAN LINE · MINIMAL'
  },
  {
    id: 'traditional',
    label: 'HERITAGE',
    nameVi: 'Di Sản Nguyên Bản',
    description: 'Tôn vinh quy chuẩn cổ phục truyền thống với khăn đóng, kiềng bạc, nón quai thao và guốc mộc.',
    suggestedColors: ['red', 'burgundy', 'yellow'],
    suggestedAccessories: ['khan-dong', 'vong-kieng-bac', 'guoc-moc-quai-nhung'],
    stageBadge: 'VIET HERITAGE · CLASSIC'
  }
];

export const studioOccasionQuickList: { id: OccasionId; label: string; icon: string }[] = [
  { id: 'festival', label: 'Lễ hội & Tết', icon: '🏮' },
  { id: 'photoshoot', label: 'Lookbook', icon: '📸' },
  { id: 'casual', label: 'Dạo phố', icon: '🍵' },
  { id: 'school', label: 'Đến trường', icon: '🎓' },
  { id: 'wedding', label: 'Lễ cưới', icon: '囍' },
  { id: 'cultural-event', label: 'Sự kiện văn hóa', icon: '🏛️' }
];
