// app/(admin)/layout.tsx
import type { Metadata } from "next";
import Sidebar from "../components/admin/Sidebar";
import NavbarAdmin from "../components/admin/Navbar";

export const metadata: Metadata = {
  title: "Era Banyu Segara - Admin",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Kiri - Fixed */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar Atas */}
        <NavbarAdmin />

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}