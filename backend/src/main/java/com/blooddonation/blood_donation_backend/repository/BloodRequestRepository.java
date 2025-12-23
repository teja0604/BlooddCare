package com.blooddonation.blood_donation_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blooddonation.blood_donation_backend.model.BloodRequest;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {

    // Count requests by status
    long countByStatus(String status);

    // Get list of requests by status
    List<BloodRequest> findByStatus(String status);

    // Case-insensitive search by blood group
    @Query("SELECT r FROM BloodRequest r WHERE LOWER(r.bloodGroup) = LOWER(:bloodGroup)")
    List<BloodRequest> findByBloodGroupIgnoreCase(@Param("bloodGroup") String bloodGroup);

    // Case-insensitive search by location
    @Query("SELECT r FROM BloodRequest r WHERE LOWER(r.location) = LOWER(:location)")
    List<BloodRequest> findByLocationIgnoreCase(@Param("location") String location);

    // Case-insensitive search by both
    @Query("SELECT r FROM BloodRequest r WHERE LOWER(r.bloodGroup) = LOWER(:bloodGroup) AND LOWER(r.location) = LOWER(:location)")
    List<BloodRequest> findByBloodGroupAndLocationIgnoreCase(@Param("bloodGroup") String bloodGroup,
                                                            @Param("location") String location);

    @Query("SELECT r FROM BloodRequest r WHERE r.requestedAt BETWEEN :startDate AND :endDate")
    List<BloodRequest> findByRequestedAtBetween(@Param("startDate") java.time.LocalDateTime startDate,
                                                @Param("endDate") java.time.LocalDateTime endDate);

    @Query("SELECT r FROM BloodRequest r WHERE r.status = :status AND r.requestedAt BETWEEN :startDate AND :endDate")
    List<BloodRequest> findByStatusAndRequestedAtBetween(@Param("status") String status,
                                                        @Param("startDate") java.time.LocalDateTime startDate,
                                                        @Param("endDate") java.time.LocalDateTime endDate);
}
