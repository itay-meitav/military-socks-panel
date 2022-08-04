import { Pool } from 'pg';
const pool = new Pool(
    {
        connectionString:
            process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    },
);
connect();

async function connect() {
    try {
        await pool.connect();
        console.log("Connected to database");
    } catch (error) {
        console.log("Could not connect to database");
    }
}


