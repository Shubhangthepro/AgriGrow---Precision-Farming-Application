import { useState, useEffect, useRef } from 'react';
import mqtt from 'mqtt';

interface MQTTMessage {
  topic: string;
  message: string;
  timestamp: Date;
}

export const useMQTT = (brokerUrl: string = 'ws://localhost:8083/mqtt') => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<MQTTMessage[]>([]);
  const clientRef = useRef<mqtt.MqttClient | null>(null);

  useEffect(() => {
    // Initialize MQTT client
    try {
      const client = mqtt.connect(brokerUrl, {
        clientId: `agrigrow_${Math.random().toString(16).substr(2, 8)}`,
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 1000,
      });

      client.on('connect', () => {
        console.log('MQTT Connected');
        setIsConnected(true);
        
        // Subscribe to sensor topics
        const topics = [
          'agrigrow/sensors/+/temperature',
          'agrigrow/sensors/+/humidity',
          'agrigrow/sensors/+/soil_moisture',
          'agrigrow/sensors/+/ph',
          'agrigrow/alerts/+',
          'agrigrow/weather/+',
        ];
        
        topics.forEach(topic => {
          client.subscribe(topic, (err) => {
            if (err) {
              console.error(`Failed to subscribe to ${topic}:`, err);
            }
          });
        });
      });

      client.on('message', (topic, payload) => {
        const message = payload.toString();
        setMessages(prev => [...prev, {
          topic,
          message,
          timestamp: new Date()
        }].slice(-100)); // Keep only last 100 messages
      });

      client.on('error', (err) => {
        console.error('MQTT Error:', err);
        setIsConnected(false);
      });

      client.on('close', () => {
        console.log('MQTT Disconnected');
        setIsConnected(false);
      });

      clientRef.current = client;
    } catch (error) {
      console.error('Failed to connect to MQTT broker:', error);
    }

    return () => {
      if (clientRef.current) {
        clientRef.current.end();
      }
    };
  }, [brokerUrl]);

  const publish = (topic: string, message: string) => {
    if (clientRef.current && isConnected) {
      clientRef.current.publish(topic, message);
    }
  };

  const subscribe = (topic: string) => {
    if (clientRef.current && isConnected) {
      clientRef.current.subscribe(topic);
    }
  };

  return {
    isConnected,
    messages,
    publish,
    subscribe
  };
};