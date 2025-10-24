// Mock authentication service for frontend testing
// This simulates the backend API responses

import { AuthResponse, LoginRequest, HospitalUser, AadhaarVerificationRequest, AadhaarValidationResponse } from '@/types';

const MOCK_USERS: HospitalUser[] = [
  {
    id: '1',
    username: 'doctor1',
    email: 'doctor1@bloodcare.com',
    role: 'DOCTOR',
    hospitalName: 'General Hospital'
  },
  {
    id: '2', 
    username: 'nurse1',
    email: 'nurse1@bloodcare.com',
    role: 'NURSE',
    hospitalName: 'General Hospital'
  }
];

// Mock Aadhaar database
const MOCK_AADHAAR_PATIENTS = [
  {
    aadhaarNumber: '1234-5678-9012',
    patient: {
      id: 'patient-aadhaar-123',
      name: 'Priya Sharma',
      phone: '+91-98765-43210',
      dateOfBirth: '1985-03-22',
      bloodType: 'B+',
      emergencyContact: 'Raj Sharma - +91-98765-43211',
      aadhaarNumber: '1234-5678-9012',
      createdAt: '2024-01-10T08:45:00Z'
    },
    medicalRecord: {
      id: 'record-aadhaar-123',
      patientId: 'patient-aadhaar-123',
      medications: ['Thyronorm 75mcg daily', 'Calcium tablets', 'Iron supplements'],
      allergies: ['Sulfa drugs', 'Dust mites'],
      diagnoses: ['Hypothyroidism', 'Iron deficiency anemia', 'Vitamin D deficiency'],
      notes: 'Patient has well-controlled hypothyroidism. Regular monitoring of TSH levels required. Iron levels improving with supplementation.',
      createdAt: '2024-01-10T08:45:00Z',
      updatedAt: '2024-01-25T11:20:00Z'
    }
  },
  {
    aadhaarNumber: '9876-5432-1098',
    patient: {
      id: 'patient-aadhaar-456',
      name: 'Arjun Patel',
      phone: '+91-87654-32109',
      dateOfBirth: '1978-11-15',
      bloodType: 'O-',
      emergencyContact: 'Meera Patel - +91-87654-32108',
      aadhaarNumber: '9876-5432-1098',
      createdAt: '2024-01-05T14:30:00Z'
    },
    medicalRecord: {
      id: 'record-aadhaar-456',
      patientId: 'patient-aadhaar-456',
      medications: ['Atenolol 50mg daily', 'Aspirin 75mg daily', 'Atorvastatin 20mg'],
      allergies: ['Penicillin', 'Iodine contrast'],
      diagnoses: ['Hypertension', 'Coronary artery disease', 'Hyperlipidemia'],
      notes: 'Patient has stable coronary artery disease. Blood pressure well controlled. Last echo showed normal LV function. Requires annual stress testing.',
      createdAt: '2024-01-05T14:30:00Z',
      updatedAt: '2024-01-22T09:15:00Z'
    }
  }
];

export const mockAuthAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials
    if ((credentials.username === 'doctor1' || credentials.username === 'nurse1') && 
        credentials.password === 'password123') {
      
      const user = MOCK_USERS.find(u => u.username === credentials.username);
      if (!user) throw new Error('User not found');
      
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user,
        expiresIn: 86400000 // 24 hours
      };
    }
    
    throw new Error('Invalid username or password');
  }
};

export const mockPatientAPI = {
  enroll: async (enrollmentData: any): Promise<{ success: boolean; patientId: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      patientId: 'mock-patient-' + Date.now()
    };
  },

  scanFingerprint: async (scanData: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock patient data
    return {
      patient: {
        id: 'patient-123',
        name: 'John Doe',
        phone: '+1-555-0123',
        dateOfBirth: '1980-05-15',
        bloodType: 'A+',
        emergencyContact: 'Jane Doe - +1-555-0124',
        aadhaarNumber: '5555-6666-7777',
        createdAt: '2024-01-15T10:30:00Z'
      },
      medicalRecord: {
        id: 'record-123',
        patientId: 'patient-123',
        medications: ['Aspirin 81mg daily', 'Lisinopril 10mg daily', 'Metformin 500mg twice daily'],
        allergies: ['Penicillin', 'Shellfish', 'Latex'],
        diagnoses: ['Hypertension', 'Type 2 Diabetes', 'Seasonal Allergies'],
        notes: 'Patient is compliant with medications. Last HbA1c was 6.8%. Blood pressure well controlled. Recommend annual eye exam due to diabetes.',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-20T14:15:00Z'
      },
      matchConfidence: 94.5,
      matchMethod: 'FINGERPRINT'
    };
  },

  verifyAadhaar: async (aadhaarData: AadhaarVerificationRequest): Promise<AadhaarValidationResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Validate Aadhaar format (basic validation)
    const aadhaarRegex = /^\d{4}-\d{4}-\d{4}$/;
    if (!aadhaarRegex.test(aadhaarData.aadhaarNumber)) {
      return {
        isValid: false,
        patientFound: false,
        requiresOTP: false,
        message: 'Invalid Aadhaar number format. Please use XXXX-XXXX-XXXX format.'
      };
    }
    
    // Check if patient exists in mock database
    const patientRecord = MOCK_AADHAAR_PATIENTS.find(
      p => p.aadhaarNumber === aadhaarData.aadhaarNumber
    );
    
    if (!patientRecord) {
      return {
        isValid: true,
        patientFound: false,
        requiresOTP: false,
        message: 'Aadhaar number is valid but no patient record found in our database.'
      };
    }
    
    return {
      isValid: true,
      patientFound: true,
      requiresOTP: false,
      message: 'Patient found! Retrieving medical records...'
    };
  },

  searchByAadhaar: async (aadhaarData: AadhaarVerificationRequest) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const patientRecord = MOCK_AADHAAR_PATIENTS.find(
      p => p.aadhaarNumber === aadhaarData.aadhaarNumber
    );
    
    if (!patientRecord) {
      throw new Error('No patient found with this Aadhaar number');
    }
    
    return {
      patient: patientRecord.patient,
      medicalRecord: patientRecord.medicalRecord,
      matchConfidence: 100, // Aadhaar is 100% accurate when found
      matchMethod: 'AADHAAR'
    };
  }
};