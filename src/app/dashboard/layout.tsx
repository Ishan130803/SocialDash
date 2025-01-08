import { Header } from "@/components/header";
import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/sidebar";



function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-screen h-screen min-h-screen bg-background">
      <Header />
      <div className="flex flex-grow min-w-0">
        <div className="hidden lg:contents"> 
          <DashboardSidebar />
        </div>
        <main className="h-full min-w-0 grow">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
