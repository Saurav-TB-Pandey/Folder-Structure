const env = import.meta.env;

const config = {
  API_BASE_URL: env.VITE_API_BASE_URL,
  PORT: env.PORT,
  ENCRYPTION_KEY: env.VITE_ENCRYPTION_KEY,
  ENVIRONMENT: env.VITE_ENVIRONMENT,
  ALLOWED_ENVIRONMENTS: ["development", "staging"],
};

export default config;
