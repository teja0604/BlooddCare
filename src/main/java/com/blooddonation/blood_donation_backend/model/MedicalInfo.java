package com.blooddonation.blood_donation_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MedicalInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String infoType;
    private String details;

    @Column(name = "user_id") // Add this
    private Long userId;

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInfoType() { return infoType; }
    public void setInfoType(String infoType) { this.infoType = infoType; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
