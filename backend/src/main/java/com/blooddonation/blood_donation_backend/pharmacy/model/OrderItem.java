package com.blooddonation.blood_donation_backend.pharmacy.model;


import jakarta.persistence.*;
import java.math.BigDecimal;


@Entity
@Table(name = "order_items")
public class OrderItem {
@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


@ManyToOne(optional = false)
private Medicine medicine;


@ManyToOne(optional = false)
private Order order;


@Column(nullable = false)
private Integer quantity;


@Column(nullable = false)
private BigDecimal priceAtPurchase;


// getters & setters
public Long getId() { return id; }
public Medicine getMedicine() { return medicine; }
public void setMedicine(Medicine medicine) { this.medicine = medicine; }
public Order getOrder() { return order; }
public void setOrder(Order order) { this.order = order; }
public Integer getQuantity() { return quantity; }
public void setQuantity(Integer quantity) { this.quantity = quantity; }
public BigDecimal getPriceAtPurchase() { return priceAtPurchase; }
public void setPriceAtPurchase(BigDecimal priceAtPurchase) { this.priceAtPurchase = priceAtPurchase; }
}