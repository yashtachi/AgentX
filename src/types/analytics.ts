export interface AgentAnalytics {
  agentId: string;
  executionHistory: ExecutionData[];
  performanceMetrics: PerformanceMetrics;
  costAnalysis: CostAnalysis;
  memoryUsage: MemoryUsage[];
}

export interface ExecutionData {
  timestamp: Date;
  executionTime: number;
  success: boolean;
  gasUsed: number;
  responseLength: number;
}

export interface PerformanceMetrics {
  uptime: number;
  averageResponseTime: number;
  successRate: number;
  totalExecutions: number;
  errorRate: number;
  costEfficiency: number;
}

export interface CostAnalysis {
  totalGasUsed: number;
  totalCostMON: number;
  averageCostPerExecution: number;
  costTrend: 'increasing' | 'decreasing' | 'stable';
}

export interface MemoryUsage {
  timestamp: Date;
  memorySize: number;
  memoryType: 'short-term' | 'long-term' | 'context';
}