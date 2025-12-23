package com.blooddonation.blood_donation_backend.pharmacy.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonation.blood_donation_backend.pharmacy.model.Medicine;
import com.blooddonation.blood_donation_backend.pharmacy.service.MedicineService;
@RestController
@RequestMapping("/api/pharmacy")
public class PharmacyController {

    private final MedicineService medicineService;

    public PharmacyController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    @GetMapping("/medicines")
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }
    @GetMapping("/search")
    public List<Medicine> search(@RequestParam String name) {
        return medicineService.searchMedicines(name);
    }

}