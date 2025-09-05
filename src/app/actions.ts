'use server';

import { injectRequest, type ModularLLMInput, type ModularLLMOutput } from '@/ai/flows/modular-llm-injection';

export async function getChatbotResponse(input: ModularLLMInput): Promise<ModularLLMOutput> {
  // Add a small delay to simulate network latency and make the metrics more noticeable.
  await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 300));
  
  try {
    const response = await injectRequest(input);
    return response;
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    return {
      response: 'Sorry, I encountered an error. The AI model might be unavailable. Please try again later.',
      wordCount: 16,
      responseTime: 500, // arbitrary error time
    };
  }
}
