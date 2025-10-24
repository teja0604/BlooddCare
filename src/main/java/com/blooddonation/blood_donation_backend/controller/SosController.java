package com.blooddonation.blood_donation_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonation.blood_donation_backend.model.SosEvent;
import com.blooddonation.blood_donation_backend.repository.SosRepository;

@RestController
@RequestMapping("/api/sos")
@CrossOrigin(origins = "*")
public class SosController {

    private final SosRepository sosRepository;

    public SosController(SosRepository sosRepository) {
        this.sosRepository = sosRepository;
    }

    @PostMapping
    public ResponseEntity<SosEvent> createSOS(@RequestBody SosEvent event) {
        SosEvent saved = sosRepository.save(event);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public List<SosEvent> getAllSOS() {
        return sosRepository.findAll();
    }
}
