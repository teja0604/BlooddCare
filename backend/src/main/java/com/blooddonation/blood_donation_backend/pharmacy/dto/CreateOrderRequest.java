package com.blooddonation.blood_donation_backend.pharmacy.dto;

import java.util.List;

import com.blooddonation.blood_donation_backend.pharmacy.model.DeliveryType;

public class CreateOrderRequest {
    private Long userId;
    private DeliveryType deliveryType;
    private List<OrderItemRequest> items;

    // Getters and Setters
    public Long getUserId() { 
        return userId; 
    }
    public void setUserId(Long userId) { 
        this.userId = userId; 
    }

    public DeliveryType getDeliveryType() { 
        return deliveryType; 
    }
    public void setDeliveryType(DeliveryType deliveryType) { 
        this.deliveryType = deliveryType; 
    }

    public List<OrderItemRequest> getItems() { 
        return items; 
    }
    public void setItems(List<OrderItemRequest> items) { 
        this.items = items; 
    }
}
