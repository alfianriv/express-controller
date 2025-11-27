import { logger } from '@/helpers/logger/pino';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'postgres',
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
  logging: (sql, timing) =>
    logger.info([sql, timing ? `[ Elapsed time: ${timing}ms ]` : ''].join(' ')),
});
