"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err?.error || "ログインに失敗しました。");
        return;
      }

      const data = await res.json();
      setUser(data.user); // Context にユーザー情報を保存
      router.push(`/users/${data.user.id}`);
    } catch (err) {
      setError("通信エラーが発生しました。");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">ログイン</h1>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">メールアドレス</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">パスワード</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
