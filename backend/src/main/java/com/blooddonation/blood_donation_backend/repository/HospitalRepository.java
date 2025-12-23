package com.blooddonation.blood_donation_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blooddonation.blood_donation_backend.model.Hospital;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> { }