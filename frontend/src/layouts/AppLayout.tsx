// src/layouts/AppLayout.tsx
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

const AppLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive sidebar
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false); // Close sidebar on mobile by default
      } else {
        setSidebarOpen(true); // Open sidebar on desktop by default
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content + footer wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isMobile
            ? 'ml-0'
            : isSidebarOpen
              ? "lg:ml-64 xl:ml-64"
              : "lg:ml-16 xl:ml-16"
        }`}
      >
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border p-4 text-center text-muted-foreground text-sm">
          <div className="max-w-7xl mx-auto">
            <p>© 2025 BloodCare. All rights reserved.</p>
            <p className="mt-1 text-xs">Saving lives through blood donation</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default AppLayout;
