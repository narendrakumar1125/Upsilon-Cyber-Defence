'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ServiceFormClient from '../[id]/ServiceFormClient';

function ServiceEditContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 'new';
  
  return <ServiceFormClient id={id} />;
}

export default function ServiceEditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceEditContent />
    </Suspense>
  );
}