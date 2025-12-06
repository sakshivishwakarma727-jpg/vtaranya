export async function GET(req) {
  return Response.json({
    cookies: req.cookies.getAll()
  });
}
