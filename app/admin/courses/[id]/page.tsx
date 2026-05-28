import CourseEditPage from './CourseEditClient';
import { getCourseIds } from '@/lib/staticParams';

export async function generateStaticParams() {
  return getCourseIds();
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <CourseEditPage id={id} />;
}