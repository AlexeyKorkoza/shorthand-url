export interface AppConfig {
  port: number;
  databaseUrl: string;
  apiPrefix: string;
  baseUrl: string;
  redis: {
    host: string;
    port: number;
  };
  rabbitmq: {
    url: string;
  };
}
