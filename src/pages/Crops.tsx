import React, { useState } from 'react';
import { Sprout, Calendar, TrendingUp, MapPin, Plus, Filter, Search } from 'lucide-react';
import { Card } from '../components/common/Card';
import { StatCard } from '../components/common/StatCard';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CropData } from '../types';
import { formatDistanceToNow, format } from 'date-fns';

export const Crops: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');

  // Mock crop data
  const crops: CropData[] = [
    {
      id: '1',
      name: 'Winter Wheat',
      plantingDate: new Date('2024-10-15'),
      expectedHarvest: new Date('2024-05-20'),
      currentStage: 'Vegetative Growth',
      health: 'excellent',
      yieldPrediction: 4.2,
      area: 12.5
    },
    {
      id: '2',
      name: 'Corn',
      plantingDate: new Date('2024-03-20'),
      expectedHarvest: new Date('2024-09-15'),
      currentStage: 'Maturity',
      health: 'good',
      yieldPrediction: 8.1,
      area: 18.3
    },
    {
      id: '3',
      name: 'Soybeans',
      plantingDate: new Date('2024-05-10'),
      expectedHarvest: new Date('2024-10-25'),
      currentStage: 'Flowering',
      health: 'good',
      yieldPrediction: 3.8,
      area: 15.7
    },
    {
      id: '4',
      name: 'Rice',
      plantingDate: new Date('2024-06-01'),
      expectedHarvest: new Date('2024-11-15'),
      currentStage: 'Tillering',
      health: 'fair',
      yieldPrediction: 6.2,
      area: 22.1
    }
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'good':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
      case 'fair':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'poor':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStageProgress = (stage: string) => {
    const stages = {
      'Seedling': 20,
      'Vegetative Growth': 40,
      'Flowering': 60,
      'Tillering': 50,
      'Maturity': 90,
      'Harvest Ready': 100
    };
    return stages[stage] || 0;
  };

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || crop.currentStage === filterStage;
    return matchesSearch && matchesStage;
  });

  const totalArea = crops.reduce((sum, crop) => sum + crop.area, 0);
  const avgYield = crops.reduce((sum, crop) => sum + crop.yieldPrediction, 0) / crops.length;
  const healthyCrops = crops.filter(crop => crop.health === 'excellent' || crop.health === 'good').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('crops.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('crops.subtitle')}</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          <Plus className="w-4 h-4" />
          <span>{t('crops.addCrop')}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title={t('crops.stats.totalArea')}
          value={`${totalArea} ha`}
          icon={MapPin}
          color="green"
        />
        <StatCard
          title={t('crops.stats.avgYield')}
          value={`${avgYield.toFixed(1)} t/ha`}
          icon={TrendingUp}
          trend={{ value: 8.5, direction: 'up' }}
          color="blue"
        />
        <StatCard
          title={t('crops.stats.activeCrops')}
          value={crops.length}
          icon={Sprout}
          color="green"
        />
        <StatCard
          title={t('crops.stats.healthyCrops')}
          value={`${healthyCrops}/${crops.length}`}
          icon={Calendar}
          color="green"
        />
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('crops.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">{t('crops.filters.allStages')}</option>
              <option value="Seedling">{t('crops.stages.seedling')}</option>
              <option value="Vegetative Growth">{t('crops.stages.vegetative')}</option>
              <option value="Flowering">{t('crops.stages.flowering')}</option>
              <option value="Maturity">{t('crops.stages.maturity')}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCrops.map((crop, index) => (
          <motion.div
            key={crop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <Sprout className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {crop.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {crop.area} hectares
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(crop.health)}`}>
                  {t(`crops.health.${crop.health}`)}
                </div>
              </div>

              <div className="space-y-4">
                {/* Growth Stage Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {crop.currentStage}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {getStageProgress(crop.currentStage)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getStageProgress(crop.currentStage)}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                    />
                  </div>
                </div>

                {/* Crop Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('crops.details.planted')}</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(crop.plantingDate, 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('crops.details.harvest')}</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(crop.expectedHarvest, 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('crops.details.yield')}</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {crop.yieldPrediction} tons/ha
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('crops.details.timeToHarvest')}</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDistanceToNow(crop.expectedHarvest)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 px-3 py-2 text-sm bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors">
                    {t('crops.actions.viewDetails')}
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    {t('crops.actions.manageCrop')}
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <Sprout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('crops.noCrops.title')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t('crops.noCrops.message')}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};