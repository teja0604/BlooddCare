package com.blooddonation.blood_donation_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blooddonation.blood_donation_backend.model.LabResult;
@Repository
public interface LabResultRepository extends JpaRepository<LabResult, Long> {}