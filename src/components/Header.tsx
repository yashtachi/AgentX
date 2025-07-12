import React from 'react';
import { Wallet, Brain, Zap } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

export const Header: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet, isConnecting } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AgentX
              </h1>
              <p className="text-xs text-gray-400">Decentralized AI Agents</p>
            </div>
          </div>

          {/* Network Status */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Monard Testnet</span>
            </div>
            {wallet.isConnected && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800/50 rounded-lg border border-gray-700">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">{wallet.balance} MON</span>
              </div>
            )}
          </div>

          {/* Wallet Connection */}
          <div>
            {wallet.isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-gray-300">{formatAddress(wallet.address!)}</p>
                  <p className="text-xs text-gray-500">Connected</p>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline">Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Wallet className="w-4 h-4" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};