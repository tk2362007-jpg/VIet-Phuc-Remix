import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'banner';
  badge?: string;
  fallbackText?: string;
  commentPath?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'portrait',
  badge,
  fallbackText,
  commentPath
}) => {
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    banner: 'aspect-[16/9]'
  }[aspectRatio];

  if (src && !hasError) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-[#F0EAE1] ${aspectClass} ${className}`}>
        {/*
          Để thay thế hình ảnh bằng ảnh thực tế của bạn:
          Đặt file ảnh vào thư mục public/images và cập nhật đường dẫn:
          ${commentPath || src}
        */}
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          loading="lazy"
        />
        {badge && (
          <span className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-md text-[#1C1917] text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
            {badge}
          </span>
        )}
      </div>
    );
  }

  // Graceful visual editorial placeholder when real asset is missing
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-[#F7F2E9] to-[#ECE2D0] border border-[#E6DBCA] p-6 flex flex-col justify-between ${aspectClass} ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 bg-[#991B1E]/10 text-[#991B1E] text-xs font-medium px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3" />
          {badge || 'Việt Phục Remix'}
        </span>
        <ImageIcon className="w-5 h-5 text-[#8C7A6B]/50" />
      </div>

      <div className="text-center my-auto py-4">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#E3D5C0] flex items-center justify-center text-[#991B1E] shadow-inner">
          <span className="font-serif text-2xl font-bold">VP</span>
        </div>
        <h4 className="font-serif text-lg font-bold text-[#2D241E] leading-snug">{alt}</h4>
        <p className="text-xs text-[#6B5E53] mt-1 line-clamp-2">
          {fallbackText || 'Trang phục truyền thống phối theo tinh thần Gen Z'}
        </p>
      </div>

      <div className="text-[11px] text-[#8C7A6B] text-center border-t border-[#DECDB8] pt-2">
        <code>{commentPath || 'Thay ảnh tại: /public/images/...'}</code>
      </div>
    </div>
  );
};
