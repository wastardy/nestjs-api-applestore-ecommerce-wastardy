import { registerAs } from '@nestjs/config';
import { z as zod } from 'zod';

const envSchema = zod.object({
  HOST: zod.string().default('localhost'),
  PORT: zod.coerce.number().optional().default(3000),

  BASE_URL: zod.string().optional().default('http://localhost:3000'),

  DB_PORT: zod
    .preprocess((val) => Number(val), zod.number().optional())
    .default(5432),
  DB_HOST: zod.string().default('localhost'),
  DB_USER: zod.string().default('postgres'),
  DB_PASSWORD: zod.string().default('postgres'),
  DB_NAME: zod.string().default('sasscribtion'),

  DATABASE_URL: zod.string().optional(),

  JWT_SECRET_KEY: zod.string().default('iST@P_O7{00x3_!tZZsJy'),
  JWT_EXPIRES_IN: zod.string().default('1h'),
});

const parseEnv = envSchema.parse(process.env);

export default registerAs('env', () => parseEnv);
