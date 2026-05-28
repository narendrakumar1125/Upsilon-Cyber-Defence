// Server Component
import CourseDetail from './CourseDetail';
import { getCourseIds } from '@/lib/staticParams';

export async function generateStaticParams() {
  return getCourseIds();
}

export default function CourseDetailPage() {
  return <CourseDetail />;
}