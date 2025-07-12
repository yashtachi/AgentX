import React from 'react';
import { Bot, Zap, TrendingUp, Activity } from 'lucide-react';
import { Agent } from '../types/agent';

interface DashboardProps {
  agents: Agent[];
}

export const Dashboard: React.FC<DashboardProps> = ({ agents }) => {
  const totalAgents = agents.length;
  const activeAgents = agents.filter(a => a.status === 'active').length;
  const totalResponses = agents.reduce((sum, agent) => sum + agent.responseCount, 0);
  const avgSuccessRate = agents.length > 0 
    ? agents.reduce((sum, agent) => sum + agent.performance.successRate, 0) / agents.length
    : 0;

  const stats = [
    {
      label: 'Total Agents',
      value: totalAgents.toString(),
      icon: Bot,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Active Agents',
      value: activeAgents.toString(),
      icon: Activity,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      label: 'Total Responses',
      value: totalResponses.toString(),
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    {
      label: 'Success Rate',
      value: `${avgSuccessRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} ${stat.borderColor} border backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform duration-200`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center border ${stat.borderColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};