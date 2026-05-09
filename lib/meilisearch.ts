import { Meilisearch } from "meilisearch";

export const searchClient = new Meilisearch({
  host: process.env.MEILISEARCH_HOST ?? "http://localhost:7700",
  apiKey: process.env.MEILISEARCH_API_KEY,
});

export const WATCH_INDEX = "watches";
export const BRAND_INDEX = "brands";
