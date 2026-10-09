import React from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { CultureCheckData } from '../types';

interface CultureCheckCardProps {
  data: CultureCheckData;
  className?: string;
}

export const CultureCheckCard: React.FC<CultureCheckCardProps> = ({
  data,
  className = ''
}) => {
  // Respectful progress bar logic (e.g. 8/10 -> 80% filled)
  const score = Math.max(1, Math.min(10, data.indicatorScore || 9));
  const progressPercent = score * 10;

  return (
    <div
      id="culture-check-section"
      className={`rounded-2xl border border-[#E0D3C1] bg-[#FFFDF9] p-6 sm:p-8 shadow-xs ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EFE5D6] gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#991B1E]/10 flex items-center justify-center text-[#991B1E]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#991B1E]">
              Tính Năng Độc Bản
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
              CULTURE CHECK
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#E4D7C5] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#594C42]">
          <span>Bạn đang remix:</span>
          <span className="font-serif font-bold text-[#991B1E] text-sm">
            {data.outfitName}
          </span>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Retained heritage points */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
            <span>Đặc Trưng Bản Sắc Giữ Lại</span>
          </h4>
          <ul className="space-y-2 text-sm text-[#382F28]">
            {data.retainedPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#2E7D32] font-bold text-base leading-none">✓</span>
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modern remix elements */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#991B1E] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#991B1E]" />
            <span>Hơi Thở Gen Z & Điểm Cách Tân</span>
          </h4>
          <ul className="space-y-2 text-sm text-[#382F28]">
            {data.modernRemixPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#991B1E] font-bold text-base leading-none">✦</span>
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cultural Note Warning / Advice Callout */}
      <div className="bg-[#FAF4E8] border-l-4 border-[#C8973E] p-4 sm:p-5 rounded-r-xl my-6">
        <div className="flex items-center gap-2 text-sm font-bold text-[#8A631E] mb-1">
          <AlertCircle className="w-4 h-4 text-[#C8973E]" />
          <span className="tracking-wide">CULTURAL NOTE — LƯU Ý BỐI CẢNH</span>
        </div>
        <p className="text-sm text-[#544434] leading-relaxed">
          {data.culturalNote}
        </p>
        {data.contextSuitability && (
          <div className="mt-2 text-xs text-[#7A6451] flex items-center gap-1.5 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-[#C8973E]" />
            <span>Khuyến nghị bối cảnh: {data.contextSuitability}</span>
          </div>
        )}
      </div>

      {/* Cultural Context Visual Indicator Bar */}
      <div className="border-t border-[#EFE5D6] pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs mb-2 gap-2">
          <span className="font-bold tracking-widest uppercase text-[#4A3B32]">
            CULTURAL CONTEXT INDICATOR
          </span>
          <span className="font-semibold text-[#991B1E] bg-[#991B1E]/10 px-3 py-1 rounded-full w-fit">
            {data.statusText}
          </span>
        </div>

        {/* Indicator graphic bar */}
        <div className="w-full bg-[#EADCCB] h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#C8973E] via-[#BA2D31] to-[#991B1E] transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-[11px] text-[#7A6B5F] mt-2 italic text-center sm:text-left">
          * Chỉ số mang tính định hướng thông tin và truyền cảm hứng tôn trọng văn hóa, không áp đặt điểm số tuyệt đối lên phong cách cá nhân của bạn.
        </p>
      </div>
    </div>
  );
};
