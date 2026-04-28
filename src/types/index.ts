export type OrganismType = 'plant' | 'animal' | 'insect' | 'bird' | 'inanimate';

export interface PlantCareInfo {
  watering: string;
  sunlight: string;
  soil: string;
  fertilizer: string;
  pruning: string;
  companionPlanting: string;
  harvest: string;
  commonIssues: string;
}

export interface AnimalCareInfo {
  habitat: string;
  diet: string;
  temperament: string;
  healthSigns: string;
  lifespan: string;
  exerciseNeeds: string;
  vetCare: string;
}

export interface InsectCareInfo {
  beneficialOrPest: string;
  lifecycle: string;
  seasonalActivity: string;
  gardenImpact: string;
  controlOrAttract: string;
  pollinationRole: string;
}

export interface BirdCareInfo {
  migrationPatterns: string;
  nestingHabits: string;
  diet: string;
  birdwatchingTips: string;
  conservationStatus: string;
  howToAttract: string;
  regionalPresence: string;
}

export interface InanimateCareInfo {
  notice?: string;
}

export type CareInfo = PlantCareInfo | AnimalCareInfo | InsectCareInfo | BirdCareInfo | InanimateCareInfo;

export interface OrganismResult {
  id: string;
  commonName: string;
  scientificName: string;
  type: OrganismType;
  confidence: number;
  summary: string;
  funFact: string;
  careInfo: CareInfo;
  imageData: string;
  timestamp: string;
  notes?: string;
}
