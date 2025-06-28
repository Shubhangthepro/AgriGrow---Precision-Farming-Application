import React, { useState } from 'react';
import { Bell, Filter, Search, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Card } from '../components/common/Card';
import { AlertList } from '../components/alerts/AlertList';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Alert } from '../types';
import { formatDistanceToNow } from 'date-fns';

export const Alerts: React.FC = () => {
  const { t } = useTranslation();
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showAcknowledged, setShowAcknowledged] = useState(false);

  // Mock alerts data
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'irrigation',
      severity: 'high',
      title: 'Low Soil Moisture Detected',
      message: 'Field A shows soil moisture at 35%. Immediate irrigation recommended to prevent crop stress.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      acknowledged: false
    },
    {
      id: '2',
      type: 'weather',
      severity: 'critical',
      title: 'Severe Weather Warning',
      message: 'Heavy rainfall and strong winds expected in the next 6 hours. Secure equipment and protect crops.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      acknowledged: false
    },
    {
      id: '3',
      type: 'pest',
      severity: 'medium',
      title: 'Pest Activity Detected',
      message: 'Increased insect activity observed in corn field. Consider applying targeted pesticide treatment.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      acknowledged: false
    },
    {
      id: '4',
      type: 'fertilizer',
      severity: 'low',
      title: 'Fertilizer Schedule Reminder',
      message: 'Nitrogen fertilizer application due for wheat crop in Field C within the next 3 days.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      acknowledged: true
    },
    {
      id: '5',
      type: 'harvest',
      severity: 'medium',
      title: 'Harvest Window Opening',
      message: 'Soybeans in Field B are approaching optimal harvest moisture content. Monitor closely.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      acknowledged: false
    }
  ]);

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, acknowledged: true }
          : alert
      )
    );
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesAcknowledged = showAcknowledged || !alert.acknowledged;
    return matchesSeverity && matchesType && matchesAcknowledged;
  });

  const unacknowledgedCount = alerts.filter(alert => !alert.acknowledged).length;
  const criticalCount = alerts.filter(alert => alert.severity === 'critical' && !alert.acknowledged).length;
  const highCount = alerts.filter(alert => alert.severity === 'high' && !alert.acknowledged).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('alerts.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('alerts.subtitle')}</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('alerts.summary.total')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{alerts.length}</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 rounded-lg">
              <Bell className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('alerts.summary.unacknowledged')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{unacknowledgedCount}</p>
            </div>
            <div className="p-3 bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('alerts.summary.critical')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{criticalCount}</p>
            </div>
            <div className="p-3 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('alerts.summary.high')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{highCount}</p>
            </div>
            <div className="p-3 bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('alerts.filters.title')}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">{t('alerts.filters.allSeverities')}</option>
              <option value="critical">{t('alerts.severity.critical')}</option>
              <option value="high">{t('alerts.severity.high')}</option>
              <option value="medium">{t('alerts.severity.medium')}</option>
              <option value="low">{t('alerts.severity.low')}</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">{t('alerts.filters.allTypes')}</option>
              <option value="irrigation">{t('alerts.types.irrigation')}</option>
              <option value="weather">{t('alerts.types.weather')}</option>
              <option value="pest">{t('alerts.types.pest')}</option>
              <option value="fertilizer">{t('alerts.types.fertilizer')}</option>
              <option value="harvest">{t('alerts.types.harvest')}</option>
            </select>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showAcknowledged}
                onChange={(e) => setShowAcknowledged(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {t('alerts.filters.showAcknowledged')}
              </span>
            </label>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('alerts.quickActions.title')}
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setAlerts(prev => prev.map(alert => ({ ...alert, acknowledged: true })));
              }}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
            >
              {t('alerts.quickActions.acknowledgeAll')}
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm">
              {t('alerts.quickActions.exportReport')}
            </button>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      {filteredAlerts.length > 0 ? (
        <AlertList alerts={filteredAlerts} onAcknowledge={handleAcknowledge} />
      ) : (
        <Card>
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('alerts.noAlerts.title')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t('alerts.noAlerts.message')}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};