package com.blooddonation.blood_donation_backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonation.blood_donation_backend.model.DonationSlot;
import com.blooddonation.blood_donation_backend.service.DonationSlotService;

@RestController
@RequestMapping("/api/donations")
public class DonationSlotController {

    private final DonationSlotService slotService;

    public DonationSlotController(DonationSlotService slotService) {
        this.slotService = slotService;
    }

    @GetMapping("/slots")
    public List<DonationSlot> getSlots(@RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date);
        return slotService.getAvailableSlots(localDate);
    }

    @PostMapping("/book")
    public DonationSlot bookSlot(@RequestBody BookingRequest request) {
        return slotService.bookSlot(request.getSlotId(), request.getDonorId());
    }

    // DTO for booking request
    public static class BookingRequest {
        private Long slotId;
        private Long donorId;

        public Long getSlotId() { return slotId; }
        public void setSlotId(Long slotId) { this.slotId = slotId; }
        public Long getDonorId() { return donorId; }
        public void setDonorId(Long donorId) { this.donorId = donorId; }
    }
}
