package com.blooddonation.blood_donation_backend.repository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.blooddonation.blood_donation_backend.model.Patient;

/**
 * Patient Repository - Data access layer for Patient entities
 */
@Repository
public interface PatientRepository extends JpaRepository<Patient, UUID> {
    
    /**
     * Find patient by phone number
     */
    Optional<Patient> findByPhone(String phone);
    
    /**
     * Find all patients with their medical records
     */
    @Query("SELECT p FROM Patient p LEFT JOIN FETCH p.medicalRecords")
    List<Patient> findAllWithMedicalRecords();
    
    /**
     * Find patient by ID with medical records
     */
    @Query("SELECT p FROM Patient p LEFT JOIN FETCH p.medicalRecords WHERE p.id = :id")
    Optional<Patient> findByIdWithMedicalRecords(UUID id);
    
    /**
     * Check if patient exists by phone
     */
    boolean existsByPhone(String phone);
}