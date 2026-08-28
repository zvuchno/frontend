'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function useDebouncedPush(delay: number) {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedPush = (href: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      router.push(href);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return debouncedPush;
};