'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseFormClient from '../[id]/CourseFormClient';

function CourseEditContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 'new';
  
  return <CourseFormClient id={id} />;
}

export default function CourseEditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CourseEditContent />
    </Suspense>
  );
}