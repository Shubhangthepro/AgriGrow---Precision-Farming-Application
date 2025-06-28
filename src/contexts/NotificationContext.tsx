import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useVoice } from './VoiceContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  clearAll: () => {}
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { speak } = useVoice();

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show toast
    const toastType = notification.type === 'error' ? 'error' : 
                     notification.type === 'success' ? 'success' : 
                     notification.type === 'warning' ? 'error' : 'success';
    
    toast[toastType](notification.message);

    // Speak notification if voice is enabled
    speak(`${notification.title}: ${notification.message}`);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          title: 'Irrigation Alert',
          message: 'Field A moisture level dropped to 40%',
          type: 'warning' as const
        },
        {
          title: 'Weather Update',
          message: 'Rain expected tomorrow morning',
          type: 'info' as const
        },
        {
          title: 'Harvest Ready',
          message: 'Tomatoes in greenhouse 2 are ready for harvest',
          type: 'success' as const
        }
      ];

      if (Math.random() > 0.8) { // 20% chance every 30 seconds
        const notification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        addNotification(notification);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};