import React, { useEffect, useState } from 'react';
import {
  X,
  BookOpen,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { OutfitLookState } from '../types';
import {
  getDynamicCulturalInsight,
  DynamicCulturalInsight
} from '../services/culturalInsightService';

export type InsightTab = 'outfit' | 'occasion' | 'accessories' | 'synergy';

interface CulturalInsightPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  lookState: OutfitLookState;
  initialTab?: InsightTab;
  highlightAccessoryId?: string | null;
}

export const CulturalInsightPopover: React.FC<CulturalInsightPopoverProps> = ({
  isOpen,
  onClose,
  lookState,
  initialTab = 'outfit',
  highlightAccessoryId = null
}) => {
  const [activeTab, setActiveTab] = useState<InsightTab>(initialTab);
  const [selectedAccIndex, setSelectedAccIndex] = useState<number>(0);

  // Sync initial tab when changed externally
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Compute dynamic cultural insight
  const insight: DynamicCulturalInsight = getDynamicCulturalInsight(lookState);

  // Sync accessory index if highlightAccessoryId is provided
  useEffect(() => {
    if (highlightAccessoryId && insight.accessories.length > 0) {
      const idx = insight.accessories.findIndex((a) => a.id === highlightAccessoryId);
      if (idx >= 0) {
        setSelectedAccIndex(idx);
      }
    }
  }, [highlightAccessoryId, insight.accessories]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentAccessory = insight.accessories[selectedAccIndex] || insight.accessories[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cultural-insight-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#DDCDB7] flex flex-col overflow-hidden text-[#1C1917]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="relative px-6 py-5 border-b border-[#E5D7C3] bg-gradient-to-r from-[#F6EFE3] via-[#FAF7F2] to-[#F3ECE1] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#991B1E] text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#991B1E]">
                  Góc Nhìn Văn Hóa & Lịch Sử
                </span>
                <span className="text-[#A39281] text-xs">/</span>
                <span className="text-xs text-[#6B5A4E] font-medium">
                  Dynamic Heritage Context
                </span>
              </div>
              <h2
                id="cultural-insight-title"
                className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]"
              >
                CULTURAL INSIGHT
              </h2>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-[#EAE0D2] text-[#4A3B32] hover:text-[#991B1E] flex items-center justify-center transition-colors shadow-xs"
            aria-label="Đóng bảng thông tin văn hóa"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Context Breadcrumb Bar */}
        <div className="px-6 py-2.5 bg-[#F1E9DC]/60 border-b border-[#E8DEC $\to$ #E5D8C6] flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5C4C40] shrink-0">
          <span className="font-semibold text-[#991B1E]">Bản phối hiện tại:</span>
          <span className="font-serif font-bold text-[#1C1917]">{insight.outfit.name}</span>
          <span>·</span>
          <span>Dịp: <strong className="text-[#2C241E]">{insight.occasion.nameVi}</strong></span>
          <span>·</span>
          <span>Sắc màu: <strong className="text-[#2C241E]">{insight.color.nameVi}</strong></span>
          <span>·</span>
          <span>
            {insight.accessories.length > 0
              ? `${insight.accessories.length} món phụ kiện`
              : 'Chưa chọn phụ kiện'}
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 border-b border-[#E2D4C0] bg-[#FAF7F2] overflow-x-auto shrink-0 gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('outfit')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-serif font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'outfit'
                ? 'border-[#991B1E] text-[#991B1E] bg-[#991B1E]/5'
                : 'border-transparent text-[#6B5A4E] hover:text-[#1C1917] hover:border-[#DACBB8]'
            }`}
          >
            <span>👘 Việt Phục ({insight.outfit.name})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('occasion')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-serif font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'occasion'
                ? 'border-[#991B1E] text-[#991B1E] bg-[#991B1E]/5'
                : 'border-transparent text-[#6B5A4E] hover:text-[#1C1917] hover:border-[#DACBB8]'
            }`}
          >
            <span>🏮 Dịp Mặc & Nghi Thức</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('accessories')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-serif font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'accessories'
                ? 'border-[#991B1E] text-[#991B1E] bg-[#991B1E]/5'
                : 'border-transparent text-[#6B5A4E] hover:text-[#1C1917] hover:border-[#DACBB8]'
            }`}
          >
            <span>📿 Phụ Kiện ({insight.accessories.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('synergy')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-serif font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'synergy'
                ? 'border-[#991B1E] text-[#991B1E] bg-[#991B1E]/5'
                : 'border-transparent text-[#6B5A4E] hover:text-[#1C1917] hover:border-[#DACBB8]'
            }`}
          >
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#991B1E]" />
              <span>Hài Hòa Văn Hóa</span>
            </span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
          {/* TAB 1: OUTFIT CULTURAL CONTEXT */}
          {activeTab === 'outfit' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Outfit Header Summary */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#FFFDF9] to-[#F5ECE0] border border-[#E0D2BF] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
                    {insight.outfit.vietnameseName}
                  </h3>
                  <span className="text-xs text-[#7A6757] italic">
                    Thời kỳ: {insight.outfit.era}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4A3B32]">
                  <strong>Nguồn gốc lịch sử:</strong> {insight.outfit.dynastyOrigin}
                </p>
                {insight.outfit.proverbOrQuote && (
                  <div className="pt-2 text-xs italic text-[#781316] border-t border-[#E8DEC $\to$ #E5D8C6] border-[#E8DEC0]">
                    "{insight.outfit.proverbOrQuote}"
                  </div>
                )}
              </div>

              {/* Cultural Philosophy */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-[#C58B35]" />
                  <span>Triết Lý & Tinh Thần Văn Hóa</span>
                </h4>
                <p className="text-[#332A24] bg-[#FFFDF9] p-4 rounded-xl border border-[#E5DACB]">
                  {insight.outfit.philosophy}
                </p>
              </div>

              {/* Structural Codes / Anatomy */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#991B1E]" />
                  <span>Mật Mã Cấu Trúc Đặc Trưng</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {insight.outfit.structuralCodes.map((code, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#FFFDF9] rounded-xl border border-[#E5DACB] flex items-start gap-2.5 text-xs sm:text-sm text-[#382F28]"
                    >
                      <span className="text-[#991B1E] font-bold mt-0.5">•</span>
                      <span>{code}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to preserve when remixing */}
              <div className="p-4 rounded-xl bg-[#FEF9E7] border border-[#ECD9A4] space-y-1.5 text-xs sm:text-sm text-[#544320]">
                <div className="flex items-center gap-2 font-bold text-[#8A5E12]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Quy Tắc Tôn Trọng Khi Cách Tân (Respectful Remix Rule):</span>
                </div>
                <p className="leading-relaxed">{insight.outfit.whatToPreserve}</p>
                <p className="text-[11px] text-[#705626] pt-1">
                  💡 <em>{insight.outfit.whyItMatters}</em>
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: OCCASION CONTEXT */}
          {activeTab === 'occasion' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Occasion Header */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#FFFDF9] to-[#F5ECE0] border border-[#E0D2BF] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
                    {insight.occasion.nameVi}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#991B1E]/10 text-[#991B1E] border border-[#991B1E]/20">
                    Cấp độ lễ nghi: {insight.occasion.decorumLevel}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4A3E]">
                  <strong>Bối cảnh thực tế:</strong> {insight.occasion.culturalSetting}
                </p>
              </div>

              {/* Compatibility Assessment */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                  <span>Đánh Giá Độ Phù Hợp Với {insight.outfit.name}</span>
                </h4>
                <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E5DACB] text-xs sm:text-sm text-[#382F28] leading-relaxed">
                  {insight.occasion.compatibilityAssessment}
                </div>
              </div>

              {/* Etiquette Dos & Don'ts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#166534] flex items-center gap-1.5">
                    <span>✓ Lời Khuyên Nên Làm (Do)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#14532D]">
                    {insight.occasion.stylingDo}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#991B1E] flex items-center gap-1.5">
                    <span>✕ Điểm Cần Tránh (Don't)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#7F1D1D]">
                    {insight.occasion.stylingDont}
                  </p>
                </div>
              </div>

              {/* Etiquette Guidelines list */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B32]">
                  Chuẩn Mực Ứng Xử & Không Gian Văn Hóa
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#44372D]">
                  {insight.occasion.etiquetteGuidelines.map((guideline, idx) => (
                    <li
                      key={idx}
                      className="p-3 bg-[#FFFDF9] rounded-xl border border-[#E5DACB] flex items-start gap-2.5"
                    >
                      <span className="text-[#991B1E] font-bold text-sm">✦</span>
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: ACCESSORIES CONTEXT */}
          {activeTab === 'accessories' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {insight.accessories.length === 0 ? (
                <div className="text-center py-10 px-4 bg-[#FFFDF9] rounded-xl border border-[#E5DACB] space-y-3">
                  <Sparkles className="w-8 h-8 text-[#C58B35] mx-auto opacity-75" />
                  <h4 className="font-serif font-bold text-base text-[#1C1917]">
                    Chưa Chọn Phụ Kiện
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B5A4E] max-w-md mx-auto">
                    Trong văn hóa Việt, phụ kiện như Khăn đóng, Vòng kiềng, Nón lá hay Guốc mộc không chỉ là vật trang sức mà còn chứa đựng cả một câu chuyện phong tục sâu sắc.
                  </p>
                  <p className="text-xs text-[#991B1E] font-medium">
                    👉 Hãy chọn ít nhất một món phụ kiện ở Bước 5 trong Studio để khám phá ý nghĩa văn hóa của nó!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Accessory Selector pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5DACB]">
                    {insight.accessories.map((acc, idx) => (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => setSelectedAccIndex(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                          selectedAccIndex === idx
                            ? 'bg-[#991B1E] text-white shadow-xs'
                            : 'bg-[#F2EAE0] text-[#544435] hover:bg-[#E8DCCB]'
                        }`}
                      >
                        <span>{acc.name}</span>
                        <span className="text-[10px] opacity-75 uppercase">
                          ({acc.categoryName})
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Selected Accessory Card */}
                  {currentAccessory && (
                    <div className="p-5 rounded-xl bg-[#FFFDF9] border border-[#E5DACB] space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0E6D8] pb-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#991B1E]">
                            {currentAccessory.categoryName} · {currentAccessory.type === 'traditional' ? 'Cổ Truyền' : currentAccessory.type === 'hybrid' ? 'Giao Thoa' : 'Đương Đại'}
                          </span>
                          <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                            {currentAccessory.name}
                          </h3>
                        </div>
                      </div>

                      {/* Cultural Meaning */}
                      <div className="space-y-1.5">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-[#C58B35]" />
                          <span>Ý Nghĩa Biểu Tượng & Lịch Sử</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#382F28] leading-relaxed">
                          {currentAccessory.culturalMeaning}
                        </p>
                      </div>

                      {/* Pairing Philosophy */}
                      <div className="space-y-1.5">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#991B1E]" />
                          <span>Triết Lý Phối Cùng Việt Phục</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#382F28] leading-relaxed">
                          {currentAccessory.pairingPhilosophy}
                        </p>
                      </div>

                      {/* Fun Fact if available */}
                      {currentAccessory.funFact && (
                        <div className="p-3 rounded-lg bg-[#FAF3E8] border border-[#E5D7BF] text-xs text-[#59442C]">
                          <strong>💡 Giai thoại thú vị:</strong> {currentAccessory.funFact}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CULTURAL SYNERGY / HARMONY */}
          {activeTab === 'synergy' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Synergy Header Score */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E8] to-[#F3ECE1] border border-[#DECDB8] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#991B1E]">
                      Hài Hòa Văn Hóa & Tôn Trọng Di Sản
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                      {insight.culturalSynergy.verdict}
                    </h3>
                  </div>

                  {/* Score badge */}
                  <div className="flex items-center gap-2 bg-[#991B1E] text-white px-4 py-2 rounded-xl shrink-0 self-start sm:self-auto shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider opacity-85">
                        Độ Chuẩn Văn Hóa
                      </div>
                      <div className="text-base font-bold font-serif">
                        {insight.culturalSynergy.harmonyScore}/10
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4A3B32]">
                  {insight.culturalSynergy.respectfulCheckSummary}
                </p>
              </div>

              {/* Gen Z Taste & Modern Recommendation */}
              <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E5DACB] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#991B1E] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#991B1E]" />
                  <span>Lời Khuyên Stylist Cho Thế Hệ Trẻ</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#382F28] leading-relaxed">
                  {insight.culturalSynergy.genZTasteNote}
                </p>
              </div>

              {/* Color & Style Harmony Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E5DACB] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: insight.color.hex }}
                    />
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#1C1917]">
                      Ý Nghĩa Sắc Màu: {insight.color.nameVi}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C4C40] leading-snug">
                    {insight.color.symbolism}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E5DACB] space-y-1.5">
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#1C1917]">
                    Phong Cách: {insight.style.nameVi}
                  </span>
                  <p className="text-xs text-[#5C4C40] leading-snug">
                    {insight.style.remixPhilosophy}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E5D7C3] bg-[#F7F1E7]/70 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-[#7A695B] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#991B1E]" />
            <span>Thông tin được tổng hợp từ tư liệu lịch sử và chuyên gia phục dựng cổ phục Việt.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#1C1917] hover:bg-[#382F28] text-white text-xs font-semibold transition-colors"
          >
            Đã hiểu kiến thức văn hóa
          </button>
        </div>
      </div>
    </div>
  );
};
