import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Compass, Heart, Shield, Wind } from 'lucide-react';
import { OUTFITS_DATA } from '../data/outfits';
import heroImg from '../assets/images/viet_phuc_hero.svg';
import { VietPhucTriviaCard } from '../components/VietPhucTriviaCard';
import { GentleWindBackground } from '../components/GentleWindBackground';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectOutfitToExplore: (outfitId: string) => void;
  onQuickStartRemix: (outfitId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectOutfitToExplore,
  onQuickStartRemix
}) => {
  return (
    <div className="relative space-y-24 sm:space-y-32">
      {/* Gentle wind effect with festival petals and silky breeze ribbons */}
      <GentleWindBackground />

      {/* 1. HERO SECTION */}
      <section className="relative z-1 pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Text Column */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7A6B5F] font-bold">
                  <Wind className="w-3.5 h-3.5 text-[#991B1E]" />
                  VIỆT PHỤC REMIX • MÙA LỄ HỘI CỔ TRUYỀN
                </span>
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1C1917] leading-[1.08]">
                  MẶC VIỆT <br />
                  <span className="text-[#991B1E]">THEO CÁCH</span> <br />
                  CỦA BẠN.
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#52453B] leading-relaxed max-w-xl">
                Khám phá Việt phục. Remix phong cách. <br />
                Hiểu câu chuyện phía sau mỗi trang phục.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  id="hero-start-remix-btn"
                  onClick={() => onQuickStartRemix()}
                  className="group inline-flex items-center justify-center gap-3 bg-[#991B1E] hover:bg-[#781316] text-white px-8 py-4 rounded-full font-medium text-base shadow-sm hover:shadow-lg transition-all hover:scale-102 active:scale-98"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>BẮT ĐẦU REMIX</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-explore-btn"
                  onClick={() => onNavigate('explore')}
                  className="inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#3A2E24] px-6 py-4 rounded-full font-medium text-base border border-[#DACBBA] transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-[#991B1E]" />
                  <span>Tìm Hiểu Việt Phục</span>
                </button>
              </div>

              {/* Cultural Trust Points */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8DEC $\to$ #E5D7C3] text-xs text-[#6B5C50]">
                <div>
                  <div className="font-serif font-bold text-base text-[#1C1917]">4 Loại</div>
                  <span>Việt phục kinh điển</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-base text-[#1C1917]">100%</div>
                  <span>Tôn trọng bản sắc</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-base text-[#1C1917]">Culture Check</div>
                  <span>Gợi ý văn hóa tức thì</span>
                </div>
              </div>
            </div>

            {/* Hero Right Fashion Editorial Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#991B1E]/15 via-transparent to-[#C8973E]/20 blur-lg -z-10" />

                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E2D4C2] bg-[#FAF7F2] aspect-[4/5]">
                  <img
                    src={heroImg}
                    alt="Người trẻ mặc Việt phục remix phong cách hiện đại"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-103"
                  />

                  {/* Editorial Tag Overlay */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[11px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                    Gen Z Heritage Edition
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KIẾN THỨC VIỆT PHỤC (GOOGLE SEARCH GROUNDED TRIVIA) */}
      <VietPhucTriviaCard
        onExploreOutfit={onSelectOutfitToExplore}
        onQuickStartRemix={onQuickStartRemix}
      />

      {/* 3. EXPLORE VIỆT PHỤC SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#991B1E]">
            Di Sản Thời Trang Dân Tộc
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917]">
            EXPLORE VIỆT PHỤC
          </h2>
          <p className="text-sm sm:text-base text-[#594C42]">
            Discover the stories behind Vietnamese traditional clothing.
          </p>
        </div>

        {/* 4 Garment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OUTFITS_DATA.map((outfit) => (
            <div
              key={outfit.id}
              className="group rounded-2xl bg-[#FFFDF9] border border-[#E2D5C3] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F4ECE0] flex items-center justify-center">
                <img
                  src={outfit.image}
                  alt={outfit.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#1C1917] text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
                  {outfit.name}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-[#1C1917] group-hover:text-[#991B1E] transition-colors">
                    {outfit.name}
                  </h3>
                  <p className="text-xs text-[#7A6B5F] font-medium line-clamp-1">
                    {outfit.subtitle}
                  </p>
                  <p className="text-xs text-[#4A3E35] line-clamp-2 leading-relaxed pt-1">
                    {outfit.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFE5D6] flex items-center gap-2">
                  <button
                    onClick={() => onSelectOutfitToExplore(outfit.id)}
                    className="flex-1 py-2 px-3 rounded-full text-xs font-medium text-[#1C1917] bg-[#F2ECE0] hover:bg-[#E5DAC8] transition-colors text-center"
                  >
                    Explore
                  </button>
                  <button
                    onClick={() => onQuickStartRemix(outfit.id)}
                    className="py-2 px-3 rounded-full text-xs font-medium text-white bg-[#991B1E] hover:bg-[#781316] transition-colors text-center"
                  >
                    Remix
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F5EFE6] border border-[#E4D7C5] p-8 sm:p-12 lg:p-16">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#991B1E]">
              Quy Trình Sáng Tạo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-2">
              HOW IT WORKS
            </h2>
            <p className="text-sm text-[#615247] mt-2">
              Chỉ 3 bước đơn giản để biến di sản nghìn năm thành phong cách độc bản của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {/* Step 01 */}
            <div className="relative bg-[#FFFDF9] p-7 rounded-2xl border border-[#E0D2C0] shadow-xs space-y-4">
              <div className="font-serif text-3xl font-bold text-[#991B1E]">
                01 — CHOOSE
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                Chọn dịp bạn muốn mặc.
              </h3>
              <p className="text-xs sm:text-sm text-[#54473D] leading-relaxed">
                Khai giảng, festival, dạo phố, chụp lookbook hay đám cưới bạn thân. Bối cảnh
                sẽ định hình phom dáng và sự thoải mái khi diện đồ.
              </p>
            </div>

            {/* Step 02 */}
            <div className="relative bg-[#FFFDF9] p-7 rounded-2xl border border-[#E0D2C0] shadow-xs space-y-4">
              <div className="font-serif text-3xl font-bold text-[#991B1E]">
                02 — REMIX
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                Chọn Việt phục, màu sắc và phụ kiện.
              </h3>
              <p className="text-xs sm:text-sm text-[#54473D] leading-relaxed">
                Tự do kết hợp giữa Áo dài, Áo tứ thân, Ngũ thân, Bà ba với sắc đỏ son, kem ngà,
                hoàng thổ, cùng phụ kiện khăn đóng, kiềng bạc, sneakers hay nón quai thao.
              </p>
            </div>

            {/* Step 03 */}
            <div className="relative bg-[#FFFDF9] p-7 rounded-2xl border border-[#E0D2C0] shadow-xs space-y-4">
              <div className="font-serif text-3xl font-bold text-[#991B1E]">
                03 — DISCOVER
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                Tạo outfit và tìm hiểu câu chuyện văn hóa.
              </h3>
              <p className="text-xs sm:text-sm text-[#54473D] leading-relaxed">
                Hệ thống <strong>Culture Check</strong> phân tích ngay những giá trị cốt lõi bạn
                đã giữ lại và lưu ý bối cảnh mặc chuẩn xác, giúp bạn tự tin tỏa sáng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#781316] via-[#991B1E] to-[#59151A] text-white p-10 sm:p-16 overflow-hidden shadow-xl text-center space-y-6">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-[#F5E6CC]">
            Tự Do Sáng Tạo • Tôn Trọng Bản Sắc
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold max-w-2xl mx-auto tracking-tight">
            READY TO REMIX VIỆT?
          </h2>

          <p className="text-sm sm:text-base text-[#F7ECE1]/90 max-w-lg mx-auto leading-relaxed">
            Học sinh, sinh viên hãy cùng nhau đưa Việt phục ra khỏi trang sách và bảo tàng, hòa nhịp cùng phong cách Gen Z thời thượng.
          </p>

          <div className="pt-2">
            <button
              id="cta-create-look-btn"
              onClick={() => onQuickStartRemix()}
              className="inline-flex items-center gap-3 bg-[#FAF7F2] hover:bg-white text-[#991B1E] font-bold px-8 py-4 rounded-full text-base shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              <span>CREATE YOUR LOOK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
