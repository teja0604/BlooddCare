package com.blooddonation.blood_donation_backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.blooddonation.blood_donation_backend.model.BloodRequest;
import com.blooddonation.blood_donation_backend.model.DonationSlot;
import com.blooddonation.blood_donation_backend.model.Donor;
import com.blooddonation.blood_donation_backend.model.User;
import com.blooddonation.blood_donation_backend.repository.BloodRequestRepository;
import com.blooddonation.blood_donation_backend.repository.DonationSlotRepository;
import com.blooddonation.blood_donation_backend.repository.DonorRepository;

@Service
public class DonorService {

    private final DonorRepository donorRepository;
    private final BloodRequestRepository bloodRequestRepository;
    private final DonationSlotRepository donationSlotRepository;

    public DonorService(DonorRepository donorRepository,
                        BloodRequestRepository bloodRequestRepository,
                        DonationSlotRepository donationSlotRepository) {
        this.donorRepository = donorRepository;
        this.bloodRequestRepository = bloodRequestRepository;
        this.donationSlotRepository = donationSlotRepository;
    }

    // -------- Donor CRUD --------
    public Donor registerDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    public Optional<Donor> getDonorById(Long id) {
        return donorRepository.findById(id);
    }

    public Donor updateDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    // -------- Blood Requests --------
    public List<BloodRequest> getAllBloodRequests() {
        return bloodRequestRepository.findAll();
    }

    public BloodRequest createBloodRequest(String patientName, String bloodGroup, String location, User requestedBy) {
        BloodRequest request = new BloodRequest(patientName, bloodGroup, location, "PENDING", requestedBy);
        return bloodRequestRepository.save(request);
    }

    public BloodRequest acceptRequest(Long requestId, Long donorId) {
        BloodRequest request = bloodRequestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus("ACCEPTED");
        // Set the donor who accepted
        request.setRequestedBy(null); // Or store the donor somewhere if needed
        return bloodRequestRepository.save(request);
    }

    public BloodRequest declineRequest(Long requestId) {
        BloodRequest request = bloodRequestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus("REJECTED");
        return bloodRequestRepository.save(request);
    }

    // -------- Search Requests --------
    public List<BloodRequest> searchByBloodGroup(String bloodGroup) {
        return bloodRequestRepository.findByBloodGroupIgnoreCase(bloodGroup);
    }

    public List<BloodRequest> searchByLocation(String location) {
        return bloodRequestRepository.findByLocationIgnoreCase(location);
    }

    public List<BloodRequest> searchByBloodGroupAndLocation(String bloodGroup, String location) {
        return bloodRequestRepository.findByBloodGroupAndLocationIgnoreCase(bloodGroup, location);
    }

    public List<BloodRequest> getRequestsBetweenDates(LocalDateTime startDate, LocalDateTime endDate) {
        return bloodRequestRepository.findByRequestedAtBetween(startDate, endDate);
    }

    public List<BloodRequest> getRequestsByStatusAndDateRange(String status, LocalDateTime startDate, LocalDateTime endDate) {
        return bloodRequestRepository.findByStatusAndRequestedAtBetween(status, startDate, endDate);
    }

    // -------- Donation Slots --------
    public List<DonationSlot> getAvailableSlotsByDate(String date) {
        return donationSlotRepository.findByDateAndIsBookedFalse(LocalDate.parse(date));
    }

    public DonationSlot bookSlot(Long slotId, Long donorId) {
        DonationSlot slot = donationSlotRepository.findById(slotId)
            .orElseThrow(() -> new RuntimeException("Slot not found"));
        if (slot.isBooked()) {
            throw new RuntimeException("Slot already booked");
        }
        slot.setBooked(true);
        slot.setDonorId(donorId);
        return donationSlotRepository.save(slot);
    }
}
