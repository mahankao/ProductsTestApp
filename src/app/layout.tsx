import "./globals.css";
import Link from "next/link";
import "./globals.css";




export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="bg-gray-50 text-gray-900 min-h-screen">
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <nav className="max-w-5xl mx-auto flex items-center justify-between p-6">
                <h1 className="text-xl font-semibold px-4"> My Products</h1>
                <div className="flex gap-4">
                    <Link href="/products" className="hover:text-blue-500 transition px-4">
                        Products
                    </Link>
                    <Link href="/create-product" className="hover:text-blue-500 transition px-4">
                        Create Product
                    </Link>
                </div>
            </nav>
        </header>

        <main className="max-w-5xl mx-auto p-4">{children}</main>
        </body>
        </html>
    );
}
