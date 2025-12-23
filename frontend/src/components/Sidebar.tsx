// src/components/Sidebar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiHome,
  FiBarChart2,
  FiClipboard,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import NotificationBell from "./NotificationBell";
import { useEffect, useState } from "react";
import { TestTube, Pill, Video, MapPin, Heart } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isPhone?: boolean;
}

const Sidebar = ({ isOpen, toggleSidebar, isPhone = false }: SidebarProps) => {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [pharmacyOpen, setPharmacyOpen] = useState(false);

  /* ✅ Close dropdown when sidebar collapses */
  useEffect(() => {
    if (!isOpen) setPharmacyOpen(false);
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.aside
      animate={{
        width: isOpen ? (isPhone ? 280 : 256) : isPhone ? 0 : 64,
        x: isPhone && !isOpen ? -280 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 z-50 h-screen bg-card border-r border-border shadow-lg flex flex-col overflow-hidden ${
        isPhone ? "max-w-[90vw]" : "w-auto"
      }`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between ${isPhone ? "p-6" : "p-4"}`}>
        {isOpen && (
          <div className="flex items-center space-x-2">
            <FiHeart className="w-6 h-6 text-primary animate-pulse-soft" />
            <span className="text-xl font-bold text-red-600">BloodCare</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-accent rounded-md"
          aria-label="Toggle sidebar"
        >
          <FiMenu className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto space-y-2 px-3 pb-4">
        {/* Home */}
        <Link
          to="/"
          className={`flex items-center rounded-md px-3 py-2 font-medium transition-colors ${
            isActive("/") ? "bg-red-100 text-red-600" : "hover:bg-accent"
          }`}
        >
          <FiHome className="w-5 h-5" />
          {isOpen && <span className="ml-3">Home</span>}
        </Link>

        {/* Dashboard */}
        {isAuthenticated && role !== "DOCTOR" && (
          <Link
            to="/dashboard"
            className={`flex items-center rounded-md px-3 py-2 font-medium transition-colors ${
              isActive("/dashboard") ? "bg-red-100 text-red-600" : "hover:bg-accent"
            }`}
          >
            <Heart className="w-5 h-5 text-red-500" />
            {isOpen && <span className="ml-3">Dashboard</span>}
          </Link>
        )}

        {/* Requests */}
        <Link
          to="/requests"
          className={`flex items-center rounded-md px-3 py-2 font-medium transition-colors ${
            isActive("/requests") ? "bg-red-100 text-red-600" : "hover:bg-accent"
          }`}
        >
          <FiClipboard className="w-5 h-5" />
          {isOpen && <span className="ml-3">Blood Requests</span>}
        </Link>

        {/* Statistics */}
        <Link
          to="/statistics"
          className={`flex items-center rounded-md px-3 py-2 font-medium transition-colors ${
            isActive("/statistics") ? "bg-red-100 text-red-600" : "hover:bg-accent"
          }`}
        >
          <FiBarChart2 className="w-5 h-5" />
          {isOpen && <span className="ml-3">Statistics</span>}
        </Link>

        {/* Lab */}
        <Link
          to="/lab-tests"
          className={`flex items-center rounded-md px-3 py-2 font-medium transition-colors ${
            isActive("/lab-tests") ? "bg-purple-100 text-purple-600" : "hover:bg-accent"
          }`}
        >
          <TestTube className="w-5 h-5 text-purple-500" />
          {isOpen && <span className="ml-3">Lab Tests</span>}
        </Link>

        {/* Video */}
        <Link
          to="/video-consultation"
          className={`flex items-center rounded-md px-3 py-2 font-medium transition-colors ${
            isActive("/video-consultation") ? "bg-blue-100 text-blue-600" : "hover:bg-accent"
          }`}
        >
          <Video className="w-5 h-5 text-blue-500" />
          {isOpen && <span className="ml-3">Video Consultation</span>}
        </Link>

        {/* Reminders */}
        <Link
          to="/reminders"
          className={`flex items-center rounded-md px-3 py-2 font-medium transition-colors ${
            isActive("/reminders") ? "bg-green-100 text-green-600" : "hover:bg-accent"
          }`}
        >
          <Pill className="w-5 h-5 text-green-500" />
          {isOpen && <span className="ml-3">Medicine Reminders</span>}
        </Link>

        {/* Donor Map */}
        <Link
          to="/donor-map"
          className={`flex items-center rounded-md px-3 py-2 font-medium transition-colors ${
            isActive("/donor-map") ? "bg-blue-100 text-blue-600" : "hover:bg-accent"
          }`}
        >
          <MapPin className="w-5 h-5 text-blue-500" />
          {isOpen && <span className="ml-3">Donor Map</span>}
        </Link>

        {/* Emergency */}
        <Button
          onClick={() => navigate("/emergency")}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <FiHeart className="w-5 h-5 mr-2" />
          {isOpen && "Emergency SOS"}
        </Button>
      </nav>

      {/* Auth Section */}
      <div className="border-t border-border p-4">
        {isAuthenticated ? (
          <Button variant="outline" onClick={handleLogout} className="w-full">
            <FiLogOut className="w-4 h-4 mr-2" />
            {isOpen && "Logout"}
          </Button>
        ) : (
          <>
            <Link to="/login">
              <Button className="w-full mb-2">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="w-full">Register</Button>
            </Link>
          </>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
