import pg from 'pg';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'myapp',
});

async function runMigrations() {
  const client = await pool.connect();
  try {
    // Создаем таблицу для отслеживания миграций
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Получаем список выполненных миграций
    const { rows: executed } = await client.query('SELECT name FROM migrations');
    const executedNames = executed.map(row => row.name);

    // Список всех миграций в порядке выполнения
    const migrationFiles = [
      '001_init.sql',
      '002_seed_data.sql'  // Добавляем миграцию с тестовыми данными
    ];

    for (const file of migrationFiles) {
      if (executedNames.includes(file)) {
        console.log(`Skipping ${file} - already executed`);
        continue;
      }

      console.log(`Running migration: ${file}`);
      const sql = readFileSync(join(__dirname, '../migrations', file), 'utf8');
      
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
      await client.query('COMMIT');
      
      console.log(`Migration ${file} completed`);
    }

    console.log('All migrations executed successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();