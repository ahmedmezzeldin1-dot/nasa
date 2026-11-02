import React, { useEffect } from 'react';
import { GameStage, Language } from '../game/types';
import { soundManager } from '../game/audio';
import { AlertTriangle, Rocket, Sparkles } from 'lucide-react';

interface InterplanetaryCutsceneProps {
  stage: 'MALFUNCTION_CUTSCENE' | 'LAUNCH_TO_MARS';
  lang: Language;
  onFinish: () => void;
}

export const InterplanetaryCutscene: React.FC<InterplanetaryCutsceneProps> = ({
  stage,
  lang,
  onFinish,
}) => {
  const isAr = lang === 'ar';
  const isMalfunction = stage === 'MALFUNCTION_CUTSCENE';

  useEffect(() => {
    if (isMalfunction) {
      soundManager.playAlarm();
    } else {
      soundManager.playThruster();
    }

    // Auto-advance after 5 seconds or allow skip button
    const timer = setTimeout(() => {
      onFinish();
    }, 6000);

    return () => clearTimeout(timer);
  }, [stage, isMalfunction, onFinish]);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-white overflow-hidden select-none"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Animated Starfield */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950" />

      {/* Floating Spacecraft in transit */}
      <div className="relative z-10 flex flex-col items-center max-w-xl text-center">
        {/* Vessel Graphic */}
        <div className="relative mb-8">
          <div
            className={`w-32 h-32 rounded-3xl flex items-center justify-center border-2 transition-all ${
              isMalfunction
                ? 'bg-rose-950/40 border-rose-500 animate-pulse shadow-[0_0_40px_rgba(244,63,94,0.4)]'
                : 'bg-sky-950/40 border-sky-400 shadow-[0_0_40px_rgba(56,189,248,0.4)]'
            }`}
          >
            {isMalfunction ? (
              <AlertTriangle className="w-16 h-16 text-rose-400 animate-bounce" />
            ) : (
              <Rocket className="w-16 h-16 text-sky-400 animate-pulse" />
            )}
          </div>

          {/* Engine Exhaust Glow */}
          <div
            className={`w-8 h-20 mx-auto -mt-3 rounded-full blur-sm ${
              isMalfunction
                ? 'bg-gradient-to-b from-rose-500 via-amber-500 to-transparent animate-ping'
                : 'bg-gradient-to-b from-sky-400 via-blue-600 to-transparent animate-pulse'
            }`}
          />
        </div>

        {/* Narrative Banner */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {isMalfunction
              ? (isAr ? 'إنذار أحمر: عطل في غرفة المحركات الأيونية' : 'RED ALERT: ION PROPULSION ANOMALY')
              : (isAr ? 'مسار الانتقال المداري بين الكواكب' : 'HOHMANN INTERPLANETARY TRANSFER TRAJECTORY')}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black mb-3">
          {isMalfunction
            ? (isAr ? 'هبوط اضطراري على سطح القمر!' : 'Emergency Descent onto the Moon!')
            : (isAr ? 'الانطلاق العظيم نحو المريخ!' : 'Liftoff: Journey to the Red Planet!')}
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-md">
          {isMalfunction
            ? (isAr
                ? 'تعطلت صمامات الدفع الرئيسية أثناء الرحلة نحو المريخ. القائد طارق يوجه المركبة نحو فوهات القمر للهبوط الاضطراري والبحث عن حلول هندسية.'
                : 'Mid-transit to Mars, a thruster manifold malfunction forced the crew into an emergency landing on the lunar regolith to salvage telemetry.')
            : (isAr
                ? 'بعد فحص روبوتات القمر ومعايرة أنظمة الدفع بنجاح، المركبة حورس-أرتميس تشعل محركاتها وتعبر الفضاء السحيق لتهبط على سطح فوهة جيزيرو بالمريخ!'
                : 'With the telemetry calibrated from NASA lunar robots, the Horus-Artemis ignites full thrusters, completing the interplanetary voyage to touch down on Mars!')}
        </p>

        {/* Skip button */}
        <button
          onClick={onFinish}
          className="mt-8 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors"
        >
          {isAr ? 'متابعة الهبوط ←' : 'Proceed to Touchdown →'}
        </button>
      </div>
    </div>
  );
};
