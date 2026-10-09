import {
  OccasionId,
  OutfitId,
  StyleId,
  ColorId,
  OutfitLookState,
  HairstyleId,
  SkinToneId,
  Outfit,
  Accessory
} from '../types';
import { OUTFITS_DATA } from '../data/outfits';
import { ACCESSORIES_DATA, OUTFIT_ACCESSORY_RECOMMENDATIONS } from '../data/accessories';

export interface InferredWeatherConditions {
  temp: number;
  condition?: string;
  conditionCode?: 'sunny' | 'cloudy' | 'rainy' | 'cool' | 'breeze' | string;
  rainProbability?: number;
  humidity?: number;
  windSpeed?: string;
  clothingAdvice?: string;
}

export interface DefaultWeatherGarmentResult {
  garment: Outfit;
  garmentId: OutfitId;
  defaultColor: ColorId;
  defaultStyle: StyleId;
  accessories: string[];
  accessoriesDetails: Accessory[];
  reason: string;
  recommendedFabrics: string[];
  comfortTier: 'am-ap' | 'thoang-mat' | 'de-chiu';
  weatherTag: string;
}

/**
 * Helper function that selects the appropriate default garment and accessories
 * directly from OUTFITS_DATA based on user gender and inferred weather conditions
 * during the Preparation step.
 */
