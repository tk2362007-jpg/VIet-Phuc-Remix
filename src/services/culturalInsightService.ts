import {
  OutfitLookState,
  OutfitId,
  OccasionId,
  StyleId,
  ColorId
} from '../types';
import { OUTFITS_DATA } from '../data/outfits';
import { OCCASIONS_DATA } from '../data/occasions';
import { ACCESSORIES_DATA } from '../data/accessories';
import { COLORS_DATA } from '../data/colors';
import { STYLES_DATA } from '../data/styles';

export interface AccessoryCulturalInsight {
  id: string;
  name: string;
  categoryName: string;
  type: 'traditional' | 'modern' | 'hybrid';
  culturalMeaning: string;
  pairingPhilosophy: string;
  funFact?: string;
}

export interface DynamicCulturalInsight {
  outfit: {
    id: OutfitId;
    name: string;
    vietnameseName: string;
    era: string;
    dynastyOrigin: string;
    philosophy: string;
    structuralCodes: string[];
    whatToPreserve: string;
    whyItMatters: string;
    proverbOrQuote?: string;
  };
  occasion: {
    id: OccasionId;
    name: string;
    nameVi: string;
    culturalSetting: string;
    decorumLevel: 'Nghi lễ trang trọng' | 'Chuẩn mực lễ hội' | 'Năng động dạo phố' | 'Sáng tạo lookbook';
    etiquetteGuidelines: string[];
    compatibilityAssessment: string;
    stylingDo: string;
    stylingDont: string;
  };
  accessories: AccessoryCulturalInsight[];
  color: {
    id: ColorId;
    name: string;
    nameVi: string;
    hex: string;
    symbolism: string;
    historicalMeaning: string;
  };
  style: {
    id: StyleId;
    name: string;
    nameVi: string;
    remixPhilosophy: string;
  };
  culturalSynergy: {
    harmonyScore: number; // 1 - 10
    verdict: string;
    culturalBadge: string;
    respectfulCheckSummary: string;
    genZTasteNote: string;
  };
}

