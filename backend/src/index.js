import Fastify from 'fastify';
import pg from 'pg';
import dotenv from 'dotenv';
import healthRoutes from '../routes/health.js';

dotenv.config();

const fastify = Fastify({ logger: true });

const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'myapp',
});

fastify.decorate('db', pool);

fastify.register(healthRoutes);

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) throw err;
});