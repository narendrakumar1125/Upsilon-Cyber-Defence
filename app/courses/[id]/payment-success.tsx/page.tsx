// File: app/courses/[id]/payment-success/page.tsx
import { Suspense } from 'react';
// import PaymentSuccessPage from './PaymentSuccessPage';
import { getCourseIds } from '@/lib/staticParams';

export async function generateStaticParams() {
  return getCourseIds();
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <PaymentSuccessPage /> */}
    </Suspense>
  );
}