// src/ai/flows/ai-service-suggestion.ts
'use server';

/**
 * @fileOverview An AI service suggestion agent that suggests a consulting plan.
 *
 * - suggestConsultingPlan - A function that handles the consulting plan suggestion process.
 * - SuggestConsultingPlanInput - The input type for the suggestConsultingPlan function.
 * - SuggestConsultingPlanOutput - The return type for the suggestConsultingPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestConsultingPlanInputSchema = z.object({
  businessStanding: z
    .string()
    .describe(
      'A description of the potential clients current business standing, stage, and needs.'
    ),
});
export type SuggestConsultingPlanInput = z.infer<typeof SuggestConsultingPlanInputSchema>;

const SuggestConsultingPlanOutputSchema = z.object({
  suggestedPlan: z.string().describe('The suggested consulting plan for the potential client.'),
  justification: z.string().describe('The justification for the suggested plan.'),
  potentialCost: z.string().describe('The potential cost for the suggested plan.'),
  price: z.number().describe('The price of the plan in USD.'),
});
export type SuggestConsultingPlanOutput = z.infer<typeof SuggestConsultingPlanOutputSchema>;

export async function suggestConsultingPlan(input: SuggestConsultingPlanInput): Promise<SuggestConsultingPlanOutput> {
  return suggestConsultingPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestConsultingPlanPrompt',
  input: {schema: SuggestConsultingPlanInputSchema},
  output: {schema: SuggestConsultingPlanOutputSchema},
  prompt: `You are an AI assistant that helps potential clients of Schustereit & Co understand which consulting plan is best for them.

  Based on their business standing, recommend one of the following plans and set the 'price' field accordingly:

  - **Full Brand Identity** - (From $15,000) Perfect for businesses seeking a comprehensive brand overhaul, covering strategy, visual identity, and brand guidelines. Set 'price' to 15000.
  - **AI Integration Strategy** - (From $20,000) Ideal for companies ready to leverage AI for innovation, focusing on identifying AI opportunities, strategy development, and implementation roadmaps. Set 'price' to 20000.
  - **Technology Modernization** - (From $25,000) Suited for businesses needing to update their technology infrastructure, offering assessment, planning, and execution support. Set 'price' to 25000.
  - **Paid Discovery & Roadmapping** - (Fixed $3,000) Designed for businesses unsure of their exact needs, providing an in-depth discovery process and a detailed roadmap to achieve their goals. Set 'price' to 3000.

  Provide a brief justification for why the plan is the best fit, and include the potential cost.

  Business Standing: {{{businessStanding}}}
  `,
});

const suggestConsultingPlanFlow = ai.defineFlow(
  {
    name: 'suggestConsultingPlanFlow',
    inputSchema: SuggestConsultingPlanInputSchema,
    outputSchema: SuggestConsultingPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
