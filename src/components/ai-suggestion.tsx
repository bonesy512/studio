'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { suggestConsultingPlan, type SuggestConsultingPlanOutput } from '@/ai/flows/ai-service-suggestion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { createDiscoverySession } from '@/app/actions/checkout';

const formSchema = z.object({
  businessStanding: z.string().min(50, {
    message: 'Please provide at least 50 characters to get a good suggestion.',
  }),
});

export default function AISuggestion() {
  const [suggestion, setSuggestion] = useState<SuggestConsultingPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessStanding: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestConsultingPlan(values);
      setSuggestion(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get a suggestion. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tighter">Not Sure Where to Start?</h2>
      <p className="text-muted-foreground">
        Describe your current business standing, stage, and needs, and let our AI assistant suggest the best plan for you.
      </p>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="businessStanding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Business Situation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., We are an early-stage SaaS startup with a working prototype but need to define our brand and go-to-market strategy..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Get Suggestion
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="flex items-center justify-center pt-6">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="ml-2">Analyzing your needs...</p>
        </div>
      )}

      {suggestion && (
        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle>Our Recommendation: {suggestion.suggestedPlan}</CardTitle>
            <CardDescription>Based on your description, here's what we suggest. <br />
            <span className="font-semibold !text-primary-foreground">Potential Cost: {suggestion.potentialCost}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{suggestion.justification}</p>
          </CardContent>
          <CardFooter>
            {suggestion.price ? (
              <form action={createDiscoverySession} className="w-full">
                <Button type="submit" className="w-full">Proceed to Checkout</Button>
              </form>
            ) : (
               <Button asChild className="w-full">
                  <Link href="/book">
                    Book a Consultation
                  </Link>
                </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </section>
  );
}
