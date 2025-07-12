import { useState, useEffect } from 'react';
import { Agent, AgentResponse, CreateAgentRequest } from '../types/agent';
import { web3Service } from '../services/web3';
import { geminiService } from '../services/gemini';

// Mock data for demonstration
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'DAO Proposal Summarizer',
    goal: 'Summarize the latest DAO proposals every hour',
    status: 'active',
    createdAt: new Date(Date.now() - 86400000),
    lastResponse: 'Analyzed 3 new proposals: treasury allocation, governance update, and community rewards program.',
    responseCount: 24,
    contractAddress: '0x1234...5678',
    owner: '0xabcd...efgh',
    memorySize: 150,
    executionInterval: 60,
    lastExecution: new Date(Date.now() - 3600000),
    performance: {
      successRate: 95.8,
      avgResponseTime: 2.3,
      totalExecutions: 24,
    },
  },
  {
    id: '2',
    name: 'DeFi Monitor',
    goal: 'Monitor DEX prices and alert on significant changes',
    status: 'active',
    createdAt: new Date(Date.now() - 172800000),
    lastResponse: 'ETH/USDC pool showing 2.1% price increase. Volume up 15% in last 4 hours.',
    responseCount: 48,
    contractAddress: '0x5678...9012',
    owner: '0xabcd...efgh',
    memorySize: 200,
    executionInterval: 30,
    lastExecution: new Date(Date.now() - 1800000),
    performance: {
      successRate: 98.9,
      avgResponseTime: 1.8,
      totalExecutions: 48,
    },
  },
];

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [responses, setResponses] = useState<AgentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createAgent = async (request: CreateAgentRequest): Promise<Agent> => {
    setIsLoading(true);
    try {
      // Deploy contract (mock for now)
      const contractAddress = await web3Service.deployAgent(request.name, request.goal);
      
      const newAgent: Agent = {
        id: Math.random().toString(36).substr(2, 9),
        name: request.name,
        goal: request.goal,
        status: 'pending',
        createdAt: new Date(),
        lastResponse: '',
        responseCount: 0,
        contractAddress,
        owner: '0xabcd...efgh', // Current wallet address
        memorySize: 0,
        executionInterval: request.executionInterval,
        lastExecution: new Date(),
        performance: {
          successRate: 0,
          avgResponseTime: 0,
          totalExecutions: 0,
        },
      };

      setAgents(prev => [...prev, newAgent]);
      return newAgent;
    } catch (error) {
      console.error('Failed to create agent:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const executeAgent = async (agentId: string): Promise<void> => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    try {
      setAgents(prev => prev.map(a => 
        a.id === agentId ? { ...a, status: 'pending' as const } : a
      ));

      const response = await geminiService.executeGoal(agent.goal);
      
      // Update agent with new response
      setAgents(prev => prev.map(a => 
        a.id === agentId ? {
          ...a,
          status: 'active' as const,
          lastResponse: response,
          responseCount: a.responseCount + 1,
          lastExecution: new Date(),
          performance: {
            ...a.performance,
            totalExecutions: a.performance.totalExecutions + 1,
          },
        } : a
      ));

      // Add to responses
      const newResponse: AgentResponse = {
        id: Math.random().toString(36).substr(2, 9),
        agentId,
        content: response,
        timestamp: new Date(),
        executionTime: Math.random() * 3 + 1, // Mock execution time
        success: true,
      };

      setResponses(prev => [newResponse, ...prev]);
    } catch (error) {
      console.error('Agent execution failed:', error);
      setAgents(prev => prev.map(a => 
        a.id === agentId ? { ...a, status: 'error' as const } : a
      ));
    }
  };

  const updateAgent = (agentId: string, updates: Partial<Agent>): void => {
    setAgents(prev => prev.map(a => 
      a.id === agentId ? { ...a, ...updates } : a
    ));
  };

  const deleteAgent = (agentId: string): void => {
    setAgents(prev => prev.filter(a => a.id !== agentId));
    setResponses(prev => prev.filter(r => r.agentId !== agentId));
  };

  return {
    agents,
    responses,
    isLoading,
    createAgent,
    executeAgent,
    updateAgent,
    deleteAgent,
  };
};