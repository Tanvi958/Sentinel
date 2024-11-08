export type ThreatSeverity = 'low' | 'medium' | 'high';
export type ModelTrainingStatus = 'untrained' | 'training' | 'trained';

export interface ThreatData {
  score: number;
  severity: ThreatSeverity;
  timestamp: string;
  details: string;
}

export interface Alert {
  id: number;
  type: ThreatSeverity;
  message: string;
  time: string;
  details: string;
}

export interface TrainingMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}