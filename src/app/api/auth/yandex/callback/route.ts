import { NextResponse } from 'next/server';
import { signIn } from "next-auth/react";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    console.error('OAuth Yandex:', error);
    return NextResponse.redirect('/signin?error=oauth_error');
  }

  console.log('code:', code)

  await signIn('credentials', {
    redirect: false,
    provider: 'yandex',
    code: code,
  });
}