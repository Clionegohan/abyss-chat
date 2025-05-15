"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function UserPage() {
  const { id: userId } = useParams() as { id: string };
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:4000/users/${userId}`);
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  if (!user) return <p className="text-center mt-10 text-gray-500">読み込み中...</p>;

  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center space-y-4">
        <img
          src={`/avatars/${user.avatarUrl}`}
          alt="avatar"
          className="w-32 h-32 rounded-full mx-auto border-4 border-blue-300"
        />
        <h1 className="text-2xl font-bold text-blue-800">{user.name}</h1>
        <p className="text-gray-600">性別：<span className="font-semibold">{user.gender}</span></p>
        <p className="text-gray-700 italic">「{user.message}」</p>
      </div>
    </div>
  );
}
