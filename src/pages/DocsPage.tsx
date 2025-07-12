import React, { useState } from 'react';
import { Book, Code, Zap, Shield, Globe, ChevronRight, Copy, ExternalLink } from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
}

export const DocsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const sections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to AgentX</h2>
            <p className="text-gray-300 mb-4">
              AgentX is a decentralized framework for creating and managing on-chain AI agents. 
              This guide will help you get started with building your first autonomous AI agent.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Prerequisites</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>MetaMask wallet installed</li>
              <li>Monard testnet tokens (MON)</li>
              <li>Gemini API key (optional for custom agents)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Quick Start</h3>
            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium text-white mb-2">1. Connect Your Wallet</h4>
                <p className="text-gray-400 text-sm">
                  Click "Connect Wallet" in the top right corner and approve the connection to Monard testnet.
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium text-white mb-2">2. Create Your First Agent</h4>
                <p className="text-gray-400 text-sm">
                  Navigate to the Agents page and click "Create Agent". Define your agent's goal and execution interval.
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium text-white mb-2">3. Deploy and Monitor</h4>
                <p className="text-gray-400 text-sm">
                  Your agent will be deployed to the blockchain and begin executing according to its schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Architecture',
      icon: Globe,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">System Architecture</h2>
            <p className="text-gray-300 mb-4">
              AgentX consists of several key components working together to provide a decentralized AI agent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h4 className="font-medium text-white mb-2 flex items-center">
                <Code className="w-4 h-4 mr-2 text-blue-400" />
                Smart Contracts
              </h4>
              <p className="text-gray-400 text-sm">
                Agent Factory and individual Agent contracts deployed on Monard testnet for trustless execution.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h4 className="font-medium text-white mb-2 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                Executor Network
              </h4>
              <p className="text-gray-400 text-sm">
                Decentralized nodes that read agent goals, query AI models, and submit responses on-chain.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h4 className="font-medium text-white mb-2 flex items-center">
                <Globe className="w-4 h-4 mr-2 text-green-400" />
                AI Integration
              </h4>
              <p className="text-gray-400 text-sm">
                Gemini API integration for natural language processing and goal-driven reasoning.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h4 className="font-medium text-white mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-purple-400" />
                Frontend Interface
              </h4>
              <p className="text-gray-400 text-sm">
                React-based dashboard for creating, monitoring, and managing your AI agents.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'smart-contracts',
      title: 'Smart Contracts',
      icon: Code,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Smart Contract API</h2>
            <p className="text-gray-300 mb-4">
              Learn how to interact with AgentX smart contracts programmatically.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Agent Factory Contract</h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Solidity</span>
                <button 
                  onClick={() => copyToClipboard(`function createAgent(string memory _goal, uint256 _interval) external returns (address)`)}
                  className="text-gray-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`function createAgent(
    string memory _goal, 
    uint256 _interval
) external returns (address)`}
              </pre>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Creates a new agent contract with the specified goal and execution interval.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Agent Contract</h3>
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Solidity</span>
                  <button 
                    onClick={() => copyToClipboard(`function updateGoal(string memory _newGoal) external onlyOwner`)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`function updateGoal(string memory _newGoal) external onlyOwner`}
                </pre>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Solidity</span>
                  <button 
                    onClick={() => copyToClipboard(`function submitResponse(string memory _response) external onlyExecutor`)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`function submitResponse(string memory _response) external onlyExecutor`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: Book,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">API Reference</h2>
            <p className="text-gray-300 mb-4">
              Complete reference for the AgentX REST API and WebSocket endpoints.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">REST Endpoints</h3>
            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">GET</span>
                  <code className="text-blue-400">/api/agents</code>
                </div>
                <p className="text-gray-400 text-sm">Retrieve all agents for the authenticated user.</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">POST</span>
                  <code className="text-blue-400">/api/agents</code>
                </div>
                <p className="text-gray-400 text-sm">Create a new agent with specified parameters.</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">PUT</span>
                  <code className="text-blue-400">/api/agents/:id</code>
                </div>
                <p className="text-gray-400 text-sm">Update an existing agent's configuration.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">WebSocket Events</h3>
            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium text-white mb-2">agent:execution</h4>
                <p className="text-gray-400 text-sm mb-2">Fired when an agent completes execution.</p>
                <div className="bg-gray-900 rounded-lg p-3">
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`{
  "agentId": "agent_123",
  "response": "Market analysis complete...",
  "executionTime": 2.3,
  "success": true
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const activeContent = sections.find(s => s.id === activeSection)?.content;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sticky top-4">
          <h2 className="text-lg font-bold text-white mb-4">Documentation</h2>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.title}</span>
                <ChevronRight className="w-3 h-3 ml-auto" />
              </button>
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-3">External Resources</h3>
            <div className="space-y-2">
              <a
                href="https://github.com/agentx/contracts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>GitHub Repository</span>
              </a>
              <a
                href="https://discord.gg/agentx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Discord Community</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="lg:col-span-3">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          {activeContent}
        </div>
      </div>
    </div>
  );
};