import { deleteOAuthState, getOAuthState, OAuthorize } from '@/entities/user/server';
import { encode } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { state, consents } = await request.json();

  const entry = getOAuthState(state);
  if (!entry) {
    return NextResponse.json(
      { error: 'Сессия истекла или неверна' },
      { status: 400 },
    );
  }

  // используем accessToken провайдера из временного хранилища
  const result = await OAuthorize({
    provider: entry.provider,
    token: entry.accessToken,
    create_account: true,
    consents,
  });

  deleteOAuthState(state); // сразу удаляем наш временный state после использования

  if (result.status !== "ok") {
    return NextResponse.json(
      { error: 'Не удалось зарегистрировать пользователя' },
      { status: 401 },
    );
  }

  const userFromServer = result.user;

  // Создание сессии NextAuth JWT
  const cookieName = "__Secure-next-auth.session-token";
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
    maxAge: 30 * 24 * 60 * 60 
  });

  const response = NextResponse.redirect(`${origin}/`);
  response.cookies.set(cookieName, token, { 
    httpOnly: true, 
    secure: true, 
    sameSite: "lax", 
    path: "/",
  });

  return response;

}