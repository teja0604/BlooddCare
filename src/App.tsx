// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import AppLayout from "./layouts/AppLayout";
import Footer from "./components/Footer";

// --- your pages ---
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Requests from "./pages/Requests";
import Statistics from "./pages/Statistics";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import Pharmacy from "./pages/pharmacy/Pharmacy";
import Cart from "./pages/pharmacy/Cart";
import Checkout from "./pages/pharmacy/Checkout";
import Orders from "./pages/pharmacy/Orders";
import UploadPrescription from "./pages/pharmacy/UploadPrescription";
import BloodRequests from "./pages/Requests";
import EmergencySOS from "./pages/EmergencySos";
import LabTests from "./pages/LabTests";
import MedicineReminders from "@/pages/MedicineReminders";
import VideoConsultation from "./pages/VideoConsulation";
import DonorMapPage from "@/pages/DonorMap";

// Doctor
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientEnrollment from "./pages/PatientEnrollment";
import FingerprintScan from "./pages/FingerPrintScan";

const queryClient = new QueryClient();

// ✅ Move Protected & PublicRoute *inside AuthProvider*
const Protected = ({ children, allow }: { children: React.ReactNode; allow?: string[] }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allow && role && !allow.includes(role)) return <Navigate to="/" replace />;

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />}>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/doctor-login" element={<PublicRoute><DoctorLogin /></PublicRoute>} />

      {/* Main */}
      <Route path="/requests" element={<Requests />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/pharmacy" element={<Pharmacy />} />
      <Route path="/pharmacy/cart" element={<Cart />} />
      <Route path="/pharmacy/checkout" element={<Checkout />} />
      <Route path="/pharmacy/orders" element={<Orders />} />
      <Route path="/pharmacy/upload" element={<UploadPrescription />} />
      <Route path="/blood-requests" element={<BloodRequests />} />
      <Route path="/emergency" element={<EmergencySOS />} />
      <Route path="/lab-tests" element={<LabTests />} />
      <Route path="/reminders" element={<MedicineReminders />} />
      <Route path="/video-consultation" element={<VideoConsultation />} />
      <Route path="/donor-map" element={<DonorMapPage />} />

      {/* Dashboards */}
      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/admin" element={<Protected allow={['ADMIN']}><AdminDashboard /></Protected>} />
      <Route path="/hospital" element={<Protected allow={['HOSPITAL']}><HospitalDashboard /></Protected>} />
      <Route path="/donor" element={<Protected allow={['DONOR']}><DonorDashboard /></Protected>} />

      {/* Doctor */}
      <Route path="/doctor/dashboard" element={<Protected allow={['DOCTOR']}><DoctorDashboard /></Protected>} />
      <Route path="/doctor/scan" element={<Protected allow={['DOCTOR']}><FingerprintScan /></Protected>} />
      <Route path="/enroll" element={<Protected allow={['DOCTOR']}><PatientEnrollment /></Protected>} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        {/* ✅ AuthProvider must wrap AppRoutes */}
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-background font-inter antialiased flex flex-col">
              <div className="flex-grow">
                <AppRoutes />
              </div>
              <Footer />
              <Toaster />
              <Sonner />
            </div>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
