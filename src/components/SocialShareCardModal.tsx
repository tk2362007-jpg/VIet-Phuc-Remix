import React, { useState, useRef } from 'react';
import {
  X,
  Download,
  Copy,
  Share2,
  Check,
  Sparkles,
  ShieldCheck,
  Palette,
  SlidersHorizontal,
  Image as ImageIcon,
  Smartphone,
  Square,
  RectangleVertical,
  Type,
  Award
} from 'lucide-react';
import {
  OutfitLookState,
  OutfitId,
  OccasionId,
  StyleId,
  ColorId,
  SkinToneId,
  HairstyleId
} from '../types';
import { OUTFITS_DATA } from '../data/outfits';
import { OCCASIONS_DATA } from '../data/occasions';
import { STYLES_DATA } from '../data/styles';
import { COLORS_DATA, SKIN_TONES_DATA, evaluateColorHarmony } from '../data/colors';
import { ACCESSORIES_DATA } from '../data/accessories';
import { evaluateCultureCheck } from '../data/cultureNotes';
import {
  getFemaleHairstyleById,
  getMaleHairstyleById,
  DEFAULT_FEMALE_HAIRSTYLE,
  DEFAULT_MALE_HAIRSTYLE
} from '../data/hairstyles.js';
import { Stylized3DCharacter } from './Stylized3DCharacter';

export interface SocialShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lookState: OutfitLookState;
  customTitle?: string;
}

type CardAspectRatio = '4:5' | '9:16' | '1:1';
type CardThemeId = 'imperial-ivory' | 'midnight-hue' | 'blush-silk' | 'celadon-jade';

interface CardThemeConfig {
  id: CardThemeId;
  name: string;
  subtitle: string;
  bgStart: string;
  bgMiddle: string;
  bgEnd: string;
  haloColor: string;
  borderOuter: string;
  borderInner: string;
  cornerOrnament: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentPrimary: string;
  accentGold: string;
  badgeBg: string;
  badgeText: string;
  panelBg: string;
  panelBorder: string;
  isDark: boolean;
}

const CARD_THEMES: Record<CardThemeId, CardThemeConfig> = {
  'imperial-ivory': {
    id: 'imperial-ivory',
    name: 'Giấy Dó Hoàng Gia',
    subtitle: 'Kem ngà & Đỏ son cổ truyền',
    bgStart: '#FFFDF9',
    bgMiddle: '#F7F0E4',
    bgEnd: '#EFE4D2',
    haloColor: 'rgba(200, 151, 62, 0.20)',
    borderOuter: '#991B1E',
    borderInner: '#C8973E',
    cornerOrnament: '#991B1E',
    textPrimary: '#1C1917',
    textSecondary: '#4A3B32',
    textMuted: '#7A695B',
    accentPrimary: '#991B1E',
    accentGold: '#B8862D',
    badgeBg: '#991B1E',
    badgeText: '#FFFDF9',
    panelBg: 'rgba(255, 253, 249, 0.88)',
    panelBorder: '#DECBB3',
    isDark: false
  },
  'midnight-hue': {
    id: 'midnight-hue',
    name: 'Đêm Cố Đô',
    subtitle: 'Đen huyền & Vàng kim cung đình',
    bgStart: '#1C1816',
    bgMiddle: '#14110F',
    bgEnd: '#0D0B09',
    haloColor: 'rgba(212, 175, 55, 0.22)',
    borderOuter: '#D4AF37',
    borderInner: '#8A6D2B',
    cornerOrnament: '#D4AF37',
    textPrimary: '#FAF7F2',
    textSecondary: '#E5D7C3',
    textMuted: '#A89886',
    accentPrimary: '#E04F53',
    accentGold: '#D4AF37',
    badgeBg: '#991B1E',
    badgeText: '#FAF7F2',
    panelBg: 'rgba(34, 29, 26, 0.88)',
    panelBorder: '#4A3D31',
    isDark: true
  },
  'blush-silk': {
    id: 'blush-silk',
    name: 'Lụa Đào Kinh Bắc',
    subtitle: 'Hồng phấn tơ tằm & Chu sa',
    bgStart: '#FFF9F8',
    bgMiddle: '#FBECE9',
    bgEnd: '#F3DDD8',
    haloColor: 'rgba(153, 27, 30, 0.14)',
    borderOuter: '#8C1D22',
    borderInner: '#D49B7E',
    cornerOrnament: '#8C1D22',
    textPrimary: '#261718',
    textSecondary: '#593A3C',
    textMuted: '#876466',
    accentPrimary: '#991B1E',
    accentGold: '#B57C32',
    badgeBg: '#8C1D22',
    badgeText: '#FFF9F8',
    panelBg: 'rgba(255, 251, 250, 0.88)',
    panelBorder: '#E5C5BF',
    isDark: false
  },
  'celadon-jade': {
    id: 'celadon-jade',
    name: 'Bích Ngọc Đông Đô',
    subtitle: 'Xanh ngọc cổ & Nhũ vàng',
    bgStart: '#162822',
    bgMiddle: '#101F1A',
    bgEnd: '#0A1411',
    haloColor: 'rgba(200, 151, 62, 0.20)',
    borderOuter: '#C8973E',
    borderInner: '#4F7768',
    cornerOrnament: '#C8973E',
    textPrimary: '#F7F4EB',
    textSecondary: '#D5E0DA',
    textMuted: '#8FA89C',
    accentPrimary: '#E2B857',
    accentGold: '#D4AF37',
    badgeBg: '#C8973E',
    badgeText: '#111F1A',
    panelBg: 'rgba(24, 44, 37, 0.88)',
    panelBorder: '#375A4D',
    isDark: true
  }
};

