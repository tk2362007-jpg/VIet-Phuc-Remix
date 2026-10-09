import { Accessory, OutfitId } from '../types';

export interface OutfitAccessoryRecommendation {
  outfitId: OutfitId;
  outfitName: string;
  primarySetFemale: string[];
  primarySetMale: string[];
  recommendedIds: string[];
  avoidIds: string[];
  avoidReasons: Record<string, string>;
  culturalRationale: string;
  aestheticNote: string;
}

export const OUTFIT_ACCESSORY_RECOMMENDATIONS: Record<OutfitId, OutfitAccessoryRecommendation> = {
  'ao-dai': {
    outfitId: 'ao-dai',
    outfitName: 'Áo dài',
    primarySetFemale: ['vong-kieng-bac', 'sandal-day-manh'],
    primarySetMale: ['khan-dong', 'sandal-day-manh'],
    recommendedIds: ['vong-kieng-bac', 'chuoi-ngoc-trai', 'khan-dong', 'sandal-day-manh', 'o-truyen-thong'],
    avoidIds: ['non-quai-thao'],
    avoidReasons: {
      'non-quai-thao': 'Nón quai thao gắn liền với Áo tứ thân Kinh Bắc, không thuộc hệ thức phối cùng Áo dài cổ cao.'
    },
    culturalRationale:
      'Cổ áo cao lập lĩnh của Áo dài tôn trọn đường nét của kiềng bạc hoặc chuỗi ngọc trai; kết hợp sandal quai mảnh giúp bước đi thanh thoát, uyển chuyển.',
    aestheticNote: 'Tối giản phụ kiện vùng cổ và chọn giày thanh mảnh để giữ độ rủ thướt tha của hai tà áo.'
  },
  'ao-tu-than': {
    outfitId: 'ao-tu-than',
    outfitName: 'Áo tứ thân',
    primarySetFemale: ['non-quai-thao', 'vong-kieng-bac', 'sandal-day-manh'],
    primarySetMale: ['vong-kieng-bac', 'sandal-day-manh'],
    recommendedIds: ['non-quai-thao', 'vong-kieng-bac', 'sandal-day-manh', 'o-truyen-thong'],
    avoidIds: ['khan-dong', 'chuoi-ngoc-trai'],
    avoidReasons: {
      'khan-dong': 'Khăn đóng xếp chữ Nhất thuộc hệ ngũ thân lập lĩnh, không đội cùng Áo tứ thân yếm đào.',
      'chuoi-ngoc-trai': 'Áo tứ thân dân gian Kinh Bắc hài hòa với kiềng bạc nguyên khối hơn chuỗi ngọc trai tân thời.'
    },
    culturalRationale:
      'Nón quai thao và kiềng bạc nguyên khối là bộ đôi biểu tượng chuẩn mực của liền chị Kinh Bắc, làm nổi bật yếm lụa đào và bốn vạt áo thắt eo.',
    aestheticNote: 'Cân bằng độ rộng vành nón quai thao với vòng kiềng bạc sáng nơi cổ yếm.'
  },
  'ao-ngu-than': {
    outfitId: 'ao-ngu-than',
    outfitName: 'Áo ngũ thân',
    primarySetFemale: ['khan-dong', 'vong-kieng-bac', 'sandal-day-manh'],
    primarySetMale: ['khan-dong', 'sandal-day-manh'],
    recommendedIds: ['khan-dong', 'vong-kieng-bac', 'chuoi-ngoc-trai', 'sandal-day-manh', 'o-truyen-thong'],
    avoidIds: ['non-quai-thao'],
    avoidReasons: {
      'non-quai-thao': 'Áo ngũ thân lập lĩnh mang chuẩn mực lễ nghi triều Nguyễn, cần đi cùng khăn đóng thay vì nón quai thao.'
    },
    culturalRationale:
      'Khăn đóng xếp nếp chữ Nhất trên đầu cùng kiềng bạc ôm sát cổ lập lĩnh thể hiện sự đoan trang, đạo lý ngũ thường và phong thái cổ truyền.',
    aestheticNote: 'Ưu tiên khăn đóng gọn gàng để tôn phần cổ đứng vuông vắn và hàng 5 cúc đồng bên sườn.'
  },
  'ao-ba-ba': {
    outfitId: 'ao-ba-ba',
    outfitName: 'Áo bà ba',
    primarySetFemale: ['vong-kieng-bac', 'sandal-day-manh'],
    primarySetMale: ['sandal-day-manh'],
    recommendedIds: ['vong-kieng-bac', 'chuoi-ngoc-trai', 'sandal-day-manh', 'sneakers-retro-trang'],
    avoidIds: ['khan-dong', 'non-quai-thao'],
    avoidReasons: {
      'khan-dong': 'Khăn đóng lễ phục cung đình không phù hợp với nét bình dị, phóng khoáng của Áo bà ba Nam Bộ.',
      'non-quai-thao': 'Nón quai thao là đặc trưng văn hóa Kinh Bắc miền Bắc, không đi cùng Áo bà ba miền Tây.'
    },
    culturalRationale:
      'Áo bà ba Nam Bộ chuộng sự mộc mạc, thoáng đạt; điểm xuyết kiềng bạc hoặc ngọc trai nhẹ nhàng cùng sandal giúp giữ trọn nét duyên miền sông nước.',
    aestheticNote: 'Phối phụ kiện thanh mảnh, gọn nhẹ để tôn phom áo xẻ tà hai bên hông.'
  },
  'ao-nhat-binh': {
    outfitId: 'ao-nhat-binh',
    outfitName: 'Áo Nhật Bình',
    primarySetFemale: ['khan-dong', 'chuoi-ngoc-trai', 'sandal-day-manh'],
    primarySetMale: ['khan-dong', 'sandal-day-manh'],
    recommendedIds: ['khan-dong', 'chuoi-ngoc-trai', 'vong-kieng-bac', 'sandal-day-manh', 'o-truyen-thong'],
    avoidIds: ['non-quai-thao', 'sneakers-retro-trang'],
    avoidReasons: {
      'non-quai-thao': 'Áo Nhật Bình là lễ phục cung đình triều Nguyễn, kỵ phối cùng nón quai thao dân gian.',
      'sneakers-retro-trang': 'Giày thể thao làm giảm nét uy nghi, đài các của lễ phục cung đình Nhật Bình.'
    },
    culturalRationale:
      'Cổ chữ nhật thêu kim tuyến của Nhật Bình vốn rất lộng lẫy; phối cùng khăn vấn/khăn đóng và chuỗi ngọc trai tạo khí chất vương giả cung đình Huế.',
    aestheticNote: 'Chọn chuỗi ngọc trai hoặc kiềng bạc tinh tế để hòa quyện với hoa văn cổ áo và dải ngũ sắc nơi cổ tay.'
  },
  'ao-tac': {
    outfitId: 'ao-tac',
    outfitName: 'Áo Tấc',
    primarySetFemale: ['khan-dong', 'vong-kieng-bac', 'sandal-day-manh'],
    primarySetMale: ['khan-dong', 'sandal-day-manh'],
    recommendedIds: ['khan-dong', 'vong-kieng-bac', 'sandal-day-manh', 'o-truyen-thong'],
    avoidIds: ['non-quai-thao', 'sneakers-retro-trang'],
    avoidReasons: {
      'non-quai-thao': 'Áo Tấc là đại lễ phục quốc gia thời Nguyễn, bắt buộc đội khăn đóng chỉnh tề thay vì nón quai thao.',
      'sneakers-retro-trang': 'Áo Tấc tay thụng đại lễ đòi hỏi sự trang nghiêm, tránh phối cùng giày thể thao đường phố.'
    },
    culturalRationale:
      'Áo Tấc là đại lễ phục tay thụng bề thế; theo quy chuẩn cổ truyền, người mặc luôn đội khăn đóng chữ Nhất ngay ngắn để giữ trọn lễ nghi mực thước.',
    aestheticNote: 'Tiết chế phụ kiện rườm rà để đôi tay áo rộng dài và phom dáng đại lễ làm tâm điểm.'
  },
  'ao-tay-chen': {
    outfitId: 'ao-tay-chen',
    outfitName: 'Áo Tay Chẽn',
    primarySetFemale: ['khan-dong', 'chuoi-ngoc-trai', 'sandal-day-manh'],
    primarySetMale: ['khan-dong', 'sandal-day-manh'],
    recommendedIds: ['khan-dong', 'chuoi-ngoc-trai', 'vong-kieng-bac', 'sandal-day-manh', 'sneakers-retro-trang', 'o-truyen-thong'],
    avoidIds: ['non-quai-thao'],
    avoidReasons: {
      'non-quai-thao': 'Áo ngũ thân tay chẽn cổ lập lĩnh đồng bộ với khăn đóng hơn là nón quai thao.'
    },
    culturalRationale:
      'Phom tay chẽn ôm gọn nho nhã kết hợp ăn ý với khăn đóng và chuỗi ngọc trai (hoặc kiềng bạc), vừa giữ cốt cách truyền thống vừa thanh lịch hiện đại.',
    aestheticNote: 'Dễ dàng kết hợp cùng ngọc trai hoặc giày thanh lịch cho cả sự kiện văn hóa lẫn dạo phố.'
  },
  'giao-linh': {
    outfitId: 'giao-linh',
    outfitName: 'Áo Giao Lĩnh',
    primarySetFemale: ['vong-kieng-bac', 'sandal-day-manh'],
    primarySetMale: ['sandal-day-manh'],
    recommendedIds: ['vong-kieng-bac', 'sandal-day-manh', 'o-truyen-thong'],
    avoidIds: ['khan-dong', 'chuoi-ngoc-trai', 'sneakers-retro-trang'],
    avoidReasons: {
      'khan-dong': 'Khăn đóng xếp chữ Nhất phổ biến vào thời Nguyễn, chưa đồng nhất niên đại với Giao Lĩnh thời Lý - Trần - Lê.',
      'chuoi-ngoc-trai': 'Chuỗi ngọc trai tân thời kém ăn nhập với khí chất cổ xưa của Áo Giao Lĩnh cổ chéo.',
      'sneakers-retro-trang': 'Giày thể thao hiện đại dễ phá vỡ phom dáng cổ phục thụng thời Lý - Trần - Lê.'
    },
    culturalRationale:
      'Cổ áo đắp chéo chữ V thời Lý - Trần - Lê tạo khoảng mở thanh thoát nơi cổ, rất hợp điểm xuyết kiềng bạc cổ truyền để đúng chuẩn niên đại.',
    aestheticNote: 'Giữ phần đầu và cổ thông thoáng để tôn đường cắt chéo chữ V đặc trưng của Giao Lĩnh.'
  },
  'vien-linh': {
    outfitId: 'vien-linh',
    outfitName: 'Áo Viên Lĩnh',
    primarySetFemale: ['khan-dong', 'vong-kieng-bac', 'sandal-day-manh'],
    primarySetMale: ['khan-dong', 'sandal-day-manh'],
    recommendedIds: ['khan-dong', 'vong-kieng-bac', 'sandal-day-manh', 'o-truyen-thong'],
    avoidIds: ['non-quai-thao', 'sneakers-retro-trang'],
    avoidReasons: {
      'non-quai-thao': 'Viên Lĩnh mang phong thái quan phục/lễ phục uy nghiêm, không phối cùng nón quai thao dân gian.',
      'sneakers-retro-trang': 'Phom áo Viên Lĩnh bề thế cần hài hoặc sandal chỉn chu thay vì giày thể thao.'
    },
    culturalRationale:
      'Cổ tròn khép kín quanh chân cổ của Áo Viên Lĩnh toát lên vẻ uy nghiêm; kết hợp khăn đóng và kiềng bạc giúp tôn khí chất đĩnh đạc, khuôn thước.',
    aestheticNote: 'Phối khăn đóng chỉnh tề và kiềng bạc gọn sát cổ tròn để tạo tổng thể bệ vệ.'
  },
  'doi-kham': {
    outfitId: 'doi-kham',
    outfitName: 'Áo Đối Khâm',
    primarySetFemale: ['chuoi-ngoc-trai', 'vong-kieng-bac', 'sandal-day-manh'],
    primarySetMale: ['sandal-day-manh'],
    recommendedIds: ['chuoi-ngoc-trai', 'vong-kieng-bac', 'non-quai-thao', 'sandal-day-manh', 'o-truyen-thong'],
    avoidIds: ['khan-dong'],
    avoidReasons: {
      'khan-dong': 'Áo Đối Khâm hai vạt buông mở phóng khoáng thường tôn tóc búi/tóc dài và trang sức cổ thay vì khăn đóng lập lĩnh.'
    },
    culturalRationale:
      'Hai vạt áo song song buông mở để lộ lớp yếm lụa bên trong, tạo phông nền lý tưởng để tôn vinh vẻ đẹp nhiều tầng lớp của kiềng bạc và chuỗi ngọc trai.',
    aestheticNote: 'Kết hợp trang sức vùng cổ để tạo điểm nhấn thị giác ngay giữa hai vạt áo mở.'
  }
};

