import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthWrapper>
      <div className="flex min-h-screen bg-dark">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-y-auto ml-0 md:ml-64">
          {children}
        </main>
      </div>
    </AdminAuthWrapper>
  );
}