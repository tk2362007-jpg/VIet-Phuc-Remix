import { ColorOption, ColorId, SkinToneId, SkinToneOption } from '../types';

export const COLORS_DATA: ColorOption[] = [
  {
    id: 'red',
    name: 'Red',
    nameVi: 'Đỏ Son Truyền Thống',
    hex: '#A3262A',
    textColor: '#FFFFFF',
    culturalMeaning: 'Màu sắc của hỷ sự, may mắn, nguồn năng lượng dồi dào và niềm vui sum vầy.'
  },
  {
    id: 'burgundy',
    name: 'Burgundy',
    nameVi: 'Đỏ Rượu Quý Phái',
    hex: '#5E1B24',
    textColor: '#FFFFFF',
    culturalMeaning: 'Sắc đỏ thẫm đĩnh đạc, mang phong vị cung đình xưa, bí ẩn và chiều sâu văn hóa.'
  },
  {
    id: 'cream',
    name: 'Cream',
    nameVi: 'Kem Ngà / Lụa Mộc',
    hex: '#F5EFE6',
    borderHex: '#D6C8B4',
    textColor: '#2D2621',
    culturalMeaning: 'Màu tơ tằm mộc thuần khiết, dịu mắt, gợi nhớ sự thanh bạch và khiêm cung.'
  },
  {
    id: 'yellow',
    name: 'Yellow',
    nameVi: 'Vàng Mù Tạt / Hoàng Thổ',
    hex: '#C8973E',
    textColor: '#1A1612',
    culturalMeaning: 'Sắc vàng đất hoàng gia và mùa lúa chín, tượng trưng cho ấm no, phúc lộc và bình an.'
  },
  {
    id: 'blue',
    name: 'Blue',
    nameVi: 'Xanh Chàm / Lam Cổ',
    hex: '#2B4A6F',
    textColor: '#FFFFFF',
    culturalMeaning: 'Sắc chàm nhuộm tự nhiên của người Việt, gợi cảm giác tĩnh tại, trung thành và bền bỉ.'
  },
  {
    id: 'green',
    name: 'Green',
    nameVi: 'Xanh Ngọc / Diệp Lục',
    hex: '#315643',
    textColor: '#FFFFFF',
    culturalMeaning: 'Màu xanh lá chuối non, ngọc bích, biểu tượng cho sức sống đâm chồi nảy lộc và hy vọng.'
  },
  {
    id: 'black',
    name: 'Black',
    nameVi: 'Đen Mực / Thạch Mặc',
    hex: '#1E1B18',
    textColor: '#FFFFFF',
    culturalMeaning: 'Màu đen quyền lực của tầng lớp trí thức nho nhã xưa, thâm trầm, cá tính và sắc sảo.'
  },
  {
    id: 'pastel',
    name: 'Pastel',
    nameVi: 'Hồng Phấn / Xanh Khói',
    hex: '#E8C5C8',
    borderHex: '#CE9FA3',
    textColor: '#3A2B2D',
    culturalMeaning: 'Sắc màu đương đại mang hơi thở Gen Z ngọt ngào, tinh tế, nhẹ nhàng và thanh tân.'
  }
];

