package com.blooddonation.blood_donation_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonation.blood_donation_backend.dto.UserProfileDto;
import com.blooddonation.blood_donation_backend.model.User;
import com.blooddonation.blood_donation_backend.repository.UserRepository;
import com.blooddonation.blood_donation_backend.security.CustomerUserDetailsService;
import com.blooddonation.blood_donation_backend.security.JwtUtil;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/donors")
@SecurityRequirement(name = "bearerAuth")   // ✅ Added this
public class DonorController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final CustomerUserDetailsService customUserDetailsService;

    public DonorController(UserRepository userRepository, JwtUtil jwtUtil, CustomerUserDetailsService customUserDetailsService) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    @GetMapping
    public ResponseEntity<List<UserProfileDto>> donorsByGroup(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam("group") String group
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.getEmailFromToken(token);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

        if (!jwtUtil.validateToken(token, userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<User> users = userRepository.findByBloodGroup(group);
        List<UserProfileDto> donors = users.stream()
                .filter(u -> "DONOR".equalsIgnoreCase(String.valueOf(u.getRole())))
                .map(u -> new UserProfileDto(
                        u.getId(),
                        u.getName(),
                        u.getEmail(),
                        String.valueOf(u.getRole()),
                        u.getBloodGroup()))
                .toList();

        return ResponseEntity.ok(donors);
    }
}
