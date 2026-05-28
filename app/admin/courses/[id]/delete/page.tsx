import DeleteCoursePage from './DeleteCourseClient';
import { getCourseIds } from '@/lib/staticParams';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return getCourseIds();
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  return <DeleteCoursePage id={id} />;
}