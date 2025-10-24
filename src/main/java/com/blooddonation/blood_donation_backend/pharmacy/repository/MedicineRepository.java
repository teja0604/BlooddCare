package com.blooddonation.blood_donation_backend.pharmacy.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.blooddonation.blood_donation_backend.pharmacy.model.Medicine;


public interface MedicineRepository extends JpaRepository<Medicine, Long> {
@Query("SELECT m FROM Medicine m WHERE lower(m.name) LIKE lower(concat('%', :q, '%'))")
List<Medicine> search(@Param("q") String q);
// Custom finder method for search
    List<Medicine> findByNameContainingIgnoreCase(String keyword);
}