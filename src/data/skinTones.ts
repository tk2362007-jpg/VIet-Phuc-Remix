import { SkinToneId, SkinToneOption, ColorId, OutfitId } from '../types';

export const SKIN_TONES_DATA: SkinToneOption[] = [
  {
    id: 'fair',
    name: 'Fair / Light',
    nameVi: 'Da Sáng / Trắng Hồng',
    description: 'Sắc da sáng, trắng ngà hoặc trắng ửng hồng phảng phất vẻ thanh tú Á Đông.',
    undertone: 'cool',
    sampleHex: '#FEE0CE',
    recommendedColors: ['burgundy', 'blue', 'green', 'pastel', 'red', 'black'],
    discouragedColors: ['cream'],
    harmonyTip:
      'Tôn da rực rỡ nhất khi diện các gam màu có chiều sâu như Đỏ rượu (Burgundy), Xanh chàm cổ, Xanh ngọc bích hoặc Hồng phấn lãng mạn. Tránh các màu quá bợt trùng sắc da nếu không có phụ kiện tương phản.'
  },
  {
    id: 'neutral',
    name: 'Neutral / Medium',
    nameVi: 'Da Trung Tính / Sáng Vừa',
    description: 'Sắc da trung tính hài hòa, phổ biến nhất ở người Việt Nam, không quá sáng hay quá ngăm.',
    undertone: 'neutral',
    sampleHex: '#F6CEB0',
    recommendedColors: ['red', 'burgundy', 'green', 'blue', 'yellow', 'cream', 'black'],
    discouragedColors: [],
    harmonyTip:
      'Tông da lý tưởng và linh hoạt nhất! Cân đối tuyệt vời với cả gam màu rực rỡ (Đỏ son, Hoàng kim) lẫn gam màu trầm mặc (Đen thạch mặc, Xanh chàm).'
  },
  {
    id: 'warm',
    name: 'Warm / Golden Honey',
    nameVi: 'Da Ấm / Vàng Tự Nhiên',
    description: 'Sắc da vàng mật ong ấm áp đặc trưng vùng nhiệt đới, giàu sức sống và khỏe khoắn.',
    undertone: 'warm',
    sampleHex: '#EFC194',
    recommendedColors: ['yellow', 'red', 'cream', 'green', 'burgundy', 'black'],
    discouragedColors: ['pastel'],
    harmonyTip:
      'Hòa quyện đẹp nhất cùng bảng màu ấm: Vàng mù tạt/hoàng thổ, Đỏ son truyền thống, Kem ngà lụa mộc và Xanh ngọc diệp lục. Hạn chế màu pastel quá lạnh/nhạt nhòa.'
  },
  {
    id: 'tan',
    name: 'Tan / Deep Warm',
    nameVi: 'Da Bánh Mật / Rám Nắng',
    description: 'Sắc da nâu bánh mật rám nắng khỏe khoắn, cá tính và đậm chất sông nước phương Nam.',
    undertone: 'deep-warm',
    sampleHex: '#C7956D',
    recommendedColors: ['cream', 'yellow', 'black', 'burgundy', 'blue', 'red'],
    discouragedColors: ['pastel'],
    harmonyTip:
      'Tạo hiệu ứng tương phản cực kỳ cuốn hút khi kết hợp cùng Kem ngà / Lụa mộc, Vàng hoàng yến, Đen thạch mặc và Đỏ rượu quý phái. Màu sắc tương phản sẽ làm nổi bật nét đẹp mặn mà.'
  }
];

export interface ColorHarmonyRuleResult {
  skinToneScore: number; // 1-10
  colorLimitScore: number; // 1-10
  totalColorScore: number; // 1-10
  isRecommendedForSkin: boolean;
  colorCount: number;
  colorRuleStatus: 'perfect' | 'good' | 'warning';
  skinHarmonyStatus: 'tuyet-hao' | 'hai-hoa' | 'can-can-nhac';
  title: string;
  feedbackText: string;
  adviceText: string;
}

export interface ClassicPalettePreset {
  id: string;
  name: string;
  subtitle: string;
  colorId: ColorId;
  idealOutfit: OutfitId;
  suggestedAccessories: string[];
  bestSkinTones: SkinToneId[];
  concept: string;
}

