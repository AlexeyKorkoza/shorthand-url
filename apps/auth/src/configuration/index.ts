import {
  DEFAULT_API_PREFIX,
  DEFAULT_BASE_URL,
  DEFAULT_DATABASE_URL,
  DEFAULT_PASSWORD_SALT,
  DEFAULT_PORT,
  DEFAULT_RABBITMQ_URL,
  DEFAULT_REDIS_HOST,
  DEFAULT_REDIS_PORT,
} from '@/core/constants/environment.constant';
import { type AppConfig } from '@/core/interfaces';

export default (): AppConfig => ({
  port: parseInt(process.env.PORT || DEFAULT_PORT, 10),
  baseUrl: process.env.BASE_URL || DEFAULT_BASE_URL,
  databaseUrl: process.env.DATABASE_URL || DEFAULT_DATABASE_URL,
  apiPrefix: process.env.API_PREFIX || DEFAULT_API_PREFIX,
  redis: {
    host: process.env.REDIS_HOST || DEFAULT_REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || DEFAULT_REDIS_PORT, 10),
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || DEFAULT_RABBITMQ_URL,
  },
  password: {
    salt: parseInt(process.env.PASSWORD_SALT || DEFAULT_PASSWORD_SALT, 10),
  },
});
