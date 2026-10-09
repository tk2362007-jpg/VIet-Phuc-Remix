import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  MapPin,
  CloudSun,
  Sun,
  Moon,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  Wind,
  Droplets,
  ThermometerSnowflake,
  ThermometerSun,
  Thermometer,
  Cloud,
  Sunrise,
  Sunset,
  Umbrella,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  GraduationCap,
  HeartHandshake,
  Camera,
  Coffee,
  Landmark,
  Briefcase,
  Plane,
  Sparkle,
  Sliders,
  User,
  Flower2,
  Loader2,
  AlertCircle,
  RefreshCw,
  CloudOff
} from 'lucide-react';
import { OccasionId, OutfitLookState, ColorId, StyleId } from '../types';
import { OCCASIONS_DATA } from '../data/occasions';
import { OUTFITS_DATA } from '../data/outfits';
import {
  VIETNAM_LOCATIONS,
  TIME_OF_DAY_OPTIONS,
  TimeOfDayId,
  formatVietnameseDate,
  fetchRealWeatherForecast,
  getWeatherForecast,
  WeatherInfo
} from '../services/weatherService';
import {
  generatePersonalizedInitialLook,
  selectDefaultGarmentAndAccessoriesByWeather
} from '../services/aiSuggestion';

export interface PreparationSessionData {
  gender: 'female' | 'male';
  dateMode: 'today' | 'tomorrow' | 'weekend' | 'custom';
  customDate: string;
  locationId: string;
  timeOfDay: TimeOfDayId;
  occasion: OccasionId;
  currentStep?: 1 | 2;
  dateString?: string;
  locationName?: string;
  weather?: WeatherInfo | null;
}

interface PreparationPageProps {
  initialGender?: 'female' | 'male';
  initialOccasion?: OccasionId;
  sessionData?: PreparationSessionData;
  onUpdateSessionData?: (data: Partial<PreparationSessionData>) => void;
  onApplySuggestedLook: (suggestedLook: OutfitLookState, contextInfo: {
    dateString: string;
    locationName: string;
    weather?: WeatherInfo | null;
    timeOfDay: TimeOfDayId;
  }) => void;
  onSelfRemix: (
    gender?: 'female' | 'male',
    contextInfo?: {
      dateString?: string;
      locationName?: string;
      weather?: WeatherInfo | null;
      timeOfDay?: TimeOfDayId;
    }
  ) => void;
  onBackToHome: () => void;
}

/**
 * Dynamic, multi-layered visual weather icon badge that responds to API weather,
 * time of day (morning, afternoon, evening), temperature, and precipitation.
 */
export interface DynamicWeatherVisualProps {
  conditionCode: WeatherInfo['conditionCode'];
  condition?: string;
  temp: number;
  timeOfDay?: TimeOfDayId;
  rainProbability?: number;
  size?: 'sm' | 'md' | 'lg';
  showAtmosphereTag?: boolean;
}

