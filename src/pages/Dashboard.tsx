import React from 'react';
import { Droplets, Thermometer, TrendingUp, AlertTriangle } from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { SensorChart } from '../components/charts/SensorChart';
import { useSensorData } from '../hooks/useSensorData';
import { useWeatherData } from '../hooks/useWeatherData';
import { Card } from '../components/common/Card';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const { sensorData, isLoading: sensorsLoading } = useSensorData();
  const { weatherData, isLoading: weatherLoading } = useWeatherData();

  // Generate mock historical data for charts
  const generateChartData = (baseValue: number, hours: number = 24) => {
    return Array.from({ length: hours }, (_, i) => ({
      time: `${String(i).padStart(2, '0')}:00`,
      value: baseValue + Math.random() * 10 - 5
    }));
  };

  const soilMoistureData = generateChartData(45);
  const temperatureData = generateChartData(25);

  if (sensorsLoading || weatherLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const moistureSensor = sensorData.find(s => s.type === 'soil_moisture');
  const tempSensor = sensorData.find(s => s.type === 'temperature');
  const phSensor = sensorData.find(s => s.type === 'ph');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Farm Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor your crops and farm conditions in real-time</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Soil Moisture"
          value={`${moistureSensor?.value.toFixed(1)}%`}
          icon={Droplets}
          trend={{ value: 5.2, direction: 'up' }}
          color="blue"
        />
        <StatCard
          title="Temperature"
          value={`${tempSensor?.value.toFixed(1)}°C`}
          icon={Thermometer}
          trend={{ value: 2.1, direction: 'down' }}
          color="red"
        />
        <StatCard
          title="pH Level"
          value={phSensor?.value.toFixed(1)}
          icon={TrendingUp}
          trend={{ value: 1.5, direction: 'up' }}
          color="green"
        />
        <StatCard
          title="Active Alerts"
          value="3"
          icon={AlertTriangle}
          color="yellow"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SensorChart
          title="Soil Moisture (24h)"
          data={soilMoistureData}
          dataKey="value"
          color="#3B82F6"
          unit="%"
        />
        <SensorChart
          title="Temperature (24h)"
          data={temperatureData}
          dataKey="value"
          color="#EF4444"
          unit="°C"
        />
      </div>

      {/* Weather & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Card */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Current Weather
          </h3>
          {weatherData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {weatherData.temperature.toFixed(1)}°C
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{weatherData.conditions}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {weatherData.humidity.toFixed(0)}%
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Wind Speed</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {weatherData.windSpeed.toFixed(1)} km/h
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Precipitation</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {weatherData.precipitation.toFixed(1)} mm
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* AI Recommendations */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            AI Recommendations
          </h3>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                💧 Irrigation Recommended
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                Soil moisture is at 45%. Consider irrigation for optimal crop growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
            >
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">
                🌱 Growth Conditions Good
              </h4>
              <p className="text-sm text-green-800 dark:text-green-400">
                Temperature and pH levels are optimal for current crop stage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
            >
              <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-2">
                ⚠️ Weather Alert
              </h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-400">
                Rain expected tomorrow. Adjust irrigation schedule accordingly.
              </p>
            </motion.div>
          </div>
        </Card>
      </div>
    </div>
  );
};