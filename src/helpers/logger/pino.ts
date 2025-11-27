import pino from 'pino';
import { configDotenv } from 'dotenv';

configDotenv();

const isEnabled = process.env.LOG_ENABLED === 'true';
const level = process.env.LOG_LEVEL || 'info';

export const logger = pino({
  enabled: isEnabled,
  level: level,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
