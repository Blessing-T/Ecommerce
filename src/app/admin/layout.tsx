import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import AdminSidebar from "@/domains/admin/components/sideBar";
import { authOptions } from "@/shared/lib/authOptions";

export const metadata: Metadata = {
  title: "Admin",
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex bg-slate-50">
      <AdminSidebar />
      <main className="w-full p-6">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Manage categories, products, brands and traffic</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-slate-600 mr-2">Signed in as</span>
            <div className="inline-block bg-white px-3 py-1 rounded-md shadow-sm text-sm text-slate-800">
              {session?.user?.name ?? session?.user?.email ?? "Admin"}
            </div>
          </div>
        </header>

        <section className="bg-white rounded-lg shadow-sm p-6 border border-slate-100">
          {children}
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
