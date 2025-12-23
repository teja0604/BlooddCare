// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authAPI } from "@/services/api";
import { AuthResponse, LoginRequest } from "@/services/api";

export interface HospitalUser {
  name: string;
  email: string;
  role: "ADMIN" | "HOSPITAL" | "DONOR" | "USER";
  bloodGroup: string;
}

interface AuthContextType {
  user: HospitalUser | null;
  token?: string;
  login: (credentials: LoginRequest) => Promise<HospitalUser | null>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<HospitalUser | null>(null);
  const [token, setToken] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest): Promise<HospitalUser | null> => {
    try {
      const res: AuthResponse = await authAPI.login(credentials);

      const loggedUser: HospitalUser = {
        name: res.name!,
        email: res.email!,
        role: res.role!,
        bloodGroup: res.bloodGroup!,
      };

      setUser(loggedUser);
      setToken(res.token);

      localStorage.setItem("token", res.token!);
      localStorage.setItem("user", JSON.stringify(loggedUser));

      return loggedUser;
    } catch (err) {
      throw new Error("Login failed. Check your credentials.");
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setToken(undefined);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
