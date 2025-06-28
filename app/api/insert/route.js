import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function POST(request) {
  const data = await request.json();
  const { device_id, temperature, humidity } = data;

  try {
    await pool.query(
      'INSERT INTO sensor_data (device_id, temperature, humidity) VALUES ($1, $2, $3)',
      [device_id, temperature, humidity]
    );
    return NextResponse.json({ status: 'ok', ...data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 'error', message: error.message });
  }
}