const PRESET_QUOTES = [
  'Mặc Việt theo cách của bạn — Giữ hồn cốt xưa trong nhịp sống mới.',
  'Tinh hoa cổ phục Việt: Nét duyên truyền thống giao hòa hơi thở Gen Z.',
  'Tự hào diện Việt phục, kể câu chuyện văn hóa bằng ngôn ngữ thời trang.',
  'Lụa là gấm vóc ngàn năm, tỏa sáng giữa khung trời đương đại.'
];

export const SocialShareCardModal: React.FC<SocialShareCardModalProps> = ({
  isOpen,
  onClose,
  lookState,
  customTitle
}) => {
  const [aspectRatio, setAspectRatio] = useState<CardAspectRatio>('4:5');
  const [themeId, setThemeId] = useState<CardThemeId>('imperial-ivory');
  const [creatorName, setCreatorName] = useState<string>('');
  const [quoteText, setQuoteText] = useState<string>(PRESET_QUOTES[0]);
  const [showScores, setShowScores] = useState<boolean>(true);
  const [showSpecs, setShowSpecs] = useState<boolean>(true);

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const characterContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const gender = lookState.gender || 'female';
  const skinTone: SkinToneId = lookState.skinTone || 'neutral';
  const outfitId: OutfitId = (lookState.outfit || 'ao-dai') as OutfitId;
  const colorId: ColorId = (lookState.color || 'cream') as ColorId;
  const occasionId: OccasionId = (lookState.occasion || 'festival') as OccasionId;
  const styleId: StyleId = (lookState.style || 'traditional') as StyleId;
  const accessoryIds: string[] = lookState.accessories || [];

  const hairstyleObj =
    gender === 'male'
      ? getMaleHairstyleById(lookState.hairstyle || DEFAULT_MALE_HAIRSTYLE)
      : getFemaleHairstyleById(lookState.hairstyle || DEFAULT_FEMALE_HAIRSTYLE);
  const hairstyleId = hairstyleObj.id as HairstyleId;

  const outfit = OUTFITS_DATA.find((o) => o.id === outfitId) || OUTFITS_DATA[0];
  const occasion = OCCASIONS_DATA.find((o) => o.id === occasionId) || OCCASIONS_DATA[0];
  const style = STYLES_DATA.find((s) => s.id === styleId) || STYLES_DATA[0];
  const color = COLORS_DATA.find((c) => c.id === colorId) || COLORS_DATA[0];
  const skinToneObj = SKIN_TONES_DATA.find((s) => s.id === skinTone) || SKIN_TONES_DATA[1];

  const equippedAccessories = ACCESSORIES_DATA.filter((a) => accessoryIds.includes(a.id));
  const accessoriesLabel =
    equippedAccessories.length > 0
      ? equippedAccessories.map((a) => a.name).join(' · ')
      : 'Tối giản (Không phụ kiện)';

  const cultureCheck = evaluateCultureCheck({
    outfitId,
    occasionId,
    styleId,
    colorId,
    accessoryIds
  });

  const colorHarmony = evaluateColorHarmony({
    skinTone,
    colorId,
    outfitId,
    accessories: accessoryIds
  });

  const theme = CARD_THEMES[themeId];
  const displayTitle = customTitle || outfit.vietnameseName || outfit.name;
  const hashtags = '#VietPhucRemix #CoPhucVietNam #MacVietTheoCachCuaBan #GenZHeritage';

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  /**
   * Renders the complete high-resolution Social Share Card onto an HTML5 Canvas
   * by serializing the live 3D Character SVG and drawing crisp editorial graphics.
   */
  const generateCardCanvasBlob = async (): Promise<Blob | null> => {
    const svgEl = characterContainerRef.current?.querySelector('svg');
    if (!svgEl) return null;

    const width = 1080;
    const height =
      aspectRatio === '9:16' ? 1920 : aspectRatio === '4:5' ? 1350 : 1080;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 1. Background Linear Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, theme.bgStart);
    bgGrad.addColorStop(0.55, theme.bgMiddle);
    bgGrad.addColorStop(1, theme.bgEnd);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Traditional Silk Dot Pattern
    ctx.fillStyle = theme.isDark ? 'rgba(212, 175, 55, 0.05)' : 'rgba(153, 27, 30, 0.04)';
    const gridStep = 36;
    for (let x = 36; x < width - 36; x += gridStep) {
      for (let y = 36; y < height - 36; y += gridStep) {
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3. Center Radial Spotlight Halo behind Character
    const charCenterY =
      aspectRatio === '9:16' ? height * 0.45 : aspectRatio === '4:5' ? height * 0.46 : height * 0.46;
    const haloRadius = aspectRatio === '1:1' ? 340 : 420;
    const radialGrad = ctx.createRadialGradient(
      width / 2,
      charCenterY,
      20,
      width / 2,
      charCenterY,
      haloRadius
    );
    radialGrad.addColorStop(0, theme.haloColor);
    radialGrad.addColorStop(0.6, theme.isDark ? 'rgba(200,151,62,0.06)' : 'rgba(255,253,249,0.5)');
    radialGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radialGrad;
    ctx.beginPath();
    ctx.arc(width / 2, charCenterY, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    // 4. Double Heritage Frame Borders & Corner Triện Motifs
    const outerPad = 34;
    const innerPad = 46;
    ctx.strokeStyle = theme.borderOuter;
    ctx.lineWidth = 3;
    ctx.strokeRect(outerPad, outerPad, width - outerPad * 2, height - outerPad * 2);

    ctx.strokeStyle = theme.borderInner;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(innerPad, innerPad, width - innerPad * 2, height - innerPad * 2);

    // Draw Traditional Corner Fretwork (Góc Triện Cổ)
    const drawCornerMotif = (cx: number, cy: number, sx: number, sy: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(sx, sy);
      ctx.strokeStyle = theme.cornerOrnament;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, 36);
      ctx.lineTo(0, 0);
      ctx.lineTo(36, 0);
      ctx.moveTo(8, 24);
      ctx.lineTo(8, 8);
      ctx.lineTo(24, 8);
      ctx.lineTo(24, 16);
      ctx.lineTo(16, 16);
      ctx.stroke();
      ctx.restore();
    };
    drawCornerMotif(innerPad + 8, innerPad + 8, 1, 1);
    drawCornerMotif(width - innerPad - 8, innerPad + 8, -1, 1);
    drawCornerMotif(innerPad + 8, height - innerPad - 8, 1, -1);
    drawCornerMotif(width - innerPad - 8, height - innerPad - 8, -1, -1);

    // 5. Top Editorial Header
    const topY = aspectRatio === '9:16' ? 105 : 88;
    ctx.textAlign = 'center';
    ctx.fillStyle = theme.accentPrimary;
    ctx.font = '700 19px sans-serif';
    ctx.fillText('VIỆT PHỤC REMIX STUDIO  •  HERITAGE LOOKBOOK', width / 2, topY);

    // Outfit Era & Occasion Kicker
    ctx.fillStyle = theme.textMuted;
    ctx.font = '500 20px sans-serif';
    ctx.fillText(
      `${outfit.era}  ·  ${occasion.name} (${occasion.nameVi.split('&')[0].trim()})  ·  ${style.nameVi}`,
      width / 2,
      topY + 34
    );

    // Main Outfit Title
    ctx.fillStyle = theme.textPrimary;
    ctx.font = '700 46px Georgia, serif';
    ctx.fillText(displayTitle.toUpperCase(), width / 2, topY + 90);

    // Decorative Gold Divider under Title
    ctx.strokeStyle = theme.accentGold;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 140, topY + 112);
    ctx.lineTo(width / 2 + 140, topY + 112);
    ctx.stroke();
    ctx.fillStyle = theme.accentGold;
    ctx.beginPath();
    ctx.arc(width / 2, topY + 112, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // 6. Calculate Bottom Spec Sheet & Quote Box coordinates first so Character fits 100% cleanly
    const footerBottom = height - innerPad - 26;
    const specBoxHeight = showSpecs ? (aspectRatio === '1:1' ? 138 : 172) : 84;
    const specBoxY = footerBottom - specBoxHeight - (aspectRatio === '1:1' ? 34 : 42);
    const specBoxX = innerPad + 34;
    const specBoxW = width - (innerPad + 34) * 2;
    const headerBottom = topY + 116;

    // Serialize and Draw the Live 3D Character SVG (Full Model Visible)
    const clonedSvg = svgEl.cloneNode(true) as SVGSVGElement;
    clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clonedSvg.setAttribute('viewBox', '-8 -6 256 392');
    clonedSvg.setAttribute('width', '512');
    clonedSvg.setAttribute('height', '784');

    const svgString = new XMLSerializer().serializeToString(clonedSvg);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const availH = Math.max(360, specBoxY - headerBottom - 16);
        const maxDesiredH =
          aspectRatio === '9:16' ? 1080 : aspectRatio === '4:5' ? 790 : 630;
        const charH = Math.min(availH, maxDesiredH);
        const charW = (charH * 256) / 392;
        const charX = (width - charW) / 2;
        const charY = headerBottom + (specBoxY - headerBottom - charH) / 2;

        // Subtle drop shadow under character
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
        ctx.shadowBlur = 28;
        ctx.shadowOffsetY = 14;
        ctx.drawImage(img, charX, charY, charW, charH);
        ctx.restore();

        URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      img.src = url;
    });

    // 7. Traditional Red Seal Stamp (Ấn Chương Di Sản) on Top-Right of Character
    if (showScores) {
      const sealX = width - 155;
      const sealY = topY + 175;
      ctx.save();
      ctx.fillStyle = 'rgba(153, 27, 30, 0.92)';
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(sealX - 62, sealY - 48, 124, 96, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FAF7F2';
      ctx.textAlign = 'center';
      ctx.font = '700 14px sans-serif';
      ctx.fillText('CHUẨN VĂN HÓA', sealX, sealY - 20);
      ctx.font = '700 28px Georgia, serif';
      ctx.fillStyle = '#F3C66F';
      ctx.fillText(`${cultureCheck.indicatorScore}/10`, sealX, sealY + 12);
      ctx.font = '600 13px sans-serif';
      ctx.fillStyle = '#FAF7F2';
      ctx.fillText(`Hòa sắc ${colorHarmony.harmonyScore}/10`, sealX, sealY + 34);
      ctx.restore();
    }

    // 8. Draw Bottom Spec Sheet & Quote Box

    ctx.save();
    ctx.fillStyle = theme.panelBg;
    ctx.strokeStyle = theme.panelBorder;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(specBoxX, specBoxY, specBoxW, specBoxHeight, 20);
    ctx.fill();
    ctx.stroke();

    // Quote text inside panel top
    ctx.textAlign = 'center';
    ctx.fillStyle = theme.textSecondary;
    ctx.font = 'italic 21px Georgia, serif';
    const trimmedQuote =
      quoteText.length > 78 ? `${quoteText.slice(0, 75)}...` : quoteText;
    ctx.fillText(`“${trimmedQuote}”`, width / 2, specBoxY + 38);

    if (showSpecs) {
      // Divider inside spec box
      ctx.strokeStyle = theme.panelBorder;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(specBoxX + 32, specBoxY + 56);
      ctx.lineTo(specBoxX + specBoxW - 32, specBoxY + 56);
      ctx.stroke();

      // 4 Columns of Outfit Metadata
      const cols = [
        {
          label: 'NGƯỜI MẪU & TÓC',
          value: `${gender === 'male' ? 'Nam' : 'Nữ'} · ${hairstyleObj.name}`
        },
        {
          label: 'MÀU CHỦ ĐẠO',
          value: color.nameVi.split('/')[0].trim(),
          swatch: color.hex
        },
        {
          label: 'TÔNG DA',
          value: skinToneObj.nameVi.split('/')[0].trim(),
          swatch: skinToneObj.sampleHex
        },
        {
          label: 'PHỤ KIỆN PHỐI',
          value:
            equippedAccessories.length > 0
              ? `${equippedAccessories.length} món đi kèm`
              : 'Tối giản'
        }
      ];

      const colW = specBoxW / cols.length;
      cols.forEach((col, idx) => {
        const cx = specBoxX + colW * idx + colW / 2;
        ctx.textAlign = 'center';
        ctx.fillStyle = theme.accentGold;
        ctx.font = '700 14px sans-serif';
        ctx.fillText(col.label, cx, specBoxY + 88);

        ctx.fillStyle = theme.textPrimary;
        ctx.font = '700 19px Georgia, serif';
        if (col.swatch) {
          const textW = ctx.measureText(col.value).width;
          const totalW = textW + 24;
          const startX = cx - totalW / 2;
          ctx.save();
          ctx.fillStyle = col.swatch;
          ctx.strokeStyle = 'rgba(0,0,0,0.25)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(startX + 8, specBoxY + 114, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
          ctx.textAlign = 'left';
          ctx.fillText(col.value, startX + 24, specBoxY + 120);
        } else {
          ctx.fillText(col.value, cx, specBoxY + 120);
        }
      });

      if (aspectRatio !== '1:1') {
        ctx.textAlign = 'center';
        ctx.fillStyle = theme.textMuted;
        ctx.font = '500 16px sans-serif';
        ctx.fillText(
          `Phụ kiện: ${accessoriesLabel}`,
          width / 2,
          specBoxY + 154
        );
      }
    }
    ctx.restore();

    // 9. Bottom Signature & Hashtags Bar
    ctx.textAlign = 'left';
    ctx.fillStyle = theme.textSecondary;
    ctx.font = '700 18px sans-serif';
    const creatorLabel = creatorName.trim()
      ? `Thiết kế bởi: ${creatorName.trim()}`
      : 'Thiết kế tại Việt Phục Remix Studio';
    ctx.fillText(creatorLabel, specBoxX, footerBottom);

    ctx.textAlign = 'right';
    ctx.fillStyle = theme.accentPrimary;
    ctx.font = '600 17px sans-serif';
    ctx.fillText('#VietPhucRemix  #MacVietTheoCachCuaBan', specBoxX + specBoxW, footerBottom);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
    });
  };

  // Download High-Res PNG Card
  const handleDownloadCard = async () => {
    setIsExporting(true);
    try {
      const blob = await generateCardCanvasBlob();
      if (!blob) {
        triggerToast('Không thể khởi tạo ảnh. Vui lòng thử lại.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const safeName = outfit.id.replace(/[^a-z0-9-]/gi, '-');
      link.download = `viet-phuc-remix-${safeName}-${aspectRatio.replace(':', 'x')}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerToast('Đã tải thẻ ảnh Việt Phục (PNG chuẩn HD) về máy!');
    } finally {
      setIsExporting(false);
    }
  };

  // Copy Card Image directly to Clipboard
  const handleCopyCardImage = async () => {
    setIsExporting(true);
    try {
      const blob = await generateCardCanvasBlob();
      if (!blob) return;
      if (navigator.clipboard && 'write' in navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        triggerToast('Đã sao chép thẻ ảnh! Bạn có thể dán (Ctrl+V) ngay lên mạng xã hội.');
      } else {
        await handleDownloadCard();
      }
    } catch {
      await handleDownloadCard();
    } finally {
      setIsExporting(false);
    }
  };

  // Native Web Share API (with file attachment if supported) or Copy Caption
  const handleNativeShare = async () => {
    setIsExporting(true);
    try {
      const blob = await generateCardCanvasBlob();
      const shareCaption = `${displayTitle} (${occasion.name} × ${style.nameVi}) — “${quoteText}” ${hashtags}`;

      if (blob && navigator.share) {
        const file = new File([blob], `viet-phuc-remix-${outfit.id}.png`, {
          type: 'image/png'
        });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Việt Phục Remix — ${displayTitle}`,
            text: shareCaption,
            files: [file]
          });
          triggerToast('Đã mở bảng chia sẻ mạng xã hội!');
          return;
        }
        await navigator.share({
          title: `Việt Phục Remix — ${displayTitle}`,
          text: shareCaption,
          url: window.location.href
        });
        return;
      }

      await navigator.clipboard.writeText(`${shareCaption}\n${window.location.href}`);
      triggerToast('Đã sao chép Caption & Link chia sẻ vào bộ nhớ tạm!');
    } catch {
      // User cancelled share sheet or fallback
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyCaption = async () => {
    const shareCaption = `✨ ${displayTitle.toUpperCase()} ✨\n• Việt phục: ${outfit.name} (${outfit.era})\n• Người mẫu: ${gender === 'male' ? 'Nam' : 'Nữ'} (${hairstyleObj.name})\n• Sắc phục: ${color.nameVi} | Phong cách: ${style.nameVi}\n• Điểm chuẩn văn hóa: ${cultureCheck.indicatorScore}/10\n“${quoteText}”\n${hashtags}`;
    await navigator.clipboard.writeText(shareCaption);
    triggerToast('Đã sao chép Caption chuẩn mạng xã hội!');
  };

  // Aspect ratio preview classes
  const previewAspectClass =
    aspectRatio === '9:16'
      ? 'aspect-[9/16] max-w-[310px] sm:max-w-[330px]'
      : aspectRatio === '4:5'
      ? 'aspect-[4/5] max-w-[360px] sm:max-w-[390px]'
      : 'aspect-square max-w-[360px] sm:max-w-[390px]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Floating Toast inside Modal */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-60 bg-[#1C1917] text-[#FAF7F2] border border-[#C8973E] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-medium animate-in slide-in-from-bottom-4">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div
        className="relative w-full max-w-5xl max-h-[94vh] overflow-y-auto rounded-3xl bg-[#FAF7F2] border border-[#D8C7B2] shadow-2xl flex flex-col lg:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng cửa sổ xuất thẻ ảnh"
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/85 hover:bg-white text-[#4A3B32] border border-[#DECBB3] shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ===================================================================
            LEFT COLUMN: LIVE SOCIAL SHARE CARD PREVIEW
           =================================================================== */}
        <div className="w-full lg:w-[52%] bg-[#EFE6D8]/75 p-5 sm:p-7 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[#DECBB3]/80">
          <div className="w-full flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#991B1E] flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Xem Trước Thẻ Chia Sẻ</span>
            </span>
            <span className="text-[11px] font-medium text-[#68584B]">
              Độ phân giải xuất: {aspectRatio === '9:16' ? '1080 × 1920' : aspectRatio === '4:5' ? '1080 × 1350' : '1080 × 1080'} px
            </span>
          </div>

          {/* THE SOCIAL CARD ARTBOARD */}
          <div
            className={`relative w-full ${previewAspectClass} rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(28,25,23,0.25)] transition-all duration-300 flex flex-col justify-between p-3.5 sm:p-4 select-none`}
            style={{
              background: `linear-gradient(180deg, ${theme.bgStart} 0%, ${theme.bgMiddle} 55%, ${theme.bgEnd} 100%)`,
              color: theme.textPrimary
            }}
          >
            {/* Outer & Inner Heritage Frame Borders */}
            <div
              className="absolute inset-2 pointer-events-none rounded-xl"
              style={{ border: `2px solid ${theme.borderOuter}` }}
            />
            <div
              className="absolute inset-3 pointer-events-none rounded-lg"
              style={{ border: `1px solid ${theme.borderInner}` }}
            />

            {/* Traditional Corner Ornaments (4 Corners) */}
            <svg
              viewBox="0 0 24 24"
              className="absolute top-3.5 left-3.5 w-4 h-4 pointer-events-none"
              fill="none"
            >
              <path d="M1 16V1H16M5 11V5H11" stroke={theme.cornerOrnament} strokeWidth="1.8" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="absolute top-3.5 right-3.5 w-4 h-4 pointer-events-none scale-x-[-1]"
              fill="none"
            >
              <path d="M1 16V1H16M5 11V5H11" stroke={theme.cornerOrnament} strokeWidth="1.8" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="absolute bottom-3.5 left-3.5 w-4 h-4 pointer-events-none scale-y-[-1]"
              fill="none"
            >
              <path d="M1 16V1H16M5 11V5H11" stroke={theme.cornerOrnament} strokeWidth="1.8" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="absolute bottom-3.5 right-3.5 w-4 h-4 pointer-events-none scale-[-1]"
              fill="none"
            >
              <path d="M1 16V1H16M5 11V5H11" stroke={theme.cornerOrnament} strokeWidth="1.8" />
            </svg>

            {/* Card Top Header */}
            <div className="relative z-10 text-center pt-1 shrink-0 space-y-0.5">
              <div
                className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.22em]"
                style={{ color: theme.accentPrimary }}
              >
                VIỆT PHỤC REMIX STUDIO • HERITAGE LOOKBOOK
              </div>
              <div
                className="text-[9px] sm:text-[10px] font-medium truncate px-3"
                style={{ color: theme.textMuted }}
              >
                {outfit.era} · {occasion.name} · {style.nameVi}
              </div>
              <h4
                className="font-serif text-sm sm:text-base font-bold tracking-wide uppercase truncate px-2 leading-tight"
                style={{ color: theme.textPrimary }}
              >
                {displayTitle}
              </h4>
              <div className="flex items-center justify-center gap-1.5 pt-0.5">
                <span className="w-10 h-[1px]" style={{ backgroundColor: theme.accentGold }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accentGold }} />
                <span className="w-10 h-[1px]" style={{ backgroundColor: theme.accentGold }} />
              </div>
            </div>

            {/* Card Center: Live 3D Character Model & Cultural Stamp (Full Model Visible) */}
            <div className="relative z-10 flex-1 w-full min-h-0 flex items-center justify-center my-1 overflow-visible">
              {/* Radial Spotlight */}
              <div
                className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full blur-2xl pointer-events-none"
                style={{ background: theme.haloColor }}
              />

              {/* Character Render Container (Used for SVG Serialization & Responsive Fit) */}
              <div
                ref={characterContainerRef}
                className="relative w-full h-full max-h-full min-h-0 flex items-center justify-center py-0.5"
              >
                <Stylized3DCharacter
                  gender={gender}
                  skinTone={skinTone}
                  hairstyle={hairstyleId}
                  outfitId={outfitId}
                  colorId={colorId}
                  accessories={accessoryIds}
                  fitContainer
                />
              </div>

              {/* Traditional Red Seal Stamp (Ấn Chương Di Sản) */}
              {showScores && (
                <div
                  className="absolute top-1 right-2 z-20 rounded-xl px-2 py-1 text-center shadow-md border"
                  style={{
                    backgroundColor: 'rgba(153, 27, 30, 0.92)',
                    borderColor: '#D4AF37',
                    color: '#FAF7F2'
                  }}
                >
                  <span className="block text-[7px] font-bold uppercase tracking-widest text-[#F5EFE6]">
                    Chuẩn Văn Hóa
                  </span>
                  <span className="font-serif text-xs sm:text-sm font-bold text-[#F3C66F] block leading-tight">
                    {cultureCheck.indicatorScore}/10
                  </span>
                  <span className="block text-[7px] font-medium text-[#FAF7F2]/90">
                    Hòa sắc {colorHarmony.harmonyScore}/10
                  </span>
                </div>
              )}
            </div>

            {/* Card Bottom: Quote & Spec Summary Box */}
            <div className="relative z-10 shrink-0 space-y-1 pb-0.5">
              <div
                className="rounded-xl p-2 backdrop-blur-xs border transition-all space-y-1"
                style={{
                  backgroundColor: theme.panelBg,
                  borderColor: theme.panelBorder
                }}
              >
                <p
                  className="font-serif italic text-[9px] sm:text-[10px] text-center leading-snug line-clamp-1"
                  style={{ color: theme.textSecondary }}
                >
                  “{quoteText}”
                </p>

                {showSpecs && (
                  <div
                    className="pt-1 border-t grid grid-cols-4 gap-1 text-center"
                    style={{ borderColor: theme.panelBorder }}
                  >
                    <div>
                      <span
                        className="block text-[7px] font-bold uppercase tracking-wider"
                        style={{ color: theme.accentGold }}
                      >
                        Mẫu & Tóc
                      </span>
                      <span
                        className="block font-serif text-[9px] font-bold truncate"
                        style={{ color: theme.textPrimary }}
                      >
                        {gender === 'male' ? 'Nam' : 'Nữ'} · {hairstyleObj.name}
                      </span>
                    </div>

                    <div>
                      <span
                        className="block text-[7px] font-bold uppercase tracking-wider"
                        style={{ color: theme.accentGold }}
                      >
                        Sắc Phục
                      </span>
                      <span
                        className="font-serif text-[9px] font-bold flex items-center justify-center gap-1 truncate"
                        style={{ color: theme.textPrimary }}
                      >
                        <span
                          className="w-2 h-2 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="truncate">{color.nameVi.split('/')[0]}</span>
                      </span>
                    </div>

                    <div>
                      <span
                        className="block text-[7px] font-bold uppercase tracking-wider"
                        style={{ color: theme.accentGold }}
                      >
                        Tông Da
                      </span>
                      <span
                        className="font-serif text-[9px] font-bold flex items-center justify-center gap-1 truncate"
                        style={{ color: theme.textPrimary }}
                      >
                        <span
                          className="w-2 h-2 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: skinToneObj.sampleHex }}
                        />
                        <span className="truncate">{skinToneObj.nameVi.split('/')[0]}</span>
                      </span>
                    </div>

                    <div>
                      <span
                        className="block text-[7px] font-bold uppercase tracking-wider"
                        style={{ color: theme.accentGold }}
                      >
                        Phụ Kiện
                      </span>
                      <span
                        className="block font-serif text-[9px] font-bold truncate"
                        style={{ color: theme.textPrimary }}
                      >
                        {equippedAccessories.length > 0
                          ? `${equippedAccessories.length} món`
                          : 'Tối giản'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Signature & Hashtags */}
              <div className="flex items-center justify-between px-1.5 text-[8px] sm:text-[9px] font-semibold">
                <span className="truncate max-w-[48%]" style={{ color: theme.textSecondary }}>
                  {creatorName.trim() ? `Bởi ${creatorName.trim()}` : 'Việt Phục Remix Studio'}
                </span>
                <span className="truncate" style={{ color: theme.accentPrimary }}>
                  #VietPhucRemix #CoPhucViet
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            RIGHT COLUMN: CARD CUSTOMIZATION & SOCIAL EXPORT ACTIONS
           =================================================================== */}
        <div className="w-full lg:w-[48%] p-5 sm:p-7 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#991B1E] block">
                XUẤT THẺ HÌNH ẢNH & CHIA SẺ
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] mt-0.5">
                Thẻ Phối Đồ Mạng Xã Hội
              </h3>
              <p className="text-xs text-[#68584B] mt-1 leading-relaxed">
                Tùy chỉnh khung hình, chủ đề nghệ thuật và chữ ký cá nhân để tải ảnh chất lượng cao (1080p) sẵn sàng đăng lên Instagram, Facebook, TikTok hoặc Zalo.
              </p>
            </div>

            {/* 1. Aspect Ratio Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#991B1E]" />
                <span>1. Định dạng khung hình mạng xã hội</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAspectRatio('4:5')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    aspectRatio === '4:5'
                      ? 'bg-white border-[#991B1E] text-[#991B1E] shadow-xs ring-1 ring-[#991B1E]/25'
                      : 'bg-white/60 border-[#DECBB3] text-[#4A3B32] hover:bg-white'
                  }`}
                >
                  <RectangleVertical className="w-4 h-4 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">4:5 Feed</div>
                    <div className="text-[10px] text-[#7A695B] truncate">IG / FB Post</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('9:16')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    aspectRatio === '9:16'
                      ? 'bg-white border-[#991B1E] text-[#991B1E] shadow-xs ring-1 ring-[#991B1E]/25'
                      : 'bg-white/60 border-[#DECBB3] text-[#4A3B32] hover:bg-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">9:16 Story</div>
                    <div className="text-[10px] text-[#7A695B] truncate">TikTok / Reels</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('1:1')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    aspectRatio === '1:1'
                      ? 'bg-white border-[#991B1E] text-[#991B1E] shadow-xs ring-1 ring-[#991B1E]/25'
                      : 'bg-white/60 border-[#DECBB3] text-[#4A3B32] hover:bg-white'
                  }`}
                >
                  <Square className="w-4 h-4 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">1:1 Vuông</div>
                    <div className="text-[10px] text-[#7A695B] truncate">Avatar / Đa nền tảng</div>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Card Aesthetic Theme Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#C8973E]" />
                <span>2. Chủ đề thẻ di sản (Card Theme)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.values(CARD_THEMES) as CardThemeConfig[]).map((t) => {
                  const active = themeId === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setThemeId(t.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        active
                          ? 'bg-white border-[#991B1E] shadow-xs ring-1 ring-[#991B1E]/25'
                          : 'bg-white/60 border-[#DECBB3] hover:bg-white'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border shrink-0 shadow-2xs"
                        style={{
                          background: `linear-gradient(135deg, ${t.bgStart} 45%, ${t.borderOuter} 100%)`,
                          borderColor: t.borderInner
                        }}
                      />
                      <div className="min-w-0">
                        <div className={`text-xs font-bold truncate ${active ? 'text-[#991B1E]' : 'text-[#1C1917]'}`}>
                          {t.name}
                        </div>
                        <div className="text-[10px] text-[#7A695B] truncate">
                          {t.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Personalization: Creator Name & Quote */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-[#991B1E]" />
                <span>3. Chữ ký & Thông điệp trên thẻ</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="Tên / @Handle của bạn (tùy chọn)"
                    maxLength={32}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8C7B2] focus:border-[#991B1E] focus:outline-none text-xs text-[#1C1917]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowScores(!showScores)}
                    className={`flex-1 py-2 px-2.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      showScores
                        ? 'bg-[#991B1E]/10 border-[#991B1E] text-[#991B1E]'
                        : 'bg-white/60 border-[#DECBB3] text-[#68584B]'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Ấn chương điểm</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSpecs(!showSpecs)}
                    className={`flex-1 py-2 px-2.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      showSpecs
                        ? 'bg-[#991B1E]/10 border-[#991B1E] text-[#991B1E]'
                        : 'bg-white/60 border-[#DECBB3] text-[#68584B]'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Thông số phối</span>
                  </button>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  placeholder="Nhập câu trích dẫn hoặc cảm hứng phối đồ..."
                  maxLength={90}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8C7B2] focus:border-[#991B1E] focus:outline-none text-xs text-[#1C1917]"
                />
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  <span className="text-[10px] text-[#7A695B] font-semibold">Gợi ý nhanh:</span>
                  {PRESET_QUOTES.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuoteText(q)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#EFE6D8] hover:bg-[#E2D4C0] text-[#4A3B32] transition-colors cursor-pointer"
                    >
                      Mẫu {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Primary Export & Social Share Actions */}
          <div className="pt-3 border-t border-[#E2D4C0] space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                disabled={isExporting}
                onClick={handleDownloadCard}
                className="w-full py-3 px-4 rounded-xl bg-[#991B1E] hover:bg-[#781316] disabled:opacity-60 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#F3C66F]" />
                <span>{isExporting ? 'Đang kết xuất...' : 'Tải Ảnh Thẻ (PNG HD)'}</span>
              </button>

              <button
                type="button"
                disabled={isExporting}
                onClick={handleCopyCardImage}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#991B1E] text-[#991B1E] text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>Sao Chép Ảnh Thẻ</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleNativeShare}
                className="py-2.5 px-3 rounded-xl bg-[#EFE6D8]/90 hover:bg-[#E5D8C5] text-[#1C1917] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#991B1E]" />
                <span>Chia Sẻ Nhanh (App)</span>
              </button>

              <button
                type="button"
                onClick={handleCopyCaption}
                className="py-2.5 px-3 rounded-xl bg-[#EFE6D8]/90 hover:bg-[#E5D8C5] text-[#1C1917] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
                <span>Copy Caption & Hashtag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
