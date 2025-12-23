package com.blooddonation.blood_donation_backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Medical Record Entity - Stores patient medical history and information
 */
@Entity
@Table(name = "medical_records")
public class MedicalRecord {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    
    /**
     * Current medications as JSON array stored as text
     * Example: ["Aspirin 81mg daily", "Lisinopril 10mg daily"]
     */
    @ElementCollection
    @CollectionTable(name = "patient_medications", joinColumns = @JoinColumn(name = "medical_record_id"))
    @Column(name = "medication")
    private List<String> medications;
    
    /**
     * Known allergies as JSON array stored as text
     * Example: ["Penicillin", "Shellfish", "Latex"]
     */
    @ElementCollection
    @CollectionTable(name = "patient_allergies", joinColumns = @JoinColumn(name = "medical_record_id"))
    @Column(name = "allergy")
    private List<String> allergies;
    
    /**
     * Medical diagnoses as JSON array stored as text
     * Example: ["Hypertension", "Type 2 Diabetes", "Asthma"]
     */
    @ElementCollection
    @CollectionTable(name = "patient_diagnoses", joinColumns = @JoinColumn(name = "medical_record_id"))
    @Column(name = "diagnosis")
    private List<String> diagnoses;
    
    @Lob
    @Column(name = "notes")
    private String notes;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public MedicalRecord() {}
    
    public MedicalRecord(Patient patient, List<String> medications, List<String> allergies, 
                        List<String> diagnoses, String notes) {
        this.patient = patient;
        this.medications = medications;
        this.allergies = allergies;
        this.diagnoses = diagnoses;
        this.notes = notes;
    }
    
    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
    
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