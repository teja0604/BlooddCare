package com.blooddonation.blood_donation_backend.pharmacy.model;


import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "prescriptions")
public class Prescription {
@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


@Column(nullable = false)
private Long userId;


@Column(nullable = false)
private String fileUrl; // stored path or cloud URL


private OffsetDateTime uploadedAt = OffsetDateTime.now();


// getters & setters
public Long getId() { return id; }
public Long getUserId() { return userId; }
public void setUserId(Long userId) { this.userId = userId; }
public String getFileUrl() { return fileUrl; }
public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
public OffsetDateTime getUploadedAt() { return uploadedAt; }
}