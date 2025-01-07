import { Header } from "@/components/header";
import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/sidebar";



function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen min-h-screen bg-background">
      <Header />
      <div className="flex flex-grow w-full">
        <div className="hidden lg:contents"> 
          <DashboardSidebar />
        </div>
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
