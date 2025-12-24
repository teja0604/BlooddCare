package com.blooddonation.blood_donation_backend.controller;

import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blooddonation.blood_donation_backend.dto.AadhaarValidationResponseDto;
import com.blooddonation.blood_donation_backend.dto.AadhaarVerificationRequestDto;
import com.blooddonation.blood_donation_backend.dto.PatientEnrollmentRequestDto;
import com.blooddonation.blood_donation_backend.dto.PatientMatchResponseDto;
import com.blooddonation.blood_donation_backend.service.PatientService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

/**
 * Patient Controller - Handles patient enrollment, fingerprint scanning, and Aadhaar verification
 */
@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;
    private final ObjectMapper objectMapper;

    /**
     * Enroll a new patient
     */
    @PostMapping(value = "/enroll", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> enrollPatient(
            @RequestPart("patient") String patientJson,
            @RequestPart("medicalRecord") String medicalRecordJson,
            @RequestPart("fingerprintImage") MultipartFile fingerprintImage) {
        try {
            // Parse JSON strings to DTOs
            PatientEnrollmentRequestDto.PatientDto patientDto = 
                objectMapper.readValue(patientJson, PatientEnrollmentRequestDto.PatientDto.class);
            PatientEnrollmentRequestDto.MedicalRecordDto medicalRecordDto = 
                objectMapper.readValue(medicalRecordJson, PatientEnrollmentRequestDto.MedicalRecordDto.class);

            PatientEnrollmentRequestDto request = new PatientEnrollmentRequestDto();
            request.setPatient(patientDto);
            request.setMedicalRecord(medicalRecordDto);

            Map<String, Object> result = patientService.enrollPatient(patientDto, medicalRecordDto, fingerprintImage);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Enrollment failed: " + e.getMessage()));
        }
    }

    /**
     * Scan fingerprint to find matching patient
     */
    @PostMapping(value = "/scan", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PatientMatchResponseDto> scanFingerprint(
            @RequestPart("fingerprintImage") MultipartFile fingerprintImage) {
        try {
            PatientMatchResponseDto result = patientService.scanFingerprint(fingerprintImage);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Verify Aadhaar number
     */
    @PostMapping("/verify-aadhaar")
    public ResponseEntity<AadhaarValidationResponseDto> verifyAadhaar(
            @org.springframework.web.bind.annotation.RequestBody AadhaarVerificationRequestDto request) {
        try {
            AadhaarValidationResponseDto result = patientService.verifyAadhaar(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Search patient by Aadhaar number
     */
    @PostMapping("/search-aadhaar")
    public ResponseEntity<PatientMatchResponseDto> searchByAadhaar(
            @org.springframework.web.bind.annotation.RequestBody AadhaarVerificationRequestDto request) {
        try {
            PatientMatchResponseDto result = patientService.searchByAadhaar(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}