export function getOutfitAccessoryRecommendation(outfitId: OutfitId): OutfitAccessoryRecommendation {
  return OUTFIT_ACCESSORY_RECOMMENDATIONS[outfitId] || OUTFIT_ACCESSORY_RECOMMENDATIONS['ao-dai'];
}

export function getSuggestedAccessoriesForOutfit(
  outfitId: OutfitId,
  gender: 'female' | 'male' = 'female'
): string[] {
  const rec = getOutfitAccessoryRecommendation(outfitId);
  return gender === 'male' ? [...rec.primarySetMale] : [...rec.primarySetFemale];
}


export const ACCESSORIES_DATA: Accessory[] = [
  // Khăn
  {
    id: 'khan-dong',
    category: 'khan',
    categoryName: 'Khăn',
    name: 'Khăn đóng lụa',
    type: 'traditional',
    description: 'Khăn quấn xếp nếp chữ Nhất gọn gàng trên đầu, chuẩn mực phong thái nho nhã cổ truyền.'
  },
  {
    id: 'khan-ran',
    category: 'khan',
    categoryName: 'Khăn',
    name: 'Khăn rằn Nam Bộ',
    type: 'traditional',
    description: 'Họa tiết ca-rô đen trắng hoặc đỏ trắng mộc mạc, đậm hơi thở sông nước miền Tây.'
  },
  {
    id: 'khan-lua-to-tam',
    category: 'khan',
    categoryName: 'Khăn',
    name: 'Khăn lụa tơ tằm vắt vai',
    type: 'modern',
    description: 'Dải lụa mỏng buông lơi tạo điểm nhấn mềm mại, bay bổng theo từng bước đi.'
  },
  {
    id: 'bandana-cach-tan',
    category: 'khan',
    categoryName: 'Khăn',
    name: 'Bandana lụa hoa văn Việt',
    type: 'hybrid',
    description: 'Quấn cổ hoặc thắt tóc năng động mang phong cách đường phố trẻ trung.'
  },

  // Nón
  {
    id: 'non-la-truyen-thong',
    category: 'non',
    categoryName: 'Nón',
    name: 'Nón lá chóp truyền thống',
    type: 'traditional',
    description: 'Làm từ lá cọ phơi sương, quai nón lụa mềm mang vẻ đẹp thuần khiết Việt Nam.'
  },
  {
    id: 'non-quai-thao',
    category: 'non',
    categoryName: 'Nón',
    name: 'Nón quai thao thu nhỏ',
    type: 'traditional',
    description: 'Vành tròn phẳng dẹt với quai thao tua rua, điểm nhấn độc đáo của liền chị Kinh Bắc.'
  },
  {
    id: 'non-beret-da',
    category: 'non',
    categoryName: 'Nón',
    name: 'Nón beret cổ điển',
    type: 'modern',
    description: 'Hòa quyện nét thanh lịch phong cách Đông Dương (Indochine) và thời trang Tây phương.'
  },
  {
    id: 'non-bucket-linen',
    category: 'non',
    categoryName: 'Nón',
    name: 'Nón bucket linen thêu tay',
    type: 'hybrid',
    description: 'Trẻ trung, che nắng tốt, tạo phong cách dạo phố thoải mái cho các bạn trẻ.'
  },

  // Túi
  {
    id: 'tui-coi-quai-tre',
    category: 'tui',
    categoryName: 'Túi',
    name: 'Túi cói đan thủ công',
    type: 'traditional',
    description: 'Chất liệu lục bình hoặc cói mộc tự nhiên, mang lại cảm giác thân thiện với môi trường.'
  },
  {
    id: 'tui-tote-canvas',
    category: 'tui',
    categoryName: 'Túi',
    name: 'Túi tote canvas chữ Việt cách điệu',
    type: 'modern',
    description: 'Tiện lợi để tập vở hoặc laptop đi học, vừa thời trang vừa đậm tinh thần sinh viên.'
  },
  {
    id: 'tui-kep-nach-mini',
    category: 'tui',
    categoryName: 'Túi',
    name: 'Túi kẹp nách da tối giản',
    type: 'modern',
    description: 'Phom dáng gọn gàng, tăng vẻ thời thượng high-fashion khi diện áo dài hay ngũ thân.'
  },

  // Trang sức
  {
    id: 'vong-kieng-bac',
    category: 'trang-suc',
    categoryName: 'Trang sức',
    name: 'Vòng kiềng bạc nguyên khối',
    type: 'traditional',
    description: 'Chiếc kiềng tròn ôm sát cổ, tôn trọn vẹn đường nét thanh tú của cổ áo dài và ngũ thân.'
  },
  {
    id: 'chuoi-ngoc-trai',
    category: 'trang-suc',
    categoryName: 'Trang sức',
    name: 'Chuỗi vòng ngọc trai thanh lịch',
    type: 'modern',
    description: 'Ánh xà cừ ngọc trai đem đến vẻ đẹp đài các, dịu dàng chuẩn quý cô hiện đại.'
  },
  {
    id: 'khuyen-tai-kim-loai',
    category: 'trang-suc',
    categoryName: 'Trang sức',
    name: 'Khuyên tai hình học tối giản',
    type: 'hybrid',
    description: 'Điểm xuyết cá tính hiện đại, tạo sự tương phản thị giác thú vị với trang phục truyền thống.'
  },
  {
    id: 'tram-cai-toc',
    category: 'trang-suc',
    categoryName: 'Trang sức',
    name: 'Trâm cài tóc khảm xà cừ',
    type: 'traditional',
    description: 'Cố định búi tóc cao kiêu hãnh, vừa tao nhã vừa gợi nhớ nét quyền quý xưa.'
  },

  // Giày
  {
    id: 'guoc-moc-quai-nhung',
    category: 'giay',
    categoryName: 'Giày',
    name: 'Guốc mộc quai nhung',
    type: 'traditional',
    description: 'Âm thanh gõ lộc cộc đặc trưng trên sân gạch, gợi nhớ phong thái thong dong mộc mạc.'
  },
  {
    id: 'sneakers-retro-trang',
    category: 'giay',
    categoryName: 'Giày',
    name: 'Sneakers trắng cổ điển',
    type: 'hybrid',
    description: 'Công thức phối đồ ưa thích của Gen Z: năng động, tự tin sải bước suốt cả ngày dài.'
  },
  {
    id: 'boots-da-thap-co',
    category: 'giay',
    categoryName: 'Giày',
    name: 'Boots da thấp cổ',
    type: 'modern',
    description: 'Tạo diện mạo cá tính, góc cạnh và mạnh mẽ khi kết hợp cùng áo ngũ thân hay áo dài suông.'
  },
  {
    id: 'sandal-day-manh',
    category: 'giay',
    categoryName: 'Giày',
    name: 'Sandal quai mảnh thanh thoát',
    type: 'modern',
    description: 'Nhẹ nhàng tôn dáng chân, giúp các bước chuyển động trong tà áo dài thêm mềm mại.'
  },

  // Cầm tay / Đạo cụ
  {
    id: 'o-truyen-thong',
    category: 'cam-tay',
    categoryName: 'Cầm tay',
    name: 'Ô truyền thống Việt Nam',
    type: 'traditional',
    description: 'Dù lụa/giấy dầu nan tre cổ truyền thanh nhã, tôn vinh dáng dấp trang nhã cổ phong Việt phục.'
  }
];
