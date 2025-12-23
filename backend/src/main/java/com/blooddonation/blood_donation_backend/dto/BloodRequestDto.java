package com.blooddonation.blood_donation_backend.dto;

import java.time.LocalDateTime;

public class BloodRequestDto {
    private Long id;
    private String patientName;
    private String bloodGroup;
    private String location;
    private String status;
    private LocalDateTime requestedAt;
    private String requestedBy;

    public BloodRequestDto(Long id, String patientName, String bloodGroup, String location,
                           String status, LocalDateTime requestedAt, String requestedBy) {
        this.id = id;
        this.patientName = patientName;
        this.bloodGroup = bloodGroup;
        this.location = location;
        this.status = status;
        this.requestedAt = requestedAt;
        this.requestedBy = requestedBy;
    }

    // getters
    public Long getId() { return id; }
    public String getPatientName() { return patientName; }
    public String getBloodGroup() { return bloodGroup; }
    public String getLocation() { return location; }
    public String getStatus() { return status; }
    public LocalDateTime getRequestedAt() { return requestedAt; }
    public String getRequestedBy() { return requestedBy; }
}
