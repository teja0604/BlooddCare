package com.blooddonation.blood_donation_backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * DTO for patient match response
 */
public class PatientMatchResponseDto {
    
    private String matchMethod; // "FINGERPRINT" or "AADHAAR"
    private PatientDto patient;
    private MedicalRecordDto medicalRecord;
    
    // Constructors
    public PatientMatchResponseDto() {}
    
    public PatientMatchResponseDto(String matchMethod, PatientDto patient, MedicalRecordDto medicalRecord) {
        this.matchMethod = matchMethod;
        this.patient = patient;
        this.medicalRecord = medicalRecord;
    }
    
    // Getters and Setters
    public String getMatchMethod() { return matchMethod; }
    public void setMatchMethod(String matchMethod) { this.matchMethod = matchMethod; }
    
    public PatientDto getPatient() { return patient; }
    public void setPatient(PatientDto patient) { this.patient = patient; }
    
    public MedicalRecordDto getMedicalRecord() { return medicalRecord; }
    public void setMedicalRecord(MedicalRecordDto medicalRecord) { this.medicalRecord = medicalRecord; }
    
    /**
     * Nested Patient DTO
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
    
    /**
     * Nested Medical Record DTO
     */
    public static class MedicalRecordDto {
        private UUID id;
        private List<String> medications;
        private List<String> allergies;
        private List<String> diagnoses;
        private String notes;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        
        public MedicalRecordDto() {}
        
        public MedicalRecordDto(UUID id, List<String> medications, List<String> allergies,
                               List<String> diagnoses, String notes, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.id = id;
            this.medications = medications;
            this.allergies = allergies;
            this.diagnoses = diagnoses;
            this.notes = notes;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
        
        // Getters and Setters
        public UUID getId() { return id; }
        public void setId(UUID id) { this.id = id; }
        
        public List<String> getMedications() { return medications; }
        public void setMedications(List<String> medications) { this.medications = medications; }
        
        public List<String> getAllergies() { return allergies; }
        public void setAllergies(List<String> allergies) { this.allergies = allergies; }
        
        public List<String> getDiagnoses() { return diagnoses; }
        public void setDiagnoses(List<String> diagnoses) { this.diagnoses = diagnoses; }
        
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
        
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
        
        public LocalDateTime getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    }
}