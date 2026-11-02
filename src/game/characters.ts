import { CharacterProfile, CharacterId } from './types';

export const CHARACTERS: Record<CharacterId, CharacterProfile> = {
  mentor: {
    id: 'mentor',
    nameEn: 'Commander Tarek',
    nameAr: 'القائد طارق',
    roleEn: 'NASA-Egyptian Astronaut Mentor',
    roleAr: 'رائد فضاء ناسا والمشرف العلمي',
    color: '#38BDF8', // Sky Blue
    pitch: 280,
  },
  farida: {
    id: 'farida',
    nameEn: 'Farida',
    nameAr: 'فريدة',
    roleEn: 'Junior Planetary Geologist (12 yrs)',
    roleAr: 'باحثة الجيولوجيا الكوكبية (١٢ سنة)',
    color: '#F43F5E', // Rose
    pitch: 520,
  },
  nour: {
    id: 'nour',
    nameEn: 'Nour',
    nameAr: 'نور',
    roleEn: 'Junior Robotics Engineer (11 yrs)',
    roleAr: 'مهندسة الروبوتات الفضائية (١١ سنة)',
    color: '#818CF8', // Indigo
    pitch: 480,
  },
  omar: {
    id: 'omar',
    nameEn: 'Omar',
    nameAr: 'عمر',
    roleEn: 'Junior Flight & Comms Specialist (10 yrs)',
    roleAr: 'أخصائي الملاحة والاتصالات (١٠ سنوات)',
    color: '#34D399', // Emerald
    pitch: 410,
  },
  robot: {
    id: 'robot',
    nameEn: 'NASA Robot Telemetry',
    nameAr: 'بيانات روبوت ناسا',
    roleEn: 'Autonomous Science Instrument',
    roleAr: 'جهاز علمي فضائي مستقل',
    color: '#FBBF24', // Amber
    pitch: 620,
  },
  system: {
    id: 'system',
    nameEn: 'Mission Control',
    nameAr: 'مركز القيادة والتحكم',
    roleEn: 'Spacecraft Horus-Artemis AI',
    roleAr: 'الذكاء الاصطناعي للمركبة حورس-أرتميس',
    color: '#A855F7', // Purple
    pitch: 340,
  },
};
