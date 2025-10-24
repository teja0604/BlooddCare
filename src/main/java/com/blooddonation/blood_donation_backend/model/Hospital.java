package com.blooddonation.blood_donation_backend.model;


import java.util.HashMap;
import java.util.Map;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hospitals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private String contact;

    // store blood stock as map: "A+" -> 12, "O-" -> 5, ...
    @ElementCollection
    @CollectionTable(name = "hospital_blood_stock", joinColumns = @JoinColumn(name = "hospital_id"))
    @MapKeyColumn(name = "blood_group")
    @Column(name = "units")
    @Builder.Default
    private Map<String, Integer> bloodStock = new HashMap<>();
}
