package com.blooddonation.blood_donation_backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for Aadhaar validation response
 */
public class AadhaarValidationResponseDto {
    
    private boolean valid;
    private PatientDto patient;
    
    // Constructors
    public AadhaarValidationResponseDto() {}
    
    public AadhaarValidationResponseDto(boolean valid, PatientDto patient) {
        this.valid = valid;
        this.patient = patient;
    }
    
    // Getters and Setters
    public boolean isValid() { return valid; }
    public void setValid(boolean valid) { this.valid = valid; }
    
    public PatientDto getPatient() { return patient; }
    public void setPatient(PatientDto patient) { this.patient = patient; }
    
    /**
     * Nested Patient DTO (simplified)
     */
    public static class PatientDto {
        private UUID id;
        private String name;
        private String phone;
        private LocalDate dateOfBirth;
        private String bloodType;
        private String emergencyContact;
        private String aadhaarNumber;
        private LocalDateTime createdAt;
        
        public PatientDto() {}
        
        public PatientDto(UUID id, String name, String phone, LocalDate dateOfBirth, String bloodType,
                         String emergencyContact, String aadhaarNumber, LocalDateTime createdAt) {
            this.id = id;
            this.name = name;
            this.phone = phone;
            this.dateOfBirth = dateOfBirth;
            this.bloodType = bloodType;
            this.emergencyContact = emergencyContact;
            this.aadhaarNumber = aadhaarNumber;
            this.createdAt = createdAt;
        }
        
        // Getters and Setters
        public UUID getId() { return id; }
        public void setId(UUID id) { this.id = id; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        
        public LocalDate getDateOfBirth() { return dateOfBirth; }
        public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
        
        public String getBloodType() { return bloodType; }
        public void setBloodType(String bloodType) { this.bloodType = bloodType; }
        
        public String getEmergencyContact() { return emergencyContact; }
        public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }
        
        public String getAadhaarNumber() { return aadhaarNumber; }
        public void setAadhaarNumber(String aadhaarNumber) { this.aadhaarNumber = aadhaarNumber; }
        
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}