import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Alert } from '../../types';
import { Card } from '../common/Card';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface AlertListProps {
  alerts: Alert[];
  onAcknowledge: (id: string) => void;
}

export const AlertList: React.FC<AlertListProps> = ({ alerts, onAcknowledge }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'irrigation':
        return Bell;
      case 'weather':
        return AlertTriangle;
      case 'pest':
        return AlertTriangle;
      default:
        return Info;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'high':
        return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => {
        const Icon = getAlertIcon(alert.type);
        
        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover={false} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-gray-800">
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {alert.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        alert.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                        alert.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{alert.message}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                
                {!alert.acknowledged && (
                  <button
                    onClick={() => onAcknowledge(alert.id)}
                    className="flex items-center space-x-1 px-3 py-1 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Acknowledge</span>
                  </button>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};