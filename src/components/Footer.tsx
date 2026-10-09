import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#E4D7C5] bg-[#F5EFE6] text-[#4A3E34] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-3 cursor-pointer group"
            >
              <Logo size="sm" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#1C1917] group-hover:text-[#991B1E] transition-colors">
                  VIỆT PHỤC REMIX
                </span>
                <span className="text-xs font-medium text-[#7A6B5F] italic">
                  "Mặc Việt, theo cách của bạn."
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#594C42] max-w-md">
              Dự án sáng tạo dự thi Audition với chủ đề{' '}
              <strong>"Phối trang phục truyền thống theo phong cách Gen Z"</strong>. Mục tiêu
              kết nối giới trẻ với di sản áo dài, ngũ thân, tứ thân và bà ba qua lăng kính thời
              trang đương đại tinh tế và chuẩn mực văn hóa.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-serif font-bold text-[#1C1917] text-base mb-4 tracking-wide">
              Điều Hướng
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#991B1E] transition-colors"
                >
                  Trang chủ (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-[#991B1E] transition-colors"
                >
                  Khám phá Việt phục (Explore)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio')}
                  className="hover:text-[#991B1E] transition-colors font-medium text-[#991B1E]"
                >
                  Phòng Phối Đồ (Remix Studio)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lookbook')}
                  className="hover:text-[#991B1E] transition-colors"
                >
                  Tủ Đồ Đã Lưu (Lookbook)
                </button>
              </li>
            </ul>
          </div>

          {/* Cultural Philosophy */}
          <div>
            <h4 className="font-serif font-bold text-[#1C1917] text-base mb-4 tracking-wide">
              Thông Điệp Văn Hóa
            </h4>
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E4D7C5] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#991B1E]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Culture Check Engine</span>
              </div>
              <p className="text-xs text-[#5C4F45] leading-relaxed">
                Remix trang phục truyền thống không phải là làm biến dạng di sản, mà là làm cho di sản tiếp tục được sống, được yêu và tự hào sải bước trên phố cùng thế hệ hôm nay.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#DECDBB] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6B5F] gap-4">
          <p>© {new Date().getFullYear()} VIỆT PHỤC REMIX — Audition Project.</p>
          <div className="flex items-center gap-1">
            <span>Thiết kế vì tình yêu di sản văn hóa Việt Nam</span>
            <Heart className="w-3.5 h-3.5 text-[#991B1E] fill-[#991B1E]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
