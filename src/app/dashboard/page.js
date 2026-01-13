import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const isAdmin = session.user.role === "admin";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Sederhana */}
      <div className="w-64 bg-slate-900 text-white hidden md:block">
        <div className="p-6 text-2xl font-bold border-b border-slate-800">
          Tugas Auth
        </div>
        <nav className="mt-6 p-4 space-y-2">
          <div className="bg-blue-600 p-2 rounded">Dashboard</div>
          <div className="p-2 hover:bg-slate-800 rounded cursor-pointer">Profile</div>
          {isAdmin && <div className="p-2 hover:bg-slate-800 rounded cursor-pointer text-yellow-400">Admin Settings</div>}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Topbar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium">Hi, {session.user.name}</span>
            <a href="/api/auth/signout" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition">
              Logout
            </a>
          </div>
        </header>

        {/* Dashboard Cards */}
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-bold">Role Status</p>
              <p className={`text-2xl font-black mt-2 ${isAdmin ? 'text-red-600' : 'text-green-600'}`}>
                {session.user.role.toUpperCase()}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-bold">User Email</p>
              <p className="text-lg text-slate-700 mt-2 truncate">{session.user.email}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-bold">System Status</p>
              <p className="text-2xl text-blue-600 font-black mt-2">ACTIVE</p>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
            <h1 className="text-3xl font-bold mb-2">Selamat Datang, {session.user.name}! 👋</h1>
            <p className="opacity-90">
              {isAdmin 
                ? "Anda masuk sebagai administrator. Anda memiliki kendali penuh atas manajemen data dan sistem." 
                : "Anda masuk sebagai user biasa. Anda dapat melihat informasi profil dan dashboard standar."}
            </p>
            <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition">
              Mulai Eksplorasi
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}