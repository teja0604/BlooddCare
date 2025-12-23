// src/pages/Requests.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus, FiClock, FiMapPin, FiUser, FiShare } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../context/AuthContext';
import api from '@/services/api';

export interface BloodRequest {
  id: number;
  hospital?: string;
  location?: string;
  bloodType?: string;
  units?: number;
  urgency?: 'critical' | 'high' | 'medium' | 'low';
  patientAge?: number;
  description?: string;
  timePosted?: string;
}

const Requests = () => {
  const { token, userId } = useAuth(); // ✅ use userId for actions
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Fetch requests from backend
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get('/donors/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests', err);
      setRequests([]); // fallback empty
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [token]);

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-white';
      case 'medium': return 'bg-medical-blue text-white';
      case 'low': return 'bg-success text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredRequests = requests.filter((r) => {
    const hospital = r.hospital || '';
    const bloodType = r.bloodType || '';
    const matchesSearch = hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bloodType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || r.urgency === filterType;
    return matchesSearch && matchesFilter;
  });

  // Accept request handler
  const handleAccept = async (id: number) => {
    if (!userId) return alert('Please login to donate.');
    try {
      setActionLoading(id);
      await api.post(`/donors/requests/${id}/accept`, { donorId: userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // remove accepted request from UI
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Failed to accept request', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleShare = (request: BloodRequest) => {
    alert(`Share link for ${request.hospital || 'Unknown'} (${request.bloodType || 'N/A'})`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blood Requests</h1>
              <p className="text-muted-foreground mt-2">Help save lives by responding to urgent blood needs</p>
            </div>
            <Button className="btn-medical-primary">
              <FiPlus className="w-5 h-5 mr-2" /> Create Request
            </Button>
          </div>

          {/* Filters */}
          <Card className="card-medical">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search by hospital or blood type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-medical pl-10"
                />
              </div>
              <div className="sm:w-48">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="input-medical">
                    <FiFilter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Requests</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Request Cards */}
          {loading ? (
            <div className="text-center py-12">Loading requests...</div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No requests found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((r, index) => (
                <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <Card className="card-medical h-full hover:shadow-medical transition-all duration-300">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{r.bloodType || 'N/A'}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{r.units || 0} Units Needed</h3>
                            <Badge className={`${getUrgencyColor(r.urgency)} text-xs`}>
                              {r.urgency ? r.urgency.charAt(0).toUpperCase() + r.urgency.slice(1) : 'N/A'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <FiClock className="w-3 h-3 mr-1" />
                          {r.timePosted || 'N/A'}
                        </div>
                      </div>

                      {/* Hospital Info */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <FiMapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{r.hospital || 'Unknown Hospital'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{r.location || 'Unknown Location'}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <FiUser className="w-3 h-3 mr-1" />
                            <span>Patient: {r.patientAge || 'N/A'} yrs</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground">{r.description || 'No description available.'}</p>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-2">
                        <Button
                          className="btn-medical-primary flex-1"
                          onClick={() => handleAccept(r.id)}
                          disabled={actionLoading === r.id}
                        >
                          {actionLoading === r.id ? 'Processing...' : 'Donate Now'}
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={() => handleShare(r)}>
                          <FiShare className="w-4 h-4 mr-2" /> Share Request
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Requests;
