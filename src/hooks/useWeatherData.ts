import { useState, useEffect } from 'react';
import { WeatherData } from '../types';

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // In a real app, this would call a weather API
        setTimeout(() => {
          setWeatherData({
            temperature: 25 + Math.random() * 10,
            humidity: 60 + Math.random() * 30,
            precipitation: Math.random() * 10,
            windSpeed: Math.random() * 20,
            conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
            forecast: Array.from({ length: 7 }, (_, i) => ({
              date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              high: 20 + Math.random() * 15,
              low: 10 + Math.random() * 10,
              conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
              precipitation: Math.random() * 20
            }))
          });
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return { weatherData, isLoading };
};