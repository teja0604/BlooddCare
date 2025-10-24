package com.blooddonation.blood_donation_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blooddonation.blood_donation_backend.model.Donor;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> {
    // JpaRepository already provides save(), findById(), findAll(), delete() etc.
}
