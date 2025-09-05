'use server';

/**
 * @fileOverview This file defines a Genkit flow for selecting different LLM modules and benchmarking their performance.
 *
 * - selectLLM - A function that selects an LLM based on the module name and injects user requests.
 * - SelectLLMInput - The input type for the selectLLM function, including the LLM module name and user query.
 * - SelectLLMOutput - The return type for the selectLLM function, including the LLM's response and performance metrics.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelectLLMInputSchema = z.object({
  moduleName: z
    .string()
    .describe('The name of the LLM module to use (e.g., default, advanced).'),
  query: z.string().describe('The user query to send to the LLM.'),
});
export type SelectLLMInput = z.infer<typeof SelectLLMInputSchema>;

const SelectLLMOutputSchema = z.object({
  response: z.string().describe('The response from the selected LLM.'),
  responseTime: z.number().describe('The time taken (in milliseconds) for the LLM to respond.'),
  wordCount: z.number().describe('The number of words in the LLM response.'),
});
export type SelectLLMOutput = z.infer<typeof SelectLLMOutputSchema>;

export async function selectLLM(input: SelectLLMInput): Promise<SelectLLMOutput> {
  return selectLLMFlow(input);
}

const prompt = ai.definePrompt({
  name: 'selectLLMPrompt',
  input: {schema: SelectLLMInputSchema},
  output: {schema: SelectLLMOutputSchema},
  prompt: `You are a chatbot that will respond to the following query: {{{query}}}.\nYour response should be concise and informative.\nModule Name: {{{moduleName}}}`,
});

const selectLLMFlow = ai.defineFlow(
  {
    name: 'selectLLMFlow',
    inputSchema: SelectLLMInputSchema,
    outputSchema: SelectLLMOutputSchema,
  },
  async input => {
    const startTime = Date.now();
    const {output} = await prompt(input);
    const endTime = Date.now();

    const responseTime = endTime - startTime;
    const wordCount = output!.response.split(' ').length;

    return {
      response: output!.response,
      responseTime,
      wordCount,
    };
  }
);
