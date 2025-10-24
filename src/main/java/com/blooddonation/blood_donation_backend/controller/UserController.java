package com.blooddonation.blood_donation_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonation.blood_donation_backend.dto.UserProfileDto;
import com.blooddonation.blood_donation_backend.model.User;
import com.blooddonation.blood_donation_backend.repository.UserRepository;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "bearerAuth")  // 🔑 tells Swagger to use JWT
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(401).build();
        }

        String email = auth.getName();
        User u = userRepository.findByEmail(email).orElse(null);
        if (u == null) {
            return ResponseEntity.status(404).build();
        }

        UserProfileDto dto = new UserProfileDto(
                u.getId(),
                u.getName(),
                u.getEmail(),
                String.valueOf(u.getRole()),
                u.getBloodGroup()
        );
        return ResponseEntity.ok(dto);
    }
}
