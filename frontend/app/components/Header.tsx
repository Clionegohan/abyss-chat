import Link from 'next/link'

export default function Header() {
    return (
        <header className="p-4 border-b shadow">
            <nav className="flex gap-6">
                <Link href="/">Home　</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    )
}
