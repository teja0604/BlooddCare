package com.blooddonation.blood_donation_backend.pharmacy.repository;


import com.blooddonation.blood_donation_backend.pharmacy.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface OrderRepository extends JpaRepository<Order, Long> {
List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
}