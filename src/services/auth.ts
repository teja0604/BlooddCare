import api from "./api";

export interface AuthResponse {
  token?: string;
  role?: "ADMIN" | "HOSPITAL" | "DONOR" | "USER";
  userId?: number;
}

// 🔹 Login
export async function login(
  { email, password }: { email: string; password: string }
): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/signin", { email, password });
  return res.data;
}

// 🔹 Register
export async function register(
  data: {
    name: string;
    email: string;
    password: string;
    role?: string;
    bloodGroup?: string;
  }
): Promise<any> {
  const res = await api.post("/auth/register", data); // ✅ matches backend
  return res.data;
}
