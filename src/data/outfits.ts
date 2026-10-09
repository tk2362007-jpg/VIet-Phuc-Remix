import { Outfit } from '../types';

// Asset paths for traditional outfits
// Thay thế các đường dẫn hình ảnh này bằng file ảnh thật trong thư mục /public/images/ khi có tài nguyên:
// Ví dụ: /public/images/ao-dai.jpg, /public/images/ao-tu-than.jpg, ...
import aoDaiImg from '../assets/images/ao_dai_look_1789613767841.jpg';
import aoDaiNamImg from '../assets/images/ao_dai_nam_1791198228388.jpg';
import aoTuThanImg from '../assets/images/ao_tu_than_1789613779510.jpg';
import aoNguThanImg from '../assets/images/ao_ngu_than_1789613791206.jpg';
import aoBaBaImg from '../assets/images/ao_ba_ba_1789613803910.jpg';
import aoNhatBinhImg from '../assets/images/ao_nhat_binh_panel_1790835266236.jpg';
import aoTacImg from '../assets/images/ao_tac_nam_1791534791565.jpg';
import aoTayChenImg from '../assets/images/regenerated_image_1791532924012.png';
import aoGiaoLinhImg from '../assets/images/ao_giao_linh_outfit_1791526657514.jpg';
import aoVienLinhImg from '../assets/images/ao_vien_linh_nam_1791534759869.jpg';
import aoDoiKhamImg from '../assets/images/ao_doi_kham_outfit_1791526682660.jpg';
import vietPhucHeroImg from '../assets/images/viet_phuc_hero.svg';

