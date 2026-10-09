import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Info, Sparkles, BookOpen, ChevronRight, X } from 'lucide-react';

interface CulturalInlinePopoverProps {
  title: string;
  badge?: string;
  content: string;
  eraOrNote?: string;
  pairingTip?: string;
  onExploreMore?: () => void;
  iconType?: 'info' | 'help' | 'book';
  buttonClassName?: string;
  align?: 'left' | 'right' | 'center';
}

export const CulturalInlinePopover: React.FC<CulturalInlinePopoverProps> = ({
  title,
  badge,
  content,
  eraOrNote,
  pairingTip,
  onExploreMore,
  iconType = 'help',
  buttonClassName = '',
  align = 'center'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const alignmentClasses = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
    center: 'left-1/2 -translate-x-1/2 origin-top'
  }[align];

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label={`Góc nhìn văn hóa: ${title}`}
        className={`p-1 rounded-full text-[#7A695B] hover:text-[#991B1E] hover:bg-[#F2ECE0] transition-colors cursor-pointer ${buttonClassName}`}
        title={`Xem ý nghĩa văn hóa: ${title}`}
      >
        {iconType === 'info' && <Info className="w-3.5 h-3.5" />}
        {iconType === 'help' && <HelpCircle className="w-3.5 h-3.5" />}
        {iconType === 'book' && <BookOpen className="w-3.5 h-3.5" />}
      </button>

      {isOpen && (
        <div
          role="tooltip"
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-full mt-1.5 z-40 w-72 sm:w-80 p-4 bg-[#FAF7F2] rounded-xl shadow-xl border border-[#D8C7B4] text-[#1C1917] text-left animate-in fade-in zoom-in-95 duration-150 ${alignmentClasses}`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-[#E8DCCB]">
            <div>
              {badge && (
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#991B1E] block mb-0.5">
                  {badge}
                </span>
              )}
              <h5 className="font-serif font-bold text-sm text-[#1C1917] leading-tight">
                {title}
              </h5>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-5 h-5 rounded-full text-[#7A695B] hover:text-[#991B1E] hover:bg-[#EAE0D2] flex items-center justify-center transition-colors shrink-0"
              aria-label="Đóng"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-2 text-xs text-[#4A3B32]">
            {eraOrNote && (
              <div className="text-[11px] font-medium text-[#7A6757] italic">
                Thời kỳ / Nguồn gốc: {eraOrNote}
              </div>
            )}
            <p className="leading-relaxed">{content}</p>

            {pairingTip && (
              <div className="p-2 rounded-lg bg-[#FAF3E8] border border-[#EADBCC] text-[11px] text-[#59442C]">
                <strong>💡 Lưu ý văn hóa:</strong> {pairingTip}
              </div>
            )}
          </div>

          {/* Action to open full modal if callback provided */}
          {onExploreMore && (
            <div className="mt-3 pt-2 border-t border-[#E8DCCB] flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onExploreMore();
                }}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#991B1E] hover:text-[#781316] transition-colors"
              >
                <span>Xem chi tiết chuyên sâu</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
