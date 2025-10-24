package com.blooddonation.blood_donation_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blooddonation.blood_donation_backend.model.MedicalInfo;


@Repository
public interface MedicalInfoRepository extends JpaRepository<MedicalInfo, Long> {
    Optional<MedicalInfo> findByUserId(Long userId);
}
