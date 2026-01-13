import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function AdminOnlyPage() {
  const session = await getServerSession(authOptions);

  // LOGIKA FORBIDDEN: Jika sudah login tapi BUKAN admin
  if (session?.user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100 p-6">
        <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-red-100">
          <div className="bg-red-600 p-8 text-center text-white">
            <h1 className="text-7xl font-black mb-2">403</h1>
            <p className="text-xl font-bold tracking-widest uppercase">Forbidden</p>
          </div>
          <div className="p-8 text-center">
            <p className="text-gray-700 font-semibold text-lg mb-2">Akses Ditolak!</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Maaf **{session?.user?.name || "User"}**, akun Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini diproteksi khusus untuk Admin.
            </p>
            <Link href="/dashboard" className="mt-8 inline-block w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold transition shadow-lg">
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Jika dia Admin, tampilkan ini
  return (
    <div className="p-12 text-center text-black">
      <h1 className="text-4xl font-black text-green-600">🔐 HALAMAN RAHASIA ADMIN</h1>
      <p className="mt-4 text-gray-600">Hanya Anda yang bisa melihat ini karena Anda adalah Admin.</p>
    </div>
  );
}