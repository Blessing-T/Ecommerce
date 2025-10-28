"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const AdminSidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  return (
    <aside className="w-[280px] h-auto bg-white p-6 border-r border-gray-300">
      <h2 className="w-full text-gray-600 text-2xl font-light pb-5 mb-2 border-b border-gray-300">Dashboard</h2>
      <Link
        className="w-full block px-4 py-2 text-gray-500 rounded-lg transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200"
        href={"/admin/categories"}
      >
        Categories
      </Link>
      <Link
        className="w-full block px-4 py-2 text-gray-500 rounded-lg transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200"
        href={"/admin/products"}
      >
        Products
      </Link>
      <Link
        className="w-full block px-4 py-2 text-gray-500 rounded-lg transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200"
        href={"/admin/brands"}
      >
        Brands
      </Link>
      <Link
        className="w-full block px-4 py-2 text-gray-500 rounded-lg transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200"
        href={"/admin/trafficView/1"}
      >
        Traffic View
      </Link>
      <div className="mt-auto pt-6 border-t border-gray-300">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-red-600 rounded-lg transition-colors duration-300 hover:bg-red-50 active:bg-red-100 text-left"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
