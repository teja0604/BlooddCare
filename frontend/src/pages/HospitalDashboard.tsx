// src/pages/HospitalDashboard.tsx
import { motion } from 'framer-motion';
import { FiDroplet, FiPlus, FiClock, FiCheckCircle, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HospitalDashboard = () => {
  const bloodStock = [
    { type: 'A+', units: 45, status: 'adequate', color: 'text-success' },
    { type: 'A-', units: 12, status: 'low', color: 'text-warning' },
    { type: 'B+', units: 38, status: 'adequate', color: 'text-success' },
    { type: 'B-', units: 8, status: 'critical', color: 'text-destructive' },
    { type: 'AB+', units: 22, status: 'adequate', color: 'text-success' },
    { type: 'AB-', units: 3, status: 'critical', color: 'text-destructive' },
    { type: 'O+', units: 67, status: 'high', color: 'text-medical-blue' },
    { type: 'O-', units: 15, status: 'low', color: 'text-warning' }
  ];

  const pendingRequests = [
    { id: 1, type: 'O-', units: 4, patient: 'Emergency Surgery', status: 'urgent', time: '30 min' },
    { id: 2, type: 'A+', units: 2, patient: 'Cancer Treatment', status: 'scheduled', time: '2 hours' },
    { id: 3, type: 'B-', units: 1, patient: 'Trauma Case', status: 'urgent', time: '1 hour' }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      critical: 'bg-destructive text-destructive-foreground',
      low: 'bg-warning text-white',
      adequate: 'bg-success text-white',
      high: 'bg-medical-blue text-white'
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-muted text-muted-foreground';
  };

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
            <div>
              <h1 className="text-3xl font-bold text-foreground">Hospital Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage blood inventory and handle donation requests</p>
            </div>
            
            <Button className="btn-medical-primary">
              <FiPlus className="w-5 h-5 mr-2" />
              New Request
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="card-medical text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <FiDroplet className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">210</div>
              <div className="text-sm text-muted-foreground">Total Units</div>
            </Card>

            <Card className="card-medical text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
                  <FiClock className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">8</div>
              <div className="text-sm text-muted-foreground">Pending Requests</div>
            </Card>

            <Card className="card-medical text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                  <FiCheckCircle className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">34</div>
              <div className="text-sm text-muted-foreground">Completed Today</div>
            </Card>

            <Card className="card-medical text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center">
                  <FiAlertCircle className="w-6 h-6 text-warning" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Critical Stock</div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blood Inventory */}
            <div className="lg:col-span-2">
              <Card className="card-medical">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-foreground">Blood Inventory</h3>
                  <Button variant="outline" size="sm">
                    <FiTrendingUp className="w-4 h-4 mr-2" />
                    View Trends
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bloodStock.map((blood, index) => (
                    <motion.div
                      key={blood.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-background-secondary rounded-xl p-4 hover:scale-105 transition-transform duration-200"
                    >
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                          {blood.type}
                        </div>
                        <div className="text-3xl font-bold text-foreground">{blood.units}</div>
                        <Badge className={`${getStatusBadge(blood.status)} text-xs`}>
                          {blood.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Pending Requests */}
            <Card className="card-medical">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-foreground">Urgent Requests</h3>
                <Badge className="bg-destructive text-destructive-foreground">
                  {pendingRequests.length} pending
                </Badge>
              </div>
              
              <div className="space-y-4">
                {pendingRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-border rounded-xl p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{request.type}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground">{request.units} Units</div>
                          <div className="text-xs text-muted-foreground">{request.patient}</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <FiClock className="w-3 h-3 inline mr-1" />
                        {request.time}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="btn-medical-primary flex-1 text-xs">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card className="card-medical">
            <h3 className="text-xl font-semibold text-foreground mb-6">Recent Activities</h3>
            <div className="space-y-3">
              {[
                { action: "Blood donation received", details: "O+ 2 units from donor #1234", time: "10 min ago", icon: FiCheckCircle, color: "text-success" },
                { action: "Emergency request fulfilled", details: "A- 3 units for trauma patient", time: "25 min ago", icon: FiDroplet, color: "text-primary" },
                { action: "Stock alert triggered", details: "B- inventory below threshold", time: "1 hour ago", icon: FiAlertCircle, color: "text-warning" }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-3 bg-background-secondary rounded-xl"
                >
                  <div className="w-10 h-10 bg-gradient-subtle rounded-xl flex items-center justify-center">
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">{activity.details}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HospitalDashboard;