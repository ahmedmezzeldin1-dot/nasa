import React, { useState } from 'react';
import { GameStage, Language, RobotInfo } from '../game/types';
import { soundManager } from '../game/audio';
import { speechManager } from '../game/speech';
import { Volume2, VolumeX, BookOpen, Globe, MoveLeft, MoveRight, ArrowUp, Sparkles, Mic } from 'lucide-react';

interface HUDProps {
  stage: GameStage;
  lang: Language;
  onToggleLang: () => void;
  onOpenCodex: () => void;
  robots: RobotInfo[];
  allCompleted: boolean;
  onActionClick: () => void;
  nearbyRobot: RobotInfo | null;
  shipNearby: boolean;
  onInputStart: (action: 'left' | 'right' | 'jump') => void;
  onInputEnd: (action: 'left' | 'right' | 'jump') => void;
}

export const HUD: React.FC<HUDProps> = ({
  stage,
  lang,
  onToggleLang,
  onOpenCodex,
  robots,
  allCompleted,
  onActionClick,
  nearbyRobot,
  shipNearby,
  onInputStart,
  onInputEnd,
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [isVoiceMuted, setIsVoiceMuted] = useState(speechManager.getMuted());
  const isMoon = stage === 'MOON_SURFACE';
  const isAr = lang === 'ar';

  const toggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const stageRobots = robots.filter((r) =>
    isMoon ? r.stage === 'moon' : r.stage === 'mars'
  );
  const completedCount = stageRobots.filter((r) => r.inspected && r.taskCompleted).length;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-20" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Top Perimeter Bar */}
      <header className="flex items-center justify-between gap-4 pointer-events-auto">
        {/* Environment & Gravity Telemetry */}
        <div className="flex items-center gap-3 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-xl px-4 py-2.5 shadow-xl">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-xs">
            <div className="font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
              <span>{isMoon ? (isAr ? 'سطح القمر · بحر السكون' : 'Moon Surface · Sea of Tranquility') : (isAr ? 'سطح المريخ · فوهة جيزيرو' : 'Mars Surface · Jezero Crater')}</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px] tabular-nums">
              {isMoon ? 'g = 1.62 m/s² · 1/6 Earth Gravity · Vacuum' : 'g = 3.72 m/s² · 3/8 Earth Gravity · CO₂ 0.01 bar'}
            </div>
          </div>
        </div>

        {/* Center Progress: Robot Inspection Counter */}
        <div className="bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-xl px-4 py-2 shadow-xl flex items-center gap-3">
          <div className="text-right">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              {isAr ? 'روبوتات ناسا المستكشفة' : 'NASA Robots Explored'}
            </div>
            <div className="text-sm font-bold text-sky-400 font-mono tabular-nums">
              {completedCount} / {stageRobots.length}
            </div>
          </div>
          <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
            <div
              className="bg-sky-400 h-full transition-all duration-500 ease-out"
              style={{ width: `${(completedCount / Math.max(1, stageRobots.length)) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Controls: Codex, Lang, Audio */}
        <div className="flex items-center gap-2">
          {/* Field Codex Button */}
          <button
            onClick={onOpenCodex}
            className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium shadow-md transition-colors"
            title={isAr ? 'سجل الروبوتات الميداني' : 'Field Codex'}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">{isAr ? 'السجل الميداني' : 'Field Codex'}</span>
          </button>

          {/* Bilingual Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold shadow-md transition-colors"
            title={isAr ? 'تغيير اللغة إلى English' : 'Switch to Arabic'}
          >
            <Globe className="w-4 h-4 text-sky-400" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* Speech Narration Mute Toggle */}
          <button
            onClick={() => {
              const muted = speechManager.toggleMute();
              setIsVoiceMuted(muted);
            }}
            className={`flex items-center gap-1.5 p-2 rounded-lg border shadow-md transition-colors ${
              isVoiceMuted
                ? 'bg-rose-950/70 border-rose-600/50 text-rose-300'
                : 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border-slate-700'
            }`}
            title={isVoiceMuted ? (isAr ? 'تفعيل القراءة الصوتية' : 'Unmute Voice Narration') : (isAr ? 'كتم القراءة الصوتية' : 'Mute Voice Narration')}
          >
            <Mic className={`w-4 h-4 ${isVoiceMuted ? 'text-rose-400' : 'text-sky-400'}`} />
            <span className="text-[11px] font-semibold hidden md:inline">
              {isVoiceMuted ? (isAr ? 'الصوت صامت' : 'Voice Off') : (isAr ? 'قراءة صوتية' : 'Voice On')}
            </span>
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 rounded-lg shadow-md transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </header>

      {/* Bottom Floating Keyboard Hint & Action Prompt */}
      <div className="flex flex-col items-center gap-3">
        {/* Context Action Button (appears when near robot or ship) */}
        {(nearbyRobot || (shipNearby && allCompleted)) && (
          <button
            onClick={onActionClick}
            className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shadow-2xl transition-all transform hover:scale-105 active:scale-95 bg-gradient-to-r from-sky-500 to-blue-600 text-white border border-sky-300/40"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {nearbyRobot
                ? (isAr ? `فحص ${nearbyRobot.nameAr} [E]` : `Inspect ${nearbyRobot.nameEn} [E]`)
                : (isAr ? 'صعود المركبة والانطلاق [E]' : 'Board Ship & Launch [E]')}
            </span>
          </button>
        )}

        {/* Keyboard Control Single-line Bar */}
        <div className="hidden md:flex items-center gap-4 bg-slate-950/75 border border-slate-800/80 rounded-full px-5 py-1.5 text-xs text-slate-400 font-mono shadow-lg">
          <span>{isAr ? 'التحرك: A / D أو الأسهم' : 'Move: WASD / Arrow Keys'}</span>
          <span>·</span>
          <span>{isAr ? 'القفز: المسافة Space' : 'Jump: Space'}</span>
          <span>·</span>
          <span>{isAr ? 'الفحص: E أو النقر بالماوس' : 'Inspect: E or Mouse Click'}</span>
        </div>
      </div>

      {/* Mobile / Touch Responsive Virtual Controls (Bottom corners) */}
      <div className="flex items-end justify-between w-full md:hidden pointer-events-auto">
        {/* D-Pad Left/Right */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-2xl border border-slate-800 backdrop-blur-sm">
          <button
            onTouchStart={() => onInputStart('left')}
            onTouchEnd={() => onInputEnd('left')}
            onMouseDown={() => onInputStart('left')}
            onMouseUp={() => onInputEnd('left')}
            className="w-12 h-12 flex items-center justify-center bg-slate-800 active:bg-slate-700 rounded-xl text-slate-200 border border-slate-700"
          >
            <MoveLeft className="w-6 h-6" />
          </button>
          <button
            onTouchStart={() => onInputStart('right')}
            onTouchEnd={() => onInputEnd('right')}
            onMouseDown={() => onInputStart('right')}
            onMouseUp={() => onInputEnd('right')}
            className="w-12 h-12 flex items-center justify-center bg-slate-800 active:bg-slate-700 rounded-xl text-slate-200 border border-slate-700"
          >
            <MoveRight className="w-6 h-6" />
          </button>
        </div>

        {/* Jump Action Button */}
        <button
          onTouchStart={() => onInputStart('jump')}
          onTouchEnd={() => onInputEnd('jump')}
          onMouseDown={() => onInputStart('jump')}
          onMouseUp={() => onInputEnd('jump')}
          className="w-14 h-14 flex items-center justify-center bg-sky-600 active:bg-sky-500 rounded-2xl text-white shadow-lg border border-sky-400"
        >
          <ArrowUp className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
