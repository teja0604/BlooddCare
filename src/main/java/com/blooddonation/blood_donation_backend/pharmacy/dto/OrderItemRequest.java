package com.blooddonation.blood_donation_backend.pharmacy.dto;

public class OrderItemRequest {
    private Long medicineId;
    private int quantity;

    // Getters and Setters
    public Long getMedicineId() {
        return medicineId;
    }
    public void setMedicineId(Long medicineId) {
        this.medicineId = medicineId;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
