// File: app/courses/[id]/enroll/page.tsx
import { Suspense } from 'react';
import CourseEnrollment from './CourseEnrollment';
import { getCourseIds } from '@/lib/staticParams';

export async function generateStaticParams() {
  return getCourseIds();
}

export default function EnrollPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CourseEnrollment />
    </Suspense>
  );
}
