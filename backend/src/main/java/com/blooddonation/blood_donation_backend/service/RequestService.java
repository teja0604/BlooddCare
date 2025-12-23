package com.blooddonation.blood_donation_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blooddonation.blood_donation_backend.model.BloodRequest;
import com.blooddonation.blood_donation_backend.model.Schedule;
import com.blooddonation.blood_donation_backend.repository.BloodRequestRepository;
import com.blooddonation.blood_donation_backend.repository.ScheduleRepository;

@Service
public class RequestService {

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    // Get all requests
    public List<BloodRequest> getAllRequests() {
        return bloodRequestRepository.findAll();
    }

    // Get request by ID
    public Optional<BloodRequest> getRequestById(Long id) {
        return bloodRequestRepository.findById(id);
    }

    // Accept request (update status)
    public BloodRequest acceptRequest(Long id) throws Exception {
        BloodRequest request = bloodRequestRepository.findById(id)
                .orElseThrow(() -> new Exception("Request not found"));
        request.setStatus("Approved");
        return bloodRequestRepository.save(request);
    }

    // Create schedule for a request
    public Schedule createSchedule(Long requestId, java.time.LocalDateTime scheduledAt) throws Exception {
        BloodRequest request = bloodRequestRepository.findById(requestId)
                .orElseThrow(() -> new Exception("Request not found"));
        Schedule schedule = new Schedule();
        schedule.setBloodRequest(request);
        schedule.setScheduledAt(scheduledAt);
        return scheduleRepository.save(schedule);
    }
}
