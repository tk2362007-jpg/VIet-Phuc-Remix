import React, { useState } from 'react';
import { Sparkles, Eye, Layers, ShieldCheck } from 'lucide-react';
import { OutfitLookState, OutfitId, HairstyleId } from '../types';
import { OUTFITS_DATA } from '../data/outfits';
import { OCCASIONS_DATA } from '../data/occasions';
import { STYLES_DATA } from '../data/styles';
import { COLORS_DATA } from '../data/colors';
import { ACCESSORIES_DATA } from '../data/accessories';
import { Stylized3DCharacter } from './Stylized3DCharacter';

interface OutfitPreviewProps {
  lookState: OutfitLookState;
  showDetails?: boolean;
  className?: string;
  onQuickSelectOutfit?: (id: OutfitId) => void;
  onOpenInsight?: () => void;
}

type BackdropType = 'studio' | 'heritage' | 'hoian' | 'exhibition';

export const OutfitPreview: React.FC<OutfitPreviewProps> = ({
  lookState,
  showDetails = true,
  className = '',
  onOpenInsight
}) => {
  const [viewMode, setViewMode] = useState<'photo' | 'interactive'>('photo');
  const [backdrop, setBackdrop] = useState<BackdropType>('studio');

  const selectedOutfit = OUTFITS_DATA.find((o) => o.id === lookState.outfit);
  const selectedOccasion = OCCASIONS_DATA.find((o) => o.id === lookState.occasion);
  const selectedStyle = STYLES_DATA.find((s) => s.id === lookState.style);
  const selectedColor = COLORS_DATA.find((c) => c.id === lookState.color);

  const activeAccessories = ACCESSORIES_DATA.filter((a) =>
    lookState.accessories.includes(a.id)
  );

  // Background configurations
  const backdrops = {
    studio: {
      name: 'Studio Ivory',
      bgClass: 'bg-gradient-to-b from-[#FAF7F2] via-[#F3EDE2] to-[#EAE0D0]',
      pattern: 'radial-gradient(#C58B35 0.75px, transparent 0.75px)'
    },
    heritage: {
      name: 'Cung Đình / Cố Đô',
      bgClass: 'bg-gradient-to-b from-[#4A1E22]/15 via-[#FAF7F2] to-[#D8C7B5]',
      pattern: 'radial-gradient(#991B1E 0.75px, transparent 0.75px)'
    },
    hoian: {
      name: 'Phố Cổ Hoài Niệm',
      bgClass: 'bg-gradient-to-b from-[#C8973E]/20 via-[#FAF7F2] to-[#DFCBB5]',
      pattern: 'radial-gradient(#C8973E 0.75px, transparent 0.75px)'
    },
    exhibition: {
      name: 'Art Gallery Đương Đại',
      bgClass: 'bg-gradient-to-b from-[#2B3540]/15 via-[#FAF7F2] to-[#E5DDD0]',
      pattern: 'radial-gradient(#2B3540 0.75px, transparent 0.75px)'
    }
  };

  const currentBg = backdrops[backdrop];

  return (
    <div
      id="outfit-preview-container"
      className={`relative flex flex-col rounded-2xl border border-[#E2D5C3] overflow-hidden bg-[#FAF7F2] shadow-sm ${className}`}
    >
      {/* Studio Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E6D9C8] bg-[#F7F1E7]/70 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#991B1E] animate-pulse" />
          <span className="font-semibold text-[#4A3B32] uppercase tracking-wider">
            Live Preview Studio
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-[#E8DDD0] p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setViewMode('photo')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 font-medium ${
              viewMode === 'photo'
                ? 'bg-white text-[#991B1E] shadow-sm'
                : 'text-[#6B5D52] hover:text-[#1C1917]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Look Editorial</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('interactive')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 font-medium ${
              viewMode === 'interactive'
                ? 'bg-white text-[#991B1E] shadow-sm'
                : 'text-[#6B5D52] hover:text-[#1C1917]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Layered Model</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        className={`relative w-full aspect-[3/4] flex items-center justify-center p-4 sm:p-6 overflow-hidden transition-colors duration-500 ${currentBg.bgClass}`}
        style={{
          backgroundImage: currentBg.pattern,
          backgroundSize: '24px 24px'
        }}
      >
        {/* Ambient Color Glow based on selected garment color */}
        {selectedColor && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-700 blur-3xl"
            style={{ backgroundColor: selectedColor.hex }}
          />
        )}

        {/* VIEW 1: Editorial Photo Preview Mode */}
        {viewMode === 'photo' && selectedOutfit && (
          <div className="relative w-full h-full max-w-sm mx-auto flex items-center justify-center transition-all duration-500 ease-out">
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/60 bg-[#F4ECE0] flex items-center justify-center group">
              <img
                src={selectedOutfit.image}
                alt={selectedOutfit.name}
                className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Color filter tint layer matching user's selected palette */}
              {selectedColor && (
                <div
                  className="absolute inset-0 mix-blend-color opacity-20 pointer-events-none transition-all duration-500"
                  style={{ backgroundColor: selectedColor.hex }}
                />
              )}

              {/* Gradient overlay for badges readability */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

              {/* Bottom outfit badges */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                  <span className="bg-[#991B1E] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedOutfit.name}
                  </span>
                  {selectedStyle && (
                    <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                      {selectedStyle.nameVi}
                    </span>
                  )}
                  {selectedOccasion && (
                    <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                      {selectedOccasion.name}
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-200 line-clamp-1 font-serif italic">
                  "{selectedOutfit.subtitle}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Layered Virtual Styling 3D Model Mode */}
        {viewMode === 'interactive' && (
          <div className="relative w-full h-full max-w-sm mx-auto flex flex-col items-center justify-center py-2 transition-all duration-500">
            <Stylized3DCharacter
              gender={lookState.gender || 'female'}
              skinTone={lookState.skinTone || 'neutral'}
              hairstyle={(lookState.hairstyle || 'long') as HairstyleId}
              outfitId={(lookState.outfit || 'ao-dai') as OutfitId}
              colorId={lookState.color || 'cream'}
              accessories={lookState.accessories || []}
              fitContainer
            />
          </div>
        )}

        {/* Fallback empty guide */}
        {!selectedOutfit && (
          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-xl border border-[#DECDB8] max-w-xs shadow-sm">
            <Sparkles className="w-8 h-8 text-[#991B1E] mx-auto mb-2 opacity-80" />
            <h4 className="font-serif font-bold text-[#1C1917] text-base">
              Bắt đầu phối đồ
            </h4>
            <p className="text-xs text-[#6B5D52] mt-1">
              Hãy chọn Dịp, Việt phục và Phong cách ở bảng bên phải để ngắm nhìn bản phối thời trang.
            </p>
          </div>
        )}

        {/* Floating Backdrop Switcher */}
        <div className="absolute top-4 left-4 z-40 bg-white/85 backdrop-blur-md rounded-lg p-1 shadow-sm border border-[#E0D2C0] flex items-center gap-1 text-[11px]">
          {(['studio', 'heritage', 'hoian', 'exhibition'] as BackdropType[]).map((bKey) => (
            <button
              key={bKey}
              type="button"
              onClick={() => setBackdrop(bKey)}
              className={`px-2 py-0.5 rounded transition-colors ${
                backdrop === bKey
                  ? 'bg-[#991B1E] text-white font-medium'
                  : 'text-[#5C4E43] hover:bg-[#F2ECE0]'
              }`}
            >
              {backdrops[bKey].name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Active Accessories Overlay Chips */}
        {activeAccessories.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3 z-30 flex flex-wrap gap-1.5 justify-center pointer-events-none">
            {activeAccessories.slice(0, 3).map((acc) => (
              <span
                key={acc.id}
                className="bg-white/90 backdrop-blur-md text-[#3A2E24] text-[10px] font-medium px-2 py-0.5 rounded-full shadow-xs border border-white/60"
              >
                + {acc.name}
              </span>
            ))}
            {activeAccessories.length > 3 && (
              <span className="bg-white/90 backdrop-blur-md text-[#3A2E24] text-[10px] font-medium px-2 py-0.5 rounded-full shadow-xs border border-white/60">
                +{activeAccessories.length - 3} nữa
              </span>
            )}
          </div>
        )}
      </div>

      {/* Summary Footer Pill info */}
      {showDetails && selectedOutfit && (
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E5D8C6] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                style={{ backgroundColor: selectedColor ? selectedColor.hex : '#991B1E' }}
              />
              <span className="font-serif font-bold text-sm text-[#1C1917]">
                {selectedOutfit.name}
              </span>
              <span className="text-xs text-[#7A6B5F]">
                • {selectedStyle?.nameVi || 'Hiện đại'}
              </span>
            </div>

            {onOpenInsight ? (
              <button
                type="button"
                onClick={onOpenInsight}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#991B1E] bg-[#991B1E]/10 hover:bg-[#991B1E]/20 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
                title="Mở xem Cultural Insight"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Cultural Insight</span>
              </button>
            ) : (
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#991B1E] bg-[#991B1E]/10 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Chuẩn Tinh Thần</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
