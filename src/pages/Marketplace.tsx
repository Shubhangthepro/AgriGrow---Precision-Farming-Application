import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Star, 
  Truck, 
  Shield,
  Package,
  MapPin,
  Heart,
  Plus
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  seller: string;
  location: string;
  image: string;
  inStock: boolean;
  organic: boolean;
  fastDelivery: boolean;
}

export const Marketplace: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: t('marketplace.categories.all') },
    { id: 'seeds', name: t('marketplace.categories.seeds') },
    { id: 'fertilizers', name: t('marketplace.categories.fertilizers') },
    { id: 'pesticides', name: t('marketplace.categories.pesticides') },
    { id: 'equipment', name: t('marketplace.categories.equipment') },
    { id: 'tools', name: t('marketplace.categories.tools') }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Wheat Seeds',
      category: 'seeds',
      price: 1200,
      unit: 'kg',
      rating: 4.8,
      reviews: 156,
      seller: 'Agri Seeds Co.',
      location: 'Punjab, India',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
      organic: true,
      fastDelivery: true
    },
    {
      id: '2',
      name: 'Organic NPK Fertilizer',
      category: 'fertilizers',
      price: 850,
      unit: '50kg bag',
      rating: 4.6,
      reviews: 89,
      seller: 'Green Farms Ltd.',
      location: 'Maharashtra, India',
      image: 'https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
      organic: true,
      fastDelivery: false
    },
    {
      id: '3',
      name: 'Bio Pesticide Spray',
      category: 'pesticides',
      price: 450,
      unit: 'liter',
      rating: 4.7,
      reviews: 234,
      seller: 'BioProtect Solutions',
      location: 'Karnataka, India',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
      organic: true,
      fastDelivery: true
    },
    {
      id: '4',
      name: 'Smart Irrigation System',
      category: 'equipment',
      price: 25000,
      unit: 'set',
      rating: 4.9,
      reviews: 67,
      seller: 'TechFarm Industries',
      location: 'Gujarat, India',
      image: 'https://images.pexels.com/photos/574919/pexels-photo-574919.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
      organic: false,
      fastDelivery: false
    },
    {
      id: '5',
      name: 'Garden Tool Set',
      category: 'tools',
      price: 1800,
      unit: 'set',
      rating: 4.5,
      reviews: 123,
      seller: 'Farm Tools Pro',
      location: 'Haryana, India',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
      organic: false,
      fastDelivery: true
    },
    {
      id: '6',
      name: 'Corn Hybrid Seeds',
      category: 'seeds',
      price: 2800,
      unit: 'kg',
      rating: 4.8,
      reviews: 198,
      seller: 'Pioneer Seeds',
      location: 'Uttar Pradesh, India',
      image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: false,
      organic: false,
      fastDelivery: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleCart = (productId: string) => {
    setCart(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('marketplace.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('marketplace.subtitle')}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-500" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
          <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            {t('marketplace.viewCart')}
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('marketplace.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  {product.organic && (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                      {t('marketplace.badges.organic')}
                    </span>
                  )}
                  {product.fastDelivery && (
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                      <Truck className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-2 left-2 p-2 rounded-full transition-colors ${
                    favorites.includes(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>

                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{product.seller}</span>
                  <span>•</span>
                  <span>{product.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">/ {product.unit}</span>
                  </div>
                  <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? t('marketplace.inStock') : t('marketplace.outOfStock')}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleCart(product.id)}
                    disabled={!product.inStock}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      cart.includes(product.id)
                        ? 'bg-green-500 text-white'
                        : product.inStock
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-1">
                      {cart.includes(product.id) ? (
                        <>
                          <Package className="w-4 h-4" />
                          <span>{t('marketplace.added')}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>{t('marketplace.addToCart')}</span>
                        </>
                      )}
                    </div>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    {t('marketplace.viewDetails')}
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('marketplace.noProducts.title')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t('marketplace.noProducts.message')}
            </p>
          </div>
        </Card>
      )}

      {/* Trust Indicators */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('marketplace.trust.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {t('marketplace.trust.secure')}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('marketplace.trust.secureDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 rounded-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {t('marketplace.trust.delivery')}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('marketplace.trust.deliveryDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400 rounded-lg">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {t('marketplace.trust.quality')}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('marketplace.trust.qualityDesc')}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};