import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const isAdmin = session.user.role === "admin";

  return (
    <div className="min-h-screen bg-gray-50 flex text-black">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white hidden md:block font-sans">
        <div className="p-6 text-2xl font-bold border-b border-slate-800">
          Tugas Auth
        </div>
        <nav className="mt-6 p-4 space-y-2">
          <Link href="/dashboard" className="block bg-blue-600 p-2 rounded">Dashboard</Link>
          <div className="p-2 hover:bg-slate-800 rounded cursor-pointer opacity-50">Profile</div>
          
          {/* Link ini hanya muncul untuk Admin, tapi User bisa ngetik manual di URL nanti */}
          {isAdmin && (
            <Link href="/dashboard/admin-only" className="block p-2 bg-yellow-600 hover:bg-yellow-700 rounded mt-4 font-bold text-center">
              🔐 Menu Admin
            </Link>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium tracking-tight">Hi, {session.user.name}</span>
            <a href="/api/auth/signout" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition font-bold">
              Logout
            </a>
          </div>
        </header>

        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Role Status</p>
              <p className={`text-3xl font-black mt-2 ${isAdmin ? 'text-red-600' : 'text-green-600'}`}>
                {session.user.role.toUpperCase()}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Email Terdaftar</p>
              <p className="text-lg text-slate-700 mt-2 font-mono">{session.user.email}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl border border-slate-700">
            <h1 className="text-3xl font-bold mb-3 tracking-tight text-blue-400">Selamat Datang, {session.user.name}! 👋</h1>
            <p className="opacity-80 leading-relaxed max-w-2xl">
              {isAdmin 
                ? "Anda memiliki akses penuh sebagai Administrator. Anda dapat mengelola seluruh sistem dan melihat data rahasia." 
                : "Anda masuk sebagai User. Anda hanya dapat melihat dashboard publik. Akses ke menu Admin dibatasi (Forbidden)."}
            </p>
            
            {/* Tombol Tes Forbidden untuk User */}
            {!isAdmin && (
               <Link href="/dashboard/admin-only" className="mt-6 inline-block bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2 rounded-full font-medium transition">
                 Coba Masuk Menu Admin (Pasti Ditolak)
               </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}