export const SKIN_TONES_DATA: SkinToneOption[] = [
  {
    id: 'fair',
    name: 'Fair / Light',
    nameVi: 'Da Sáng Hồng / Trắng Sáng',
    description: 'Tông da sáng với sắc tố da hồng hào hoặc trung tính mát, có độ tương phản tự nhiên cao.',
    undertone: 'cool',
    sampleHex: '#FDE0CC',
    recommendedColors: ['burgundy', 'blue', 'green', 'pastel', 'red'],
    discouragedColors: ['cream'],
    harmonyTip: 'Da sáng rất tôn sắc đỏ rượu (Burgundy), xanh chàm và diệp lục đậm nhờ hiệu ứng tương phản quang học; gam hồng phấn tạo vẻ ngọt ngào thanh lịch.'
  },
  {
    id: 'neutral',
    name: 'Medium Neutral',
    nameVi: 'Da Tự Nhiên / Trung Tính',
    description: 'Tông da đặc trưng cân bằng của người Việt, dung hòa sắc ấm và mát, phù hợp hầu hết bảng màu.',
    undertone: 'neutral',
    sampleHex: '#F5CCB0',
    recommendedColors: ['burgundy', 'red', 'cream', 'yellow', 'green', 'blue'],
    discouragedColors: [],
    harmonyTip: 'Là tông da lý tưởng dễ phối đồ nhất! Kem ngà, đỏ son và vàng hoàng thổ sẽ mang lại vẻ sang trọng, ấm áp và thanh lịch chuẩn Việt.'
  },
  {
    id: 'warm',
    name: 'Warm Golden',
    nameVi: 'Da Vàng Châu Á / Warm Undertone',
    description: 'Tông da vàng mật ong ấm áp Á Đông, giàu sức sống và nét đẹp truyền thống đằm thắm.',
    undertone: 'warm',
    sampleHex: '#EFC194',
    recommendedColors: ['burgundy', 'blue', 'cream', 'black', 'red'],
    discouragedColors: ['yellow'],
    harmonyTip: 'Đỏ rượu thẫm và xanh chàm là "bảo bối" trung hòa sắc vàng, giúp da sáng bừng; màu kem ngà lụa mộc tôn nét đài các tự nhiên.'
  },
  {
    id: 'tan',
    name: 'Tan / Sun-kissed',
    nameVi: 'Da Bánh Mật / Răm Nắng',
    description: 'Tông da nâu khỏe khoắn, năng động, mang vẻ đẹp hiện đại và cá tính đậm đà của thế hệ Gen Z.',
    undertone: 'deep-warm',
    sampleHex: '#C7956D',
    recommendedColors: ['cream', 'yellow', 'burgundy', 'green', 'black'],
    discouragedColors: ['pastel'],
    harmonyTip: 'Kem ngà lụa mộc và vàng hoàng thổ là "chân ái" tạo độ tương phản cực kỳ đắt giá trên nền da bánh mật; nên tránh màu pastel nhợt nhạt.'
  }
];

export interface ColorHarmonyPaletteItem {
  role: 'Chủ đạo (60%)' | 'Thứ cấp (30%)' | 'Điểm nhấn (10%)';
  percentage: number;
  name: string;
  hex: string;
  source: string;
}

export interface ColorHarmonyEvaluation {
  totalColorCount: number;
  isWithinLimit: boolean; // <= 3 colors
  limitStatusText: string;
  limitAdvice: string;
  palette: ColorHarmonyPaletteItem[];
  skinToneMatch: 'perfect' | 'good' | 'caution';
  skinToneFeedback: string;
  harmonyRule: 'monochrome' | 'complementary' | 'analogous' | 'triadic' | 'neutral-accent';
  harmonyRuleName: string;
  harmonyRuleDescription: string;
  harmonyScore: number; // e.g. 9.5 / 10
}

export interface ColorHarmonyPreset {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  colorId: ColorId;
  suggestedAccessories: string[];
  skinToneSuitability: SkinToneId[];
}

export const COLOR_HARMONY_PRESETS: ColorHarmonyPreset[] = [
  {
    id: 'skin-perfection',
    title: 'Tôn Tông Da Tối Ưu',
    subtitle: 'Theo quy luật sắc ký',
    description: 'Tự động chọn màu áo và phụ kiện tạo độ tương phản và hòa sắc tôn da sáng rạng rỡ nhất.',
    colorId: 'burgundy',
    suggestedAccessories: ['vong-kieng-bac', 'sandal-day-manh'],
    skinToneSuitability: ['fair', 'neutral', 'warm']
  },
  {
    id: 'rule-of-three',
    title: 'Quy Tắc 3 Màu Kinh Điển',
    subtitle: 'Tỷ lệ vàng 60 - 30 - 10',
    description: 'Chỉ gồm đúng 3 gam màu chuẩn: Màu áo chủ đạo, quần lụa trắng thứ cấp và 1 điểm nhấn ánh bạc/vàng.',
    colorId: 'blue',
    suggestedAccessories: ['vong-kieng-bac'],
    skinToneSuitability: ['fair', 'neutral', 'warm', 'tan']
  },
  {
    id: 'royal-heritage',
    title: 'Cung Đình Quý Phái',
    subtitle: 'Tương phản Đỏ Rượu & Vàng Kim',
    description: 'Phối màu quyền quý triều Nguyễn: Đỏ thẫm kết hợp điểm nhấn ánh vàng kim và nón/khăn đóng truyền thống.',
    colorId: 'burgundy',
    suggestedAccessories: ['khan-dong', 'vong-kieng-bac'],
    skinToneSuitability: ['fair', 'neutral', 'warm', 'tan']
  },
  {
    id: 'silk-minimal',
    title: 'Đơn Sắc Tối Giản (Monochrome)',
    subtitle: 'Tơ tằm mộc & Ngọc trai thanh khiết',
    description: 'Sắc kem ngà thuần khiết kết hợp chuỗi ngọc trai cổ điển, tao nhã tuyệt đối và chuẩn Gen Z Quiet Luxury.',
    colorId: 'cream',
    suggestedAccessories: ['chuoi-ngoc-trai', 'sandal-day-manh'],
    skinToneSuitability: ['neutral', 'warm', 'tan']
  }
];

