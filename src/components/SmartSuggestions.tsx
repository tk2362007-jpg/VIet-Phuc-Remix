import React from 'react';
import { Palette, Sparkles } from 'lucide-react';

interface SmartSuggestionsProps {
  whyThisWorks: {
    colorHarmony: string;
    traditionalIdentity: string;
    modernTouch: string;
  };
  className?: string;
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  whyThisWorks,
  className = ''
}) => {
  return (
    <div
      id="smart-suggestions-section"
      className={`rounded-2xl border border-[#E0D3C1] bg-[#FFFDF9] p-6 sm:p-8 shadow-xs ${className}`}
    >
      <div className="flex items-center gap-3 pb-6 border-b border-[#EFE5D6]">
        <div className="w-10 h-10 rounded-full bg-[#C8973E]/15 flex items-center justify-center text-[#991B1E]">
          <Sparkles className="w-5 h-5 text-[#C8973E]" />
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#7A6B5F]">
            Stylist Analysis
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
            WHY THIS LOOK WORKS
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {/* Card 1: Color Harmony */}
        <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E8DCC $\to$ #E5D7C4] space-y-2.5 hover:shadow-xs transition-shadow">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1C1917]">
            <span className="text-xl">🎨</span>
            <span>Color Harmony</span>
          </div>
          <div className="text-xs font-semibold text-[#8A631E] uppercase tracking-wider">
            Phối Màu & Ánh Sắc
          </div>
          <p className="text-sm text-[#4A3E35] leading-relaxed">
            {whyThisWorks.colorHarmony}
          </p>
        </div>

        {/* Card 2: Traditional Identity */}
        <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E5D7C4] space-y-2.5 hover:shadow-xs transition-shadow">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1C1917]">
            <span className="text-xl">👘</span>
            <span>Traditional Identity</span>
          </div>
          <div className="text-xs font-semibold text-[#991B1E] uppercase tracking-wider">
            Bản Sắc Việt Phục
          </div>
          <p className="text-sm text-[#4A3E35] leading-relaxed">
            {whyThisWorks.traditionalIdentity}
          </p>
        </div>

        {/* Card 3: Modern Touch */}
        <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E5D7C4] space-y-2.5 hover:shadow-xs transition-shadow">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1C1917]">
            <span className="text-xl">✨</span>
            <span>Modern Touch</span>
          </div>
          <div className="text-xs font-semibold text-[#3B664B] uppercase tracking-wider">
            Hơi Thở Đương Đại
          </div>
          <p className="text-sm text-[#4A3E35] leading-relaxed">
            {whyThisWorks.modernTouch}
          </p>
        </div>
      </div>
    </div>
  );
};
