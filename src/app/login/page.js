"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Kita pakai Link biar lebih cepat pindah halamannya

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
      router.push("/dashboard"); 
      router.refresh();
    } else {
      setError("Email atau Password salah!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Login</h1>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            placeholder="admin@google.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold">Password</label>
          <input 
            type="password" 
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition font-bold">
          Masuk
        </button>

        {/* Bagian Link Daftar */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-bold">
            Daftar di sini
          </Link>
        </p>
      </form>
    </div>
  );
}