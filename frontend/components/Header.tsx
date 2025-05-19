"use client";

import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false); // ← 追加

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        router.push("/");
      } else {
        console.error("ログアウトに失敗しました");
      }
    } catch (err) {
      console.error("通信エラー:", err);
    }
  };

  return (
    <header className="p-4 border-b shadow">
      <nav className="flex justify-between items-center max-w-3xl mx-auto">
        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/posts">つぶやき</Link>
          <Link href="/chats">チャット</Link>
          {/* ✅ user を使う部分はクライアントでマウント後に限定 */}
          {hasMounted && (
            <Link href={user ? `/users/${user.id}` : "/login"}>設定</Link>
          )}
        </div>
        <div>
          {user ? (
            <>
              <span className="mr-4">{user.name} さん</span>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                ログアウト
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              ログイン
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
