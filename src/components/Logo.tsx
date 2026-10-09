import React, { useId } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = false
}) => {
  const uniqueId = useId().replace(/:/g, '');

  const sizeClasses = {
    sm: 'h-8 sm:h-9 w-auto',
    md: 'h-11 sm:h-12 w-auto',
    lg: 'h-14 sm:h-16 w-auto',
    xl: 'h-20 sm:h-24 w-auto'
  };

  const gGreenOuter = `g-go-${uniqueId}`;
  const gGreenInner = `g-gi-${uniqueId}`;
  const gGreenSkirtLeft = `g-gsl-${uniqueId}`;
  const gGreenSkirtCenter = `g-gsc-${uniqueId}`;
  const gGreenGold = `g-gg-${uniqueId}`;
  const gPinkCollar = `g-pc-${uniqueId}`;
  const gPinkUpper = `g-pu-${uniqueId}`;
  const gPinkSkirtLeft = `g-psl-${uniqueId}`;
  const gPinkSkirtRight = `g-psr-${uniqueId}`;
  const gGoldSleeve = `g-gs-${uniqueId}`;
  const gGoldTorso = `g-gt-${uniqueId}`;
  const gGoldSkirt = `g-gsk-${uniqueId}`;
  const filterShadow = `f-sh-${uniqueId}`;

  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${className}`}
      aria-label="Logo Việt Phục Remix - Dáng áo dài dải lụa ribbon"
    >
      <svg
        viewBox="0 0 400 440"
        className={`${sizeClasses[size]} drop-shadow-xs transition-transform duration-300 group-hover:scale-105 shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ aspectRatio: '400 / 440' }}
        role="img"
      >
        <defs>
          {/* Green Gradients */}
          <linearGradient id={gGreenOuter} x1="190" y1="65" x2="130" y2="225" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="25%" stopColor="#22C55E" />
            <stop offset="65%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#0F5132" />
          </linearGradient>

          <linearGradient id={gGreenInner} x1="150" y1="100" x2="190" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#0F766E" />
          </linearGradient>

          <linearGradient id={gGreenSkirtLeft} x1="170" y1="200" x2="150" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="40%" stopColor="#0D9488" />
            <stop offset="75%" stopColor="#0F766E" />
            <stop offset="100%" stopColor="#115E59" />
          </linearGradient>

          <linearGradient id={gGreenSkirtCenter} x1="180" y1="210" x2="196" y2="395" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="35%" stopColor="#10B981" />
            <stop offset="70%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id={gGreenGold} x1="190" y1="230" x2="230" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="30%" stopColor="#34D399" />
            <stop offset="65%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>

          {/* Pink Gradients */}
          <linearGradient id={gPinkCollar} x1="200" y1="65" x2="215" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>

          <linearGradient id={gPinkUpper} x1="220" y1="80" x2="175" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="35%" stopColor="#F43F5E" />
            <stop offset="75%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>

          <linearGradient id={gPinkSkirtLeft} x1="185" y1="200" x2="120" y2="355" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E11D48" />
            <stop offset="50%" stopColor="#F472B6" />
            <stop offset="85%" stopColor="#FDA4AF" />
            <stop offset="100%" stopColor="#FFF1F2" />
          </linearGradient>

          <linearGradient id={gPinkSkirtRight} x1="210" y1="240" x2="255" y2="370" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#BE185D" />
            <stop offset="40%" stopColor="#E11D48" />
            <stop offset="75%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#FCE7F3" />
          </linearGradient>

          {/* Gold Gradients */}
          <linearGradient id={gGoldSleeve} x1="210" y1="75" x2="280" y2="225" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="30%" stopColor="#F59E0B" />
            <stop offset="65%" stopColor="#EAB308" />
            <stop offset="85%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <linearGradient id={gGoldTorso} x1="215" y1="120" x2="235" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>

          <linearGradient id={gGoldSkirt} x1="210" y1="180" x2="295" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#CA8A04" />
            <stop offset="90%" stopColor="#A16207" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <filter id={filterShadow} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodOpacity={0.12} />
          </filter>
        </defs>

        <g filter={`url(#${filterShadow})`}>
          {/* 1. MANDARIN COLLAR */}
          <path
            d="M 194,86 C 190,78 192,69 196,67 C 198,66 200,69 201,75 C 201,81 198,85 194,86 Z"
            fill={`url(#${gGreenOuter})`}
          />
          <path
            d="M 201,75 C 203,68 205,66 208,67 C 211,68 211,76 206,84 C 203,82 201,79 201,75 Z"
            fill={`url(#${gPinkCollar})`}
          />

          {/* 2. LEFT SLEEVE (EMERALD JADE GREEN RIBBON) */}
          <path
            d="M 194,86 C 184,91 172,100 163,113 C 151,132 141,158 133,191 C 129,207 126,219 124,221 C 125,222 134,216 142,205 C 145,194 151,171 157,148 C 163,126 172,108 182,96 C 187,91 191,88 194,86 Z"
            fill={`url(#${gGreenOuter})`}
          />
          <path
            d="M 124,221 C 127,223 134,217 142,205 C 140,210 132,220 124,221 Z"
            fill="#064E3B"
            opacity={0.6}
          />

          {/* 3. RIGHT SLEEVE (IMPERIAL GOLD RIBBON) */}
          <path
            d="M 206,84 C 216,91 228,100 237,113 C 249,132 259,158 267,191 C 271,207 274,219 276,221 C 275,222 266,216 258,205 C 255,194 249,171 243,148 C 237,126 228,108 218,96 C 213,91 209,88 206,84 Z"
            fill={`url(#${gGoldSleeve})`}
          />
          <path
            d="M 276,221 C 273,223 266,217 258,205 C 260,210 268,220 276,221 Z"
            fill="#78350F"
            opacity={0.5}
          />

          {/* 4. UPPER TORSO GREEN ACCENT */}
          <path
            d="M 188,97 C 179,112 174,130 174,151 C 174,169 178,184 182,196 C 186,191 190,180 190,166 C 190,146 193,124 200,106 C 195,102 191,99 188,97 Z"
            fill={`url(#${gGreenInner})`}
          />

          {/* 5. UPPER TORSO GOLD ACCENT */}
          <path
            d="M 212,101 C 219,117 222,139 222,160 C 222,178 219,193 214,203 C 212,198 210,187 210,173 C 210,151 208,128 203,110 C 206,106 209,103 212,101 Z"
            fill={`url(#${gGoldTorso})`}
          />

          {/* 6. CENTER SPIRAL LOTUS-PINK RIBBON */}
          <path
            d="M 204,83 C 212,94 218,112 216,130 C 214,148 206,164 198,178 C 190,192 184,207 186,225 C 187,239 195,254 203,268 C 210,279 214,292 216,308 C 219,299 218,284 211,270 C 203,254 197,241 195,229 C 194,214 200,200 208,185 C 218,169 227,150 227,128 C 227,108 219,92 209,81 C 206,82 205,82 204,83 Z"
            fill={`url(#${gPinkUpper})`}
          />
          {/* Subtle silk highlight on pink curve */}
          <path
            d="M 211,101 C 216,115 216,130 211,146 C 206,160 198,175 192,189 C 190,185 195,173 200,160 C 205,146 210,128 209,113 C 209,108 210,103 211,101 Z"
            fill="#FFFFFF"
            opacity={0.35}
          />

          {/* 7. SKIRT PANELS (TÀ ÁO DÀI BẬT XÒE) */}
          {/* Left Pink Petal */}
          <path
            d="M 184,202 C 174,220 160,243 150,270 C 141,297 134,322 126,344 C 134,342 146,328 155,308 C 165,286 174,259 181,234 C 184,220 185,209 184,202 Z"
            fill={`url(#${gPinkSkirtLeft})`}
          />

          {/* Left Green Ribbon Panel */}
          <path
            d="M 181,198 C 174,220 166,250 158,283 C 150,317 144,351 142,376 C 147,372 155,355 163,328 C 171,299 178,265 182,234 C 184,220 183,207 181,198 Z"
            fill={`url(#${gGreenSkirtLeft})`}
          />

          {/* Center Deep Green Ribbon terminating at lowest point */}
          <path
            d="M 181,229 C 176,261 171,297 168,333 C 166,353 166,371 168,382 C 171,378 178,358 182,331 C 187,301 190,268 190,238 C 188,234 184,231 181,229 Z"
            fill={`url(#${gGreenSkirtCenter})`}
          />

          {/* Center-Right Green to Gold Ribbon */}
          <path
            d="M 188,243 C 190,270 194,301 195,333 C 196,355 196,373 195,382 C 198,376 204,355 208,328 C 212,299 214,265 213,238 C 204,238 195,239 188,243 Z"
            fill={`url(#${gGreenGold})`}
          />

          {/* Right Rose Pink Panel */}
          <path
            d="M 210,234 C 214,256 219,283 222,313 C 226,337 227,355 229,365 C 226,360 220,346 216,324 C 212,299 208,270 205,247 C 206,242 208,238 210,234 Z"
            fill={`url(#${gPinkSkirtRight})`}
          />

          {/* Far Right Imperial Gold Flared Skirt Ribbon */}
          <path
            d="M 216,202 C 226,225 237,254 248,286 C 259,317 270,347 282,367 C 274,363 261,349 250,324 C 238,297 229,265 221,234 C 218,221 216,210 216,202 Z"
            fill={`url(#${gGoldSkirt})`}
          />
          {/* Gold Skirt Edge Accent */}
          <path
            d="M 282,367 C 277,366 267,356 258,338 C 264,353 274,364 282,367 Z"
            fill="#78350F"
            opacity={0.6}
          />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-[#1C1917] group-hover:text-[#991B1E] transition-colors leading-tight">
            VIỆT PHỤC <span className="text-[#991B1E] font-sans font-extrabold text-xs sm:text-sm tracking-wider uppercase bg-[#991B1E]/10 px-1.5 py-0.5 rounded-sm ml-0.5">REMIX</span>
          </span>
          <span className="text-[10px] sm:text-xs text-[#7A6B5F] tracking-wide italic">
            Mặc Việt, theo cách của bạn
          </span>
        </div>
      )}
    </div>
  );
};
