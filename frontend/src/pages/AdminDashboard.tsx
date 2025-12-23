// src/pages/AdminDashboard.tsx
import { motion } from 'framer-motion';
import { FiUsers, FiActivity, FiTrendingUp, FiShield, FiBarChart, FiSettings } from 'react-icons/fi';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const AdminDashboard = () => {
  const stats = [
    { icon: FiUsers, title: "Total Users", value: "12,345", change: "+12%", color: "text-medical-blue" },
    { icon: FiActivity, title: "Active Donations", value: "1,234", change: "+8%", color: "text-success" },
    { icon: FiTrendingUp, title: "Monthly Growth", value: "23%", change: "+5%", color: "text-primary" },
    { icon: FiShield, title: "System Health", value: "98.9%", change: "Stable", color: "text-success" }
  ];

  const recentActivities = [
    { type: "user", action: "New donor registered", user: "John Doe", time: "2 minutes ago" },
    { type: "hospital", action: "Blood request created", user: "City Hospital", time: "15 minutes ago" },
    { type: "donation", action: "Donation completed", user: "Mary Smith", time: "1 hour ago" },
    { type: "alert", action: "Low stock alert", user: "System", time: "2 hours ago" }
  ];

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
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage users, hospitals, donors and system analytics</p>
            </div>
            
            <Button className="btn-medical-primary">
              <FiSettings className="w-5 h-5 mr-2" />
              System Settings
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-medical hover:shadow-medical transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                      <p className="text-sm text-success mt-1">{stat.change}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Management */}
            <Card className="card-medical">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-foreground">User Management</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-background-secondary rounded-xl">
                    <div className="text-2xl font-bold text-primary">8,234</div>
                    <div className="text-sm text-muted-foreground">Donors</div>
                  </div>
                  <div className="text-center p-4 bg-background-secondary rounded-xl">
                    <div className="text-2xl font-bold text-medical-blue">234</div>
                    <div className="text-sm text-muted-foreground">Hospitals</div>
                  </div>
                  <div className="text-center p-4 bg-background-secondary rounded-xl">
                    <div className="text-2xl font-bold text-success">3,877</div>
                    <div className="text-sm text-muted-foreground">Patients</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Activities */}
            <Card className="card-medical">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-foreground">Recent Activities</h3>
                <Button variant="outline" size="sm">
                  <FiBarChart className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-background-secondary rounded-xl"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="card-medical">
            <h3 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="btn-medical-secondary h-20 flex-col">
                <FiUsers className="w-6 h-6 mb-2" />
                Manage Users
              </Button>
              <Button className="btn-medical-secondary h-20 flex-col">
                <FiActivity className="w-6 h-6 mb-2" />
                View Donations
              </Button>
              <Button className="btn-medical-secondary h-20 flex-col">
                <FiBarChart className="w-6 h-6 mb-2" />
                Analytics
              </Button>
              <Button className="btn-medical-secondary h-20 flex-col">
                <FiShield className="w-6 h-6 mb-2" />
                Security
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;