export const OUTFITS_DATA: Outfit[] = [
  {
    id: 'ao-dai',
    name: 'Áo dài',
    vietnameseName: 'Áo Dài Truyền Thống & Cách Tân',
    subtitle: 'Biểu tượng thanh lịch, uyển chuyển của văn hóa Việt',
    era: 'Phát triển từ thế kỷ 18 (chúa Nguyễn Phúc Khoát) qua biến thể Le Mur (1930s) đến nay',
    gender: 'female',
    description:
      'Trang phục ôm sát tôn vinh đường nét cơ thể với hai tà áo thướt tha, xẻ từ eo, mặc cùng quần lụa ống rộng dài chấm gót.',
    context:
      'Áo dài là trang phục biểu tượng quốc hồn quốc túy của Việt Nam. Xuất phát từ áo ngũ thân lập lĩnh, qua bàn tay các nhà thiết kế đầu thế kỷ 20, áo dài đã được tinh giản, tôn vinh nét mềm mại, dịu dàng nhưng vô cùng tự tin.',
    features: [
      'Cổ đứng (lập lĩnh) kín đáo hoặc cổ tròn/cổ thuyền cách điệu',
      'Hai vạt áo (tà trước và tà sau) buông dài duyên dáng',
      'Hàng khuy chéo hoặc khóa kéo tinh tế bên mạn sườn',
      'Quần lụa dài suông mềm rũ tạo bước đi uyển chuyển'
    ],
    significance:
      'Tượng trưng cho sự trang nhã, lễ giáo, phẩm hạnh và tinh thần dung hòa, trường tồn của phụ nữ và người Việt qua nhiều thời đại.',
    whenAppropriate:
      'Lễ tết, khai giảng, chụp ảnh kỷ yếu, đám cưới, lễ hội truyền thống hoặc các buổi tiệc trang trọng.',
    image: aoDaiImg,
    maleImage: aoDaiNamImg,
    placeholderComment: '/public/images/ao-dai.png',
    styles: ['modern', 'elegant', 'minimal', 'romantic', 'traditional'],
    colors: ['red', 'burgundy', 'cream', 'pastel', 'yellow', 'blue'],
    occasions: ['school', 'festival', 'photoshoot', 'wedding', 'cultural-event'],
    cultureNote:
      'Khi remix Áo dài cho phong cách trẻ, hãy giữ độ dài tà áo vừa vặn và tránh xẻ tà quá cao hoặc chất liệu xuyên thấu thiếu tinh tế.'
  },
  {
    id: 'ao-tu-than',
    name: 'Áo tứ thân',
    vietnameseName: 'Áo Tứ Thân Kinh Bắc',
    subtitle: 'Nét mộc mạc, đa tầng rực rỡ của phụ nữ đồng bằng Bắc Bộ',
    era: 'Thịnh hành từ thế kỷ 12 đến đầu thế kỷ 20 tại miền Bắc',
    gender: 'female',
    description:
      'Gồm bốn vạt áo: hai vạt sau may liền thành sống lưng, hai vạt trước để buông thả hoặc buộc vạt trước bụng, phối yếm đào và thắt lưng lụa.',
    context:
      'Gắn liền với hình ảnh các liền chị quan họ Kinh Bắc và nét đẹp lao động cần cù, đảm đang của người phụ nữ nông thôn Bắc Bộ xưa.',
    features: [
      'Bốn thân áo tượng trưng cho tứ thân phụ mẫu (cha mẹ đôi bên)',
      'Vạt trước buộc lả lướt kết hợp yếm lụa đào bên trong',
      'Thắt lưng lụa xanh/hồng xuyến duyên dáng ngang eo',
      'Thường đi kèm nón quai thao và khăn mỏ quạ'
    ],
    significance:
      'Đại diện cho đạo hiếu (tứ thân phụ mẫu), sự mộc mạc, chân chất và tình yêu thương son sắt của người phụ nữ nông nghiệp truyền thống.',
    whenAppropriate:
      'Lễ hội mùa xuân, hát quan họ, biểu diễn văn hóa nghệ thuật dân gian, photoshoot concept hoài cổ hoặc sự kiện văn hóa dân gian.',
    image: aoTuThanImg,
    placeholderComment: '/public/images/ao-tu-than.png',
    styles: ['traditional', 'romantic', 'modern', 'street'],
    colors: ['cream', 'yellow', 'burgundy', 'green', 'pastel'],
    occasions: ['festival', 'photoshoot', 'cultural-event'],
    cultureNote:
      'Trọng tâm của Áo tứ thân nằm ở chiếc yếm và cách thắt tà trước. Khi phối phong cách Gen Z hiện đại, nên giữ sự kín đáo vừa phải ở phần yếm và tránh cắt ngắn các tà buông đặc trưng.'
  },
  {
    id: 'ao-ngu-than',
    name: 'Áo ngũ thân',
    vietnameseName: 'Áo Ngũ Thân Lập Lĩnh',
    subtitle: 'Đỉnh cao phong thái nho nhã, chính trực của quý ông & quý cô xưa',
    era: 'Định hình chính thức từ thời chúa Nguyễn Phúc Khoát (1744) và vua Minh Mạng (1837)',
    gender: 'male',
    description:
      'Có 5 thân tượng trưng cho đạo lý ngũ thường. Form áo thẳng đứng, cổ lập lĩnh nghiêm trang cài 5 nút kim loại/ngọc quý.',
    context:
      'Từng là quốc phục tiêu chuẩn của người Việt thời Nguyễn cho cả nam và nữ, thể hiện sự bình đẳng trong phong cách sống thanh lịch, đĩnh đạc.',
    features: [
      '5 thân áo ghép lại: 4 vạt ngoài bao bọc 1 vạt trong (con cái kính cẩn dưới sự che chở của cha mẹ)',
      '5 cúc áo đại diện ngũ thường: Nhân - Lễ - Nghĩa - Trí - Tín',
      'Cổ đứng nghiêm chỉnh vuông góc hoặc vát nhẹ (cổ lập lĩnh)',
      'Cổ tay ôm vừa vặn (tay chẽn) hoặc thụng rộng trang trọng (tay thụng/áo tấc)'
    ],
    significance:
      'Thể hiện phong thái đàng hoàng, điềm đạm, khiêm nhường và răn dạy con người luôn gìn giữ ngũ thường trong cuộc sống.',
    whenAppropriate:
      'Nghi lễ ngoại giao, lễ cưới truyền thống, sự kiện học thuật văn hóa trang trọng, triển lãm di sản.',
    image: aoNguThanImg,
    placeholderComment: '/public/images/ao-ngu-than.png',
    styles: ['traditional', 'elegant', 'modern', 'minimal'],
    colors: ['burgundy', 'blue', 'green', 'black', 'cream', 'red'],
    occasions: ['wedding', 'cultural-event', 'photoshoot', 'festival'],
    cultureNote:
      'Áo ngũ thân đề cao form dáng thẳng thớm và hàng cúc chỉn chu. Khi phối street style hiện đại (ví dụ mix cùng boots hay quần âu), cần giữ cổ áo đứng gãy gọn để không làm mất vẻ uy nghiêm vốn có.'
  },
  {
    id: 'ao-ba-ba',
    name: 'Áo bà ba',
    vietnameseName: 'Áo Bà Ba Nam Bộ',
    subtitle: 'Nét khoáng đạt, bình dị và thuần phác của miền sông nước',
    era: 'Xuất hiện khoảng giữa thế kỷ 19 tại Nam Bộ',
    gender: 'female',
    description:
      'Áo cổ tròn hoặc xẻ tim nhẹ, thân ngắn chớm hông, xẻ tà hai bên hông với hai túi phía trước tiện dụng, may bằng vải lụa hoặc linen mộc mạc.',
    context:
      'Gắn liền với đời sống miệt vườn, kênh rạch phương Nam phóng khoáng, biểu tượng cho sự dũng cảm và kiên cường của người dân miền Tây Nam Bộ.',
    features: [
      'Form áo ôm nhẹ tôn eo nhưng cử động cực kỳ linh hoạt',
      'Xẻ tà hai bên hông tạo sự thoáng mát khi di chuyển',
      'Hai chiếc túi đắp phía trước vạt vừa thực dụng vừa duyên',
      'Thường phối hài hòa cùng khăn rằn và nón lá chóp nhọn'
    ],
    significance:
      'Biểu hiện tinh thần phóng khoáng, chân thành, gần gũi thiên nhiên và sức sống mãnh liệt của người dân Nam Bộ.',
    whenAppropriate:
      'Đi cà phê, dạo phố cuối tuần, du lịch sinh thái sông nước, hoạt động ngoại khóa trường học, photoshoot năng động trẻ trung.',
    image: aoBaBaImg,
    placeholderComment: '/public/images/ao-ba-ba.png',
    styles: ['minimal', 'modern', 'street', 'romantic', 'traditional'],
    colors: ['cream', 'black', 'pastel', 'yellow', 'green', 'blue'],
    occasions: ['casual', 'school', 'photoshoot', 'festival'],
    cultureNote:
      'Áo bà ba có tính ứng dụng cao nhất trong đời thường. Rất hợp để kết hợp với quần jeans ống suông, sneakers hay túi tote thô mộc, tạo vẻ ngoài Gen Z rất thời thượng.'
  },
  {
    id: 'ao-nhat-binh',
    name: 'Áo Nhật Bình',
    vietnameseName: 'Áo Nhật Bình Cung Đình Triều Nguyễn',
    subtitle: 'Tuyệt tác mỹ thuật cung đình của bậc hậu phi, công chúa và mệnh phụ triều Nguyễn',
    era: 'Triều Nguyễn (1802–1945), cải biên từ áo Phi Phong thời Lê – Chúa Nguyễn',
    gender: 'female',
    description:
      'Lễ phục cung đình cao quý với cổ áo đối khâm hình chữ nhật bản lớn thêu hoa văn tinh xảo, dải ngũ sắc nơi cổ tay tượng trưng cho ngũ hành.',
    context:
      'Được quy định chính thức trong điển chế triều Nguyễn làm thường phục của bậc Hoàng hậu, Phi tần; ngày nay là trang phục lễ cưới hỏi và đại lễ văn hóa đỉnh cao.',
    features: [
      'Cổ chữ nhật bản to viền kim tuyến rực rỡ',
      'Cổ tay ngũ sắc (5 dải màu tương ứng ngũ hành: kim, mộc, thủy, hỏa, thổ)',
      'Thân áo xẻ tà hai bên buông dài sang trọng',
      'Hoa văn đoàn phượng, bướm hoa thêu tay công phu'
    ],
    significance:
      'Tượng trưng cho sự cao quý, tôn nghiêm, phẩm hạnh đoan trang và tài hoa thêu thùa đỉnh cao của mỹ thuật cung đình Huế.',
    whenAppropriate:
      'Lễ ăn hỏi, hôn lễ cổ truyền, chụp ảnh kỷ yếu di sản, festival cung đình và lễ hội văn hóa lớn.',
    image: aoNhatBinhImg,
    placeholderComment: '/public/images/ao-nhat-binh.png',
    styles: ['elegant', 'traditional', 'romantic'],
    colors: ['red', 'yellow', 'blue', 'green', 'burgundy', 'pastel'],
    occasions: ['wedding', 'cultural-event', 'photoshoot', 'festival'],
    cultureNote:
      'Áo Nhật Bình mang tính lễ nghi cung đình sâu sắc. Khi remix hiện đại, nên giữ nguyên vẹn cổ áo chữ nhật và dải ngũ sắc cổ tay.'
  },
  {
    id: 'ao-tac',
    name: 'Áo Tấc',
    vietnameseName: 'Áo Tấc Ngũ Thân Tay Thụng',
    subtitle: 'Lễ phục trang nghiêm, uy nghi của mọi tầng lớp người Việt thời Nguyễn',
    era: 'Thịnh hành thế kỷ 18–20 triều Nguyễn',
    gender: 'male',
    description:
      'Biến thể áo ngũ thân với đôi tay áo thụng dài rộng buông rủ bề thế, dùng trong các nghi lễ trang trọng nhất.',
    context:
      'Áo tấc được mặc bởi cả vua quan lẫn thường dân trong các dịp đại lễ như tế tự, cưới hỏi, lễ tết, thể hiện sự bình đẳng trong phong thái tôn nghiêm.',
    features: [
      'Tay thụng dài và rộng quá đầu gối khi buông thõng',
      'Cổ lập lĩnh (cổ đứng) cài 5 cúc đồng ngay ngắn',
      '5 thân áo rộng rãi phủ kín qua gối',
      'Mặc lót áo trắng bên trong và quần lụa trắng trang nhã'
    ],
    significance:
      'Đại diện cho sự cung kính, mực thước, lễ nghĩa và tấm lòng hướng về cội nguồn tổ tiên.',
    whenAppropriate:
      'Lễ tế, cúng giỗ đại gia đình, hôn lễ truyền thống, bưng quả, sự kiện ngoại giao văn hóa.',
    image: aoTacImg,
    placeholderComment: '/public/images/ao-tac.png',
    styles: ['traditional', 'elegant', 'minimal'],
    colors: ['burgundy', 'blue', 'green', 'black', 'yellow', 'cream'],
    occasions: ['wedding', 'cultural-event', 'festival'],
    cultureNote:
      'Đặc trưng tối thượng của Áo Tấc là tay thụng uy nghi. Chú ý tư thế chắp tay (vái) trang nghiêm khi diện áo tấc.'
  },
  {
    id: 'ao-tay-chen',
    name: 'Áo Tay Chẽn',
    vietnameseName: 'Áo Ngũ Thân Tay Chẽn',
    subtitle: 'Tiền thân của áo dài hiện đại, năng động, thanh lịch và gọn gàng',
    era: 'Thế kỷ 18–19 thời chúa Nguyễn Phúc Khoát và vua Minh Mạng',
    gender: 'male',
    description:
      'Áo ngũ thân với cánh tay ôm vừa vặn (tay chẽn), thân áo suông thẳng, tiện cho việc đi lại và sinh hoạt thường nhật.',
    context:
      'Là trang phục thường nhật của sĩ tử, trí thức và quan lại thời Nguyễn trước khi phát triển thành áo dài tân thời.',
    features: [
      'Tay áo may chẽn thuôn dài ôm vừa cánh tay',
      'Thân áo ghép từ 5 mảnh vải mang ý nghĩa che chở',
      'Hàng cúc cài chéo bên nách phải',
      'Dáng áo thanh thoát, linh hoạt khi vận động'
    ],
    significance:
      'Biểu tượng cho trí tuệ nho nhã, tác phong nhanh nhẹn và chuẩn mực ăn mặc lịch thiệp.',
    whenAppropriate:
      'Học đường, công sở văn hóa, dạo phố, chụp lookbook, thuyết trình học thuật.',
    image: aoTayChenImg,
    placeholderComment: '/public/images/ao-tay-chen.png',
    styles: ['modern', 'minimal', 'traditional', 'street'],
    colors: ['cream', 'black', 'blue', 'burgundy', 'green'],
    occasions: ['school', 'cultural-event', 'casual', 'photoshoot'],
    cultureNote:
      'Rất dễ phối cùng giày âu, boots hay túi da hiện đại, tạo nên diện mạo quý ông/quý cô Việt tân thời cuốn hút.'
  },
  {
    id: 'giao-linh',
    name: 'Áo Giao Lĩnh',
    vietnameseName: 'Áo Giao Lĩnh Cổ Chéo Thời Lý - Trần - Lê',
    subtitle: 'Trang phục cổ kính bậc nhất với vạt cổ chéo qua ngực đầy khí phách',
    era: 'Từ thế kỷ 11 đến thế kỷ 18 (Thời Lý, Trần, Hậu Lê)',
    gender: 'female',
    description:
      'Áo có hai vạt cổ đắp chéo nhau sang bên phải, thân áo rộng rãi buông dài, thắt đai lưng lụa bên ngoài.',
    context:
      'Là kiểu áo cổ truyền lâu đời nhất của người Việt, được ghi nhận trong nhiều thư tịch cổ và tượng Phật thời Lý - Trần.',
    features: [
      'Cổ áo giao nhau tạo hình chữ V uyển chuyển',
      'Thân áo rộng dài phủ đến gót hoặc mắt cá',
      'Đai lưng lụa thắt ngang eo buông dải thướt tha',
      'Phối lớp áo lót bên trong tạo hiệu ứng đa tầng cổ'
    ],
    significance:
      'Thể hiện hào khí Thăng Long, tinh thần cởi mở, tự tại và sự gắn bó mật thiết với dòng chảy văn minh Đại Việt.',
    whenAppropriate:
      'Lễ hội đền chùa mùa xuân, tái hiện lịch sử, chụp ảnh cổ phong hoàng tráng, triển lãm di sản.',
    image: aoGiaoLinhImg,
    placeholderComment: '/public/images/giao-linh.png',
    styles: ['traditional', 'romantic', 'minimal'],
    colors: ['cream', 'burgundy', 'green', 'black', 'blue'],
    occasions: ['festival', 'cultural-event', 'photoshoot'],
    cultureNote:
      'Quy tắc cổ xưa luôn đắp vạt trái đè lên vạt phải (giao lĩnh hữu nhậm), tuyệt đối không đắp ngược.'
  },
  {
    id: 'vien-linh',
    name: 'Áo Viên Lĩnh',
    vietnameseName: 'Áo Viên Lĩnh Cổ Tròn Quan Phục & Lễ Phục',
    subtitle: 'Phong thái quyền uy, uy nghiêm với cổ tròn khép kín quanh chân cổ',
    era: 'Thế kỷ 15 đến thế kỷ 19 (Thời Lê Sơ đến thời Nguyễn)',
    gender: 'male',
    description:
      'Áo có cổ tròn ôm sát quanh cổ, cài nút bên vai phải, thường thêu bổ tử trước ngực làm triều phục và công phục.',
    context:
      'Được vua quan sử dụng trong các buổi thiết triều và sự kiện trọng thể quốc gia, toát lên sự đĩnh đạc và uy nghiêm.',
    features: [
      'Cổ tròn (viên lĩnh) viền nẹp chắc chắn ôm sát chân cổ',
      'Cúc cài ẩn hoặc khuy kim loại bên vai phải',
      'Thân áo suông rộng bệ vệ',
      'Thường phối đai lưng da hoặc ngọc bản lớn'
    ],
    significance:
      'Đại diện cho trật tự quy củ, sự vững chãi của vương triều và tinh thần phụng sự đất nước.',
    whenAppropriate:
      'Đại lễ văn hóa, tái hiện triều nghi, kịch nghệ lịch sử, hội thảo nghiên cứu di sản.',
    image: aoVienLinhImg,
    placeholderComment: '/public/images/vien-linh.png',
    styles: ['traditional', 'elegant', 'minimal'],
    colors: ['blue', 'red', 'burgundy', 'black', 'green'],
    occasions: ['cultural-event', 'wedding', 'festival'],
    cultureNote:
      'Áo viên lĩnh mang tính công quyền và lễ nghi cao, khi remix cần tôn trọng form cổ tròn kín đáo.'
  },
  {
    id: 'doi-kham',
    name: 'Áo Đối Khâm',
    vietnameseName: 'Áo Đối Khâm Khoác Ngoài',
    subtitle: 'Nét thanh thoát, nhẹ nhàng với hai vạt áo song song buông mở',
    era: 'Thịnh hành thời Lý, Trần, Lê và lan tỏa đến thời Nguyễn',
    gender: 'female',
    description:
      'Áo khoác ngoài có hai vạt đối xứng chạy song song từ cổ xuống gấu áo, để mở hoặc buộc nhẹ bằng dây nơ lụa.',
    context:
      'Thường được phụ nữ quý tộc mặc khoác ngoài cùng với yếm và xiêm váy nhiều tầng, tạo nên sự bồng bềnh như tiên nữ.',
    features: [
      'Hai vạt trước song song không chồng lên nhau',
      'Cổ viền nẹp đứng chạy dọc xuống vạt áo',
      'Thường may bằng tơ mỏng, sa, the nhẹ nhàng',
      'Dễ dàng khoe khéo lớp yếm và đai lưng bên trong'
    ],
    significance:
      'Tượng trưng cho sự phóng khoáng, duyên dáng, nữ tính và vẻ đẹp thanh thoát của thiếu nữ Đại Việt.',
    whenAppropriate:
      'Dạo phố cuối tuần, chụp lookbook thời trang mộng mơ, biểu diễn nghệ thuật, dã ngoại mùa thu.',
    image: aoDoiKhamImg,
    placeholderComment: '/public/images/doi-kham.png',
    styles: ['modern', 'romantic', 'street', 'elegant'],
    colors: ['cream', 'pastel', 'green', 'yellow', 'burgundy'],
    occasions: ['photoshoot', 'casual', 'festival', 'cultural-event'],
    cultureNote:
      'Cực kỳ phù hợp để làm áo khoác cardigan phong cách Gen Z thời thượng, khoác ngoài áo hai dây hay đầm suông.'
  }
];
