import React from 'react';
import { Language, RobotInfo } from '../game/types';
import { X, Play, Award, CheckCircle2, Cpu, Compass } from 'lucide-react';
import { soundManager } from '../game/audio';

interface RobotInspectModalProps {
  robot: RobotInfo;
  lang: Language;
  onClose: () => void;
  onStartMiniTask: () => void;
}

export const RobotInspectModal: React.FC<RobotInspectModalProps> = ({
  robot,
  lang,
  onClose,
  onStartMiniTask,
}) => {
  const isAr = lang === 'ar';

  const handleStartTask = () => {
    soundManager.playScan();
    onStartMiniTask();
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 border-b border-slate-700 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono">
                NASA {robot.year}
              </span>
              <span className="text-xs text-slate-400">
                {isAr ? robot.missionTypeAr : robot.missionTypeEn}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {isAr ? robot.nameAr : robot.nameEn}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body with 4 Educational Pillars */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Pillar 1: Why NASA Built It */}
          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
            <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-sky-400" />
              <span>{isAr ? 'لماذا صممته ناسا؟ (الهدف العلمي)' : 'Why NASA Built It (Scientific Objective)'}</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isAr ? robot.whyBuiltAr : robot.whyBuiltEn}
            </p>
          </div>

          {/* Pillar 2: Why Left on Surface */}
          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'لماذا تُرك على السطح؟ (استراتيجية البقاء)' : 'Why Left on the Surface (Stationing Strategy)'}</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isAr ? robot.whyLeftAr : robot.whyLeftEn}
            </p>
          </div>

          {/* Pillar 3: Key Specialized Features */}
          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'المواصفات والتقنيات الهندسية الخاصة' : 'Key Specialized Engineering Features'}</span>
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {(isAr ? robot.featuresAr : robot.featuresEn).map((feat, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold shrink-0">✦</span>
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 4: Historical Achievements */}
          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
            <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>{isAr ? 'أبرز الإنجازات والاكتشافات العلمية' : 'Historical Achievements & Discoveries'}</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {(isAr ? robot.achievementsAr : robot.achievementsEn).map((ach, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-purple-400 font-bold shrink-0">★</span>
                  <span className="leading-snug">{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer with Action CTA */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {robot.taskCompleted ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {isAr ? 'تم إنجاز الاختبار العملي بنجاح' : 'Scientific Mini-Task Completed'}
              </span>
            ) : (
              <span>{isAr ? 'انتقل للتجربة العملية لمعايرة الروبوت' : 'Launch hands-on scientific task to complete exploration'}</span>
            )}
          </div>

          <button
            onClick={handleStartTask}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all transform active:scale-95"
          >
            <Play className="w-4 h-4" />
            <span>
              {robot.taskCompleted
                ? (isAr ? 'إعادة التجربة العلمية' : 'Replay Science Activity')
                : (isAr ? 'بدء التجربة العلمية التفاعلية' : 'Start Interactive Mini-Task')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