export function selectDefaultGarmentAndAccessoriesByWeather(
  gender: 'female' | 'male',
  weather: InferredWeatherConditions
): DefaultWeatherGarmentResult {
  const temp = weather.temp;
  const rainProb = weather.rainProbability ?? 20;
  const isCold = temp <= 20 || (weather.conditionCode === 'cool' && temp <= 22);
  const isHot = temp >= 28 || (weather.conditionCode === 'sunny' && temp >= 27);
  const isRainy = rainProb >= 50 || weather.conditionCode === 'rainy';

  let garmentId: OutfitId = 'ao-dai';
  let defaultColor: ColorId = 'cream';
  let defaultStyle: StyleId = 'traditional';
  let reason = '';
  let recommendedFabrics: string[] = [];
  let comfortTier: 'am-ap' | 'thoang-mat' | 'de-chiu' = 'de-chiu';
  let weatherTag = '';

  if (gender === 'male') {
    if (isCold) {
      // Men in cold weather: Áo Ngũ Thân Lập Lĩnh (đứng cổ kín đáo, 5 cúc giữ ấm che chắn)
      garmentId = 'ao-ngu-than';
      defaultColor = 'burgundy';
      defaultStyle = 'traditional';
      reason = `Thời tiết lạnh (${temp}°C): Áo Ngũ Thân nam cổ lập lĩnh vuông vắn với 5 thân áo kép che chắn giữ nhiệt cơ thể, kết hợp khăn đóng chữ Nhất trang trọng và cản gió tốt.`;
      recommendedFabrics = ['Gấm dệt chìm', 'Vải dạ mỏng', 'Lụa tơ tằm dệt dày', 'Đũi thô giữ ấm'];
      comfortTier = 'am-ap';
      weatherTag = 'Giữ ấm • Cổ đứng chắn gió';
    } else if (isHot) {
      // Men in hot weather: Áo Bà Ba hoặc Áo Tay Chẽn vải đũi mỏng
      garmentId = 'ao-ba-ba';
      defaultColor = 'cream';
      defaultStyle = 'minimal';
      reason = `Thời tiết oi nóng (${temp}°C): Áo Bà Ba nam phom dáng phóng khoáng, chất vải thoáng khí, xẻ tà hai bên giúp vận động thoải mái và giải nhiệt hiệu quả.`;
      recommendedFabrics = ['Vải đũi tơ tằm', 'Linen sợi tre', 'Lụa mộc dệt thoáng', 'Lãnh Mỹ A'];
      comfortTier = 'thoang-mat';
      weatherTag = 'Thoáng mát • Giải nhiệt';
    } else {
      // Men in moderate/cool weather: Áo Dài nam kinh điển
      garmentId = 'ao-dai';
      defaultColor = 'blue';
      defaultStyle = 'traditional';
      reason = `Tiết trời mát mẻ lý tưởng (${temp}°C): Áo Dài nam phom đứng đắn nho nhã, tà buông dài đĩnh đạc phù hợp cho cả đi học, đi làm lẫn dạo phố.`;
      recommendedFabrics = ['Lụa tơ tằm mềm', 'Đũi dệt sợi mịn', 'The lụa Vạn Phúc', 'Taffeta nhẹ'];
      comfortTier = 'de-chiu';
      weatherTag = 'Ôn hòa • Thanh lịch';
    }
  } else {
    // Female
    if (isCold) {
      // Women in cold weather: Áo Ngũ Thân hoặc Áo Dài gấm/nhung
      garmentId = 'ao-ngu-than';
      defaultColor = 'burgundy';
      defaultStyle = 'traditional';
      reason = `Thời tiết se lạnh (${temp}°C): Áo Ngũ Thân lập lĩnh 5 thân áo bảo bọc kín đáo, tôn nét nền nã đoan trang và giữ ấm tự nhiên cho vùng cổ và lưng.`;
      recommendedFabrics = ['Gấm tơ tằm', 'Nhung the', 'Lụa satin dày', 'Lụa Hà Đông dệt kép'];
      comfortTier = 'am-ap';
      weatherTag = 'Giữ ấm • Kín đáo đoan trang';
    } else if (isHot) {
      // Women in hot weather: Áo Bà Ba Nam Bộ thoáng mát
      garmentId = 'ao-ba-ba';
      defaultColor = 'cream';
      defaultStyle = 'modern';
      reason = `Thời tiết nắng nóng (${temp}°C): Áo Bà Ba Nam Bộ xẻ tà hông duyên dáng, chất vải mỏng nhẹ thấm hút mồ hôi, mang lại nét đẹp bình dị, năng động mà không bí bách.`;
      recommendedFabrics = ['Lụa tơ tằm mộc', 'Linen tự nhiên', 'Đũi dệt thưa', 'Lãnh Mỹ A mát lạnh'];
      comfortTier = 'thoang-mat';
      weatherTag = 'Thoáng mát • Thấm hút mồ hôi';
    } else {
      // Women in moderate/pleasant weather: Áo Dài truyền thống
      garmentId = 'ao-dai';
      defaultColor = 'cream';
      defaultStyle = 'elegant';
      reason = `Tiết trời ôn hòa thuận lợi (${temp}°C): Áo Dài lụa thướt tha mềm rủ, tôn trọn vẹn nét duyên dáng thanh thoát và tạo cảm giác êm ái khi di chuyển.`;
      recommendedFabrics = ['Lụa tơ tằm mềm', 'Lụa cát', 'Chiffon nhẹ nhàng', 'The lụa Vạn Phúc'];
      comfortTier = 'de-chiu';
      weatherTag = 'Ôn hòa • Duyên dáng';
    }
  }

  // Find garment object directly from OUTFITS_DATA
  const garment = OUTFITS_DATA.find((o) => o.id === garmentId) || OUTFITS_DATA[0];

  // Derive accessories based on garment recommendation & weather
  const recObj = OUTFIT_ACCESSORY_RECOMMENDATIONS[garment.id];
  let baseAccessories: string[] = [];
  if (recObj) {
    baseAccessories = gender === 'male' ? [...recObj.primarySetMale] : [...recObj.primarySetFemale];
  } else {
    baseAccessories = gender === 'male' ? ['khan-dong', 'sandal-day-manh'] : ['vong-kieng-bac', 'sandal-day-manh'];
  }

  // Weather-specific accessory adaptation:
  // If rainy, include traditional umbrella
  if (isRainy && !baseAccessories.includes('o-truyen-thong')) {
    baseAccessories.push('o-truyen-thong');
  }

  // Look up full accessory detail objects
  const accessoriesDetails: Accessory[] = baseAccessories
    .map((id) => ACCESSORIES_DATA.find((a) => a.id === id))
    .filter((a): a is Accessory => Boolean(a));

  return {
    garment,
    garmentId: garment.id,
    defaultColor,
    defaultStyle,
    accessories: baseAccessories,
    accessoriesDetails,
    reason,
    recommendedFabrics,
    comfortTier,
    weatherTag
  };
}

export interface StyleSuggestionResult {
  outfit: OutfitId;
  occasion: OccasionId;
  style: StyleId;
  color: ColorId;
  accessories: string[];
  stylistRationale: string;
}

export interface RecommendationParams {
  gender: 'female' | 'male';
  occasion: OccasionId;
  temp?: number;
  conditionCode?: string;
  rainProbability?: number;
  skinTone?: SkinToneId;
}

/**
 * Core Recommendation Engine:
 * Analyzes Gender, Date Context, Occasion, Weather and Temperature
 * to create EXACTLY ONE culturally accurate, stylish initial outfit.
 */
