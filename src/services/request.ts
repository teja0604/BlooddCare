// src/services/requests.ts
import api from './api'; // Axios instance

// Interface for blood request (matches backend structure)
export interface BloodRequest {
  id: number;
  bloodType: string;
  units: number;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  hospital: string;
  location: string;
  patientAge: number;
  timePosted: string; // ISO string or formatted
  description: string;
}

// 🔹 Fetch all blood requests
export const getRequests = async (token?: string): Promise<BloodRequest[]> => {
  try {
    const res = await api.get<BloodRequest[]>('/requests', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    console.error('Error fetching blood requests:', err);
    return []; // fallback
  }
};

// 🔹 Accept a blood request (Donate Now button)
export const acceptRequest = async (id: number, token: string) => {
  try {
    const res = await api.post(
      `/requests/${id}/accept`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error(`Error accepting request ${id}:`, err);
    throw err;
  }
};

// 🔹 Create a schedule for a request (example)
export const createSchedule = async (requestId: number, token: string, data: any) => {
  try {
    const res = await api.post(
      `/requests/${requestId}/schedule`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error(`Error creating schedule for request ${requestId}:`, err);
    throw err;
  }
};

// 🔹 Get details of a specific request
export const getRequestDetails = async (id: number, token: string) => {
  try {
    const res = await api.get(`/requests/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error(`Error fetching details for request ${id}:`, err);
    throw err;
  }
};
