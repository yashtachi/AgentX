import { useState, useEffect } from 'react';
import { web3Service } from '../services/web3';
import { WalletState } from '../types/agent';

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
    balance: '0',
  });
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      const address = await web3Service.connectWallet();
      const balance = await web3Service.getBalance(address);
      
      setWallet({
        address,
        isConnected: true,
        chainId: 1234, // Monard testnet ID
        balance,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: null,
      isConnected: false,
      chainId: null,
      balance: '0',
    });
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (wallet.isConnected && accounts[0] !== wallet.address) {
          // Account changed, reconnect
          connectWallet();
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [wallet.address, wallet.isConnected]);

  return {
    wallet,
    connectWallet,
    disconnectWallet,
    isConnecting,
  };
};