import React from 'react';
import { Bot, Play, Pause, Settings, TrendingUp, Clock, Zap } from 'lucide-react';
import { Agent } from '../types/agent';
import { formatDistanceToNow } from 'date-fns';

interface AgentCardProps {
  agent: Agent;
  onExecute: (agentId: string) => void;
  onEdit: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onExecute, onEdit }) => {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'paused': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'error': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'pending': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'active': return <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />;
      case 'paused': return <Pause className="w-3 h-3" />;
      case 'error': return <div className="w-2 h-2 bg-red-400 rounded-full" />;
      case 'pending': return <div className="w-2 h-2 bg-blue-400 rounded-full animate-spin" />;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/20">
            <Bot className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
              {agent.name}
            </h3>
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(agent.status)}`}>
              {getStatusIcon(agent.status)}
              <span className="capitalize">{agent.status}</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onExecute(agent.id)}
            disabled={agent.status === 'pending'}
            className="p-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg transition-colors disabled:opacity-50"
          >
            <Play className="w-4 h-4 text-blue-400" />
          </button>
          <button
            onClick={() => onEdit(agent)}
            className="p-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Goal */}
      <div className="mb-4">
        <p className="text-sm text-gray-300 bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
          <span className="text-gray-500">Goal:</span> {agent.goal}
        </p>
      </div>

      {/* Last Response */}
      {agent.lastResponse && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Latest Response</p>
          <p className="text-sm text-gray-300 bg-gray-900/30 rounded-lg p-3 border border-gray-700/30 line-clamp-2">
            {agent.lastResponse}
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-white">{agent.responseCount}</p>
          <p className="text-xs text-gray-500">Responses</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-green-400">{agent.performance.successRate}%</p>
          <p className="text-xs text-gray-500">Success</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-blue-400">{agent.performance.avgResponseTime}s</p>
          <p className="text-xs text-gray-500">Avg Time</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
        <div className="flex items-center space-x-3 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatDistanceToNow(agent.lastExecution)} ago</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>Every {agent.executionInterval}m</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {agent.contractAddress.slice(0, 8)}...
        </div>
      </div>
    </div>
  );
};