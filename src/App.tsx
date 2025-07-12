import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardPage } from './pages/Dashboard';
import { AgentsPage } from './pages/AgentsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { CommunityPage } from './pages/CommunityPage';
import { ExecutorPage } from './pages/ExecutorPage';
import { DocsPage } from './pages/DocsPage';
import { SettingsPage } from './pages/SettingsPage';
import { useWallet } from './hooks/useWallet';

function App() {
  const { wallet } = useWallet();

  if (!wallet.isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">Ax</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to AgentX</h2>
            <p className="text-gray-400 mb-8">
              Connect your wallet to start creating and managing decentralized AI agents on the Monard testnet.
            </p>
            <div className="text-sm text-gray-500 space-y-2">
              <p>• Deploy autonomous AI agents</p>
              <p>• Powered by Gemini AI</p>
              <p>• Built on Monard blockchain</p>
            </div>
          </div>
        </div>
        <Toaster position="bottom-right" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <Header />
        <div className="flex">
          <Navigation />
          <main className="flex-1 p-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/executor" element={<ExecutorPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;