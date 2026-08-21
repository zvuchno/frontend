import { authConfig } from '@/config/auth';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession(authConfig);
  return new Response(JSON.stringify(session, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}