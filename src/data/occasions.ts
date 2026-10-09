import { Occasion } from '../types';

export const OCCASIONS_DATA: Occasion[] = [
  {
    id: 'casual',
    name: 'Casual',
    nameVi: 'Ngày thường',
    description: 'Dạo phố, cà phê cùng bạn bè, đi triển lãm hoặc sinh hoạt thường nhật',
    vibe: 'Thoải mái, gần gũi, phóng khoáng và tự do vận động',
    icon: 'Coffee'
  },
  {
    id: 'school',
    name: 'School',
    nameVi: 'Đi học',
    description: 'Giảng đường, ngày thứ Hai mặc áo dài, thuyết trình văn hóa',
    vibe: 'Thanh lịch, trẻ trung, nền nã và gọn gàng',
    icon: 'GraduationCap'
  },
  {
    id: 'work',
    name: 'Work',
    nameVi: 'Đi làm',
    description: 'Văn phòng công sở, gặp gỡ đối tác, môi trường công tác hiện đại',
    vibe: 'Chỉn chu, lịch thiệp, đĩnh đạc và tinh tế',
    icon: 'Briefcase'
  },
  {
    id: 'tet',
    name: 'Tet',
    nameVi: 'Tết',
    description: 'Du xuân đầu năm, chúc Tết gia đình, lễ chùa cầu an, hội chợ Tết',
    vibe: 'Rạng ngời, hỷ khí, may mắn, tươi vui và ấm áp',
    icon: 'Flower2'
  },
  {
    id: 'festival',
    name: 'Festival',
    nameVi: 'Lễ hội',
    description: 'Lễ hội hoa đăng, ngày hội văn hóa truyền thống, hội làng dân gian',
    vibe: 'Rực rỡ, náo nức, tự hào và giàu bản sắc dân tộc',
    icon: 'Sparkles'
  },
  {
    id: 'wedding',
    name: 'Wedding',
    nameVi: 'Cưới hỏi',
    description: 'Lễ ăn hỏi, bưng quả, chúc phúc và dự tiệc cưới trang trọng',
    vibe: 'Trang nghiêm, sang trọng, hạnh phúc và viên mãn',
    icon: 'HeartHandshake'
  },
  {
    id: 'photoshoot',
    name: 'Photoshoot',
    nameVi: 'Chụp ảnh',
    description: 'Concept nghệ thuật, ảnh kỷ yếu, lookbook thời trang cổ phong',
    vibe: 'Đậm chất nghệ thuật, thị giác cao, góc cạnh và biểu cảm',
    icon: 'Camera'
  },
  {
    id: 'cultural-event',
    name: 'Cultural Event',
    nameVi: 'Sự kiện',
    description: 'Hội nghị, tọa đàm di sản, biểu diễn nghệ thuật, giao lưu quốc tế',
    vibe: 'Chuẩn mực, danh giá, đài các và tôn nghiêm',
    icon: 'Landmark'
  },
  {
    id: 'travel',
    name: 'Travel',
    nameVi: 'Du lịch',
    description: 'Check-in danh lam thắng cảnh, khám phá phố cổ, trải nghiệm di tích',
    vibe: 'Năng động, linh hoạt, nổi bật trong từng khung hình kỷ niệm',
    icon: 'Plane'
  },
  {
    id: 'other',
    name: 'Other',
    nameVi: 'Khác',
    description: 'Các dịp đặc biệt khác theo cảm hứng sáng tạo của riêng bạn',
    vibe: 'Tự do, đa dạng phong cách, sáng tạo không giới hạn',
    icon: 'Sparkle'
  }
];
