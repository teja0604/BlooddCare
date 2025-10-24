import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { HospitalUser, AuthResponse, LoginRequest } from "@/types";
import { authAPI } from "@/services/api";

interface AuthContextType {
  user: HospitalUser | null;
  role: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<HospitalUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("bloodcare_token");
    const userData = localStorage.getItem("bloodcare_user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("bloodcare_token");
        localStorage.removeItem("bloodcare_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response: AuthResponse = await authAPI.login(credentials);
      localStorage.setItem("bloodcare_token", response.token);
      localStorage.setItem("bloodcare_user", JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Let DoctorLogin handle it
    }
  };

  const logout = () => {
    authAPI.logout();
    localStorage.removeItem("bloodcare_token");
    localStorage.removeItem("bloodcare_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
