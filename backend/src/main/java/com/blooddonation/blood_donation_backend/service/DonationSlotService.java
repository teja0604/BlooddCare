package com.blooddonation.blood_donation_backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.blooddonation.blood_donation_backend.model.DonationSlot;
import com.blooddonation.blood_donation_backend.repository.DonationSlotRepository;

@Service
public class DonationSlotService {

    private final DonationSlotRepository slotRepository;

    public DonationSlotService(DonationSlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    // Get all slots for a date
    public List<DonationSlot> getSlotsByDate(LocalDate date) {
        return slotRepository.findByDate(date);
    }

    // Check if a slot is booked
    public boolean isSlotBooked(Long slotId) {
        return slotRepository.findById(slotId)
                .map(DonationSlot::isBooked)
                .orElse(false);
    }

    // Book a slot
    public DonationSlot bookSlot(Long slotId, Long donorId) {
        DonationSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        if (slot.isBooked()) {
            throw new RuntimeException("Slot already booked");
        }

        slot.setBooked(true);
        slot.setDonorId(donorId);
        return slotRepository.save(slot);
    }

    // Optional: get only available slots for a date
    public List<DonationSlot> getAvailableSlots(LocalDate date) {
        return slotRepository.findByDateAndIsBookedFalse(date);
    }
}
