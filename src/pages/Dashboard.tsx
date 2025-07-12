import React from 'react';
import { Plus, TrendingUp, Activity, Zap, Clock } from 'lucide-react';
import { useAgents } from '../hooks/useAgents';
import { Dashboard as DashboardStats } from '../components/Dashboard';
import { AgentCard } from '../components/AgentCard';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { agents, executeAgent } = useAgents();

  const recentAgents = agents.slice(0, 3);
  const recentActivity = [
    { id: '1', action: 'Agent "DeFi Monitor" executed successfully', time: '2 minutes ago', type: 'success' },
    { id: '2', action: 'New agent "DAO Summarizer" created', time: '15 minutes ago', type: 'info' },
    { id: '3', action: 'Agent "Price Tracker" completed 100 executions', time: '1 hour ago', type: 'milestone' },
    { id: '4', action: 'System maintenance completed', time: '3 hours ago', type: 'system' },
  ];

  const handleEditAgent = (agent: any) => {
    console.log('Edit agent:', agent);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome to AgentX</h1>
            <p className="text-gray-400">Manage your decentralized AI agents and monitor their performance.</p>
          </div>
          <Link
            to="/agents"
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Create Agent</span>
          </Link>
        </div>
      </div>

      {/* Stats Dashboard */}
      <DashboardStats agents={agents} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Agents */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Agents</h2>
            <Link 
              to="/agents" 
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          
          {recentAgents.length > 0 ? (
            <div className="space-y-4">
              {recentAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onExecute={executeAgent}
                  onEdit={handleEditAgent}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">No Agents Yet</h3>
              <p className="text-gray-500 mb-4">Create your first AI agent to get started.</p>
              <Link
                to="/agents"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Create Your First Agent
              </Link>
            </div>
          )}
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'info' ? 'bg-blue-400' :
                    activity.type === 'milestone' ? 'bg-purple-400' :
                    'bg-gray-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/marketplace"
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                Explore Marketplace
              </h3>
              <p className="text-sm text-gray-400">Discover agent templates</p>
            </div>
          </div>
        </Link>

        <Link
          to="/analytics"
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                View Analytics
              </h3>
              <p className="text-sm text-gray-400">Performance insights</p>
            </div>
          </div>
        </Link>

        <Link
          to="/docs"
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors">
                Documentation
              </h3>
              <p className="text-sm text-gray-400">Learn how to build</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};