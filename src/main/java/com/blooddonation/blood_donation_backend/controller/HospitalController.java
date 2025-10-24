package com.blooddonation.blood_donation_backend.controller;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonation.blood_donation_backend.model.Hospital;
import com.blooddonation.blood_donation_backend.service.HospitalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalService service;

    @GetMapping
    public List<Hospital> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hospital> getOne(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Hospital> create(@RequestBody Hospital hospital) {
        Hospital saved = service.save(hospital);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // merge/replace provided keys
    @PutMapping("/{id}/stock")
    public ResponseEntity<Hospital> updateStock(@PathVariable Long id, @RequestBody Map<String, Integer> stock) {
        try {
            Hospital updated = service.updateStock(id, stock);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    // adjust by deltas: {"A+": -1, "O+": 2}
    @PutMapping("/{id}/stock/adjust")
    public ResponseEntity<Hospital> adjustStock(@PathVariable Long id, @RequestBody Map<String, Integer> deltas) {
        try {
            Hospital updated = service.adjustStock(id, deltas);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}