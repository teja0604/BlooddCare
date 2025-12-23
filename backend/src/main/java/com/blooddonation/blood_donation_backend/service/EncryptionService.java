package com.blooddonation.blood_donation_backend.service;


import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Encryption Service - Handles AES encryption/decryption for sensitive data
 */
@Service
public class EncryptionService {
    
    private static final String ALGORITHM = "AES";
    private static final String TRANSFORMATION = "AES/ECB/PKCS5Padding";
    
    @Value("${bloodcare.encryption.key:BloodCareSecretKey123456789012}")
    private String encryptionKey;
    
    /**
     * Encrypt data using AES encryption
     */
    public String encrypt(String data) {
        try {
            SecretKey secretKey = new SecretKeySpec(encryptionKey.getBytes(), ALGORITHM);
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            
            byte[] encryptedBytes = cipher.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error encrypting data", e);
        }
    }
    
    /**
     * Decrypt data using AES decryption
     */
    public String decrypt(String encryptedData) {
        try {
            SecretKey secretKey = new SecretKeySpec(encryptionKey.getBytes(), ALGORITHM);
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            
            byte[] decodedBytes = Base64.getDecoder().decode(encryptedData);
            byte[] decryptedBytes = cipher.doFinal(decodedBytes);
            return new String(decryptedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error decrypting data", e);
        }
    }
    
    /**
     * Generate a secure hash for fingerprint templates
     * This is a simplified version - in production, use proper fingerprint SDK
     */
    public String generateFingerprintHash(byte[] fingerprintData) {
        try {
            // Simple hash generation for demo purposes
            // In production, use proper fingerprint template extraction
            SecureRandom random = new SecureRandom();
            byte[] salt = new byte[16];
            random.nextBytes(salt);
            
            // Combine fingerprint data with salt
            byte[] combined = new byte[fingerprintData.length + salt.length];
            System.arraycopy(fingerprintData, 0, combined, 0, fingerprintData.length);
            System.arraycopy(salt, 0, combined, fingerprintData.length, salt.length);
            
            // Create a simple hash representation
            StringBuilder hash = new StringBuilder();
            for (byte b : combined) {
                hash.append(String.format("%02x", b));
            }
            
            return encrypt(hash.toString());
        } catch (Exception e) {
            throw new RuntimeException("Error generating fingerprint hash", e);
        }
    }
    
    /**
     * Compare fingerprint templates
     * This is a simplified matching algorithm for demo purposes
     */
    public double compareFingerprintTemplates(String template1, String template2) {
        try {
            String decrypted1 = decrypt(template1);
            String decrypted2 = decrypt(template2);
            
            // Simple string similarity for demo
            // In production, use proper fingerprint matching algorithms
            return calculateSimilarity(decrypted1, decrypted2);
        } catch (Exception e) {
            return 0.0; // No match on error
        }
    }
    
    /**
     * Calculate similarity between two strings (simplified matching)
     */
    private double calculateSimilarity(String s1, String s2) {
        if (s1.equals(s2)) {
            return 100.0;
        }
        
        int maxLength = Math.max(s1.length(), s2.length());
        if (maxLength == 0) {
            return 100.0;
        }
        
        int editDistance = calculateEditDistance(s1, s2);
        return ((double) (maxLength - editDistance) / maxLength) * 100.0;
    }
    
    /**
     * Calculate edit distance between two strings
     */
    private int calculateEditDistance(String s1, String s2) {
        int[][] dp = new int[s1.length() + 1][s2.length() + 1];
        
        for (int i = 0; i <= s1.length(); i++) {
            for (int j = 0; j <= s2.length(); j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else {
                    dp[i][j] = Math.min(
                        dp[i - 1][j - 1] + (s1.charAt(i - 1) == s2.charAt(j - 1) ? 0 : 1),
                        Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1)
                    );
                }
            }
        }
        
        return dp[s1.length()][s2.length()];
    }
}