package com.blooddonation.blood_donation_backend.dto;

public record UserProfileDto(
        Long id,
        String name,
        String email,
        String role,
        String bloodGroup
) {}