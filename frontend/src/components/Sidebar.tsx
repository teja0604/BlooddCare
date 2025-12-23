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
import { useState } from "react";
import { TestTube, Pill, Video, MapPin, Heart } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [pharmacyOpen, setPharmacyOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const NavigateEmergency = () => (
    <Button
      className="bg-red-600 hover:bg-red-700 text-white w-full mt-4 flex items-center justify-center"
      onClick={() => navigate("/emergency")}
    >
      <FiHeart className="h-5 w-5 mr-2" />
      {isOpen && <span>Emergency SOS</span>}
    </Button>
  );

  return (
    <motion.aside
      animate={{ width: isOpen ? 256 : 64 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-card border-r border-border shadow-lg flex flex-col justify-between fixed top-0 left-0 z-50 transition-all"
    >
      {/* Top Section - Logo + Toggle */}
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <span className="flex items-center space-x-2">
            <FiHeart className="w-8 h-8 text-primary animate-pulse-soft" />
            <span className="text-2xl font-bold text-red-600">BloodCare</span>
          </span>
        )}
        <button onClick={toggleSidebar}>
          <FiMenu className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 space-y-2 px-3">
        {/* Home */}
        <Link
          to="/"
          className={`flex items-center px-3 py-2 rounded-md font-medium ${
            isActive("/")
              ? "bg-red-100 text-red-600 font-bold"
              : "hover:bg-accent"
          }`}
        >
          <FiHome className="h-5 w-5 mr-2" />
          {isOpen && <span>Home</span>}
        </Link>

        {/* Dashboard - Normal Users */}
        {isAuthenticated && role !== "DOCTOR" && (
          <Link
            to="/dashboard"
            className={`flex items-center px-3 py-2 rounded-md font-medium ${
              isActive("/dashboard")
                ? "bg-red-100 text-red-600 font-bold"
                : "hover:bg-accent"
            }`}
          >
            <Heart className="h-5 w-5 mr-2 text-red-500" />
            {isOpen && <span>Dashboard</span>}
          </Link>
        )}

        {/* Doctor Links */}
        {isAuthenticated && role === "DOCTOR" && (
          <>
            <Link
              to="/doctor/dashboard"
              className={`flex items-center px-3 py-2 rounded-md font-medium ${
                isActive("/doctor/dashboard")
                  ? "bg-red-100 text-red-600 font-bold"
                  : "hover:bg-accent"
              }`}
            >
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              {isOpen && <span>Doctor Dashboard</span>}
            </Link>

            <Link
              to="/enroll"
              className={`flex items-center px-3 py-2 rounded-md font-medium ${
                isActive("/enroll")
                  ? "bg-green-100 text-green-600 font-bold"
                  : "hover:bg-accent"
              }`}
            >
              <FiUser className="h-5 w-5 mr-2" />
              {isOpen && <span>Patient Enrollment</span>}
            </Link>

            <Link
              to="/scan"
              className={`flex items-center px-3 py-2 rounded-md font-medium ${
                isActive("/scan")
                  ? "bg-blue-100 text-blue-600 font-bold"
                  : "hover:bg-accent"
              }`}
            >
              <FiClipboard className="h-5 w-5 mr-2" />
              {isOpen && <span>Fingerprint Scan</span>}
            </Link>
          </>
        )}

        {/* Common Links */}
        <Link
          to="/requests"
          className={`flex items-center px-3 py-2 rounded-md font-medium ${
            isActive("/requests")
              ? "bg-red-100 text-red-600 font-bold"
              : "hover:bg-accent"
          }`}
        >
          <FiClipboard className="h-5 w-5 mr-2" />
          {isOpen && <span>Blood Requests</span>}
        </Link>

        <Link
          to="/statistics"
          className={`flex items-center px-3 py-2 rounded-md font-medium ${
            isActive("/statistics")
              ? "bg-red-100 text-red-600 font-bold"
              : "hover:bg-accent"
          }`}
        >
          <FiBarChart2 className="h-5 w-5 mr-2" />
          {isOpen && <span>Statistics</span>}
        </Link>

        <Link
          to="/lab-tests"
          className={`flex items-center px-3 py-2 rounded-md font-medium ${
            isActive("/lab-tests")
              ? "bg-purple-100 text-purple-600 font-bold"
              : "hover:bg-accent"
          }`}
        >
          <TestTube className="h-5 w-5 mr-2 text-purple-500" />
          {isOpen && <span>Lab Tests</span>}
        </Link>

        <Link
          to="/video-consultation"
          className={`flex items-center px-3 py-2 rounded-md font-medium ${
            isActive("/video-consultation")
              ? "bg-blue-100 text-blue-600 font-bold"
              : "hover:bg-accent"
          }`}
        >
          <Video className="h-5 w-5 mr-2 text-blue-500" />
          {isOpen && <span>Video Consultation</span>}
        </Link>

        <Link
          to="/reminders"
          className={`flex items-center px-3 py-2 rounded-md font-medium ${
            isActive("/reminders")
              ? "bg-green-100 text-green-600 font-bold"
              : "hover:bg-accent"
          }`}
        >
          <Pill className="h-5 w-5 mr-2 text-green-500" />
          {isOpen && <span>Medicine Reminders</span>}
        </Link>

        <Link
          to="/donor-map"
          className={`flex items-center px-3 py-2 rounded-md font-medium ${
            isActive("/donor-map")
              ? "bg-blue-100 text-blue-600 font-bold"
              : "hover:bg-accent"
          }`}
        >
          <MapPin className="h-5 w-5 mr-2 text-blue-500" />
          {isOpen && <span>Donor Map</span>}
        </Link>

        {/* Pharmacy Dropdown */}
        <div className="mt-2">
          <button
            onClick={() => setPharmacyOpen(!pharmacyOpen)}
            className="w-full flex justify-between items-center px-3 py-2 rounded-md font-medium hover:bg-accent"
          >
            <span className="flex items-center">
              <FiHeart className="h-5 w-5 mr-2" />
              {isOpen && <span>Pharmacy</span>}
            </span>
            <FiChevronDown />
          </button>
          {pharmacyOpen && isOpen && (
            <div className="ml-4 mt-1 space-y-1">
              <Link to="/pharmacy" className="block px-2 py-1 rounded hover:bg-accent">
                Browse Medicines
              </Link>
              <Link to="/pharmacy/cart" className="block px-2 py-1 rounded hover:bg-accent">
                Cart
              </Link>
              <Link to="/pharmacy/checkout" className="block px-2 py-1 rounded hover:bg-accent">
                Checkout
              </Link>
              <Link to="/pharmacy/orders" className="block px-2 py-1 rounded hover:bg-accent">
                My Orders
              </Link>
              <Link to="/pharmacy/upload" className="block px-2 py-1 rounded hover:bg-accent">
                Upload Prescription
              </Link>
            </div>
          )}
        </div>

        {/* Emergency SOS */}
        <NavigateEmergency />
      </nav>

      {/* Bottom Section - User / Auth */}
      <div className="p-4 border-t border-border">
        {isAuthenticated ? (
          <div className="space-y-3">
            {isOpen && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {role?.toLowerCase()}
                  </span>
                </div>
                <NotificationBell />
              </div>
            )}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <FiLogOut className="w-4 h-4 mr-2" /> {isOpen && "Logout"}
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link to="/register">
              <Button variant="ghost" className="w-full flex items-center justify-center">
                <FiUser className="w-4 h-4 mr-2" /> {isOpen && "Register"}
              </Button>
            </Link>
            <Link to="/login">
              <Button className="w-full flex items-center justify-center">
                <FiUser className="w-4 h-4 mr-2" /> {isOpen && "Login"}
              </Button>
            </Link>
            <Link to="/doctor-login">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <FiUser className="w-4 h-4 mr-2" /> {isOpen && "Doctor Login"}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