// Deep cultural database for accessories
const ACCESSORY_CULTURAL_LORE: Record<string, { culturalMeaning: string; pairingPhilosophy: string; funFact?: string }> = {
  'khan-dong': {
    culturalMeaning: 'Khăn đóng xếp nếp hình chữ "Nhất" (一) ngay ngắn trên trán, biểu trưng cho sự chính trực, quang minh chính đại và phẩm hạnh mẫu mực của người xưa.',
    pairingPhilosophy: 'Khi phối với áo ngũ thân hay áo dài, khăn đóng nâng tầm khí chất đài các, giúp gương mặt bừng sáng và tôn khuôn mặt thanh tú.',
    funFact: 'Thời Nguyễn, khăn đóng màu đen là phổ biến nhất cho quan lại và thứ dân, mang đến diện mạo nghiêm trang, khiêm nhường.'
  },
  'khan-ran': {
    culturalMeaning: 'Gắn liền với hình ảnh người dân miền Tây sông nước và các nữ du kích Nam Bộ, tượng trưng cho tính cách kiên cường, đôn hậu, thủy chung và chân chất.',
    pairingPhilosophy: 'Rất ăn ý khi đi cùng áo bà ba hoặc phối tương phản như một chiếc khăn choàng cổ độc lạ trên nền áo dài cách tân trẻ trung.',
    funFact: 'Họa tiết carô đen-trắng của khăn rằn vốn có nguồn gốc từ văn hóa giao thoa Khmer - Việt, trở thành biểu tượng thân thương của phương Nam.'
  },
  'khan-lua-to-tam': {
    culturalMeaning: 'Đại diện cho nghề ươm tơ dệt lụa ngàn năm của các làng nghề truyền thống (Vạn Phúc, Mã Châu, Nha Xá), tượng trưng cho sự mềm mại, tinh khôi và thanh khiết.',
    pairingPhilosophy: 'Vắt nhẹ qua một bên vai hoặc quấn lơi quanh cổ tạo độ bay bổng và chuyển động uyển chuyển theo từng bước chân.',
    funFact: 'Lụa tơ tằm tự nhiên có khả năng điều hòa thân nhiệt, ấm áp mùa đông và mát rượi trong những ngày hè oi ả.'
  },
  'bandana-cach-tan': {
    culturalMeaning: 'Cầu nối giao thoa giữa thời trang đường phố (streetwear) quốc tế và họa tiết hoa văn gốm sứ/trống đồng hoặc hoa sen Việt Nam cách điệu.',
    pairingPhilosophy: 'Buộc quanh cổ áo, quấn ở cổ tay hoặc thắt quai túi xách, đem lại cảm giác phóng khoáng, phá cách đầy năng lượng tuổi trẻ.'
  },
  'non-la-truyen-thong': {
    culturalMeaning: 'Chiếc nón lá che nắng che mưa mộc mạc, lưu giữ cả một miền ký ức đồng quê Việt Nam với những bài thơ nón lá ẩn hiện dưới ánh nắng.',
    pairingPhilosophy: 'Cầm nhẹ trên tay hoặc quàng sau lưng khi chụp ảnh, tạo sự mềm mại, e ấp thuần Việt cho bất kỳ tà áo truyền thống nào.',
    funFact: 'Những chiếc nón bài thơ xứ Huế khi soi lên ánh sáng sẽ thấy hiện rõ hình chùa Thiên Mụ cùng đôi câu thơ tuyệt tác giấu giữa hai lớp lá.'
  },
  'non-quai-thao': {
    culturalMeaning: 'Đỉnh cao của trang phục liền chị quan họ Kinh Bắc, với vành nón phẳng rộng như mặt trời nhỏ và dải quai thao bằng lụa rủ dài lộng lẫy.',
    pairingPhilosophy: 'Tạo điểm nhấn thị giác hoành tráng và hoài cổ khi phối cùng áo tứ thân hoặc concept chụp ảnh lookbook nghệ thuật.',
    funFact: 'Làm một chiếc nón quai thao xưa đòi hỏi tới 32 công đoạn tỉ mỉ từ chọn lá cọ, chuốt nan tre đến bện tơ thao óng ả.'
  },
  'non-beret-da': {
    culturalMeaning: 'Hơi thở phong cách Indochine (Đông Dương thập niên 1930 - 1950), nơi nghệ thuật phương Tây hòa quyện cùng cốt cách Á Đông nho nhã.',
    pairingPhilosophy: 'Phối cùng áo ngũ thân tay chẽn hoặc áo dài nam/nữ tạo nên vẻ ngoài trí thức, nghệ sĩ và đậm chất điện ảnh hoài niệm.'
  },
  'non-bucket-linen': {
    culturalMeaning: 'Sự tiếp biến hiện đại: giữ chất liệu sợi tự nhiên (linen/đũi) mộc mạc của cha ông nhưng ứng dụng phom dáng dạo phố năng động thế kỷ 21.',
    pairingPhilosophy: 'Rất hợp với áo bà ba cách tân hoặc áo dài suông khi đi dạo phố cuối tuần, vừa bảo vệ khỏi nắng hè vừa cá tính.'
  },
  'tui-coi-quai-tre': {
    culturalMeaning: 'Biểu tượng của lối sống xanh và sự gắn kết mật thiết giữa làng quê thủ công mỹ nghệ Việt Nam (bèo lục bình, tre trúc, cói Nga Sơn) với thời trang bền vững.',
    pairingPhilosophy: 'Tạo cảm giác mộc mạc, gần gũi và thư thái cho các buổi dạo phố, chụp ảnh hoa xuân hay ghé thăm các quán trà truyền thống.'
  },
  'tui-tote-canvas': {
    culturalMeaning: 'Ngôn ngữ của sinh viên và giới trẻ Việt đương đại: yêu di sản nhưng luôn mang theo sách vở, laptop và tinh thần học hỏi tiến bộ.',
    pairingPhilosophy: 'Tuyệt vời cho phong cách áo dài đi học hoặc áo ngũ thân tối giản đến trường, tạo sự bình dị, tiện dụng cao.'
  },
  'tui-kep-nach-mini': {
    culturalMeaning: 'Dấu ấn high-fashion hiện đại: phom dáng góc cạnh, nhỏ gọn tôn lên đường cong thắt eo và tà áo dài buông rủ mà không làm nặng nề tổng thể.',
    pairingPhilosophy: 'Cầm tay hoặc kẹp nách nhẹ nhàng trong các buổi tiệc tối hoặc sự kiện thời trang văn hóa.'
  },
  'vong-kieng-bac': {
    culturalMeaning: 'Chiếc kiềng tròn nguyên khối tượng trưng cho sự vẹn toàn, viên mãn và phú quý; từng là của hồi môn quý giá của các tiểu thư khuê các thời phong kiến.',
    pairingPhilosophy: 'Ôm sát vòng cổ, làm nổi bật đường cắt thanh thoát của cổ áo lập lĩnh ngũ thân hay cổ cao áo dài truyền thống.',
    funFact: 'Bạc ta nguyên chất còn được cha ông tin rằng có khả năng kỵ gió, bảo vệ sức khỏe và đem lại bình an cho người đeo.'
  },
  'chuoi-ngoc-trai': {
    culturalMeaning: 'Ánh xà cừ ngọc trai biểu trưng cho vẻ đẹp tinh khôi, sự kiên nhẫn tôi luyện theo năm tháng và nét đài các của phụ nữ Hà thành xưa.',
    pairingPhilosophy: 'Đeo một hoặc hai vòng nhẹ trước ngực, mang đến vẻ quý phái sang trọng cho áo dài nhung, áo ngũ thân lụa tơ tằm.'
  },
  'khuyen-tai-kim-loai': {
    culturalMeaning: 'Chi tiết kim loại hình học tối giản phản chiếu cá tính độc lập, mạnh mẽ của thế hệ Gen Z yêu chuộng sự tự do thể hiện bản thân.',
    pairingPhilosophy: 'Tạo nên sự đối lập thú vị giữa nét cổ phong của trang phục và nét avant-garde của trang sức đương đại.'
  },
  'tram-cai-toc': {
    culturalMeaning: 'Trâm cài thể hiện sự gia giáo, phong thái đoan trang và nét e ấp của mái tóc phụ nữ Á Đông búi cao kiêu hãnh.',
    pairingPhilosophy: 'Cố định búi tóc sau gáy hoặc tạo điểm nhấn bên mái tóc tết, giúp phần gáy và cổ áo hiện ra thanh thoát tuyệt đối.'
  },
  'guoc-moc-quai-nhung': {
    culturalMeaning: 'Âm thanh "lộc cộc" của guốc mộc trên sân gạch làng quê là thanh âm ký ức của nhiều thế hệ, gìn giữ nhịp bước chậm rãi, thong thả của người Việt xưa.',
    pairingPhilosophy: 'Mộc mạc nhưng kiêu sa, khi phối cùng áo tứ thân hay áo bà ba mang lại cảm giác hoài cổ vô cùng chân thực.'
  },
  'sneakers-retro-trang': {
    culturalMeaning: 'Biểu tượng của sự tự do chuyển động và năng lượng tuổi trẻ: chứng minh rằng Việt phục không hề gò bó trong bảo tàng mà hoàn toàn có thể bước ra phố.',
    pairingPhilosophy: 'Mix cùng áo ngũ thân cách tân dáng suông hoặc áo dài lụa mang lại sự thoải mái tuyệt đối cho cả ngày dài trải nghiệm.'
  },
  'boots-da-thap-co': {
    culturalMeaning: 'Nét giao thoa phong cách cá tính: tăng thêm vẻ đĩnh đạc, hiện đại và quyền lực cho trang phục truyền thống.',
    pairingPhilosophy: 'Rất hợp với áo ngũ thân nam/nữ hoặc áo dài dáng suông hiện đại, tạo nên diện mạo ấn tượng trong các bộ ảnh thời trang.'
  },
  'sandal-day-manh': {
    culturalMeaning: 'Thiết kế thanh mảnh, tối giản tôn trọn bước chân thanh thoát, nhẹ nhàng tựa như làn gió mùa xuân.',
    pairingPhilosophy: 'Lựa chọn tinh tế giúp kéo dài đôi chân và tạo sự uyển chuyển khi tà áo dài hay áo tứ thân khẽ lay động.'
  }
};

