package com.blooddonation.blood_donation_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blooddonation.blood_donation_backend.model.EmergencyTip;



@Repository
public interface EmergencyTipRepository extends JpaRepository<EmergencyTip, Long> {Optional<EmergencyTip> findByUserId(Long userId);}
