import React, { useState } from 'react';
import { Play, Pause, Settings, Activity, Zap, Clock, AlertTriangle } from 'lucide-react';

interface ExecutorNode {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error' | 'maintenance';
  region: string;
  uptime: number;
  agentsHandled: number;
  lastExecution: Date;
  performance: {
    avgResponseTime: number;
    successRate: number;
    queueSize: number;
  };
}

const mockNodes: ExecutorNode[] = [
  {
    id: '1',
    name: 'Primary Executor',
    status: 'running',
    region: 'US-East',
    uptime: 99.8,
    agentsHandled: 45,
    lastExecution: new Date(Date.now() - 30000),
    performance: {
      avgResponseTime: 1.2,
      successRate: 98.9,
      queueSize: 3,
    },
  },
  {
    id: '2',
    name: 'Backup Executor',
    status: 'running',
    region: 'EU-West',
    uptime: 99.5,
    agentsHandled: 23,
    lastExecution: new Date(Date.now() - 120000),
    performance: {
      avgResponseTime: 1.8,
      successRate: 97.2,
      queueSize: 1,
    },
  },
];

export const ExecutorPage: React.FC = () => {
  const [nodes] = useState<ExecutorNode[]>(mockNodes);
  const [selectedNode, setSelectedNode] = useState<string>(nodes[0]?.id);

  const getStatusColor = (status: ExecutorNode['status']) => {
    switch (status) {
      case 'running': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'stopped': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      case 'error': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'maintenance': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    }
  };

  const getStatusIcon = (status: ExecutorNode['status']) => {
    switch (status) {
      case 'running': return <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />;
      case 'stopped': return <Pause className="w-3 h-3" />;
      case 'error': return <AlertTriangle className="w-3 h-3" />;
      case 'maintenance': return <Settings className="w-3 h-3" />;
    }
  };

  const selectedNodeData = nodes.find(n => n.id === selectedNode);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Executor Network</h1>
          <p className="text-gray-400">Monitor and manage the decentralized execution infrastructure</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 transform hover:scale-105">
          Deploy Node
        </button>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold text-white">{nodes.filter(n => n.status === 'running').length}</span>
          </div>
          <p className="text-sm text-gray-400">Active Nodes</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold text-white">{nodes.reduce((sum, n) => sum + n.agentsHandled, 0)}</span>
          </div>
          <p className="text-sm text-gray-400">Agents Handled</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="w-6 h-6 text-purple-400" />
            <span className="text-2xl font-bold text-white">
              {(nodes.reduce((sum, n) => sum + n.performance.avgResponseTime, 0) / nodes.length).toFixed(1)}s
            </span>
          </div>
          <p className="text-sm text-gray-400">Avg Response Time</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="w-6 h-6 text-yellow-400" />
            <span className="text-2xl font-bold text-white">
              {(nodes.reduce((sum, n) => sum + n.uptime, 0) / nodes.length).toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-gray-400">Network Uptime</p>
        </div>
      </div>

      {/* Node List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold text-white mb-4">Executor Nodes</h2>
          <div className="space-y-3">
            {nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedNode === node.id
                    ? 'bg-blue-600/20 border-blue-500/50'
                    : 'bg-gray-800/50 border-gray-700/50 hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{node.name}</h3>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(node.status)}`}>
                    {getStatusIcon(node.status)}
                    <span className="capitalize">{node.status}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>Region: {node.region}</p>
                  <p>Uptime: {node.uptime}%</p>
                  <p>Agents: {node.agentsHandled}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Node Details */}
        <div className="lg:col-span-2">
          {selectedNodeData && (
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedNodeData.name}</h2>
                    <p className="text-gray-400">{selectedNodeData.region}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg transition-colors">
                      <Play className="w-4 h-4 text-green-400" />
                    </button>
                    <button className="p-2 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 rounded-lg transition-colors">
                      <Pause className="w-4 h-4 text-yellow-400" />
                    </button>
                    <button className="p-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-lg transition-colors">
                      <Settings className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Response Time</p>
                    <p className="text-xl font-bold text-blue-400">{selectedNodeData.performance.avgResponseTime}s</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Success Rate</p>
                    <p className="text-xl font-bold text-green-400">{selectedNodeData.performance.successRate}%</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Queue Size</p>
                    <p className="text-xl font-bold text-purple-400">{selectedNodeData.performance.queueSize}</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-sm text-gray-300">Agent "DeFi Monitor" executed successfully</span>
                      </div>
                      <span className="text-xs text-gray-500">30s ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span className="text-sm text-gray-300">Agent "DAO Summarizer" queued for execution</span>
                      </div>
                      <span className="text-xs text-gray-500">1m ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-sm text-gray-300">Agent "Price Tracker" completed execution</span>
                      </div>
                      <span className="text-xs text-gray-500">2m ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Network Health */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Network Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">API Gateway</span>
                <span className="text-green-400">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Gemini Integration</span>
                <span className="text-green-400">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Blockchain RPC</span>
                <span className="text-green-400">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Queue System</span>
                <span className="text-yellow-400">Degraded</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Recent Incidents</h3>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <p className="text-yellow-400">Queue processing delays - Investigating</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <div className="p-2 bg-green-500/10 border border-green-500/20 rounded">
                <p className="text-green-400">Network maintenance completed</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};