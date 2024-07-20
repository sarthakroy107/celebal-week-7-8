import { LucideSearch } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center fixed top-0 border-b border-black/10 px-7 py-3 z-10 bg-white/90">
      <Link href={'/'} className="text-3xl font-medium">Celebal Ecommerce Project</Link>
      <div className="flex gap-x-2 font-medium">
        <Link href="/search" className="rounded-sm hover:bg-slate-200 p-2 transition">
          <LucideSearch />
        </Link>
        <Link href="/cart" className="rounded-sm hover:bg-slate-200 p-2 px-4 transition">
          Cart
        </Link>
        <Link href="/orders" className="rounded-sm hover:bg-slate-200 p-2 px-4 transition">
          Orders
        </Link>
      </div>
    </nav>
  );
}
