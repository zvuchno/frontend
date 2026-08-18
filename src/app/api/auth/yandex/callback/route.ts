import { NextResponse } from 'next/server';
import { signIn } from "next-auth/react";
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const returnedState = searchParams.get('state');

  if (error) {
    return NextResponse.redirect('/signin?error=oauth_error');
  }

  if (!code || !returnedState) {
    return NextResponse.redirect('/signin?error=missing_code_or_state');
  }

  const cookieStore = await cookies();
  const storedState = cookieStore.get('yandex_oauth_state')?.value;

  if (storedState !== returnedState) {
    console.error('State mismatch. Possible CSRF.');
    cookieStore.delete('yandex_oauth_state');
    return NextResponse.redirect('/signin?error=csrf_detected');
  }

  cookieStore.delete('yandex_oauth_state');

  await signIn('credentials', {
    redirect: false,
    provider: 'yandex',
    code: code,
  });
}