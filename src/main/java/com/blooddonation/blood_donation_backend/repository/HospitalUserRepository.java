package com.blooddonation.blood_donation_backend.repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blooddonation.blood_donation_backend.model.HospitalUser;

/**
 * Hospital User Repository - Data access layer for HospitalUser entities
 */
@Repository
public interface HospitalUserRepository extends JpaRepository<HospitalUser, UUID> {
    
    /**
     * Find user by username
     */
    Optional<HospitalUser> findByUsername(String username);
    
    /**
     * Find user by email
     */
    Optional<HospitalUser> findByEmail(String email);
    
    /**
     * Find users by role
     */
    List<HospitalUser> findByRole(HospitalUser.Role role);
    
    /**
     * Find users by hospital name
     */
    List<HospitalUser> findByHospitalName(String hospitalName);
    
    /**
     * Find active users
     */
    List<HospitalUser> findByIsActiveTrue();
    
    /**
     * Check if username exists
     */
    boolean existsByUsername(String username);
    
    /**
     * Check if email exists
     */
    boolean existsByEmail(String email);
}