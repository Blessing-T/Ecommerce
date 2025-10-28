"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const AdminSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname?.startsWith(href);
    return (
      <Link
        href={href}
        className={`w-full block px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
          isActive ? "bg-sky-600 text-white" : "text-slate-200 hover:bg-sky-500/10"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <aside className="w-[260px] min-h-screen bg-sky-700 p-6 flex flex-col">
      <div className="mb-6">
        <h2 className="text-white text-2xl font-semibold">Bitex Admin</h2>
        <p className="text-sky-200 text-sm mt-1">Control panel</p>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink href={'/admin'}>Overview</NavLink>
        <NavLink href={'/admin/categories'}>Categories</NavLink>
        <NavLink href={'/admin/products'}>Products</NavLink>
        <NavLink href={'/admin/brands'}>Brands</NavLink>
        <NavLink href={'/admin/trafficView/1'}>Traffic View</NavLink>
      </nav>

      <div className="mt-auto pt-6 border-t border-sky-600">
        <Link
          href="/"
          className="w-full flex items-center px-4 py-2 mb-3 text-sky-100 hover:bg-sky-500/10 rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          View Store
        </Link>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-white text-sky-700 rounded-lg font-medium hover:bg-slate-100 transition-colors text-left"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
