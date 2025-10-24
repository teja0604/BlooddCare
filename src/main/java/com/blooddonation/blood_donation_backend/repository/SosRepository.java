package com.blooddonation.blood_donation_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blooddonation.blood_donation_backend.model.SosEvent;

public interface SosRepository extends JpaRepository<SosEvent, Long> {
}
