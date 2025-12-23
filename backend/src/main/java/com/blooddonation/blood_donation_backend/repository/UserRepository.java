package com.blooddonation.blood_donation_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blooddonation.blood_donation_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    // new
    List<User> findByBloodGroup(String bloodGroup);
}
