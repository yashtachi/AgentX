import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { AgentResponse } from '../types/agent';
import { formatDistanceToNow } from 'date-fns';

interface ResponseHistoryProps {
  responses: AgentResponse[];
  agentId?: string;
}

export const ResponseHistory: React.FC<ResponseHistoryProps> = ({ responses, agentId }) => {
  const filteredResponses = agentId 
    ? responses.filter(r => r.agentId === agentId)
    : responses;

  if (filteredResponses.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">No Responses Yet</h3>
        <p className="text-gray-500">Agent responses will appear here once execution begins.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Response History</h3>
      <div className="space-y-3">
        {filteredResponses.slice(0, 10).map((response) => (
          <div
            key={response.id}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-blue-500/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {response.success ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                <span className="text-sm text-gray-400">
                  {formatDistanceToNow(response.timestamp)} ago
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {response.executionTime.toFixed(1)}s
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {response.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};