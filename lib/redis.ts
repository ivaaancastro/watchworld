import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

// Cache TTLs in seconds
export const CACHE_TTL = {
  watches: 60 * 60,       // 1 hour
  brands: 60 * 60 * 24,   // 24 hours
  priceHistory: 60 * 30,  // 30 minutes
  search: 60 * 5,         // 5 minutes
} as const;
