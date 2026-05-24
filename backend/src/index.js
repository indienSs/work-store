import Fastify from 'fastify';
import cors from '@fastify/cors';
import pg from 'pg';
import dotenv from 'dotenv';
import journalRoutes from '../routes/journal.js';
import employeesRoutes from '../routes/employees.js';
import measureUnitsRoutes from '../routes/measureUnits.js';
import jobsRoutes from '../routes/jobs.js';

dotenv.config();

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: true,
  credentials: true,
});

const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'myapp',
});

fastify.decorate('db', pool);

fastify.register(journalRoutes);
fastify.register(employeesRoutes);
fastify.register(measureUnitsRoutes);
fastify.register(jobsRoutes);

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => { if (err) throw err; });