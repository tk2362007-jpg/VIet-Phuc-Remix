import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import {
  EXPLORE_VIET_PHUC_DATA,
  EXPLORE_GROUP_TABS,
  ExploreGroupCategory,
  ExploreVietPhucItem
} from '../data/exploreVietPhucData';
import { OutfitModal } from '../components/OutfitModal';
import { ExploreGarmentVisual } from '../components/ExploreGarmentVisual';

interface ExplorePageProps {
  onStartRemix: (outfitId: string) => void;
  initialSelectedOutfitId?: string | null;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  onStartRemix,
  initialSelectedOutfitId
}) => {
  const [activeGroup, setActiveGroup] = useState<ExploreGroupCategory>('all');
  const [activeItemFilter, setActiveItemFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCardIds, setExpandedCardIds] = useState<string[]>([]);
  const [inspectingOutfit, setInspectingOutfit] =
    useState<ExploreVietPhucItem | null>(() => {
      if (initialSelectedOutfitId) {
        return (
          EXPLORE_VIET_PHUC_DATA.find(
            (o) => o.id === initialSelectedOutfitId
          ) || null
        );
      }
      return null;
    });

  const toggleExpandCard = (id: string) => {
    setExpandedCardIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredOutfits = EXPLORE_VIET_PHUC_DATA.filter((item) => {
    const matchesGroup =
      activeGroup === 'all' || item.groupCategory === activeGroup;
    const matchesItem =
      activeItemFilter === 'all' || item.id === activeItemFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.vietnameseName.toLowerCase().includes(q) ||
      item.alternativeNames.toLowerCase().includes(q) ||
      item.era.toLowerCase().includes(q) ||
      item.collarStyle.toLowerCase().includes(q) ||
      item.sleeveStyle.toLowerCase().includes(q);

    return matchesGroup && matchesItem && matchesSearch;
  });

  const handleSelectQuickTag = (id: string) => {
    if (activeItemFilter === id) {
      setActiveItemFilter('all');
    } else {
      setActiveGroup('all');
      setActiveItemFilter(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold tracking-wider text-[#991B1E]">
          Kho Tàng Di Sản Y Phục & Cổ Phục Việt Nam
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917] text-balance">
          Explore Việt Phục
        </h1>
        <p className="text-sm sm:text-base text-[#5C4F45] leading-relaxed">
          Tra cứu hệ thống Việt phục và Việt cổ phục qua các thời kỳ lịch sử —
          từ cấu trúc cổ áo, tay áo, chất liệu dệt thủ công đến ý nghĩa văn hóa
          và bối cảnh sử dụng.
        </p>
      </div>

      {/* Interactive Filter & Search Console */}
      <div className="border-y border-[#E2D5C3] py-5 space-y-4">
        {/* Top Row: Segmented Category Tabs + Search Input */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2ECE0] rounded-xl w-fit">
            {EXPLORE_GROUP_TABS.map((tab) => {
              const isActive =
                activeGroup === tab.id && activeItemFilter === 'all';
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveGroup(tab.id);
                    setActiveItemFilter('all');
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#991B1E] text-white shadow-2xs'
                      : 'text-[#4A3D33] hover:text-[#1C1917] hover:bg-[#E7DEC9]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên áo, kiểu cổ, triều đại..."
              className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#FFFDF9] border border-[#DECBB3] text-xs sm:text-sm text-[#1C1917] placeholder:text-[#8C7A6B] focus:outline-none focus:border-[#991B1E]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7A6B] hover:text-[#1C1917] cursor-pointer"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Second Row: Direct Quick-Select Garment Filter */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => {
              setActiveItemFilter('all');
              setActiveGroup('all');
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeItemFilter === 'all' && activeGroup === 'all'
                ? 'bg-[#1C1917] text-[#FAF7F2]'
                : 'text-[#5C4F45] hover:text-[#1C1917] hover:bg-[#EFE7DA]'
            }`}
          >
            Tất cả ({EXPLORE_VIET_PHUC_DATA.length})
          </button>

          {EXPLORE_VIET_PHUC_DATA.map((item) => {
            const isSelected = activeItemFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectQuickTag(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#991B1E] text-white'
                    : 'text-[#5C4F45] hover:text-[#991B1E] hover:bg-[#EFE7DA]'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Consistent Editorial Card Grid */}
      {filteredOutfits.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="font-serif text-xl text-[#1C1917]">
            Không tìm thấy trang phục phù hợp với từ khóa "{searchQuery}"
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveGroup('all');
              setActiveItemFilter('all');
            }}
            className="px-4 py-2 rounded-lg bg-[#991B1E] text-white text-xs font-semibold cursor-pointer"
          >
            Xem lại toàn bộ danh mục
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {filteredOutfits.map((outfit, idx) => {
            const isExpanded = expandedCardIds.includes(outfit.id);

            return (
              <article
                key={outfit.id}
                id={`explore-card-${outfit.id}`}
                className="group rounded-2xl bg-[#FFFDF9] border border-[#E2D5C3] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Initial Uncluttered Card View */}
                <div className="flex flex-col sm:flex-row">
                  {/* Left Visual Plate / Lookbook Column */}
                  <div className="w-full sm:w-[42%] lg:w-[42%] shrink-0 relative min-h-[300px] sm:min-h-full">
                    <ExploreGarmentVisual
                      outfit={outfit}
                      index={idx}
                      onInspect={() => setInspectingOutfit(outfit)}
                    />
                  </div>

                  {/* Right Editorial Content Column */}
                  <div className="w-full sm:w-[58%] lg:w-[58%] p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Unboxed Metadata Line (Category · Era) */}
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#7A6B5F]">
                        <span className="font-semibold text-[#991B1E]">
                          {outfit.groupCategoryLabel}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="line-clamp-1">{outfit.era}</span>
                      </div>

                      {/* Primary Title & Alternative Names */}
                      <div>
                        <h2
                          onClick={() => setInspectingOutfit(outfit)}
                          className="font-serif text-2xl font-bold text-[#1C1917] group-hover:text-[#991B1E] transition-colors cursor-pointer"
                        >
                          {outfit.name}
                        </h2>
                        <p className="text-xs font-medium text-[#5C4F45] mt-0.5">
                          {outfit.vietnameseName}
                        </p>
                        <p className="text-xs text-[#8C7A6B] italic mt-0.5 line-clamp-1">
                          Tên gọi khác: {outfit.alternativeNames}
                        </p>
                      </div>

                      {/* Concise Description (Uncluttered 3-line clamp) */}
                      <p className="text-sm text-[#4A3E35] leading-relaxed line-clamp-3">
                        {outfit.description}
                      </p>

                      {/* Clean Hairline Structural Specs (No nested boxes) */}
                      <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#EAE0D0] text-xs">
                        <div>
                          <span className="font-semibold text-[#991B1E] block">
                            Kiểu cổ áo
                          </span>
                          <span className="text-[#382F28] line-clamp-2 mt-0.5 leading-snug">
                            {outfit.collarStyle}
                          </span>
                        </div>
                        <div className="border-l border-[#EAE0D0] pl-4">
                          <span className="font-semibold text-[#991B1E] block">
                            Kiểu tay áo
                          </span>
                          <span className="text-[#382F28] line-clamp-2 mt-0.5 leading-snug">
                            {outfit.sleeveStyle}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar: Expandable "Read more", Modal Pop-up & Remix */}
                    <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                      {/* Expandable Read More Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleExpandCard(outfit.id)}
                        aria-expanded={isExpanded}
                        className="inline-flex items-center gap-1 py-2 px-3 rounded-lg text-xs font-semibold text-[#4A3D33] hover:text-[#991B1E] hover:bg-[#F3ECE0] transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'Thu gọn' : 'Read more'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <div className="flex items-center gap-2 ml-auto">
                        {/* Open Full Archival Modal */}
                        <button
                          type="button"
                          onClick={() => setInspectingOutfit(outfit)}
                          className="py-2 px-3.5 rounded-lg text-xs font-semibold text-[#1C1917] bg-[#F2ECE0] hover:bg-[#E5DAC8] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#991B1E]" />
                          <span>Hồ sơ chi tiết</span>
                        </button>

                        {/* Remix CTA */}
                        <button
                          type="button"
                          onClick={() => onStartRemix(outfit.studioOutfitId)}
                          className="py-2 px-4 rounded-lg text-xs font-semibold text-white bg-[#991B1E] hover:bg-[#781316] transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
                        >
                          <span>Remix</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable "Read More" Drawer: Full Historical & Cultural Metadata */}
                {isExpanded && (
                  <div className="border-t border-[#E2D5C3] bg-[#FAF7F2]/80 px-6 py-6 space-y-5 text-xs sm:text-sm text-[#382F28] divide-y divide-[#E6DAC8]">
                    {/* Group 1: Historical Context & Wearers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-1">
                      <div>
                        <span className="text-xs font-semibold text-[#991B1E] block mb-1">
                          Bối cảnh lịch sử & Triều đại
                        </span>
                        <p className="text-xs leading-relaxed text-[#382F28]">
                          {outfit.context}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#991B1E] block mb-1">
                          Đối tượng sử dụng
                        </span>
                        <p className="text-xs leading-relaxed text-[#382F28]">
                          {outfit.wearers}
                        </p>
                      </div>
                    </div>

                    {/* Group 2: Silhouette, Materials, Colors & Motifs */}
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <span className="text-xs font-semibold text-[#4A3B32] block mb-1">
                          Phom dáng / Cấu trúc
                        </span>
                        <p className="text-xs leading-relaxed">
                          {outfit.silhouetteStructure}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#4A3B32] block mb-1">
                          Chất liệu thường gặp
                        </span>
                        <p className="text-xs leading-relaxed">
                          {outfit.commonMaterials}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#4A3B32] block mb-1">
                          Màu sắc & Hoa văn đặc trưng
                        </span>
                        <p className="text-xs leading-relaxed">
                          {outfit.colorsAndMotifs}
                        </p>
                      </div>
                    </div>

                    {/* Group 3: Design Features */}
                    <div className="pt-4">
                      <span className="text-xs font-semibold text-[#4A3B32] block mb-2">
                        Đặc điểm thiết kế nhận diện
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                        {outfit.features.map((feat, idxFeat) => (
                          <li key={idxFeat} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="text-[#991B1E] font-bold"
                            >
                              ·
                            </span>
                            <span className="leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Group 4: Occasions, Cultural Significance & Terminology Note */}
                    <div className="pt-4 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <span className="text-xs font-semibold text-[#2B4A6F] block mb-1">
                            Dịp sử dụng / Bối cảnh mặc
                          </span>
                          <p className="text-xs leading-relaxed">
                            {outfit.whenAppropriate}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-[#8A631E] block mb-1">
                            Ý nghĩa văn hóa
                          </span>
                          <p className="text-xs leading-relaxed">
                            {outfit.significance}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 text-xs text-[#4A3E35] leading-relaxed">
                        <strong className="text-[#991B1E]">
                          Ghi chú cách gọi & phạm vi sử dụng:
                        </strong>{' '}
                        {outfit.terminologyAndScopeNote}
                      </div>
                    </div>

                    {/* Bottom Drawer Bar */}
                    <div className="pt-3 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleExpandCard(outfit.id)}
                        className="text-xs font-semibold text-[#7A6B5F] hover:text-[#1C1917] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                        <span>Thu gọn</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setInspectingOutfit(outfit)}
                        className="text-xs font-semibold text-[#991B1E] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Mở chế độ đọc toàn màn hình</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* Detail Modal Pop-Up */}
      {inspectingOutfit && (
        <OutfitModal
          outfit={inspectingOutfit}
          onClose={() => setInspectingOutfit(null)}
          onRemix={(id) => onStartRemix(id)}
        />
      )}
    </div>
  );
};
