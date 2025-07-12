export interface Agent {
  id: string;
  name: string;
  goal: string;
  status: 'active' | 'paused' | 'error' | 'pending';
  createdAt: Date;
  lastResponse: string;
  responseCount: number;
  contractAddress: string;
  owner: string;
  memorySize: number;
  executionInterval: number; // in minutes
  lastExecution: Date;
  performance: {
    successRate: number;
    avgResponseTime: number;
    totalExecutions: number;
  };
}

export interface AgentResponse {
  id: string;
  agentId: string;
  content: string;
  timestamp: Date;
  executionTime: number;
  success: boolean;
  gasUsed?: number;
}

export interface CreateAgentRequest {
  name: string;
  goal: string;
  executionInterval: number;
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
  balance: string;
}