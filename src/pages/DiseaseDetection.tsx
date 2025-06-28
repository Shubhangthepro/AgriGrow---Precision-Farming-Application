import React, { useState } from 'react';
import { ImageUpload } from '../components/disease/ImageUpload';
import { DiseaseResults } from '../components/disease/DiseaseResults';

export const DiseaseDetection: React.FC = () => {
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);

  const handleImageUpload = (file: File) => {
    // Simulate AI analysis results
    const mockResults = [
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
    
    setAnalysisResults(mockResults);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Disease Detection</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload images of your crops to detect diseases and get treatment recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ImageUpload onImageUpload={handleImageUpload} />
        
        <div>
          {analysisResults.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Analysis Results
              </h2>
              <DiseaseResults results={analysisResults} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};