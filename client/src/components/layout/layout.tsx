import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "../ui/toaster";
import AppSidebar from "../app-sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="max-w-full relative overflow-hidden">
        <SidebarTrigger className="absolute top-2 z-[50] md:z-[100]" />
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
