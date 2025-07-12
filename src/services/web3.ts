import { ethers } from 'ethers';

export const MONARD_TESTNET_CONFIG = {
  chainId: 10143, // Replace with actual Monard testnet chain ID
  chainName: 'Monard Testnet',
  rpcUrls: ['https://rpc.monard-testnet.io'], // Replace with actual RPC
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.monard-testnet.io'],
};

class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;

  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask not found. Please install MetaMask to continue.');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Switch to Monard testnet if needed
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: MONARD_TESTNET_CONFIG.chainId }],
        });
      } catch (switchError: any) {
        // Chain not added, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [MONARD_TESTNET_CONFIG],
          });
        }
      }

      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();

      return accounts[0];
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw new Error('Failed to connect wallet');
    }
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) return '0';
    
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Balance fetch error:', error);
      return '0';
    }
  }

  async deployAgent(name: string, goal: string): Promise<string> {
    // Mock implementation - replace with actual contract interaction
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`0x${Math.random().toString(16).substr(2, 40)}`);
      }, 2000);
    });
  }

  getSigner(): ethers.Signer | null {
    return this.signer;
  }

  getProvider(): ethers.BrowserProvider | null {
    return this.provider;
  }
}

export const web3Service = new Web3Service();

// Extend window type for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}