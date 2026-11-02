import { RobotInfo } from './types';

export const ROBOTS_DATA: RobotInfo[] = [
  // --- MOON ROBOTS ---
  {
    id: 'surveyor_3',
    stage: 'moon',
    nameEn: 'Surveyor 3 Lander',
    nameAr: 'مسبار سيرفيور ٣',
    year: 1967,
    missionTypeEn: 'Robotic Lunar Soft Lander',
    missionTypeAr: 'مسبار الهبوط الناعم غير المأهول',
    x: 620,
    whyBuiltEn: 'NASA needed to prove spacecraft could soft-land on the Moon and verify that the lunar soil would not swallow heavy Apollo astronaut landers like quicksand.',
    whyBuiltAr: 'بَنَته ناسا لإثبات إمكانية الهبوط الناعم للمركبات الفضائية والتأكد من أن تربة القمر صلبة ولن تبتلع مركبات رواد فضاء أبولو مثل الرمال المتحركة.',
    whyLeftEn: 'Surveyor was designed as an expendable robotic scout with no return engine. In 1969, Apollo 12 astronauts Pete Conrad and Alan Bean landed right next to it and retrieved its camera to study 2.5 years of lunar exposure!',
    whyLeftAr: 'صُمم كمسبار استكشافي بدون محرك عودة. وفي عام ١٩٦٩، هبط رواد فضاء أبولو ١٢ بجواره مباشرة واستعادوا كاميرته لدراسة تأثير بيئة القمر القاسية على المواد بعد عامين ونصف!',
    featuresEn: [
      'Articulated surface sampling scoop arm',
      'High-resolution Vidicon television camera',
      'Tripod landing legs with crushable aluminum honeycomb footpads',
      'Solar panel mast providing 89 watts of electrical power'
    ],
    featuresAr: [
      'ذراع حفر آلية متمفصلة لجمع عينات التربة',
      'كاميرا تلفزيونية فائقة الدقة بنظام فيديكون',
      'أرجل هبوط ثلاثية مزودة بوسائد ألومنيوم لامتصاص الصدمات',
      'لوح شمسي علوي يوفر ٨٩ واط من الطاقة الكهربائية'
    ],
    achievementsEn: [
      'First robot to dig into lunar regolith and test soil mechanical bearing strength',
      'Transmitted 6,315 historic high-resolution television images of the Moon',
      'Only robotic probe visited by humans on another celestial body (Apollo 12)'
    ],
    achievementsAr: [
      'أول روبوت يحفر في تربة القمر ويختبر قدرة تحملها الميكانيكية لرواد الفضاء',
      'أرسل ٦,٣١٥ صورة تلفزيونية تاريخية واضحة لسطح القمر',
      'الروبوت الوحيد الذي زاره رواد فضاء بشريون على سطح جرم سماوي آخر (أبولو ١٢)'
    ],
    miniTask: {
      id: 'soil_sample',
      titleEn: 'Surveyor Scoop & Camera Diagnostic',
      titleAr: 'اختبار مجرفة سيرفيور وفحص الكاميرا',
      objectiveEn: 'Deploy the mechanical scoop arm to dig 5 cm into the lunar regolith and calibrate the Vidicon television camera.',
      objectiveAr: 'مد الذراع الآلية للحفر بعمق ٥ سم في تربة القمر ومعايرة الكاميرا التلفزيونية لالتقاط الصورة.',
      interactionHintEn: 'Click and drag the mechanical arm down to collect the lunar regolith sample.',
      interactionHintAr: 'اسحب الذراع الآلية للأسفل لجمع عينة من تربة القمر واختبار كثافتها.'
    },
    inspected: false,
    taskCompleted: false
  },
  {
    id: 'apollo_lrv',
    stage: 'moon',
    nameEn: 'Apollo Lunar Roving Vehicle (LRV)',
    nameAr: 'عربة القمر المتجولة (أبولو LRV)',
    year: 1971,
    missionTypeEn: 'Manned Surface Exploration Electric Rover',
    missionTypeAr: 'عربة كهربائية لاستكشاف سطح القمر',
    x: 1350,
    whyBuiltEn: 'NASA built the Lunar Rover (the "Moon Buggy") so Apollo 15, 16, and 17 astronauts could venture miles away from the Lunar Module and explore mountain ranges and deep rilles.',
    whyBuiltAr: 'صممتها ناسا لتمكين رواد فضاء أبولو ١٥ و١٦ و١٧ من الابتعاد كيلومترات عن مركبة الهبوط واستكشاف السلاسل الجبلية والوديان السحيقة.',
    whyLeftEn: 'The rover weighed 210 kg. To lift off from the Moon, every ounce mattered—astronauts abandoned the rovers and scientific pallets to trade vehicle weight for 110 kg of precious Moon rocks!',
    whyLeftAr: 'كانت تزن ٢١٠ كجم. للعودة إلى الأرض، كانت كل غرامة تُحسب، فترك الرواد العربات على السطح لتوفير الوزن وحمل ١١٠ كجم من صخور القمر الثمينة بدلاً منها!',
    featuresEn: [
      'Four open-mesh wheels woven from zinc-coated steel wire with titanium chevrons (no rubber tires in vacuum!)',
      'Four independent 0.25-horsepower electric motors inside each wheel hub',
      'High-Gain parabolic dish antenna for live color TV broadcasting to Earth',
      'T-shaped hand controller operable with bulky pressurized spacesuit gloves'
    ],
    featuresAr: [
      'أربع عجلات شبكية مصنوعة من أسلاك الفولاذ المطلي بالزنك مع حواف تيتانيوم (لا يمكن استخدام الإطارات المطاطية في الفراغ!)',
      'أربعة محركات كهربائية مستقلة بقوة ربع حصان داخل محور كل عجلة',
      'هوائي طبقي عالي الكسب لبث الفيديو الملون المباشر إلى الأرض',
      'مقبض تحكم يدوي على شكل حرف T سهل القيادة بقفازات بدلة الفضاء الضخمة'
    ],
    achievementsEn: [
      'Expanded astronaut exploration distance from hundreds of meters to 35.9 km',
      'Reached top speeds of 18 km/h over rough lunar boulder fields',
      'Helped Apollo 17 discover famous orange pyroclastic volcanic soil at Shorty Crater'
    ],
    achievementsAr: [
      'وسعت نطاق استكشاف الإنسان للقمر من مئات الأمتار إلى ٣٥.٩ كيلومتر',
      'وصلت سرعتها القصوى إلى ١٨ كم/ساعة فوق حقول الصخور القمرية الوعرة',
      'ساعدت رواد أبولو ١٧ في اكتشاف التربة البركانية البرتقالية الشهيرة في فوهة شورتي'
    ],
    miniTask: {
      id: 'antenna_align',
      titleEn: 'Mesh Wheel & Antenna Alignment',
      titleAr: 'محاذاة هوائي العربة وفحص الإطارات الشبكية',
      objectiveEn: 'Align the high-gain dish antenna directly toward Earth and inspect the zinc-mesh wheels for regolith wear.',
      objectiveAr: 'اضبط اتجاه الهوائي نحو كوكب الأرض وافحص سلامة الأسلاك الفولاذية في العجلات.',
      interactionHintEn: 'Rotate the dish antenna slider until the telemetry signal reaches 100%.',
      interactionHintAr: 'حرك مقبض الهوائي حتى يصل مؤشر الاتصال بالأرض إلى ١٠٠٪.'
    },
    inspected: false,
    taskCompleted: false
  },
  {
    id: 'viper_prospector',
    stage: 'moon',
    nameEn: 'VIPER Polar Ice Rover',
    nameAr: 'روبوت فايبر لاستكشاف الجليد القطبي',
    year: 2024,
    missionTypeEn: 'Polar Shadowed Crater Water Scout',
    missionTypeAr: 'مستكشف المياه في فوهات القطب الجنوبي المظلمة',
    x: 2100,
    whyBuiltEn: 'NASA engineered polar rovers to venture into the freezing, permanently shadowed craters of the Moon’s South Pole where sunlight never reaches and water ice has survived for billions of years.',
    whyBuiltAr: 'طوّرته ناسا للتوغل في الفوهات المظلمة دائماً في القطب الجنوبي للقمر، حيث لا تصل أشعة الشمس أبداً، ويبقى الجليد المائي محفوظاً منذ مليارات السنين.',
    whyLeftEn: 'Stationed on the Moon as a permanent robotic scout, providing ground-truth ice coordinates for future Artemis astronaut bases and rocket fuel manufacturing plants.',
    whyLeftAr: 'يرابط على القمر كروبوت استطلاعي دائم لتحديد مواقع مكامن الجليد بدقة، لتزويد قواعد رواد برنامج أرتميس بمياه الشرب ووقود الصواريخ الهيدروجيني.',
    featuresEn: [
      'TRIDENT 1-meter percussion drill capable of penetrating frozen icy lunar regolith',
      'Neutron Spectrometer System (NSS) detecting hydrogen atoms below ground',
      'High-power LED headlights designed to navigate pitch-black polar shadow realms',
      'Agile 4-wheel independent steering and suspension to crawl out of loose slopes'
    ],
    featuresAr: [
      'مثقاب ترايدنت بعمق متر لاختراق طبقات الجليد والتربة القمرية المتجمدة',
      'نظام مطياف النيوترونات للكشف عن ذرات الهيدروجين والمياه تحت الأرض',
      'كشافات LED عالية السطوع للملاحة داخل الفوهات شديدة الظلام والبرودة',
      'نظام تعليق وتوجيه رباعي مستقل لتخطي المنحدرات الرملية الشديدة'
    ],
    achievementsEn: [
      'Pioneered subsurface robotic ice mapping technology for deep space exploration',
      'Demonstrated autonomous hazard evasion in extreme lunar cold down to -240°C',
      'Created the foundational water resource map for human colonization of the Moon'
    ],
    achievementsAr: [
      'رائد تقنيات المسح الروبوتي للجليد تحت السطحي في الفضاء العميق',
      'أثبت كفاءة الحركة الذاتية في درجات برودة قياسية تصل إلى -٢٤٠ درجة مئوية',
      'صمم خريطة الموارد المائية الأساسية لإنشاء أول مستعمرة بشرية مستدامة على القمر'
    ],
    miniTask: {
      id: 'neutron_calibrate',
      titleEn: 'TRIDENT Drill & Neutron Ice Calibration',
      titleAr: 'معايرة مثقاب ترايدنت ومطياف النيوترونات',
      objectiveEn: 'Synchronize the neutron spectrometer frequencies to identify hydrogen signatures in the frozen subsurface.',
      objectiveAr: 'اضبط ترددات مطياف النيوترونات لاكتشاف ذرات الهيدروجين الدالة على الجليد المائي.',
      interactionHintEn: 'Match the target frequency wave using the pulse slider to lock the ice reading.',
      interactionHintAr: 'طابق تردد الموجة باستخدام المزلاج لتثبيت قراءة الجليد المائي بدقة.'
    },
    inspected: false,
    taskCompleted: false
  },

  // --- MARS ROBOTS ---
  {
    id: 'sojourner',
    stage: 'mars',
    nameEn: 'Sojourner Rover & Pathfinder',
    nameAr: 'الروبوت سوجورنر ومسبار باثفايندر',
    year: 1997,
    missionTypeEn: 'First Robotic Planetary Microrover',
    missionTypeAr: 'أول روبوت متجول على كوكب آخر في التاريخ',
    x: 650,
    whyBuiltEn: 'NASA built Sojourner as a low-cost technology demonstration to prove a wheeled robotic rover could survive and drive autonomously on the rocky, freezing Martian surface.',
    whyBuiltAr: 'بَنَته ناسا كإثبات تجريبي منخفض التكلفة يبرهن على قدرة روبوت ذي عجلات على النجاة والقيادة الذاتية فوق سطح المريخ الصخري المتجمد.',
    whyLeftEn: 'Sojourner weighed just 10.5 kg (the size of a microwave oven) and had no return propulsion. It exceeded its 7-day planned mission to operate for 83 Martian sols on Ares Vallis.',
    whyLeftAr: 'كان يزن ١٠.٥ كجم فقط (بحجم فرن الميكروويف) وبدون وسيلة عودة. تجاوز مهمته المقدرة بـ ٧ أيام ليعمل ٨٣ يوماً مريخياً حتى نفدت بطاريته في وادي آريس فالي.',
    featuresEn: [
      'Innovative 6-wheel Rocker-Bogie suspension that climbs rocks taller than its wheels',
      'Alpha Particle X-Ray Spectrometer (APXS) mounted on a deployment arm',
      'Solar array generating 16 watts of electrical power in the thin Martian sun',
      'Integrated stereo hazard cameras for autonomous obstacle navigation'
    ],
    featuresAr: [
      'نظام تعليق سداسي العجلات مبتكر (روكر-بوجي) لتسلق صخور تفوق حجم عجلاته',
      'مطياف جسيمات ألفا والأشعة السينية (APXS) لتحليل التركيب العنصري للصخور',
      'لوح شمسي علوي يوفر ١٦ واط من الطاقة تحت شمس المريخ الخافتة',
      'كاميرات ستيريو مجسمة أمامية للملاحة الذاتية وتفادي الحفر'
    ],
    achievementsEn: [
      'First mobile wheeled robot ever to operate on another planet in human history',
      'Drove 100 meters across Ares Vallis and analyzed famous rocks "Yogi" and "Barnacle Bill"',
      'Proved that Ares Vallis was formed by catastrophic ancient mega-floods of liquid water'
    ],
    achievementsAr: [
      'أول مركبة روبوتية متجولة على الإطلاق تتحرك وتعمل على سطح كوكب آخر',
      'قطع مسافة ١٠٠ متر وحلل صخور المريخ الشهيرة مثل "يوجي" و"بارناكل بيل"',
      'أثبت أن منطقة هبوطه تشكلت نتيجة فيضانات مائية جارفة وعظيمة في ماضي المريخ'
    ],
    miniTask: {
      id: 'solar_dust',
      titleEn: 'Solar Panel Dust Brush & Rock APXS Scan',
      titleAr: 'إزالة الغبار عن الألواح الشمسية وفحص صخرة يوجي',
      objectiveEn: 'Clear Martian red regolith dust from Sojourner’s solar cells and target the APXS sensor on volcanic basalt.',
      objectiveAr: 'نظف الغبار المريخي المتراكم على اللوح الشمسي ووجّه مستشعر الأشعة السينية نحو الصخرة.',
      interactionHintEn: 'Swipe your mouse or finger across the solar panel to clean the red dust.',
      interactionHintAr: 'مرر الماوس أو إصبعك فوق اللوح الشمسي لمسح الغبار المريخي واستعادة الطاقة.'
    },
    inspected: false,
    taskCompleted: false
  },
  {
    id: 'opportunity',
    stage: 'mars',
    nameEn: 'Opportunity Rover (MER-B)',
    nameAr: 'المسبار المتجول أوبورتيونيتي (فرصة)',
    year: 2004,
    missionTypeEn: 'Mars Exploration Long-Range Geologist',
    missionTypeAr: 'مستكشف جيولوجيا المريخ بعيد المدى',
    x: 1380,
    whyBuiltEn: 'NASA launched Spirit and Opportunity to "Follow the Water"—investigating whether rocks and soils contained minerals that could only form in persistent liquid water.',
    whyBuiltAr: 'أطلقته ناسا وفق استراتيجية "تتبع المياه" لمعرفة ما إذا كانت صخور وتربة المريخ تحتوي على معادن لا تتشكل إلا بوجود مياه سائلة جارية.',
    whyLeftEn: 'Opportunity was engineered for 90 days. Miraculously, Martian dust devils repeatedly cleaned its solar arrays, allowing it to explore for nearly 15 years until a global dust storm in 2018.',
    whyLeftAr: 'صُمم ليعمل ٩٠ يوماً فقط! لكن دوامات الرياح المريخية كانت تنظف ألواحه الشمسية بانتظام، فظل يجوب المريخ قرابة ١٥ عاماً حتى حجبته عاصفة غبار كوكبية عام ٢٠١٨.',
    featuresEn: [
      'Rock Abrasion Tool (RAT) with diamond-tipped grind wheels to shave weathered rock crusts',
      'Microscopic Imager capturing sub-millimeter grain textures of Martian stones',
      'Pancam panoramic mast cameras providing full 360-degree color stereo vision',
      'Foldable solar wing arrays with thermal survival radioisotope heater units (RHUs)'
    ],
    featuresAr: [
      'أداة كشط الصخور (RAT) برؤوس ألماسية لإزالة القشرة السطحية ودراسة باطن الصخر',
      'كاميرا تصوير مجهري لالتقاط صور دقيقة لتراكيب الحبيبات المعدنية بدقة فائقة',
      'كاميرا بانورامية علوية مزدوجة لرؤية ثلاثية الأبعاد بزاوية ٣٦٠ درجة للمحيط',
      'أجنحة شمسية قابلة للطي مع وحدات تدفئة بنظائر مشعة لحماية الأجهزة من الصقيع'
    ],
    achievementsEn: [
      'Drove 45.16 kilometers—the all-time longest off-world driving record of any spacecraft',
      'Discovered microscopic hematite spheres ("Martian blueberries") formed in acidic groundwater',
      'Proved conclusively that ancient Mars had lakes, rivers, and groundwater systems'
    ],
    achievementsAr: [
      'قطع ٤٥.١٦ كيلومتراً، مسجلاً أطول مسافة قيادة على سطح جرم سماوي في تاريخ البشرية',
      'اكتشف كرات الهيماتيت المجهرية ("توت العليق المريخي") التي تشكلت داخل مياه جوفية سائلة',
      'قدم الدليل القاطع على أن المريخ القديم كان يزخر ببحيرات وأنهار مائية دافئة'
    ],
    miniTask: {
      id: 'hematite_inspect',
      titleEn: 'Microscopic Imager & Hematite Analysis',
      titleAr: 'الفحص المجهري لكرات الهيماتيت المائية',
      objectiveEn: 'Focus the microscopic lens on the sedimentary bedrock to confirm the presence of water-formed hematite blueberries.',
      objectiveAr: 'اضبط تركيز العدسة المجهرية على الصخرة لتأكيد وجود كرات الهيماتيت المتكونة بالمياه.',
      interactionHintEn: 'Adjust the focus dial until the sub-millimeter blueberries become razor sharp.',
      interactionHintAr: 'اضبط قرص التركيز البصري حتى تتضح كرات الهيماتيت الزرقاء وتظهر علامة المياه.'
    },
    inspected: false,
    taskCompleted: false
  },
  {
    id: 'curiosity',
    stage: 'mars',
    nameEn: 'Curiosity Rover (MSL)',
    nameAr: 'مختبر علوم المريخ: كيوريوسيتي (الفضول)',
    year: 2012,
    missionTypeEn: 'Mobile Nuclear-Powered Science Laboratory',
    missionTypeAr: 'مختبر علمي نووي متجول على المريخ',
    x: 2150,
    whyBuiltEn: 'NASA built Curiosity to determine whether Mars ever offered an environment hospitable to microscopic life, measuring organics, radiation, and ancient habitable lake chemistry.',
    whyBuiltAr: 'بَنَته ناسا لاكتشاف ما إذا كان المريخ قد احتضن في ماضيه بيئات صالحة لنشأة الحياة المجهرية، وقياس الإشعاع والمركبات العضوية في بحيرات فوهة غيل القديمة.',
    whyLeftEn: 'Curiosity is an active, ongoing mission powered by a plutonium nuclear generator (MMRTG), continually climbing Mount Sharp inside Gale Crater.',
    whyLeftAr: 'مهمة مستمرة ونشطة حتى اليوم! يعمل بمولد كهربائي نووي حراري بوقود البلوتونيوم، ولا يزال يتسلق جبل شارب وسط فوهة غيل لدراسة طبقات التاريخ المريخي.',
    featuresEn: [
      'Multi-Mission Radioisotope Thermoelectric Generator (MMRTG) providing round-the-clock nuclear electricity and heat',
      'ChemCam infrared laser that vaporizes rock targets from 7 meters away to read atomic plasma spectra',
      'SAM (Sample Analysis at Mars) internal chemical chemistry lab with gas chromatograph & mass spectrometer',
      'Heavy-duty percussion drill that pulverizes stone into fine gray powder for onboard baking'
    ],
    featuresAr: [
      'مولد نووي حراري بالنظائر المشعة يوفر طاقة كهربائية وحرارية مستمرة ليلاً ونهاراً',
      'ليزر كيم كام بالأشعة تحت الحمراء لتبخير الصخور عن بُعد ٧ أمتار وتحليل طيف البلازما',
      'مختبر سام الداخلي المجهز بفرن ومطياف كتلة لتحليل المركبات الكيميائية العضوية',
      'مثقاب صدمي قوي يفتت الصخور الصلبة إلى مسحوق ناعم للتحليل الكيميائي المعملي'
    ],
    achievementsEn: [
      'Discovered that ancient Gale Crater held a long-lived freshwater lake with neutral pH and all essential life ingredients (CHNOPS)',
      'Detected complex organic molecules (carbon-based building blocks) locked in 3-billion-year-old mudstones',
      'Measured cyclical seasonal variations of methane gas in the Martian atmosphere'
    ],
    achievementsAr: [
      'أثبت أن فوهة غيل كانت تحتوي على بحيرة مياه عذبة نقية صالحة للحياة لآلاف السنين',
      'اكتشف جزيئات عضوية كربونية معقدة محفوظة في صخور طينية عمرها ٣ مليارات عام',
      'رصد تقلبات موسمية غامضة في نسب غاز الميثان في الغلاف الجوي للمريخ'
    ],
    miniTask: {
      id: 'chemcam_laser',
      titleEn: 'ChemCam Laser Ablation & Powder Drill',
      titleAr: 'إطلاق ليزر كيم كام وتحليل العينة الصخرية',
      objectiveEn: 'Fire 3 focused laser pulses at the target mudstone to vaporize rock plasma and measure organic carbon spectra.',
      objectiveAr: 'أطلق ٣ نبضات ليزرية مركزة لتبخير الصخر وقراءة البصمة الطيفية للكربون العضوي.',
      interactionHintEn: 'Click the laser trigger button 3 times to fire laser pulses and view the spectrum.',
      interactionHintAr: 'انقر على زر الليزر ٣ مرات لإطلاق حزم الليزر وتفريغ بيانات البلازما.'
    },
    inspected: false,
    taskCompleted: false
  },
  {
    id: 'perseverance_ingenuity',
    stage: 'mars',
    nameEn: 'Perseverance Rover & Ingenuity Helicopter',
    nameAr: 'المسبار بيرسيفيرنس والمروحية إنجينويتي',
    year: 2021,
    missionTypeEn: 'Sample Return Astrobiology & Aerial Scout',
    missionTypeAr: 'جمع عينات الحياة القديمة وأول طيران فضائي',
    x: 2950,
    whyBuiltEn: 'NASA sent Perseverance to seek biosignatures of ancient life in Jezero Crater’s river delta and seal core samples for return to Earth. Ingenuity was sent to achieve the first powered flight on another planet!',
    whyBuiltAr: 'أرسلتهما ناسا للبحث عن آثار لحياة ميكروبية قديمة في دلتا نهر فوهة جيزيرو وحفظ عينات الصخور في أنابيب للعودة بها إلى الأرض، واختبار أول طيران آلي في الغلاف الجوي لمريخ!',
    whyLeftEn: 'Currently active and driving across Jezero Crater. Ingenuity flew 72 legendary flights in Mars’ ultra-thin atmosphere (1% Earth density) before retiring gracefully on the sands.',
    whyLeftAr: 'يعملان بنشاط حالياً. أكملت المروحية إنجينويتي ٧٢ رحلة طيران أسطورية في غلاف المريخ الرقيق (١٪ من كثافة هواء الأرض) محققة إنجازاً تاريخياً يفوق الخيال.',
    featuresEn: [
      'MOXIE instrument that converts carbon dioxide (CO₂) from the Martian atmosphere into pure breathable oxygen (O₂)',
      'Ingenuity Helicopter: 1.8 kg drone with dual counter-rotating carbon fiber blades spinning at 2,400 RPM',
      'Corer drill turret that hermetically seals rock core cylinders in ultra-clean titanium tubes',
      'SuperCam, PIXL, and SHERLOC spectrometers using ultraviolet lasers to detect micro-fossils'
    ],
    featuresAr: [
      'جهاز موكسي (MOXIE) الذي يستخرج الأكسجين النقي القابل للتنفس من غاز ثاني أكسيد الكربون المريخي',
      'المروحية إنجينويتي: مروحية بوزن ١.٨ كجم بشفرات كربونية تدور بسرعة ٢,٤٠٠ دورة في الدقيقة',
      'برج حفر وتعبئة متطور يختم أسطوانات الصخور بإحكام داخل أنابيب تيتانيوم معقمة',
      'أجهزة سوبركام وشيرلوك التي تستخدم ليزر الأشعة فوق البنفسجية لرصد البقايا العضوية المجهرية'
    ],
    achievementsEn: [
      'Ingenuity achieved the first powered, controlled flight on another world (the "Wright Brothers moment" of space)',
      'Successfully produced oxygen from Martian air with MOXIE, paving the way for human explorers',
      'Cached dozens of rock samples in Jezero river delta for future NASA-ESA Mars Sample Return to Earth'
    ],
    achievementsAr: [
      'حققت إنجينويتي أول طيران آلي موجه على سطح كوكب آخر (لحظة الأخوين رايت في تاريخ الفضاء)',
      'نجح جهاز موكسي في تصنيع الأكسجين البشري من هواء المريخ، تمهيداً لوصول رواد الفضاء',
      'جمعت وحفظت عشرات العينات الصخرية المليئة بالأسرار في انتظار نقلها للأرض عبر مهمة العودة'
    ],
    miniTask: {
      id: 'ingenuity_flight',
      titleEn: 'Ingenuity Rotor Test & Sample Seal',
      titleAr: 'اختبار شفرات إنجينويتي وختم أنبوب العينات',
      objectiveEn: 'Spin Ingenuity’s counter-rotating blades to 2,400 RPM to lift off and hermetically seal the Jezero delta rock core.',
      objectiveAr: 'دوّر شفرات مروحية إنجينويتي للوصول لسرعة ٢,٤٠٠ دورة بالدقيقة للإقلاع وختم أنبوب العينة.',
      interactionHintEn: 'Hold down the throttle button until the RPM bar reaches green lift-off speed.',
      interactionHintAr: 'اضغط واستمر بالضغط على زر الدفع لرفع سرعة دوران الشفرات حتى الإقلاع.'
    },
    inspected: false,
    taskCompleted: false
  }
];
