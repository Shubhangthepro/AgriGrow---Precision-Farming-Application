// Offline storage utilities for PWA functionality

interface OfflineData {
  sensors: any[];
  crops: any[];
  alerts: any[];
  weather: any;
  lastSync: Date;
}

export class OfflineStorageService {
  private static readonly STORAGE_KEY = 'agrigrow_offline_data';
  private static readonly SYNC_QUEUE_KEY = 'agrigrow_sync_queue';

  // Save data for offline use
  static saveOfflineData(data: Partial<OfflineData>) {
    try {
      const existing = this.getOfflineData();
      const updated = {
        ...existing,
        ...data,
        lastSync: new Date()
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Failed to save offline data:', error);
      return false;
    }
  }

  // Retrieve offline data
  static getOfflineData(): OfflineData {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          ...parsed,
          lastSync: new Date(parsed.lastSync)
        };
      }
    } catch (error) {
      console.error('Failed to retrieve offline data:', error);
    }

    return {
      sensors: [],
      crops: [],
      alerts: [],
      weather: null,
      lastSync: new Date(0)
    };
  }

  // Add action to sync queue for when online
  static addToSyncQueue(action: any) {
    try {
      const queue = this.getSyncQueue();
      queue.push({
        ...action,
        timestamp: new Date(),
        id: Date.now().toString()
      });
      
      localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(queue));
      return true;
    } catch (error) {
      console.error('Failed to add to sync queue:', error);
      return false;
    }
  }

  // Get sync queue
  static getSyncQueue(): any[] {
    try {
      const queue = localStorage.getItem(this.SYNC_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch (error) {
      console.error('Failed to get sync queue:', error);
      return [];
    }
  }

  // Clear sync queue after successful sync
  static clearSyncQueue() {
    try {
      localStorage.removeItem(this.SYNC_QUEUE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear sync queue:', error);
      return false;
    }
  }

  // Check if device is online
  static isOnline(): boolean {
    return navigator.onLine;
  }

  // Get storage usage
  static getStorageUsage(): { used: number; available: number } {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        navigator.storage.estimate().then(estimate => {
          return {
            used: estimate.usage || 0,
            available: estimate.quota || 0
          };
        });
      }
    } catch (error) {
      console.error('Failed to get storage usage:', error);
    }

    return { used: 0, available: 0 };
  }

  // Clear all offline data
  static clearOfflineData() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.SYNC_QUEUE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear offline data:', error);
      return false;
    }
  }

  // Sync offline data when online
  static async syncOfflineData(): Promise<boolean> {
    if (!this.isOnline()) {
      return false;
    }

    try {
      const queue = this.getSyncQueue();
      
      for (const action of queue) {
        // Process each queued action
        await this.processQueuedAction(action);
      }

      this.clearSyncQueue();
      return true;
    } catch (error) {
      console.error('Failed to sync offline data:', error);
      return false;
    }
  }

  private static async processQueuedAction(action: any): Promise<void> {
    // Implement actual API calls here based on action type
    console.log('Processing queued action:', action);
    
    // Example implementation:
    switch (action.type) {
      case 'UPDATE_SENSOR':
        // await api.updateSensor(action.data);
        break;
      case 'ADD_ALERT':
        // await api.addAlert(action.data);
        break;
      case 'UPDATE_CROP':
        // await api.updateCrop(action.data);
        break;
      default:
        console.warn('Unknown action type:', action.type);
    }
  }
}

// Service Worker registration for PWA
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};