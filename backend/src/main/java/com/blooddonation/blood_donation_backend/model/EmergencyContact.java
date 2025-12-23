package com.blooddonation.blood_donation_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EmergencyContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String number;
    private String type;
    private String icon;
    private String color;

    @Column(name = "user_id") // Add this to map to the database column
    private Long userId;

    public EmergencyContact() {}

    // ID
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // Name
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    // Number
    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    // Type
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    // Icon
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    // Color
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    // UserId
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
