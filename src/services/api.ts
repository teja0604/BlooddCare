import axios from "axios";

// ========================
// TYPES
// ========================
export interface AuthResponse {
  token: string;
  role: "ADMIN" | "HOSPITAL" | "DONOR" | "USER";
  name: string;
  bloodGroup: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Import other types from your types file
import {
  PatientEnrollmentRequest,
  FingerprintScanRequest,
  PatientMatchResponse,
  AadhaarVerificationRequest,
  AadhaarValidationResponse,
} from "@/types";

// ========================
// CONFIG
// ========================
const API_BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:8081/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ========================
// REQUEST INTERCEPTOR - Attach token
// ========================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ========================
// RESPONSE INTERCEPTOR - handle 401 globally
// ========================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ========================
// AUTH API
// ========================
export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/auth/signin", credentials);
    const data = res.data;

    const authResponse: AuthResponse = {
      token: data.token,
      role: data.role,
      name: data.name,
      bloodGroup: data.bloodGroup,
      email: credentials.email,
    };

    localStorage.setItem("token", authResponse.token);
    localStorage.setItem("user", JSON.stringify(authResponse));

    return authResponse;
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "HOSPITAL" | "DONOR" | "USER";
    bloodGroup: string;
  }) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

// ========================
// PATIENT API
// ========================
export const patientAPI = {
  enroll: async (enrollmentData: PatientEnrollmentRequest): Promise<{ success: boolean; patientId: string }> => {
    const formData = new FormData();
    formData.append("patient", JSON.stringify(enrollmentData.patient));
    formData.append("medicalRecord", JSON.stringify(enrollmentData.medicalRecord));
    if (enrollmentData.fingerprintImage) {
      formData.append("fingerprintImage", enrollmentData.fingerprintImage);
    }

    const res = await api.post<{ success: boolean; patientId: string }>("/patients/enroll", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  scanFingerprint: async (scanData: FingerprintScanRequest): Promise<PatientMatchResponse> => {
    const formData = new FormData();
    formData.append("fingerprintImage", scanData.fingerprintImage);

    const res = await api.post("/patients/scan", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const response = res.data;

    const validMatchMethod =
      response.matchMethod === "FINGERPRINT" || response.matchMethod === "AADHAAR"
        ? response.matchMethod
        : "FINGERPRINT";

    return { ...response, matchMethod: validMatchMethod } as PatientMatchResponse;
  },

  verifyAadhaar: async (aadhaarData: AadhaarVerificationRequest): Promise<AadhaarValidationResponse> => {
    const res = await api.post<AadhaarValidationResponse>("/patients/verify-aadhaar", aadhaarData);
    return res.data;
  },

  searchByAadhaar: async (aadhaarData: AadhaarVerificationRequest): Promise<PatientMatchResponse> => {
    const res = await api.post("/patients/search-aadhaar", aadhaarData);
    const response = res.data;

    const validMatchMethod =
      response.matchMethod === "FINGERPRINT" || response.matchMethod === "AADHAAR"
        ? response.matchMethod
        : "AADHAAR";

    return { ...response, matchMethod: validMatchMethod } as PatientMatchResponse;
  },
};

// ========================
// EXPORTS
// ========================
export default api;
