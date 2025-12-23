import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Pill, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  Clock,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/buttons';
import { Badge } from '@/components/ui/badges';
import { fadeInUp, staggerContainer, scaleOnHover } from '@/lib/animation';

const stats = [
  {
    title: 'Blood Donations',
    value: '1,234',
    change: '+12%',
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    title: 'Active Donors',
    value: '856',
    change: '+8%',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Medicines Delivered',
    value: '2,468',
    change: '+15%',
    icon: Pill,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Appointments',
    value: '145',
    change: '+5%',
    icon: Calendar,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
];

const urgentRequests = [
  {
    id: 1,
    bloodType: 'O-',
    hospital: 'City General Hospital',
    urgency: 'Critical',
    time: '2 hours ago',
    location: '2.3 km away',
  },
  {
    id: 2,
    bloodType: 'AB+',
    hospital: 'St. Mary Medical Center',
    urgency: 'High',
    time: '4 hours ago',
    location: '5.1 km away',
  },
  {
    id: 3,
    bloodType: 'A+',
    hospital: 'Metro Health Clinic',
    urgency: 'Medium',
    time: '6 hours ago',
    location: '8.7 km away',
  },
];

const upcomingReminders = [
  {
    id: 1,
    medicine: 'Aspirin 100mg',
    time: '2:00 PM',
    type: 'Daily',
  },
  {
    id: 2,
    medicine: 'Vitamin D3',
    time: '8:00 PM',
    type: 'Weekly',
  },
  {
    id: 3,
    medicine: 'Blood Pressure Med',
    time: '9:00 AM',
    type: 'Twice Daily',
  },
];

export default function Dashboard() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back to BloodCare
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Your healthcare dashboard - manage donations, medications, and appointments
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={fadeInUp}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={scaleOnHover}
            whileHover="hover"
            whileTap="tap"
          >
            <Card className="glass-effect shadow-healthcare border-0">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-green-500">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-2xl ${stat.bgColor} flex-shrink-0 ml-2`}>
                    <stat.icon className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Urgent Blood Requests */}
        <motion.div variants={fadeInUp}>
          <Card className="glass-effect shadow-healthcare border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                Urgent Blood Requests
              </CardTitle>
              <CardDescription>
                Critical requests in your area
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {urgentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white/50 rounded-xl border border-white/20 gap-3 sm:gap-0"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200 text-xs"
                      >
                        {request.bloodType}
                      </Badge>
                      <Badge
                        variant={request.urgency === 'Critical' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {request.urgency}
                      </Badge>
                    </div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{request.hospital}</p>
                    <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-2 sm:gap-4">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                        {request.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{request.location}</span>
                      </span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-[#E63946] hover:bg-[#E63946]/90 w-full sm:w-auto">
                    Respond
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Medicine Reminders */}
        <motion.div variants={fadeInUp}>
          <Card className="glass-effect shadow-healthcare border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 text-orange-500 mr-2" />
                Today's Reminders
              </CardTitle>
              <CardDescription>
                Don't forget your medications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/20"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{reminder.medicine}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>{reminder.time}</span>
                      <Badge variant="outline">{reminder.type}</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Skip
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Taken
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={fadeInUp}>
        <Card className="glass-effect shadow-healthcare border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Access frequently used features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              <Button
                variant="outline"
                className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 hover:scale-105 transition-transform p-2 sm:p-4"
              >
                <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-red-500" />
                <span className="text-xs sm:text-sm">Donate Blood</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 hover:scale-105 transition-transform p-2 sm:p-4"
              >
                <Pill className="h-4 w-4 sm:h-6 sm:w-6 text-green-500" />
                <span className="text-xs sm:text-sm">Order Medicine</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 hover:scale-105 transition-transform p-2 sm:p-4"
              >
                <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-blue-500" />
                <span className="text-xs sm:text-sm">Book Test</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 hover:scale-105 transition-transform bg-red-50 border-red-200 hover:bg-red-100 p-2 sm:p-4"
              >
                <AlertCircle className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
                <span className="text-xs sm:text-sm font-medium">Emergency</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}