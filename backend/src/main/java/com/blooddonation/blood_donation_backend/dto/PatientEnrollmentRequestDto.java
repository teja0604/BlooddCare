package com.blooddonation.blood_donation_backend.dto;

import java.time.LocalDate;
import java.util.List;

/**
 * DTO for patient enrollment request
 */
public class PatientEnrollmentRequestDto {
    
    private PatientDto patient;
    private MedicalRecordDto medicalRecord;
    
    // Constructors
    public PatientEnrollmentRequestDto() {}
    
    public PatientEnrollmentRequestDto(PatientDto patient, MedicalRecordDto medicalRecord) {
        this.patient = patient;
        this.medicalRecord = medicalRecord;
    }
    
    // Getters and Setters
    public PatientDto getPatient() { return patient; }
    public void setPatient(PatientDto patient) { this.patient = patient; }
    
    public MedicalRecordDto getMedicalRecord() { return medicalRecord; }
    public void setMedicalRecord(MedicalRecordDto medicalRecord) { this.medicalRecord = medicalRecord; }
    
    /**
     * Nested Patient DTO
     */
    public static class PatientDto {
        private String name;
        private String phone;
        private LocalDate dateOfBirth;
        private String bloodType;
        private String emergencyContact;
        private String aadhaarNumber;
        
        public PatientDto() {}
        
        public PatientDto(String name, String phone, LocalDate dateOfBirth, String bloodType, 
                         String emergencyContact, String aadhaarNumber) {
            this.name = name;
            this.phone = phone;
            this.dateOfBirth = dateOfBirth;
            this.bloodType = bloodType;
            this.emergencyContact = emergencyContact;
            this.aadhaarNumber = aadhaarNumber;
        }
        
        // Getters and Setters
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
    }
    
    /**
     * Nested Medical Record DTO
     */
    public static class MedicalRecordDto {
        private List<String> medications;
        private List<String> allergies;
        private List<String> diagnoses;
        private String notes;
        
        public MedicalRecordDto() {}
        
        public MedicalRecordDto(List<String> medications, List<String> allergies, 
                               List<String> diagnoses, String notes) {
            this.medications = medications;
            this.allergies = allergies;
            this.diagnoses = diagnoses;
            this.notes = notes;
        }
        
        // Getters and Setters
        public List<String> getMedications() { return medications; }
        public void setMedications(List<String> medications) { this.medications = medications; }
        
        public List<String> getAllergies() { return allergies; }
        public void setAllergies(List<String> allergies) { this.allergies = allergies; }
        
        public List<String> getDiagnoses() { return diagnoses; }
        public void setDiagnoses(List<String> diagnoses) { this.diagnoses = diagnoses; }
        
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
    }
}