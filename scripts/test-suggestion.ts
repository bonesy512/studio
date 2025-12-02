import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), 'env.local') });

import { suggestConsultingPlan } from '@/ai/flows/ai-service-suggestion';

async function main() {
    console.log('Testing suggestConsultingPlan...');
    try {
        const input = {
            businessStanding: 'We are a small coffee shop looking to expand our online presence and maybe sell merchandise. We have a logo but no website.',
        };
        console.log('Input:', input);
        const result = await suggestConsultingPlan(input);
        console.log('Result:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
