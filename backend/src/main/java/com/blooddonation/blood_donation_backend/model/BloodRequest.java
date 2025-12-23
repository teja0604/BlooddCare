package com.blooddonation.blood_donation_backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;
    private String bloodGroup;
    private String location;
    private String status; // PENDING, ACCEPTED, REJECTED
    private LocalDateTime requestedAt;

    @ManyToOne
    @JoinColumn(name = "requested_by")
    private User requestedBy;  // who created request

    public BloodRequest() {}

    public BloodRequest(String patientName, String bloodGroup, String location, String status, User requestedBy) {
        this.patientName = patientName;
        this.bloodGroup = bloodGroup;
        this.location = location;
        this.status = status;
        this.requestedAt = LocalDateTime.now();
        this.requestedBy = requestedBy;
    }

    // getters and setters
    public Long getId() { return id; }
    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getRequestedAt() { return requestedAt; }
    public void setRequestedAt(LocalDateTime requestedAt) { this.requestedAt = requestedAt; }

    public User getRequestedBy() { return requestedBy; }
    public void setRequestedBy(User requestedBy) { this.requestedBy = requestedBy; }
}
