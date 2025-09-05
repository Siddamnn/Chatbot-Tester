// src/ai/flows/modular-llm-injection.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for injecting user requests into selected LLMs using a modular architecture.
 *
 * - `injectRequest` - A function that takes a user request and a selected LLM module name and returns the LLM's response.
 * - `ModularLLMInput` - The input type for the `injectRequest` function, including the user request and LLM module name.
 * - `ModularLLMOutput` - The output type for the `injectRequest` function, containing the LLM's response.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModularLLMInputSchema = z.object({
  request: z.string().describe('The user request to be processed by the LLM.'),
  llmModule: z.string().describe('The name of the LLM module to use.'),
});
export type ModularLLMInput = z.infer<typeof ModularLLMInputSchema>;

const ModularLLMOutputSchema = z.object({
  response: z.string().describe('The LLM\'s response to the user request.'),
  wordCount: z.number().describe('The number of words in the LLM\'s response.'),
  responseTime: z.number().describe('The time taken (in milliseconds) for the LLM to respond.'),
});
export type ModularLLMOutput = z.infer<typeof ModularLLMOutputSchema>;

export async function injectRequest(input: ModularLLMInput): Promise<ModularLLMOutput> {
  return modularLLMInjectionFlow(input);
}

const modularLLMInjectionFlow = ai.defineFlow(
  {
    name: 'modularLLMInjectionFlow',
    inputSchema: ModularLLMInputSchema,
    outputSchema: ModularLLMOutputSchema,
  },
  async input => {
    const startTime = Date.now();
    const {output} = await ai.generate({
      prompt: input.request,
    });
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const response = output!.text;
    const wordCount = response.split(/\s+/).length;

    return {
      response,
      wordCount,
      responseTime,
    };
  }
);
