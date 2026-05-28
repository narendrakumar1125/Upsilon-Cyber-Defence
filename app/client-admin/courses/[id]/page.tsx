import CourseForm from './CourseFormClient';
import { getCourseIds } from '@/lib/staticParams';

export async function generateStaticParams() {
  return getCourseIds();
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <CourseForm id={id} />;
}