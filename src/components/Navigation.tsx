import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Bot, 
  BarChart3, 
  Store, 
  Settings, 
  BookOpen, 
  Users,
  Zap,
  Brain
} from 'lucide-react';

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/agents', label: 'My Agents', icon: Bot },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/marketplace', label: 'Marketplace', icon: Store },
  { path: '/community', label: 'Community', icon: Users },
  { path: '/executor', label: 'Executor', icon: Zap },
  { path: '/docs', label: 'Docs', icon: BookOpen },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 w-64 min-h-screen p-4">
      <div className="flex items-center space-x-3 mb-8 px-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AgentX
          </h1>
          <p className="text-xs text-gray-400">AI Agent Platform</p>
        </div>
      </div>

      <div className="space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/20">
        <h3 className="text-sm font-semibold text-blue-400 mb-2">Quick Stats</h3>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex justify-between">
            <span>Active Agents</span>
            <span className="text-green-400">3</span>
          </div>
          <div className="flex justify-between">
            <span>Total Executions</span>
            <span className="text-blue-400">127</span>
          </div>
          <div className="flex justify-between">
            <span>Success Rate</span>
            <span className="text-purple-400">98.4%</span>
          </div>
        </div>
      </div>
    </nav>
  );
};