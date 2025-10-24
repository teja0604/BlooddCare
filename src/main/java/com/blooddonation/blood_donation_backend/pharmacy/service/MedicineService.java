package com.blooddonation.blood_donation_backend.pharmacy.service;

import com.blooddonation.blood_donation_backend.pharmacy.model.Medicine;
import com.blooddonation.blood_donation_backend.pharmacy.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {

    private final MedicineRepository repo;

    public MedicineService(MedicineRepository repo) {
        this.repo = repo;
    }

    // Get all medicines
    public List<Medicine> getAllMedicines() {
        return repo.findAll();
    }

    // Get medicine by ID
    public Optional<Medicine> getMedicineById(Long id) {
        return repo.findById(id);
    }

    // Search medicines by name (contains, case-insensitive)
    public List<Medicine> searchMedicines(String keyword) {
        return repo.findByNameContainingIgnoreCase(keyword);
    }

    // Add new medicine
    public Medicine addMedicine(Medicine medicine) {
        return repo.save(medicine);
    }

    // Update existing medicine
    public Medicine updateMedicine(Long id, Medicine updated) {
        return repo.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setStock(updated.getStock());
            existing.setExpiryDate(updated.getExpiryDate());
            existing.setPrice(updated.getPrice());
            existing.setDescription(updated.getDescription());
            existing.setImageUrl(updated.getImageUrl());
            return repo.save(existing);
        }).orElseThrow(() -> new RuntimeException("Medicine not found with id " + id));
    }

    // Delete medicine
    public void deleteMedicine(Long id) {
        repo.deleteById(id);
    }
}
