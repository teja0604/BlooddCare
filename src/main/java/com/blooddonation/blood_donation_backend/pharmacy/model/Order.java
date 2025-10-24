package com.blooddonation.blood_donation_backend.pharmacy.model;


import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;


@Entity
@Table(name = "orders")
public class Order {
@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


@Column(nullable = false)
private Long userId; // map to your User entity if needed


@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
private List<OrderItem> items = new ArrayList<>();


@Enumerated(EnumType.STRING)
private OrderStatus status = OrderStatus.PENDING;


@Enumerated(EnumType.STRING)
private DeliveryType deliveryType = DeliveryType.NORMAL;


@Column(nullable = false)
private BigDecimal totalPrice = BigDecimal.ZERO;


private OffsetDateTime createdAt = OffsetDateTime.now();
private OffsetDateTime updatedAt = OffsetDateTime.now();


@PreUpdate
public void onUpdate(){ this.updatedAt = OffsetDateTime.now(); }


// helpers
public void addItem(OrderItem item){
item.setOrder(this);
items.add(item);
}


// getters & setters
public Long getId() { return id; }
public Long getUserId() { return userId; }
public void setUserId(Long userId) { this.userId = userId; }
public List<OrderItem> getItems() { return items; }
public OrderStatus getStatus() { return status; }
public void setStatus(OrderStatus status) { this.status = status; }
public DeliveryType getDeliveryType() { return deliveryType; }
public void setDeliveryType(DeliveryType deliveryType) { this.deliveryType = deliveryType; }
public BigDecimal getTotalPrice() { return totalPrice; }
public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
public OffsetDateTime getCreatedAt() { return createdAt; }
public OffsetDateTime getUpdatedAt() { return updatedAt; }
}