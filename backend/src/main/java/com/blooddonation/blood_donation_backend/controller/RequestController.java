package com.blooddonation.blood_donation_backend.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.blooddonation.blood_donation_backend.dto.BloodRequestDto;
import com.blooddonation.blood_donation_backend.model.BloodRequest;
import com.blooddonation.blood_donation_backend.model.Hospital;
import com.blooddonation.blood_donation_backend.model.Schedule;
import com.blooddonation.blood_donation_backend.model.User;
import com.blooddonation.blood_donation_backend.repository.BloodRequestRepository;
import com.blooddonation.blood_donation_backend.repository.HospitalRepository;
import com.blooddonation.blood_donation_backend.repository.UserRepository;
import com.blooddonation.blood_donation_backend.security.CustomerUserDetailsService;
import com.blooddonation.blood_donation_backend.security.JwtUtil;
import com.blooddonation.blood_donation_backend.service.RequestService;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    private final BloodRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;
    private final JwtUtil jwtUtil;
    private final CustomerUserDetailsService customUserDetailsService;

    @Autowired
    private RequestService requestService;

    public RequestController(BloodRequestRepository requestRepository,
                             UserRepository userRepository,
                             HospitalRepository hospitalRepository,
                             JwtUtil jwtUtil,
                             CustomerUserDetailsService customUserDetailsService) {
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
        this.hospitalRepository = hospitalRepository;
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    // 🔹 Create a new blood request
    @PostMapping
    public ResponseEntity<BloodRequestDto> createRequest(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody BloodRequest reqBody) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String token = authHeader.substring(7);
        String email = jwtUtil.getEmailFromToken(token);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

        if (!jwtUtil.validateToken(token, userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User requester = userRepository.findByEmail(email).orElseThrow();

        BloodRequest request = new BloodRequest(
                reqBody.getPatientName(),
                reqBody.getBloodGroup(),
                reqBody.getLocation(),
                "PENDING",
                requester
        );
        requestRepository.save(request);

        BloodRequestDto dto = new BloodRequestDto(
                request.getId(),
                request.getPatientName(),
                request.getBloodGroup(),
                request.getLocation(),
                request.getStatus(),
                request.getRequestedAt(),
                requester.getName()
        );
        return ResponseEntity.ok(dto);
    }

    // 🔹 Get all requests
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','HOSPITAL','DONOR','USER')")
    public ResponseEntity<List<BloodRequestDto>> getAllRequests(
            @RequestHeader("Authorization") String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String token = authHeader.substring(7);
        String email = jwtUtil.getEmailFromToken(token);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

        if (!jwtUtil.validateToken(token, userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<BloodRequestDto> dtos = requestRepository.findAll().stream()
                .map(r -> new BloodRequestDto(
                        r.getId(),
                        r.getPatientName(),
                        r.getBloodGroup(),
                        r.getLocation(),
                        r.getStatus(),
                        r.getRequestedAt(),
                        r.getRequestedBy().getName()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    // 🔹 Accept request (update status to APPROVED)
    @PostMapping("/{id}/accept")
    @PreAuthorize("hasAnyRole('HOSPITAL','ADMIN')")
    public ResponseEntity<?> acceptRequest(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id,
            @RequestParam(value = "hospitalId", required = false) Long hospitalId) throws Exception {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String token = authHeader.substring(7);
        String email = jwtUtil.getEmailFromToken(token);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

        if (!jwtUtil.validateToken(token, userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        BloodRequest request = requestRepository.findById(id).orElseThrow();

        // Reduce hospital stock when approving
        if (hospitalId != null) {
            Hospital hospital = hospitalRepository.findById(hospitalId).orElseThrow();
            Map<String, Integer> stock = hospital.getBloodStock();
            String group = request.getBloodGroup();

            if (!stock.containsKey(group) || stock.get(group) <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NOT_ENOUGH_STOCK");
            }
            stock.put(group, stock.get(group) - 1);
            hospital.setBloodStock(stock);
            hospitalRepository.save(hospital);
        }

        request.setStatus("APPROVED");
        requestRepository.save(request);

        return ResponseEntity.ok(request);
    }

    // 🔹 Get request details
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','HOSPITAL','DONOR','USER')")
    public ResponseEntity<BloodRequest> getRequest(@PathVariable Long id) throws Exception {
        BloodRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new Exception("Request not found"));
        return ResponseEntity.ok(request);
    }

    // 🔹 Schedule donation for a request
    @PostMapping("/{id}/schedule")
    @PreAuthorize("hasAnyRole('HOSPITAL','ADMIN')")
    public ResponseEntity<Schedule> createSchedule(@PathVariable Long id,
                                                   @RequestParam String datetime) throws Exception {
        java.time.LocalDateTime scheduledAt = java.time.LocalDateTime.parse(datetime);
        Schedule schedule = requestService.createSchedule(id, scheduledAt);
        return ResponseEntity.ok(schedule);
    }

    // 🔹 Search requests by blood group and/or location
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','HOSPITAL','DONOR','USER')")
    public ResponseEntity<List<BloodRequestDto>> searchRequests(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(required = false) String bloodGroup,
            @RequestParam(required = false) String location) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String token = authHeader.substring(7);
        String email = jwtUtil.getEmailFromToken(token);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

        if (!jwtUtil.validateToken(token, userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<BloodRequest> results;

        if (bloodGroup != null && location != null) {
            results = requestRepository.findByBloodGroupAndLocationIgnoreCase(bloodGroup, location);
        } else if (bloodGroup != null) {
            results = requestRepository.findByBloodGroupIgnoreCase(bloodGroup);
        } else if (location != null) {
            results = requestRepository.findByLocationIgnoreCase(location);
        } else {
            results = requestRepository.findAll();
        }

        List<BloodRequestDto> dtos = results.stream()
                .map(r -> new BloodRequestDto(
                        r.getId(),
                        r.getPatientName(),
                        r.getBloodGroup(),
                        r.getLocation(),
                        r.getStatus(),
                        r.getRequestedAt(),
                        r.getRequestedBy().getName()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}
