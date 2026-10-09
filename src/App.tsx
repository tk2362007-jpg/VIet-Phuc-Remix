import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OutfitLookState, SavedLook, OutfitId, OccasionId, StyleId, ColorId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { PreparationPage, PreparationSessionData } from './pages/PreparationPage';
import { RemixStudioPage, DEFAULT_FEMALE_LOOK, DEFAULT_MALE_LOOK } from './pages/RemixStudioPage';
import { ResultPage } from './pages/ResultPage';
import { LookbookPage } from './pages/LookbookPage';
import { evaluateCultureCheck } from './data/cultureNotes';
import { OUTFITS_DATA } from './data/outfits';
import { WeatherInfo, TimeOfDayId } from './services/weatherService';

// Initial starter look for instant interactivity: Mặc định Nữ mặc áo dài trắng chưa phối đồ
const INITIAL_LOOK: OutfitLookState = {
  gender: 'female',
  skinTone: 'neutral',
  hairstyle: 'long',
  occasion: 'festival',
  outfit: 'ao-dai',
  style: 'traditional',
  color: 'cream',
  accessories: []
};

const STORAGE_KEY = 'viet_phuc_remix_saved_looks';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentLook, setCurrentLook] = useState<OutfitLookState>(INITIAL_LOOK);
  const [savedLooks, setSavedLooks] = useState<SavedLook[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore storage load errors
    }

    // Default curated starter looks for initial demo experience
    const starterCheckA = evaluateCultureCheck({
      outfitId: 'ao-dai',
      occasionId: 'festival',
      styleId: 'modern',
      colorId: 'burgundy',
      accessoryIds: ['khan-dong', 'chuoi-ngoc-trai']
    });

    const starterCheckB = evaluateCultureCheck({
      outfitId: 'ao-ngu-than',
      occasionId: 'photoshoot',
      styleId: 'minimal',
      colorId: 'cream',
      accessoryIds: ['vong-kieng-bac', 'sandal-day-manh']
    });

    return [
      {
        id: 'look-seed-1',
        createdAt: '15 Thg 9, 2026',
        title: 'MODERN ÁO DÀI',
        subtitle: 'Festival × Modern',
        occasion: 'festival' as OccasionId,
        occasionName: 'Lễ hội & Tết cổ truyền',
        outfit: 'ao-dai' as OutfitId,
        outfitName: 'Áo dài',
        style: 'modern' as StyleId,
        styleName: 'Cách Tân Hiện Đại',
        color: 'burgundy' as ColorId,
        colorName: 'Đỏ Rượu Quý Phái',
        colorHex: '#5E1B24',
        accessories: ['Khăn đóng lụa', 'Chuỗi vòng ngọc trai thanh lịch'],
        cultureCheck: starterCheckA,
        image: OUTFITS_DATA[0].image
      },
      {
        id: 'look-seed-2',
        createdAt: '16 Thg 9, 2026',
        title: 'MINIMAL ÁO NGŨ THÂN',
        subtitle: 'Photoshoot × Minimal',
        occasion: 'photoshoot' as OccasionId,
        occasionName: 'Chụp ảnh & Lookbook',
        outfit: 'ao-ngu-than' as OutfitId,
        outfitName: 'Áo ngũ thân',
        style: 'minimal' as StyleId,
        styleName: 'Tối Giản Tinh Tế',
        color: 'cream' as ColorId,
        colorName: 'Kem Ngà / Lụa Mộc',
        colorHex: '#F5EFE6',
        accessories: ['Vòng kiềng bạc nguyên khối', 'Sandal quai mảnh thanh thoát'],
        cultureCheck: starterCheckB,
        image: OUTFITS_DATA[2].image
      }
    ];
  });

  const [exploreTargetOutfit, setExploreTargetOutfit] = useState<string | null>(null);
  const [preparationContext, setPreparationContext] = useState<{
    dateString?: string;
    locationName?: string;
    weather?: WeatherInfo;
    timeOfDay?: TimeOfDayId;
  } | null>(null);

  // Lưu trữ dữ liệu phiên chọn ngày & dịp để không bị mất khi chuyển qua lại giữa các màn hình
  const [preparationSessionData, setPreparationSessionData] = useState<PreparationSessionData>(() => {
    const today = new Date();
    return {
      gender: 'female',
      dateMode: 'today',
      customDate: today.toISOString().split('T')[0],
      locationId: 'hanoi',
      timeOfDay: 'morning',
      occasion: 'festival',
      currentStep: 1,
      weather: null
    };
  });

  // Sync saved looks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLooks));
    } catch {
      // Ignore storage persistence errors
    }
  }, [savedLooks]);

  // Navigation helper:
  // Khi người dùng bấm Remix Studio (từ Navbar, Footer hoặc các nút bắt đầu phối đồ),
  // màn hình đầu tiên LUÔN LUÔN là màn hình chọn ngày và dịp (prepare)!
  const handleNavigate = (page: string) => {
    if (page === 'studio') {
      setCurrentPage('prepare');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start Preparation Flow (Bước 1: Ngày & Thời tiết, Bước 2: Chọn Dịp)
  const handleQuickStartRemix = (outfitId?: string) => {
    if (outfitId && outfitId !== 'ao-dai') {
      setCurrentLook((prev) => ({
        ...prev,
        outfit: outfitId as OutfitId,
        accessories: []
      }));
    } else {
      // Mặc định phiên Remix mới: Áo Dài trắng
      setCurrentLook((prev) => ({
        ...prev,
        outfit: 'ao-dai',
        color: 'cream',
        accessories: []
      }));
    }
    handleNavigate('prepare');
  };

  // Khi hệ thống tạo xong 1 outfit gợi ý: áp dụng trực tiếp làm initial state và mở Remix Studio NGAY LẬP TỨC
  const handleApplySuggestedLook = (
    suggestedLook: OutfitLookState,
    contextInfo: {
      dateString: string;
      locationName: string;
      weather?: WeatherInfo | null;
      timeOfDay: TimeOfDayId;
    }
  ) => {
    // Cập nhật state look gợi ý mới
    setCurrentLook(suggestedLook);

    // Lưu thông tin bối cảnh thời tiết & ngày
    const newContext = {
      dateString: contextInfo.dateString,
      locationName: contextInfo.locationName,
      weather: contextInfo.weather || undefined,
      timeOfDay: contextInfo.timeOfDay
    };
    setPreparationContext(newContext);
    setPreparationSessionData((prev) => ({
      ...prev,
      dateString: contextInfo.dateString,
      locationName: contextInfo.locationName,
      weather: contextInfo.weather || null,
      timeOfDay: contextInfo.timeOfDay
    }));

    // Chuyển thẳng sang Remix Studio trong đúng 1 lần click, không phụ thuộc render tiếp theo
    setCurrentPage('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Nút "Tự phối đồ": Bỏ qua bước tạo outfit gợi ý, mở trực tiếp Remix Studio với outfit hiện tại/default theo giới tính
  const handleSelfRemix = (
    gender?: 'female' | 'male',
    contextInfo?: {
      dateString?: string;
      locationName?: string;
      weather?: WeatherInfo | null;
      timeOfDay?: TimeOfDayId;
    }
  ) => {
    const targetGender = gender || currentLook.gender || 'female';
    const nextLook: OutfitLookState = targetGender === 'male'
      ? {
          ...DEFAULT_MALE_LOOK,
          ...(currentLook.gender === 'male' ? currentLook : {}),
          gender: 'male'
        }
      : {
          ...DEFAULT_FEMALE_LOOK,
          ...(currentLook.gender === 'female' ? currentLook : {}),
          gender: 'female'
        };

    setCurrentLook(nextLook);

    if (contextInfo) {
      setPreparationContext({
        dateString: contextInfo.dateString,
        locationName: contextInfo.locationName,
        weather: contextInfo.weather || undefined,
        timeOfDay: contextInfo.timeOfDay
      });
      setPreparationSessionData((prev) => ({
        ...prev,
        gender: targetGender,
        dateString: contextInfo.dateString,
        locationName: contextInfo.locationName,
        weather: contextInfo.weather || null,
        timeOfDay: contextInfo.timeOfDay || prev.timeOfDay
      }));
    }

    // Chuyển ngay lập tức sang Remix Studio chỉ với 1 click
    setCurrentPage('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Outfit to explore details in Explore page
  const handleSelectOutfitToExplore = (outfitId: string) => {
    setExploreTargetOutfit(outfitId);
    handleNavigate('explore');
  };

  // Create look from Studio -> Result
  const handleCreateLook = () => {
    handleNavigate('result');
  };

  // Save look handler
  const handleSaveLook = (newLook: SavedLook) => {
    setSavedLooks((prev) => {
      // Check if already exists
      const existingIndex = prev.findIndex(
        (l) =>
          l.outfit === newLook.outfit &&
          l.occasion === newLook.occasion &&
          l.style === newLook.style &&
          l.color === newLook.color
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newLook;
        return updated;
      }
      return [newLook, ...prev];
    });
  };

  // Remove look handler
  const handleRemoveLook = (id: string) => {
    setSavedLooks((prev) => prev.filter((look) => look.id !== id));
  };

  const isCurrentLookSaved = savedLooks.some(
    (l) =>
      l.outfit === currentLook.outfit &&
      l.occasion === currentLook.occasion &&
      l.style === currentLook.style &&
      l.color === currentLook.color
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917] selection:bg-[#991B1E] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        savedLooksCount={savedLooks.length}
      />

      {/* Main App Content Viewport with Smooth Page Fade Animation */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
          >
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onSelectOutfitToExplore={handleSelectOutfitToExplore}
                onQuickStartRemix={handleQuickStartRemix}
              />
            )}

            {currentPage === 'explore' && (
              <ExplorePage
                onStartRemix={handleQuickStartRemix}
                initialSelectedOutfitId={exploreTargetOutfit}
              />
            )}

            {currentPage === 'prepare' && (
              <PreparationPage
                initialGender={currentLook.gender || 'female'}
                initialOccasion={(currentLook.occasion as OccasionId) || 'festival'}
                sessionData={preparationSessionData}
                onUpdateSessionData={(data) =>
                  setPreparationSessionData((prev) => ({ ...prev, ...data }))
                }
                onApplySuggestedLook={handleApplySuggestedLook}
                onSelfRemix={handleSelfRemix}
                onBackToHome={() => handleNavigate('home')}
              />
            )}

            {currentPage === 'studio' && (
              <RemixStudioPage
                currentLook={currentLook}
                onChangeLook={setCurrentLook}
                onCreateLook={handleCreateLook}
                onSaveLook={handleSaveLook}
                isAlreadySaved={isCurrentLookSaved}
                preparationContext={preparationContext}
                onReopenPreparation={() => {
                  setCurrentPage('prepare');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentPage === 'result' && (
              <ResultPage
                currentLook={currentLook}
                onRemixAgain={() => {
                  setCurrentPage('studio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSaveLook={handleSaveLook}
                onNavigateToLookbook={() => handleNavigate('lookbook')}
                isAlreadySaved={isCurrentLookSaved}
              />
            )}

            {currentPage === 'lookbook' && (
              <LookbookPage
                savedLooks={savedLooks}
                onRemoveLook={handleRemoveLook}
                onStartRemix={() => handleQuickStartRemix()}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
