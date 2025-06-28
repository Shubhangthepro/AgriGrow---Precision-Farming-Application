import { SensorData } from '../types';

export class SensorSimulator {
  private sensors: Map<string, SensorData> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    this.initializeSensors();
  }

  private initializeSensors() {
    const sensorConfigs = [
      { id: 'temp_01', type: 'temperature', location: 'Field A', baseValue: 25, variance: 5, unit: '°C' },
      { id: 'humid_01', type: 'humidity', location: 'Field A', baseValue: 65, variance: 15, unit: '%' },
      { id: 'soil_01', type: 'soil_moisture', location: 'Field A', baseValue: 45, variance: 10, unit: '%' },
      { id: 'ph_01', type: 'ph', location: 'Field A', baseValue: 6.5, variance: 0.5, unit: 'pH' },
      { id: 'light_01', type: 'light', location: 'Field A', baseValue: 30000, variance: 10000, unit: 'lux' },
      
      { id: 'temp_02', type: 'temperature', location: 'Field B', baseValue: 23, variance: 4, unit: '°C' },
      { id: 'humid_02', type: 'humidity', location: 'Field B', baseValue: 70, variance: 12, unit: '%' },
      { id: 'soil_02', type: 'soil_moisture', location: 'Field B', baseValue: 55, variance: 8, unit: '%' },
    ];

    sensorConfigs.forEach(config => {
      const sensor: SensorData = {
        id: config.id,
        type: config.type as any,
        value: config.baseValue,
        unit: config.unit,
        timestamp: new Date(),
        location: config.location,
        status: 'normal'
      };
      
      this.sensors.set(config.id, sensor);
    });
  }

  startSimulation(callback?: (sensor: SensorData) => void) {
    this.sensors.forEach((sensor, id) => {
      const interval = setInterval(() => {
        const updatedSensor = this.updateSensorValue(sensor);
        this.sensors.set(id, updatedSensor);
        
        if (callback) {
          callback(updatedSensor);
        }
      }, 5000 + Math.random() * 5000); // Random interval between 5-10 seconds

      this.intervals.set(id, interval);
    });
  }

  stopSimulation() {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
  }

  private updateSensorValue(sensor: SensorData): SensorData {
    const configs = {
      temperature: { baseValue: 25, variance: 5, min: 10, max: 40 },
      humidity: { baseValue: 65, variance: 15, min: 30, max: 95 },
      soil_moisture: { baseValue: 45, variance: 10, min: 20, max: 80 },
      ph: { baseValue: 6.5, variance: 0.5, min: 5.0, max: 8.0 },
      light: { baseValue: 30000, variance: 10000, min: 5000, max: 60000 }
    };

    const config = configs[sensor.type];
    if (!config) return sensor;

    // Add some randomness with trend
    const trend = (Math.random() - 0.5) * 2; // -1 to 1
    const change = trend * (config.variance * 0.1);
    let newValue = sensor.value + change;

    // Keep within realistic bounds
    newValue = Math.max(config.min, Math.min(config.max, newValue));

    // Determine status based on thresholds
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    
    if (sensor.type === 'soil_moisture') {
      if (newValue < 30) status = 'critical';
      else if (newValue < 40) status = 'warning';
    } else if (sensor.type === 'temperature') {
      if (newValue > 35 || newValue < 15) status = 'critical';
      else if (newValue > 30 || newValue < 18) status = 'warning';
    } else if (sensor.type === 'ph') {
      if (newValue < 5.5 || newValue > 7.5) status = 'critical';
      else if (newValue < 6.0 || newValue > 7.0) status = 'warning';
    }

    return {
      ...sensor,
      value: newValue,
      timestamp: new Date(),
      status
    };
  }

  getAllSensors(): SensorData[] {
    return Array.from(this.sensors.values());
  }

  getSensorById(id: string): SensorData | undefined {
    return this.sensors.get(id);
  }

  getSensorsByType(type: string): SensorData[] {
    return Array.from(this.sensors.values()).filter(sensor => sensor.type === type);
  }

  getSensorsByLocation(location: string): SensorData[] {
    return Array.from(this.sensors.values()).filter(sensor => sensor.location === location);
  }
}

// Global instance
export const sensorSimulator = new SensorSimulator();