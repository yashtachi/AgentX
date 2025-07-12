import React, { useState } from 'react';
import { Search, Star, Download, Verified, Filter, Grid, List } from 'lucide-react';
import { AgentTemplate } from '../types/marketplace';

const mockTemplates: AgentTemplate[] = [
  {
    id: '1',
    name: 'DeFi Yield Optimizer',
    description: 'Automatically monitors and suggests optimal yield farming strategies across multiple protocols.',
    category: 'defi',
    goal: 'Monitor DeFi protocols and suggest yield optimization strategies every 30 minutes',
    price: 5.0,
    creator: '0x1234...5678',
    downloads: 1247,
    rating: 4.8,
    tags: ['yield-farming', 'defi', 'optimization'],
    createdAt: new Date('2024-01-15'),
    featured: true,
    verified: true,
  },
  {
    id: '2',
    name: 'DAO Proposal Analyzer',
    description: 'Analyzes DAO proposals and provides detailed summaries with voting recommendations.',
    category: 'dao',
    goal: 'Analyze new DAO proposals and provide comprehensive summaries with risk assessment',
    price: 3.5,
    creator: '0x5678...9012',
    downloads: 892,
    rating: 4.6,
    tags: ['dao', 'governance', 'analysis'],
    createdAt: new Date('2024-01-10'),
    featured: true,
    verified: true,
  },
  {
    id: '3',
    name: 'NFT Floor Price Tracker',
    description: 'Tracks NFT collection floor prices and alerts on significant changes.',
    category: 'nft',
    goal: 'Monitor NFT floor prices across major marketplaces and alert on 10%+ changes',
    price: 2.0,
    creator: '0x9012...3456',
    downloads: 634,
    rating: 4.3,
    tags: ['nft', 'tracking', 'alerts'],
    createdAt: new Date('2024-01-08'),
    featured: false,
    verified: true,
  },
  {
    id: '4',
    name: 'Social Sentiment Monitor',
    description: 'Monitors social media sentiment for crypto projects and tokens.',
    category: 'social',
    goal: 'Track social sentiment for specified tokens across Twitter and Discord',
    price: 4.0,
    creator: '0x3456...7890',
    downloads: 445,
    rating: 4.1,
    tags: ['social', 'sentiment', 'monitoring'],
    createdAt: new Date('2024-01-05'),
    featured: false,
    verified: false,
  },
];

export const MarketplacePage: React.FC = () => {
  const [templates] = useState<AgentTemplate[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', 'defi', 'dao', 'nft', 'gaming', 'social', 'utility'];

  const filteredTemplates = templates
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'popular':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        default:
          return 0;
      }
    });

  const handlePurchase = (template: AgentTemplate) => {
    console.log('Purchase template:', template);
    // TODO: Implement purchase logic
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Agent Marketplace</h1>
          <p className="text-gray-400">Discover and deploy pre-built AI agent templates</p>
        </div>
      </div>

      {/* Featured Section */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Featured Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.filter(t => t.featured).slice(0, 2).map((template) => (
            <div key={template.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-white">{template.name}</h3>
                    {template.verified && <Verified className="w-4 h-4 text-blue-400" />}
                  </div>
                  <p className="text-sm text-gray-400">{template.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-400">{template.price} MON</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span>{template.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-3 h-3" />
                    <span>{template.downloads}</span>
                  </div>
                </div>
                <button
                  onClick={() => handlePurchase(template)}
                  className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                >
                  Deploy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="featured">Featured</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-white">{template.name}</h3>
                  {template.verified && <Verified className="w-4 h-4 text-blue-400" />}
                  {template.featured && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-xl font-bold text-blue-400">{template.price} MON</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span>{template.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="w-3 h-3" />
                  <span>{template.downloads}</span>
                </div>
              </div>
              <button
                onClick={() => handlePurchase(template)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-sm transition-all duration-200 transform hover:scale-105"
              >
                Deploy Agent
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">No templates found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};