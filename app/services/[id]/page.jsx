// Server Component
import ServiceDetail from './ServiceDetail';
import { getServiceIds } from '@/lib/staticParams';

export async function generateStaticParams() {
  const serviceIds = await getServiceIds();
  return serviceIds;
}

export default function ServiceDetailPage() {
  return <ServiceDetail />;
}