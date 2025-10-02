// Get request
export async function GET() {
  console.log("Server is running");
  return new Response(JSON.stringify({ message: "Server is running" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Add Update request
export async function POST(request) {
  const body = await request.json();
  return new Response(JSON.stringify({ received: body }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Delete request
export async function GET() {
  console.log("Server is running");
  return new Response(JSON.stringify({ message: "Server is running" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
