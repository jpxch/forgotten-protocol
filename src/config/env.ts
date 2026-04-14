import { z } from 'zod';

const envSchema = z.object({
  PRIVATE_KEY: z.string().min(1),

  RPC_URL_ETHEREUM_PRIMARY: z.string().url(),
  RPC_URL_ETHEREUM_FALLBACK: z.string().url(),
  RPC_URL_ARBITRUM_PRIMARY: z.string().url(),
  RPC_URL_ARBITRUM_FALLBACK: z.string().url(),
  RPC_URL_OPTIMISM_PRIMARY: z.string().url(),
  RPC_URL_OPTIMISM_FALLBACK: z.string().url(),
  RPC_URL_BASE_PRIMARY: z.string().url(),
  RPC_URL_BASE_FALLBACK: z.string().url(),
  RPC_URL_POLYGON_PRIMARY: z.string().url(),
  RPC_URL_POLYGON_FALLBACK: z.string().url(),
  OPENAI_API_KEY: z.string().min(1).optional(),
  OPENAI_REVIEW_MODEL: z.string().min(1).default('gpt-5'),
});

export const env = envSchema.parse(process.env);
