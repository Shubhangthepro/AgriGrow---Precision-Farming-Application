export interface SensorData {
  id: string;
  type: 'soil_moisture' | 'ph' | 'humidity' | 'temperature' | 'light';
  value: number;
  unit: string;
  timestamp: Date;
  location: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  conditions: string;
  forecast: {
    date: string;
    high: number;
    low: number;
    conditions: string;
    precipitation: number;
  }[];
}

export interface CropData {
  id: string;
  name: string;
  plantingDate: Date;
  expectedHarvest: Date;
  currentStage: string;
  health: 'excellent' | 'good' | 'fair' | 'poor';
  yieldPrediction: number;
  area: number;
}

export interface Alert {
  id: string;
  type: 'irrigation' | 'fertilizer' | 'pest' | 'weather' | 'harvest';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface IrrigationRecommendation {
  duration: number;
  intensity: 'low' | 'medium' | 'high';
  timing: string;
  reason: string;
  waterAmount: number;
}

export interface FertilizerRecommendation {
  type: string;
  amount: number;
  timing: string;
  reason: string;
  nutrients: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
}

export interface DiseaseDetection {
  id: string;
  disease: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  treatment: string;
  imageUrl: string;
  detectedAt: Date;
}