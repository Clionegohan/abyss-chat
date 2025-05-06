import '../styles/globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { ReactNode } from 'react'
 
export const metadata = {
  title: 'Abyss Chat',
  description: '海の底でつながる匿名チャット',
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen font-sans">
        <Header />
        <main className="max-w-3xl mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
