import { Redis } from '@upstash/redis'

if (!process.env.REDIS_UPSTASH_URL) { throw new Error('REDIS_UPSTASH_URL is not set'); }
if (!process.env.REDIS_UPSTASH_TOKEN) { throw new Error('REDIS_UPSTASH_TOKEN is not set'); }

export const redis = new Redis({
	url: process.env.REDIS_UPSTASH_URL,
	token: process.env.REDIS_UPSTASH_TOKEN,
});
