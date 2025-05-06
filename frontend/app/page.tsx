export const metadata = {
  title: 'つぶやき🫧 | Abyss Chat',
  description: '流れに身をまかせて、心の声をつぶやこう。Abyss Chatは、あなたの思いを深海のように静かに受け止める場所です。',
}

export default function Home() {
  return (
      <div className="min-h-screen bg-blue-500 flex items-center justify-center">
          <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">ようこそ、Abyss Chatへ！</h1>
              <p className="text-lg text-gray-600">
                深海のように静かで安心できる場所で、やすらぎのひとときを。
              </p>
          </div>
      </div>
  );
}
