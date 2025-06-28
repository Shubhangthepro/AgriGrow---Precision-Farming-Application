import React from 'react';
import { Menu, Sun, Moon, Bell, User, Globe, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { useVoice } from '../../contexts/VoiceContext';
import { useNotification } from '../../contexts/NotificationContext';
import { motion } from 'framer-motion';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { isDark, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { isEnabled: voiceEnabled, toggle: toggleVoice } = useVoice();
  const { unreadCount } = useNotification();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('header.goodMorning');
    if (hour < 17) return t('header.goodAfternoon');
    return t('header.goodEvening');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-500" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {getCurrentGreeting()}, {t('header.farmer')}!
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('header.statusMessage')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            title={t('header.toggleLanguage')}
          >
            <Globe className="w-5 h-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 text-xs font-bold text-primary-600 dark:text-primary-400">
              {i18n.language.toUpperCase()}
            </span>
          </motion.button>

          {/* Voice Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleVoice}
            className={`p-2 rounded-lg transition-colors ${
              voiceEnabled 
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'
            }`}
            title={t('header.toggleVoice')}
          >
            {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={t('header.toggleTheme')}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-500" />
            )}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            title={t('header.notifications')}
          >
            <Bell className="w-5 h-5 text-gray-500" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.span>
            )}
          </motion.button>

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={t('header.profile')}
          >
            <User className="w-5 h-5 text-gray-500" />
          </motion.button>
        </div>
      </div>
    </header>
  );
};