"use client";

import { useState } from "react";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [gender, setGender] = useState("その他");
  const [avatar, setAvatar] = useState("sea-angel.png");
  const [message, setMessage] = useState("初めまして！仲良くしましょう🫧");

  const [errors, setErrors] = useState<string[]>([]);

  const avatarOptions = [
    "barreleye-fish.png",
    "bottlenose-dolphin.png",
    "coelacanth.png",
    "dumbo-octopus.png",
    "goblin-shark.png",
    "horseshoe-crab.png",
    "humpback-whale.png",
    "leafy-seadragon.png",
    "nautilus.png",
    "Orca.png",
    "reef-manta-ray.png",
    "sawshark.png",
    "sea-angel.png",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (password !== passwordConfirm) {
      setErrors(["パスワードと確認用パスワードが一致しません。"]);
      return;
    }

    try {
      const data = {
        name,
        email,
        password,
        gender,
        avatarUrl: avatar,
        message,
      };
      console.log("送信するデータ：", data);

      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("エラーが発生しました：", err);

        if (Array.isArray(err.details)) {
          setErrors(err.details);
      } else {
        setErrors([err.error || "登録に失敗しました。"]);
      }
      return;
    }
      const user = await res.json();
      console.log("登録成功！", user);
      window.location.href = `/users/${user.id}`;
    } catch (error) {
      setErrors(["登録中にエラーが発生しました。"]);
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">ユーザー登録</h1>
  
        {/* エラー表示 */}
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded space-y-1">
            {errors.map((e, i) => (
              <p key={i}>⚠️ {e}</p>
            ))}
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 名前 */}
          <div>
            <label className="block font-semibold">名前</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
  
          {/* メールアドレス */}
          <div>
            <label className="block font-semibold">メールアドレス</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          {/* パスワード */}
          <div>
            <label className="block font-semibold">パスワード</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          {/* パスワード確認 */}
          <div>
            <label className="block font-semibold">パスワード（確認）</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
  
          {/* 性別 */}
          <div>
            <label className="block font-semibold">性別</label>
            <div className="flex gap-4 mt-1">
              {["男", "女", "その他"].map((g) => (
                <label key={g} className="flex items-center gap-1">
                  <input
                    type="radio"
                    value={g}
                    checked={gender === g}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
  
          {/* アバター選択 */}
          <div>
            <label className="block font-semibold">アバター選択</label>
            <div className="flex gap-4 flex-wrap">
              {avatarOptions.map((img) => (
                <img
                  key={img}
                  src={`/avatars/${img}`}
                  alt={img}
                  className={`w-20 h-20 rounded-full border-4 cursor-pointer ${
                    avatar === img ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setAvatar(img)}
                />
              ))}
            </div>
          </div>
  
          {/* メッセージ */}
          <div>
            <label className="block font-semibold">ひとことメッセージ</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
  
          {/* 送信ボタン */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            登録
          </button>
        </form>
      </div>
    </div>
  );
}
