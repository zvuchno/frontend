import { createHash, randomBytes } from 'crypto';
import { NextResponse } from 'next/server';

export async function GET() {
  const codeVerifier = randomBytes(32).toString("base64url");
  const codeChallenge = createHash("sha256").update(codeVerifier).digest("base64url");
  const state = randomBytes(32).toString("hex");
  const clientId = process.env.VK_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/vk/callback`;
  const scope = 'email';

  if (!clientId) {
    return new NextResponse('VK_CLIENT_ID', { status: 500 });
  }

  const url = "https://id.vk.com/authorize"
    + "?response_type=code"
    + "&client_id=" + clientId
    + "&redirect_uri=" + encodeURIComponent(redirectUri)
    + "&state=" + state
    + "&code_challenge=" + encodeURIComponent(codeChallenge)
    + "&code_challenge_method=s256"
    + "&scope=" + scope;

  const response = NextResponse.redirect(url);

  response.cookies.set("vk_code_verifier", codeVerifier, { 
    httpOnly: true, 
    secure: true, 
    sameSite: "lax", 
    path: "/", 
    maxAge: 300 
  });

  response.cookies.set("vk_state", state, { 
    httpOnly: true, 
    secure: true, 
    sameSite: "lax", 
    path: "/", 
    maxAge: 300 
  });

  return response;
};