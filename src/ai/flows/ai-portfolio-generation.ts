// src/ai/flows/ai-portfolio-generation.ts
'use server';
/**
 * @fileOverview An AI agent that generates content for portfolio project pages.
 *
 * - generateProjectContent - A function that creates content for a project case study.
 * - GenerateProjectContentInput - The input type for the generateProjectContent function.
 * - GenerateProjectContentOutput - The return type for the generateProjectContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectContentInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('A brief description of the project.'),
});
export type GenerateProjectContentInput = z.infer<typeof GenerateProjectContentInputSchema>;

const GenerateProjectContentOutputSchema = z.object({
  projectGoal: z
    .string()
    .describe(
      "A detailed paragraph describing the project's main goal and the problem it aimed to solve."
    ),
  ourSolution: z
    .string()
    .describe(
      'A detailed paragraph explaining the solution our studio provided, our process, and the value delivered.'
    ),
  technologies: z
    .string()
    .describe(
      'A comma-separated list of the key technologies, frameworks, and tools used in the project (e.g., Next.js, TypeScript, Stripe, Genkit).'
    ),
});
export type GenerateProjectContentOutput = z.infer<typeof GenerateProjectContentOutputSchema>;

export async function generateProjectContent(
  input: GenerateProjectContentInput
): Promise<GenerateProjectContentOutput> {
  return generateProjectContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectContentPrompt',
  input: {schema: GenerateProjectContentInputSchema},
  output: {schema: GenerateProjectContentOutputSchema},
  prompt: `You are an expert project manager and copywriter for a high-end design and technology consultancy, Schustereit & Co.

  Your task is to generate compelling case study content for a portfolio project. Based on the project title and description, you will write:
  1.  **Project Goal:** A paragraph that clearly articulates the primary objective of the project. What was the client trying to achieve? What problem were we solving for them?
  2.  **Our Solution:** A paragraph detailing the solution we implemented. Describe the strategic approach, the creative process, and how the final product addressed the project's goal.
  3.  **Technologies:** A simple, comma-separated list of the main technologies and platforms used to build the project.

  Keep the tone professional, confident, and aligned with a premium brand.

  Project Title: {{{title}}}
  Project Description: {{{description}}}
  `,
});

const generateProjectContentFlow = ai.defineFlow(
  {
    name: 'generateProjectContentFlow',
    inputSchema: GenerateProjectContentInputSchema,
    outputSchema: GenerateProjectContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
