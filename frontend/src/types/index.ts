export interface Patient {
  id?: string;
  name: string;
  phone: string;
  dateOfBirth: string;
  bloodType: string;
  emergencyContact: string;
  aadhaarNumber: string; // Added Aadhaar number
  fingerprintTemplate?: string;
  createdAt?: string;
}

export interface MedicalRecord {
  id?: string;
  patientId: string;
  medications: string[];
  allergies: string[];
  diagnoses: string[];
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HospitalUser {
  id?: string;
  username: string;
  email: string;
  role: 'DOCTOR' | 'NURSE' | 'ADMIN';
  hospitalName: string;
}

export interface AuthResponse {
  token: string;
  role: "ADMIN" | "HOSPITAL" | "DONOR" | "USER";
  name: string;
  bloodGroup?: string | null;
  email: string;
}

export interface PatientEnrollmentRequest {
  patient: Omit<Patient, 'id' | 'createdAt'>;
  medicalRecord: Omit<MedicalRecord, 'id' | 'patientId' | 'createdAt' | 'updatedAt'>;
  fingerprintImage: File;
}

export interface FingerprintScanRequest {
  fingerprintImage: File;
}

export interface AadhaarVerificationRequest {
  aadhaarNumber: string;
  otp?: string; // For OTP verification if needed
}

export interface PatientMatchResponse {
  patient: Patient;
  medicalRecord: MedicalRecord;
  matchConfidence: number;
  matchMethod: 'FINGERPRINT' | 'AADHAAR';
}

export interface LoginRequest {
  email: string;
  password: string;
}


export interface AadhaarValidationResponse {
  isValid: boolean;
  patientFound: boolean;
  requiresOTP: boolean;
  message: string;
}