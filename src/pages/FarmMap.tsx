import React, { useState, useEffect } from 'react';
import { MapPin, Layers, Zap, Droplets, Navigation, Settings } from 'lucide-react';
import { Card } from '../components/common/Card';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const FarmMap: React.FC = () => {
  const { t } = useTranslation();
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [mapLayer, setMapLayer] = useState('satellite');

  // Mock farm fields data
  const farmFields = [
    {
      id: 'field-a',
      name: 'Field A - Wheat',
      coordinates: { lat: 30.7333, lng: 76.7794 },
      area: 12.5,
      crop: 'Wheat',
      health: 'excellent',
      soilMoisture: 75,
      sensors: 3
    },
    {
      id: 'field-b',
      name: 'Field B - Corn',
      coordinates: { lat: 30.7350, lng: 76.7810 },
      area: 18.3,
      crop: 'Corn',
      health: 'good',
      soilMoisture: 65,
      sensors: 4
    },
    {
      id: 'field-c',
      name: 'Field C - Soybeans',
      coordinates: { lat: 30.7320, lng: 76.7775 },
      area: 15.7,
      crop: 'Soybeans',
      health: 'good',
      soilMoisture: 70,
      sensors: 2
    }
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return '#22c55e';
      case 'good': return '#3b82f6';
      case 'fair': return '#f59e0b';
      case 'poor': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const mapLayers = [
    { id: 'satellite', name: t('map.layers.satellite'), icon: Layers },
    { id: 'terrain', name: t('map.layers.terrain'), icon: Navigation },
    { id: 'hybrid', name: t('map.layers.hybrid'), icon: Settings }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('map.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('map.subtitle')}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {mapLayers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setMapLayer(layer.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                mapLayer === layer.id
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <layer.icon className="w-4 h-4" />
              <span>{layer.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-3">
          <Card className="h-96 lg:h-[600px]">
            <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-lg overflow-hidden">
              {/* Mock Map Interface */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t('map.interactive.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                    {t('map.interactive.description')}
                  </p>
                </div>
              </div>

              {/* Field Markers */}
              {farmFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className={`absolute w-8 h-8 rounded-full border-4 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedField === field.id ? 'ring-4 ring-primary-300' : ''
                  }`}
                  style={{
                    backgroundColor: getHealthColor(field.health),
                    left: `${25 + index * 20}%`,
                    top: `${30 + index * 15}%`
                  }}
                  onClick={() => setSelectedField(field.id)}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                </motion.div>
              ))}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <button className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-lg font-bold text-gray-600 dark:text-gray-400">+</span>
                </button>
                <button className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-lg font-bold text-gray-600 dark:text-gray-400">-</span>
                </button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('map.legend.title')}
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{t('map.legend.excellent')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{t('map.legend.good')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{t('map.legend.fair')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{t('map.legend.poor')}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Field Information Panel */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('map.fields.title')}
            </h3>
            <div className="space-y-3">
              {farmFields.map((field) => (
                <motion.div
                  key={field.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedField === field.id
                      ? 'bg-primary-50 border border-primary-200 dark:bg-primary-900/20 dark:border-primary-800'
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedField(field.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{field.name}</h4>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getHealthColor(field.health) }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div className="flex justify-between">
                      <span>{t('map.fields.area')}</span>
                      <span>{field.area} ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('map.fields.sensors')}</span>
                      <span>{field.sensors}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {selectedField && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('map.fieldDetails.title')}
                </h3>
                {(() => {
                  const field = farmFields.find(f => f.id === selectedField);
                  if (!field) return null;
                  
                  return (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{field.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{field.crop}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Droplets className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {t('map.fieldDetails.soilMoisture')}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {field.soilMoisture}%
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {t('map.fieldDetails.activeSensors')}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {field.sensors}
                          </span>
                        </div>

                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${field.soilMoisture}%` }}
                          />
                        </div>
                      </div>

                      <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                        {t('map.fieldDetails.viewDetails')}
                      </button>
                    </div>
                  );
                })()}
              </Card>
            </motion.div>
          )}

          {/* Quick Stats */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('map.stats.title')}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t('map.stats.totalArea')}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {farmFields.reduce((sum, field) => sum + field.area, 0)} ha
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t('map.stats.totalSensors')}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {farmFields.reduce((sum, field) => sum + field.sensors, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t('map.stats.activeFields')}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {farmFields.length}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};