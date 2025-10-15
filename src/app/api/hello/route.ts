export async function GET() {
  return Response.json({
    author: "Harish Kumar Babry",
    message: "Welcome to my digital profile",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  })
}