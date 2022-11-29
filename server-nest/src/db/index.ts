import { Pool } from 'pg';
const pool: Pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
connect();

async function connect() {
  try {
    await pool.connect();
    console.log('Connected to database');
  } catch (error) {
    console.log('Could not connect to database');
    console.log(error);
  }
}

export default async function query(text: string, values: any[] = []) {
  try {
    return pool.query(text, values);
  } catch (e) {
    console.error(e);
    return { error: e, rows: [] };
  }
}
