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
  accessToken: {
    secret: string;
    expiresIn: number;
  };
  refreshToken: {
    secret: string;
    expiresIn: number;
    saltRounds: number;
  };
  password: {
    saltRounds: number;
  };
  userSession: {
    prefix: string;
    ttl: number;
  };
}
