// src/services/labService.ts
import axios from "axios";

const API_URL = "http://localhost:8081/api/lab";

// ✅ Test Packages
export const getPackages = async () => {
  const res = await axios.get(`${API_URL}/tests`);
  return res.data; // return only data
};

export const bookPackage = async (id: number) => {
  // You don’t actually have a backend “bookPackage” endpoint.
  // So we’ll just call appointments API
  const res = await axios.post(`${API_URL}/appointments`, {
    testId: id,
    date: new Date().toISOString().split("T")[0],
    time: "09:00 AM",
  });
  return res.data;
};

// ✅ Lab Results
export const getResults = async () => {
  const res = await axios.get(`${API_URL}/results`);
  return res.data;
};

export const downloadResult = async (id: number) => {
  const res = await axios.get(`${API_URL}/results/${id}`, {
    responseType: "blob",
  });
  return res.data;
};

// ✅ Appointments
export const getAppointments = async () => {
  const res = await axios.get(`${API_URL}/appointments`);
  return res.data;
};

export const scheduleAppointment = async (appt: any) => {
  const res = await axios.post(`${API_URL}/appointments`, appt);
  return res.data;
};

export const rescheduleAppointment = async (id: number, appt: any) => {
  const res = await axios.put(`${API_URL}/appointments`, {
    id,
    ...appt,
  });
  return res.data;
};

export const getAppointmentDetails = async (id: number) => {
  const res = await axios.get(`${API_URL}/appointments`);
  return res.data.find((a: any) => a.id === id);
};

export const requestHomeCollection = async (data: any) => {
  // No backend endpoint → just simulate
  return Promise.resolve({ success: true, ...data });
};

export const getAppointmentHistory = async () => {
  // For now return appointments as "history"
  return getAppointments();
};

export const getHealthReports = async () => {
  // No backend endpoint → just simulate
  return Promise.resolve([{ id: 1, name: "Annual Health Report 2024" }]);
};
