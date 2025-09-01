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
});
export type SuggestConsultingPlanOutput = z.infer<typeof SuggestConsultingPlanOutputSchema>;

export async function suggestConsultingPlan(input: SuggestConsultingPlanInput): Promise<SuggestConsultingPlanOutput> {
  return suggestConsultingPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestConsultingPlanPrompt',
  input: {schema: SuggestConsultingPlanInputSchema},
  output: {schema: SuggestConsultingPlanOutputSchema},
  prompt: `You are an AI assistant that helps potential clients of Bonesy Design Consultancy understand which consulting plan is best for them.

  Based on their business standing, recommend one of the following plans:

  - **Full Brand Identity** - Perfect for businesses seeking a comprehensive brand overhaul, covering strategy, visual identity, and brand guidelines.
  - **AI Integration Strategy** - Ideal for companies ready to leverage AI for innovation, focusing on identifying AI opportunities, strategy development, and implementation roadmaps.
  - **Technology Modernization** - Suited for businesses needing to update their technology infrastructure, offering assessment, planning, and execution support.
  - **Paid Discovery & Roadmapping** - Designed for businesses unsure of their exact needs, providing an in-depth discovery process and a detailed roadmap to achieve their goals.

  Provide a brief justification for why the plan is the best fit.

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
