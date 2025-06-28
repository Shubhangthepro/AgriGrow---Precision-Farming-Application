import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from '../components/common/Card';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

export const Analytics: React.FC = () => {
  const yieldData = [
    { month: 'Jan', yield: 4.2, prediction: 4.5 },
    { month: 'Feb', yield: 4.8, prediction: 5.1 },
    { month: 'Mar', yield: 5.3, prediction: 5.6 },
    { month: 'Apr', yield: 6.1, prediction: 6.3 },
    { month: 'May', yield: 7.2, prediction: 7.4 },
    { month: 'Jun', yield: 8.1, prediction: 8.3 },
  ];

  const cropDistribution = [
    { name: 'Wheat', value: 35, color: '#22c55e' },
    { name: 'Corn', value: 28, color: '#3b82f6' },
    { name: 'Soybeans', value: 22, color: '#f59e0b' },
    { name: 'Rice', value: 15, color: '#ef4444' },
  ];

  const resourceUsage = [
    { resource: 'Water', used: 75, limit: 100 },
    { resource: 'Fertilizer', used: 60, limit: 80 },
    { resource: 'Pesticide', used: 30, limit: 50 },
    { resource: 'Energy', used: 85, limit: 120 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Insights</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive analysis of your farm performance and predictions
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Yield</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">8.1 tons</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12.3% from last month</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resource Efficiency</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+5.2% improvement</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cost Reduction</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₹12,450</p>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">-8.1% saved this month</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <TrendingDown className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Yield Trends & Predictions
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="yield" fill="#22c55e" name="Actual Yield" />
                <Bar dataKey="prediction" fill="#86efac" name="Predicted Yield" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Crop Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cropDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {cropDistribution.map((crop) => (
              <div key={crop.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: crop.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {crop.name}: {crop.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Resource Usage */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Resource Usage & Optimization
        </h3>
        <div className="space-y-4">
          {resourceUsage.map((resource) => {
            const percentage = (resource.used / resource.limit) * 100;
            const isHigh = percentage > 80;
            
            return (
              <div key={resource.resource}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {resource.resource}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {resource.used}/{resource.limit} units
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isHigh ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};