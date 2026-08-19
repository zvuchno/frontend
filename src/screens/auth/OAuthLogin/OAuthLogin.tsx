'use client';

import { VerifyLoader } from "@/shared/ui";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function OAuthLoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');
    const provider = searchParams.get('provider');

    if (code && provider) {
      signIn('credentials', {
        code,
        provider,
        redirect: false,
        callbackUrl: '/'
      });
    } else {
      router.push('/signin');
    }
  }, [searchParams, router]);

  return <VerifyLoader title="Пожалуйста, подождите" text="Идет обработка входа..."/>;
};

export default OAuthLoginPage;