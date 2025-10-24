package com.blooddonation.blood_donation_backend;


import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.blooddonation.blood_donation_backend.model.Hospital;
import com.blooddonation.blood_donation_backend.repository.HospitalRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final HospitalRepository repo;

    @Override
    public void run(String... args) throws Exception {
        if (repo.count() == 0) {
            Map<String, Integer> s1 = new HashMap<>();
            s1.put("B+", 8);
            s1.put("A+", 12);
            s1.put("AB+", 6);
            s1.put("B-", 2);
            s1.put("A-", 3);
            s1.put("AB-", 1);
            s1.put("O+", 15);
            s1.put("O-", 5);

            Hospital h1 = Hospital.builder()
                    .name("Apollo Hospital")
                    .location("Chennai")
                    .contact("044-123456")
                    .bloodStock(s1)
                    .build();

            Map<String, Integer> s2 = new HashMap<>();
            s2.put("A+", 10);
            s2.put("B+", 4);
            s2.put("O+", 20);

            Hospital h2 = Hospital.builder()
                    .name("Fortis Hospital")
                    .location("Mumbai")
                    .contact("022-654321")
                    .bloodStock(s2)
                    .build();

            repo.save(h1);
            repo.save(h2);
            System.out.println("Loaded sample hospitals.");
        }
    }
}
