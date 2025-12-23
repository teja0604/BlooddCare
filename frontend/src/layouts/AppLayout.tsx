// src/layouts/AppLayout.tsx
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const AppLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const phone = width < 640;

      setIsMobile(mobile);
      setIsPhone(phone);
      setSidebarOpen(!mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <div className="min-h-screen flex bg-background relative">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        isPhone={isPhone}
      />

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <motion.div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? "" : isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <main className={`flex-1 ${isPhone ? "p-3" : "p-4 sm:p-6 lg:p-8"}`}>
          <Outlet />
        </main>

        {/* ✅ SINGLE FOOTER */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default AppLayout;
