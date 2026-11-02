import React, { useEffect } from 'react';
import { Language } from '../game/types';
import { soundManager } from '../game/audio';
import { Rocket, Globe, Sparkles, Compass, Shield } from 'lucide-react';

interface TitleScreenProps {
  lang: Language;
  onToggleLang: () => void;
  onStartGame: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  lang,
  onToggleLang,
  onStartGame,
}) => {
  const isAr = lang === 'ar';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        soundManager.startAmbient();
        soundManager.playThruster();
        onStartGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStartGame]);

  const handleStart = () => {
    soundManager.startAmbient();
    soundManager.playThruster();
    onStartGame();
  };

  return (
    <div
      className="relative w-full h-screen bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Background Starlight & Nebula glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(2,132,199,0.25),rgba(255,255,255,0))]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between">
        {/* Mission Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-700/80 rounded-full px-3 py-1 shadow-lg">
            <span className="text-base">🇪🇬</span>
            <span className="text-xs font-bold text-slate-200">EGYPTIAN EXPEDITION</span>
            <span className="text-slate-600">·</span>
            <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[7px] font-bold text-white">
              NASA
            </div>
            <span className="text-xs font-bold text-sky-400">SPACE APPS</span>
          </div>
        </div>

        {/* Language Switch */}
        <button
          onClick={onToggleLang}
          className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-full px-4 py-1.5 text-xs font-semibold shadow-md transition-colors"
        >
          <Globe className="w-4 h-4 text-sky-400" />
          <span>{isAr ? 'English' : 'العربية'}</span>
        </button>
      </header>

      {/* Centerpiece Hero Title */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto">
        {/* Inline SVG Title Lockup */}
        <div className="mb-4">
          <svg viewBox="0 0 460 70" className="w-72 sm:w-96 max-w-full drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            <defs>
              <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
            </defs>
            <text
              x="230"
              y="48"
              textAnchor="middle"
              fill="url(#titleGrad)"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontWeight="900"
              fontSize="40"
              letterSpacing="3"
            >
              HORUS-ARTEMIS
            </text>
          </svg>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-100 max-w-2xl leading-tight">
          {isAr
            ? 'رحلة الاستكشاف من القمر إلى المريخ'
            : 'Journey from Moon to Mars'}
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
          {isAr
            ? 'مغامرة سردية تعليمية تفاعلية: يقود رائد الفضاء القائد طارق ثلاثة رواد صغار (فريدة، نور، وعمر) في هبوط اضطراري على القمر واستكشاف تاريخ روبوتات ناسا للوصول إلى كوكب المريخ.'
            : 'Lead three curious young Egyptian specialists—Farida, Nour, and Omar—through a deep-space thruster malfunction, emergency Moon landing, and robotic exploration on Mars.'}
        </p>

        {/* Character Lineup Showcase */}
        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-sky-400" />
            </div>
            <span className="text-[11px] font-bold text-slate-300 mt-1">{isAr ? 'القائد طارق' : 'Cmdr. Tarek'}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-rose-400" />
            </div>
            <span className="text-[11px] font-bold text-slate-300 mt-1">{isAr ? 'فريدة (١٢)' : 'Farida (12)'}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border-2 border-indigo-400 flex items-center justify-center shadow-lg">
              <Compass className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="text-[11px] font-bold text-slate-300 mt-1">{isAr ? 'نور (١١)' : 'Nour (11)'}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 overflow-hidden flex items-center justify-center shadow-lg">
              <img src="/player.png" alt="Omar" className="w-full h-full object-cover object-top" />
            </div>
            <span className="text-[11px] font-bold text-slate-300 mt-1">{isAr ? 'عمر (١٠)' : 'Omar (10)'}</span>
          </div>
        </div>

        {/* Primary Start CTA Button */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            onClick={handleStart}
            className="flex items-center gap-3 px-8 py-3.5 rounded-full text-base sm:text-lg font-extrabold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all transform hover:scale-105 active:scale-95"
          >
            <Rocket className="w-5 h-5" />
            <span>{isAr ? 'ابدأ مهمة الاستكشاف' : 'Start Expedition'}</span>
          </button>
          <span className="text-xs text-slate-400 font-mono">
            {isAr ? 'اضغط Space أو Enter للبدء السريع' : 'Press Space or Enter to Launch'}
          </span>
        </div>
      </div>

      {/* Footer Controls Hint */}
      <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono border-t border-slate-900 pt-4 gap-2">
        <div>
          {isAr
            ? 'التحكم: WASD أو الأسهم للحركة · Space للقفز · النقر بالماوس للفحص والحوار'
            : 'Controls: WASD / Arrows to Walk · Space to Jump · Mouse Click to Inspect & Dialogue'}
        </div>
        <div>
          NASA Space Apps Challenge 2026
        </div>
      </footer>
    </div>
  );
};
