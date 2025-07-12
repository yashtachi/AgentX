export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: 'defi' | 'dao' | 'nft' | 'gaming' | 'social' | 'utility';
  goal: string;
  price: number; // in MON tokens
  creator: string;
  downloads: number;
  rating: number;
  tags: string[];
  createdAt: Date;
  featured: boolean;
  verified: boolean;
}

export interface AgentMarketplace {
  templates: AgentTemplate[];
  categories: string[];
  featured: AgentTemplate[];
}