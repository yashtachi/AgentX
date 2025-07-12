import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  async executeGoal(goal: string, context?: string): Promise<string> {
    if (!this.genAI) {
      throw new Error('Gemini API not configured. Please set VITE_GEMINI_API_KEY environment variable.');
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        You are an AI agent operating on a blockchain. Your goal is: "${goal}"
        ${context ? `Additional context: ${context}` : ''}
        
        Provide a concise, actionable response that accomplishes this goal. 
        Keep your response under 500 characters and focus on practical outcomes.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to execute goal with Gemini AI');
    }
  }

  async analyzeAgentPerformance(responses: string[]): Promise<string> {
    if (!this.genAI) {
      throw new Error('Gemini API not configured');
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Analyze the following AI agent responses and provide insights on performance:
        ${responses.slice(0, 10).map((r, i) => `${i + 1}. ${r}`).join('\n')}
        
        Provide a brief analysis of consistency, quality, and suggestions for improvement.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Performance analysis error:', error);
      return 'Unable to analyze performance at this time.';
    }
  }
}

export const geminiService = new GeminiService();