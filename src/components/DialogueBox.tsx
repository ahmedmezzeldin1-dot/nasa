import React, { useEffect, useState } from 'react';
import { CharacterId, DialogueNode, Language } from '../game/types';
import { CHARACTERS } from '../game/characters';
import { soundManager } from '../game/audio';
import { speechManager } from '../game/speech';
import { ChevronRight, FastForward, Volume2, VolumeX, RotateCcw, Mic } from 'lucide-react';

interface DialogueBoxProps {
  dialogues: DialogueNode[];
  currentIndex: number;
  onNext: () => void;
  lang: Language;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogues,
  currentIndex,
  onNext,
  lang,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(speechManager.getMuted());

  const currentNode = dialogues[currentIndex];
  if (!currentNode) return null;

  const character = CHARACTERS[currentNode.speaker];
  const fullText = lang === 'ar' ? currentNode.textAr : currentNode.textEn;
  const isAr = lang === 'ar';

  // Listen to speechManager speaking state
  useEffect(() => {
    const unsub = speechManager.subscribeSpeaking((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => unsub();
  }, []);

  // Whenever dialogue index or full text changes, trigger typewriter and auto speech narration
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let charIndex = 0;

    // Start browser Web Speech API narration automatically
    speechManager.speak(fullText, lang);

    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        if (charIndex % 3 === 0) {
          soundManager.playBleep(character.pitch);
        }
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 18);

    return () => {
      clearInterval(interval);
      speechManager.cancel();
    };
  }, [currentIndex, fullText, lang, character.pitch]);

  const handleSkipOrNext = () => {
    if (isTyping) {
      setDisplayedText(fullText);
      setIsTyping(false);
    } else {
      speechManager.cancel();
      onNext();
    }
  };

  const handleReplayVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    speechManager.speak(fullText, lang);
  };

  const handleToggleVoiceMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = speechManager.toggleMute();
    setIsVoiceMuted(muted);
  };

  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-30"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div
        onClick={handleSkipOrNext}
        className="bg-slate-900/95 border-2 border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md cursor-pointer select-none transition-all hover:border-sky-500/60"
      >
        <div className="flex items-start gap-4">
          {/* Character Avatar Badge */}
          <div className="shrink-0 flex flex-col items-center gap-1.5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 shadow-inner overflow-hidden relative"
              style={{
                backgroundColor: `${character.color}22`,
                borderColor: character.color,
              }}
            >
              <CharacterAvatar speaker={currentNode.speaker} color={character.color} />
            </div>
            {/* Small Flag/NASA combo badge */}
            <div className="flex items-center gap-1 bg-slate-950/80 px-1.5 py-0.5 rounded-full border border-slate-800">
              <span className="text-[10px]" title="Egypt & NASA">🇪🇬 🚀</span>
            </div>
          </div>

          {/* Dialogue Content */}
          <div className="flex-1 min-w-0">
            {/* Speaker Name, Role, & Voice Controls */}
            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-slate-100" style={{ color: character.color }}>
                  {isAr ? character.nameAr : character.nameEn}
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  {isAr ? character.roleAr : character.roleEn}
                </span>
              </div>

              {/* Voice Indicators & Replay CTA */}
              <div className="flex items-center gap-2">
                {/* Voice Replay Button */}
                <button
                  type="button"
                  onClick={handleReplayVoice}
                  className="flex items-center gap-1 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 rounded-full px-2.5 py-1 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                  title={isAr ? 'إعادة قراءة النص بالصوت' : 'Replay voice narration'}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="text-[11px]">{isAr ? 'إعادة الصوت' : 'Replay Voice'}</span>
                </button>

                {/* Voice Mute Toggle */}
                <button
                  type="button"
                  onClick={handleToggleVoiceMute}
                  className={`p-1 rounded-full border transition-colors ${
                    isVoiceMuted
                      ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                  title={isVoiceMuted ? 'Unmute voice' : 'Mute voice'}
                >
                  {isVoiceMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>

                {/* Animated Speech Soundwave Indicator */}
                {isSpeaking && (
                  <div className="flex items-center gap-0.5 px-2 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded-full">
                    <Mic className="w-3 h-3 text-emerald-400 animate-pulse" />
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 bg-emerald-400 h-2 animate-bounce" />
                      <span className="w-0.5 bg-emerald-400 h-3 animate-bounce [animation-delay:0.15s]" />
                      <span className="w-0.5 bg-emerald-400 h-1.5 animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                )}

                {/* Progress counter */}
                <span className="text-xs font-mono text-slate-500 tabular-nums ml-1">
                  {currentIndex + 1} / {dialogues.length}
                </span>
              </div>
            </div>

            {/* Spoken Text */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal min-h-[48px]">
              {displayedText}
              {isTyping && <span className="inline-block w-2 h-4 bg-sky-400 ml-1 animate-pulse" />}
            </p>

            {/* Bottom Controls / Indicator */}
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px] text-slate-500">
                {isAr ? 'اضغط للمتابعة أو التخطي' : 'Click anywhere or press Enter to advance'}
              </span>

              <button
                type="button"
                className="flex items-center gap-1 font-semibold text-sky-400 hover:text-sky-300 transition-colors"
              >
                {isTyping ? (
                  <>
                    <span>{isAr ? 'إظهار الكل' : 'Fast-Forward'}</span>
                    <FastForward className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>{currentIndex === dialogues.length - 1 ? (isAr ? 'إنهاء' : 'Finish') : (isAr ? 'التالي' : 'Continue')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CharacterAvatar: React.FC<{ speaker: CharacterId; color: string }> = ({ speaker }) => {
  switch (speaker) {
    case 'mentor':
      return (
        <svg viewBox="0 0 60 60" className="w-12 h-12">
          <circle cx="30" cy="28" r="22" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
          <ellipse cx="32" cy="28" rx="15" ry="11" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="37" cy="24" r="3" fill="#FFFFFF" opacity="0.8" />
          <circle cx="30" cy="46" r="4" fill="#1D4ED8" />
        </svg>
      );
    case 'farida':
      return (
        <svg viewBox="0 0 60 60" className="w-12 h-12">
          <circle cx="30" cy="30" r="20" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <ellipse cx="32" cy="30" rx="13" ry="9" fill="#F43F5E" opacity="0.3" />
          <ellipse cx="32" cy="30" rx="12" ry="8" fill="#F59E0B" />
          <line x1="30" y1="10" x2="30" y2="2" stroke="#F43F5E" strokeWidth="2" />
          <circle cx="30" cy="2" r="2.5" fill="#F43F5E" />
        </svg>
      );
    case 'nour':
      return (
        <svg viewBox="0 0 60 60" className="w-12 h-12">
          <circle cx="30" cy="30" r="20" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <ellipse cx="32" cy="30" rx="12" ry="8" fill="#818CF8" />
          <circle cx="30" cy="20" r="3" fill="#6366F1" />
        </svg>
      );
    case 'omar':
      // The Egyptian Astronaut Kid from player.png!
      return (
        <img
          src="/player.png"
          alt="Omar"
          className="w-12 h-12 object-cover object-top rounded-xl"
        />
      );
    case 'robot':
      return (
        <svg viewBox="0 0 60 60" className="w-12 h-12">
          <rect x="14" y="16" width="32" height="28" rx="6" fill="#334155" stroke="#FBBF24" strokeWidth="2" />
          <circle cx="24" cy="28" r="4" fill="#38BDF8" />
          <circle cx="36" cy="28" r="4" fill="#38BDF8" />
          <line x1="20" y1="36" x2="40" y2="36" stroke="#FBBF24" strokeWidth="2" />
        </svg>
      );
    case 'system':
    default:
      return (
        <svg viewBox="0 0 60 60" className="w-12 h-12">
          <polygon points="30,8 52,48 8,48" fill="#3B0764" stroke="#A855F7" strokeWidth="2" />
          <circle cx="30" cy="34" r="5" fill="#C084FC" />
        </svg>
      );
  }
};
