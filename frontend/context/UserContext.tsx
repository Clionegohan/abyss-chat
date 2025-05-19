// frontend/context/UserContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // ✅ 初回マウント時に /me を叩く
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();
        setUser(data.user); // ← サーバー側で { user: { id, name, email } } の形で返してる前提
      } catch (err) {
        console.error("セッション確認中にエラー：", err);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
