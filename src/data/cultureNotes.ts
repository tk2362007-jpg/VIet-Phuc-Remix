import {
  OutfitId,
  OccasionId,
  StyleId,
  ColorId,
  CultureCheckData
} from '../types';
import { OUTFITS_DATA } from './outfits';
import { COLORS_DATA } from './colors';
import { STYLES_DATA } from './styles';
import { OCCASIONS_DATA } from './occasions';
import { getOutfitAccessoryRecommendation } from './accessories';

interface EvaluateParams {
  outfitId: OutfitId;
  occasionId: OccasionId;
  styleId: StyleId;
  colorId: ColorId;
  accessoryIds: string[];
}

export function evaluateCultureCheck({
  outfitId,
  occasionId,
  styleId,
  colorId,
  accessoryIds
}: EvaluateParams): CultureCheckData {
  const outfit = OUTFITS_DATA.find((o) => o.id === outfitId) || OUTFITS_DATA[0];
  const color = COLORS_DATA.find((c) => c.id === colorId) || COLORS_DATA[0];
  const style = STYLES_DATA.find((s) => s.id === styleId) || STYLES_DATA[0];
  const occasion = OCCASIONS_DATA.find((o) => o.id === occasionId) || OCCASIONS_DATA[0];

  const retainedPoints: string[] = [];
  const modernRemixPoints: string[] = [];

  // 1. Evaluate Retained Traditional Points
  switch (outfitId) {
    case 'ao-dai':
      retainedPoints.push('Giữ nguyên vẹn tỷ lệ hai tà áo trước sau buông rủ thanh thoát');
      retainedPoints.push('Tôn vinh tinh thần kín đáo, uyển chuyển đặc trưng');
      break;
    case 'ao-tu-than':
      retainedPoints.push('Bảo toàn cấu trúc 4 vạt áo và tinh thần dân dã Kinh Bắc');
      retainedPoints.push('Gìn giữ điểm nhấn thắt vạt duyên dáng và yếm lụa phía trong');
      break;
    case 'ao-ngu-than':
      retainedPoints.push('Bảo toàn cấu trúc 5 thân và cổ áo lập lĩnh vuông vắn nghiêm chỉnh');
      retainedPoints.push('Duy trì hàng cúc cài bên sườn tượng trưng cho đạo lý ngũ thường');
      break;
    case 'ao-ba-ba':
      retainedPoints.push('Giữ form xẻ tà hai bên hông đặc trưng cùng sự nhẹ nhàng, phóng khoáng');
      retainedPoints.push('Bảo lưu túi đắp trước ngực/vạt áo mang hơi thở sinh hoạt miền Tây');
      break;
    case 'ao-nhat-binh':
      retainedPoints.push('Bảo toàn cổ áo đối khâm chữ nhật bản lớn thêu hoa văn cung đình tinh xảo');
      retainedPoints.push('Gìn giữ dải ngũ sắc nơi cổ tay tượng trưng cho ngũ hành và phẩm trật');
      break;
    case 'ao-tac':
      retainedPoints.push('Bảo toàn đôi tay thụng dài rộng buông rủ bề thế đại lễ');
      retainedPoints.push('Gìn giữ cổ lập lĩnh đứng trang nghiêm và phong thái mực thước');
      break;
    case 'ao-tay-chen':
      retainedPoints.push('Bảo toàn phom áo ngũ thân tay chẽn gọn gàng, tiền thân áo dài');
      retainedPoints.push('Duy trì hàng 5 cúc đồng cài bên sườn và nét nho nhã trí thức');
      break;
    case 'giao-linh':
      retainedPoints.push('Bảo tồn cổ áo đắp chéo chữ V kinh điển thời Lý - Trần - Lê');
      retainedPoints.push('Giữ nguyên vẹn tinh thần phóng khoáng, tự tại của hào khí Thăng Long');
      break;
    case 'vien-linh':
      retainedPoints.push('Bảo tồn cổ áo tròn khép kín quanh chân cổ đầy khí chất uy quyền');
      retainedPoints.push('Gìn giữ phom áo bệ vệ, khuôn thước chuẩn mực thời Lê - Nguyễn');
      break;
    case 'doi-kham':
      retainedPoints.push('Bảo tồn cấu trúc hai vạt song song buông mở khoáng đạt');
      retainedPoints.push('Gìn giữ nét thanh thoát nhiều tầng lớp khi phối cùng yếm lụa bên trong');
      break;
  }

  // Check style alignment
  if (styleId === 'traditional' || styleId === 'elegant') {
    retainedPoints.push('Ưu tiên đường nét trang nhã, phom dáng chuẩn mực');
  } else {
    retainedPoints.push('Tôn trọng phom dáng gốc đồng thời tạo khoảng thoáng di chuyển cho Gen Z');
  }

  // 2. Evaluate Modern Remix Points
  if (styleId === 'street') {
    modernRemixPoints.push('Phối nhịp điệu streetwear đương đại: kết hợp năng động cùng phụ kiện hiện đại');
  } else if (styleId === 'minimal') {
    modernRemixPoints.push('Tinh giản đường nét rườm rà, tập trung vào form phẳng và chất liệu mộc');
  } else if (styleId === 'romantic') {
    modernRemixPoints.push('Tạo độ bay bổng, lãng mạn qua bảng màu pastel và chi tiết nhẹ nhàng');
  } else {
    modernRemixPoints.push(`Hơi thở ${style.nameVi.toLowerCase()} được đưa vào tinh tế`);
  }

  modernRemixPoints.push(`Ứng dụng sắc màu ${color.nameVi} mang lại hiệu ứng thị giác trẻ trung`);

  const accessoryRec = getOutfitAccessoryRecommendation(outfitId);
  const mismatchedAcc = accessoryIds.filter((id) => accessoryRec.avoidIds.includes(id));
  const matchedAcc = accessoryIds.filter((id) => accessoryRec.recommendedIds.includes(id));

  if (accessoryIds.length > 0) {
    if (mismatchedAcc.length === 0 && matchedAcc.length > 0) {
      retainedPoints.push(`Phối phụ kiện chuẩn mực văn hóa theo hệ thức ${outfit.name}`);
      modernRemixPoints.push(`Tiết chế và chọn lọc ${accessoryIds.length} phụ kiện bổ trợ hài hòa, tôn dáng trang phục chính`);
    } else if (mismatchedAcc.length > 0) {
      const firstMismatchReason = accessoryRec.avoidReasons[mismatchedAcc[0]];
      modernRemixPoints.push(
        firstMismatchReason || `Phối thử nghiệm ${accessoryIds.length} phụ kiện đa phong cách`
      );
    } else {
      modernRemixPoints.push(`Tiết chế và chọn lọc ${accessoryIds.length} phụ kiện bổ trợ, không làm lấn át trang phục chính`);
    }
  } else {
    modernRemixPoints.push('Tối giản tuyệt đối phụ kiện, để vẻ đẹp thuần túy của phom áo tỏa sáng');
  }

  // 3. Formality & Context Note
  let culturalNote = '';
  let contextSuitability = '';
  let indicatorScore = 9; // out of 10
  let statusText = 'Hài hòa & Tôn trọng (Respectful Remix)';

  if (occasionId === 'wedding' || occasionId === 'cultural-event') {
    if (styleId === 'street') {
      indicatorScore = 8;
      statusText = 'Sáng tạo Phá cách (Creative Remix)';
      culturalNote =
        'Cách phối này mang đậm cá tính Gen Z, phù hợp cho photoshoot nghệ thuật hoặc dự tiệc trẻ trung. Tuy nhiên trong các nghi thức đại lễ trang trọng hoặc không gian tâm linh, nên tiết chế phụ kiện thể thao để đảm bảo tính tôn nghiêm.';
      contextSuitability = 'Rất tuyệt cho dự tiệc bạn bè, sự kiện trẻ, cần lưu ý khi vào nơi thờ tự.';
    } else {
      indicatorScore = 10;
      statusText = 'Chuẩn mực Văn hóa Tinh tế (Culturally Refined)';
      culturalNote =
        'Lựa chọn hoàn hảo cho sự kiện văn hóa và hôn lễ. Outfit giữ được trọn vẹn sự trang trọng, lịch thiệp mà vẫn mang phong thái hiện đại của người trẻ.';
      contextSuitability = 'Phù hợp tuyệt đối với cả không gian lễ nghi lẫn ngoại giao văn hóa.';
    }
  } else if (occasionId === 'school') {
    indicatorScore = 9;
    statusText = 'Trẻ trung & Đúng mực (Youthful & Respectful)';
    culturalNote =
      'Phù hợp với môi trường học đường và giảng đường đại học: năng động, thoải mái, lịch sự và toát lên niềm tự hào sinh viên Việt Nam.';
    contextSuitability = 'Hoàn hảo cho ngày hội truyền thống tại trường học, thuyết trình đồ án.';
  } else {
    // casual, festival, photoshoot
    indicatorScore = 9;
    statusText = 'Tự do & Hài hòa (Harmonious Remix)';
    culturalNote =
      'Cách phối này rất phù hợp với nhịp sống thời trang đường phố, dạo chơi cuối tuần hoặc các bộ ảnh nghệ thuật đương đại, giúp văn hóa truyền thống sống động trong đời thường.';
    contextSuitability = 'Tự tin sải bước trên phố, chụp lookbook thời trang hoặc dự festival.';
  }

  if (mismatchedAcc.length > 0) {
    indicatorScore = Math.max(7, indicatorScore - 1);
    statusText = 'Phá cách (Cần lưu ý chuẩn phụ kiện)';
    const firstReason = accessoryRec.avoidReasons[mismatchedAcc[0]];
    if (firstReason) {
      culturalNote = `${firstReason} ${culturalNote}`;
    }
  } else if (matchedAcc.length >= 2 && indicatorScore < 10) {
    indicatorScore = 10;
    statusText = 'Chuẩn mực Văn hóa Tinh tế (Culturally Refined)';
  }

  // 4. Why this look works
  const colorHarmony = `Sắc ${color.nameVi} (${color.culturalMeaning}) kết hợp ăn ý với tinh thần của dịp ${occasion.nameVi.toLowerCase()}, tạo cảm giác vừa mắt và giàu chiều sâu cảm xúc.`;

  const traditionalIdentity = `Giữ lại những đặc trưng cốt lõi của ${outfit.name}: ${retainedPoints[0].toLowerCase()}, đảm bảo người nhìn nhận ra ngay di sản Việt Nam.`;

  const modernTouch = `Phong cách ${style.nameVi.toLowerCase()} thổi vào luồng gió mới, giúp trang phục không bị cảm giác "bảo tàng hóa" mà trở thành một outfit sống động của người trẻ hôm nay.`;

  return {
    outfitName: outfit.name,
    retainedPoints,
    modernRemixPoints,
    culturalNote,
    indicatorScore,
    statusText,
    contextSuitability,
    whyThisWorks: {
      colorHarmony,
      traditionalIdentity,
      modernTouch
    }
  };
}
