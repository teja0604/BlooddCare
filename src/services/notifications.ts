// src/services/notifications.ts
import api from "./api";

export type Notification = {
  id: number;
  message: string;
  createdAt: string;
  read: boolean;
  role?: string;
  type?: 'urgent' | 'info' | 'success' | 'warning';
};

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: 1,
    message: "Urgent: O- blood type needed at City General Hospital",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'urgent'
  },
  {
    id: 2,
    message: "Your blood donation appointment is confirmed for tomorrow",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'info'
  },
  {
    id: 3,
    message: "Thank you! Your donation helped save 3 lives",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    type: 'success'
  },
  {
    id: 4,
    message: "Blood drive event this weekend at Community Center",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    read: true,
    type: 'info'
  }
];

export const fetchAllNotifications = async (): Promise<Notification[]> => {
  // Simulate API call - replace with real API
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockNotifications;
};

export const fetchNotificationsForRole = async (role: string): Promise<Notification[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockNotifications.filter(n => !n.role || n.role === role);
};

export const markRead = async (id: number) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const notification = mockNotifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

export const markAllRead = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  mockNotifications.forEach(n => n.read = true);
};