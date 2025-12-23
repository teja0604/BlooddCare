package com.blooddonation.blood_donation_backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.blooddonation.blood_donation_backend.model.Hospital;
import com.blooddonation.blood_donation_backend.repository.HospitalRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HospitalService {

    private final HospitalRepository repo;

    public List<Hospital> findAll() {
        return repo.findAll();
    }

    public Optional<Hospital> findById(Long id) {
        return repo.findById(id);
    }

    public Hospital save(Hospital hospital) {
        return repo.save(hospital);
    }

    // merge/replace provided keys into existing stock
    public Hospital updateStock(Long id, Map<String, Integer> newStock) {
        Hospital h = repo.findById(id).orElseThrow(() -> new NoSuchElementException("Hospital not found: " + id));
        Map<String, Integer> current = Optional.ofNullable(h.getBloodStock()).orElse(new HashMap<>());
        for (Map.Entry<String, Integer> e : newStock.entrySet()) {
            current.put(e.getKey(), e.getValue()); // replace with provided value
        }
        h.setBloodStock(current);
        return repo.save(h);
    }

    // adjust stock by deltas (delta may be positive or negative)
    public Hospital adjustStock(Long id, Map<String, Integer> deltas) {
        Hospital h = repo.findById(id).orElseThrow(() -> new NoSuchElementException("Hospital not found: " + id));
        Map<String, Integer> current = Optional.ofNullable(h.getBloodStock()).orElse(new HashMap<>());
        for (Map.Entry<String, Integer> e : deltas.entrySet()) {
            String key = e.getKey();
            int delta = Optional.ofNullable(e.getValue()).orElse(0);
            int prev = Optional.ofNullable(current.get(key)).orElse(0);
            int updated = prev + delta;
            if (updated < 0) updated = 0; // don't go negative
            current.put(key, updated);
        }
        h.setBloodStock(current);
        return repo.save(h);
    }
}