import React, { useState } from 'react';
import { Language, RobotInfo } from '../game/types';
import { soundManager } from '../game/audio';
import { CheckCircle2, RotateCcw, X, Zap, Radio, Sparkles, Wind, Eye, Flame, Rocket } from 'lucide-react';

interface MiniTaskModalProps {
  robot: RobotInfo;
  lang: Language;
  onClose: () => void;
  onComplete: () => void;
}

export const MiniTaskModal: React.FC<MiniTaskModalProps> = ({
  robot,
  lang,
  onClose,
  onComplete,
}) => {
  const isAr = lang === 'ar';
  const task = robot.miniTask;
  const [isDone, setIsDone] = useState(robot.taskCompleted);

  // Task-specific states
  // 1. Soil Sample (Surveyor 3)
  const [scoopDepth, setScoopDepth] = useState(0);

  // 2. Antenna Align (Apollo LRV)
  const [antennaAngle, setAntennaAngle] = useState(30);

  // 3. Neutron Calibrate (VIPER)
  const [pulseFreq, setPulseFreq] = useState(40);

  // 4. Solar Dust (Sojourner)
  const [dustPatches, setDustPatches] = useState([true, true, true, true]);

  // 5. Hematite Inspect (Opportunity)
  const [lensFocus, setLensFocus] = useState(25);

  // 6. ChemCam Laser (Curiosity)
  const [laserShots, setLaserShots] = useState(0);

  // 7. Ingenuity Flight (Perseverance & Ingenuity)
  const [rotorRPM, setRotorRPM] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleFinish = () => {
    setIsDone(true);
    soundManager.playSuccess();
    onComplete();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="bg-slate-900 border-2 border-sky-500/50 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 p-4 border-b border-slate-700/80 flex items-center justify-between">
          <div>
            <div className="text-xs text-sky-400 font-mono font-semibold uppercase tracking-wider">
              {isAr ? 'المختبر العلمي الميداني' : 'Field Science Simulation'}
            </div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isAr ? task.titleAr : task.titleEn}</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Objective banner */}
        <div className="bg-slate-950/70 px-5 py-3 border-b border-slate-800 text-xs text-slate-300">
          <span className="font-bold text-sky-400">{isAr ? 'الهدف: ' : 'Objective: '}</span>
          {isAr ? task.objectiveAr : task.objectiveEn}
        </div>

        {/* Interactive Lab Workspace */}
        <div className="p-6">
          {/* 1. Surveyor 3: Soil Scoop */}
          {task.id === 'soil_sample' && (
            <div className="space-y-4">
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
                <div className="relative w-full h-36 bg-gradient-to-b from-slate-900 to-slate-950 rounded-lg overflow-hidden border border-slate-800 flex flex-col justify-end">
                  {/* Sky vacuum */}
                  <div className="text-[10px] text-slate-500 absolute top-2 left-3 font-mono">
                    LUNAR REGOLITH BEARING TEST
                  </div>
                  {/* Mechanical arm */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-4 bg-slate-400 rounded-b transition-all duration-150"
                    style={{
                      top: 0,
                      height: `${30 + scoopDepth * 0.7}%`,
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="w-8 h-4 bg-amber-500 rounded -ml-2 absolute bottom-0 flex items-center justify-center text-[8px] font-bold text-slate-950">
                      SCOOP
                    </div>
                  </div>
                  {/* Regolith ground */}
                  <div className="w-full h-12 bg-slate-700 border-t-2 border-slate-500 flex items-center justify-center">
                    <span className="text-[10px] font-mono text-slate-300">
                      {isAr ? 'طبقة تربة القمر (ريغوليث)' : 'Lunar Regolith Bed'}
                    </span>
                  </div>
                </div>

                {/* Depth & Bearing Telemetry */}
                <div className="grid grid-cols-2 gap-4 w-full mt-3 text-center">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <div className="text-[11px] text-slate-400">{isAr ? 'عمق الحفر' : 'Trench Depth'}</div>
                    <div className="text-sm font-bold font-mono text-sky-400 tabular-nums">
                      {(scoopDepth * 0.05).toFixed(1)} cm
                    </div>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <div className="text-[11px] text-slate-400">{isAr ? 'تحمل التربة' : 'Bearing Pressure'}</div>
                    <div className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                      {scoopDepth > 70 ? '1.5 g/cm³ (STABLE)' : 'Measuring...'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Controller */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>{isAr ? 'سحب الذراع للأسفل' : 'Retract Scoop'}</span>
                  <span>{isAr ? 'الحفر في التربة' : 'Dig into Regolith'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scoopDepth}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setScoopDepth(val);
                    if (val >= 85 && !isDone) {
                      handleFinish();
                    }
                  }}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* 2. Apollo LRV: Antenna Alignment */}
          {task.id === 'antenna_align' && (
            <div className="space-y-4">
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
                <div className="relative w-full h-36 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-around">
                  {/* Parabolic Dish Graphics */}
                  <div
                    className="w-20 h-20 border-4 border-slate-400 rounded-full flex items-center justify-center transition-transform duration-200 relative"
                    style={{ transform: `rotate(${antennaAngle - 90}deg)` }}
                  >
                    <div className="w-1 h-12 bg-sky-400 absolute top-0" />
                    <Radio className="w-6 h-6 text-amber-400" />
                  </div>

                  {/* Earth Target Target Vector */}
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600 border-2 border-sky-300 mx-auto flex items-center justify-center shadow-lg">
                      <span className="text-xs font-bold text-white">EARTH</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">384,400 km</span>
                  </div>
                </div>

                {/* Signal Telemetry */}
                <div className="w-full mt-3 bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {isAr ? 'قوة إشارة البث المباشر للأرض:' : 'Live TV Telemetry Signal:'}
                  </span>
                  <span
                    className={`font-mono text-sm font-bold tabular-nums ${
                      Math.abs(antennaAngle - 90) < 6 ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {Math.max(10, Math.round(100 - Math.abs(antennaAngle - 90) * 1.8))}%
                  </span>
                </div>
              </div>

              {/* Antenna Rotation Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>{isAr ? 'تدوير يساراً' : 'Rotate West'}</span>
                  <span>{isAr ? 'تدوير يميناً' : 'Rotate East'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={antennaAngle}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setAntennaAngle(val);
                    if (Math.abs(val - 90) < 5 && !isDone) {
                      handleFinish();
                    }
                  }}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* 3. VIPER: Neutron Calibration */}
          {task.id === 'neutron_calibrate' && (
            <div className="space-y-4">
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
                <div className="relative w-full h-36 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 p-3 flex flex-col justify-between">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>NSS SPECTROMETER</span>
                    <span className="text-sky-400">HYDROGEN (H₂O) RESONANCE</span>
                  </div>

                  {/* Synthetic Waveform Canvas Representation */}
                  <div className="w-full h-16 flex items-center justify-center gap-1">
                    {[...Array(24)].map((_, i) => {
                      const wave = Math.sin((i + pulseFreq * 0.1) * 0.6) * 24;
                      return (
                        <div
                          key={i}
                          className="w-1.5 bg-sky-400 rounded-full transition-all duration-75"
                          style={{
                            height: `${Math.max(8, Math.abs(wave) + (pulseFreq > 65 && pulseFreq < 75 ? 16 : 4))}px`,
                            backgroundColor: pulseFreq > 65 && pulseFreq < 75 ? '#34D399' : '#38BDF8',
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="text-center font-mono text-xs">
                    {pulseFreq > 65 && pulseFreq < 75 ? (
                      <span className="text-emerald-400 font-bold">✓ WATER ICE DETECTED: 5.4 wt% H₂O</span>
                    ) : (
                      <span className="text-slate-500">Scanning polar crater regolith...</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Frequency slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>{isAr ? 'تردد منخفض' : 'Low Frequency'}</span>
                  <span>{isAr ? 'تردد مرتفع' : 'High Frequency'}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={pulseFreq}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setPulseFreq(val);
                    if (val >= 68 && val <= 72 && !isDone) {
                      handleFinish();
                    }
                  }}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* 4. Sojourner: Solar Panel Dust Wipe */}
          {task.id === 'solar_dust' && (
            <div className="space-y-4">
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
                <p className="text-xs text-slate-400 mb-3 text-center">
                  {isAr
                    ? 'انقر على بقع الغبار الأحمر لمسحها واستعادة طاقة الخلايا الشمسية'
                    : 'Click or swipe each red dust patch to clean Sojourner’s solar array'}
                </p>

                {/* 4 Solar Cells with dust overlays */}
                <div className="grid grid-cols-2 gap-3 w-56">
                  {dustPatches.map((hasDust, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const newPatches = [...dustPatches];
                        newPatches[idx] = false;
                        setDustPatches(newPatches);
                        soundManager.playScan();
                        if (newPatches.every((d) => !d) && !isDone) {
                          handleFinish();
                        }
                      }}
                      className={`h-20 rounded-xl border-2 flex items-center justify-center transition-all ${
                        hasDust
                          ? 'bg-amber-800/80 border-orange-500 hover:bg-amber-700/80 cursor-pointer'
                          : 'bg-blue-900 border-sky-400 shadow-inner'
                      }`}
                    >
                      {hasDust ? (
                        <div className="flex flex-col items-center gap-1 text-orange-200">
                          <Wind className="w-5 h-5 animate-pulse" />
                          <span className="text-[10px] font-bold">{isAr ? 'غبار رملي' : 'Red Dust'}</span>
                        </div>
                      ) : (
                        <div className="text-center text-sky-300">
                          <Zap className="w-5 h-5 mx-auto" />
                          <span className="text-[10px] font-mono">4.0 W (Clean)</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Solar Wattage Output */}
                <div className="mt-4 font-mono text-xs text-sky-400">
                  {isAr ? 'الطاقة المستعادة: ' : 'Power Output: '}
                  <span className="font-bold tabular-nums">
                    {(4 - dustPatches.filter((d) => d).length) * 4} / 16 Watts
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 5. Opportunity: Hematite Blueberries Lens */}
          {task.id === 'hematite_inspect' && (
            <div className="space-y-4">
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
                <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-slate-700 shadow-inner flex items-center justify-center bg-stone-800">
                  {/* Simulated Hematite Spherules */}
                  <div
                    className="w-full h-full flex flex-wrap items-center justify-center gap-3 p-4 transition-all duration-200"
                    style={{
                      filter: `blur(${Math.max(0, Math.abs(lensFocus - 70) * 0.15)}px)`,
                    }}
                  >
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 via-slate-600 to-indigo-900 shadow-md border border-indigo-400/50"
                        title="Hematite Blueberry"
                      />
                    ))}
                  </div>

                  {/* Optical Reticle Crosshair */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-full h-[1px] bg-sky-400/30" />
                    <div className="h-full w-[1px] bg-sky-400/30 absolute" />
                    <div className="w-24 h-24 rounded-full border border-sky-400/40 absolute" />
                  </div>
                </div>

                <div className="mt-3 font-mono text-xs text-center">
                  {Math.abs(lensFocus - 70) < 5 ? (
                    <span className="text-emerald-400 font-bold">
                      ✓ {isAr ? 'تأكيد كرات الهيماتيت: دليل المياه السائلة!' : 'HEMATITE SPHERULES CONFIRMED: PAST WATER!'}
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {isAr ? 'اضبط التركيز البصري للعدسة المجهرية' : 'Adjust optical focus for sub-millimeter sharpness'}
                    </span>
                  )}
                </div>
              </div>

              {/* Focus slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>{isAr ? 'صورة ضبابية' : 'Blurry'}</span>
                  <span>{isAr ? 'تركيز بؤري حاد' : 'Sharp Focus'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={lensFocus}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setLensFocus(val);
                    if (Math.abs(val - 70) < 4 && !isDone) {
                      handleFinish();
                    }
                  }}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* 6. Curiosity: ChemCam Laser */}
          {task.id === 'chemcam_laser' && (
            <div className="space-y-4">
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
                <div className="relative w-full h-36 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-between px-6">
                  {/* ChemCam Head */}
                  <div className="text-center">
                    <div className="w-14 h-14 bg-slate-800 rounded-xl border-2 border-slate-600 flex items-center justify-center">
                      <Flame className="w-7 h-7 text-red-500" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">ChemCam Laser</span>
                  </div>

                  {/* Laser Beam Flash */}
                  {laserShots > 0 && (
                    <div className="flex-1 h-1 bg-red-500 shadow-[0_0_15px_#EF4444] animate-pulse mx-4" />
                  )}

                  {/* Target Rock */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-stone-700 rounded-2xl border-2 border-stone-500 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-amber-200">MUDSTONE</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">Gale Crater</span>
                  </div>
                </div>

                {/* Laser Trigger Button */}
                <button
                  onClick={() => {
                    if (laserShots < 3) {
                      const next = laserShots + 1;
                      setLaserShots(next);
                      soundManager.playAlarm();
                      if (next === 3 && !isDone) {
                        handleFinish();
                      }
                    }
                  }}
                  disabled={laserShots >= 3}
                  className="mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-500 disabled:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all"
                >
                  <Flame className="w-4 h-4" />
                  <span>
                    {isAr
                      ? `إطلاق نبضة ليزر (${laserShots}/3)`
                      : `Fire Infrared Laser Pulse (${laserShots}/3)`}
                  </span>
                </button>

                {/* Spectra findings */}
                {laserShots >= 3 && (
                  <div className="mt-3 font-mono text-xs text-emerald-400 font-bold">
                    ✓ PLASMA SPECTRA: CARBON (C), OXYGEN (O), PHOSPHORUS (P), SULFUR (S)
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 7. Perseverance & Ingenuity: Rotor Flight */}
          {task.id === 'ingenuity_flight' && (
            <div className="space-y-4">
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
                <div className="relative w-full h-40 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex flex-col items-center justify-center">
                  {/* Helicopter model hovering */}
                  <div
                    className="transition-all duration-300 flex flex-col items-center"
                    style={{
                      transform: `translateY(${rotorRPM > 2000 ? -25 : 15}px)`,
                    }}
                  >
                    {/* Spinning Blades */}
                    <div
                      className="w-32 h-1 bg-slate-300 rounded shadow"
                      style={{
                        animation: rotorRPM > 100 ? `spin ${Math.max(0.04, 0.4 - rotorRPM * 0.00015)}s linear infinite` : 'none',
                      }}
                    />
                    <div className="w-2 h-4 bg-amber-400" />
                    <div className="w-10 h-8 bg-amber-500 rounded border border-amber-300 flex items-center justify-center text-[9px] font-bold text-slate-950">
                      INGENUITY
                    </div>
                  </div>

                  <div className="absolute bottom-2 text-[10px] font-mono text-slate-400">
                    ATMOSPHERIC DENSITY: 1% OF EARTH · FLIGHT SPEED: 2,400 RPM
                  </div>
                </div>

                {/* RPM Gauge */}
                <div className="w-full mt-3 bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {isAr ? 'سرعة دوران الشفرات:' : 'Rotor Blade RPM:'}
                  </span>
                  <span
                    className={`font-mono text-sm font-bold tabular-nums ${
                      rotorRPM >= 2400 ? 'text-emerald-400' : 'text-sky-400'
                    }`}
                  >
                    {rotorRPM} / 2,400 RPM
                  </span>
                </div>

                {/* Hold to throttle button */}
                <button
                  onMouseDown={() => setIsSpinning(true)}
                  onMouseUp={() => setIsSpinning(false)}
                  onTouchStart={() => setIsSpinning(true)}
                  onTouchEnd={() => setIsSpinning(false)}
                  onClick={() => {
                    const next = Math.min(2400, rotorRPM + 600);
                    setRotorRPM(next);
                    soundManager.playThruster();
                    if (next >= 2400 && !isDone) {
                      handleFinish();
                    }
                  }}
                  className="mt-3 flex items-center gap-2 bg-sky-600 hover:bg-sky-500 active:bg-sky-400 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all"
                >
                  <Rocket className="w-4 h-4" />
                  <span>{isAr ? 'زيادة دفع المروحة (تسريع الدوران)' : 'Spin Up Rotors (+600 RPM)'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Success state banner */}
          {isDone && (
            <div className="mt-4 bg-emerald-950/60 border border-emerald-500/60 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-300 animate-in fade-in">
              <span className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {isAr ? 'اكتملت المعايرة بنجاح! تم تسجيل البيانات في السجل الميداني.' : 'Science task verified! Telemetry logged in Field Journal.'}
              </span>
              <button
                onClick={onClose}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 rounded-lg text-xs"
              >
                {isAr ? 'متابعة' : 'Done'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
