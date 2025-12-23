-- =====================================================
-- BloodCare MySQL Database Initialization Script
-- =====================================================

-- Drop tables if they already exist
DROP TABLE IF EXISTS patient_diagnoses;
DROP TABLE IF EXISTS patient_allergies;
DROP TABLE IF EXISTS patient_medications;
DROP TABLE IF EXISTS medical_records;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS hospital_users;

-- =====================================================
-- Users (Doctors, Nurses, Admins)
-- =====================================================
CREATE TABLE hospital_users (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'DOCTOR', 'NURSE') NOT NULL,
    hospital_name VARCHAR(150),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Patients
-- =====================================================
CREATE TABLE patients (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    date_of_birth DATE,
    blood_type VARCHAR(5),
    emergency_contact VARCHAR(100),
    fingerprint_template TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Medical Records
-- =====================================================
CREATE TABLE medical_records (
    id CHAR(36) PRIMARY KEY,
    patient_id CHAR(36) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- =====================================================
-- Medications
-- =====================================================
CREATE TABLE patient_medications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    medical_record_id CHAR(36) NOT NULL,
    medication VARCHAR(255) NOT NULL,
    CONSTRAINT fk_medical_record_med FOREIGN KEY (medical_record_id) REFERENCES medical_records(id) ON DELETE CASCADE
);

-- =====================================================
-- Allergies
-- =====================================================
CREATE TABLE patient_allergies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    medical_record_id CHAR(36) NOT NULL,
    allergy VARCHAR(255) NOT NULL,
    CONSTRAINT fk_medical_record_all FOREIGN KEY (medical_record_id) REFERENCES medical_records(id) ON DELETE CASCADE
);

-- =====================================================
-- Diagnoses
-- =====================================================
CREATE TABLE patient_diagnoses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    medical_record_id CHAR(36) NOT NULL,
    diagnosis VARCHAR(255) NOT NULL,
    CONSTRAINT fk_medical_record_diag FOREIGN KEY (medical_record_id) REFERENCES medical_records(id) ON DELETE CASCADE
);

-- =====================================================
-- Indexes for performance
-- =====================================================
CREATE INDEX idx_patients_phone ON patients(phone);
CREATE INDEX idx_patients_created_at ON patients(created_at);
CREATE INDEX idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX idx_medical_records_created_at ON medical_records(created_at);
CREATE INDEX idx_hospital_users_username ON hospital_users(username);
CREATE INDEX idx_hospital_users_email ON hospital_users(email);

-- =====================================================
-- Seed Data
-- =====================================================

-- Insert hospital users (doctor & nurse)
INSERT INTO hospital_users (id, username, email, password, role, hospital_name, is_active, created_at)
VALUES (UUID(), 'doctor1', 'doctor1@bloodcare.com',
        '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'DOCTOR', 'General Hospital', TRUE, NOW())
ON DUPLICATE KEY UPDATE username=username;

INSERT INTO hospital_users (id, username, email, password, role, hospital_name, is_active, created_at)
VALUES (UUID(), 'nurse1', 'nurse1@bloodcare.com',
        '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'NURSE', 'General Hospital', TRUE, NOW())
ON DUPLICATE KEY UPDATE username=username;

-- Insert sample patient and medical record
SET @sample_patient_id = UUID();
SET @sample_medical_record_id = UUID();

INSERT INTO patients (id, name, phone, date_of_birth, blood_type, emergency_contact, fingerprint_template, created_at)
VALUES (@sample_patient_id, 'John Doe', '+1-555-0123', '1980-05-15', 'A+', 'Jane Doe - +1-555-0124', 'encrypted_sample_fingerprint_template_data', NOW())
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO medical_records (id, patient_id, notes, created_at, updated_at)
VALUES (@sample_medical_record_id, @sample_patient_id, 'Sample patient for system testing. No known medical conditions.', NOW(), NOW())
ON DUPLICATE KEY UPDATE notes=notes;

-- Insert sample medications
INSERT IGNORE INTO patient_medications (medical_record_id, medication)
VALUES (@sample_medical_record_id, 'Aspirin 81mg daily'),
       (@sample_medical_record_id, 'Multivitamin daily');

-- Insert sample allergies
INSERT IGNORE INTO patient_allergies (medical_record_id, allergy)
VALUES (@sample_medical_record_id, 'Penicillin'),
       (@sample_medical_record_id, 'Shellfish');

-- Insert sample diagnoses
INSERT IGNORE INTO patient_diagnoses (medical_record_id, diagnosis)
VALUES (@sample_medical_record_id, 'Hypertension'),
       (@sample_medical_record_id, 'Seasonal Allergies');