export function getDynamicCulturalInsight(look: OutfitLookState): DynamicCulturalInsight {
  const outfitData = OUTFITS_DATA.find((o) => o.id === look.outfit) || OUTFITS_DATA[0];
  const occasionData = OCCASIONS_DATA.find((o) => o.id === look.occasion) || OCCASIONS_DATA[0];
  const colorData = COLORS_DATA.find((c) => c.id === look.color) || COLORS_DATA[0];
  const styleData = STYLES_DATA.find((s) => s.id === look.style) || STYLES_DATA[0];

  // Map accessories cultural data
  const accessoryInsights: AccessoryCulturalInsight[] = look.accessories.map((accId) => {
    const rawAcc = ACCESSORIES_DATA.find((a) => a.id === accId);
    const lore = ACCESSORY_CULTURAL_LORE[accId] || {
      culturalMeaning: 'Món phụ kiện tạo điểm nhấn bổ trợ tinh tế cho trang phục.',
      pairingPhilosophy: 'Phối màu hòa sắc hài hòa với tà áo và giày.'
    };
    return {
      id: accId,
      name: rawAcc?.name || 'Phụ kiện',
      categoryName: rawAcc?.categoryName || 'Phụ kiện',
      type: rawAcc?.type || 'modern',
      culturalMeaning: lore.culturalMeaning,
      pairingPhilosophy: lore.pairingPhilosophy,
      funFact: lore.funFact
    };
  });

  // Dynamic Outfit Insights
  let dynastyOrigin = 'Thế kỷ 18 - 20';
  let philosophy = 'Tôn vinh vẻ đẹp kín đáo, trang nhã và linh hoạt của người Việt.';
  let structuralCodes = ['Cổ áo lập lĩnh', 'Tà áo buông rủ', 'Quần lụa ống rộng'];
  let whatToPreserve = 'Độ kín đáo của cổ áo và tỷ lệ cân đối giữa tà trước - sau.';
  let whyItMatters = 'Là biểu tượng kết tinh bản sắc văn hóa qua nhiều thời kỳ.';
  let proverbOrQuote = 'Y phục xứng kỳ đức — Trang phục thể hiện phẩm hạnh và tâm hồn.';

  switch (outfitData.id) {
    case 'ao-dai':
      dynastyOrigin = 'Tiến hóa từ áo ngũ thân thời chúa Nguyễn Phúc Khoát (1744) qua cải cách Le Mur Cát Tường & Lê Phổ (1930s)';
      philosophy = 'Sự dung hòa giữa lễ giáo truyền thống Á Đông và tư duy thẩm mỹ giải phóng cơ thể hiện đại, ôm sát nhưng vẫn kín đáo, thanh thoát.';
      structuralCodes = [
        'Cổ lập lĩnh (cổ đứng truyền thống) hoặc cổ thuyền nhẹ',
        'Hai tà áo xẻ từ eo buông dài chấm mu bàn chân',
        'Hàng khuy bấm/khóa sườn kín đáo',
        'Quần lụa dài chạm gót tạo nhịp bước tha thướt'
      ];
      whatToPreserve = 'Giữ đường xẻ tà không quá cao trên rốn và chất vải có độ rũ mềm mại, tránh chất liệu mỏng xuyên thấu thiếu tinh tế.';
      whyItMatters = 'Áo dài được thế giới công nhận là biểu tượng di sản sống của Việt Nam, gắn liền với hình ảnh người phụ nữ trí thức, kiêu hãnh.';
      proverbOrQuote = 'Đẹp vô cùng Tổ quốc ta ơi / Rừng cọ đồi chè, đồng xanh ngào ngạt / Nắng chói sông Lô, hò ô tiếng hát / Chuyến phà dào dạt bến nước Bình Ca.';
      break;

    case 'ao-ngu-than':
      dynastyOrigin = 'Định chế Quốc phục thời chúa Nguyễn Phúc Khoát (1744) và toàn quốc thời vua Minh Mạng (1837)';
      philosophy = 'Đại diện cho đạo lý Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín) và tinh thần bình đẳng nam nữ trong lễ nghi phong kiến Việt Nam.';
      structuralCodes = [
        'Cấu trúc 5 thân: 4 vạt ngoài đại diện Tứ thân phụ mẫu, 1 thân con bên trong',
        '5 cúc cài bên sườn tượng trưng cho ngũ thường của người quân tử',
        'Cổ lập lĩnh đứng vuông vắn, nghiêm trang',
        'Tay áo chẽn gọn gàng hoặc tay thụng (áo tấc) đại lễ'
      ];
      whatToPreserve = 'Phom dáng áo thẳng thớm, cổ đứng gãy gọn không bị bẻ quăn, cài đủ hàng cúc sườn.';
      whyItMatters = 'Áo ngũ thân là gốc rễ trực tiếp sinh ra Áo dài ngày nay, là niềm tự hào lớn trong phong trào phục hưng cổ phục của giới trẻ Việt.';
      proverbOrQuote = 'Nhân - Lễ - Nghĩa - Trí - Tín: Năm hạt cúc áo nhắc nhở người mặc sống chính trực và giữ trọn đạo làm người.';
      break;

    case 'ao-tu-than':
      dynastyOrigin = 'Bắc Bộ từ thế kỷ 12 đến đầu thế kỷ 20, gắn liền với các vùng đất văn vật Kinh Bắc';
      philosophy = 'Đại diện cho đạo hiếu (Tứ thân phụ mẫu đôi bên), tinh thần lao động cần cù và nét duyên dáng, e ấp của người phụ nữ nông nghiệp truyền thống.';
      structuralCodes = [
        'Bốn thân áo: 2 vạt sau khâu liền thành sống lưng, 2 vạt trước để buông hoặc thắt vạt',
        'Yếm lụa đào cổ xây hoặc cổ xẻ sâu kín đáo bên trong',
        'Thắt lưng lụa xanh/hồng xuyến duyên dáng ngang eo',
        'Khăn mỏ quạ và nón quai thao che chở nét xuân'
      ];
      whatToPreserve = 'Độ kín đáo của yếm lót và nét mềm mại của nút thắt vạt áo phía trước bụng.';
      whyItMatters = 'Là cái nôi lưu giữ âm hưởng dân ca quan họ Bắc Ninh - Di sản văn hóa phi vật thể của nhân loại.';
      proverbOrQuote = 'Người ơi người ở đừng về — Áo tứ thân chở che tình nghĩa đậm sâu của đôi bờ sông Cầu.';
      break;

    case 'ao-ba-ba':
      dynastyOrigin = 'Nam Bộ khoảng giữa thế kỷ 19, chịu ảnh hưởng từ sự giao thoa văn hóa sông nước phương Nam';
      philosophy = 'Tượng trưng cho sự khoáng đạt, hào sảng, thật thà và tinh thần lao động kiên cường của người dân miệt vườn sông nước miền Tây.';
      structuralCodes = [
        'Thân áo ngắn vừa chớm hông, nhấn nhẹ eo tự nhiên',
        'Xẻ tà hai bên hông tạo sự linh hoạt khi chèo xuồng, đi lại',
        'Hai túi đắp phía trước vạt tiện dụng đựng vật dụng thường ngày',
        'Cổ tròn hoặc xẻ tim nhẹ nhàng, phóng khoáng'
      ];
      whatToPreserve = 'Sự tự nhiên, mộc mạc và độ bay nhẹ của vạt áo ngắn; không nên đính kết phụ kiện quá nặng nề.';
      whyItMatters = 'Biểu tượng bất khuất của người phụ nữ miền Nam trong các cuộc kháng chiến và vẻ đẹp hiền hòa thời bình.';
      proverbOrQuote = 'Chiếc áo bà ba trên dòng sông xanh thẳm / Thấp thoáng con xuồng bé nhỏ lướt trên sóng nước.';
      break;
  }

  // Occasion Decorum & Etiquette
  let decorumLevel: DynamicCulturalInsight['occasion']['decorumLevel'] = 'Chuẩn mực lễ hội';
  let etiquetteGuidelines: string[] = [];
  let stylingDo = '';
  let stylingDont = '';
  let compatibilityAssessment = '';

  switch (occasionData.id) {
    case 'school':
      decorumLevel = 'Chuẩn mực lễ hội';
      etiquetteGuidelines = [
        'Ưu tiên sự trang nhã, gọn gàng, thanh lịch nơi giảng đường.',
        'Hạn chế tà áo quá dài quét đất gây vướng víu khi lên xuống cầu thang lớp học.',
        'Tránh phụ kiện cồng kềnh lấp lánh; ưu tiên túi tote canvas, kẹp tóc ngọc trai hoặc balo vải mộc.'
      ];
      stylingDo = 'Chọn gam màu thanh nhã (kem ngà, pastel), phối cùng giày bệt hoặc sneaker trắng năng động.';
      stylingDont = 'Không chọn chất liệu xuyên thấu hoặc xẻ tà cao quá eo gây mất thiện cảm học đường.';
      compatibilityAssessment = outfitData.id === 'ao-dai'
        ? 'Tuyệt đối hoàn hảo! Áo dài là hình ảnh gắn liền với tuổi học trò và giảng đường Việt Nam suốt hàng thập kỷ.'
        : 'Rất mới lạ và cá tính, giúp bạn nổi bật trong các buổi thuyết trình văn hóa hoặc ngày hội sinh viên.';
      break;

    case 'festival':
      decorumLevel = 'Chuẩn mực lễ hội';
      etiquetteGuidelines = [
        'Dịp đầu năm, lễ hội hoa đăng, du xuân là lúc tôn vinh các gam màu rực rỡ, may mắn.',
        'Trang phục nên tạo cảm giác tươi vui, tràn đầy sinh khí đón chào điều lành.',
        'Tôn trọng không gian tâm linh đền chùa: kín cổ, không hở hang khi dâng hương cúng bái.'
      ];
      stylingDo = 'Phối màu Đỏ Crimson, Đỏ Rượu Burgundy hoặc Vàng Hoàng Yến kết hợp khăn đóng hoặc kiềng bạc.';
      stylingDont = 'Tránh mặc toàn màu đen hoặc trang phục rách cách điệu khi đi chúc Tết gia đình người lớn.';
      compatibilityAssessment = 'Sự kết hợp xuất sắc! Tà áo truyền thống hòa vào không khí lễ hội tạo nên bức tranh văn hóa rực rỡ sắc xuân.';
      break;

    case 'photoshoot':
      decorumLevel = 'Sáng tạo lookbook';
      etiquetteGuidelines = [
        'Không gian tự do thể nghiệm mỹ cảm cá nhân và thị giác đương đại.',
        'Có thể thử nghiệm các góc máy cinematic, ánh sáng nghệ thuật và độ tương phản màu sắc.',
        'Dù phá cách, hãy giữ linh hồn của cổ phục để bức ảnh toát lên chiều sâu văn hóa.'
      ];
      stylingDo = 'Mạnh dạn mix cùng phụ kiện avant-garde: boots da thấp cổ, kính mắt cổ điển, hoa sen cầm tay.';
      stylingDont = 'Tránh biến tấu lệch lạc làm biến dạng cấu trúc văn hóa nguyên bản của áo.';
      compatibilityAssessment = 'Lựa chọn lý tưởng để tạo nên bộ ảnh editorial thời trang vừa đậm chất Việt vừa thời thượng quốc tế.';
      break;

    case 'wedding':
      decorumLevel = 'Nghi lễ trang trọng';
      etiquetteGuidelines = [
        'Hôn lễ là nghi thức đại sự gia đình, đòi hỏi sự chỉn chu và trang trọng bậc nhất.',
        'Nếu là cô dâu/chú rể: Áo dài/ngũ thân đỏ hoặc vàng gấm là lựa chọn thiêng liêng nhất.',
        'Nếu là khách mời: Tránh lấn át trang phục nhân vật chính bằng màu đỏ rực rỡ nếu gia chủ chưa quy định dresscode.'
      ];
      stylingDo = 'Giữ phom dáng thẳng thớm, ủi phẳng phiu, cài khuy chỉnh tề, phối cùng trang sức bạc hoặc ngọc trai.';
      stylingDont = 'Không phối cùng giày dép xỏ ngón, quần rách gấu hoặc phụ kiện phong cách đường phố nổi loạn.';
      compatibilityAssessment = outfitData.id === 'ao-ba-ba'
        ? 'Áo bà ba chỉ phù hợp với tiệc cưới miệt vườn thân mật; trong lễ bái gia tiên nên ưu tiên Áo dài hoặc Áo ngũ thân.'
        : 'Lựa chọn trang trọng đỉnh cao! Tôn trọng gia đình hai họ và ghi dấu khoảnh khắc thiêng liêng.';
      break;

    case 'casual':
      decorumLevel = 'Năng động dạo phố';
      etiquetteGuidelines = [
        'Mang trang phục truyền thống vào nhịp sống thường nhật như cà phê cuối tuần, dạo phố cổ.',
        'Đề cao sự thoải mái, thông thoáng, dễ vận động.',
        'Chứng minh Việt phục không hề xa cách mà có thể đồng hành cùng Gen Z mỗi ngày.'
      ];
      stylingDo = 'Phối áo suông thoải mái cùng quần âu, túi cói, kính râm và giày sneaker trắng.';
      stylingDont = 'Không cần mang quá nhiều phụ kiện nghi lễ nặng nề khiến bước đi thiếu tự nhiên.';
      compatibilityAssessment = outfitData.id === 'ao-ba-ba' || outfitData.id === 'ao-dai'
        ? 'Cực kỳ phù hợp và gần gũi! Biến mỗi góc phố thành sàn diễn thời trang tự nhiên.'
        : 'Mang lại sự trầm trồ thích thú từ mọi người xung quanh bởi nét thanh nhã giữa phố phường hiện đại.';
      break;

    case 'cultural-event':
      decorumLevel = 'Nghi lễ trang trọng';
      etiquetteGuidelines = [
        'Giao lưu quốc tế, tọa đàm di sản, triển lãm di sản đòi hỏi tính chính xác lịch sử cao.',
        'Trang phục là bộ mặt đại diện cho văn hóa dân tộc trước công chúng.',
        'Hiểu rõ câu chuyện về nguồn gốc chiếc áo mình đang mặc để sẵn sàng chia sẻ.'
      ];
      stylingDo = 'Chọn áo may đúng phom cổ truyền, vải tơ lụa hoặc gấm dệt tinh xảo, phối kiềng bạc hoặc trâm cài.';
      stylingDont = 'Tránh các chi tiết biến tấu quá đà gây hiểu nhầm về quy chuẩn cổ phục truyền thống.';
      compatibilityAssessment = 'Sự lựa chọn hoàn hảo! Thể hiện lòng tự hào dân tộc và phong thái đĩnh đạc của thế hệ trẻ Việt Nam.';
      break;

    case 'work':
      decorumLevel = 'Nghi lễ trang trọng';
      etiquetteGuidelines = [
        'Ưu tiên sự gọn gàng, đĩnh đạc và thuận tiện khi làm việc nhiều giờ.',
        'Tránh phụ kiện rườm rà dễ vướng víu bàn làm việc hoặc máy tính.',
        'Chọn chất liệu thoáng khí, giữ phom đứng tôn vinh khí chất công sở.'
      ];
      stylingDo = 'Chọn áo ngũ thân hoặc áo dài cách tân màu nhã nhặn, phối cùng giày da hoặc giày bệt tối giản.';
      stylingDont = 'Tránh tà áo quá dài quét đất hoặc cổ áo khoét quá rộng không hợp môi trường công sở.';
      compatibilityAssessment = 'Tạo dấu ấn cá nhân chuyên nghiệp và đậm đà bản sắc tự hào tại nơi làm việc.';
      break;

    case 'tet':
      decorumLevel = 'Chuẩn mực lễ hội';
      etiquetteGuidelines = [
        'Ngày đầu năm sum vầy, tôn vinh sắc thái tươi vui, may mắn và ấm áp.',
        'Giữ thái độ cung kính khi chúc Tết ông bà, cha mẹ và họ hàng.',
        'Trang phục thanh lịch, kín đáo khi dâng hương lễ Phật ngày mùng Một.'
      ];
      stylingDo = 'Diện tone Đỏ son, Đỏ rượu, Vàng hoàng yến hoặc Kem ngà kết hợp khăn đóng hoặc kiềng bạc.';
      stylingDont = 'Hạn chế mặc cả cây màu đen trơn hoặc trang phục rách tả tơi trong sáng mùng Một Tết.';
      compatibilityAssessment = 'Hoàn hảo và rực rỡ! Mang trọn không khí xuân Tết cổ truyền thiêng liêng và sum vầy.';
      break;

    case 'travel':
      decorumLevel = 'Năng động dạo phố';
      etiquetteGuidelines = [
        'Ưu tiên tính gọn nhẹ, dễ xếp vào vali và thuận tiện di chuyển cả ngày.',
        'Lựa chọn gam màu nổi bật hài hòa với cảnh quan thiên nhiên hoặc di tích cổ.',
        'Tôn trọng quy định trang phục khi ghé thăm các đền đài, lăng tẩm, chùa chiền.'
      ];
      stylingDo = 'Phối cùng nón lá, túi cói, giày sneaker êm ái hoặc dép quai mảnh dễ đi bộ.';
      stylingDont = 'Tránh mang giày cao gót nhọn khi leo bậc đá tại các khu di tích cổ kính.';
      compatibilityAssessment = 'Bản phối lý tưởng để lưu giữ những khung hình kỷ niệm tuyệt đẹp trên mọi miền đất nước.';
      break;

    case 'other':
    default:
      decorumLevel = 'Năng động dạo phố';
      etiquetteGuidelines = [
        'Tự do sáng tạo thể hiện phong cách riêng nhưng vẫn giữ nét duyên dáng cốt lõi.',
        'Lắng nghe cảm xúc và sự tự tin của bản thân khi diện Việt phục.'
      ];
      stylingDo = 'Thử nghiệm các phụ kiện đương đại kết hợp tinh tế cùng cổ phục.';
      stylingDont = 'Tránh biến dạng cấu trúc cơ bản làm mất đi nhận diện trang phục truyền thống.';
      compatibilityAssessment = 'Một tuyên ngôn thời trang độc bản tôn vinh sự kết nối giữa quá khứ và hiện tại.';
      break;
  }

  // Cultural Harmony Scoring & Summary
  let harmonyScore = 9;
  let verdict = 'Bản Phối Hài Hòa & Giàu Bản Sắc (Respectful Heritage Remix)';
  let culturalBadge = 'Bản Sắc Việt Chuẩn Mực';
  let respectfulCheckSummary = 'Trang phục gìn giữ trọn vẹn nét tôn nghiêm truyền thống kết hợp khéo léo cùng nhịp thở đương đại.';
  let genZTasteNote = 'Bản phối có sự tiết chế thông minh, giữ được khí chất thanh lịch cổ xưa mà không bị già dặn.';

  // Scoring nuances
  if (occasionData.id === 'wedding' && styleData.id === 'street') {
    harmonyScore = 7;
    verdict = 'Phá Cách Nổi Bật — Cần Lưu Ý Không Gian Lễ Nghi';
    culturalBadge = 'Cá Tính Đương Đại';
    respectfulCheckSummary = 'Phong cách đường phố trong tiệc cưới mang lại năng lượng trẻ trung cho bạn bè, nhưng cần lưu ý khi bước vào nghi lễ cúng gia tiên nghiêm cẩn.';
    genZTasteNote = 'Nên thay đôi sneaker hầm hố bằng một đôi giày da thanh lịch trong giờ làm lễ chính thức.';
  } else if (outfitData.id === 'ao-ngu-than' && (occasionData.id === 'cultural-event' || occasionData.id === 'wedding')) {
    harmonyScore = 10;
    verdict = 'Đỉnh Cao Phong Thái Cổ Điển & Chuẩn Mực';
    culturalBadge = 'Di Sản Thuần Việt Tinh Tế';
    respectfulCheckSummary = 'Áo ngũ thân với cổ lập lĩnh và 5 cúc ngũ thường là lựa chọn danh giá nhất cho sự kiện trang trọng.';
    genZTasteNote = 'Một chiếc vòng kiềng bạc hoặc quạt giấy xếp sẽ hoàn thiện diện mạo quý tộc hoàn hảo.';
  } else if (outfitData.id === 'ao-ba-ba' && occasionData.id === 'casual') {
    harmonyScore = 10;
    verdict = 'Gần Gũi Thuần Phác & Thời Thượng Đời Thường';
    culturalBadge = 'Hồn Quê Phố Thị';
    respectfulCheckSummary = 'Phục dựng vẻ đẹp bình dị Nam Bộ trong không gian hiện đại với sự hòa quyện tuyệt vời.';
    genZTasteNote = 'Mix cùng quần jeans suông cạp cao và túi cói mộc để tạo nên diện mạo Gen Z cực kỳ cuốn hút.';
  }

  return {
    outfit: {
      id: outfitData.id,
      name: outfitData.name,
      vietnameseName: outfitData.vietnameseName,
      era: outfitData.era,
      dynastyOrigin,
      philosophy,
      structuralCodes,
      whatToPreserve,
      whyItMatters,
      proverbOrQuote
    },
    occasion: {
      id: occasionData.id,
      name: occasionData.name,
      nameVi: occasionData.nameVi,
      culturalSetting: occasionData.description,
      decorumLevel,
      etiquetteGuidelines,
      compatibilityAssessment,
      stylingDo,
      stylingDont
    },
    accessories: accessoryInsights,
    color: {
      id: colorData.id,
      name: colorData.name,
      nameVi: colorData.nameVi,
      hex: colorData.hex,
      symbolism: colorData.culturalMeaning,
      historicalMeaning: `Sắc ${colorData.nameVi} mang hơi thở của đất trời và ngũ hành văn hóa Việt.`
    },
    style: {
      id: styleData.id,
      name: styleData.name,
      nameVi: styleData.nameVi,
      remixPhilosophy: styleData.description
    },
    culturalSynergy: {
      harmonyScore,
      verdict,
      culturalBadge,
      respectfulCheckSummary,
      genZTasteNote
    }
  };
}
