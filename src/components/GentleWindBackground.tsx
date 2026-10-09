import React, { useEffect, useRef, useState } from 'react';
import { Wind, Sparkles, Eye, EyeOff } from 'lucide-react';

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  type: 'lotus' | 'peach' | 'apricot' | 'willow';
  color: string;
  tint: string;
  swayFreq: number;
  swayAmp: number;
  swayPhase: number;
}

interface WindStream {
  id: number;
  yRatio: number;
  speed: number;
  amplitude: number;
  wavelength: number;
  phase: number;
  width: number;
  opacity: number;
  color: string;
  length: number;
}

interface GoldSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulsePhase: number;
  color: string;
}

type WindIntensity = 'gentle' | 'festive' | 'off';

export const GentleWindBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [intensity, setIntensity] = useState<WindIntensity>('festive');
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Mouse interaction tracker for reactive breeze gust
  const mousePosRef = useRef<{ x: number; y: number; prevX: number; prevY: number; speed: number }>({
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
    speed: 0
  });

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) {
        setIntensity('off');
      }
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse for interactive gentle breeze ripples
    const handleMouseMove = (e: MouseEvent) => {
      const prev = mousePosRef.current;
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
        prevX: prev.x,
        prevY: prev.y,
        speed: Math.min(speed, 25)
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const prev = mousePosRef.current;
        const dx = touch.clientX - prev.x;
        const dy = touch.clientY - prev.y;
        mousePosRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          prevX: prev.x,
          prevY: prev.y,
          speed: Math.min(Math.sqrt(dx * dx + dy * dy), 20)
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Palette inspired by traditional Vietnamese festival celebrations:
    // Lotus pink, peach blossom pink, golden apricot blossom, and delicate spring willow
    const PETAL_TYPES: Array<{
      type: 'lotus' | 'peach' | 'apricot' | 'willow';
      color: string;
      tint: string;
    }> = [
      { type: 'lotus', color: 'rgba(236, 72, 153, 0.75)', tint: 'rgba(251, 207, 232, 0.85)' }, // Cánh sen hồng
      { type: 'peach', color: 'rgba(244, 114, 182, 0.72)', tint: 'rgba(253, 232, 238, 0.88)' }, // Hoa đào xuân
      { type: 'apricot', color: 'rgba(234, 179, 8, 0.75)', tint: 'rgba(254, 240, 138, 0.85)' }, // Hoa mai vàng
      { type: 'willow', color: 'rgba(110, 231, 183, 0.65)', tint: 'rgba(209, 250, 229, 0.8)' }, // Lộc xuân non
    ];

    // Petal particle count based on intensity
    const petalCount = intensity === 'off' ? 0 : intensity === 'festive' ? 36 : 20;

    const petals: Petal[] = Array.from({ length: petalCount }, (_, i) => {
      const def = PETAL_TYPES[i % PETAL_TYPES.length];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0.8 + Math.random() * 1.4, // Drift eastward (left to right)
        vy: 0.4 + Math.random() * 0.7, // Gentle fall downward
        size: 9 + Math.random() * 10,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.02 + Math.random() * 0.03,
        opacity: 0.45 + Math.random() * 0.45,
        type: def.type,
        color: def.color,
        tint: def.tint,
        swayFreq: 0.002 + Math.random() * 0.004,
        swayAmp: 12 + Math.random() * 20,
        swayPhase: Math.random() * Math.PI * 2
      };
    });

    // Silky breeze wave streams (dải lụa gió uốn lượn)
    const streamCount = intensity === 'off' ? 0 : intensity === 'festive' ? 5 : 3;
    const streams: WindStream[] = Array.from({ length: streamCount }, (_, i) => ({
      id: i,
      yRatio: 0.15 + (i * 0.18) + (Math.random() * 0.06),
      speed: 0.6 + i * 0.25,
      amplitude: 22 + i * 6,
      wavelength: 220 + i * 70,
      phase: (i * Math.PI) / 3,
      width: 1.2 + (i % 2) * 0.8,
      opacity: 0.18 + (i % 3) * 0.07,
      color: i % 2 === 0 ? 'rgba(200, 151, 62, 0.25)' : 'rgba(255, 255, 255, 0.35)',
      length: width * 1.2
    }));

    // Gold sparkle dust (bụi vàng lễ hội lấp lánh theo làn gió)
    const sparkleCount = intensity === 'off' ? 0 : intensity === 'festive' ? 28 : 14;
    const sparkles: GoldSparkle[] = Array.from({ length: sparkleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0.9 + Math.random() * 1.2,
      vy: (Math.random() - 0.4) * 0.4,
      size: 1 + Math.random() * 2.2,
      alpha: 0.2 + Math.random() * 0.6,
      pulsePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? 'rgba(234, 179, 8,' : 'rgba(251, 191, 36,'
    }));

    let time = 0;

    // Helper: draw stylized Vietnamese petals
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      // 3D tumble flip scale
      const scaleY = Math.cos(p.flip);
      ctx.scale(1, scaleY);
      ctx.globalAlpha = p.opacity;

      const half = p.size;

      // Draw graceful petal shape
      ctx.beginPath();
      if (p.type === 'lotus' || p.type === 'peach') {
        // Lotus / Peach Blossom teardrop curve
        ctx.moveTo(0, -half * 1.2);
        ctx.bezierCurveTo(half * 0.9, -half * 0.6, half * 0.9, half * 0.6, 0, half);
        ctx.bezierCurveTo(-half * 0.9, half * 0.6, -half * 0.9, -half * 0.6, 0, -half * 1.2);
      } else if (p.type === 'apricot') {
        // Round fuller apricot petal
        ctx.moveTo(0, -half);
        ctx.bezierCurveTo(half * 1.1, -half * 0.4, half * 1.1, half * 0.8, 0, half * 0.9);
        ctx.bezierCurveTo(-half * 1.1, half * 0.8, -half * 1.1, -half * 0.4, 0, -half);
      } else {
        // Slender willow spring leaf
        ctx.moveTo(0, -half * 1.4);
        ctx.quadraticCurveTo(half * 0.5, 0, 0, half * 1.4);
        ctx.quadraticCurveTo(-half * 0.5, 0, 0, -half * 1.4);
      }
      ctx.closePath();

      // Soft gradient shading for realistic depth
      const grad = ctx.createLinearGradient(0, -half, 0, half);
      grad.addColorStop(0, p.tint);
      grad.addColorStop(0.7, p.color);
      grad.addColorStop(1, 'rgba(153, 27, 30, 0.35)'); // faint crimson core
      ctx.fillStyle = grad;
      ctx.fill();

      // Center delicate vein
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.7);
      ctx.lineTo(0, half * 0.6);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.restore();
    };

    // Render loop
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      if (intensity !== 'off') {
        const mouse = mousePosRef.current;
        // Decay mouse speed gently
        mouse.speed *= 0.94;

        // 1. Draw flowing breeze streams (Dải gió lụa bồng bềnh)
        streams.forEach((stream) => {
          ctx.save();
          ctx.beginPath();

          const baseY = stream.yRatio * height;
          const pointsCount = 28;
          const step = width / pointsCount;

          let started = false;
          for (let i = 0; i <= pointsCount; i++) {
            const x = i * step;
            // Wave calculation + time progression
            const wave = Math.sin((x / stream.wavelength) + stream.phase + time * 0.015 * stream.speed);
            const subWave = Math.cos((x / (stream.wavelength * 0.6)) + time * 0.01) * 0.35;
            let y = baseY + (wave + subWave) * stream.amplitude;

            // Interactive mouse wind deflection
            const distToMouse = Math.hypot(x - mouse.x, y - mouse.y);
            if (distToMouse < 220) {
              const influence = (1 - distToMouse / 220) * 18;
              y += Math.sin(time * 0.08) * influence;
            }

            if (!started) {
              ctx.moveTo(x, y);
              started = true;
            } else {
              ctx.lineTo(x, y);
            }
          }

          // Subtle gradient feathering from left to right
          const streamGrad = ctx.createLinearGradient(0, 0, width, 0);
          streamGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          streamGrad.addColorStop(0.25, stream.color);
          streamGrad.addColorStop(0.65, 'rgba(200, 151, 62, 0.28)'); // warm imperial gold tinge
          streamGrad.addColorStop(0.9, stream.color);
          streamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.strokeStyle = streamGrad;
          ctx.lineWidth = stream.width;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();

          // Occasionally draw a delicate swirl loop on one stream (Vân gió cổ điển)
          if (stream.id === 1 || stream.id === 3) {
            const swirlX = ((time * 0.8 + stream.id * 350) % (width + 300)) - 100;
            const swirlY = baseY + Math.sin(time * 0.02) * stream.amplitude;
            if (swirlX > -50 && swirlX < width + 50) {
              ctx.beginPath();
              ctx.arc(swirlX, swirlY, 14, 0, Math.PI * 1.6);
              ctx.strokeStyle = 'rgba(200, 151, 62, 0.18)';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }

          ctx.restore();
        });

        // 2. Draw golden festival sparkles
        sparkles.forEach((s) => {
          s.x += s.vx * (intensity === 'festive' ? 1.2 : 0.8);
          s.y += s.vy + Math.sin(time * 0.03 + s.pulsePhase) * 0.4;
          s.pulsePhase += 0.04;

          // Wrap around edges
          if (s.x > width + 20) s.x = -20;
          if (s.y > height + 20) s.y = -20;
          if (s.y < -20) s.y = height + 20;

          // React to mouse proximity
          const mDist = Math.hypot(s.x - mouse.x, s.y - mouse.y);
          if (mDist < 140) {
            s.x += (s.x - mouse.x) * 0.03;
            s.y += (s.y - mouse.y) * 0.03;
          }

          const currentAlpha = Math.max(0.08, (s.alpha * (0.6 + 0.4 * Math.sin(s.pulsePhase))));

          ctx.save();
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `${s.color} ${currentAlpha})`;
          ctx.shadowColor = 'rgba(234, 179, 8, 0.4)';
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.restore();
        });

        // 3. Draw & update drifting festival petals
        petals.forEach((p) => {
          // Sway movement
          const sway = Math.sin(time * p.swayFreq + p.swayPhase) * 0.6;
          p.x += p.vx + sway + (intensity === 'festive' ? 0.3 : 0);
          p.y += p.vy;

          p.rotation += p.rotSpeed;
          p.flip += p.flipSpeed;

          // Reactive mouse gust interaction
          const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (distToMouse < 180 && mouse.speed > 1) {
            const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
            const force = (1 - distToMouse / 180) * 2.2;
            p.x += Math.cos(angle) * force;
            p.y += Math.sin(angle) * force;
            p.rotSpeed += (Math.random() - 0.5) * 0.02;
          }

          // Screen wrapping
          if (p.x > width + 40) {
            p.x = -40;
            p.y = Math.random() * height * 0.85;
          }
          if (p.y > height + 40) {
            p.y = -30;
            p.x = Math.random() * width;
          }

          drawPetal(p);
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause when tab is inactive to preserve performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [intensity]);

  return (
    <>
      {/* Background Canvas Layer: full-bleed, behind all content, pointer-events-none */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block opacity-90 transition-opacity duration-1000"
        />

        {/* Soft atmospheric radial gradient lighting */}
        <div className="absolute inset-0 bg-radial-[at_top_right] from-[#C58B35]/5 via-transparent to-[#991B1E]/3 pointer-events-none" />
      </div>

      {/* Floating subtle Vietnamese Festive Breeze Control Pill */}
      {!isReducedMotion && (
        <aside
          aria-label="Điều khiển hiệu ứng gió xuân lễ hội"
          className="fixed bottom-5 right-5 z-20 flex items-center gap-1.5"
        >
          <div className="group relative flex items-center">
            {showControls && (
              <div className="flex items-center gap-1 bg-[#FFFDF9]/95 backdrop-blur-md border border-[#E4D5C2] px-2 py-1.5 rounded-full shadow-lg mr-2 animate-in fade-in slide-in-from-right-3 duration-200">
                <button
                  type="button"
                  onClick={() => setIntensity('festive')}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                    intensity === 'festive'
                      ? 'bg-[#991B1E] text-white shadow-xs'
                      : 'text-[#594C42] hover:bg-[#F3ECE0]'
                  }`}
                  title="Gió xuân lễ hội rộn ràng, cánh sen & đào phơi phới"
                >
                  🌸 Gió hội
                </button>
                <button
                  type="button"
                  onClick={() => setIntensity('gentle')}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                    intensity === 'gentle'
                      ? 'bg-[#991B1E] text-white shadow-xs'
                      : 'text-[#594C42] hover:bg-[#F3ECE0]'
                  }`}
                  title="Gió thoang thoảng dịu êm"
                >
                  🍃 Thoang thoảng
                </button>
                <button
                  type="button"
                  onClick={() => setIntensity('off')}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                    intensity === 'off'
                      ? 'bg-[#594C42] text-white'
                      : 'text-[#7A6B5F] hover:bg-[#F3ECE0]'
                  }`}
                  title="Tạm tắt hiệu ứng gió"
                >
                  Tắt
                </button>
              </div>
            )}

            {/* Toggle trigger button */}
            <button
              type="button"
              onClick={() => setShowControls((prev) => !prev)}
              className="flex items-center gap-2 bg-[#FFFDF9]/90 hover:bg-white text-[#54473D] hover:text-[#991B1E] px-3.5 py-2 rounded-full border border-[#E2D5C3] shadow-md hover:shadow-lg backdrop-blur-md transition-all duration-300 text-xs font-medium cursor-pointer"
              title="Cài đặt hiệu ứng gió thổi lễ hội"
            >
              <Wind
                className={`w-3.5 h-3.5 ${
                  intensity !== 'off'
                    ? 'text-[#991B1E] animate-pulse'
                    : 'text-[#8C7E72]'
                }`}
              />
              <span className="hidden sm:inline">
                {intensity === 'festive'
                  ? 'Gió xuân lễ hội'
                  : intensity === 'gentle'
                  ? 'Gió êm dịu'
                  : 'Gió tĩnh'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8973E] ml-0.5" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
};
