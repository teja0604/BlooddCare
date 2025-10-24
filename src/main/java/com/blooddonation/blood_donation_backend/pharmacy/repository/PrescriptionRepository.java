package com.blooddonation.blood_donation_backend.pharmacy.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blooddonation.blood_donation_backend.pharmacy.model.Prescription;


public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
List<Prescription> findByUserIdOrderByUploadedAtDesc(Long userId);
}