import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, Zap, Clock, DollarSign } from 'lucide-react';
import { useAgents } from '../hooks/useAgents';

const COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

export const AnalyticsPage: React.FC = () => {
  const { agents } = useAgents();
  const [timeRange, setTimeRange] = useState('7d');

  // Mock analytics data
  const executionData = [
    { date: '2024-01-01', executions: 45, success: 43, failed: 2 },
    { date: '2024-01-02', executions: 52, success: 50, failed: 2 },
    { date: '2024-01-03', executions: 48, success: 47, failed: 1 },
    { date: '2024-01-04', executions: 61, success: 59, failed: 2 },
    { date: '2024-01-05', executions: 55, success: 54, failed: 1 },
    { date: '2024-01-06', executions: 67, success: 65, failed: 2 },
    { date: '2024-01-07', executions: 58, success: 57, failed: 1 },
  ];

  const costData = [
    { date: '2024-01-01', cost: 0.45 },
    { date: '2024-01-02', cost: 0.52 },
    { date: '2024-01-03', cost: 0.48 },
    { date: '2024-01-04', cost: 0.61 },
    { date: '2024-01-05', cost: 0.55 },
    { date: '2024-01-06', cost: 0.67 },
    { date: '2024-01-07', cost: 0.58 },
  ];

  const agentDistribution = agents.map((agent, index) => ({
    name: agent.name,
    value: agent.responseCount,
    color: COLORS[index % COLORS.length]
  }));

  const totalExecutions = agents.reduce((sum, agent) => sum + agent.responseCount, 0);
  const avgSuccessRate = agents.length > 0 
    ? agents.reduce((sum, agent) => sum + agent.performance.successRate, 0) / agents.length
    : 0;
  const totalCost = costData.reduce((sum, day) => sum + day.cost, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Performance insights and metrics for your agents</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+12%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{totalExecutions}</div>
          <div className="text-sm text-gray-400">Total Executions</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+2.1%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{avgSuccessRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-400">Success Rate</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex items-center space-x-1 text-red-400">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm">-0.3s</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">2.1s</div>
          <div className="text-sm text-gray-400">Avg Response Time</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+8%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{totalCost.toFixed(2)} MON</div>
          <div className="text-sm text-gray-400">Total Cost</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Execution Trends */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Execution Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={executionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="executions" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="success" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Analysis */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Cost Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="cost" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Agent Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={agentDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {agentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Agent Performance</h3>
          <div className="space-y-4">
            {agents.map((agent, index) => (
              <div key={agent.id} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <p className="font-medium text-white">{agent.name}</p>
                    <p className="text-sm text-gray-400">{agent.responseCount} executions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-400">
                    {agent.performance.successRate}% success
                  </p>
                  <p className="text-xs text-gray-400">
                    {agent.performance.avgResponseTime}s avg
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};