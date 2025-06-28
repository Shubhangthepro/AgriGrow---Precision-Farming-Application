import React from 'react';
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Wind, 
  Droplets, 
  Thermometer,
  Eye,
  Umbrella,
  AlertTriangle
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { useWeatherData } from '../hooks/useWeatherData';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Weather: React.FC = () => {
  const { weatherData, isLoading } = useWeatherData();
  const { t } = useTranslation();

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return Sun;
      case 'cloudy':
        return Cloud;
      case 'rainy':
        return CloudRain;
      default:
        return Cloud;
    }
  };

  const getWeatherColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'text-yellow-500';
      case 'cloudy':
        return 'text-gray-500';
      case 'rainy':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  // Generate hourly forecast data
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00`,
    temperature: 20 + Math.sin((i - 6) * Math.PI / 12) * 8 + Math.random() * 3,
    humidity: 60 + Math.random() * 20,
    precipitation: Math.random() * 5
  }));

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('weather.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('weather.subtitle')}</p>
      </div>

      {weatherData && (
        <>
          {/* Current Weather */}
          <Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('weather.current')}
                </h3>
                <div className="flex items-center space-x-4 mb-6">
                  {React.createElement(getWeatherIcon(weatherData.conditions), {
                    className: `w-16 h-16 ${getWeatherColor(weatherData.conditions)}`
                  })}
                  <div>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                      {weatherData.temperature.toFixed(1)}°C
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      {weatherData.conditions}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('weather.humidity')}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {weatherData.humidity.toFixed(0)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Wind className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('weather.windSpeed')}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {weatherData.windSpeed.toFixed(1)} km/h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Umbrella className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('weather.precipitation')}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {weatherData.precipitation.toFixed(1)} mm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <Eye className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('weather.visibility')}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">10 km</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Alerts */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('weather.alerts')}
                </h3>
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                  >
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-900 dark:text-yellow-300">
                          {t('weather.alert.heavyRain')}
                        </h4>
                        <p className="text-sm text-yellow-800 dark:text-yellow-400 mt-1">
                          {t('weather.alert.rainMessage')}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                  >
                    <div className="flex items-start space-x-3">
                      <Droplets className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 dark:text-blue-300">
                          {t('weather.alert.highHumidity')}
                        </h4>
                        <p className="text-sm text-blue-800 dark:text-blue-400 mt-1">
                          {t('weather.alert.humidityMessage')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>

          {/* 7-Day Forecast */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('weather.forecast')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {weatherData.forecast.map((day, index) => {
                const Icon = getWeatherIcon(day.conditions);
                const isToday = index === 0;
                
                return (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`text-center p-4 rounded-lg transition-colors ${
                      isToday 
                        ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {isToday ? t('weather.today') : new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                    </p>
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${getWeatherColor(day.conditions)}`} />
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {day.high.toFixed(0)}°
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {day.low.toFixed(0)}°
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {day.precipitation.toFixed(0)}mm
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Hourly Temperature Chart */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('weather.hourlyForecast')}
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="hour" 
                    className="text-xs"
                    tick={{ fill: 'currentColor' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'currentColor' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                    name="Temperature (°C)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="humidity" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    name="Humidity (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Farm Recommendations */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('weather.recommendations')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">
                  🌱 {t('weather.recommendation.planting')}
                </h4>
                <p className="text-sm text-green-800 dark:text-green-400">
                  {t('weather.recommendation.plantingMessage')}
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                  💧 {t('weather.recommendation.irrigation')}
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  {t('weather.recommendation.irrigationMessage')}
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-2">
                  🚜 {t('weather.recommendation.fieldWork')}
                </h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-400">
                  {t('weather.recommendation.fieldWorkMessage')}
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">
                  🌾 {t('weather.recommendation.harvest')}
                </h4>
                <p className="text-sm text-purple-800 dark:text-purple-400">
                  {t('weather.recommendation.harvestMessage')}
                </p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};