import { createSecureRandomString } from '@/shared/utils/crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.YANDEX_CLIENT_ID;

  if (!clientId) {
    return new NextResponse('YANDEX_CLIENT_ID not set', { status: 500 });
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/yandex/callback`;
  const scope = 'login:email';

  const state = createSecureRandomString(32);

  const cookieStore = await cookies();
  cookieStore.set('yandex_oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 300, // 5 минут
  });

  const authUrl = `https://oauth.yandex.ru/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&access_type=offline&prompt=select_account&state=${state}`;

  return NextResponse.redirect(authUrl);
}