import React from 'react';
import { AlertTriangle, Leaf, Shield, Calendar } from 'lucide-react';
import { Card } from '../common/Card';
import { motion } from 'framer-motion';

interface DiseaseResult {
  disease: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  treatment: string;
  preventionTips: string[];
}

interface DiseaseResultsProps {
  results: DiseaseResult[];
}

export const DiseaseResults: React.FC<DiseaseResultsProps> = ({ results }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'severe':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {result.disease}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Confidence: {result.confidence}%
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(result.severity)}`}>
                {result.severity}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Leaf className="w-5 h-5 text-primary-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Treatment</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{result.treatment}</p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-primary-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Prevention Tips</h4>
                </div>
                <ul className="space-y-1">
                  {result.preventionTips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                      <span className="text-primary-500 mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};