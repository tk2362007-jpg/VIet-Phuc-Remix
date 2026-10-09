import React, { useState, useMemo } from 'react';
import {
  Heart,
  Trash2,
  Share2,
  Sparkles,
  Calendar,
  ArrowRight,
  Check,
  Download,
  Search,
  Filter,
  X,
  SlidersHorizontal,
  RotateCcw,
  Shirt,
  Tag,
  ArrowUpDown
} from 'lucide-react';
import { SavedLook } from '../types';
import { CharacterDefaultAvatar } from '../components/CharacterDefaultAvatar';
import { SocialShareCardModal } from '../components/SocialShareCardModal';
import { ACCESSORIES_DATA } from '../data/accessories';
import { OCCASIONS_DATA } from '../data/occasions';
import { OUTFITS_DATA } from '../data/outfits';
import { STYLES_DATA } from '../data/styles';

interface LookbookPageProps {
  savedLooks: SavedLook[];
  onRemoveLook: (id: string) => void;
  onStartRemix: () => void;
}

export const LookbookPage: React.FC<LookbookPageProps> = ({
  savedLooks,
  onRemoveLook,
  onStartRemix
}) => {
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [selectedLookForShare, setSelectedLookForShare] = useState<SavedLook | null>(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [selectedOutfitType, setSelectedOutfitType] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');

  const handleShare = (look: SavedLook) => {
    setSelectedLookForShare(look);
  };

  // Derive available Occasion options from saved looks and OCCASIONS_DATA
  const availableOccasions = useMemo(() => {
    const map = new Map<string, string>();
    OCCASIONS_DATA.forEach((o) => map.set(o.id, o.nameVi));
    savedLooks.forEach((l) => {
      if (l.occasion && l.occasionName) {
        map.set(l.occasion, l.occasionName);
      }
    });
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [savedLooks]);

  // Derive available Outfit options from saved looks and OUTFITS_DATA
  const availableOutfitTypes = useMemo(() => {
    const map = new Map<string, string>();
    OUTFITS_DATA.forEach((o) => {
      const cleanName = o.vietnameseName.split('&')[0].trim();
      map.set(o.id, cleanName);
    });
    savedLooks.forEach((l) => {
      if (l.outfit && l.outfitName) {
        map.set(l.outfit, l.outfitName);
      }
    });
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [savedLooks]);

  // Derive available Style options from saved looks and STYLES_DATA
  const availableStyles = useMemo(() => {
    const map = new Map<string, string>();
    STYLES_DATA.forEach((s) => map.set(s.id, s.nameVi));
    savedLooks.forEach((l) => {
      if (l.style && l.styleName) {
        map.set(l.style, l.styleName);
      }
    });
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [savedLooks]);

  // Filter & Sort Logic
  const filteredLooks = useMemo(() => {
    return savedLooks
      .filter((look) => {
        // 1. Text Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = look.title?.toLowerCase().includes(q);
          const matchSubtitle = look.subtitle?.toLowerCase().includes(q);
          const matchOccasion = look.occasionName?.toLowerCase().includes(q);
          const matchOutfit = look.outfitName?.toLowerCase().includes(q);
          const matchStyle = look.styleName?.toLowerCase().includes(q);
          const matchColor = look.colorName?.toLowerCase().includes(q);
          const matchAcc = look.accessories?.some((a) => a.toLowerCase().includes(q));

          if (
            !matchTitle &&
            !matchSubtitle &&
            !matchOccasion &&
            !matchOutfit &&
            !matchStyle &&
            !matchColor &&
            !matchAcc
          ) {
            return false;
          }
        }

        // 2. Occasion Filter
        if (selectedOccasion !== 'all') {
          const occMatch =
            look.occasion === selectedOccasion ||
            look.occasionName?.toLowerCase() === selectedOccasion.toLowerCase();
          if (!occMatch) return false;
        }

        // 3. Outfit Type Filter
        if (selectedOutfitType !== 'all') {
          const outfitMatch =
            look.outfit === selectedOutfitType ||
            look.outfitName?.toLowerCase().includes(selectedOutfitType.toLowerCase()) ||
            selectedOutfitType.toLowerCase().includes(look.outfitName?.toLowerCase() || '');
          if (!outfitMatch) return false;
        }

        // 4. Style Filter
        if (selectedStyle !== 'all') {
          const styleMatch =
            look.style === selectedStyle ||
            look.styleName?.toLowerCase() === selectedStyle.toLowerCase();
          if (!styleMatch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'oldest') {
          return a.id.localeCompare(b.id);
        }
        if (sortBy === 'name') {
          return a.title.localeCompare(b.title, 'vi');
        }
        // Default 'newest': latest first
        return b.id.localeCompare(a.id);
      });
  }, [savedLooks, searchQuery, selectedOccasion, selectedOutfitType, selectedStyle, sortBy]);

  // Check if any filter is currently active
  const isFiltered = Boolean(
    searchQuery.trim() ||
    selectedOccasion !== 'all' ||
    selectedOutfitType !== 'all' ||
    selectedStyle !== 'all'
  );

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedOccasion('all');
    setSelectedOutfitType('all');
    setSelectedStyle('all');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5D7C3] pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#991B1E]">
            Bộ Sưu Tập Cá Nhân
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917]">
            MY LOOKBOOK
          </h1>
          <p className="text-sm sm:text-base text-[#66574C]">
            Your collection of Việt-inspired looks. Lưu giữ những bản phối Việt phục độc bản.
          </p>
        </div>

        {savedLooks.length > 0 && (
          <button
            onClick={onStartRemix}
            className="inline-flex items-center gap-2 bg-[#991B1E] hover:bg-[#781316] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tạo Thêm Look Mới</span>
          </button>
        )}
      </div>

      {/* Empty State when no saved looks at all */}
      {savedLooks.length === 0 ? (
        <div className="text-center py-20 px-4 bg-[#FFFDF9] rounded-3xl border border-[#E2D5C3] max-w-xl mx-auto space-y-6 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 opacity-75" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
              YOUR LOOKBOOK IS EMPTY
            </h3>
            <p className="text-sm text-[#66574C] max-w-md mx-auto leading-relaxed">
              Bạn chưa lưu outfit nào. Hãy vào Remix Studio để thỏa sức sáng tạo diện mạo Việt phục đầu tiên của mình!
            </p>
          </div>

          <div>
            <button
              id="empty-start-remix-btn"
              onClick={onStartRemix}
              className="inline-flex items-center gap-2 bg-[#991B1E] hover:bg-[#781316] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-md transition-transform hover:scale-103 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>START REMIXING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* SEARCH & FILTER BAR */}
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E2D5C3] p-4 sm:p-5 shadow-xs space-y-4">
            {/* Top row: Search input + Sorting + Count */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search Input Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8C7B6E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo dịp, loại trang phục, phong cách, màu sắc hoặc phụ kiện..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#DACBB7] bg-[#FAF7F2] text-sm text-[#1C1917] placeholder-[#8C7B6E] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#991B1E]/20 focus:border-[#991B1E] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7B6E] hover:text-[#1C1917] p-1 rounded-full cursor-pointer"
                    title="Xóa tìm kiếm"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Right side: Sort Selector & Results Count */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-[#66574C]">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#991B1E]" />
                  <span className="hidden sm:inline">Sắp xếp:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="py-1.5 px-2.5 rounded-lg border border-[#DACBB7] bg-white text-xs font-semibold text-[#1C1917] focus:outline-none focus:border-[#991B1E] cursor-pointer"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                    <option value="name">Tên A-Z</option>
                  </select>
                </div>

                <div className="text-xs font-semibold text-[#8C7B6E] bg-[#F2ECE0] px-3 py-1.5 rounded-lg border border-[#E2D5C3]">
                  Hiển thị <strong className="text-[#991B1E]">{filteredLooks.length}</strong> / {savedLooks.length}
                </div>
              </div>
            </div>

            {/* Bottom row: Filter Dropdowns */}
            <div className="pt-2 border-t border-[#EFE5D6] grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 1. Occasion Filter */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#7A6B5F] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#991B1E]" />
                  <span>Dịp Xuất Hiện</span>
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#991B1E]/20 cursor-pointer transition-colors ${
                    selectedOccasion !== 'all'
                      ? 'border-[#991B1E] text-[#991B1E] bg-[#FAF2F2]'
                      : 'border-[#DACBB7] text-[#3D312A]'
                  }`}
                >
                  <option value="all">Tất cả các dịp ({savedLooks.length})</option>
                  {availableOccasions.map((occ) => {
                    const count = savedLooks.filter(
                      (l) => l.occasion === occ.id || l.occasionName?.toLowerCase() === occ.id.toLowerCase()
                    ).length;
                    return (
                      <option key={occ.id} value={occ.id}>
                        {occ.label} {count > 0 ? `(${count})` : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* 2. Outfit Type Filter */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#7A6B5F] flex items-center gap-1.5">
                  <Shirt className="w-3 h-3 text-[#991B1E]" />
                  <span>Loại Trang Phục</span>
                </label>
                <select
                  value={selectedOutfitType}
                  onChange={(e) => setSelectedOutfitType(e.target.value)}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#991B1E]/20 cursor-pointer transition-colors ${
                    selectedOutfitType !== 'all'
                      ? 'border-[#991B1E] text-[#991B1E] bg-[#FAF2F2]'
                      : 'border-[#DACBB7] text-[#3D312A]'
                  }`}
                >
                  <option value="all">Tất cả trang phục ({savedLooks.length})</option>
                  {availableOutfitTypes.map((outfit) => {
                    const count = savedLooks.filter(
                      (l) => l.outfit === outfit.id || l.outfitName?.toLowerCase().includes(outfit.id.toLowerCase())
                    ).length;
                    return (
                      <option key={outfit.id} value={outfit.id}>
                        {outfit.label} {count > 0 ? `(${count})` : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* 3. Style Filter */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#7A6B5F] flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3 h-3 text-[#991B1E]" />
                  <span>Phong Cách</span>
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#991B1E]/20 cursor-pointer transition-colors ${
                    selectedStyle !== 'all'
                      ? 'border-[#991B1E] text-[#991B1E] bg-[#FAF2F2]'
                      : 'border-[#DACBB7] text-[#3D312A]'
                  }`}
                >
                  <option value="all">Tất cả phong cách ({savedLooks.length})</option>
                  {availableStyles.map((style) => {
                    const count = savedLooks.filter(
                      (l) => l.style === style.id || l.styleName?.toLowerCase() === style.id.toLowerCase()
                    ).length;
                    return (
                      <option key={style.id} value={style.id}>
                        {style.label} {count > 0 ? `(${count})` : ''}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Active Filter Chips & Reset Button */}
            {isFiltered && (
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#7A6B5F] font-semibold text-[11px] uppercase tracking-wider">
                  Đang lọc:
                </span>

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF0E1] text-[#7A4B15] border border-[#E5D2BA] text-xs font-medium">
                    <span>"{searchQuery}"</span>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="hover:text-red-700 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedOccasion !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#991B1E]/10 text-[#991B1E] border border-[#991B1E]/20 text-xs font-medium">
                    <span>
                      Dịp: {availableOccasions.find((o) => o.id === selectedOccasion)?.label || selectedOccasion}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedOccasion('all')}
                      className="hover:text-red-700 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedOutfitType !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#991B1E]/10 text-[#991B1E] border border-[#991B1E]/20 text-xs font-medium">
                    <span>
                      Trang phục: {availableOutfitTypes.find((o) => o.id === selectedOutfitType)?.label || selectedOutfitType}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedOutfitType('all')}
                      className="hover:text-red-700 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedStyle !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#991B1E]/10 text-[#991B1E] border border-[#991B1E]/20 text-xs font-medium">
                    <span>
                      Phong cách: {availableStyles.find((s) => s.id === selectedStyle)?.label || selectedStyle}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedStyle('all')}
                      className="hover:text-red-700 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#991B1E] hover:underline cursor-pointer ml-auto"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Xóa tất cả bộ lọc</span>
                </button>
              </div>
            )}
          </div>

          {/* Empty search results state */}
          {filteredLooks.length === 0 ? (
            <div className="text-center py-16 px-4 bg-[#FFFDF9] rounded-3xl border border-[#E2D5C3] max-w-lg mx-auto space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center mx-auto">
                <Search className="w-7 h-7 opacity-80" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                  Không tìm thấy trang phục phù hợp
                </h3>
                <p className="text-xs sm:text-sm text-[#66574C] leading-relaxed">
                  Không có bộ trang phục nào khớp với từ khóa tìm kiếm hoặc các tiêu chí bộ lọc đã chọn.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 bg-[#F2ECE0] hover:bg-[#EAE0D1] text-[#4A3E35] px-5 py-2.5 rounded-full text-xs font-bold transition-all border border-[#DACBB7] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#991B1E]" />
                  <span>Đặt lại bộ lọc</span>
                </button>
              </div>
            </div>
          ) : (
            /* Saved Outfits Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLooks.map((look) => {
                return (
                  <div
                    key={look.id}
                    id={`lookbook-card-${look.id}`}
                    className="group rounded-2xl bg-[#FFFDF9] border border-[#E2D5C3] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Image Header */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#F4ECE0] flex items-center justify-center">
                      <img
                        src={look.image}
                        alt={look.title}
                        className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#1C1917] text-xs font-semibold px-2 py-0.5 rounded-full shadow-xs">
                          <CharacterDefaultAvatar
                            gender={look.gender || 'female'}
                            skinTone={look.skinTone || 'neutral'}
                            hairstyle={look.hairstyle}
                            outfitId={look.outfit}
                            colorId={look.color}
                            accessories={look.accessories || []}
                            size="xs"
                          />
                          <span>{look.outfitName}</span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full">
                          <Calendar className="w-3 h-3 text-[#C8973E]" />
                          <span>{look.createdAt}</span>
                        </div>
                      </div>

                      {/* Bottom Image title */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-[10px] uppercase font-bold tracking-widest text-[#E5D2BA]">
                          {look.occasionName} × {look.styleName}
                        </div>
                        <h3 className="font-serif text-xl font-bold">
                          {look.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#7A6B5F]">Màu sắc chủ đạo:</span>
                          <div className="flex items-center gap-1.5 font-medium text-[#1C1917]">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                              style={{ backgroundColor: look.colorHex }}
                            />
                            <span>{look.colorName}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[#7A6B5F]">Phong cách:</span>
                          <span className="font-medium text-[#1C1917]">
                            {look.styleName}
                          </span>
                        </div>

                        <div className="pt-1">
                          <span className="text-[#7A6B5F] block mb-1">Phụ kiện:</span>
                          <div className="flex flex-wrap gap-1">
                            {look.accessories.length > 0 ? (
                              look.accessories.map((acc, i) => (
                                <span
                                  key={i}
                                  className="bg-[#F2ECE0] text-[#4A3B32] text-[10px] px-2 py-0.5 rounded"
                                >
                                  {acc}
                                </span>
                              ))
                            ) : (
                              <span className="text-[#8C7B6E] text-[11px] italic">
                                Tối giản không phụ kiện
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-[#EFE5D6] flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleShare(look)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#EFE6D8] border border-[#D8C7B2] text-xs font-semibold text-[#991B1E] transition-colors cursor-pointer"
                          title="Xuất thẻ ảnh & Chia sẻ outfit"
                        >
                          <Download className="w-3.5 h-3.5 text-[#C8973E]" />
                          <span>Xuất Thẻ Ảnh</span>
                        </button>

                        <button
                          onClick={() => onRemoveLook(look.id)}
                          className="p-2 rounded-full text-[#8C4E34] hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Xóa khỏi Lookbook"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Social Share Card Export Modal for Selected Lookbook Item */}
      {selectedLookForShare && (
        <SocialShareCardModal
          isOpen={Boolean(selectedLookForShare)}
          onClose={() => setSelectedLookForShare(null)}
          customTitle={selectedLookForShare.title}
          lookState={{
            gender: selectedLookForShare.gender || 'female',
            skinTone: selectedLookForShare.skinTone || 'neutral',
            hairstyle: selectedLookForShare.hairstyle,
            outfit: selectedLookForShare.outfit,
            color: selectedLookForShare.color,
            occasion: selectedLookForShare.occasion,
            style: selectedLookForShare.style,
            accessories: selectedLookForShare.accessories.map((accName) => {
              const found = ACCESSORIES_DATA.find(
                (a) => a.name.toLowerCase() === accName.toLowerCase() || a.id === accName
              );
              return found ? found.id : accName;
            })
          }}
        />
      )}
    </div>
  );
};
