import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Droplets, 
  Camera, 
  TrendingUp, 
  Bell, 
  CloudRain,
  Sprout,
  Settings,
  Map,
  ShoppingCart,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { t } = useTranslation();
  
  const navigationItems = [
    { to: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/sensors', icon: Droplets, label: t('nav.sensors') },
    { to: '/crops', icon: Sprout, label: t('nav.crops') },
    { to: '/disease-detection', icon: Camera, label: t('nav.diseaseDetection') },
    { to: '/analytics', icon: TrendingUp, label: t('nav.analytics') },
    { to: '/weather', icon: CloudRain, label: t('nav.weather') },
    { to: '/alerts', icon: Bell, label: t('nav.alerts') },
    { to: '/map', icon: Map, label: t('nav.farmMap') },
    { to: '/marketplace', icon: ShoppingCart, label: t('nav.marketplace') },
    { to: '/settings', icon: Settings, label: t('nav.settings') },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-50 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 lg:relative lg:translate-x-0 lg:z-0 lg:block"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">AgriGrow</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('nav.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => window.innerWidth < 1024 && onToggle()}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 dark:from-primary-900 dark:to-primary-800 dark:text-primary-300 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`
              }
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Farm Status Summary */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {t('sidebar.farmStatus')}
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">{t('sidebar.activeSensors')}</span>
                <span className="text-green-600 font-medium">8/8</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">{t('sidebar.cropHealth')}</span>
                <span className="text-green-600 font-medium">98%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};