import { Outfit, OutfitId } from '../types';
import aoDaiImg from '../assets/images/ao_dai_look_1789613767841.jpg';
import aoTuThanImg from '../assets/images/ao_tu_than_1789613779510.jpg';
import aoNguThanImg from '../assets/images/ao_ngu_than_1789613791206.jpg';
import aoBaBaImg from '../assets/images/ao_ba_ba_1789613803910.jpg';
import aoNhatBinhImg from '../assets/images/ao_nhat_binh_panel_1790835266236.jpg';
import aoTacImg from '../assets/images/ao_tac_nam_1791534791565.jpg';
import aoTayChenImg from '../assets/images/regenerated_image_1791532924012.png';
import aoGiaoLinhImg from '../assets/images/ao_giao_linh_outfit_1791526657514.jpg';
import aoVienLinhImg from '../assets/images/ao_vien_linh_nam_1791534759869.jpg';
import aoDoiKhamImg from '../assets/images/ao_doi_kham_outfit_1791526682660.jpg';
import vietPhucImg from '../assets/images/regenerated_image_1791532569087.png';
import coPhucNguyenTrieuImg from '../assets/images/co_phuc_nguyen_trieu_1791532424307.jpg';

export type ExploreGroupCategory =
  | 'all'
  | 'cung-dinh-le-phuc'
  | 'he-ngu-than'
  | 'co-phuc-cac-trieu-dai'
  | 'khai-niem-he-thong'
  | 'truyen-thong-can-dai';

export interface ExploreVietPhucItem extends Omit<Outfit, 'id' | 'gender'> {
  id: string;
  /** Maps to one of the 4 core Studio outfits when the user clicks "Remix this" */
  studioOutfitId: OutfitId;
  groupCategory: Exclude<ExploreGroupCategory, 'all'>;
  groupCategoryLabel: string;
  /** 1. Tên trang phục */
  name: string;
  vietnameseName: string;
  /** 2. Tên gọi khác nếu có */
  alternativeNames: string;
  /** 3. Thời kỳ / triều đại */
  era: string;
  /** 4. Bối cảnh lịch sử */
  context: string;
  /** 5. Đối tượng sử dụng */
  wearers: string;
  /** 6. Đặc điểm thiết kế */
  features: string[];
  /** 7. Kiểu cổ áo */
  collarStyle: string;
  /** 8. Kiểu tay áo */
  sleeveStyle: string;
  /** 9. Phom dáng / cấu trúc */
  silhouetteStructure: string;
  /** 10. Chất liệu thường gặp nếu có thông tin đáng tin cậy */
  commonMaterials: string;
  /** 11. Màu sắc / hoa văn đặc trưng nếu có */
  colorsAndMotifs: string;
  /** 12. Dịp sử dụng / bối cảnh mặc */
  whenAppropriate: string;
  /** 13. Ý nghĩa văn hóa */
  significance: string;
  /** 14. Ghi chú về cách gọi hoặc phạm vi sử dụng */
  terminologyAndScopeNote: string;
  /** Visual diagram motif type for structural illustration badge */
  diagramType:
    | 'nhat-binh'
    | 'ao-tac'
    | 'ngu-than'
    | 'tay-chen'
    | 'giao-linh'
    | 'vien-linh'
    | 'doi-kham'
    | 'viet-phuc'
    | 'viet-co-phuc'
    | 'nguyen-trieu'
    | 'ao-dai'
    | 'tu-than'
    | 'ba-ba';
}

export const EXPLORE_GROUP_TABS: {
  id: ExploreGroupCategory;
  label: string;
}[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'cung-dinh-le-phuc', label: 'Cung đình & Lễ phục' },
  { id: 'he-ngu-than', label: 'Hệ Áo Ngũ Thân' },
  { id: 'co-phuc-cac-trieu-dai', label: 'Giao Lĩnh · Viên Lĩnh · Đối Khâm' },
  { id: 'khai-niem-he-thong', label: 'Khái niệm & Hệ thống Cổ phục' },
  { id: 'truyen-thong-can-dai', label: 'Áo Dài · Tứ Thân · Bà Ba' }
];

