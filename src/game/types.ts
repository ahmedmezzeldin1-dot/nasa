/**
 * Core type definitions for Horus-Artemis: Moon to Mars Adventure
 */

export type GameStage =
  | 'TITLE'
  | 'MALFUNCTION_CUTSCENE'
  | 'MOON_SURFACE'
  | 'LAUNCH_TO_MARS'
  | 'MARS_SURFACE'
  | 'MISSION_COMPLETE';

export type Language = 'en' | 'ar';

export type CharacterId = 'mentor' | 'farida' | 'nour' | 'omar' | 'robot' | 'system';

export interface CharacterProfile {
  id: CharacterId;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  color: string;
  pitch: number;
}

export type MiniTaskType =
  | 'soil_sample'
  | 'antenna_align'
  | 'neutron_calibrate'
  | 'solar_dust'
  | 'hematite_inspect'
  | 'chemcam_laser'
  | 'ingenuity_flight';

export interface MiniTaskData {
  id: MiniTaskType;
  titleEn: string;
  titleAr: string;
  objectiveEn: string;
  objectiveAr: string;
  interactionHintEn: string;
  interactionHintAr: string;
}

export interface RobotInfo {
  id: string;
  stage: 'moon' | 'mars';
  nameEn: string;
  nameAr: string;
  year: number;
  missionTypeEn: string;
  missionTypeAr: string;
  x: number; // World x position on surface
  whyBuiltEn: string;
  whyBuiltAr: string;
  whyLeftEn: string;
  whyLeftAr: string;
  featuresEn: string[];
  featuresAr: string[];
  achievementsEn: string[];
  achievementsAr: string[];
  miniTask: MiniTaskData;
  inspected: boolean;
  taskCompleted: boolean;
}

export interface DialogueNode {
  speaker: CharacterId;
  textEn: string;
  textAr: string;
  expression?: 'normal' | 'excited' | 'concerned' | 'proud' | 'curious';
  choices?: {
    textEn: string;
    textAr: string;
    nextDialogueIndex?: number;
  }[];
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}
