export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Kamu bisa taruh Sidebar di sini nantinya */}
      <section className="flex-1">
        {children}
      </section>
    </div>
  );
}