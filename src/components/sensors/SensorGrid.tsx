import React from 'react';
import { Droplets, Thermometer, Sun, Activity, Zap } from 'lucide-react';
import { SensorData } from '../../types';
import { Card } from '../common/Card';
import { motion } from 'framer-motion';

interface SensorGridProps {
  sensors: SensorData[];
}

const sensorIcons = {
  soil_moisture: Droplets,
  temperature: Thermometer,
  humidity: Activity,
  light: Sun,
  ph: Zap,
};

const sensorColors = {
  normal: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400',
  warning: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400',
  critical: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400',
};

export const SensorGrid: React.FC<SensorGridProps> = ({ sensors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sensors.map((sensor, index) => {
        const Icon = sensorIcons[sensor.type];
        const colorClass = sensorColors[sensor.status];
        
        return (
          <motion.div
            key={sensor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClass}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                  {sensor.status}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                  {sensor.type.replace('_', ' ')}
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {sensor.value.toFixed(1)} {sensor.unit}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {sensor.location}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Updated: {sensor.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};