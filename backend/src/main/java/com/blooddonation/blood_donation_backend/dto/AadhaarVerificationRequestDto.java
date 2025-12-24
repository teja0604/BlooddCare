package com.blooddonation.blood_donation_backend.dto;

/**
 * DTO for Aadhaar verification request
 */
public class AadhaarVerificationRequestDto {
    
    private String aadhaarNumber;
    
    // Constructors
    public AadhaarVerificationRequestDto() {}
    
    public AadhaarVerificationRequestDto(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }
    
    // Getters and Setters
    public String getAadhaarNumber() { return aadhaarNumber; }
    public void setAadhaarNumber(String aadhaarNumber) { this.aadhaarNumber = aadhaarNumber; }
}