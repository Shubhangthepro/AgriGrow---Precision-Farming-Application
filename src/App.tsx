import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Sensors } from './pages/Sensors';
import { Crops } from './pages/Crops';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { Analytics } from './pages/Analytics';
import { Weather } from './pages/Weather';
import { Alerts } from './pages/Alerts';
import { Settings } from './pages/Settings';
import { Marketplace } from './pages/Marketplace';
import { FarmMap } from './pages/FarmMap';
import { useTheme } from './hooks/useTheme';
import { LanguageProvider } from './contexts/LanguageContext';
import { VoiceProvider } from './contexts/VoiceContext';
import { NotificationProvider } from './contexts/NotificationContext';
import './i18n/config';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <LanguageProvider>
      <VoiceProvider>
        <NotificationProvider>
          <Router>
            <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDark ? 'dark' : ''}`}>
              <div className="flex h-screen overflow-hidden">
                <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
                
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                  
                  <main className="flex-1 overflow-auto p-6">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/sensors" element={<Sensors />} />
                      <Route path="/crops" element={<Crops />} />
                      <Route path="/disease-detection" element={<DiseaseDetection />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/weather" element={<Weather />} />
                      <Route path="/alerts" element={<Alerts />} />
                      <Route path="/map" element={<FarmMap />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </main>
                </div>
              </div>
              
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: isDark ? '#374151' : '#ffffff',
                    color: isDark ? '#ffffff' : '#374151',
                    border: '1px solid',
                    borderColor: isDark ? '#4B5563' : '#E5E7EB',
                  },
                }}
              />
            </div>
          </Router>
        </NotificationProvider>
      </VoiceProvider>
    </LanguageProvider>
  );
}

export default App;