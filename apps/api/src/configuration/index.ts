export default () => ({
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
  },
  apiPrefix: process.env.API_PREFIX || 'api',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
});
