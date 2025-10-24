package com.blooddonation.blood_donation_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonation.blood_donation_backend.model.EmergencyContact;
import com.blooddonation.blood_donation_backend.model.EmergencyTip;
import com.blooddonation.blood_donation_backend.model.MedicalInfo;
import com.blooddonation.blood_donation_backend.model.NearbyHospital;
import com.blooddonation.blood_donation_backend.repository.EmergencyContactRepository;
import com.blooddonation.blood_donation_backend.repository.EmergencyTipRepository;
import com.blooddonation.blood_donation_backend.repository.MedicalInfoRepository;
import com.blooddonation.blood_donation_backend.repository.NearbyHospitalRepository;

@RestController
@RequestMapping("/api/emergency")
@CrossOrigin(origins = "*") // adjust your frontend URL
public class EmergencyController {

    @Autowired
    private EmergencyContactRepository contactRepo;

    @Autowired
    private NearbyHospitalRepository hospitalRepo;

    @Autowired
    private EmergencyTipRepository tipRepo;

    @Autowired
    private MedicalInfoRepository medicalRepo;

    @GetMapping("/contacts")
    public List<EmergencyContact> getContacts() {
        return contactRepo.findAll();
    }

    @GetMapping("/hospitals")
    public List<NearbyHospital> getHospitals() {
        return hospitalRepo.findAll();
    }

    @GetMapping("/tips")
    public List<EmergencyTip> getTips() {
        return tipRepo.findAll();
    }

    @GetMapping("/medical-info/{userId}")
    public ResponseEntity<MedicalInfo> getMedicalInfo(@PathVariable Long userId) {
        return medicalRepo.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/medical-info")
    public MedicalInfo saveMedicalInfo(@RequestBody MedicalInfo info) {
        return medicalRepo.save(info);
    }
}
