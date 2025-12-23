package com.blooddonation.blood_donation_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonation.blood_donation_backend.model.Appointment;
import com.blooddonation.blood_donation_backend.model.LabResult;
import com.blooddonation.blood_donation_backend.model.LabTestPackage;
import com.blooddonation.blood_donation_backend.service.LabService;

@RestController
@RequestMapping("/api/lab")
@CrossOrigin("*")
public class LabController {

    private final LabService labService;

    public LabController(LabService labService) {
        this.labService = labService;
    }

    // Test Packages
    @GetMapping("/tests")
    public List<LabTestPackage> getTestPackages() { return labService.getAllTestPackages(); }

    @PostMapping("/tests")
    public LabTestPackage addTestPackage(@RequestBody LabTestPackage test) { return labService.addTestPackage(test); }

    // Lab Results
    @GetMapping("/results")
    public List<LabResult> getResults() { return labService.getAllResults(); }

    @PostMapping("/results")
    public LabResult addResult(@RequestBody LabResult result) { return labService.addResult(result); }

    // Appointments
    @GetMapping("/appointments")
    public List<Appointment> getAppointments() { return labService.getAllAppointments(); }

    @PostMapping("/appointments")
    public Appointment addAppointment(@RequestBody Appointment appt) { return labService.addAppointment(appt); }

    @PutMapping("/appointments")
    public Appointment updateAppointment(@RequestBody Appointment appt) { return labService.updateAppointment(appt); }

    @DeleteMapping("/appointments/{id}")
    public void deleteAppointment(@PathVariable Long id) { labService.deleteAppointment(id); }
}