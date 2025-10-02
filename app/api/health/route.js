export async function GET() {
  console.log("Server is 🚀 up and running in good 💖 health.");
  return new Response(
    JSON.stringify({
      message: "Server is 🚀 up and running in good 💖 health.",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
