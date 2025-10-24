package com.blooddonation.blood_donation_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonation.blood_donation_backend.model.BloodRequest;
import com.blooddonation.blood_donation_backend.model.Hospital;
import com.blooddonation.blood_donation_backend.model.User;
import com.blooddonation.blood_donation_backend.repository.BloodRequestRepository;
import com.blooddonation.blood_donation_backend.repository.HospitalRepository;
import com.blooddonation.blood_donation_backend.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')") // 👈 All methods only for ADMIN
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    // 1. Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 2. Get all hospitals
    @GetMapping("/hospitals")
    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    // 3. Update hospital stock
    @PutMapping("/hospitals/{id}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable Long id, @RequestBody Hospital hospitalDetails) {
        return hospitalRepository.findById(id).map(hospital -> {
            hospital.setName(hospitalDetails.getName());
            hospital.setLocation(hospitalDetails.getLocation());
            hospital.setContact(hospitalDetails.getContact());
            hospital.setBloodStock(hospitalDetails.getBloodStock());
            return ResponseEntity.ok(hospitalRepository.save(hospital));
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4. Delete hospital
    @DeleteMapping("/hospitals/{id}")
    public ResponseEntity<Void> deleteHospital(@PathVariable Long id) {
        hospitalRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // 5. Get all blood requests
    @GetMapping("/requests")
    public List<BloodRequest> getAllRequests() {
        return bloodRequestRepository.findAll();
    }
}