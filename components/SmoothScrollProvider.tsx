'use client';

import { useLenisScroll } from '@/hooks';
import { ReactNode } from 'react';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useLenisScroll(true);

  return <>{children}</>;
}
