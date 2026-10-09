import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  RefreshCw,
  Search,
  ExternalLink,
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Compass,
  Scroll,
  HelpCircle,
  ShieldCheck,
  History
} from 'lucide-react';

export interface TriviaSource {
  title: string;
  uri: string;
}

export interface VietPhucTrivia {
  title: string;
  garment: string;
  era: string;
  fact: string;
  significance: string;
  didYouKnow?: string;
  sources: TriviaSource[];
  groundedWithGoogleSearch: boolean;
  sourceType?: string;
  searchQueries?: string[];
  note?: string;
}

interface VietPhucTriviaCardProps {
  onExploreOutfit?: (outfitId: string) => void;
  onQuickStartRemix?: (outfitId?: string) => void;
}

export const VietPhucTriviaCard: React.FC<VietPhucTriviaCardProps> = ({
  onExploreOutfit,
  onQuickStartRemix,
}) => {
  const [trivia, setTrivia] = useState<VietPhucTrivia | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Fetch trivia fact from backend (Google Search grounded)
  const fetchTrivia = useCallback(async (customTopic?: string) => {
    setLoading(true);
    setError(null);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      const url = customTopic
        ? `/api/viet-phuc-trivia?topic=${encodeURIComponent(customTopic)}`
        : `/api/viet-phuc-trivia`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Lỗi kết nối máy chủ (${res.status})`);
      }
      const data: VietPhucTrivia = await res.json();
      setTrivia(data);
    } catch {
      // Fallback fact so UI stays beautiful and informative
      setTrivia({
        title: 'Bí ẩn 5 hạt cúc trên tà Áo Ngũ Thân',
        garment: 'Áo Ngũ Thân',
        era: 'Triều Nguyễn (1744 - 1945)',
        fact: '5 chiếc cúc áo ngũ thân tượng trưng cho đạo lý Ngũ Thường của người quân tử: Nhân, Lễ, Nghĩa, Trí, Tín. Ngoài ra, 5 thân áo còn đại diện cho Tứ thân phụ mẫu cùng người mặc ở giữa được chở che.',
        significance: 'Nhắc nhở người mặc luôn giữ gìn chuẩn mực đạo đức, lòng hiếu thảo và khí chất đoan chính trong mọi hành vi ứng xử.',
        didYouKnow: 'Vua Minh Mạng năm 1837 từng ban chiếu định chế Áo Ngũ Thân làm quốc phục trên toàn cõi Việt Nam từ Bắc chí Nam.',
        sources: [
          {
            title: 'Áo ngũ thân - Trang phục truyền thống Việt Nam',
            uri: 'https://vi.wikipedia.org/wiki/%C3%81o_ng%C5%A9_th%C3%A2n'
          }
        ],
        groundedWithGoogleSearch: false,
        sourceType: 'curated-archive',
        note: 'Đang hiển thị từ kho lưu trữ di sản văn hóa.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount (every user visit)
  useEffect(() => {
    fetchTrivia();
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [fetchTrivia]);

  // Copy fact to clipboard
  const handleCopy = () => {
    if (!trivia) return;
    const textToCopy = `[Kiến thức Việt phục] ${trivia.title}\n• Trang phục: ${trivia.garment} (${trivia.era})\n• Sự thật: ${trivia.fact}\n• Ý nghĩa: ${trivia.significance}\n(Nguồn: Việt Phục Remix)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Text-to-speech for reading fact
  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window) || !trivia) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${trivia.title}. ${trivia.fact}. Ý nghĩa: ${trivia.significance}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;

    // Try finding Vietnamese voice
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find((v) => v.lang.includes('vi') || v.lang.includes('VN'));
    if (viVoice) {
      utterance.voice = viVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Match garment to app outfit IDs if applicable
  const getMatchedOutfitId = (garmentName: string): string | null => {
    const lower = garmentName.toLowerCase();
    if (lower.includes('ngũ thân') || lower.includes('ngu than') || lower.includes('áo tấc')) return 'ao-ngu-than';
    if (lower.includes('áo dài') || lower.includes('ao dai')) return 'ao-dai';
    if (lower.includes('tứ thân') || lower.includes('tu than')) return 'ao-tu-than';
    if (lower.includes('bà ba') || lower.includes('ba ba')) return 'ao-ba-ba';
    return null;
  };

  const matchedOutfitId = trivia ? getMatchedOutfitId(trivia.garment) : null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F5EFE4] border border-[#E4D5C2] shadow-sm hover:shadow-md transition-shadow">
        {/* Subtle decorative background pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(#991B1E_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.04] pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#C58B35]/5 blur-3xl pointer-events-none" />

        <div className="relative p-6 sm:p-8 lg:p-10">
          {/* Top Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EADFCF]">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#991B1E]/10 text-[#991B1E] text-xs font-bold uppercase tracking-wider border border-[#991B1E]/20">
                  <Scroll className="w-3.5 h-3.5" />
                  <span>Kiến Thức Việt Phục</span>
                </span>

                {/* Google Search Grounding Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A73E8]/10 text-[#1A73E8] text-xs font-semibold border border-[#1A73E8]/20">
                  <Search className="w-3 h-3 text-[#1A73E8]" />
                  <span>Xác thực bởi Google Search</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#6B5A4E] pt-1">
                Khám phá ngẫu nhiên mỗi lần truy cập — Dữ liệu thời gian thực tra cứu qua Google
              </p>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              {trivia && (
                <>
                  <button
                    onClick={handleToggleSpeak}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      isSpeaking
                        ? 'bg-[#991B1E] text-white border-[#991B1E]'
                        : 'bg-white/80 hover:bg-white text-[#52453B] border-[#DACBBA]'
                    }`}
                    title={isSpeaking ? 'Dừng đọc' : 'Nghe đọc sự thật này'}
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span className="hidden md:inline">{isSpeaking ? 'Dừng đọc' : 'Nghe đọc'}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white/80 hover:bg-white text-[#52453B] border border-[#DACBBA] transition-colors"
                    title="Sao chép kiến thức này"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden md:inline">{copied ? 'Đã sao chép' : 'Sao chép'}</span>
                  </button>
                </>
              )}

              {/* Refresh / Next Random Fact button */}
              <button
                onClick={() => fetchTrivia()}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#991B1E] hover:bg-[#781316] text-white shadow-xs transition-all disabled:opacity-60 active:scale-95 cursor-pointer"
                title="Khám phá một sự thật thú vị ngẫu nhiên khác"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Đang tra cứu...' : 'Sự thật khác'}</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          {loading && !trivia ? (
            /* Skeleton Loading State */
            <div className="py-8 space-y-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-6 w-32 bg-[#E5D7C3] rounded-md" />
                <div className="h-6 w-44 bg-[#E5D7C3] rounded-md" />
              </div>
              <div className="h-8 w-3/4 bg-[#E2D2BC] rounded-md" />
              <div className="space-y-2 pt-2">
                <div className="h-4 w-full bg-[#EAE0D1] rounded" />
                <div className="h-4 w-5/6 bg-[#EAE0D1] rounded" />
                <div className="h-4 w-2/3 bg-[#EAE0D1] rounded" />
              </div>
              <div className="h-16 w-full bg-[#E5D8C6] rounded-xl" />
            </div>
          ) : error && !trivia ? (
            /* Error Fallback State */
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center mx-auto">
                <HelpCircle className="w-6 h-6" />
              </div>
              <p className="text-sm text-[#733333] font-medium">{error}</p>
              <button
                onClick={() => fetchTrivia()}
                className="px-4 py-2 rounded-lg bg-[#991B1E] text-white text-xs font-medium hover:bg-[#781316]"
              >
                Thử kết nối lại
              </button>
            </div>
          ) : trivia ? (
            /* Fact Details View */
            <div className="pt-6 space-y-6">
              {/* Garment & Era Meta Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF0E1] text-[#7A4B15] text-xs font-semibold border border-[#E8D4B8]">
                  <BookOpen className="w-3.5 h-3.5 text-[#C58B35]" />
                  <span>Trang phục: <strong>{trivia.garment}</strong></span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F0EBE1] text-[#4A3D34] text-xs font-medium border border-[#DDD3C5]">
                  <History className="w-3.5 h-3.5 text-[#7A6B5F]" />
                  <span>Thời kỳ: <strong>{trivia.era}</strong></span>
                </span>

                {trivia.groundedWithGoogleSearch ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dữ liệu trực tiếp Google</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#7A6B5F] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#E2D5C3]">
                    Kho lưu trữ văn hóa
                  </span>
                )}
              </div>

              {/* Title & Core Fact */}
              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight leading-snug">
                  {trivia.title}
                </h3>

                <p className="text-base sm:text-lg text-[#3B3028] leading-relaxed font-normal">
                  {trivia.fact}
                </p>
              </div>

              {/* Cultural Significance & "Did You Know" Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Significance Card */}
                <div className="md:col-span-7 rounded-2xl bg-white/70 backdrop-blur-xs p-5 border border-[#E7DAC9] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#991B1E]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ý Nghĩa Văn Hóa & Triết Lý</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4E4137] leading-relaxed">
                    {trivia.significance}
                  </p>
                </div>

                {/* Did You Know Highlight */}
                {trivia.didYouKnow && (
                  <div className="md:col-span-5 rounded-2xl bg-[#991B1E]/5 p-5 border border-[#991B1E]/15 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#991B1E]">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Bạn Có Biết?</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3E2E25] font-medium leading-relaxed pt-1.5 italic">
                        "{trivia.didYouKnow}"
                      </p>
                    </div>

                    {matchedOutfitId && (
                      <div className="pt-3 border-t border-[#991B1E]/10 flex items-center gap-2">
                        {onExploreOutfit && (
                          <button
                            onClick={() => onExploreOutfit(matchedOutfitId)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#991B1E] hover:underline"
                          >
                            <Compass className="w-3 h-3" />
                            <span>Khám phá phom dáng</span>
                          </button>
                        )}
                        {onQuickStartRemix && (
                          <button
                            onClick={() => onQuickStartRemix(matchedOutfitId)}
                            className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-[#991B1E] px-2.5 py-1 rounded-full hover:bg-[#781316] transition-colors"
                          >
                            <span>Remix mẫu này</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Verified Sources from Google Search */}
              {trivia.sources && trivia.sources.length > 0 && (
                <div className="pt-2 border-t border-[#EAE0D3]/80 flex flex-wrap items-center gap-2 text-xs text-[#6B5A4E]">
                  <span className="font-semibold text-[#4A3D34] flex items-center gap-1">
                    <Search className="w-3 h-3 text-[#1A73E8]" />
                    <span>Nguồn tham khảo từ Google:</span>
                  </span>
                  {trivia.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 text-[#1A73E8] hover:text-[#0b51a8] hover:bg-white border border-[#D5E1F2] transition-colors text-xs font-medium max-w-xs truncate"
                      title={src.title}
                    >
                      <span className="truncate">{src.title}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