export const CLASSIC_PALETTES: ClassicPalettePreset[] = [
  {
    id: 'hoang-trieu',
    name: 'Hoàng Triều Quý Phái',
    subtitle: 'Đỏ Rượu + Vàng Kim + Ngọc Trai',
    colorId: 'burgundy',
    idealOutfit: 'ao-nhat-binh',
    suggestedAccessories: ['chuoi-ngoc-trai', 'khan-dong'],
    bestSkinTones: ['fair', 'neutral', 'tan'],
    concept: 'Phong thái cung đình triều Nguyễn uy nghi, đĩnh đạc và sang trọng tuyệt đối.'
  },
  {
    id: 'thanh-bach-moc',
    name: 'Thanh Bạch Lụa Mộc',
    subtitle: 'Kem Ngà + Lục Bảo + Kiềng Bạc',
    colorId: 'cream',
    idealOutfit: 'ao-dai',
    suggestedAccessories: ['vong-kieng-bac', 'sandal-day-manh'],
    bestSkinTones: ['tan', 'warm', 'neutral'],
    concept: 'Vẻ đẹp tinh khôi, khiêm nhường của tơ tằm nguyên bản, tôn nước da bánh mật và da ấm.'
  },
  {
    id: 'kinh-bac-xuan-thi',
    name: 'Kinh Bắc Xuân Thì',
    subtitle: 'Hồng Sen / Pastel + Vàng Thổ',
    colorId: 'pastel',
    idealOutfit: 'ao-tu-than',
    suggestedAccessories: ['non-quai-thao', 'vong-kieng-bac'],
    bestSkinTones: ['fair', 'neutral'],
    concept: 'Hương sắc duyên dáng của các liền chị quan họ trong những ngày hội xuân rộn rã.'
  },
  {
    id: 'thach-mac-nho-nha',
    name: 'Thạch Mặc Uy Nghi',
    subtitle: 'Đen Mực + Trắng Lụa + Kiềng Bạc',
    colorId: 'black',
    idealOutfit: 'ao-ngu-than',
    suggestedAccessories: ['khan-dong', 'vong-kieng-bac'],
    bestSkinTones: ['fair', 'warm', 'tan', 'neutral'],
    concept: 'Đỉnh cao phong thái kẻ sĩ nho nhã, thâm trầm, cá tính và quyền uy.'
  },
  {
    id: 'lam-co-tinh-tai',
    name: 'Lam Cổ Tĩnh Tại',
    subtitle: 'Xanh Chàm + Trắng Lụa',
    colorId: 'blue',
    idealOutfit: 'ao-tay-chen',
    suggestedAccessories: ['sandal-day-manh'],
    bestSkinTones: ['fair', 'neutral', 'tan'],
    concept: 'Sắc chàm bền bỉ của người Việt, gợi nhắc sự tĩnh tại, trung nghĩa và mộc mạc.'
  }
];

/**
 * Evaluates color harmony based on:
 * 1. Skin tone match (Quy luật chọn màu theo tông da)
 * 2. Color count limit (Quy luật 3 màu: 1 màu chính 60%, 1 màu nền 30%, 1 màu nhấn 10%)
 */
export function evaluateColorRules({
  skinToneId,
  colorId,
  accessoriesCount
}: {
  skinToneId: SkinToneId;
  colorId: ColorId;
  accessoriesCount: number;
}): ColorHarmonyRuleResult {
  const skin = SKIN_TONES_DATA.find((s) => s.id === skinToneId) || SKIN_TONES_DATA[1];
  const isRecommended = skin.recommendedColors.includes(colorId);
  const isDiscouraged = skin.discouragedColors?.includes(colorId);

  // 1. Calculate Skin Tone Match Score
  let skinToneScore = 8.5;
  let skinHarmonyStatus: ColorHarmonyRuleResult['skinHarmonyStatus'] = 'hai-hoa';

  if (isRecommended) {
    skinToneScore = 10;
    skinHarmonyStatus = 'tuyet-hao';
  } else if (isDiscouraged) {
    skinToneScore = 7;
    skinHarmonyStatus = 'can-can-nhac';
  }

  // 2. Calculate Color Count Limit
  // Color elements:
  // Base 1: Main tunic garment color (60%)
  // Base 2: Trousers / inner silk (30% - white or black)
  // Accent: Accessories (10% - gold/silver/pearl/red)
  // If accessories > 3, visual noise starts increasing
  let colorCount = 2; // Tunic + Silk Pants
  if (accessoriesCount > 0) colorCount += Math.min(2, Math.ceil(accessoriesCount / 2));

  let colorLimitScore = 10;
  let colorRuleStatus: ColorHarmonyRuleResult['colorRuleStatus'] = 'perfect';

  if (colorCount <= 3 && accessoriesCount <= 3) {
    colorLimitScore = 10;
    colorRuleStatus = 'perfect';
  } else if (colorCount === 4 || accessoriesCount === 4) {
    colorLimitScore = 8.5;
    colorRuleStatus = 'good';
  } else {
    colorLimitScore = 7;
    colorRuleStatus = 'warning';
  }

  const totalColorScore = Number(((skinToneScore * 0.6 + colorLimitScore * 0.4)).toFixed(1));

  let title = 'Phối Màu Hài Hòa & Tôn Da Tuyệt Đối';
  let feedbackText = '';
  let adviceText = '';

  if (skinHarmonyStatus === 'tuyet-hao') {
    feedbackText = `Sắc màu bạn chọn cực kỳ ăn ý với ${skin.nameVi}! Giúp tôn bừng làn da và tạo điểm nhấn sang trọng.`;
  } else if (skinHarmonyStatus === 'can-can-nhac') {
    feedbackText = `Gam màu này có thể làm giảm bớt độ sáng của ${skin.nameVi} nếu thiếu phụ kiện tương phản.`;
  } else {
    feedbackText = `Sự phối hợp vừa mắt, mang đến nét nền nã, hài hòa với sắc da tự nhiên.`;
  }

  if (colorRuleStatus === 'perfect') {
    adviceText =
      'Đạt chuẩn quy tắc 3 màu thời trang (60-30-10): Bộ trang phục có độ thoáng thị giác hoàn hảo, không bị rối mắt.';
  } else if (colorRuleStatus === 'good') {
    adviceText =
      'Số lượng màu sắc vừa vặn, các phụ kiện tạo điểm nhấn điểm xuyết duyên dáng.';
  } else {
    adviceText =
      'Lưu ý quy luật số màu: Đang có hơi nhiều chi tiết phụ kiện. Nên tiết chế về 2-3 phụ kiện để trang phục chính tỏa sáng.';
  }

  return {
    skinToneScore,
    colorLimitScore,
    totalColorScore,
    isRecommendedForSkin: isRecommended,
    colorCount,
    colorRuleStatus,
    skinHarmonyStatus,
    title,
    feedbackText,
    adviceText
  };
}