/**
 * Evaluates color harmony based on:
 * 1. Limit of max 3 colors on an outfit (60-30-10 rule)
 * 2. Skin tone flatter factor & undertone compatibility
 * 3. Color theory relationships (monochrome, complementary, neutral-accent, analogous)
 */
export function evaluateColorHarmony(params: {
  skinTone: SkinToneId;
  colorId: ColorId;
  outfitId?: string;
  accessories?: string[];
}): ColorHarmonyEvaluation {
  const { skinTone = 'neutral', colorId = 'burgundy', outfitId = 'ao-dai', accessories = [] } = params;

  const skin = SKIN_TONES_DATA.find((s) => s.id === skinTone) || SKIN_TONES_DATA[1];
  const color = COLORS_DATA.find((c) => c.id === colorId) || COLORS_DATA[1];

  // 1. Build Palette (60-30-10)
  // Dominant (60%): Main outfit garment
  const dominantItem: ColorHarmonyPaletteItem = {
    role: 'Chủ đạo (60%)',
    percentage: 60,
    name: color.nameVi,
    hex: color.hex,
    source: 'Thân áo & Tà áo'
  };

  // Secondary (30%): Trousers / Inner collar / Yếm
  let secondaryColorName = 'Trắng Lụa Tơ Tằm';
  let secondaryColorHex = '#FAF8F5';
  if (colorId === 'cream') {
    secondaryColorName = 'Nâu Gụ Đất Mộc';
    secondaryColorHex = '#4A3728';
  } else if (colorId === 'black') {
    secondaryColorName = 'Xám Khói Thanh Lịch';
    secondaryColorHex = '#9CA3AF';
  }

  const secondaryItem: ColorHarmonyPaletteItem = {
    role: 'Thứ cấp (30%)',
    percentage: 30,
    name: secondaryColorName,
    hex: secondaryColorHex,
    source: 'Quần lụa & Cổ lót trong'
  };

  // Accent (10%): Accessories
  const palette: ColorHarmonyPaletteItem[] = [dominantItem, secondaryItem];

  const accessoryColorMap: Record<string, { name: string; hex: string; source: string }> = {
    'khan-dong': { name: 'Đen Gấm Cung Đình', hex: '#1C1917', source: 'Khăn đóng' },
    'vong-kieng-bac': { name: 'Bạc Nguyên Khối', hex: '#CBD5E1', source: 'Kiềng bạc' },
    'chuoi-ngoc-trai': { name: 'Ánh Xà Cừ Ngọc Trai', hex: '#FFFBF2', source: 'Chuỗi ngọc trai' },
    'non-quai-thao': { name: 'Vàng Rơm Thao Dệt', hex: '#D7B46A', source: 'Nón quai thao' },
    'sandal-day-manh': { name: 'Nâu Da Mộc', hex: '#785336', source: 'Sandal quai mảnh' },
    'sneakers-retro-trang': { name: 'Trắng Sữa Retro', hex: '#F3F4F6', source: 'Sneakers hiện đại' }
  };

  // Check unique color groups
  const uniqueColorKeys = new Set<string>();
  uniqueColorKeys.add(color.hex);
  uniqueColorKeys.add(secondaryColorHex);

  if (accessories.length > 0) {
    accessories.slice(0, 2).forEach((accId) => {
      const accColor = accessoryColorMap[accId];
      if (accColor) {
        uniqueColorKeys.add(accColor.hex);
        palette.push({
          role: 'Điểm nhấn (10%)',
          percentage: 10,
          name: accColor.name,
          hex: accColor.hex,
          source: accColor.source
        });
      }
    });
  }

  const totalColorCount = uniqueColorKeys.size;
  const isWithinLimit = totalColorCount <= 3;

  // Limit Status Feedback
  let limitStatusText = '';
  let limitAdvice = '';
  if (totalColorCount <= 2) {
    limitStatusText = 'Tối giản & Tinh tế (≤ 2 màu)';
    limitAdvice = 'Bảng màu cô đọng, tôn triệt để phom dáng cổ phục và khí chất thanh nhã của người mặc.';
  } else if (totalColorCount === 3) {
    limitStatusText = 'Tỷ Lệ Vàng Thời Trang (Đúng 3 màu)';
    limitAdvice = 'Hoàn hảo theo quy tắc 60-30-10: 1 màu chủ đạo, 1 màu nền quần/cổ và 1 điểm nhấn phụ kiện.';
  } else {
    limitStatusText = `Hơi nhiều chi tiết (${totalColorCount} màu > 3)`;
    limitAdvice = 'Vượt quá giới hạn 3 màu kinh điển! Nên giảm bớt phụ kiện khác màu hoặc chọn phụ kiện cùng tông để trang phục thanh thoát hơn.';
  }

  // 2. Skin tone match assessment
  let skinToneMatch: 'perfect' | 'good' | 'caution' = 'good';
  let skinToneFeedback = '';

  const isRecommended = skin.recommendedColors.includes(colorId);
  const isDiscouraged = skin.discouragedColors?.includes(colorId);

  if (isRecommended) {
    skinToneMatch = 'perfect';
    skinToneFeedback = `Sắc ${color.nameVi} tôn rạng rỡ cho ${skin.nameVi}. ${skin.harmonyTip}`;
  } else if (isDiscouraged) {
    skinToneMatch = 'caution';
    skinToneFeedback = `Sắc ${color.nameVi} có độ tương phản thấp hoặc sắc độ gần tương đương với ${skin.nameVi}. Nên phối thêm kiềng bạc hoặc khăn đóng để tạo điểm nhấn tách biệt.`;
  } else {
    skinToneMatch = 'good';
    skinToneFeedback = `Sắc ${color.nameVi} hài hòa tự nhiên với ${skin.nameVi}. Bạn có thể tự tin diện trong các dịp lễ hội và sự kiện văn hóa.`;
  }

  // 3. Color Harmony Rule Identification
  let harmonyRule: 'monochrome' | 'complementary' | 'analogous' | 'triadic' | 'neutral-accent' = 'neutral-accent';
  let harmonyRuleName = 'Phối Trung Tính & Điểm Xuyết';
  let harmonyRuleDescription = 'Sử dụng gam màu truyền thống kết hợp nền vải lụa mộc nhã nhặn, vừa thanh lịch vừa tôn vinh chất liệu.';

  if (colorId === 'cream' || (colorId === 'black' && accessories.length <= 1)) {
    harmonyRule = 'monochrome';
    harmonyRuleName = 'Phối Đơn Sắc (Monochromatic)';
    harmonyRuleDescription = 'Các sắc độ đồng điệu mang lại chiều sâu thị giác đài các, hiện đại và đậm chất Quiet Luxury.';
  } else if ((colorId === 'burgundy' || colorId === 'red') && accessories.includes('vong-kieng-bac')) {
    harmonyRule = 'complementary';
    harmonyRuleName = 'Phối Tương Phản Quý Phái';
    harmonyRuleDescription = 'Sắc đỏ cung đình tương phản mạnh mẽ với ánh bạc kim loại, thu hút ánh nhìn và tôn phong thái quý tộc.';
  } else if (colorId === 'blue' || colorId === 'yellow' || colorId === 'green') {
    harmonyRule = 'analogous';
    harmonyRuleName = 'Hòa Sắc Tự Nhiên & Dân Gian';
    harmonyRuleDescription = 'Cảm hứng từ màu sắc tranh dân gian Đông Hồ và lụa Hà Đông, mang nét duyên dáng, gần gũi và ấm cúng.';
  }

  // 4. Calculate Harmony Score
  let harmonyScore = 8.5;
  if (isWithinLimit) harmonyScore += 0.8;
  if (skinToneMatch === 'perfect') harmonyScore += 0.7;
  if (skinToneMatch === 'caution') harmonyScore -= 1.0;
  if (totalColorCount > 3) harmonyScore -= 0.8;
  harmonyScore = Math.min(10, Math.max(6.0, Math.round(harmonyScore * 10) / 10));

  return {
    totalColorCount,
    isWithinLimit,
    limitStatusText,
    limitAdvice,
    palette,
    skinToneMatch,
    skinToneFeedback,
    harmonyRule,
    harmonyRuleName,
    harmonyRuleDescription,
    harmonyScore
  };
}

