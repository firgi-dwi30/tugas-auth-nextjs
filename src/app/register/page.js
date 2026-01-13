"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Registrasi Berhasil! Silakan Login.");
      router.push("/login");
    } else {
      alert("Registrasi Gagal!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md w-96 text-black">
        <h1 className="mb-4 text-2xl font-bold text-center">Registrasi User</h1>
        <input type="text" placeholder="Nama" className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setForm({...form, name: e.target.value})} required />
        <input type="email" placeholder="Email" className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setForm({...form, email: e.target.value})} required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setForm({...form, password: e.target.value})} required />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Daftar Sekarang</button>
      </form>
    </div>
  );
}