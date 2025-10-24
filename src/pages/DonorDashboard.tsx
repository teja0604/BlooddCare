// src/pages/DonorDashboard.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiCalendar, FiAward, FiMapPin, FiClock, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { acceptRequest } from '@/services/request';
import { useAuth } from '../context/AuthContext';

const DonorDashboard = () => {
  const { token } = useAuth(); // JWT token
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // -------------------- STATEFUL DATA --------------------
  const [upcomingRequests, setUpcomingRequests] = useState([
    { id: 1, hospital: 'City General Hospital', distance: '2.3 km', urgency: 'critical', bloodType: 'O+', units: 2, time: 'Today, 3:00 PM' },
    { id: 2, hospital: 'Metro Medical Center', distance: '5.1 km', urgency: 'high', bloodType: 'O+', units: 1, time: 'Tomorrow, 10:00 AM' },
    { id: 3, hospital: 'Community Health', distance: '3.8 km', urgency: 'medium', bloodType: 'O+', units: 3, time: 'This Weekend' }
  ]);

  const [donationHistory, setDonationHistory] = useState([
    { date: '2024-01-15', hospital: 'City General', units: 1, status: 'completed', lives: 3 },
    { date: '2023-11-20', hospital: 'Metro Medical', units: 1, status: 'completed', lives: 3 },
    { date: '2023-09-10', hospital: 'Regional Hospital', units: 1, status: 'completed', lives: 3 }
  ]);

  const donorStats = {
    totalDonations: 12,
    livesSaved: 36,
    points: 1200,
    lastDonation: '45 days ago',
    nextEligible: '10 days',
    bloodType: 'O+'
  };

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-white';
      case 'medium': return 'bg-medical-blue text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // -------------------- HANDLERS --------------------
  const handleAcceptRequest = async (requestId: number) => {
    try {
      setActionLoading(requestId);
      const request = upcomingRequests.find(r => r.id === requestId);
      if (!request) return;

      await acceptRequest(requestId, token); // API call
      alert(`Request accepted for ${request.hospital}`);

      // Remove accepted request from upcoming requests
      setUpcomingRequests(prev => prev.filter(r => r.id !== requestId));

      // Add to donation history
      setDonationHistory(prev => [
        { date: new Date().toISOString().split('T')[0], hospital: request.hospital, units: request.units, status: 'completed', lives: request.units * 3 },
        ...prev
      ]);

    } catch (err) {
      console.error("Failed to accept request:", err);
      alert("Failed to accept request");
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewDetails = (id: number) => {
    alert(`Viewing details for request ${id}`);
  };

  const handleScheduleDonation = () => {
    setShowCalendar(true);
  };

  const confirmSchedule = () => {
    if (!selectedDate) return alert("Please select a date");
    alert(`Donation scheduled on ${selectedDate}`);
    setShowCalendar(false);
    setSelectedDate('');
  };

  // -------------------- JSX --------------------
  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FiHeart className="w-6 h-6 text-red-500 animate-pulse" />
              <h1 className="text-3xl font-bold !text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
                BloodCare
              </h1>
            </div>
            <Button className="btn-medical-primary" onClick={handleScheduleDonation}>
              <FiCalendar className="w-5 h-5 mr-2" />
              Schedule Donation
            </Button>
          </div>

          {/* Schedule calendar */}
          {showCalendar && (
            <div className="mt-4 flex items-center space-x-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input-medical"
              />
              <Button className="btn-medical-primary" onClick={confirmSchedule}>
                Confirm
              </Button>
            </div>
          )}

          {/* Donor Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* ...existing donor stat cards... */}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Matching Requests */}
            <Card className="card-medical">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-foreground">Matching Requests Near You</h3>
                <Badge className="bg-primary text-primary-foreground">
                  {upcomingRequests.length} matches
                </Badge>
              </div>

              <div className="space-y-4">
                {upcomingRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-border rounded-xl p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-foreground text-sm">{request.hospital}</h4>
                          <Badge className={`${getUrgencyColor(request.urgency)} text-xs`}>
                            {request.urgency}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <FiMapPin className="w-3 h-3 mr-1" />
                            {request.distance}
                          </div>
                          <div className="flex items-center">
                            <FiClock className="w-3 h-3 mr-1" />
                            {request.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mb-1">
                          <span className="text-white font-bold text-xs">{request.bloodType}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{request.units} units</div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="btn-medical-primary flex-1 text-xs"
                        onClick={() => handleAcceptRequest(request.id)}
                        disabled={actionLoading === request.id}
                      >
                        {actionLoading === request.id ? 'Processing...' : 'Accept Request'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={() => handleViewDetails(request.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Donation History */}
            <Card className="card-medical">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-foreground">Donation History</h3>
                <Button variant="outline" size="sm">
                  <FiTrendingUp className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {donationHistory.map((donation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-background-secondary rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <FiHeart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{donation.hospital}</div>
                        <div className="text-xs text-muted-foreground">{donation.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground text-sm">{donation.units} unit</div>
                      <div className="text-xs text-success">{donation.lives} lives saved</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Impact Summary */}
          <Card className="card-medical">
            <div className="text-center space-y-6 py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <FiHeart className="w-10 h-10 text-white animate-pulse-soft" />
                </div>
              </motion.div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Thank you for being a Life Hero!
                </h3>
                <p className="text-muted-foreground">
                  Your {donorStats.totalDonations} donations have helped save {donorStats.livesSaved} lives. 
                  You're making a real difference in your community.
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <Button className="btn-medical-primary">
                  <FiCalendar className="w-4 h-4 mr-2" />
                  Book Next Donation
                </Button>
                <Button variant="outline">
                  <FiUsers className="w-4 h-4 mr-2" />
                  Invite Friends
                </Button>
              </div>
            </div>
          </Card>

        </motion.div>
      </div>
    </div>
  );
};

export default DonorDashboard;
