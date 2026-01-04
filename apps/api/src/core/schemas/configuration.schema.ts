import { z } from "zod";

import {
  DEFAULT_BASE_URL,
  DEFAULT_PORT,
  DEFAULT_RABBITMQ_URL,
  DEFAULT_REDIS_HOST,
  DEFAULT_REDIS_PORT,
} from "@/core/constants/environment.constant";

const isProduction = process.env.NODE_ENV === "production";

export const validationSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.string().default(DEFAULT_PORT),
  API_PREFIX: z.string().default("api"),
  BASE_URL: z.string().default(DEFAULT_BASE_URL),

  DATABASE_URL: z.string(),

  REDIS_HOST: isProduction
    ? z.string()
    : z.string().default(DEFAULT_REDIS_HOST),
  REDIS_PORT: isProduction
    ? z.string()
    : z.string().default(DEFAULT_REDIS_PORT),

  RABBITMQ_URL: z.string().default(DEFAULT_RABBITMQ_URL),
});

export function validateConfig(config: Record<string, unknown>) {
  try {
    return validationSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // @ts-ignore
      const messages = error.errors.map((err) => {
        const path = err.path.join(".");
        return `${path}: ${err.message}`;
      });
      throw new Error(
        `Configuration validation failed:\n${messages.join("\n")}`,
      );
    }
    throw error;
  }
}
