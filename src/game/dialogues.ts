import { DialogueNode } from './types';

export const INTRO_MALFUNCTION_DIALOGUES: DialogueNode[] = [
  {
    speaker: 'mentor',
    textEn: 'Crew of the Horus-Artemis, prepare for orbital burn! We are 48 hours into our deep-space voyage toward Mars.',
    textAr: 'طاقم المركبة حورس-أرتميس، استعدوا لمناورة الدفع المداري! لقد قطعنا ٤٨ ساعة في رحلتنا بالفضاء العميق نحو المريخ.',
    expression: 'proud',
  },
  {
    speaker: 'farida',
    textEn: 'Commander Tarek! Our trajectory looks solid, but I am reading anomalous heat spikes in the ion propulsion manifold!',
    textAr: 'أيها القائد طارق! المسار المداري يبدو مستقراً، لكنني أرصد ارتفاعاً حرارياً غير معتاد في غرفة محركات الدفع الأيوني!',
    expression: 'concerned',
  },
  {
    speaker: 'system',
    textEn: 'WARNING: Primary thruster valve failure. Trajectory to Mars destabilizing. Emergency abort vector required.',
    textAr: 'تحذير: عطل في صمام الدفع الرئيسي. مسار المريخ غير مستقر. يُرجى تفعيل مسار الهبوط الاضطراري فوراً.',
    expression: 'concerned',
  },
  {
    speaker: 'omar',
    textEn: 'Can we make it to Mars on auxiliary thrusters?! The engines are stuttering!',
    textAr: 'هل يمكننا الوصول إلى المريخ بالمحركات الاحتياطية؟! المحركات بدأت تهتز بعنف!',
    expression: 'concerned',
  },
  {
    speaker: 'nour',
    textEn: 'Negative, Omar! We do not have sufficient delta-V to enter Mars orbit without full thruster manifolds.',
    textAr: 'مستحيل يا عمر! لا نملك قوة دفع كافية لدخول مدار المريخ دون إصلاح صمامات التوجيه بالكامل.',
    expression: 'concerned',
  },
  {
    speaker: 'mentor',
    textEn: 'Stay calm, crew. The Moon is right within our emergency abort corridor. Helm, lock descent coordinates for the lunar surface!',
    textAr: 'حافظوا على هدوئكم يا أبطال. القمر يقع مباشرة داخل مسار الهبوط الاضطراري. اضبطوا مسار الهبوط نحو سطح القمر فوراً!',
    expression: 'normal',
  },
  {
    speaker: 'system',
    textEn: 'Retro-thrusters engaged. Landing gear deployed... Touchdown confirmed on the lunar regolith.',
    textAr: 'تشغيل صواريخ الكبح العكسي. نشر أرجل الهبوط... تم تأكيد الهبوط بسلام على سطح القمر.',
    expression: 'normal',
  },
];

export const MOON_ARRIVAL_DIALOGUES: DialogueNode[] = [
  {
    speaker: 'mentor',
    textEn: 'We have made an emergency landing on the Moon! Everyone, check your life support suits. Both the Egyptian and NASA emblems are sealed and pressurized.',
    textAr: 'لقد هبطنا اضطرارياً بسلام على القمر! تأكدوا جميعاً من أجهزة دعم الحياة في بدلاتكم. شعارا مصر وناسا مؤمنان وتحت الضغط المناسب.',
    expression: 'proud',
  },
  {
    speaker: 'farida',
    textEn: 'Whoa! Look outside! The sky is pitch black even though the sun is blazing right at us! Why is there no blue sky like Earth?',
    textAr: 'يا للهول! انظروا إلى الخارج! السماء شديدة السواد بالرغم من سطوع الشمس الحارق! لماذا لا نرى سماءً زرقاء مثل كوكب الأرض؟',
    expression: 'curious',
  },
  {
    speaker: 'mentor',
    textEn: 'Great observation, Farida! The Moon is a pure vacuum—it has no atmosphere to scatter sunlight into blue hues. And without air, sound cannot travel in open space, so our helmets communicate via radio waves.',
    textAr: 'ملاحظة رائعة يا فريدة! القمر فراغ تام، بلا غلاف جوي لتشتيت ضوء الشمس إلى اللون الأزرق. ودون هواء، لا ينتقل الصوت في الفضاء، لذا نتحدث عبر موجات الراديو في خوذاتنا.',
    expression: 'normal',
  },
  {
    speaker: 'omar',
    textEn: 'Commander, I just took a step and I floated nearly three meters in the air! It feels like super-jumping!',
    textAr: 'أيها القائد، لقد خطوت خطوة واحدة فطِرتُ ثلاثة أمتار في الهواء! أشعر وكأنني أملك قوى خارقة للقفز!',
    expression: 'excited',
  },
  {
    speaker: 'mentor',
    textEn: 'That is lunar gravity, Omar! The Moon has only 1/6th of Earth’s gravity (1.62 m/s²). You weigh six times less here, so you can leap with minimal effort.',
    textAr: 'إنها جاذبية القمر يا عمر! جاذبية القمر سُدس (١/٦) جاذبية الأرض فقط (١.٦٢ م/ث²). وزنك هنا أخف بست مرات، لذا تقفز بكل سهولة وخفة.',
    expression: 'normal',
  },
  {
    speaker: 'nour',
    textEn: 'Our ship’s thruster diagnostics are down. But look at our radar—NASA has left legendary robotic hardware on this surface over the past 50 years!',
    textAr: 'نظام تشخيص المحركات معطل. لكن انظروا للرادار—ناسا تركت روبوتات ومركبات أسطورية على هذا السطح خلال الـ ٥٠ عاماً الماضية!',
    expression: 'curious',
  },
  {
    speaker: 'mentor',
    textEn: 'Exactly, Nour! By inspecting Surveyor 3, the Apollo Lunar Rover, and VIPER, we can learn from their durable engineering, gather telemetry calibration data, and fix our spacecraft to resume our journey to Mars! Let’s explore!',
    textAr: 'بالضبط يا نور! بفحص مسبار سيرفيور، وعربة أبولو، وروبوت فايبر، سنتعلم من هندستها المتطورة ونجمع بيانات لمعايرة أنظمة مركبتنا لننطلق مجدداً إلى المريخ! هيا نستكشف!',
    expression: 'excited',
  },
];

