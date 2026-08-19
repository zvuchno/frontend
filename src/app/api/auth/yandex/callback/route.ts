import { NextResponse } from 'next/server';
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

  const params = new URLSearchParams({
    code,
    provider: 'yandex',
  });

  return NextResponse.redirect(`http://localhost:3000/oauth?${params.toString()}`);

  // try {
  //   const response = await fetch('http://localhost:3000/api/auth/signin/credentials', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: new URLSearchParams({
  //       provider: 'yandex',
  //       code: code,
  //     }),
  //   });

  //   console.log('response:', response)

  //   if (!response.ok) {
      
  //     throw new Error('Invalid credentials')
  //   }

  //   return NextResponse.json({ ok: true });
  // } catch (e) {
  //   console.log(e instanceof Error ? e.message : 'Ошибка в колбэке');
  //   //return NextResponse.redirect('http://localhost:3000/signin?error=backend_error');
  //   return new NextResponse(
  //     JSON.stringify({ error: e instanceof Error ? e.message : String(e) }),
  //     { status: 500, headers: { 'Content-Type': 'application/json' } }
  //   );
  // }

  // await signIn('credentials', {
  //   redirect: false,
  //   provider: 'yandex',
  //   code: code,
  // });
}