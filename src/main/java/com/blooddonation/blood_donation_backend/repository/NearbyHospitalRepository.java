package com.blooddonation.blood_donation_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blooddonation.blood_donation_backend.model.NearbyHospital;


@Repository
public interface NearbyHospitalRepository extends JpaRepository<NearbyHospital, Long> {Optional<NearbyHospital> findByUserId(Long userId);}
