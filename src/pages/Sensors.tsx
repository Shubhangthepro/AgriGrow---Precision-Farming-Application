import React from 'react';
import { SensorGrid } from '../components/sensors/SensorGrid';
import { useSensorData } from '../hooks/useSensorData';

export const Sensors: React.FC = () => {
  const { sensorData, isLoading } = useSensorData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">IoT Sensors</h1>
        <p className="text-gray-600 dark:text-gray-400">Real-time monitoring of your farm sensors</p>
      </div>

      <SensorGrid sensors={sensorData} />
    </div>
  );
};