export const DynamicWeatherVisual: React.FC<DynamicWeatherVisualProps> = ({
  conditionCode,
  condition,
  temp,
  timeOfDay = 'morning',
  rainProbability = 20,
  size = 'md',
  showAtmosphereTag = false
}) => {
  const isEvening = timeOfDay === 'evening';
  const isAfternoon = timeOfDay === 'afternoon';

  // Determine specific atmospheric theme and multi-layered iconography
  const visualConfig = useMemo(() => {
    if (isEvening) {
      if (conditionCode === 'rainy' || rainProbability >= 65) {
        return {
          gradient: 'from-slate-900 via-indigo-950 to-blue-900',
          border: 'border-indigo-400/35',
          glow: 'shadow-indigo-950/40',
          accentColor: 'text-indigo-200',
          tagBg: 'bg-indigo-950/90 text-indigo-200 border-indigo-400/30',
          atmosphereTitle: 'Mưa Đêm Huyền Ảo',
          atmosphereDesc: 'Khí trời ẩm mát, phố đêm lung linh ánh đèn',
          renderMainIcon: (iconClass: string) => (
            <div className="relative flex items-center justify-center">
              <CloudRain className={`${iconClass} text-sky-200 animate-pulse`} />
              <Moon className="w-4 h-4 text-amber-200 absolute -top-1.5 -right-1.5 drop-shadow-[0_0_6px_rgba(253,230,138,0.9)]" />
              <Droplets className="w-3.5 h-3.5 text-blue-200 absolute -bottom-1 -left-1 animate-bounce" />
            </div>
          )
        };
      }
      if (conditionCode === 'cool' || temp <= 20) {
        return {
          gradient: 'from-slate-950 via-indigo-900 to-slate-900',
          border: 'border-cyan-400/35',
          glow: 'shadow-indigo-900/40',
          accentColor: 'text-cyan-200',
          tagBg: 'bg-cyan-950/90 text-cyan-200 border-cyan-400/30',
          atmosphereTitle: 'Đêm Lạnh Trăng Thanh',
          atmosphereDesc: 'Trời se lạnh, không khí trang nghiêm thanh tịnh',
          renderMainIcon: (iconClass: string) => (
            <div className="relative flex items-center justify-center">
              <Moon className={`${iconClass} text-amber-200 drop-shadow-[0_0_8px_rgba(253,230,138,0.8)]`} />
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 absolute -top-1 -right-1 animate-pulse" />
              <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-300 absolute -bottom-1 -left-1" />
            </div>
          )
        };
      }
      if (conditionCode === 'breeze') {
        return {
          gradient: 'from-slate-900 via-teal-950 to-indigo-900',
          border: 'border-teal-400/35',
          glow: 'shadow-teal-950/40',
          accentColor: 'text-teal-200',
          tagBg: 'bg-teal-950/90 text-teal-200 border-teal-400/30',
          atmosphereTitle: 'Dạ Hội Gió Mát',
          atmosphereDesc: 'Gió đêm lộng mát, lý tưởng dạo hội hoa đăng',
          renderMainIcon: (iconClass: string) => (
            <div className="relative flex items-center justify-center">
              <Moon className={`${iconClass} text-amber-200 drop-shadow-[0_0_7px_rgba(253,230,138,0.7)]`} />
              <Wind className="w-4 h-4 text-teal-300 absolute -bottom-1 -right-1 animate-pulse" />
              <Sparkles className="w-3 h-3 text-amber-200 absolute -top-1 -left-1" />
            </div>
          )
        };
      }
      // Clear starry evening
      return {
        gradient: 'from-indigo-950 via-slate-900 to-indigo-900',
        border: 'border-amber-300/35',
        glow: 'shadow-indigo-950/50',
        accentColor: 'text-amber-200',
        tagBg: 'bg-indigo-950/90 text-amber-200 border-amber-300/30',
        atmosphereTitle: 'Đêm Thanh Rực Rỡ',
        atmosphereDesc: 'Trời trong quang đãng, trăng sao vằng vặc',
        renderMainIcon: (iconClass: string) => (
          <div className="relative flex items-center justify-center">
            <Moon className={`${iconClass} text-amber-200 drop-shadow-[0_0_10px_rgba(253,230,138,0.9)]`} />
            <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1.5 -right-1.5 animate-pulse" />
            <Sparkles className="w-3 h-3 text-sky-200 absolute -bottom-1 -left-1" />
          </div>
        )
      };
    }

    // Daytime / Afternoon
    switch (conditionCode) {
      case 'rainy':
        return {
          gradient: 'from-sky-600 via-blue-600 to-slate-700',
          border: 'border-sky-300/50',
          glow: 'shadow-blue-500/30',
          accentColor: 'text-sky-100',
          tagBg: 'bg-blue-900/70 text-sky-200 border-blue-400/30',
          atmosphereTitle: 'Mưa Rào Mát Lành',
          atmosphereDesc: `Mưa rơi nhẹ (${rainProbability}%), khuyên mang nón che & tà gọn`,
          renderMainIcon: (iconClass: string) => (
            <div className="relative flex items-center justify-center">
              <CloudRain className={`${iconClass} text-white animate-pulse`} />
              <Droplets className="w-4 h-4 text-cyan-200 absolute -bottom-1 -right-1 animate-bounce" />
              <Umbrella className="w-3.5 h-3.5 text-amber-200 absolute -top-1 -left-1.5 opacity-90" />
            </div>
          )
        };

      case 'cool':
        return {
          gradient: 'from-cyan-600 via-sky-600 to-indigo-600',
          border: 'border-cyan-300/50',
          glow: 'shadow-cyan-500/30',
          accentColor: 'text-cyan-100',
          tagBg: 'bg-cyan-900/70 text-cyan-200 border-cyan-400/30',
          atmosphereTitle: 'Se Lạnh Thanh Lịch',
          atmosphereDesc: 'Nhiệt độ dịu mát, lý tưởng mặc áo Ngũ Thân nhiều lớp',
          renderMainIcon: (iconClass: string) => (
            <div className="relative flex items-center justify-center">
              <CloudSun className={`${iconClass} text-amber-200`} />
              <ThermometerSnowflake className="w-4 h-4 text-cyan-100 absolute -bottom-1 -right-1.5 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-white absolute -top-1.5 -left-1" />
            </div>
          )
        };

      case 'breeze':
        return {
          gradient: 'from-teal-500 via-emerald-600 to-sky-600',
          border: 'border-teal-300/50',
          glow: 'shadow-teal-500/30',
          accentColor: 'text-teal-100',
          tagBg: 'bg-teal-900/70 text-teal-200 border-teal-400/30',
          atmosphereTitle: 'Gió Mát Bay Tà Áo',
          atmosphereDesc: 'Thời tiết mát lành, tà áo bay bổng tuyệt đẹp khi dạo phố',
          renderMainIcon: (iconClass: string) => (
            <div className="relative flex items-center justify-center">
              <Wind className={`${iconClass} text-white animate-pulse`} />
              <CloudSun className="w-4 h-4 text-amber-200 absolute -top-1.5 -right-1.5" />
              <Sparkles className="w-3 h-3 text-emerald-200 absolute -bottom-1 -left-1" />
            </div>
          )
        };

      case 'cloudy':
        return {
          gradient: 'from-slate-500 via-gray-600 to-slate-700',
          border: 'border-slate-300/50',
          glow: 'shadow-slate-500/30',
          accentColor: 'text-slate-100',
          tagBg: 'bg-slate-900/70 text-slate-200 border-slate-400/30',
          atmosphereTitle: 'Mây Dịu Nhẹ Mắt',
          atmosphereDesc: 'Ánh sáng khuếch tán dịu dàng, chụp ảnh không gắt bóng',
          renderMainIcon: (iconClass: string) => (
            <div className="relative flex items-center justify-center">
              <CloudSun className={`${iconClass} text-amber-200`} />
              <Cloud className="w-3.5 h-3.5 text-white/90 absolute -bottom-1 -left-1" />
            </div>
          )
        };

      case 'sunny':
      default:
        return {
          gradient: isAfternoon
            ? 'from-amber-500 via-orange-500 to-yellow-500'
            : 'from-amber-400 via-orange-500 to-amber-600',
          border: 'border-amber-200/60',
          glow: 'shadow-amber-500/35',
          accentColor: 'text-amber-100',
          tagBg: 'bg-amber-950/70 text-amber-200 border-amber-300/30',
          atmosphereTitle: isAfternoon ? 'Nắng Vàng Hoàng Hôn' : 'Nắng Sáng Rực Rỡ',
          atmosphereDesc: isAfternoon
            ? 'Nắng chiều ấm áp óng ả, tôn sắc lụa gấm rạng ngời'
            : 'Ánh nắng tinh khôi, tôn vinh trọn vẹn nét đẹp hoa văn',
          renderMainIcon: (iconClass: string) => (
            <div className="relative flex items-center justify-center">
              <Sun className={`${iconClass} text-amber-100 animate-[spin_24s_linear_infinite]`} />
              <Sparkles className="w-4 h-4 text-yellow-200 absolute -top-1.5 -right-1.5 animate-pulse" />
              <ThermometerSun className="w-3.5 h-3.5 text-orange-100 absolute -bottom-1 -left-1" />
            </div>
          )
        };
    }
  }, [conditionCode, isEvening, isAfternoon, temp, rainProbability]);

  // Size: sm (used in pills, badges and summary banners)
  if (size === 'sm') {
    return (
      <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-white/90 shadow-2xs border border-[#E2D5C3] text-xs font-semibold">
        <div
          className={`w-6 h-6 rounded-full bg-gradient-to-br ${visualConfig.gradient} flex items-center justify-center shadow-xs shrink-0`}
        >
          {visualConfig.renderMainIcon('w-3.5 h-3.5')}
        </div>
        <span className="text-[#1C1917] font-bold">{temp}°C</span>
        <span className="text-[#7A6B5F] text-[11px] font-normal truncate max-w-[140px]">
          • {condition || visualConfig.atmosphereTitle}
        </span>
      </div>
    );
  }

  // Size: md
  if (size === 'md') {
    return (
      <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/80 border border-[#E5DACB] shadow-2xs">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${visualConfig.gradient} flex items-center justify-center shadow-md ${visualConfig.glow} shrink-0 border ${visualConfig.border}`}
        >
          {visualConfig.renderMainIcon('w-6 h-6')}
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-[#1C1917]">{temp}°C</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#991B1E]/10 text-[#991B1E] border border-[#991B1E]/15">
              {visualConfig.atmosphereTitle}
            </span>
          </div>
          <p className="text-[11px] text-[#7A6B5F] leading-tight">
            {visualConfig.atmosphereDesc}
          </p>
        </div>
      </div>
    );
  }

  // Size: lg (Hero Visual in Step 1)
  return (
    <div className="relative group flex flex-col items-center">
      {/* Outer ambient glow */}
      <div
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${visualConfig.gradient} opacity-25 blur-md group-hover:opacity-45 transition-opacity duration-300`}
      />

      <div
        className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${visualConfig.gradient} border-2 ${visualConfig.border} shadow-lg ${visualConfig.glow} flex flex-col items-center justify-center text-white overflow-hidden p-2 transition-transform duration-300 hover:scale-105`}
      >
        {/* Shimmer light beam in backdrop */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-white/15 rounded-full blur-xl pointer-events-none" />

        {/* Dynamic Multi-layered Main Weather Icon */}
        <div className="relative z-10 my-auto">
          {visualConfig.renderMainIcon('w-9 h-9 sm:w-11 sm:h-11 drop-shadow-md')}
        </div>

        {/* Ambient Time of Day Pill */}
        <div className="absolute bottom-1.5 inset-x-2 text-center z-10">
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-white/95 drop-shadow-xs truncate block">
            {isEvening ? 'Buổi Tối' : isAfternoon ? 'Buổi Chiều' : 'Buổi Sáng'}
          </span>
        </div>
      </div>

      {showAtmosphereTag && (
        <div className="mt-2 text-center">
          <span
            className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${visualConfig.tagBg}`}
          >
            {visualConfig.atmosphereTitle}
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Skeleton loading card for Step 1 weather analysis & weather garment inference
 */
const WeatherAnalysisSkeleton: React.FC = () => (
  <div className="space-y-5 animate-in fade-in duration-200" aria-label="Đang phân tích thời tiết">
    {/* Skeleton Weather Forecast Box */}
    <div className="rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F3EADE] border border-[#E2D5C3] p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5D7C3]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#E5D5C3] animate-pulse" />
          <div className="h-4 w-36 rounded-md bg-[#E5D5C3] animate-pulse" />
        </div>
        <div className="h-4 w-24 rounded-full bg-[#E5D5C3] animate-pulse" />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-10 w-28 rounded-xl bg-[#E5D5C3] animate-pulse" />
          <div className="h-4 w-36 rounded-md bg-[#E5D5C3] animate-pulse" />
          <div className="h-3 w-24 rounded-md bg-[#E5D5C3] animate-pulse" />
        </div>
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-[#E5D5C3] animate-pulse shrink-0" />
      </div>

      <div className="grid grid-cols-3 gap-2 pt-1 text-center">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-3 rounded-xl bg-white/70 border border-[#E8DEC0] space-y-1.5">
            <div className="w-4 h-4 rounded-full bg-[#E5D5C3] mx-auto animate-pulse" />
            <div className="h-2.5 w-12 rounded bg-[#E5D5C3] mx-auto animate-pulse" />
            <div className="h-3.5 w-8 rounded bg-[#E5D5C3] mx-auto animate-pulse" />
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-xl bg-[#FAF0E1]/80 border border-[#E5D2BA] space-y-2">
        <div className="h-3 w-32 rounded bg-[#E5D5C3] animate-pulse" />
        <div className="h-3.5 w-full rounded bg-[#E5D5C3] animate-pulse" />
      </div>
    </div>

    {/* Skeleton Inferred Garment Card */}
    <div className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#E2D5C3] shadow-xs space-y-3.5">
      <div className="flex items-center justify-between pb-2 border-b border-[#F0E5D5]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#E5D5C3] animate-pulse" />
          <div className="h-4 w-44 rounded-md bg-[#E5D5C3] animate-pulse" />
        </div>
        <div className="h-4 w-28 rounded-full bg-[#E5D5C3] animate-pulse" />
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-16 h-20 rounded-xl bg-[#E5D5C3] animate-pulse shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-5 w-40 rounded-md bg-[#E5D5C3] animate-pulse" />
          <div className="h-3.5 w-48 rounded bg-[#E5D5C3] animate-pulse" />
          <div className="h-3 w-24 rounded bg-[#E5D5C3] animate-pulse" />
        </div>
      </div>

      <div className="h-14 w-full rounded-xl bg-[#FAF5EB] border border-[#EAE0D1] p-3 space-y-2">
        <div className="h-3 w-3/4 rounded bg-[#E5D5C3] animate-pulse" />
        <div className="h-3 w-1/2 rounded bg-[#E5D5C3] animate-pulse" />
      </div>

      <div className="space-y-2 pt-0.5">
        <div className="h-3 w-36 rounded bg-[#E5D5C3] animate-pulse" />
        <div className="flex gap-2">
          <div className="h-6 w-24 rounded-lg bg-[#E5D5C3] animate-pulse" />
          <div className="h-6 w-28 rounded-lg bg-[#E5D5C3] animate-pulse" />
        </div>
      </div>
    </div>

    {/* Skeleton Action Button */}
    <div className="w-full h-12 rounded-2xl bg-[#E5D5C3] animate-pulse" />
  </div>
);

/**
 * Skeleton modal overlay while the system is generating the initial outfit
 */
interface OutfitGenerationSkeletonModalProps {
  progress: number;
  phaseText: string;
}

const OutfitGenerationSkeletonModal: React.FC<OutfitGenerationSkeletonModalProps> = ({
  progress,
  phaseText
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
    <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#D8C7B2] shadow-2xl p-6 sm:p-8 space-y-6 text-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#991B1E]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C8973E]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Header status */}
      <div className="space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#991B1E]/10 text-[#991B1E] text-xs font-bold uppercase tracking-widest border border-[#991B1E]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#991B1E] animate-spin" />
          <span>Hệ Thống Đang Phân Tích & Phối Đồ</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
          Khởi Tạo Bộ Trang Phục Ban Đầu
        </h3>
        <p className="text-xs sm:text-sm text-[#68584B] min-h-[2.5rem] flex items-center justify-center transition-all duration-300 px-4">
          {phaseText}
        </p>
      </div>

      {/* Outfit Mannequin Skeleton Preview */}
      <div className="p-5 rounded-2xl bg-white border border-[#E2D5C3] shadow-xs space-y-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-20 h-24 rounded-xl bg-gradient-to-tr from-[#E8DAC7] via-[#F3EADE] to-[#E8DAC7] animate-pulse shrink-0 flex items-center justify-center border border-[#DACBB7]">
            <User className="w-8 h-8 text-[#B8A995] animate-pulse" />
          </div>
          <div className="space-y-2.5 flex-1 text-left">
            <div className="h-5 w-3/4 rounded-md bg-[#E5D5C3] animate-pulse" />
            <div className="h-3.5 w-1/2 rounded bg-[#E5D5C3] animate-pulse" />
            <div className="flex items-center gap-2 pt-1">
              <div className="w-5 h-5 rounded-full bg-[#E5D5C3] animate-pulse" />
              <div className="h-3.5 w-20 rounded bg-[#E5D5C3] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Shimmering Accessories slots */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#F0E5D5]">
          <div className="h-7 flex-1 rounded-lg bg-[#E5D5C3] animate-pulse" />
          <div className="h-7 flex-1 rounded-lg bg-[#E5D5C3] animate-pulse" />
          <div className="h-7 flex-1 rounded-lg bg-[#E5D5C3] animate-pulse" />
        </div>
      </div>

      {/* Progress Bar & percentage */}
      <div className="space-y-2 relative z-10">
        <div className="w-full bg-[#EAE0D2] rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#991B1E] via-[#C8973E] to-[#991B1E] h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-semibold text-[#7A6B5F]">
          <span className="flex items-center gap-1.5">
            <Loader2 className="w-3 h-3 animate-spin text-[#991B1E]" />
            <span>Phân tích thời tiết & bối cảnh di sản</span>
          </span>
          <span className="font-bold text-[#991B1E]">{progress}%</span>
        </div>
      </div>
    </div>
  </div>
);

export const PreparationPage: React.FC<PreparationPageProps> = ({
  initialGender = 'female',
  initialOccasion = 'festival',
  sessionData,
  onUpdateSessionData,
  onApplySuggestedLook,
  onSelfRemix,
  onBackToHome
}) => {
  // Step: 1 (Chọn ngày) | 2 (Chọn dịp) - duy trì khi quay lại từ Studio
  const [currentStep, setCurrentStep] = useState<1 | 2>(sessionData?.currentStep || 1);

  // User Selections - khởi tạo từ sessionData để không bao giờ bị xóa dữ liệu trong phiên
  const [selectedGender, setSelectedGender] = useState<'female' | 'male'>(
    sessionData?.gender || initialGender
  );
  const [dateMode, setDateMode] = useState<'today' | 'tomorrow' | 'weekend' | 'custom'>(
    sessionData?.dateMode || 'today'
  );
  const [customDate, setCustomDate] = useState<string>(() => {
    if (sessionData?.customDate) return sessionData.customDate;
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    sessionData?.locationId || 'hanoi'
  );
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<TimeOfDayId>(
    sessionData?.timeOfDay || 'morning'
  );
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionId>(
    sessionData?.occasion || initialOccasion
  );

  // Weather state: loading, error, and weather object
  const [weather, setWeather] = useState<WeatherInfo | null>(sessionData?.weather || null);
  const [isAnalyzingWeather, setIsAnalyzingWeather] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weatherRetryCount, setWeatherRetryCount] = useState<number>(0);

  // Skeleton loading states for outfit generation
  const [isGeneratingLook, setIsGeneratingLook] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(15);
  const [generationPhaseText, setGenerationPhaseText] = useState<string>('');

  // Target Date computation
  const targetDate = useMemo(() => {
    const now = new Date();
    if (dateMode === 'today') return now;
    if (dateMode === 'tomorrow') {
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      return tomorrow;
    }
    if (dateMode === 'weekend') {
      const weekend = new Date(now);
      const day = now.getDay();
      const diff = day === 0 ? 0 : 6 - day;
      weekend.setDate(now.getDate() + diff);
      return weekend;
    }
    if (customDate) {
      const parsed = new Date(customDate);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return now;
  }, [dateMode, customDate]);

  // Formatted date string in Vietnamese
  const formattedDate = useMemo(() => {
    return formatVietnameseDate(targetDate);
  }, [targetDate]);

  // Đồng bộ sessionData lên component cha để giữ lại thông tin khi chuyển màn hình
  useEffect(() => {
    onUpdateSessionData?.({
      gender: selectedGender,
      dateMode,
      customDate,
      locationId: selectedLocationId,
      timeOfDay: selectedTimeOfDay,
      occasion: selectedOccasion,
      currentStep,
      dateString: formattedDate,
      weather
    });
  }, [
    selectedGender,
    dateMode,
    customDate,
    selectedLocationId,
    selectedTimeOfDay,
    selectedOccasion,
    currentStep,
    formattedDate,
    weather
  ]);

  // Lấy dữ liệu thời tiết thực tế từ trạm khí tượng qua Open-Meteo API
  useEffect(() => {
    let isCancelled = false;
    setIsAnalyzingWeather(true);
    setWeatherError(null);

    fetchRealWeatherForecast(selectedLocationId, targetDate, selectedTimeOfDay)
      .then((data) => {
        if (!isCancelled) {
          setWeather(data);
          setWeatherError(null);
          setIsAnalyzingWeather(false);
        }
      })
      .catch((err: Error) => {
        if (!isCancelled) {
          // Xử lý lỗi API & không tự bịa dữ liệu khi API không trả về
          setWeather(null);
          setWeatherError(
            err.message || 'Không thể lấy dữ liệu thời tiết trực tuyến cho ngày này.'
          );
          setIsAnalyzingWeather(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedLocationId, targetDate, selectedTimeOfDay, weatherRetryCount]);

  // Gợi ý trang phục thích ứng: nếu có thời tiết thì theo thời tiết, nếu không có thì theo chuẩn mực di sản
  const weatherGarmentSuggestion = useMemo(() => {
    if (weather) {
      return selectDefaultGarmentAndAccessoriesByWeather(selectedGender, weather);
    }
    const defaultGarment = OUTFITS_DATA[0]; // Áo dài
    return {
      garment: defaultGarment,
      garmentId: defaultGarment.id,
      defaultColor: 'cream' as ColorId,
      defaultStyle: 'traditional' as StyleId,
      accessories: [],
      accessoriesDetails: [],
      reason: 'Chuẩn mực di sản Việt phục: Tôn vinh nét đẹp trang nhã và cốt cách truyền thống.',
      recommendedFabrics: ['Lụa tơ tằm', 'Gấm nhẹ'],
      comfortTier: 'de-chiu' as const,
      weatherTag: 'Chuẩn Mực Di Sản'
    };
  }, [selectedGender, weather]);

  // Icon mapping for occasions
  const getOccasionIcon = (occId: OccasionId) => {
    switch (occId) {
      case 'school':
        return <GraduationCap className="w-5 h-5 text-[#991B1E]" />;
      case 'work':
        return <Briefcase className="w-5 h-5 text-[#991B1E]" />;
      case 'tet':
        return <Flower2 className="w-5 h-5 text-[#991B1E]" />;
      case 'festival':
        return <Sparkles className="w-5 h-5 text-[#991B1E]" />;
      case 'wedding':
        return <HeartHandshake className="w-5 h-5 text-[#991B1E]" />;
      case 'photoshoot':
        return <Camera className="w-5 h-5 text-[#991B1E]" />;
      case 'cultural-event':
        return <Landmark className="w-5 h-5 text-[#991B1E]" />;
      case 'travel':
        return <Plane className="w-5 h-5 text-[#991B1E]" />;
      case 'casual':
        return <Coffee className="w-5 h-5 text-[#991B1E]" />;
      case 'other':
      default:
        return <Sparkle className="w-5 h-5 text-[#991B1E]" />;
    }
  };

  // Contextual icon for weather clothing advice
  const getAdviceWeatherIcon = (code?: WeatherInfo['conditionCode']) => {
    switch (code) {
      case 'rainy':
        return <Umbrella className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />;
      case 'cool':
        return <ThermometerSnowflake className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />;
      case 'breeze':
        return <Wind className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />;
      case 'sunny':
      default:
        return <Sun className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />;
    }
  };

  // Dynamic atmospheric card theme based on weather & time of day
  const atmosphericCardTheme = useMemo(() => {
    if (selectedTimeOfDay === 'evening') {
      return {
        cardBg: 'from-[#FAF8F5] via-[#F4F1EC] to-[#ECE7DF] border-[#D9CBB7]',
        badgeColor: 'text-indigo-800 bg-indigo-50 border-indigo-200'
      };
    }
    const code = weather?.conditionCode || 'sunny';
    switch (code) {
      case 'rainy':
        return {
          cardBg: 'from-[#F8FBFE] via-[#F0F6FA] to-[#E8F0F6] border-[#BCD4E6]',
          badgeColor: 'text-blue-800 bg-blue-50 border-blue-200'
        };
      case 'cool':
        return {
          cardBg: 'from-[#F7FCFD] via-[#EEF8FA] to-[#E6F2F5] border-[#BDDFE8]',
          badgeColor: 'text-cyan-800 bg-cyan-50 border-cyan-200'
        };
      case 'breeze':
        return {
          cardBg: 'from-[#F8FCFA] via-[#EFF8F4] to-[#E6F3ED] border-[#BDDFCF]',
          badgeColor: 'text-teal-800 bg-teal-50 border-teal-200'
        };
      case 'sunny':
      default:
        return {
          cardBg: 'from-[#FFFDF8] via-[#FAF4EA] to-[#F6EDE0] border-[#E8DCC8]',
          badgeColor: 'text-amber-800 bg-amber-50 border-amber-200'
        };
    }
  }, [selectedTimeOfDay, weather?.conditionCode]);

  // Handle Complete & Generate Single Initial Outfit -> Direct entry to Remix Studio
  const handleGenerateAndOpenStudio = () => {
    if (isGeneratingLook) return;
    setIsGeneratingLook(true);
    setGenerationProgress(25);
    const locObj = VIETNAM_LOCATIONS.find((l) => l.id === selectedLocationId);
    const locName = weather?.location || locObj?.name || 'Việt Nam';
    setGenerationPhaseText(`Đang phân tích bối cảnh xuất hiện tại ${locName}...`);

    const timer1 = setTimeout(() => {
      setGenerationProgress(65);
      const occObj = OCCASIONS_DATA.find((o) => o.id === selectedOccasion);
      setGenerationPhaseText(`Đối chiếu chuẩn mực di sản Việt phục cho dịp ${occObj?.nameVi || 'xuất hiện'}...`);
    }, 350);

    const timer2 = setTimeout(() => {
      setGenerationProgress(90);
      setGenerationPhaseText('Hoàn thiện bảng phối màu, kiểu tóc & tuyển chọn phụ kiện...');
    }, 700);

    const timer3 = setTimeout(() => {
      const initialSuggestedLook = generatePersonalizedInitialLook({
        gender: selectedGender,
        occasion: selectedOccasion,
        temp: weather?.temp,
        conditionCode: weather?.conditionCode,
        rainProbability: weather?.rainProbability
      });

      onApplySuggestedLook(initialSuggestedLook, {
        dateString: formattedDate,
        locationName: locName,
        weather,
        timeOfDay: selectedTimeOfDay
      });
      setIsGeneratingLook(false);
    }, 1050);
  };

  // Handle Skip suggestion and enter Remix Studio directly in 1 click
  const handleSelfRemixClick = () => {
    const locObj = VIETNAM_LOCATIONS.find((l) => l.id === selectedLocationId);
    onSelfRemix(selectedGender, {
      dateString: formattedDate,
      locationName: weather?.location || locObj?.name || 'Việt Nam',
      weather,
      timeOfDay: selectedTimeOfDay
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* 1. TOP PROGRESS STEPPER & TITLE */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#991B1E]/10 text-[#991B1E] text-xs font-bold uppercase tracking-widest border border-[#991B1E]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gợi Ý Trang Phục Ban Đầu • Bước {currentStep}/2</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
          {currentStep === 1
            ? 'Bạn muốn mặc Việt phục vào ngày nào?'
            : 'Bạn dự định xuất hiện vào dịp nào?'}
        </h1>

        <p className="text-sm sm:text-base text-[#615247] leading-relaxed">
          {currentStep === 1
            ? 'Tự động phân tích thời tiết và nhiệt độ để gợi ý chất liệu và trang phục phù hợp nhất.'
            : 'Chọn bối cảnh xuất hiện để hệ thống tự động chuẩn bị 1 bộ trang phục ban đầu trong Remix Studio.'}
        </p>

        {/* Stepper Navigation Indicator */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setCurrentStep(1)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentStep === 1
                ? 'bg-[#991B1E] text-white shadow-xs'
                : 'bg-[#F2ECE0] text-[#594B40] hover:bg-[#EAE0D1]'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Ngày Mặc & Thời Tiết</span>
          </button>

          <div className="w-6 h-[2px] bg-[#E2D5C3]" />

          <button
            onClick={() => setCurrentStep(2)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentStep === 2
                ? 'bg-[#991B1E] text-white shadow-xs'
                : 'bg-[#F2ECE0] text-[#594B40] hover:bg-[#EAE0D1]'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Chọn Dịp Xuất Hiện</span>
          </button>
        </div>
      </div>

      {/* 2. BƯỚC 1: CHỌN NGÀY & THÔNG TIN THỜI TIẾT */}
      {currentStep === 1 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Gender Selector Switch */}
          <div className="max-w-md mx-auto p-1.5 rounded-2xl bg-[#EFE6D8] border border-[#DACBB7] flex items-center gap-1.5">
            <button
              onClick={() => setSelectedGender('female')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedGender === 'female'
                  ? 'bg-white text-[#991B1E] shadow-sm ring-1 ring-[#991B1E]/20'
                  : 'text-[#68584B] hover:text-[#1C1917]'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#991B1E]" />
              <span>Trang Phục Nữ</span>
            </button>

            <button
              onClick={() => setSelectedGender('male')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedGender === 'male'
                  ? 'bg-white text-[#991B1E] shadow-sm ring-1 ring-[#991B1E]/20'
                  : 'text-[#68584B] hover:text-[#1C1917]'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#991B1E]" />
              <span>Trang Phục Nam</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left: Date Presets & Custom Picker */}
            <div className="md:col-span-7 space-y-5">
              {/* Box Chọn Ngày */}
              <div className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E2D5C3] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1C1917]">
                    <CalendarIcon className="w-4 h-4 text-[#991B1E]" />
                    <span>1. Chọn Ngày Muốn Mặc Việt Phục</span>
                  </div>
                  <span className="text-xs font-bold text-[#991B1E] bg-[#991B1E]/10 px-3 py-1 rounded-full border border-[#991B1E]/15 self-start sm:self-auto">
                    {formattedDate}
                  </span>
                </div>

                {/* Preset Date Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'today', label: 'Hôm nay' },
                    { id: 'tomorrow', label: 'Ngày mai' },
                    { id: 'weekend', label: 'Cuối tuần' },
                    { id: 'custom', label: 'Ngày tùy chọn' }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setDateMode(preset.id as any);
                        if (preset.id === 'today') {
                          setCustomDate(new Date().toISOString().split('T')[0]);
                        } else if (preset.id === 'tomorrow') {
                          const tm = new Date();
                          tm.setDate(tm.getDate() + 1);
                          setCustomDate(tm.toISOString().split('T')[0]);
                        } else if (preset.id === 'weekend') {
                          const wk = new Date();
                          const day = wk.getDay();
                          const diff = day === 0 ? 0 : 6 - day;
                          wk.setDate(wk.getDate() + diff);
                          setCustomDate(wk.toISOString().split('T')[0]);
                        }
                      }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border text-center cursor-pointer ${
                        dateMode === preset.id
                          ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-xs'
                          : 'bg-[#FAF7F2] text-[#4A3E35] border-[#E5DACB] hover:bg-[#F2ECE0]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Date Picker Input */}
                <div className="pt-1">
                  <label className="block text-xs font-semibold text-[#6B5C50] mb-1.5 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#991B1E]" />
                    <span>Chọn ngày trên lịch (Date Picker):</span>
                  </label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => {
                      setCustomDate(e.target.value);
                      setDateMode('custom');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DACBBA] bg-white text-sm font-semibold text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#991B1E]/20 focus:border-[#991B1E] shadow-2xs"
                  />
                </div>
              </div>

              {/* Box Địa Điểm / Thành Phố */}
              <div className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E2D5C3] shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1C1917]">
                  <MapPin className="w-4 h-4 text-[#991B1E]" />
                  <span>2. Khu Vực & Địa Điểm</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {VIETNAM_LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocationId(loc.id)}
                      className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                        selectedLocationId === loc.id
                          ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-xs'
                          : 'bg-[#FAF7F2] text-[#4A3E35] border-[#E5DACB] hover:bg-[#F2ECE0]'
                      }`}
                    >
                      <div className="font-bold">{loc.name}</div>
                      <div
                        className={`text-[10px] ${
                          selectedLocationId === loc.id ? 'text-white/80' : 'text-[#7A6B5F]'
                        }`}
                      >
                        {loc.region}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Box Khung Giờ Trong Ngày */}
              <div className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E2D5C3] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1C1917]">
                    <Clock className="w-4 h-4 text-[#991B1E]" />
                    <span>3. Thời Điểm Mặc Trang Phục</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#7A6B5F] bg-[#FAF5EB] px-2.5 py-0.5 rounded-full border border-[#E5DACB]">
                    Ảnh hưởng nhiệt độ & ánh sáng
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {TIME_OF_DAY_OPTIONS.map((tod) => {
                    const isSelected = selectedTimeOfDay === tod.id;
                    return (
                      <button
                        key={tod.id}
                        type="button"
                        onClick={() => setSelectedTimeOfDay(tod.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-xs'
                            : 'bg-[#FAF7F2] text-[#4A3E35] border-[#E5DACB] hover:bg-[#F2ECE0]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{tod.label}</span>
                          {tod.id === 'morning' && (
                            <Sunrise className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-200' : 'text-amber-600'}`} />
                          )}
                          {tod.id === 'afternoon' && (
                            <Sun className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-200' : 'text-amber-500'}`} />
                          )}
                          {tod.id === 'evening' && (
                            <Moon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-200' : 'text-indigo-600'}`} />
                          )}
                        </div>
                        <div className={`text-[10px] mt-1.5 ${isSelected ? 'text-white/80' : 'text-[#7A6B5F]'}`}>
                          {tod.timeRange}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Weather Information Display */}
            <div className="md:col-span-5 space-y-5">
              {isAnalyzingWeather ? (
                <WeatherAnalysisSkeleton />
              ) : weather ? (
                <>
                  <div className={`rounded-2xl bg-gradient-to-br ${atmosphericCardTheme.cardBg} border shadow-sm p-6 space-y-4 transition-all duration-300`}>
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5D7C3]/70">
                      <div className="flex items-center gap-2">
                        <DynamicWeatherVisual
                          conditionCode={weather.conditionCode}
                          temp={weather.temp}
                          timeOfDay={selectedTimeOfDay}
                          rainProbability={weather.rainProbability}
                          size="sm"
                        />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${atmosphericCardTheme.badgeColor}`}>
                        Đồng bộ trực tuyến
                      </span>
                    </div>

                    {/* Temperature & Dynamic Hero Weather Visual */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
                          {weather.temp}°C
                        </div>
                        <div className="text-sm font-bold text-[#45362B]">
                          {weather.condition}
                        </div>
                        <div className="text-xs text-[#7A6B5F]">
                          tại <strong className="text-[#1C1917]">{weather.location}</strong> •{' '}
                          {TIME_OF_DAY_OPTIONS.find((t) => t.id === selectedTimeOfDay)?.label}
                        </div>
                      </div>

                      {/* Dynamic Visual Weather Emblem */}
                      <DynamicWeatherVisual
                        conditionCode={weather.conditionCode}
                        condition={weather.condition}
                        temp={weather.temp}
                        timeOfDay={selectedTimeOfDay}
                        rainProbability={weather.rainProbability}
                        size="lg"
                        showAtmosphereTag={true}
                      />
                    </div>

                    {/* Mini Indicators: Rain Chance, Humidity, Wind */}
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2.5 rounded-xl bg-white/80 border border-[#E8DEC0]/80 shadow-2xs">
                        <CloudRain className="w-3.5 h-3.5 text-blue-500 mx-auto mb-1 animate-pulse" />
                        <div className="text-[10px] text-[#7A6B5F]">Khả năng mưa</div>
                        <div className="text-xs font-bold text-[#1C1917]">{weather.rainProbability}%</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/80 border border-[#E8DEC0]/80 shadow-2xs">
                        <Droplets className="w-3.5 h-3.5 text-sky-500 mx-auto mb-1" />
                        <div className="text-[10px] text-[#7A6B5F]">Độ ẩm</div>
                        <div className="text-xs font-bold text-[#1C1917]">{weather.humidity}%</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/80 border border-[#E8DEC0]/80 shadow-2xs">
                        <Wind className="w-3.5 h-3.5 text-teal-500 mx-auto mb-1" />
                        <div className="text-[10px] text-[#7A6B5F]">Gió</div>
                        <div className="text-xs font-bold text-[#1C1917]">{weather.windSpeed}</div>
                      </div>
                    </div>

                    {/* Weather Styling Advice */}
                    <div className="p-3.5 rounded-xl bg-white/75 border border-[#E5D2BA] text-xs text-[#524338] leading-relaxed flex items-start gap-2.5">
                      {getAdviceWeatherIcon(weather.conditionCode)}
                      <div>
                        <span className="font-bold text-[#7A4B15] block mb-0.5">
                          Gợi ý thích ứng thời tiết:
                        </span>
                        {weather.clothingAdvice}
                      </div>
                    </div>
                  </div>

                  {/* Inferred Default Garment & Accessories Card (From OUTFITS_DATA based on Gender & Weather) */}
                  <div className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#E2D5C3] shadow-xs space-y-3.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0E5D5] flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#991B1E]" />
                        <span className="font-serif font-bold text-sm text-[#1C1917]">
                          Trang Phục Thích Ứng Thời Tiết
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#991B1E] bg-[#991B1E]/10 px-2.5 py-0.5 rounded-full border border-[#991B1E]/20">
                          {weatherGarmentSuggestion.weatherTag}
                        </span>
                        <DynamicWeatherVisual
                          conditionCode={weather.conditionCode}
                          temp={weather.temp}
                          timeOfDay={selectedTimeOfDay}
                          rainProbability={weather.rainProbability}
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Garment details from OUTFITS_DATA */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-20 rounded-xl overflow-hidden border border-[#E5DACB] shrink-0 bg-[#FAF7F2]">
                        <img
                          src={
                            selectedGender === 'male' && weatherGarmentSuggestion.garment.maleImage
                              ? weatherGarmentSuggestion.garment.maleImage
                              : weatherGarmentSuggestion.garment.image
                          }
                          alt={weatherGarmentSuggestion.garment.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#1C1917] leading-tight">
                          {weatherGarmentSuggestion.garment.vietnameseName}
                        </h4>
                        <p className="text-[11px] text-[#7A6B5F] line-clamp-2 leading-relaxed">
                          {weatherGarmentSuggestion.garment.subtitle}
                        </p>
                        <div className="text-[10px] font-semibold text-[#991B1E]">
                          {weatherGarmentSuggestion.garment.era}
                        </div>
                      </div>
                    </div>

                    {/* Weather Rationale */}
                    <p className="text-xs text-[#524338] bg-[#FAF5EB] p-3 rounded-xl border border-[#EAE0D1] leading-relaxed">
                      {weatherGarmentSuggestion.reason}
                    </p>

                    {/* Default Inferred Accessories */}
                    <div className="space-y-1.5 pt-0.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5C50] block">
                        Phụ kiện gợi ý theo bối cảnh:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {weatherGarmentSuggestion.accessoriesDetails.map((acc) => (
                          <span
                            key={acc.id}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-[#F2ECE0] text-[#4A3E35] border border-[#DACBB7] font-medium flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-[#991B1E]" />
                            <span>{acc.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Continue to Step 2 Card */}
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#991B1E] hover:bg-[#781316] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Tiếp tục: Chọn Dịp (Bước 2)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  {/* Weather unavailable / API error card - Strictly NO fabricated numbers */}
                  <div className="rounded-2xl bg-[#FFFDF9] border border-[#E2D5C3] shadow-sm p-6 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5D7C3]/70">
                      <div className="flex items-center gap-2 text-amber-800">
                        <CloudOff className="w-5 h-5 text-amber-600 shrink-0" />
                        <span className="font-bold text-sm">Dịch Vụ Khí Tượng Trực Tuyến</span>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border text-amber-800 bg-amber-50 border-amber-200">
                        Chưa có số liệu
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-[#524338] leading-relaxed">
                        {weatherError || 'Hiện không lấy được dữ liệu thời tiết trực tuyến cho ngày này.'}
                      </p>
                      <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#EADFCF] text-[11px] text-[#7A6B5F] leading-relaxed">
                        💡 <strong>Nguyên tắc:</strong> Hệ thống không tự tạo số liệu thời tiết giả. Bạn vẫn có thể tiếp tục chọn dịp xuất hiện để tạo trang phục theo chuẩn mực di sản văn hóa.
                      </div>
                    </div>

                    <div className="pt-1 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setWeatherRetryCount((c) => c + 1)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F2ECE0] hover:bg-[#EAE0D1] text-[#4A3E35] text-xs font-semibold border border-[#DACBBA] cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#991B1E]" />
                        <span>Thử lại kết nối API</span>
                      </button>
                    </div>
                  </div>

                  {/* Standard Heritage Fallback Garment Card */}
                  <div className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#E2D5C3] shadow-xs space-y-3.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0E5D5] flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#991B1E]" />
                        <span className="font-serif font-bold text-sm text-[#1C1917]">
                          Trang Phục Theo Chuẩn Mực Di Sản
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#991B1E] bg-[#991B1E]/10 px-2.5 py-0.5 rounded-full border border-[#991B1E]/20">
                        Di Sản Văn Hóa
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-20 rounded-xl overflow-hidden border border-[#E5DACB] shrink-0 bg-[#FAF7F2]">
                        <img
                          src={
                            selectedGender === 'male' && weatherGarmentSuggestion.garment.maleImage
                              ? weatherGarmentSuggestion.garment.maleImage
                              : weatherGarmentSuggestion.garment.image
                          }
                          alt={weatherGarmentSuggestion.garment.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#1C1917] leading-tight">
                          {weatherGarmentSuggestion.garment.vietnameseName}
                        </h4>
                        <p className="text-[11px] text-[#7A6B5F] line-clamp-2 leading-relaxed">
                          {weatherGarmentSuggestion.garment.subtitle}
                        </p>
                        <div className="text-[10px] font-semibold text-[#991B1E]">
                          {weatherGarmentSuggestion.garment.era}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F8F3EA] border border-[#EADFCF] text-xs text-[#524338] leading-relaxed">
                      <strong className="text-[#7A4B15]">Gợi ý di sản: </strong>
                      {weatherGarmentSuggestion.reason}
                    </div>
                  </div>

                  {/* Continue to Step 2 Card */}
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#991B1E] hover:bg-[#781316] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Tiếp tục: Chọn Dịp (Bước 2)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. BƯỚC 2: CHỌN DỊP (10 DỊP CHUẨN) */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Quick Context Summary Banner */}
          <div className="p-3.5 px-5 rounded-2xl bg-[#F4ECE0] border border-[#E0D2C0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#4A3E35]">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-bold text-[#991B1E]">Thông tin đã chọn:</span>
              <span>Giới tính: <strong>{selectedGender === 'female' ? 'Nữ' : 'Nam'}</strong></span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="font-semibold text-[#1C1917]">
                {weather?.location || VIETNAM_LOCATIONS.find((l) => l.id === selectedLocationId)?.name || 'Việt Nam'}
              </span>
              {weather ? (
                <DynamicWeatherVisual
                  conditionCode={weather.conditionCode}
                  condition={weather.condition}
                  temp={weather.temp}
                  timeOfDay={selectedTimeOfDay}
                  rainProbability={weather.rainProbability}
                  size="sm"
                />
              ) : (
                <span className="text-[11px] text-[#7A6B5F] italic">(Chưa có dữ liệu thời tiết)</span>
              )}
            </div>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-[#991B1E] font-bold hover:underline cursor-pointer"
            >
              Đổi ngày / thời tiết
            </button>
          </div>

          {/* 10 Occasions Selection Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {OCCASIONS_DATA.map((occ) => {
              const isSelected = selectedOccasion === occ.id;
              return (
                <div
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`group cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-[#FFFDF9] border-[#991B1E] ring-2 ring-[#991B1E]/20 shadow-md scale-[1.02]'
                      : 'bg-[#FFFDF9] border-[#E2D5C3] hover:border-[#C58B35] hover:bg-[#FAF6EE]'
                  }`}
                >
                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#991B1E] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#991B1E]/10' : 'bg-[#F2ECE0] group-hover:bg-[#FAF0E1]'
                      }`}
                    >
                      {getOccasionIcon(occ.id)}
                    </div>

                    <div>
                      <h3 className="font-serif text-sm font-bold text-[#1C1917] group-hover:text-[#991B1E] transition-colors leading-tight">
                        {occ.nameVi}
                      </h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6B5F]">
                        {occ.name}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#615247] line-clamp-2 leading-relaxed">
                      {occ.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final Action Callout: Generate Single Outfit & Enter Studio */}
          <div className="rounded-2xl bg-gradient-to-r from-[#991B1E]/10 via-[#FAF6EE] to-[#C58B35]/15 border border-[#E5D2BA] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#991B1E]">
                Sẵn Sàng Mở Remix Studio
              </span>
              <div className="font-serif text-lg font-bold text-[#1C1917]">
                Tạo 1 bộ trang phục ban đầu cho dịp{' '}
                <span className="text-[#991B1E]">
                  {OCCASIONS_DATA.find((o) => o.id === selectedOccasion)?.nameVi}
                </span>
              </div>
              <p className="text-xs text-[#52453B]">
                Hệ thống sẽ tự động phối trang phục, màu sắc, kiểu tóc và phụ kiện phù hợp vào model. Bạn có toàn quyền tùy chỉnh tự do sau khi vào Studio.
              </p>
            </div>

            <button
              type="button"
              disabled={isGeneratingLook}
              onClick={handleGenerateAndOpenStudio}
              className={`inline-flex items-center justify-center gap-2 bg-[#991B1E] hover:bg-[#781316] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer shrink-0 ${
                isGeneratingLook ? 'opacity-80 cursor-wait' : ''
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Tạo Gợi Ý & Mở Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. FOOTER CONTROLS: BACK / TỰ PHỐI ĐỒ */}
      <div className="pt-4 border-t border-[#E5DACB] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          {currentStep === 1 ? (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#594C42] hover:text-[#1C1917] px-4 py-2.5 rounded-full hover:bg-[#F0E8DC] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về Trang Chủ</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#594C42] hover:text-[#1C1917] px-4 py-2.5 rounded-full hover:bg-[#F0E8DC] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay Lại Bước 1 (Chọn ngày)</span>
            </button>
          )}
        </div>

        {/* NÚT TỰ PHỐI ĐỒ (Bỏ qua gợi ý, mở trực tiếp Studio) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSelfRemixClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-[#594C42] bg-[#F2ECE0] hover:bg-[#EAE0D1] hover:text-[#1C1917] transition-all cursor-pointer border border-[#DACBBA]"
            title="Bỏ qua bước gợi ý và tự phối trang phục theo ý muốn"
          >
            <Sliders className="w-3.5 h-3.5 text-[#991B1E]" />
            <span>Tự phối đồ (Bỏ qua gợi ý)</span>
          </button>
        </div>
      </div>

      {/* Outfit Generation Skeleton Modal Overlay */}
      {isGeneratingLook && (
        <OutfitGenerationSkeletonModal
          progress={generationProgress}
          phaseText={generationPhaseText}
        />
      )}
    </div>
  );
};
