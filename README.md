# AgriGrow - Precision Farming Application

A comprehensive AI-powered precision farming application that helps farmers monitor crop health, manage resources, and optimize yields using IoT sensors and machine learning.
https://melodious-pastelito-a3c814.netlify.app/

## 🌟 Features

### Core Functionality
- **Real-time IoT Sensor Monitoring** - Track soil moisture, pH, temperature, humidity, and light levels
- **AI Disease Detection** - Upload crop images for instant disease identification and treatment recommendations
- **Smart Irrigation System** - Automated irrigation recommendations based on sensor data and weather forecasts
- **Crop Management** - Complete lifecycle tracking from planting to harvest
- **Weather Integration** - 7-day forecasts with farming-specific alerts and recommendations
- **Interactive Farm Mapping** - Visual representation of farm fields with sensor locations
- **AgriMarketplace** - Buy and sell agricultural products and equipment
- **Advanced Analytics** - Yield predictions, cost optimization, and performance insights

### Technical Features
- **Progressive Web App (PWA)** - Works offline with data synchronization
- **Multi-language Support** - English and Hindi with easy language switching
- **Voice Alerts** - Accessibility features with text-to-speech notifications
- **Dark/Light Mode** - Adaptive theming for different lighting conditions
- **Real-time Updates** - WebSocket and MQTT integration for live data
- **Mobile-first Design** - Responsive UI optimized for all devices

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **React Router** for navigation
- **i18next** for internationalization
- **Zustand** for state management

### Backend Integration Ready
- **MQTT** for IoT sensor communication
- **WebSocket** for real-time updates
- **REST API** endpoints for data management
- **PWA** with offline capabilities

### AI/ML Features
- **Disease Detection** using image analysis
- **Yield Prediction** based on environmental data
- **Smart Recommendations** for irrigation and fertilization

## 📱 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd agrigrow-precision-farming

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_MQTT_BROKER_URL=ws://localhost:8083/mqtt
VITE_WEBSOCKET_URL=ws://localhost:8080
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_MAPS_API_KEY=your_maps_api_key
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── alerts/         # Alert-related components
│   ├── charts/         # Data visualization components
│   ├── common/         # Shared components (Card, StatCard, etc.)
│   ├── disease/        # Disease detection components
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── sensors/        # Sensor-related components
├── contexts/           # React contexts for global state
├── hooks/              # Custom React hooks
├── i18n/              # Internationalization files
├── pages/             # Page components
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and services
└── App.tsx            # Main application component
```

## 🔧 Key Components

### Sensor Monitoring
- Real-time data visualization
- Threshold-based alerts
- Historical data tracking
- Multi-field support

### Disease Detection
- Image upload and analysis
- AI-powered disease identification
- Treatment recommendations
- Prevention tips

### Smart Irrigation
- Soil moisture monitoring
- Weather-based recommendations
- Automated scheduling
- Water usage optimization

### Farm Mapping
- Interactive field visualization
- Sensor location tracking
- Health status indicators
- GPS integration ready

## 📊 Data Flow

1. **IoT Sensors** → MQTT Broker → WebSocket → React App
2. **Weather API** → Backend Service → React App
3. **User Actions** → Local State → API Calls → Database
4. **Offline Mode** → Local Storage → Sync Queue → API Sync

## 🌐 API Endpoints (Backend Integration)

```javascript
// Sensor Data
GET    /api/sensors              # Get all sensors
POST   /api/sensors              # Add new sensor
PUT    /api/sensors/:id          # Update sensor
DELETE /api/sensors/:id          # Remove sensor

// Crop Management
GET    /api/crops                # Get all crops
POST   /api/crops                # Add new crop
PUT    /api/crops/:id            # Update crop
DELETE /api/crops/:id            # Remove crop

// Disease Detection
POST   /api/disease/detect       # Analyze crop image
GET    /api/disease/history      # Get detection history

// Weather
GET    /api/weather/current      # Current weather
GET    /api/weather/forecast     # 7-day forecast

// Alerts
GET    /api/alerts               # Get all alerts
POST   /api/alerts               # Create alert
PUT    /api/alerts/:id/ack       # Acknowledge alert

// Analytics
GET    /api/analytics/yield      # Yield predictions
GET    /api/analytics/costs      # Cost analysis
GET    /api/analytics/efficiency # Resource efficiency
```

## 🔒 Security Features

- Input validation and sanitization
- HTTPS enforcement
- API rate limiting
- User authentication ready
- Data encryption for sensitive information

## 📱 PWA Features

- **Offline Functionality** - Works without internet connection
- **Background Sync** - Syncs data when connection is restored
- **Push Notifications** - Critical alerts even when app is closed
- **App-like Experience** - Can be installed on mobile devices
- **Automatic Updates** - Self-updating application

## 🌍 Internationalization

Currently supports:
- **English** (en)
- **Hindi** (hi)

Easy to add more languages by creating new translation files in `src/i18n/locales/`.

## 🎯 Hackathon-Winning Features

### Innovation
- **AI-Powered Disease Detection** with real-time image analysis
- **Smart Irrigation** using ML algorithms and weather data
- **Voice Accessibility** for farmers with limited literacy
- **Offline-First Design** for areas with poor connectivity

### Technical Excellence
- **Modern Tech Stack** with React 18, TypeScript, and PWA
- **Real-time Data** using WebSocket and MQTT
- **Responsive Design** optimized for mobile devices
- **Scalable Architecture** ready for production deployment

### User Experience
- **Intuitive Interface** designed for farmers
- **Multi-language Support** for broader accessibility
- **Dark/Light Mode** for different usage scenarios
- **Voice Alerts** for hands-free operation

### Business Impact
- **Cost Reduction** through optimized resource usage
- **Yield Improvement** via data-driven decisions
- **Risk Mitigation** with early disease detection
- **Market Access** through integrated marketplace

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder to your hosting platform
```

### Backend Options
- **Node.js + Express** for REST API
- **Python + FastAPI** for ML services
- **MongoDB/PostgreSQL** for data storage
- **Redis** for caching and real-time features

### IoT Integration
- **MQTT Broker** (Mosquitto/AWS IoT Core)
- **InfluxDB** for time-series sensor data
- **Grafana** for advanced monitoring

## 📈 Future Enhancements

- **Drone Integration** for aerial crop monitoring
- **Satellite Imagery** for large-scale analysis
- **Blockchain** for supply chain traceability
- **Machine Learning** model improvements
- **Social Features** for farmer community
- **Financial Services** integration for loans and insurance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏆 Hackathon Submission

This application demonstrates:
- **Technical Innovation** in agricultural technology
- **Real-world Problem Solving** for farmers
- **Scalable Solution** for global agriculture
- **User-Centric Design** for accessibility
- **Production-Ready Code** with best practices

Perfect for winning hackathons focused on:
- Agriculture & Food Security
- IoT & Smart Cities
- AI/ML Applications
- Social Impact Technology
- Sustainability & Environment
