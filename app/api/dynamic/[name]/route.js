// Dynamic route with GET Request
// app/api/users/[name]/route.js

export async function GET(request, { params }) {
  const { name } = params; // <-- Get the dynamic route param

  return Response.json({
    message: `Hello, ${name}!`,
  });
}

// Dynamic route with POST Request
// app/api/users/[name]/route.js

export async function POST(request, { params }) {
  const { name } = params;
  const body = await request.json();

  return Response.json({
    name,
    data: body,
  });
}
