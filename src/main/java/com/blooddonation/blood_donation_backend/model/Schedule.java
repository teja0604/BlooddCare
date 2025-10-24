// Schedule.java
package com.blooddonation.blood_donation_backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime scheduledAt;

    @ManyToOne
    @JoinColumn(name = "request_id")
    private BloodRequest bloodRequest;  // <-- field name matches your service

    public Schedule() {}

    public Schedule(BloodRequest bloodRequest, LocalDateTime scheduledAt) {
        this.bloodRequest = bloodRequest;
        this.scheduledAt = scheduledAt;
    }

    // Getters and setters
    public Long getId() { return id; }
    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }

    public BloodRequest getBloodRequest() { return bloodRequest; }  // getter
    public void setBloodRequest(BloodRequest bloodRequest) {          // setter
        this.bloodRequest = bloodRequest;
    }
}