export const MOON_DEPARTURE_DIALOGUES: DialogueNode[] = [
  {
    speaker: 'nour',
    textEn: 'Commander! Using the telemetry from the NASA lunar robots and the wire-mesh wheel diagnostics, I successfully recalibrated our ship’s primary thruster manifold!',
    textAr: 'أيها القائد! بالاستفادة من بيانات روبوتات ناسا وفحص أنظمة عربة أبولو، تمكنتُ بنجاح من إعادة معايرة صمامات محركات مركبتنا!',
    expression: 'excited',
  },
  {
    speaker: 'farida',
    textEn: 'The fuel cells are holding steady at 100%. All three kids and Commander Tarek are sealed in the airlock. We are cleared for takeoff!',
    textAr: 'خلايا الوقود مستقرة عند ١٠٠٪. نحن الرواد الثلاثة والقائد طارق بداخل حجرة الضغط. جاهزون تماماً للإقلاع!',
    expression: 'proud',
  },
  {
    speaker: 'omar',
    textEn: 'Next stop: The Red Planet! Mars, here comes the Egyptian-NASA expedition!',
    textAr: 'المحطة القادمة: الكوكب الأحمر! استعد يا مريخ، طاقم الشراكة المصرية-الأمريكية قادم إليك!',
    expression: 'excited',
  },
  {
    speaker: 'mentor',
    textEn: 'Ignition in 3... 2... 1... Liftoff! Setting interplanetary trajectory for Mars orbit!',
    textAr: 'بدء الإشعال في ٣... ٢... ١... إقلاع! نضبط المسار بين الكواكب نحو مدار المريخ!',
    expression: 'proud',
  },
];

