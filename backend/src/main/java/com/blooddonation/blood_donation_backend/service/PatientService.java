package com.blooddonation.blood_donation_backend.service;

import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.blooddonation.blood_donation_backend.dto.AadhaarValidationResponseDto;
import com.blooddonation.blood_donation_backend.dto.AadhaarVerificationRequestDto;
import com.blooddonation.blood_donation_backend.dto.PatientEnrollmentRequestDto;
import com.blooddonation.blood_donation_backend.dto.PatientMatchResponseDto;
import com.blooddonation.blood_donation_backend.model.MedicalRecord;
import com.blooddonation.blood_donation_backend.model.Patient;
import com.blooddonation.blood_donation_backend.repository.MedicalRecordRepository;
import com.blooddonation.blood_donation_backend.repository.PatientRepository;

import lombok.RequiredArgsConstructor;

/**
 * Patient Service - Handles patient enrollment, fingerprint scanning, and Aadhaar verification
 */
@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final EncryptionService encryptionService;

    /**
     * Enroll a new patient with medical records and fingerprint
     */
    @Transactional
    public Map<String, Object> enrollPatient(PatientEnrollmentRequestDto.PatientDto patientDto,
                                           PatientEnrollmentRequestDto.MedicalRecordDto medicalRecordDto,
                                           MultipartFile fingerprintImage) {
        try {
            // Validate patient data
            if (patientRepository.existsByPhone(patientDto.getPhone())) {
                throw new RuntimeException("Patient with this phone number already exists");
            }

            // Process fingerprint image (simplified - in real implementation, use fingerprint SDK)
            String fingerprintTemplate = processFingerprintImage(fingerprintImage);

            // Encrypt fingerprint template
            String encryptedFingerprint = encryptionService.encrypt(fingerprintTemplate);

            // Create patient
            Patient patient = new Patient(
                patientDto.getName(),
                patientDto.getPhone(),
                patientDto.getDateOfBirth(),
                patientDto.getBloodType(),
                patientDto.getEmergencyContact(),
                encryptedFingerprint
            );
            
            // Set Aadhaar number
            patient.setAadhaarNumber(patientDto.getAadhaarNumber());

            // Add Aadhaar number if provided (assuming it's added to Patient model)
            // For now, we'll assume Patient has aadhaarNumber field
            patient = patientRepository.save(patient);

            // Create medical record
            MedicalRecord medicalRecord = new MedicalRecord(
                patient,
                medicalRecordDto.getMedications(),
                medicalRecordDto.getAllergies(),
                medicalRecordDto.getDiagnoses(),
                medicalRecordDto.getNotes()
            );
            medicalRecordRepository.save(medicalRecord);

            return Map.of("success", true, "patientId", patient.getId().toString());

        } catch (Exception e) {
            throw new RuntimeException("Failed to enroll patient: " + e.getMessage());
        }
    }

    /**
     * Scan fingerprint and find matching patient
     */
    public PatientMatchResponseDto scanFingerprint(MultipartFile fingerprintImage) {
        try {
            String fingerprintTemplate = processFingerprintImage(fingerprintImage);

            // Find patient by fingerprint (simplified matching)
            List<Patient> patients = patientRepository.findAll();
            for (Patient patient : patients) {
                String decryptedFingerprint = encryptionService.decrypt(patient.getFingerprintTemplate());
                if (fingerprintTemplate.equals(decryptedFingerprint)) {
                    // Found match
                    return createPatientMatchResponse(patient, "FINGERPRINT");
                }
            }

            throw new RuntimeException("No matching patient found");

        } catch (Exception e) {
            throw new RuntimeException("Fingerprint scan failed: " + e.getMessage());
        }
    }

    /**
     * Verify Aadhaar number
     */
    public AadhaarValidationResponseDto verifyAadhaar(AadhaarVerificationRequestDto request) {
        // In real implementation, integrate with Aadhaar API
        // For now, check if patient exists with this Aadhaar
        List<Patient> patients = patientRepository.findAll();
        for (Patient patient : patients) {
            if (request.getAadhaarNumber().equals(patient.getAadhaarNumber())) {
                AadhaarValidationResponseDto.PatientDto patientDto = new AadhaarValidationResponseDto.PatientDto(
                    patient.getId(),
                    patient.getName(),
                    patient.getPhone(),
                    patient.getDateOfBirth(),
                    patient.getBloodType(),
                    patient.getEmergencyContact(),
                    patient.getAadhaarNumber(),
                    patient.getCreatedAt()
                );
                return new AadhaarValidationResponseDto(true, patientDto);
            }
        }
        return new AadhaarValidationResponseDto(false, null);
    }

    /**
     * Search patient by Aadhaar and return match response
     */
    public PatientMatchResponseDto searchByAadhaar(AadhaarVerificationRequestDto request) {
        AadhaarValidationResponseDto validation = verifyAadhaar(request);
        if (!validation.isValid() || validation.getPatient() == null) {
            throw new RuntimeException("Patient not found with this Aadhaar number");
        }

        // Find the full patient with medical records
        Optional<Patient> patientOpt = patientRepository.findByIdWithMedicalRecords(
            validation.getPatient().getId()
        );

        if (patientOpt.isPresent()) {
            return createPatientMatchResponse(patientOpt.get(), "AADHAAR");
        } else {
            throw new RuntimeException("Patient data not found");
        }
    }

    /**
     * Process fingerprint image (simplified implementation)
     */
    private String processFingerprintImage(MultipartFile fingerprintImage) {
        try {
            // In real implementation, use fingerprint processing library
            // For now, convert to base64 as template
            byte[] bytes = fingerprintImage.getBytes();
            return Base64.getEncoder().encodeToString(bytes);
        } catch (Exception e) {
            throw new RuntimeException("Failed to process fingerprint image");
        }
    }

    /**
     * Create patient match response DTO
     */
    private PatientMatchResponseDto createPatientMatchResponse(Patient patient, String matchMethod) {
        // Convert patient to DTO
        PatientMatchResponseDto.PatientDto patientDto = new PatientMatchResponseDto.PatientDto(
            patient.getId(),
            patient.getName(),
            patient.getPhone(),
            patient.getDateOfBirth(),
            patient.getBloodType(),
            patient.getEmergencyContact(),
            patient.getAadhaarNumber(),
            patient.getCreatedAt()
        );

        // Get medical record
        List<MedicalRecord> records = medicalRecordRepository.findByPatientId(patient.getId());
        MedicalRecord latestRecord = records.isEmpty() ? null : records.get(records.size() - 1);

        PatientMatchResponseDto.MedicalRecordDto medicalRecordDto = null;
        if (latestRecord != null) {
            medicalRecordDto = new PatientMatchResponseDto.MedicalRecordDto(
                latestRecord.getId(),
                latestRecord.getMedications(),
                latestRecord.getAllergies(),
                latestRecord.getDiagnoses(),
                latestRecord.getNotes(),
                latestRecord.getCreatedAt(),
                latestRecord.getUpdatedAt()
            );
        }

        return new PatientMatchResponseDto(matchMethod, patientDto, medicalRecordDto);
    }
}