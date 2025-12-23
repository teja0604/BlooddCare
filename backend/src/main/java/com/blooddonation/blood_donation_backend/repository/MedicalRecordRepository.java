package com.blooddonation.blood_donation_backend.repository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blooddonation.blood_donation_backend.model.MedicalRecord;
import com.blooddonation.blood_donation_backend.model.Patient;

/**
 * Medical Record Repository - Data access layer for MedicalRecord entities
 */
@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, UUID> {
    
    /**
     * Find medical records by patient
     */
    List<MedicalRecord> findByPatient(Patient patient);
    
    /**
     * Find medical records by patient ID
     */
    List<MedicalRecord> findByPatientId(UUID patientId);
    
    /**
     * Find the most recent medical record for a patient
     */
    Optional<MedicalRecord> findTopByPatientOrderByCreatedAtDesc(Patient patient);
    
    /**
     * Find the most recent medical record by patient ID
     */
    Optional<MedicalRecord> findTopByPatientIdOrderByCreatedAtDesc(UUID patientId);
}