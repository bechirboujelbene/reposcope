// Forwards the app's one GraphQL query to GitHub with a server-side token,
// so the deployed site works without exposing a token in the browser bundle.
const ALLOWED_OPERATION = 'UserRepositories'
const MAX_BODY = 8_000

export async function POST(request: Request): Promise<Response> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return Response.json({ message: 'GITHUB_TOKEN is not set' }, { status: 500 })

  const text = await request.text()
  if (text.length > MAX_BODY) return Response.json({ message: 'Request too large' }, { status: 413 })

  let body: { operationName?: string; query?: string; variables?: unknown }
  try {
    body = JSON.parse(text)
  } catch {
    return Response.json({ message: 'Invalid JSON' }, { status: 400 })
  }
  const query = body.query ?? ''
  if (body.operationName !== ALLOWED_OPERATION || !query.trimStart().startsWith('query ')) {
    return Response.json({ message: 'Only the repository query is allowed' }, { status: 400 })
  }

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'reposcope' },
    body: JSON.stringify({ query, variables: body.variables }),
  })
  return new Response(await res.text(), {
    status: res.status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, s-maxage=300' },
  })
}
