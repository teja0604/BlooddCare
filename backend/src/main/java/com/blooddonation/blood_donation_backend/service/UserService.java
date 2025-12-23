package com.blooddonation.blood_donation_backend.service;

import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.blooddonation.blood_donation_backend.model.User;
import com.blooddonation.blood_donation_backend.repository.UserRepository;
import com.blooddonation.blood_donation_backend.security.CustomerUserDetailsService;
import com.blooddonation.blood_donation_backend.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder passwordEncoder;
    private final CustomerUserDetailsService customUserDetailsService;

    // Registration
    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // BCrypt encode
        return userRepository.save(user);
    }

    // Login
    public Map<String, Object> login(String email, String password) {
        try {
            // Authenticate
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(email, password);
            authenticationManager.authenticate(auth);

            // Load user
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Generate JWT
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
            String token = jwtUtil.generateToken(userDetails);

            return Map.of(
                    "token", token,
                    "role", user.getRole(),
                    "name", user.getName(),
                    "bloodGroup", user.getBloodGroup()
            );
        } catch (org.springframework.security.core.AuthenticationException ex) {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
