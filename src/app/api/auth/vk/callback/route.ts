import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { encode } from "next-auth/jwt";
import { OAuthorize } from '@/entities/user/server';

interface TTokenData {
  refresh_token: string;
  access_token: string;
  id_token?: string;
  token_type: string;
  expires_in: number;
  user_id: number;
  state?: string;
  scope?: string;
};

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function GET(request: Request) {
  const origin = request.headers.get('origin') || 'https://dev.zvuchno.space';
  const { searchParams } = new URL(request.url);
  const error = searchParams.get('error');
  const deviceId = searchParams.get("device_id");
  const code = searchParams.get('code');
  const returnedState = searchParams.get('state');

  const clientId = process.env.VK_CLIENT_ID;
  const redirectUri = `${BASE_API_URL}/auth/vk/callback`;

  if (error) {
    return NextResponse.redirect(`${origin}/signin?error=oauth_error`);
  }

  if (!code || !returnedState || !deviceId || !clientId) {
    return NextResponse.redirect(`${origin}/signin?error=missing_code_or_state`);
  }

  // Валидация state и code_verifier
  const cookieStore = await cookies();
  const storedState = cookieStore.get('vk_state')?.value;
  const codeVerifier = cookieStore.get("vk_code_verifier")?.value;

  if (storedState !== returnedState || !codeVerifier) {
    console.error('State mismatch. Possible CSRF.');
    cookieStore.delete('vk_state');
    cookieStore.delete('vk_code_verifier');
    return NextResponse.redirect(`${origin}/signin?error=csrf_detected`);
  }

  cookieStore.delete('vk_state');
  cookieStore.delete('vk_code_verifier');

  try {
    // Обмен кода на токен
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

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      console.error('VK token exchange failed:', text);
      return NextResponse.redirect(`${origin}/signin?error=vk_token_exchange_failed`);
    }

    const tokenData: TTokenData = await tokenRes.json();

    // Авторизация на своём бэкенде
    const userFromServer = await OAuthorize({
      token: tokenData.access_token,
      provider: 'vk',
    });

    if (!userFromServer) {
      return NextResponse.redirect(`${origin}/signin?error=no_user_from_server`);
    }

    // Создание сессии NextAuth JWT
    const cookieName = "__Secure-authjs.session-token";
    const token = await encode({
      token: {
        sub: userFromServer.id,
        id: userFromServer.id,
        name: userFromServer.userName,
        picture: null,
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
      //salt: cookieName,
    });

    const response = NextResponse.redirect(`${origin}/`);
    response.cookies.set(cookieName, token, { 
      httpOnly: true, 
      secure: true, 
      sameSite: "lax", 
      path: "/", 
      maxAge: 30 * 24 * 60 * 60 
    });

    return response;

  } catch (error) {
    console.error('Critical error in VK callback:', error);
    return NextResponse.redirect(`${origin}/signin?error=internal_error`);
  }
  
};