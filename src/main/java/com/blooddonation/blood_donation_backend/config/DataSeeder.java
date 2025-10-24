package com.blooddonation.blood_donation_backend.config;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.blooddonation.blood_donation_backend.pharmacy.model.Medicine;
import com.blooddonation.blood_donation_backend.pharmacy.repository.MedicineRepository;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(MedicineRepository repo) {
        return args -> {
            // collect existing medicine names to avoid duplicates
            Set<String> existingNames = repo.findAll()
                    .stream()
                    .map(m -> m.getName().trim().toLowerCase())
                    .collect(Collectors.toSet());

            // seeds: name, stock, expiry, price
            List<Object[]> seeds = List.of(
                new Object[]{"Paracetamol 500mg", 100, LocalDate.of(2026, 12, 31), 25.00},
                new Object[]{"Amoxicillin 250mg", 50, LocalDate.of(2026, 6, 30), 120.00},
                new Object[]{"Vitamin C 1000mg", 200, LocalDate.of(2027, 1, 15), 60.00},
                new Object[]{"Cough Syrup", 75, LocalDate.of(2025, 11, 20), 80.00},
                new Object[]{"Ibuprofen 400mg", 150, LocalDate.of(2026, 10, 15), 45.00},
                new Object[]{"Azithromycin 500mg", 60, LocalDate.of(2026, 9, 10), 150.00},
                new Object[]{"Cetirizine 10mg", 120, LocalDate.of(2027, 3, 20), 30.00},
                new Object[]{"Metformin 500mg", 90, LocalDate.of(2027, 5, 5), 75.00},
                new Object[]{"Aspirin 75mg", 200, LocalDate.of(2026, 8, 25), 40.00},
                new Object[]{"Antacid Syrup", 100, LocalDate.of(2026, 11, 12), 55.00},
                new Object[]{"Multivitamin Tablets", 300, LocalDate.of(2027, 2, 28), 150.00},
                new Object[]{"Iron Supplement", 110, LocalDate.of(2027, 6, 18), 90.00},
                new Object[]{"Calcium + Vitamin D3", 80, LocalDate.of(2026, 7, 30), 110.00},
                new Object[]{"Zinc Tablets", 130, LocalDate.of(2026, 12, 15), 70.00},
                new Object[]{"Hydroxychloroquine 200mg", 40, LocalDate.of(2025, 10, 10), 200.00},
                new Object[]{"ORS Packets", 250, LocalDate.of(2027, 8, 8), 15.00}
            );

            for (Object[] s : seeds) {
                String name = ((String) s[0]).trim();
                if (!existingNames.contains(name.toLowerCase())) {
                    Medicine m = new Medicine();
                    m.setName(name);
                    m.setStock((Integer) s[1]);
                    m.setExpiryDate((LocalDate) s[2]);
                    m.setPrice(BigDecimal.valueOf((Double) s[3]));
                    repo.save(m);
                    existingNames.add(name.toLowerCase());
                }
            }
        };
    }
}
