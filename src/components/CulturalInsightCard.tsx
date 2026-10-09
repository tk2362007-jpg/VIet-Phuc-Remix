import React from 'react';
import { BookOpen, Sparkles, ChevronRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { OutfitLookState } from '../types';
import { getDynamicCulturalInsight } from '../services/culturalInsightService';
import { InsightTab } from './CulturalInsightPopover';

interface CulturalInsightCardProps {
  lookState: OutfitLookState;
  onOpenInsight: (tab?: InsightTab, accessoryId?: string) => void;
  className?: string;
}

export const CulturalInsightCard: React.FC<CulturalInsightCardProps> = ({
  lookState,
  onOpenInsight,
  className = ''
}) => {
  const insight = getDynamicCulturalInsight(lookState);

  return (
    <div
      id="cultural-insight-studio-card"
      className={`rounded-2xl border border-[#E2D5C3] bg-[#FFFDF9] p-4 sm:p-5 shadow-xs transition-all hover:border-[#D0BD9F] ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EFE5D7]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#991B1E]">
              Bản Sắc Di Sản
            </div>
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#1C1917]">
              Cultural Insight
            </h4>
          </div>
        </div>

        {/* Harmony badge */}
        <button
          type="button"
          onClick={() => onOpenInsight('synergy')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF4EB] border border-[#E0D0BB] hover:bg-[#F2E5D2] text-[11px] font-medium text-[#7A4B1A] transition-colors cursor-pointer"
          title="Xem đánh giá hòa hợp văn hóa"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#991B1E]" />
          <span>{insight.culturalSynergy.harmonyScore}/10 Chuẩn vị</span>
        </button>
      </div>

      {/* Dynamic Summary Body */}
      <div className="py-3 space-y-2.5 text-xs text-[#4A3B32]">
        {/* Dynamic Outfit Note */}
        <div className="flex items-start gap-2">
          <span className="font-bold text-[#991B1E] shrink-0">👘</span>
          <div className="leading-snug">
            <strong className="text-[#1C1917]">{insight.outfit.name}:</strong>{' '}
            <span className="text-[#59493D]">{insight.outfit.era}.</span>{' '}
            <span className="text-[#781316] italic font-serif">"{insight.outfit.whatToPreserve}"</span>
          </div>
        </div>

        {/* Dynamic Occasion Etiquette */}
        <div className="flex items-start gap-2">
          <span className="font-bold text-[#C58B35] shrink-0">🏮</span>
          <div className="leading-snug">
            <strong className="text-[#1C1917]">{insight.occasion.nameVi}:</strong>{' '}
            <span className="text-[#59493D]">{insight.occasion.stylingDo}</span>
          </div>
        </div>

        {/* Dynamic Accessories Lore */}
        {insight.accessories.length > 0 ? (
          <div className="flex items-start gap-2">
            <span className="font-bold text-[#2E7D32] shrink-0">📿</span>
            <div className="leading-snug">
              <strong className="text-[#1C1917]">{insight.accessories[0].name}:</strong>{' '}
              <span className="text-[#59493D] line-clamp-1">{insight.accessories[0].culturalMeaning}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2 text-[#7A695B]">
            <span className="shrink-0 font-bold">📿</span>
            <span className="italic">Chưa có phụ kiện. Thêm phụ kiện truyền thống để hoàn thiện ý nghĩa văn hóa.</span>
          </div>
        )}
      </div>

      {/* Interactive Quick Actions Bar */}
      <div className="pt-3 border-t border-[#EFE5D7] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => onOpenInsight('outfit')}
            className="text-[11px] font-medium text-[#6B5A4E] hover:text-[#991B1E] hover:underline"
          >
            Lịch sử {insight.outfit.name}
          </button>
          <span className="text-[#D0C2B0]">·</span>
          <button
            type="button"
            onClick={() => onOpenInsight('occasion')}
            className="text-[11px] font-medium text-[#6B5A4E] hover:text-[#991B1E] hover:underline"
          >
            Quy tắc dịp {insight.occasion.name}
          </button>
          {insight.accessories.length > 0 && (
            <>
              <span className="text-[#D0C2B0]">·</span>
              <button
                type="button"
                onClick={() => onOpenInsight('accessories')}
                className="text-[11px] font-medium text-[#6B5A4E] hover:text-[#991B1E] hover:underline"
              >
                Ý nghĩa phụ kiện ({insight.accessories.length})
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => onOpenInsight('outfit')}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#991B1E] hover:text-[#781316] transition-colors group cursor-pointer"
        >
          <span>Khám phá chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