export function generatePersonalizedInitialLook(
  params: RecommendationParams
): OutfitLookState & { stylistRationale: string } {
  const { gender, occasion, rainProbability = 20, skinTone = 'neutral' } = params;
  const temp = params.temp ?? 24;
  const isCold = temp <= 20;
  const isHot = temp >= 28;
  const isRainy = rainProbability >= 60;

  let outfit: OutfitId = 'ao-dai';
  let color: ColorId = 'cream';
  let style: StyleId = 'traditional';
  let accessories: string[] = [];
  let hairstyle: HairstyleId = gender === 'male' ? 'male-short' : 'long';
  let rationale = '';

  if (gender === 'male') {
    switch (occasion) {
      case 'tet':
        if (isCold) {
          outfit = 'ao-ngu-than';
          color = 'burgundy';
          style = 'traditional';
          accessories = ['khan-dong'];
          hairstyle = 'male-parted';
          rationale = 'Ngày Tết se lạnh: Áo Ngũ Thân sắc đỏ rượu sang trọng kết hợp khăn đóng chữ Nhất và tóc rẽ ngôi thư sinh, mang lại hỷ khí đầu năm và giữ ấm tôn nghiêm.';
        } else {
          outfit = 'ao-dai';
          color = 'red';
          style = 'modern';
          accessories = ['khan-dong'];
          hairstyle = 'male-short';
          rationale = 'Ngày Tết ấm áp: Áo Dài nam sắc đỏ tươi may mắn, phom đứng đắn cùng khăn đóng truyền thống rực rỡ đón xuân.';
        }
        break;

      case 'festival':
        outfit = 'ao-ngu-than';
        color = 'blue';
        style = 'traditional';
        accessories = ['khan-dong'];
        hairstyle = 'male-parted';
        rationale = 'Lễ hội truyền thống: Áo Ngũ Thân nam xanh chàm cổ kính, khăn đóng vuông vắn thể hiện cốt cách đĩnh đạc của bậc quân tử.';
        break;

      case 'wedding':
        outfit = 'ao-dai';
        color = 'blue';
        style = 'elegant';
        accessories = ['khan-dong'];
        hairstyle = 'male-short';
        rationale = 'Hôn lễ trang trọng: Áo Dài lụa xanh thẫm phối khăn đóng, phong thái lịch lãm, chỉn chu và tôn trọng không gian gia tiên.';
        break;

      case 'school':
        outfit = 'ao-dai';
        color = 'cream';
        style = 'minimal';
        accessories = ['sneakers-retro-trang'];
        hairstyle = 'male-short';
        rationale = 'Giảng đường học đường: Áo Dài nam tone kem nhã nhặn phối giày sneakers trắng năng động, vừa thư sinh vừa tiện di chuyển.';
        break;

      case 'work':
        outfit = 'ao-tay-chen';
        color = 'blue';
        style = 'minimal';
        accessories = [];
        hairstyle = 'male-short';
        rationale = 'Môi trường công sở: Áo tay chẽn gọn gàng, sắc lam trầm nhã nhặn, tôn phong thái chuyên nghiệp và giao lưu văn hóa tự tin.';
        break;

      case 'photoshoot':
        outfit = 'ao-tac';
        color = 'blue';
        style = 'traditional';
        accessories = ['khan-dong'];
        hairstyle = 'male-bun';
        rationale = 'Chụp ảnh nghệ thuật: Áo Tấc tay thụng đại lễ kết hợp tóc búi cổ phong, tạo nên thần thái cổ trang uy nghi, đậm chất điện ảnh.';
        break;

      case 'travel':
        outfit = 'ao-ba-ba';
        color = 'cream';
        style = 'street';
        accessories = ['khan-ran', 'sneakers-retro-trang'];
        hairstyle = 'male-short';
        rationale = 'Du lịch khám phá: Áo Bà Ba nam tone mộc phối khăn rằn Nam Bộ và giày thể thao, thoáng mát, phong trần và đậm chất trải nghiệm.';
        break;

      case 'casual':
      case 'other':
      default: {
        const weatherChoice = selectDefaultGarmentAndAccessoriesByWeather('male', {
          temp,
          rainProbability,
          conditionCode: params.conditionCode
        });
        outfit = weatherChoice.garmentId;
        color = weatherChoice.defaultColor;
        style = weatherChoice.defaultStyle;
        accessories = weatherChoice.accessories;
        hairstyle = isCold ? 'male-parted' : 'male-short';
        rationale = weatherChoice.reason;
        break;
      }
    }
  } else {
    // FEMALE RECOMMENDATION
    switch (occasion) {
      case 'tet':
        if (isCold) {
          outfit = 'ao-ngu-than';
          color = 'burgundy';
          style = 'traditional';
          accessories = ['khan-dong', 'chuoi-ngoc-trai'];
          hairstyle = 'bun';
          rationale = 'Du xuân Tết se lạnh: Áo Ngũ Thân gấm lót lụa sắc đỏ rượu burgundy quý phái, điểm xuyết khăn đóng và ngọc trai giữ ấm thanh lịch.';
        } else {
          outfit = 'ao-dai';
          color = 'red';
          style = 'modern';
          accessories = ['vong-kieng-bac', 'sandal-day-manh'];
          hairstyle = 'long';
          rationale = 'Ngày Tết nắng ấm: Áo Dài lụa đỏ thắm tươi vui, phối kiềng bạc nguyên khối và sandal quai mảnh tha thướt đón xuân.';
        }
        break;

      case 'festival':
        if (isCold) {
          outfit = 'ao-ngu-than';
          color = 'burgundy';
          style = 'traditional';
          accessories = ['khan-dong', 'chuoi-ngoc-trai'];
          hairstyle = 'braid';
          rationale = 'Lễ hội cổ truyền: Áo Ngũ Thân tay chẽn sắc đỏ trầm sang trọng, khăn đóng tôn gương mặt sáng ngời.';
        } else {
          outfit = 'ao-tu-than';
          color = 'yellow';
          style = 'romantic';
          accessories = ['non-quai-thao', 'vong-kieng-bac'];
          hairstyle = 'long';
          rationale = 'Không gian lễ hội dân gian: Áo Tứ Thân sắc hoàng thổ ấm áp, nón quai thao Kinh Bắc và dải thắt lưng xuyến duyên dáng.';
        }
        break;

      case 'wedding':
        outfit = 'ao-dai';
        color = 'red';
        style = 'elegant';
        accessories = ['vong-kieng-bac', 'chuoi-ngoc-trai', 'tram-cai-toc'];
        hairstyle = 'bun';
        rationale = 'Hôn lễ hỷ sự: Áo Dài đỏ son chuẩn mực nghi lễ, phối kiềng bạc và trâm cài tóc xà cừ quý phái rạng ngời.';
        break;

      case 'school':
        outfit = 'ao-dai';
        color = 'cream';
        style = 'minimal';
        accessories = ['tui-tote-canvas', 'sneakers-retro-trang'];
        hairstyle = 'long';
        rationale = 'Thanh xuân giảng đường: Áo Dài lụa mộc tone kem tinh khôi, túi tote canvas và giày sneakers trắng năng động, thanh thoát.';
        break;

      case 'work':
        outfit = 'ao-dai';
        color = 'cream';
        style = 'minimal';
        accessories = ['sandal-day-manh'];
        hairstyle = 'bun';
        rationale = 'Công sở trang nhã: Áo Dài phom suông tối giản tone màu kem thanh lịch, vừa tôn vinh bản sắc vừa tiện làm việc.';
        break;

      case 'photoshoot':
        outfit = 'ao-nhat-binh';
        color = 'yellow';
        style = 'romantic';
        accessories = ['vong-kieng-bac', 'tram-cai-toc'];
        hairstyle = 'braid';
        rationale = 'Chụp ảnh concept: Áo Nhật Bình triều Nguyễn với dải ngũ sắc rực rỡ, kiềng bạc và trâm cài cánh phượng tạo điểm nhấn thị giác đỉnh cao.';
        break;

      case 'travel':
        outfit = 'ao-ba-ba';
        color = 'pastel';
        style = 'street';
        accessories = ['tui-coi-quai-tre', 'non-la-truyen-thong', 'sandal-day-manh'];
        hairstyle = 'long';
        rationale = 'Du lịch danh thắng: Áo Bà Ba tone pastel nhẹ mát, nón lá bài thơ và túi cói mộc mạc, tạo nên những bức ảnh kỷ niệm tuyệt đẹp.';
        break;

      case 'casual':
      case 'other':
      default: {
        const weatherChoice = selectDefaultGarmentAndAccessoriesByWeather('female', {
          temp,
          rainProbability,
          conditionCode: params.conditionCode
        });
        outfit = weatherChoice.garmentId;
        color = weatherChoice.defaultColor;
        style = weatherChoice.defaultStyle;
        accessories = weatherChoice.accessories;
        hairstyle = isCold ? 'bun' : 'long';
        rationale = weatherChoice.reason;
        break;
      }
    }
  }

  // Weather adjustments: If rainy, ensure traditional umbrella is included!
  if (isRainy && !accessories.includes('o-truyen-thong')) {
    accessories.push('o-truyen-thong');
  }
  if (isRainy) {
    accessories = accessories.filter((a) => a !== 'guoc-moc-quai-nhung');
  }

  return {
    gender,
    skinTone,
    hairstyle,
    occasion,
    outfit,
    style,
    color,
    accessories,
    stylistRationale: rationale
  };
}

/**
 * Legacy rule-based suggestion for backwards compatibility
 */
export async function generateOutfitSuggestion(
  occasion: OccasionId = 'festival',
  preferredStyle?: StyleId
): Promise<StyleSuggestionResult> {
  const look = generatePersonalizedInitialLook({
    gender: 'female',
    occasion,
    temp: 24
  });

  return {
    occasion,
    outfit: look.outfit as OutfitId,
    style: preferredStyle || (look.style as StyleId),
    color: look.color as ColorId,
    accessories: look.accessories,
    stylistRationale: look.stylistRationale
  };
}
