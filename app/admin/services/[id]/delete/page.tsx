import DeleteServicePage from './DeleteServiceClient';
import { getServiceIds } from '@/lib/staticParams';

export async function generateStaticParams() {
  return getServiceIds();
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <DeleteServicePage id={id} />;
}