export const MARS_ARRIVAL_DIALOGUES: DialogueNode[] = [
  {
    speaker: 'system',
    textEn: 'Atmospheric entry interface detected. Heat shield temperature: 1,800°C. Parachutes deployed... Skycrane touchdown confirmed at Jezero Crater, Mars.',
    textAr: 'بدء اختراق الغلاف الجوي. حرارة الدرع الواقي: ١,٨٠٠ درجة مئوية. نشر المظلات... تم تأكيد الهبوط الآمن في فوهة جيزيرو بالمريخ.',
    expression: 'normal',
  },
  {
    speaker: 'mentor',
    textEn: 'Welcome to Mars, junior explorers! Step out into the red desert of Jezero Crater!',
    textAr: 'أهلاً بكم على سطح المريخ يا روادنا الصغار! انزلوا واستمتعوا بالصحراء الحمراء المهيبة في فوهة جيزيرو!',
    expression: 'excited',
  },
  {
    speaker: 'farida',
    textEn: 'Look at the ground! It is glowing rust-orange, and the sky is butterscotch pink! Why is everything red?',
    textAr: 'انظروا إلى الأرض! إنها تتوهج بلون صدئ برتقالي، والسماء تميل للون الوردي الخوخي! لماذا كل شيء أحمر هنا؟',
    expression: 'curious',
  },
  {
    speaker: 'mentor',
    textEn: 'Because of iron oxide, Farida—the exact same chemical as rust on Earth! The Martian surface is literally covered in rusted iron regolith, which dust storms sweep high into the atmosphere.',
    textAr: 'بسبب أكسيد الحديد يا فريدة—وهو نفس التركيب الكيميائي للصدأ على الأرض! تربة المريخ مغطاة برمال غنية بالحديد الصدئ، وتنثرها العواصف في الهواء.',
    expression: 'normal',
  },
  {
    speaker: 'omar',
    textEn: 'Walking feels heavier than the Moon, but still way lighter than Earth! How strong is Mars gravity?',
    textAr: 'المشي هنا أثقل من القمر، لكنه أخف بكثير من الأرض! كم تبلغ جاذبية المريخ؟',
    expression: 'curious',
  },
  {
    speaker: 'mentor',
    textEn: 'Mars gravity is about 3/8th of Earth’s (3.72 m/s²). If you weigh 40 kg on Earth, you only weigh about 15 kg here! And unlike the vacuum of the Moon, Mars has an atmosphere—though it is 95% carbon dioxide and only 1% as thick as Earth’s air.',
    textAr: 'جاذبية المريخ حوالي ٣/٨ من جاذبية الأرض (٣.٧٢ م/ث²). إذا كان وزنك ٤٠ كجم على الأرض، فسيزن هنا ١٥ كجم فقط! وخلافاً للقمر، يمتلك المريخ غلافاً جوياً رقيقاً، ٩٥٪ منه غاز ثاني أكسيد الكربون، وضغطه ١٪ فقط من ضغط هواء الأرض.',
    expression: 'normal',
  },
  {
    speaker: 'nour',
    textEn: 'And look along this ancient river delta! There are iconic NASA rovers stationed here: Sojourner, Opportunity, Curiosity, and Perseverance with Ingenuity!',
    textAr: 'وانظروا على طول دلتا هذا النهر القديم! توجد هنا روبوتات ناسا التاريخية: سوجورنر، وأوبورتيونيتي، وكيوريوسيتي، وبيرسيفيرنس مع المروحية إنجينويتي!',
    expression: 'excited',
  },
  {
    speaker: 'mentor',
    textEn: 'Indeed! Each rover unlocked groundbreaking secrets of water, organic chemistry, and powered flight. Let’s inspect every one of them and complete our scientific field log!',
    textAr: 'بالتأكيد! لقد كشف كل روبوت أسراراً مذهلة عن المياه والكيمياء العضوية وأول طيران فضائي. دعونا نفحص كل روبوت منها ونكمل سجلنا العلمي الميداني!',
    expression: 'excited',
  },
];

export const MISSION_COMPLETE_DIALOGUES: DialogueNode[] = [
  {
    speaker: 'mentor',
    textEn: 'Incredible work, team! Farida, Nour, and Omar—you have mastered lunar and Martian physics, explored seven historic NASA robotic pioneers, and proven the power of international space exploration!',
    textAr: 'عمل بطولي استثنائي يا أبطال! فريدة، ونور، وعمر—لقد أتقنتم فيزياء القمر والمريخ، واستكشفتم سبعة روبوتات تاريخية ملهمة لناسا، وأثبتم عظمة الاستكشاف الفضائي الدولي المشترك!',
    expression: 'proud',
  },
  {
    speaker: 'farida',
    textEn: 'We learned how water was discovered on both the Moon and Mars, and how robots paved the path for humans!',
    textAr: 'لقد تعلمنا كيف تم اكتشاف المياه على القمر والمريخ، وكيف شقت هذه الروبوتات طريق المستقبل للإنسان!',
    expression: 'excited',
  },
  {
    speaker: 'nour',
    textEn: 'And seeing Ingenuity fly in that thin 1% Martian atmosphere proved that human engineering can overcome any boundary!',
    textAr: 'ورؤية المروحية إنجينويتي تحلق في هذا الغلاف الجوي الرقيق جداً برهن على أن العقل البشري قادر على قهر المستحيل!',
    expression: 'excited',
  },
  {
    speaker: 'omar',
    textEn: 'With our Egyptian flag and NASA badge proudly on our suits, we are ready to build the future of space exploration!',
    textAr: 'ونحن نحمل علم مصر وشعار ناسا بكل فخر على بدلاتنا، بتنا جاهزين لبناء مستقبل الاستكشاف الفضائي القادم!',
    expression: 'excited',
  },
  {
    speaker: 'mentor',
    textEn: 'I hereby award you the official NASA Space Apps Challenge Explorer Honors! Open your Field Codex to review your robotic discoveries anytime.',
    textAr: 'أمنحكم رسمياً وسام شرف مستكشفي تحدي ناسا لتطبيقات الفضاء! تفقدوا السجل الميداني الشامل لمراجعة أسرار الروبوتات في أي وقت.',
    expression: 'proud',
  },
];