export const EXPLORE_VIET_PHUC_DATA: ExploreVietPhucItem[] = [
  // ===========================================================================
  // 1. ÁO NHẬT BÌNH
  // ===========================================================================
  {
    id: 'ao-nhat-binh',
    studioOutfitId: 'ao-nhat-binh',
    groupCategory: 'cung-dinh-le-phuc',
    groupCategoryLabel: 'Cổ phục cung đình & Lễ phục',
    diagramType: 'nhat-binh',
    name: 'Áo Nhật Bình',
    vietnameseName: 'Áo Nhật Bình Cung Đình Triều Nguyễn',
    alternativeNames: 'Nhật Bình y (日平衣), Áo Phi Phong cung đình Huế',
    subtitle: 'Tuyệt tác mỹ thuật cung đình của bậc hậu phi, công chúa và mệnh phụ thời Nguyễn',
    era: 'Triều Nguyễn (1802–1945), kế thừa và cải biên từ dạng áo Phi Phong thời Lê Trung Hưng – Chúa Nguyễn',
    description:
      'Lễ phục và thường phục cao cấp của nữ giới hoàng실 triều Nguyễn với phần cổ hình chữ nhật bản lớn thêu kim tuyến rực rỡ và dải ngũ sắc nơi cổ tay.',
    context:
      'Được quy định chính thức trong bộ điển chế "Khâm định Đại Nam hội điển sự lệ" dưới triều vua Gia Long và Minh Mạng. Ban đầu là thường phục và triều phục của Hoàng thái hậu, Hoàng hậu, Công chúa, Phi tần chốn Tử Cấm Thành Huế; đến cuối thế kỷ 19 – đầu thế kỷ 20 dần lan tỏa ra ngoài hoàng cung, trở thành lễ phục cưới hỏi danh giá của phụ nữ quý tộc và danh gia vọng tộc.',
    wearers:
      'Hoàng thái hậu, Hoàng hậu, Công chúa, Phi tần, Phối mẫu vương/công và các Mệnh phụ phu nhân theo phẩm hàm; ngày nay được phụ nữ Việt Nam ưa chuộng trong lễ ăn hỏi, lễ cưới cổ truyền và sự kiện văn hóa.',
    features: [
      'Bản cổ hình chữ nhật to bản trước ngực thêu dày đặc hoa văn cung đình',
      'Hai vạt trước đối xứng cố định bằng dây buộc/khuy cài tạo hình chữ Nhật (日)',
      'Cổ tay áo thụng đính dải màu ngũ sắc (Ngũ hành sắc đới: lục, vàng, lam, trắng, đỏ)',
      'Đồ án Loan Phượng ổ (chim phượng trong vòng tròn), bát bửu và dải thủy ba ở gấu áo'
    ],
    collarStyle:
      'Cổ Nhật Bình (cổ phương lĩnh / chữ nhật bản lớn chạy dọc trước ngực, khi khép hai vạt lại tạo thành hình chữ "Nhật" 日 ngay ngắn).',
    sleeveStyle:
      'Tay thụng rộng vừa phải, buông thướt tha; phần cổ tay phối dải vải 5 màu tượng trưng cho Ngũ hành tương sinh.',
    silhouetteStructure:
      'Cấu trúc áo đối khâm biến thể dáng chữ A suông rộng, xẻ tà hai bên hông; khi mặc luôn khoác ngoài áo ngũ thân lót trắng bên trong, phối cùng quần lụa trắng hoặc đỏ và khăn vành / mấn cung đình.',
    commonMaterials:
      'Sa, gấm, đoạn, trừu, vóc lụa tơ tằm thượng hạng kết hợp kỹ thuật thêu kim tuyến (chỉ vàng, chỉ bạc) và đính hạt kim sa thủ công.',
    colorsAndMotifs:
      'Phân cấp nghiêm ngặt theo thứ bậc: Hoàng thái hậu và Hoàng hậu dùng màu vàng rực/cam (chính hoàng/kim hoàng) thêu Rồng – Phượng; Công chúa và Phi tần dùng màu đỏ đào, tím, xanh lam thêu Loan Phượng ổ, hoa mẫu đơn, chữ Thọ và sóng nước thủy ba.',
    whenAppropriate:
      'Đại lễ cung đình xưa, lễ sách phong, lễ tết hoàng gia; ngày nay rất phù hợp cho lễ cưới hỏi truyền thống, lễ hằng thuận, triển lãm di sản và photoshoot nghệ thuật.',
    significance:
      'Kết tinh đỉnh cao nghệ thuật thêu thùa cung đình Huế và vẻ đẹp vừa quyền quý, uy nghiêm vừa đoan trang của người phụ nữ Việt Nam.',
    terminologyAndScopeNote:
      'Tên gọi "Nhật Bình" bắt nguồn từ cấu trúc hai vạt cổ áo khi buộc dây ghép lại tạo thành hình chữ Nhật (日) trước ngực. Cần phân biệt Nhật Bình cung đình (tuân thủ nghiêm ngặt quy chế màu sắc và số lượng ổ phượng) với Nhật Bình cưới hỏi dân gian giai đoạn cuối triều Nguyễn.',
    image: aoNhatBinhImg,
    placeholderComment: '/public/images/ao-nhat-binh.png',
    styles: ['traditional', 'elegant', 'romantic', 'modern'],
    colors: ['red', 'yellow', 'burgundy', 'blue', 'cream'],
    occasions: ['wedding', 'cultural-event', 'photoshoot', 'festival'],
    cultureNote:
      'Khi diện Áo Nhật Bình, nên mặc kèm áo lót cổ đứng màu trắng bên trong để phần cổ chữ nhật nằm phẳng phiu, tôn trọn vẹn vẻ trang trọng của lễ phục.'
  },

  // ===========================================================================
  // 2. ÁO TẤC
  // ===========================================================================
  {
    id: 'ao-tac',
    studioOutfitId: 'ao-ngu-than',
    groupCategory: 'cung-dinh-le-phuc',
    groupCategoryLabel: 'Cổ phục cung đình & Lễ phục',
    diagramType: 'ao-tac',
    name: 'Áo Tấc',
    vietnameseName: 'Áo Ngũ Thân Tay Thụng (Áo Lễ)',
    alternativeNames: 'Áo Ngũ Thân Tay Thụng, Áo Lễ, Áo Thụng',
    subtitle: 'Quốc lễ phục truyền thống trang trọng dành cho mọi tầng lớp người Việt',
    era: 'Định hình từ thời Chúa Nguyễn Phúc Khoát (1744), phổ biến toàn quốc dưới triều Nguyễn (1802–1945)',
    description:
      'Phân nhánh trang trọng nhất của dòng áo ngũ thân lập lĩnh, nổi bật với ống tay áo dài rộng thướt tha và phom dáng suông chữ A tôn nghiêm.',
    context:
      'Ra đời từ cuộc cải cách y phục năm Giáp Tý (1744) tại Đàng Trong và được vua Minh Mạng chuẩn hóa trên toàn quốc từ năm 1828–1837. Dưới triều Nguyễn, Áo Tấc là lễ phục bắt buộc trong các dịp đại lễ, tế tự, cưới hỏi của cả nam lẫn nữ không phân biệt quan lại hay thứ dân.',
    wearers:
      'Cả nam giới và nữ giới thuộc mọi tầng lớp xã hội xưa (từ hoàng thân, quan viên, nho sĩ đến người dân bình thường khi hành lễ).',
    features: [
      'Ống tay áo thụng rộng và dài qua khỏi bàn tay để che tay khi chắp tay hành lễ',
      'Cấu trúc 5 thân (4 thân ngoài, 1 thân con bên trong) nối qua đường trung phùng thẳng tắp',
      'Cổ đứng (lập lĩnh) cài 5 hạt khuy bên phải tượng trưng cho Ngũ thường',
      'Viền tà và gấu áo bản rộng khoảng 1 tấc (nguồn gốc tên gọi Áo Tấc)'
    ],
    collarStyle:
      'Cổ lập lĩnh (cổ đứng cao khoảng 3,5–4,5 cm, đầu cổ vát vuông hoặc bo nhẹ, ôm kín đáo quanh cổ).',
    sleeveStyle:
      'Tay thụng (ống tay rất rộng từ 40–60 cm và dài quá cổ tay, khi buông tay tạo nếp rũ uy nghi, khi chắp tay vái lạy che kín bàn tay).',
    silhouetteStructure:
      'Phom chữ A suông rộng từ nách xuống quá đầu gối, không chiết eo, xẻ tà hai bên hông; mặc ngoài áo lót trắng, kết hợp quần dài ống rộng và khăn đóng (hoặc mấn).',
    commonMaterials:
      'Gấm, đoạn, sa, lương, the La Khê, lụa tơ tằm (mùa nóng dùng sa/the mỏng thoáng có lớp lót, mùa lạnh hoặc đại lễ dùng gấm/đoạn dệt hoa).',
    colorsAndMotifs:
      'Nam giới thường mặc màu xanh lam, xanh cổ vịt, đen huyền, tím than; nữ giới chuộng đỏ son, hồng đào, vàng mơ, xanh ngọc; họa tiết chữ Thọ, chữ Phúc, vân mây, bát bửu hoặc trơn nhã nhặn.',
    whenAppropriate:
      'Lễ cưới hỏi truyền thống, lễ tế gia tiên, lễ hội đình chùa, lễ tốt nghiệp đại học, sự kiện ngoại giao văn hóa và chụp ảnh di sản.',
    significance:
      'Thể hiện phong thái khiêm nhường, lễ độ và đạo lý "uống nước nhớ nguồn" qua cấu trúc 5 thân (tứ thân phụ mẫu) và 5 nút (Nhân, Lễ, Nghĩa, Trí, Tín).',
    terminologyAndScopeNote:
      'Áo Tấc thực chất là tên gọi dân gian của "Áo Ngũ Thân Tay Thụng". Cần phân biệt rõ với "Áo Ngũ Thân Tay Chẽn" (loại áo có ống tay bó gọn dùng mặc thường nhật).',
    image: aoTacImg,
    placeholderComment: '/public/images/ao-tac.png',
    styles: ['traditional', 'elegant', 'minimal', 'modern'],
    colors: ['blue', 'burgundy', 'red', 'cream', 'green', 'yellow'],
    occasions: ['wedding', 'cultural-event', 'festival', 'photoshoot', 'school'],
    cultureNote:
      'Khi mặc Áo Tấc hành lễ hoặc chụp ảnh, tư thế đẹp nhất là hai tay giao nhau nhẹ trước bụng để phần tay áo thụng buông rũ tự nhiên.'
  },

  // ===========================================================================
  // 3. ÁO NGŨ THÂN
  // ===========================================================================
  {
    id: 'ao-ngu-than',
    studioOutfitId: 'ao-ngu-than',
    groupCategory: 'he-ngu-than',
    groupCategoryLabel: 'Hệ Áo Ngũ Thân',
    diagramType: 'ngu-than',
    name: 'Áo Ngũ Thân',
    vietnameseName: 'Áo Ngũ Thân Lập Lĩnh',
    alternativeNames: 'Áo Năm Thân, Áo Ngũ Thân Cổ Đứng, Tiền thân Áo Dài hiện đại',
    subtitle: 'Đỉnh cao phong thái nho nhã, chính trực và là cội nguồn của Áo dài Việt Nam',
    era: 'Định hình chính thức từ thời Chúa Nguyễn Phúc Khoát (1744) và vua Minh Mạng (1837) đến nay',
    description:
      'Trang phục gồm 5 thân vải ghép lại tượng trưng cho đạo lý tứ thân phụ mẫu và bản thân người mặc, cài 5 khuy bên phải đại diện cho Ngũ thường.',
    context:
      'Từng là quốc phục tiêu chuẩn của người Việt suốt thời Nguyễn cho cả nam và nữ. Vào thập niên 1930, từ cấu trúc Áo Ngũ Thân, họa sĩ Cát Tường (Le Mur) và các nhà may Hà Nội – Sài Gòn đã cải biên phom dáng ôm sát hơn để hình thành chiếc Áo dài hiện đại.',
    wearers:
      'Nam giới và nữ giới ở mọi lứa tuổi, mọi tầng lớp xã hội từ thế kỷ 18 đến nửa đầu thế kỷ 20; nay là dòng cổ phục được giới trẻ ứng dụng rộng rãi nhất.',
    features: [
      '5 thân áo ghép lại: 2 thân trước, 2 thân sau và 1 thân con ẩn bên phải phía trong',
      '5 hạt khuy (cúc đồng, bạc, ngọc hoặc tết vải) cài từ cổ chéo qua nách phải xuống sườn',
      'Đường trung phùng (sống áo) chạy thẳng chính giữa lưng và ngực',
      'Gồm hai nhánh chính: Tay chẽn (thường phục) và Tay thụng / Áo Tấc (lễ phục)'
    ],
    collarStyle:
      'Cổ lập lĩnh (cổ đứng cao 3–4 cm, giữ tư thế đầu và cổ người mặc luôn ngay ngắn, đĩnh đạc).',
    sleeveStyle:
      'Chia làm 2 kiểu tùy mục đích: Tay chẽn (ống tay hẹp ôm vừa cổ tay khi sinh hoạt) và Tay thụng (ống tay rộng lớn khi dự lễ).',
    silhouetteStructure:
      'Cấu trúc cắt phẳng (flat-cutting) không chiết ly ngực hay eo; thân áo xòe nhẹ tự nhiên từ nách xuống tà theo hình thang cân, che khuyết điểm cơ thể và tạo vẻ điềm đạm.',
    commonMaterials:
      'Lụa tơ tằm, the, sa, lương, gấm, đoạn, đũi tơ, vải bông thủ công.',
    colorsAndMotifs:
      'Thường nhật dùng màu trầm nhã (nâu, đen, chàm, trắng ngà, xanh lam); dịp lễ tết dùng gấm hoa văn chữ Thọ, tứ quý, liên hoa, vân mây với sắc đỏ son, vàng, xanh lục.',
    whenAppropriate:
      'Nghi lễ ngoại giao, lễ cưới truyền thống, sự kiện học thuật văn hóa, đi lễ đầu năm, dạo phố di sản và phối đồ đương đại.',
    significance:
      'Biểu trưng cho đạo hiếu (4 thân ngoài là cha mẹ đôi bên che chở cho thân thứ 5 là người mặc) và phẩm cách quân tử giữ trọn Nhân – Lễ – Nghĩa – Trí – Tín.',
    terminologyAndScopeNote:
      '"Áo Ngũ Thân" là danh xưng tổng quát cho toàn bộ họ áo 5 thân cổ đứng (bao gồm cả Áo Tấc tay thụng và Áo Ngũ Thân tay chẽn). Đây là tiền thân trực tiếp của Áo dài tân thời.',
    image: aoNguThanImg,
    placeholderComment: '/public/images/ao-ngu-than.png',
    styles: ['traditional', 'elegant', 'modern', 'minimal'],
    colors: ['burgundy', 'blue', 'green', 'black', 'cream', 'red'],
    occasions: ['wedding', 'cultural-event', 'photoshoot', 'festival'],
    cultureNote:
      'Áo ngũ thân đề cao phom dáng thẳng thớm và hàng cúc chỉn chu. Khi phối phong cách Gen Z (mix cùng boots hay quần âu), cần giữ cổ áo đứng gãy gọn.'
  },

  // ===========================================================================
  // 4. ÁO TAY CHẼN
  // ===========================================================================
  {
    id: 'ao-tay-chen',
    studioOutfitId: 'ao-ngu-than',
    groupCategory: 'he-ngu-than',
    groupCategoryLabel: 'Hệ Áo Ngũ Thân',
    diagramType: 'tay-chen',
    name: 'Áo Tay Chẽn',
    vietnameseName: 'Áo Ngũ Thân Tay Chẽn',
    alternativeNames: 'Áo Chẽn, Áo Ngũ Thân Thường Phục',
    subtitle: 'Phiên bản gọn gàng, linh hoạt và giàu tính ứng dụng nhất trong đời sống thường nhật',
    era: 'Thế kỷ 18 – nửa đầu thế kỷ 20 (Thời Chúa Nguyễn – Triều Nguyễn) và phục hưng mạnh mẽ hiện nay',
    description:
      'Mang trọn vẹn cấu trúc 5 thân – 5 khuy của dòng áo ngũ thân nhưng có ống tay ôm gọn dọc cánh tay, giúp người mặc cử động linh hoạt trong sinh hoạt hàng ngày.',
    context:
      'Cùng ra đời trong cải cách y phục của Chúa Nguyễn Phúc Khoát (1744) và chiếu chỉ vua Minh Mạng. Nếu Áo Tấc tay thụng dùng cho đại lễ thì Áo Tay Chẽn là trang phục thường nhật (tiện phục) từ hoàng cung ra tới phố thị và làng quê.',
    wearers:
      'Cả nam và nữ thuộc mọi tầng lớp: vua quan mặc khi làm việc thường ngày, nho sinh đi học, thương nhân buôn bán, nghệ nhân và dân thường.',
    features: [
      'Ống tay áo thu hẹp ôm gọn từ bắp tay xuống cổ tay (tay chẽn), cực kỳ gọn gàng',
      'Giữ nguyên cấu trúc 5 thân ghép qua đường trung phùng và 5 khuy cài bên phải',
      'Thân áo suông vừa phải, độ xòe tà tiết chế hơn so với Áo Tấc',
      'Thường mặc chồng 2 lớp (áo the/lụa màu bên ngoài, áo trắng lót bên trong để lộ viền cổ trắng)'
    ],
    collarStyle:
      'Cổ lập lĩnh (cổ đứng thẳng cao khoảng 3–4 cm, cài khuy kín đáo nơi hõm cổ phải).',
    sleeveStyle:
      'Tay chẽn (ống tay hẹp, ôm vừa vặn theo cánh tay và cổ tay, dài chấm cổ tay giúp làm việc, viết lách hay di chuyển không bị vướng).',
    silhouetteStructure:
      'Phom suông nhẹ chữ A, không bó sát eo nhưng gọn gàng hơn Áo Tấc; gồm 5 thân vải nối phẳng, xẻ tà hai bên hông, phối cùng quần lụa hoặc quần vải ống rộng.',
    commonMaterials:
      'The La Khê, lụa tơ tằm trơn, đũi, lương, sa, vải bông dệt thủ công hoặc gấm mỏng.',
    colorsAndMotifs:
      'Ưa chuộng sắc độ thanh lịch, trầm tĩnh: đen (áo the đen), nâu non, xanh chàm, trắng ngà, xanh rêu, đỏ trầm; hoa văn dệt chìm nhỏ nhắn hoặc vải trơn mộc.',
    whenAppropriate:
      'Dạo phố, đi học, đi cà phê, du xuân, tham quan bảo tàng, chụp ảnh street style cổ phong và mặc hàng ngày.',
    significance:
      'Chứng minh tính thực tiễn cao của trang phục truyền thống Việt: dung hòa hoàn hảo giữa lễ giáo (5 thân, 5 nút) và nhịp sống lao động năng động.',
    terminologyAndScopeNote:
      'Trong cộng đồng Việt phục hiện nay, tên gọi "Áo Tay Chẽn" thường được dùng để chỉ riêng "Áo Ngũ Thân Tay Chẽn" nhằm đối chiếu với "Áo Tấc" (Áo Ngũ Thân Tay Thụng). Về mặt thuật ngữ cắt may, "tay chẽn" còn dùng để mô tả ống tay hẹp trên áo tứ thân hoặc áo giao lĩnh thường dân.',
    image: aoTayChenImg,
    placeholderComment: '/public/images/ao-tay-chen.png',
    styles: ['modern', 'minimal', 'street', 'traditional', 'elegant'],
    colors: ['black', 'cream', 'burgundy', 'blue', 'green'],
    occasions: ['casual', 'school', 'photoshoot', 'cultural-event', 'festival'],
    cultureNote:
      'Áo Tay Chẽn là lựa chọn lý tưởng nhất cho Gen Z muốn mặc cổ phục đi học, đi cà phê hay phối cùng giày loafers, sneakers trắng và túi đeo chéo tối giản.'
  },

  // ===========================================================================
  // 5. GIAO LĨNH
  // ===========================================================================
  {
    id: 'giao-linh',
    studioOutfitId: 'giao-linh',
    groupCategory: 'co-phuc-cac-trieu-dai',
    groupCategoryLabel: 'Cổ phục các triều đại',
    diagramType: 'giao-linh',
    name: 'Giao Lĩnh',
    vietnameseName: 'Áo Giao Lĩnh (Áo Cổ Chéo)',
    alternativeNames: 'Áo Cổ Giao, Tràng Vạt Chéo (交領)',
    subtitle: 'Kiểu thức y phục cổ điển xuyên suốt gần một thiên niên kỷ văn hiến Lý – Trần – Lê',
    era: 'Thịnh hành qua các triều Lý – Trần – Hồ – Lê Sơ – Mạc – Lê Trung Hưng và lưu giữ trong tế phục triều Nguyễn',
    description:
      'Dòng áo cổ xưa có hai vạt trước bắt chéo nhau qua ngực tạo thành hình chữ Y thanh thoát, buộc dây cố định bên sườn phải.',
    context:
      'Trước cuộc cải cách y phục sang cổ đứng (lập lĩnh) vào thế kỷ 18, Giao Lĩnh là kiểu áo phổ biến bậc nhất của người Việt từ cung đình đến dân gian. Sử liệu (như An Nam Chí Lược, Giao Châu Ký) và hệ thống tượng pháp, tranh vẽ thời Lý – Trần – Lê đều ghi nhận người Việt mặc áo giao lĩnh thường nhật và trong đại lễ.',
    wearers:
      'Hoàng đế, vương hầu, quan lại, nho sĩ, tăng侣 và thứ dân cả nam lẫn nữ suốt các triều Lý – Trần – Lê; sang thời Nguyễn vẫn được dùng làm Tế phục trong các lễ tế Giao, tế Miếu.',
    features: [
      'Hai vạt áo trước giao chéo nhau trước ngực tạo cổ chữ Y (vạt trái đắp lên vạt phải – hữu nhẫm)',
      'Cố định vạt áo bằng hệ thống dây buộc bên sườn thay vì hàng khuy kim loại dọc ngực',
      'Nẹp cổ áo thường được phối màu tương phản hoặc dệt hoa văn tinh xảo',
      'Nam giới mặc cùng quần hoặc thường; nữ giới thường phối cùng yếm, thường (váy) xếp ly và thắt lưng đại đới'
    ],
    collarStyle:
      'Cổ giao lĩnh (hai dải bâu cổ phẳng giao chéo nhau tạo thành chữ Y sâu vừa phải trước ngực, tôn phần cổ thanh thoát).',
    sleeveStyle:
      'Linh hoạt theo tầng lớp: Lễ phục và quý tộc dùng tay quảng tụ / đại tụ (tay thụng rất rộng); thường dân, quân sĩ dùng tay tiểu tụ / tay chẽn gọn gàng.',
    silhouetteStructure:
      'Cấu trúc phẳng chữ T (T-shape), vạt áo đắp chéo sâu sang hông phải, thân áo rộng rãi phóng khoáng; tạo hiệu ứng xếp lớp (layering) uyển chuyển khi kết hợp cùng thường (váy quấn) bên dưới.',
    commonMaterials:
      'Lụa tơ tằm, sa, la (罗), đoạn, gấm dệt kim tuyến (dành cho quý tộc) và vải đũi, vải gai, vải bông thô (dành cho dân thường).',
    colorsAndMotifs:
      'Thời Lý – Trần chuộng sắc đen, trắng, vàng, đỏ thẫm, xanh lục với đồ án rồng ổ, phượng hàm thư, hoa cúc dây; thời Lê phát triển mạnh hoa văn vân mây, đoàn hoa, bổ tử và viền cổ gấm.',
    whenAppropriate:
      'Sự kiện tái hiện lịch sử Lý – Trần – Lê, lễ hội văn hóa di sản, biểu diễn nghệ thuật truyền thống, chụp ảnh cổ phong Đại Việt.',
    significance:
      'Biểu tượng cho diện mạo văn hiến Đại Việt thời kỳ độc lập tự chủ rực rỡ, phản ánh thẩm mỹ phóng khoáng, bay bổng của tổ tiên người Việt.',
    terminologyAndScopeNote:
      '"Giao lĩnh" (交領) nghĩa đen là "cổ áo giao nhau". Đây là thuật ngữ phân loại theo cấu trúc cổ áo chứ không chỉ một mẫu áo duy nhất: Giao lĩnh thời Lý – Trần có phom dáng và cách phối khác với Giao lĩnh thời Lê Trung Hưng hay Tế phục Giao lĩnh thời Nguyễn.',
    image: aoGiaoLinhImg,
    placeholderComment: '/public/images/ao-giao-linh.png',
    styles: ['traditional', 'romantic', 'elegant', 'modern'],
    colors: ['burgundy', 'cream', 'red', 'yellow', 'green', 'black'],
    occasions: ['cultural-event', 'festival', 'photoshoot', 'wedding'],
    cultureNote:
      'Khi mặc Áo Giao Lĩnh đúng tinh thần cổ truyền, hãy chú ý quy tắc đặt vạt trái đè lên trên vạt phải (hướng chữ Y bên trái đắp qua bên phải).'
  },

  // ===========================================================================
  // 6. VIÊN LĨNH
  // ===========================================================================
  {
    id: 'vien-linh',
    studioOutfitId: 'ao-ngu-than',
    groupCategory: 'co-phuc-cac-trieu-dai',
    groupCategoryLabel: 'Cổ phục các triều đại',
    diagramType: 'vien-linh',
    name: 'Viên Lĩnh',
    vietnameseName: 'Áo Viên Lĩnh (Đoàn Lĩnh Cổ Tròn)',
    alternativeNames: 'Đoàn Lĩnh (團領), Bàn Lĩnh (盤領), Áo Cổ Tròn',
    subtitle: 'Trang phục triều nghi và công phục uy nghiêm với thiết kế cổ tròn ôm sát',
    era: 'Triều Lý – Trần – Lê Sơ – Lê Trung Hưng – Tây Sơn – Nguyễn',
    description:
      'Loại cổ phục có phần cổ khoét tròn ôm sát chân cổ, cài khuy bên vai phải, tạo bề mặt ngực phẳng rộng hoàn hảo để thêu đoàn hoa hoặc đính bổ tử quan chế.',
    context:
      'Xuất hiện xuyên suốt từ thời Lý – Trần và đặc biệt hoàn thiện trong hệ thống quan phục, triều phục thời Lê Sơ – Lê Trung Hưng – Nguyễn. Ngoài công phục của vua quan, áo Viên Lĩnh còn được phụ nữ quý tộc và dân gian thời Lê mặc làm áo khoác lễ tiết trang trọng.',
    wearers:
      'Hoàng đế, vương công, bá quan văn võ (đính bổ tử phân phẩm cấp), thị vệ cung đình và phụ nữ quý tộc thời Lê – Nguyễn.',
    features: [
      'Cổ áo cắt tròn khép kín ôm sát quanh chân cổ (không có bản cổ dựng cao)',
      'Vạt trước lớn che phủ toàn bộ ngực, cài khuy hoặc buộc dây bên vai/nách phải',
      'Tạo khoảng phẳng chính diện trước ngực và sau lưng để đính Bổ tử (ô vuông phẩm hàm) hoặc thêu Đoàn long / Đoàn phượng',
      'Thân áo dài, xẻ tà hai bên hông, thường đi kèm đai lưng (đai ngọc, đai sừng hoặc đại đới lụa)'
    ],
    collarStyle:
      'Cổ viên lĩnh / đoàn lĩnh (cổ tròn phẳng ôm sát quanh gốc cổ, đôi khi để lộ nhẹ viền cổ áo giao lĩnh mặc lót bên trong).',
    sleeveStyle:
      'Phổ biến là tay thụng lớn (đại tụ) đối với lễ phục, triều phục văn võ quan; hoặc tay hẹp vừa vặn đối với võ quan và trang phục thường trực.',
    silhouetteStructure:
      'Phom chữ T hoặc chữ A rộng lớn, uy vệ; gồm vạt lớn phủ kín mặt trước, nối sống lưng trung phùng, kết hợp cùng quần/thường và mũốc sa, mũ cánh chuồn hoặc khăn vấn.',
    commonMaterials:
      'Vóc, gấm, đoạn, sa, trừu dệt hoa chìm, kết hợp nghệ thuật thêu kim tuyến trên tấm bổ tử.',
    colorsAndMotifs:
      'Tuân theo sắc phục phẩm hàm (vàng dành cho vua, tím/đỏ cho quan cao cấp, xanh lam/lục cho các phẩm dưới); họa tiết rồng, phượng, vân mây và hệ thống bổ tử (quan văn thêu chim tiên hạc, cẩm kê...; quan võ thêu thú kỳ lân, sư tử, hổ báo...).',
    whenAppropriate:
      'Phục dựng nghi lễ cung đình Đại Việt, triển lãm cổ phục, lễ cưới cổ phong, biểu diễn sân khấu lịch sử và chụp ảnh nghệ thuật.',
    significance:
      'Biểu trưng cho kỷ cương điển chế, vẻ đẹp đường bệ, chính trực của nền hành chính và lễ nhạc Đại Việt qua nhiều triều đại.',
    terminologyAndScopeNote:
      '"Viên lĩnh" (圓領) và "Đoàn lĩnh" (團領) đều chỉ kiểu cổ tròn. Cần tránh nhầm lẫn Viên lĩnh (cổ khoét tròn sát chân cổ) với Áo Tấc cổ lập lĩnh (có bâu cổ dựng đứng cao 3–4 cm).',
    image: aoVienLinhImg,
    placeholderComment: '/public/images/ao-vien-linh.png',
    styles: ['traditional', 'elegant', 'modern'],
    colors: ['red', 'burgundy', 'blue', 'yellow', 'green', 'black'],
    occasions: ['cultural-event', 'wedding', 'photoshoot', 'festival'],
    cultureNote:
      'Áo Viên Lĩnh mang vẻ đẹp cân xứng và quyền uy, rất nổi bật khi phối lớp áo lót cổ chéo trắng bên trong để tạo điểm nhấn ở hõm cổ.'
  },

  // ===========================================================================
  // 7. ĐỐI KHÂM
  // ===========================================================================
  {
    id: 'doi-kham',
    studioOutfitId: 'doi-kham',
    groupCategory: 'co-phuc-cac-trieu-dai',
    groupCategoryLabel: 'Cổ phục các triều đại',
    diagramType: 'doi-kham',
    name: 'Đối Khâm',
    vietnameseName: 'Áo Đối Khâm (Áo Hai Vạt Song Song)',
    alternativeNames: 'Trực Lĩnh Đối Khâm (直領對襟), Áo Khoác Đối Vạt',
    subtitle: 'Nghệ thuật phối đồ đa lớp (layering) tinh tế với hai vạt trước buông thẳng song song',
    era: 'Triều Lý – Trần – Lê – Nguyễn (đặc biệt phát triển rực rỡ thời Lê Trung Hưng và Nguyễn)',
    description:
      'Kiểu áo có hai vạt trước chạy thẳng song song đối diện nhau qua khe ngực, không đắp chéo, thường mặc khoác ngoài để tôn lớp yếm, áo lót và thường (váy) bên trong.',
    context:
      'Là một trong những cấu trúc áo khoác ngoài quan trọng nhất trong lịch sử trang phục Việt Nam. Từ chiếc áo đối khâm / phi phong thời Lê Trung Hưng – Chúa Nguyễn đã phát triển thành Áo Nhật Bình cung đình Huế, đồng thời hiện diện trong cách mặc buông vạt của Áo Tứ Thân Bắc Bộ.',
    wearers:
      'Phụ nữ hoàng tộc, mệnh phụ phu nhân, văn nhân nhã sĩ và phụ nữ dân gian qua nhiều thời kỳ.',
    features: [
      'Hai vạt trước đối xứng song song, để mở tự nhiên hoặc cài khuy/buộc dây ngang ngực',
      'Tạo khung thị giác dọc trước ngực giúp khoe khéo lớp yếm đào hoặc áo lót bên trong',
      'Xẻ tà hai bên hông (hoặc tách thành 4 vạt như áo tứ thân) tạo độ bay bổng khi bước đi',
      'Là nền tảng cấu trúc của cả Áo Phi Phong thời Lê và Áo Nhật Bình thời Nguyễn'
    ],
    collarStyle:
      'Cổ trực lĩnh đối khâm (hai nẹp cổ chạy thẳng song song từ gáy xuống vạt trước, không giao chéo nhau).',
    sleeveStyle:
      'Thường là tay thụng rộng thướt tha trên lễ phục/áo khoác quý tộc, hoặc tay vừa/tay chẽn trên áo khoác dân gian.',
    silhouetteStructure:
      'Cấu trúc áo khoác ngoài (outerwear) suông thẳng chữ H hoặc chữ A nhẹ, tôn vinh nghệ thuật mặc nhiều lớp (layering) đặc trưng của mỹ học cổ truyền Việt Nam.',
    commonMaterials:
      'Sa, the, lụa tơ tằm mỏng nhẹ có độ rũ cao (cho mùa xuân – hạ) hoặc gấm, đoạn, trừu thêu hoa (cho mùa thu – đông và lễ tiết).',
    colorsAndMotifs:
      'Phối màu tương phản đa lớp: lớp áo đối khâm bên ngoài màu đỏ son, xanh lam, tím, vàng mơ hoặc xanh lục khoác trên nền yếm đỏ/hồng và áo trong màu trắng ngà.',
    whenAppropriate:
      'Lễ hội mùa xuân, chụp ảnh lookbook cổ phong đa lớp, biểu diễn văn hóa và ứng dụng làm áo khoác layering hiện đại.',
    significance:
      'Thể hiện tư duy thẩm mỹ tinh tế của người Việt xưa: kín đáo nhưng không gò bó, uyển chuyển qua từng lớp vải mỏng nhẹ.',
    terminologyAndScopeNote:
      '"Đối khâm" (對襟) là thuật ngữ cấu trúc chỉ hai vạt áo đối diện nhau (đối lập với "Giao lĩnh" là hai vạt bắt chéo). Nhiều trang phục quen thuộc như Áo Nhật Bình hay Áo Tứ Thân (khi buông vạt) đều thuộc nhóm cấu trúc Đối khâm.',
    image: aoDoiKhamImg,
    placeholderComment: '/public/images/ao-doi-kham.png',
    styles: ['romantic', 'traditional', 'modern', 'street', 'elegant'],
    colors: ['cream', 'burgundy', 'red', 'pastel', 'yellow', 'green'],
    occasions: ['festival', 'photoshoot', 'cultural-event', 'casual'],
    cultureNote:
      'Cấu trúc Đối Khâm rất gần với cardigan hay kimono/trench coat hiện đại, cực kỳ dễ ứng dụng khi phối layering cùng trang phục Gen Z.'
  },

  // ===========================================================================
  // 8. VIỆT PHỤC
  // ===========================================================================
  {
    id: 'viet-phuc',
    studioOutfitId: 'ao-dai',
    groupCategory: 'khai-niem-he-thong',
    groupCategoryLabel: 'Khái niệm & Hệ thống di sản',
    diagramType: 'viet-phuc',
    name: 'Việt Phục',
    vietnameseName: 'Hệ Thống Trang Phục Dân Tộc Việt Nam',
    alternativeNames: 'Y phục truyền thống Việt Nam, Quốc phục & Trang phục văn hóa Việt',
    subtitle: 'Khái niệm bao quát toàn bộ dòng chảy trang phục mang bản sắc người Việt từ cổ đại đến đương đại',
    era: 'Xuyên suốt lịch sử Việt Nam: Thời đại Hùng Vương – Đông Sơn, các triều đại quân chủ tự chủ đến cận – hiện đại',
    description:
      'Thuật ngữ tổng hợp chỉ toàn bộ các loại hình trang phục truyền thống của người Việt qua mọi thời kỳ lịch sử, bao gồm cả Việt Cổ Phục lẫn các trang phục truyền thống cận – hiện đại như Áo dài, Áo bà ba, Áo tứ thân.',
    context:
      'Hình thành và tiến hóa không ngừng cùng lịch sử dựng nước và giữ nước của dân tộc Việt Nam. Việt Phục phản ánh điều kiện tự nhiên nhiệt đới gió mùa, nghề trồng dâu nuôi tằm dệt lụa lâu đời, cũng như sự giao lưu văn hóa và bản lĩnh tự chủ của người Việt qua từng thế kỷ.',
    wearers:
      'Toàn thể người Việt Nam ở mọi lứa tuổi, giới tính, vùng miền trong nước và cộng đồng người Việt trên toàn thế giới.',
    features: [
      'Bao hàm cả nhánh Cổ phục (Giao lĩnh, Viên lĩnh, Đối khâm, Ngũ thân...) và nhánh Truyền thống cận – hiện đại (Áo dài tân thời, Áo bà ba...)',
      'Đề cao sự hài hòa giữa tính thẩm mỹ kín đáo, thanh lịch và sự thoáng mát phù hợp khí hậu nhiệt đới',
      'Kế thừa kỹ nghệ dệt lụa, thêu tay, nhuộm tự nhiên của các làng nghề truyền thống Việt Nam',
      'Không ngừng được thế hệ trẻ (Gen Z) tiếp nối, sáng tạo và ứng dụng vào đời sống đương đại'
    ],
    collarStyle:
      'Đa dạng qua các thời kỳ: Cổ giao lĩnh (chữ Y), cổ viên lĩnh (tròn), cổ đối khâm (song song), cổ Nhật Bình (chữ nhật), cổ lập lĩnh (cổ đứng) và các kiểu cổ cách tân.',
    sleeveStyle:
      'Từ tay thụng (đại tụ) uy nghi trong lễ nhạc cổ truyền đến tay chẽn, tay raglan ôm sát thanh thoát trên Áo dài hiện đại.',
    silhouetteStructure:
      'Gồm hai hệ tư duy cắt may: Cấu trúc cắt phẳng (flat-cutting) truyền thống ghép các khổ vải tôn trọng sự khiêm cung, và cấu trúc cắt may 3D chiết eo hiện đại tôn vinh đường nét cơ thể.',
    commonMaterials:
      'Lụa tơ tằm (Vạn Phúc, Nha Xá, Mã Châu, Bảo Lộc), the La Khê, lãnh Mỹ A, gấm, vóc, sa, đũi, vải bông, vải gai và chất liệu thân thiện môi trường.',
    colorsAndMotifs:
      'Bảng màu bản địa phong phú (đỏ son, vàng hoàng kim, nâu gụ, xanh chàm, trắng ngà) cùng hệ biểu tượng hoa sen, chim lạc, trống đồng, rồng phượng, tứ quý, chữ Thọ.',
    whenAppropriate:
      'Quốc lễ, sự kiện ngoại giao, Tết cổ truyền, lễ cưới hỏi, khai giảng, lễ hội văn hóa, chụp ảnh kỷ yếu và thời trang sáng tạo hàng ngày.',
    significance:
      'Là "căn cước văn hóa thị giác" của dân tộc Việt Nam, khẳng định bản sắc độc lập và kết nối các thế hệ người Việt.',
    terminologyAndScopeNote:
      'Cần phân biệt phạm vi khái niệm: "Việt Phục" là tập hợp lớn nhất (bao gồm cả Áo dài hiện đại, Áo bà ba và toàn bộ Cổ phục), trong khi "Việt Cổ Phục" chỉ nhánh trang phục xuất hiện trước thời kỳ cải cách Âu hóa đầu thế kỷ 20.',
    image: vietPhucImg,
    placeholderComment: '/public/images/viet-phuc.png',
    styles: ['traditional', 'modern', 'elegant', 'minimal', 'romantic', 'street'],
    colors: ['red', 'burgundy', 'cream', 'yellow', 'blue', 'green', 'pastel', 'black'],
    occasions: ['festival', 'wedding', 'cultural-event', 'photoshoot', 'school', 'casual'],
    cultureNote:
      'Hiểu đúng hệ thống Việt Phục giúp người trẻ tự tin phối đồ sáng tạo (Remix) mà vẫn giữ trọn sự tôn trọng dành cho từng thời kỳ lịch sử.'
  },

  // ===========================================================================
  // 9. VIỆT CỔ PHỤC
  // ===========================================================================
  {
    id: 'viet-co-phuc',
    studioOutfitId: 'ao-ngu-than',
    groupCategory: 'khai-niem-he-thong',
    groupCategoryLabel: 'Khái niệm & Hệ thống di sản',
    diagramType: 'viet-co-phuc',
    name: 'Việt Cổ Phục',
    vietnameseName: 'Hệ Thống Cổ Phục Việt Nam Qua Các Triều Đại',
    alternativeNames: 'Cổ phục Đại Việt – Việt Nam, Y phục cổ truyền trước thế kỷ 20',
    subtitle: 'Di sản y phục truyền thống của người Việt trước thời kỳ cải cách tân thời thập niên 1930',
    era: 'Từ thời Cổ đại (Đông Sơn) qua các triều Đinh – Tiền Lê – Lý – Trần – Hồ – Hậu Lê – Mạc – Tây Sơn – Nguyễn',
    description:
      'Hệ thống trang phục cổ truyền được cắt may theo kỹ thuật phẳng truyền thống và quy chuẩn lễ nghi phương Đông của người Việt trước khi tiếp nhận kỹ thuật cắt may phương Tây.',
    context:
      'Trải qua hàng ngàn năm lịch sử, các triều đại Việt Nam đều xây dựng hệ thống quy chế y phục riêng biệt ("văn hiến chi bang"). Sau một thời gian dài bị mai một do biến động lịch sử thế kỷ 20, từ thập niên 2010 đến nay, phong trào nghiên cứu, phỏng dựng và mặc Việt Cổ Phục đã bùng nổ mạnh mẽ trong giới trẻ.',
    wearers:
      'Xưa kia là hoàng실, bá quan, sĩ tử và thứ dân qua các triều đại; ngày nay là cộng đồng yêu văn hóa, học giả, nghệ sĩ và thế hệ trẻ trong các dịp lễ Tết, cưới hỏi, sự kiện di sản.',
    features: [
      'Kỹ thuật cắt phẳng (flat pattern): không khoét nách cong hay chiết ben ngực/eo như Âu phục',
      'Ghép từ các khổ vải dệt thủ công tạo đường sống lưng (trung phùng) mang ý nghĩa đạo đức',
      'Hệ thống trang phục đa tầng: áo lót (trung y/yếm), áo ngoài, quần hai ống hoặc thường (váy), đai/thắt lưng',
      'Đi kèm hệ thống mũ mão, khăn đóng, khăn vấn, hài, guốc mộc và phụ kiện kim hoàn truyền thống'
    ],
    collarStyle:
      '5 kiểu cổ cốt lõi: Giao lĩnh (cổ chéo), Viên lĩnh (cổ tròn), Trực lĩnh / Đối khâm (cổ thẳng song song), Phương lĩnh / Nhật Bình (cổ vuông/chữ nhật) và Lập lĩnh (cổ đứng).',
    sleeveStyle:
      'Tay đại tụ / quảng tụ (ống tay rộng lớn trong lễ phục) và tay tiểu tụ / tay chẽn (ống tay hẹp gọn trong thường phục).',
    silhouetteStructure:
      'Phom dáng chữ T hoặc chữ A suông rộng, lấy sự kín đáo, khiêm cung và chiều sâu của các lớp vải làm chuẩn mực cái đẹp, không phô diễn đường cong cơ thể.',
    commonMaterials:
      'Gấm, vóc, đoạn, sa, lương, the, lượt, la, đũi tơ tằm, vải cát bá, vải bông và vải gai dệt theo khổ khung cửi cổ.',
    colorsAndMotifs:
      'Tuân theo điển chế phẩm phục từng triều đại và mỹ học truyền thống: đồ án rồng Lý – Trần – Lê – Nguyễn, phượng hoàng, hoa sen, hoa cúc, mây lửa, sóng nước thủy ba, bát bửu.',
    whenAppropriate:
      'Lễ Tết cổ truyền, lễ cưới cổ phục, lễ hội đền chùa, sự kiện văn hóa – học thuật, điện ảnh lịch sử và nhiếp ảnh di sản.',
    significance:
      'Khơi dậy niềm tự hào về nền văn minh Đại Việt, giúp thế hệ hôm nay hiểu rõ tổ tiên từng ăn vận trang nghiêm, tinh xảo như thế nào.',
    terminologyAndScopeNote:
      '"Việt Cổ Phục" là một tập hợp con nằm trong "Việt Phục". Những trang phục giữ nguyên cấu trúc cổ truyền như Áo Tấc, Áo Giao Lĩnh, Áo Nhật Bình là Việt Cổ Phục; còn Áo dài chiết eo tay raglan hiện đại được xếp vào Việt Phục hiện đại.',
    image: aoNguThanImg,
    placeholderComment: '/public/images/viet-co-phuc.png',
    styles: ['traditional', 'elegant', 'romantic', 'modern'],
    colors: ['burgundy', 'red', 'yellow', 'blue', 'green', 'cream', 'black'],
    occasions: ['cultural-event', 'festival', 'wedding', 'photoshoot'],
    cultureNote:
      'Khi tìm hiểu Việt Cổ Phục, việc nắm vững tên gọi các kiểu cổ áo (Giao lĩnh, Viên lĩnh, Đối khâm, Lập lĩnh, Nhật Bình) là chìa khóa dễ nhất để nhận diện từng loại trang phục.'
  },

  // ===========================================================================
  // 10. CỔ PHỤC NGUYỄN TRIỀU
  // ===========================================================================
  {
    id: 'co-phuc-nguyen-trieu',
    studioOutfitId: 'ao-ngu-than',
    groupCategory: 'khai-niem-he-thong',
    groupCategoryLabel: 'Khái niệm & Hệ thống di sản',
    diagramType: 'nguyen-trieu',
    name: 'Cổ Phục Nguyễn Triều',
    vietnameseName: 'Hệ Thống Trang Phục Triều Đại Nhà Nguyễn (1802–1945)',
    alternativeNames: 'Y phục thời Nguyễn, Cổ phục Huế – Nguyễn Triều',
    subtitle: 'Hệ thống cổ phục có tư liệu hiện vật phong phú nhất và gắn bó mật thiết nhất với đời sống hiện đại',
    era: 'Triều Nguyễn (1802–1945), kế thừa cải cách y phục Đàng Trong thời Chúa Nguyễn (1744)',
    description:
      'Toàn bộ hệ thống triều phục, lễ phục và thường phục được quy chuẩn hóa dưới thời các vị vua nhà Nguyễn, tiêu biểu với Áo Nhật Bình, Áo Tấc, Áo Ngũ Thân Tay Chẽn và Bào Cửu Long.',
    context:
      'Là triều đại quân chủ cuối cùng của Việt Nam, nhà Nguyễn để lại nguồn hiện vật gốc, bộ điển chế "Khâm định Đại Nam hội điển sự lệ", tranh vẽ và tư liệu nhiếp ảnh thế kỷ 19–20 vô cùng xác thực. Nhờ đó, Cổ Phục Nguyễn Triều là cầu nối trực tiếp nhất giữa cổ phục xưa và trang phục Việt Nam hiện đại.',
    wearers:
      'Hoàng đế, Hoàng thái hậu, Hoàng hậu, Vương công, Bá quan văn võ chốn kinh thành Huế cùng toàn thể sĩ nông công thương khắp ba miền Bắc – Trung – Nam.',
    features: [
      'Quy chuẩn hóa hệ thống Áo Ngũ Thân Lập Lĩnh (Áo Tấc, Áo Tay Chẽn) làm quốc phục toàn dân',
      'Hệ thống lễ phục cung đình đặc sắc: Bào Hoàng đế, Áo Nhật Bình hậu phi, Áo Bổ Tử quan viên, Áo Giao Lĩnh tế lễ',
      'Sử dụng khuy cài tinh xảo (khuy vàng, bạc, đồng, ngọc, hổ phách) và khăn đóng / mấn xếp nếp chữ Nhân (人) hoặc chữ Nhất (一)',
      'Đề cao sự trang nghiêm, kín đáo, mặc nhiều lớp với áo lót trắng bên trong'
    ],
    collarStyle:
      'Đặc trưng nhất là Cổ lập lĩnh (trên Áo Tấc, Áo Tay Chẽn) và Cổ Nhật Bình (trên lễ phục nữ giới cung đình), bên cạnh Cổ viên lĩnh (trên Bào quan phục) và Cổ giao lĩnh (trong tế phục).',
    sleeveStyle:
      'Gồm cả Tay thụng rộng lớn (trên Bào triều phục, Áo Tấc, Áo Nhật Bình) và Tay chẽn ôm gọn (trên Áo Ngũ Thân thường nhật).',
    silhouetteStructure:
      'Phom chữ A suông đĩnh đạc, cấu trúc 5 thân nối sống lưng thẳng đứng, kết hợp quần hai ống rộng, khăn đóng, quạt giấy và hài thêu / guốc mộc.',
    commonMaterials:
      'Sa, gấm, vóc, đoạn, trừu, lương, the, lụa tơ tằm Phú Xuân – Huế, Vạn Phúc – Hà Đông, Mã Châu – Quảng Nam.',
    colorsAndMotifs:
      'Phân cấp màu sắc rõ rệt trong cung đình (Chính hoàng, Kim hoàng, Đỏ, Tím, Lam, Lục) và nhã nhặn trong dân gian; hoa văn Bát bửu, Rồng 5 móng / 4 móng, Loan Phượng ổ, Tam sơn Thủy ba, Chữ Thọ, Hoa sen.',
    whenAppropriate:
      'Festival Huế, lễ cưới truyền thống, lễ tốt nghiệp, lễ Tết nguyên đán, sự kiện ngoại giao và trình diễn di sản văn hóa.',
    significance:
      'Đặt nền móng trực tiếp cho diện mạo văn hóa trang phục Việt Nam cận – hiện đại và là dòng cổ phục dễ tiếp cận, dễ ứng dụng nhất cho thế hệ trẻ hôm nay.',
    terminologyAndScopeNote:
      '"Cổ Phục Nguyễn Triều" là phân nhóm theo triều đại lịch sử nằm trong "Việt Cổ Phục". Các trang phục nổi tiếng như Áo Nhật Bình, Áo Tấc, Áo Ngũ Thân Tay Chẽn đều thuộc hệ thống Cổ Phục Nguyễn Triều.',
    image: coPhucNguyenTrieuImg,
    placeholderComment: '/public/images/co-phuc-nguyen-trieu.png',
    styles: ['traditional', 'elegant', 'modern', 'minimal'],
    colors: ['yellow', 'red', 'burgundy', 'blue', 'cream', 'black'],
    occasions: ['wedding', 'cultural-event', 'festival', 'photoshoot', 'school'],
    cultureNote:
      'Khi phối Cổ Phục Nguyễn Triều (như Áo Tấc hay Áo Tay Chẽn), khăn đóng đội đầu nên quấn các vòng xếp tạo hình chữ Nhân (人) ngay ngắn phía trước trán.'
  },

  // ===========================================================================
  // 11. ÁO DÀI (Existing Core Item - Enriched with all 14 fields)
  // ===========================================================================
  {
    id: 'ao-dai',
    studioOutfitId: 'ao-dai',
    groupCategory: 'truyen-thong-can-dai',
    groupCategoryLabel: 'Việt phục truyền thống & Cận hiện đại',
    diagramType: 'ao-dai',
    name: 'Áo dài',
    vietnameseName: 'Áo Dài Truyền Thống & Cách Tân',
    alternativeNames: 'Áo Dài Tân Thời, Áo Dài Le Mur / Lập Lĩnh Hiện Đại',
    subtitle: 'Biểu tượng thanh lịch, uyển chuyển và niềm tự hào của văn hóa Việt trên trường quốc tế',
    era: 'Khởi nguồn từ Áo Ngũ Thân (1744), cải cách thành Áo dài tân thời từ thập niên 1930–1960 đến nay',
    description:
      'Trang phục ôm vừa vặn tôn vinh đường nét cơ thể với hai tà áo trước – sau thướt tha xẻ từ eo, mặc cùng quần lụa ống rộng dài chấm gót.',
    context:
      'Kế thừa trực tiếp từ chiếc Áo Ngũ Thân Tay Chẽn thời Nguyễn. Đầu thập niên 1930, họa sĩ Cát Tường (Le Mur) và Lê Phổ khởi xướng cải cách phom dáng gọn gàng hơn; đến thập niên 1950–1960 tại Sài Gòn và Hà Nội, kỹ thuật ráp tay raglan và chiết ben eo hoàn thiện diện mạo Áo dài Việt Nam hiện đại.',
    wearers:
      'Phụ nữ và nam giới Việt Nam ở mọi lứa tuổi trong các dịp lễ Tết, học đường, cưới hỏi, ngoại giao và sự kiện trọng đại.',
    features: [
      'Cổ đứng (lập lĩnh) truyền thống hoặc cổ tròn, cổ thuyền cách tân thanh thoát',
      'Hai tà áo (trước và sau) xẻ từ ngang hông buông dài thướt tha theo bước chân',
      'Kỹ thuật ráp tay raglan (chắp vai chéo từ cổ xuống nách) giúp ôm vai mượt mà không nhăn',
      'Phối cùng quần lụa ống rộng dài chạm gót tôn dáng vẻ cao ráo, dịu dàng'
    ],
    collarStyle:
      'Cổ đứng truyền thống (cao 2–4 cm) hoặc các biến thể cổ tròn, cổ thuyền, cổ tim nhẹ trên áo dài cách tân.',
    sleeveStyle:
      'Tay dài ôm vừa vặn nối theo đường raglan chéo vai, hoặc tay lỡ (dài qua khuỷu tay) trẻ trung trong các thiết kế đương đại.',
    silhouetteStructure:
      'Cấu trúc 2 tà (lược bỏ vạt con của áo ngũ thân), có chiết ben ngực và eo để ôm nhẹ theo đường cong tự nhiên, xẻ tà hai bên hông.',
    commonMaterials:
      'Lụa tơ tằm, gấm, nhung, voan tơ, organza, đũi tơ, linen tưng cao cấp.',
    colorsAndMotifs:
      'Từ trắng tinh khôi (áo dài nữ sinh), đỏ son – vàng kim (áo dài cưới) đến bảng màu pastel hiện đại cùng họa tiết hoa sen, phong cảnh Việt Nam, thêu tay hoặc vẽ lụa.',
    whenAppropriate:
      'Lễ Tết, khai giảng, chụp ảnh kỷ yếu, đám cưới, hội nghị ngoại giao, lễ hội truyền thống và dạo phố xuân.',
    significance:
      'Tượng trưng cho sự trang nhã, phẩm hạnh, vẻ đẹp mềm mại nhưng kiên cường và sức sống vượt thời gian của văn hóa Việt Nam.',
    terminologyAndScopeNote:
      'Áo dài hiện đại thuộc phạm trù "Việt Phục" (trang phục truyền thống Việt Nam), phát triển từ "Áo Ngũ Thân" trong hệ thống Việt Cổ Phục.',
    image: aoDaiImg,
    placeholderComment: '/public/images/ao-dai.png',
    styles: ['modern', 'elegant', 'minimal', 'romantic', 'traditional'],
    colors: ['red', 'burgundy', 'cream', 'pastel', 'yellow', 'blue'],
    occasions: ['school', 'festival', 'photoshoot', 'wedding', 'cultural-event'],
    cultureNote:
      'Khi remix Áo dài cho phong cách trẻ, hãy giữ độ dài tà áo cân đối và tránh chất liệu quá mỏng thiếu lớp lót tinh tế.'
  },

  // ===========================================================================
  // 12. ÁO TỨ THÂN (Existing Core Item - Enriched with all 14 fields)
  // ===========================================================================
  {
    id: 'ao-tu-than',
    studioOutfitId: 'ao-tu-than',
    groupCategory: 'truyen-thong-can-dai',
    groupCategoryLabel: 'Việt phục truyền thống & Cận hiện đại',
    diagramType: 'tu-than',
    name: 'Áo tứ thân',
    vietnameseName: 'Áo Tứ Thân Kinh Bắc',
    alternativeNames: 'Áo Bốn Thân, Trang phục Liền chị Quan họ',
    subtitle: 'Nét duyên mộc mạc, đa tầng rực rỡ của người phụ nữ đồng bằng Bắc Bộ',
    era: 'Hình thành từ thời Lý – Trần – Lê và định hình rõ nét vào thế kỷ 17–20 tại vùng đồng bằng Bắc Bộ',
    description:
      'Gồm bốn vạt áo: hai vạt sau may liền theo sống lưng, hai vạt trước tách rời có thể buộc thắt duyên dáng trước bụng hoặc buông rũ, mặc cùng yếm đào và váy đụp.',
    context:
      'Gắn liền với đời sống nông nghiệp văn minh lúa nước sông Hồng và di sản dân ca Quan họ Bắc Ninh. Chiếc áo vừa thuận tiện cho lao động vừa rực rỡ, tình tứ trong những ngày trẩy hội mùa xuân.',
    wearers:
      'Phụ nữ vùng đồng bằng và trung du Bắc Bộ xưa; ngày nay phổ biến trong biểu diễn nghệ thuật dân gian, lễ hội truyền thống và nhiếp ảnh văn hóa.',
    features: [
      'Bốn thân áo tượng trưng cho tứ thân phụ mẫu (cha mẹ đẻ và cha mẹ chồng)',
      'Hai tà trước tách rời, thường thắt nút nhẹ trước eo để lộ chiếc yếm đào bên trong',
      'Phối đa lớp màu sắc: áo ngoài trầm (nâu non/đen), yếm trong rực rỡ và thắt lưng lụa (bao tượng) xanh/hồng',
      'Đi kèm phụ kiện biểu tượng: nón quai thao (nón ba tầm) và khăn mỏ quạ'
    ],
    collarStyle:
      'Cổ trực lĩnh / đối khâm không có bâu dựng đứng, mở dọc theo hai vạt trước để khoe phần cổ yếm đào bên trong.',
    sleeveStyle:
      'Tay chẽn (ống tay hẹp ôm gọn cánh tay và cổ tay, giúp người phụ nữ Bắc Bộ thao tác lao động và múa hát linh hoạt).',
    silhouetteStructure:
      'Cấu trúc 4 khổ vải ghép lại, khoác ngoài yếm lụa và chân váy đen (váy lĩnh / váy đụp), cố định vòng eo bằng dải thắt lưng lụa dài buộc múi trước bụng.',
    commonMaterials:
      'Lụa tơ tằm, vải the, vải sồi, đũi mộc nhuộm củ nâu hoặc chàm kết hợp yếm lụa satin/tơ sống.',
    colorsAndMotifs:
      'Đặc trưng bởi nghệ thuật phối màu dân gian Bắc Bộ ("nâu non – cánh sen – hồ thủy – mỡ gà"): áo ngoài màu nâu/vàng mơ phối yếm đỏ đào và dải lưng xanh lục/hồng đào.',
    whenAppropriate:
      'Lễ hội mùa xuân, hội Lim – hát Quan họ, sự kiện văn hóa dân gian, biểu diễn nghệ thuật và photoshoot concept di sản Bắc Bộ.',
    significance:
      'Ca ngợi đạo hiếu đối với đấng sinh thành, vẻ đẹp đảm đang, duyên dáng và chiều sâu văn hóa dân gian vùng Kinh Bắc.',
    terminologyAndScopeNote:
      'Áo tứ thân mang cấu trúc gốc của dòng áo Đối Khâm 4 vạt trong hệ thống trang phục cổ truyền Việt Nam.',
    image: aoTuThanImg,
    placeholderComment: '/public/images/ao-tu-than.png',
    styles: ['traditional', 'romantic', 'modern', 'street'],
    colors: ['cream', 'yellow', 'burgundy', 'green', 'pastel'],
    occasions: ['festival', 'photoshoot', 'cultural-event'],
    cultureNote:
      'Trọng tâm của Áo tứ thân nằm ở sự hài hòa giữa màu yếm, dải thắt lưng lụa và hai tà áo trước. Nên giữ độ kín đáo thanh lịch của phần yếm khi remix.'
  },

  // ===========================================================================
  // 13. ÁO BÀ BA (Existing Core Item - Enriched with all 14 fields)
  // ===========================================================================
  {
    id: 'ao-ba-ba',
    studioOutfitId: 'ao-ba-ba',
    groupCategory: 'truyen-thong-can-dai',
    groupCategoryLabel: 'Việt phục truyền thống & Cận hiện đại',
    diagramType: 'ba-ba',
    name: 'Áo bà ba',
    vietnameseName: 'Áo Bà Ba Nam Bộ',
    alternativeNames: 'Áo Cánh Nam Bộ',
    subtitle: 'Nét khoáng đạt, bình dị và nghĩa tình của vùng đất phương Nam sông nước',
    era: 'Hình thành từ cuối thế kỷ 19 – đầu thế kỷ 20 tại vùng đất Nam Bộ đến nay',
    description:
      'Áo không cổ (cổ tròn hoặc cổ tim), thân ngắn qua hông, cài hàng cúc thẳng chính giữa ngực, xẻ tà hai bên hông kèm hai túi đắp phía trước tiện dụng.',
    context:
      'Ra đời trong quá trình khai hoang lập ấp nơi kênh rạch miệt vườn phương Nam. Nhờ thiết kế gọn nhẹ, thoáng mát và bền bỉ, Áo bà ba đã trở thành biểu tượng văn hóa gắn liền với tâm hồn hào sảng của người dân miền Tây Nam Bộ.',
    wearers:
      'Cả nam giới và nữ giới vùng Nam Bộ trong lao động, sinh hoạt thường nhật lẫn lễ hội văn hóa miền sông nước.',
    features: [
      'Thân áo ngắn vừa qua hông, xẻ tà nhẹ hai bên tạo sự thoải mái tối đa khi vận động',
      'Hàng khuy cài thẳng chính giữa thân trước từ cổ xuống gấu áo',
      'Hai túi đắp lớn ở vạt dưới phía trước vừa thực dụng vừa tạo điểm nhấn cân đối',
      'Luôn gắn liền với hình ảnh chiếc khăn rằn Nam Bộ, quần lụa đen (lãnh Mỹ A) và nón lá'
    ],
    collarStyle:
      'Không có bâu cổ dựng: thường là cổ tròn sát chân cổ, cổ tim nhẹ hoặc cổ bà lai thanh thoát.',
    sleeveStyle:
      'Tay dài ôm vừa phải (hoặc tay ráp raglan trên các mẫu áo bà ba hiện đại), cổ tay suông gọn dễ xắn lên khi làm việc.',
    silhouetteStructure:
      'Cấu trúc áo ngắn xẻ tà hông, thân sau may liền một mảnh vải phẳng, thân trước chia hai vạt cài nút giữa, ôm nhẹ tôn dáng mà vẫn cử động tự do.',
    commonMaterials:
      'Lãnh Mỹ A (Tân Châu), lụa tơ tằm, đũi, vải bà ba, linen, vải bông thoáng mát.',
    colorsAndMotifs:
      'Xưa phổ biến màu đen, nâu, trắng ngà nhuộm tự nhiên; ngày nay đa dạng với bảng màu pastel, vàng mỡ gà, xanh lục bình, tím hoa cà trên nền vải trơn hoặc dệt hoa chìm.',
    whenAppropriate:
      'Dạo phố, đi cà phê, du lịch sinh thái miền Tây, lễ hội văn hóa Nam Bộ, hoạt động ngoại khóa và photoshoot trẻ trung.',
    significance:
      'Tượng trưng cho tính cách phóng khoáng, trọng nghĩa tình, giản dị nhưng kiên cường của con người vùng đất phương Nam.',
    terminologyAndScopeNote:
      'Áo bà ba là trang phục truyền thống đặc trưng của vùng Nam Bộ thuộc hệ thống "Việt Phục" giai đoạn cận – hiện đại.',
    image: aoBaBaImg,
    placeholderComment: '/public/images/ao-ba-ba.png',
    styles: ['minimal', 'modern', 'street', 'romantic', 'traditional'],
    colors: ['cream', 'black', 'pastel', 'yellow', 'green', 'blue'],
    occasions: ['casual', 'school', 'photoshoot', 'festival'],
    cultureNote:
      'Áo bà ba bằng chất liệu linen hoặc đũi mộc khi phối cùng quần ống suông và khăn rằn tạo nên tổng thể vừa đậm chất Việt vừa rất hợp gu tối giản Gen Z.'
  }
];
