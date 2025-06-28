export async function POST(req) {
  const body = await req.json();
  const { device_id, temperature, humidity } = body;

  return new Response(
    JSON.stringify({
      status: 'ok',
      device_id,
      temperature,
      humidity
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

