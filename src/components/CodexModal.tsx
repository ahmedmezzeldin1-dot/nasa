import React, { useState } from 'react';
import { Language, RobotInfo } from '../game/types';
import { X, Award, CheckCircle2, ShieldCheck, Compass, Sparkles, BookOpen } from 'lucide-react';

interface CodexModalProps {
  robots: RobotInfo[];
  lang: Language;
  onClose: () => void;
  onSelectRobot: (robot: RobotInfo) => void;
}

export const CodexModal: React.FC<CodexModalProps> = ({
  robots,
  lang,
  onClose,
  onSelectRobot,
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'robots' | 'physics' | 'certificate'>('robots');

  const moonRobots = robots.filter((r) => r.stage === 'moon');
  const marsRobots = robots.filter((r) => r.stage === 'mars');
  const completedTotal = robots.filter((r) => r.inspected && r.taskCompleted).length;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{isAr ? 'السجل الميداني لرحلة أرتميس-حورس' : 'Horus-Artemis Field Journal'}</span>
              </h2>
              <div className="text-xs text-slate-400">
                {isAr
                  ? `تم استكشاف ${completedTotal} من أصل ٧ روبوتات تاريخية`
                  : `${completedTotal} of 7 Historical NASA Robotic Explorers Documented`}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('robots')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'robots'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{isAr ? 'سجل الروبوتات (القمر والمريخ)' : 'Robotic Fleet (Moon & Mars)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('physics')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'physics'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAr ? 'مقارنة فيزياء الكواكب' : 'Planetary Physics Guide'}</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'certificate'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'شهادة مستكشف ناسا' : 'Explorer Certificate'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {/* TAB 1: ROBOTS CATALOG */}
          {activeTab === 'robots' && (
            <div className="space-y-6">
              {/* Moon Section */}
              <div>
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span>{isAr ? 'روبوتات القمر (الجاذبية: ١/٦)' : 'Lunar Surface Hardware (1/6th Gravity)'}</span>
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {moonRobots.map((robot) => (
                    <RobotCard
                      key={robot.id}
                      robot={robot}
                      lang={lang}
                      onClick={() => onSelectRobot(robot)}
                    />
                  ))}
                </div>
              </div>

              {/* Mars Section */}
              <div>
                <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>{isAr ? 'مركبات المريخ (الجاذبية: ٣/٨)' : 'Martian Rovers & Probes (3/8th Gravity)'}</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {marsRobots.map((robot) => (
                    <RobotCard
                      key={robot.id}
                      robot={robot}
                      lang={lang}
                      onClick={() => onSelectRobot(robot)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PLANETARY PHYSICS */}
          {activeTab === 'physics' && (
            <div className="space-y-5">
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'ملخص المفاهيم الفيزيائية والبيئية التي شرحها القائد طارق خلال الرحلة الاستكشافية:'
                  : 'Key physical and environmental parameters explained by Commander Tarek during the expedition:'}
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px]">
                    <tr>
                      <th className="p-3">{isAr ? 'البيئة' : 'Parameter'}</th>
                      <th className="p-3 text-blue-400">{isAr ? 'كوكب الأرض' : 'Earth'}</th>
                      <th className="p-3 text-slate-300">{isAr ? 'القمر' : 'The Moon'}</th>
                      <th className="p-3 text-orange-400">{isAr ? 'المريخ' : 'Mars'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-medium">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-slate-200">{isAr ? 'الجاذبية السطحية' : 'Surface Gravity'}</td>
                      <td className="p-3 font-mono tabular-nums text-blue-300">9.81 m/s² (1.0 g)</td>
                      <td className="p-3 font-mono tabular-nums text-slate-300">1.62 m/s² (0.16 g · 1/6th)</td>
                      <td className="p-3 font-mono tabular-nums text-orange-300">3.72 m/s² (0.38 g · 3/8th)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-slate-200">{isAr ? 'الغلاف الجوي' : 'Atmosphere'}</td>
                      <td className="p-3 text-blue-300">{isAr ? 'نيتروجين وأكسجين (١ بار)' : '78% N₂, 21% O₂ (1.0 bar)'}</td>
                      <td className="p-3 text-slate-300">{isAr ? 'فراغ تام (صفر ضغط)' : 'Complete Vacuum (0 bar)'}</td>
                      <td className="p-3 text-orange-300">{isAr ? 'ثاني أكسيد كربون رقيق (٠.٠١ بار)' : '95% CO₂ (0.01 bar · 1%)'}</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-slate-200">{isAr ? 'درجات الحرارة' : 'Temperature Range'}</td>
                      <td className="p-3 text-blue-300">-50°C to +50°C</td>
                      <td className="p-3 text-slate-300">-130°C to +120°C</td>
                      <td className="p-3 text-orange-300">-140°C to +20°C (Avg: -63°C)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-slate-200">{isAr ? 'طبيعة التربة' : 'Soil / Regolith'}</td>
                      <td className="p-3 text-blue-300">{isAr ? 'تربة رطبة وغنية بالحياة' : 'Moist Organic Soil & Rock'}</td>
                      <td className="p-3 text-slate-300">{isAr ? 'ريغوليث رمادي حاد ومكهرب' : 'Electrostatic Glassy Regolith'}</td>
                      <td className="p-3 text-orange-300">{isAr ? 'رمال غنية بصدأ أكسيد الحديد' : 'Iron Oxide (Rust) Crimson Dust'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: OFFICIAL CERTIFICATE */}
          {activeTab === 'certificate' && (
            <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-4 border-amber-500/50 rounded-2xl p-6 sm:p-8 text-center relative shadow-2xl">
              <div className="absolute top-4 left-6 flex items-center gap-2">
                <span className="text-xl">🇪🇬</span>
                <span className="text-xs font-bold text-amber-300">EGYPTIAN EXPEDITION</span>
              </div>
              <div className="absolute top-4 right-6 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[8px] font-bold text-white">
                  NASA
                </div>
                <span className="text-xs font-bold text-sky-400">SPACE APPS CHALLENGE</span>
              </div>

              <ShieldCheck className="w-16 h-16 text-amber-400 mx-auto mt-6 mb-3 animate-pulse" />

              <h2 className="text-xl sm:text-2xl font-black text-amber-300 uppercase tracking-widest">
                {isAr ? 'شهادة تقدير مستكشف الفضاء' : 'Certificate of Space Exploration'}
              </h2>
              <div className="text-xs font-mono text-slate-400 mt-1 mb-4">
                HORUS-ARTEMIS MISSION RECORD #2026-NA-001
              </div>

              <p className="text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
                {isAr
                  ? 'تُمنح هذه الشهادة الرسمية للرواد الأبطال: القائد طارق، فريدة، نور، وعمر لإتمامهم بنجاح الهبوط الاضطراري على القمر، واستكشاف روبوتات ناسا التاريخية، ومواصلة الرحلة نحو سطح المريخ.'
                  : 'Presented with highest honors to Commander Tarek and junior specialists Farida, Nour, and Omar for successfully mastering lunar emergency landing physics, exploring iconic NASA lunar & Martian robotics, and paving the pathway to interplanetary science.'}
              </p>

              <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 max-w-md mx-auto text-xs text-slate-400 font-mono">
                <div>
                  <div className="font-bold text-slate-200">{isAr ? 'رئيس المهمة' : 'Mission Commander'}</div>
                  <div className="text-sky-400">{isAr ? 'القائد طارق' : 'Commander Tarek'}</div>
                </div>
                <div>
                  <div className="font-bold text-slate-200">{isAr ? 'فريق الرواد الصغار' : 'Junior Specialists'}</div>
                  <div className="text-amber-400">Farida · Nour · Omar</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RobotCard: React.FC<{
  robot: RobotInfo;
  lang: Language;
  onClick: () => void;
}> = ({ robot, lang, onClick }) => {
  const isAr = lang === 'ar';
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-xl p-3.5 border transition-all hover:scale-[1.02] flex flex-col justify-between ${
        robot.taskCompleted
          ? 'bg-slate-900/90 border-emerald-500/50 hover:border-emerald-400 shadow-md'
          : robot.inspected
          ? 'bg-slate-900/90 border-sky-500/50 hover:border-sky-400'
          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono text-slate-400">
            {robot.year}
          </span>
          {robot.taskCompleted ? (
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isAr ? 'مكتمل' : 'Completed'}
            </span>
          ) : robot.inspected ? (
            <span className="text-[10px] font-semibold text-sky-400">
              {isAr ? 'تم الفحص' : 'Inspected'}
            </span>
          ) : (
            <span className="text-[10px] text-slate-500 font-mono">
              {isAr ? 'لم يُفحص' : 'Unexplored'}
            </span>
          )}
        </div>
        <div className="text-xs font-bold text-slate-100 leading-snug">
          {isAr ? robot.nameAr : robot.nameEn}
        </div>
      </div>

      <div className="mt-3 text-[11px] text-sky-400 font-medium">
        {isAr ? 'عرض التفاصيل ←' : 'View Specifications →'}
      </div>
    </button>
  );
};
