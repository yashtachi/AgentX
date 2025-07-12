import React, { useState } from 'react';
import { Users, MessageSquare, Trophy, Star, TrendingUp, Calendar } from 'lucide-react';

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  category: 'showcase' | 'help' | 'discussion' | 'announcement';
  likes: number;
  replies: number;
  timestamp: Date;
  tags: string[];
}

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    author: 'AgentBuilder',
    avatar: '🤖',
    title: 'Built an agent that automatically rebalances my DeFi portfolio',
    content: 'Just deployed my first agent that monitors my LP positions and rebalances when IL gets too high. Saved me 15% in fees already!',
    category: 'showcase',
    likes: 24,
    replies: 8,
    timestamp: new Date(Date.now() - 3600000),
    tags: ['defi', 'portfolio', 'automation']
  },
  {
    id: '2',
    author: 'DAOEnthusiast',
    avatar: '🏛️',
    title: 'How to make agents vote on DAO proposals?',
    content: 'I want my agent to automatically vote on simple proposals based on predefined criteria. Has anyone implemented this?',
    category: 'help',
    likes: 12,
    replies: 15,
    timestamp: new Date(Date.now() - 7200000),
    tags: ['dao', 'voting', 'automation']
  },
  {
    id: '3',
    author: 'CoreTeam',
    avatar: '⚡',
    title: 'AgentX v2.0 Release - Multi-Agent Coordination',
    content: 'Excited to announce AgentX v2.0 with support for agent-to-agent communication and coordinated strategies!',
    category: 'announcement',
    likes: 89,
    replies: 23,
    timestamp: new Date(Date.now() - 86400000),
    tags: ['release', 'features', 'coordination']
  }
];

export const CommunityPage: React.FC = () => {
  const [posts] = useState<CommunityPost[]>(mockPosts);
  const [activeTab, setActiveTab] = useState<'all' | 'showcase' | 'help' | 'discussion' | 'announcement'>('all');

  const filteredPosts = activeTab === 'all' ? posts : posts.filter(post => post.category === activeTab);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'showcase': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'help': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'discussion': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'announcement': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Community</h1>
          <p className="text-gray-400">Connect with other AgentX builders and share knowledge</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 transform hover:scale-105">
          New Post
        </button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold text-white">1,247</span>
          </div>
          <p className="text-sm text-gray-400">Active Builders</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <MessageSquare className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold text-white">3,891</span>
          </div>
          <p className="text-sm text-gray-400">Discussions</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-2xl font-bold text-white">156</span>
          </div>
          <p className="text-sm text-gray-400">Showcases</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <span className="text-2xl font-bold text-white">89%</span>
          </div>
          <p className="text-sm text-gray-400">Help Rate</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg">
        {['all', 'showcase', 'help', 'discussion', 'announcement'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center text-xl">
                {post.avatar}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-white">{post.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 mb-3 text-sm text-gray-400">
                  <span>by {post.author}</span>
                  <span>•</span>
                  <span>{formatTimeAgo(post.timestamp)}</span>
                </div>
                
                <p className="text-gray-300 mb-4">{post.content}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                    <Star className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.replies} replies</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <div>
              <h3 className="font-medium text-white">AgentX Builder Workshop</h3>
              <p className="text-sm text-gray-400">Learn advanced agent coordination patterns</p>
            </div>
            <div className="text-right text-sm text-gray-400">
              <p>Jan 25, 2024</p>
              <p>2:00 PM UTC</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <div>
              <h3 className="font-medium text-white">Community AMA</h3>
              <p className="text-sm text-gray-400">Ask the core team anything</p>
            </div>
            <div className="text-right text-sm text-gray-400">
              <p>Feb 1, 2024</p>
              <p>6:00 PM UTC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};