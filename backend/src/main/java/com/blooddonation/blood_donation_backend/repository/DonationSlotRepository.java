package com.blooddonation.blood_donation_backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blooddonation.blood_donation_backend.model.DonationSlot;

@Repository
public interface DonationSlotRepository extends JpaRepository<DonationSlot, Long> {

    // Find all slots for a specific date
    List<DonationSlot> findByDate(LocalDate date);

    // Optional: find only available (not booked) slots
    List<DonationSlot> findByDateAndIsBookedFalse(LocalDate date);
}
