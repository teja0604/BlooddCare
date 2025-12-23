package com.blooddonation.blood_donation_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.blooddonation.blood_donation_backend.model.Appointment;
import com.blooddonation.blood_donation_backend.model.LabResult;
import com.blooddonation.blood_donation_backend.model.LabTestPackage;
import com.blooddonation.blood_donation_backend.repository.AppointmentRepository;
import com.blooddonation.blood_donation_backend.repository.LabResultRepository;
import com.blooddonation.blood_donation_backend.repository.LabTestPackageRepository;

@Service
public class LabService {

    private final LabTestPackageRepository testRepo;
    private final LabResultRepository resultRepo;
    private final AppointmentRepository appointmentRepo;

    public LabService(LabTestPackageRepository testRepo, LabResultRepository resultRepo, AppointmentRepository appointmentRepo) {
        this.testRepo = testRepo;
        this.resultRepo = resultRepo;
        this.appointmentRepo = appointmentRepo;
    }

    // LabTestPackage
    public List<LabTestPackage> getAllTestPackages() { return testRepo.findAll(); }
    public Optional<LabTestPackage> getTestPackage(Long id) { return testRepo.findById(id); }
    public LabTestPackage addTestPackage(LabTestPackage test) { return testRepo.save(test); }

    // LabResult
    public List<LabResult> getAllResults() { return resultRepo.findAll(); }
    public LabResult addResult(LabResult result) { return resultRepo.save(result); }

    // Appointment
    public List<Appointment> getAllAppointments() { return appointmentRepo.findAll(); }
    public Appointment addAppointment(Appointment appt) { return appointmentRepo.save(appt); }
    public Appointment updateAppointment(Appointment appt) { return appointmentRepo.save(appt); }
    public void deleteAppointment(Long id) { appointmentRepo.deleteById(id); }
}
