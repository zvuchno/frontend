import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { encode } from "next-auth/jwt";
import { OAuthorize } from '@/entities/user/server';

interface TTokenData {
  refresh_token: string;
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
  user_id: number;
  state: number;
  scope: number;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get('error');
  const deviceId = searchParams.get("device_id");
  const code = searchParams.get('code');
  const returnedState = searchParams.get('state');

  const clientId = process.env.VK_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/vk/callback`;

  if (error) {
    return NextResponse.redirect('/signin?error=oauth_error');
  }

  if (!code || !returnedState || !deviceId || !clientId) {
    return NextResponse.redirect('/signin?error=missing_code_or_state');
  }

  // Validate state
  const cookieStore = await cookies();
  const storedState = cookieStore.get('vk_state')?.value;
  const codeVerifier = cookieStore.get("vk_code_verifier")?.value;

  if (storedState !== returnedState || !codeVerifier) {
    console.error('State mismatch. Possible CSRF.');
    cookieStore.delete('vk_state');
    cookieStore.delete('vk_code_verifier');
    return NextResponse.redirect('/signin?error=csrf_detected');
  }

  cookieStore.delete('vk_state');
  cookieStore.delete('vk_code_verifier');

  // Token exchange
  const tokenRes = await fetch("https://id.vk.com/oauth2/auth", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      code_verifier: codeVerifier,
      device_id: deviceId,
      client_id: clientId,
      redirect_uri: redirectUri,
      state: returnedState
    }),
  });

  const tokenData: TTokenData = await tokenRes.json();

  const userFromServer = await OAuthorize({
    token: tokenData.access_token,
    provider: 'vk',
  });

  if (!userFromServer) {
    return NextResponse.redirect('/signin?error=not_user_from_server');
  }

  // Create next-auth session JWT
  const cookieName = "__Secure-authjs.session-token";
  const token = await encode({
    token: {
      sub: userFromServer.id,
      id: userFromServer.id,
      userName: userFromServer.userName,
      email: userFromServer.email,
      phone: userFromServer?.phone,
      isPhoneVerified: userFromServer.isPhoneVerified,
      isEmailVerified: userFromServer.isEmailVerified,
      isArtist: userFromServer.isArtist,
      isListener: userFromServer.isListener,
      profileType: userFromServer.profileType,
      artistName: userFromServer.artistName,
    },
    secret: process.env.NEXTAUTH_SECRET!,
    salt: cookieName,
  });

  const response = NextResponse.redirect("/");
  response.cookies.set(cookieName, token, { 
    httpOnly: true, 
    secure: true, 
    sameSite: "lax", 
    path: "/", 
    maxAge: 30 * 24 * 60 * 60 
  });

  return response;
};