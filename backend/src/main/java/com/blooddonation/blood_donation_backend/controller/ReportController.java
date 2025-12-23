package com.blooddonation.blood_donation_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonation.blood_donation_backend.model.BloodRequest;
import com.blooddonation.blood_donation_backend.model.Hospital;
import com.blooddonation.blood_donation_backend.repository.BloodRequestRepository;
import com.blooddonation.blood_donation_backend.repository.HospitalRepository;
import com.blooddonation.blood_donation_backend.repository.UserRepository;

@RestController
@RequestMapping("/api/admin/reports")
@PreAuthorize("hasRole('ADMIN')")
public class ReportController {

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    @Autowired
    private UserRepository userRepository;

    // 1. Get total counts
    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary() {
        Map<String, Object> report = new HashMap<>();
        report.put("totalHospitals", hospitalRepository.count());
        report.put("totalRequests", bloodRequestRepository.count());
        report.put("totalUsers", userRepository.count());
        return ResponseEntity.ok(report);
    }

    // 2. Get blood stock summary (all hospitals combined)
    @GetMapping("/stock")
    public ResponseEntity<Map<String, Integer>> getBloodStockSummary() {
        List<Hospital> hospitals = hospitalRepository.findAll();
        Map<String, Integer> stockSummary = new HashMap<>();

        for (Hospital h : hospitals) {
            if (h.getBloodStock() != null) {
                h.getBloodStock().forEach((group, qty) ->
                    stockSummary.merge(group, qty, Integer::sum)
                );
            }
        }

        return ResponseEntity.ok(stockSummary);
    }

    // 3. Get request status summary (counts)
    @GetMapping("/requests/summary")
    public ResponseEntity<Map<String, Long>> getRequestsSummary() {
        Map<String, Long> statusSummary = new HashMap<>();
        statusSummary.put("Pending", bloodRequestRepository.countByStatus("Pending"));
        statusSummary.put("Approved", bloodRequestRepository.countByStatus("Approved"));
        statusSummary.put("Rejected", bloodRequestRepository.countByStatus("Rejected"));
        return ResponseEntity.ok(statusSummary);
    }

    // 4. Get detailed requests by status (lists)
    @GetMapping("/requests/{status}")
    public ResponseEntity<List<BloodRequest>> getRequestsByStatus(@PathVariable String status) {
        List<BloodRequest> requests = bloodRequestRepository.findByStatus(status);
        return ResponseEntity.ok(requests);
    }


    // 5. Get requests between two dates
    @GetMapping("/requests/by-date")
    public ResponseEntity<List<BloodRequest>> getRequestsByDate(
            @RequestParam String startDate,
            @RequestParam String endDate) {

        // Convert String to LocalDateTime
        java.time.LocalDateTime start = java.time.LocalDate.parse(startDate).atStartOfDay();
        java.time.LocalDateTime end = java.time.LocalDate.parse(endDate).atTime(23, 59, 59);

        List<BloodRequest> requests = bloodRequestRepository.findByRequestedAtBetween(start, end);
        return ResponseEntity.ok(requests);
    }
        // 6. Get requests by status + date range
    @GetMapping("/requests/by-status-date")
    public ResponseEntity<List<BloodRequest>> getRequestsByStatusAndDate(
            @RequestParam String status,
            @RequestParam String startDate,
            @RequestParam String endDate) {

        java.time.LocalDateTime start = java.time.LocalDate.parse(startDate).atStartOfDay();
        java.time.LocalDateTime end = java.time.LocalDate.parse(endDate).atTime(23, 59, 59);

        List<BloodRequest> requests = bloodRequestRepository.findByStatusAndRequestedAtBetween(
                status.toUpperCase(), start, end);

        return ResponseEntity.ok(requests);
    }

}
