// src/pages/Statistics.tsx
import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiActivity, FiHeart, FiMapPin, FiCalendar } from 'react-icons/fi';
import { Card } from '@/components/ui/card';

const Statistics = () => {
  const overallStats = [
    { icon: FiUsers, title: "Total Donors", value: "25,347", change: "+12%", color: "text-medical-blue" },
    { icon: FiActivity, title: "Blood Units Collected", value: "1,234,567", change: "+8%", color: "text-primary" },
    { icon: FiHeart, title: "Lives Saved", value: "456,789", change: "+15%", color: "text-success" },
    { icon: FiMapPin, title: "Partner Hospitals", value: "523", change: "+3%", color: "text-warning" }
  ];

  const bloodTypeDistribution = [
    { type: 'O+', percentage: 37, count: '9,378' },
    { type: 'A+', percentage: 34, count: '8,618' },
    { type: 'B+', percentage: 12, count: '3,042' },
    { type: 'AB+', percentage: 3, count: '760' },
    { type: 'O-', percentage: 7, count: '1,774' },
    { type: 'A-', percentage: 6, count: '1,521' },
    { type: 'B-', percentage: 1, count: '254' },
    { type: 'AB-', percentage: 0.6, count: '152' }
  ];

  const monthlyData = [
    { month: 'Jan', donations: 2340, requests: 2100 },
    { month: 'Feb', donations: 2890, requests: 2400 },
    { month: 'Mar', donations: 3100, requests: 2800 },
    { month: 'Apr', donations: 2750, requests: 2300 },
    { month: 'May', donations: 3400, requests: 3100 },
    { month: 'Jun', donations: 3200, requests: 2900 }
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
          <div>
            <h1 className="text-3xl font-bold text-foreground">Statistics & Analytics</h1>
            <p className="text-muted-foreground mt-2">Track the impact of our blood donation community</p>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overallStats.map((stat, index) => (
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
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                      <p className="text-sm text-success mt-1 flex items-center">
                        <FiTrendingUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Blood Type Distribution */}
            <Card className="card-medical">
              <h3 className="text-xl font-semibold text-foreground mb-6">Blood Type Distribution</h3>
              <div className="space-y-4">
                {bloodTypeDistribution.map((blood, index) => (
                  <motion.div
                    key={blood.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white border-2 border-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">{blood.type}</span>
                      </div>
                      <span className="font-medium text-foreground">{blood.count} donors</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${blood.percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-primary"
                        />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground w-12 text-right">
                        {blood.percentage}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Monthly Trends */}
            <Card className="card-medical">
              <h3 className="text-xl font-semibold text-foreground mb-6">Monthly Trends</h3>
              <div className="space-y-4">
                {monthlyData.map((month, index) => (
                  <motion.div
                    key={month.month}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background-secondary rounded-xl p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">{month.month} 2024</span>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                          <span className="text-muted-foreground">Donations</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-medical-blue rounded-full mr-2" />
                          <span className="text-muted-foreground">Requests</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-lg font-bold text-foreground">{month.donations.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Donations completed</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">{month.requests.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Blood requests</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Regional Statistics */}
          <Card className="card-medical">
            <h3 className="text-xl font-semibold text-foreground mb-6">Regional Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { region: 'North Region', donors: '8,234', hospitals: '156', lives: '24,702' },
                { region: 'Central Region', donors: '12,456', hospitals: '234', lives: '37,368' },
                { region: 'South Region', donors: '6,789', hospitals: '133', lives: '20,367' }
              ].map((region, index) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gradient-subtle rounded-xl p-6 text-center space-y-4"
                >
                  <div className="flex justify-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <FiMapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">{region.region}</h4>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Active Donors</span>
                        <span className="font-medium text-foreground">{region.donors}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Partner Hospitals</span>
                        <span className="font-medium text-foreground">{region.hospitals}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Lives Saved</span>
                        <span className="font-medium text-success">{region.lives}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Impact Summary */}
          {/* Impact Summary */}
          <Card className="card-medical bg-gradient-hero">
            <div className="text-center space-y-6 py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <FiHeart className="w-10 h-10 text-white animate-pulse-soft" />
                </div>
              </motion.div>
              
              <div>
                <h3 className="text-3xl font-bold mb-2 text-black">
                  Together, We're Saving Lives
                </h3>
                <p className="text-lg text-black">
                  Every donation counts. Every donor matters. Every life saved is a victory for our community.
                </p>
              </div>
              
             <div className="grid grid-cols-3 gap-8 pt-4">
            <div>
              <div className="text-2xl font-bold text-black">99.8%</div>
              <div className="text-sm text-gray-700">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-black">24/7</div>
              <div className="text-sm text-gray-700">Availability</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-black">5min</div>
              <div className="text-sm text-gray-700">Avg Response</div>
            </div>
          </div>

            </div>
          </Card>

        </motion.div>
      </div>
    </div>
  );
};

export default Statistics;