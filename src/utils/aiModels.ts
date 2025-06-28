// AI Model utilities for disease detection and yield prediction

export interface DiseaseDetectionResult {
  disease: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  treatment: string;
  preventionTips: string[];
}

export interface YieldPrediction {
  crop: string;
  predictedYield: number;
  confidence: number;
  factors: {
    weather: number;
    soil: number;
    irrigation: number;
    fertilizer: number;
  };
  recommendations: string[];
}

export class AIModelService {
  // Simulate disease detection using image analysis
  static async detectDisease(imageFile: File): Promise<DiseaseDetectionResult[]> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock disease detection results
    const diseases = [
      {
        disease: 'Leaf Blight',
        confidence: 89,
        severity: 'moderate' as const,
        treatment: 'Apply copper-based fungicide spray every 7-10 days. Remove affected leaves and improve air circulation.',
        preventionTips: [
          'Ensure proper spacing between plants',
          'Water at soil level to avoid wet foliage',
          'Apply preventive fungicide during humid conditions',
          'Remove plant debris regularly'
        ]
      },
      {
        disease: 'Nutrient Deficiency (Nitrogen)',
        confidence: 65,
        severity: 'mild' as const,
        treatment: 'Apply nitrogen-rich fertilizer (NPK 20-10-10) at recommended rates. Monitor soil pH levels.',
        preventionTips: [
          'Regular soil testing every 3 months',
          'Maintain organic matter in soil',
          'Use slow-release fertilizers',
          'Consider companion planting with nitrogen-fixing plants'
        ]
      }
    ];

    return diseases;
  }

  // Predict crop yield based on sensor data and weather
  static async predictYield(cropData: any, sensorData: any[], weatherData: any): Promise<YieldPrediction> {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock yield prediction
    const baseYield = 4.2; // tons per hectare
    const weatherFactor = 0.85 + Math.random() * 0.3; // 0.85 - 1.15
    const soilFactor = 0.9 + Math.random() * 0.2; // 0.9 - 1.1
    const irrigationFactor = 0.95 + Math.random() * 0.1; // 0.95 - 1.05
    const fertilizerFactor = 0.88 + Math.random() * 0.24; // 0.88 - 1.12

    const predictedYield = baseYield * weatherFactor * soilFactor * irrigationFactor * fertilizerFactor;

    return {
      crop: cropData?.name || 'Wheat',
      predictedYield: Math.round(predictedYield * 100) / 100,
      confidence: 85 + Math.random() * 10, // 85-95%
      factors: {
        weather: Math.round(weatherFactor * 100),
        soil: Math.round(soilFactor * 100),
        irrigation: Math.round(irrigationFactor * 100),
        fertilizer: Math.round(fertilizerFactor * 100)
      },
      recommendations: [
        'Optimize irrigation schedule based on soil moisture levels',
        'Apply balanced NPK fertilizer in split doses',
        'Monitor weather patterns for pest and disease prevention',
        'Consider crop rotation for soil health improvement'
      ]
    };
  }

  // Generate smart irrigation recommendations
  static generateIrrigationRecommendation(sensorData: any[], weatherData: any) {
    const soilMoisture = sensorData.find(s => s.type === 'soil_moisture')?.value || 50;
    const temperature = sensorData.find(s => s.type === 'temperature')?.value || 25;
    const humidity = sensorData.find(s => s.type === 'humidity')?.value || 65;
    const expectedRain = weatherData?.precipitation || 0;

    let recommendation = {
      shouldIrrigate: false,
      duration: 0, // minutes
      intensity: 'low' as 'low' | 'medium' | 'high',
      timing: 'morning',
      reason: '',
      waterAmount: 0 // liters per square meter
    };

    if (soilMoisture < 40 && expectedRain < 5) {
      recommendation.shouldIrrigate = true;
      recommendation.duration = 30 + (40 - soilMoisture) * 2;
      recommendation.intensity = soilMoisture < 30 ? 'high' : 'medium';
      recommendation.waterAmount = (40 - soilMoisture) * 0.5;
      recommendation.reason = `Soil moisture is low (${soilMoisture}%) and no significant rain expected.`;
    } else if (expectedRain > 10) {
      recommendation.reason = `Skip irrigation due to expected rainfall (${expectedRain}mm).`;
    } else {
      recommendation.reason = `Soil moisture is adequate (${soilMoisture}%).`;
    }

    // Adjust timing based on temperature
    if (temperature > 30) {
      recommendation.timing = 'early morning or evening';
    }

    return recommendation;
  }

  // Generate fertilizer recommendations
  static generateFertilizerRecommendation(sensorData: any[], cropStage: string) {
    const ph = sensorData.find(s => s.type === 'ph')?.value || 6.5;
    const soilMoisture = sensorData.find(s => s.type === 'soil_moisture')?.value || 50;

    const recommendations = {
      vegetative: {
        type: 'High Nitrogen (NPK 20-10-10)',
        amount: 150, // kg per hectare
        timing: 'Apply in split doses every 2 weeks',
        reason: 'Vegetative growth requires high nitrogen for leaf development'
      },
      flowering: {
        type: 'Balanced (NPK 15-15-15)',
        amount: 120,
        timing: 'Apply once at flowering initiation',
        reason: 'Balanced nutrients support flower and fruit development'
      },
      maturity: {
        type: 'Low Nitrogen, High Potassium (NPK 5-10-20)',
        amount: 100,
        timing: 'Apply 2-3 weeks before harvest',
        reason: 'Potassium improves fruit quality and shelf life'
      }
    };

    const baseRecommendation = recommendations[cropStage] || recommendations.vegetative;

    // Adjust based on pH
    if (ph < 6.0) {
      baseRecommendation.reason += '. Consider lime application to raise pH.';
    } else if (ph > 7.5) {
      baseRecommendation.reason += '. Consider sulfur application to lower pH.';
    }

    return {
      ...baseRecommendation,
      nutrients: {
        nitrogen: Math.round(baseRecommendation.amount * 0.2),
        phosphorus: Math.round(baseRecommendation.amount * 0.1),
        potassium: Math.round(baseRecommendation.amount * 0.15)
      }
    };
  }
}