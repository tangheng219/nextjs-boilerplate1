// app/api/insert/route.js

import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(request) {
  const body = await request.json();
  const { device_id, temperature, humidity } = body;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(
      'INSERT INTO sensor_data (device_id, temperature, humidity, created_at) VALUES ($1, $2, $3, NOW())',
      [device_id, temperature, humidity]
    );
    return NextResponse.json({
      status: 'ok',
      device_id,
      temperature,
      humidity
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
  } finally {
    await client.end();
  }
}
