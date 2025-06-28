import { useState, useEffect } from 'react';
import { SensorData } from '../types';

export const useSensorData = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data load
    setTimeout(() => {
      setSensorData(generateMockSensorData());
      setIsLoading(false);
    }, 1000);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSensorData(prev => updateSensorData(prev));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateMockSensorData = (): SensorData[] => {
    const sensors = [
      { type: 'soil_moisture', unit: '%', min: 20, max: 80 },
      { type: 'ph', unit: 'pH', min: 5.5, max: 7.5 },
      { type: 'humidity', unit: '%', min: 40, max: 90 },
      { type: 'temperature', unit: '°C', min: 15, max: 35 },
      { type: 'light', unit: 'lux', min: 10000, max: 50000 },
    ];

    return sensors.map((sensor, index) => ({
      id: `sensor-${index}`,
      type: sensor.type as any,
      value: Math.random() * (sensor.max - sensor.min) + sensor.min,
      unit: sensor.unit,
      timestamp: new Date(),
      location: `Field ${index + 1}`,
      status: Math.random() > 0.8 ? 'warning' : 'normal'
    }));
  };

  const updateSensorData = (prevData: SensorData[]): SensorData[] => {
    return prevData.map(sensor => ({
      ...sensor,
      value: sensor.value + (Math.random() - 0.5) * 5,
      timestamp: new Date(),
      status: Math.random() > 0.9 ? 'warning' : 
              Math.random() > 0.95 ? 'critical' : 'normal'
    }));
  };

  return { sensorData, isLoading };
};