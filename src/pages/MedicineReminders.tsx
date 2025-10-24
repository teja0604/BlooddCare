import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Bell, Check, X, Calendar, Pill } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/buttons';
import { Badge } from '@/components/ui/badges';
import { Switch } from '@/components/ui/switchs';
import { fadeInUp, staggerContainer, scaleOnHover } from '@/lib/animation';

const todayReminders = [
  {
    id: 1,
    medicine: 'Aspirin 81mg',
    dosage: '1 tablet',
    time: '8:00 AM',
    taken: false,
    frequency: 'Daily',
    nextDose: '8:00 AM tomorrow',
    color: 'bg-red-100 border-red-200',
  },
  {
    id: 2,
    medicine: 'Vitamin D3 1000IU',
    dosage: '1 capsule',
    time: '12:00 PM',
    taken: true,
    frequency: 'Daily',
    nextDose: '12:00 PM tomorrow',
    color: 'bg-orange-100 border-orange-200',
  },
  {
    id: 3,
    medicine: 'Metformin 500mg',
    dosage: '1 tablet',
    time: '6:00 PM',
    taken: false,
    frequency: 'Twice daily',
    nextDose: '6:00 PM today',
    color: 'bg-blue-100 border-blue-200',
  },
  {
    id: 4,
    medicine: 'Omega-3 Fish Oil',
    dosage: '2 capsules',
    time: '9:00 PM',
    taken: false,
    frequency: 'Daily',
    nextDose: '9:00 PM today',
    color: 'bg-green-100 border-green-200',
  },
];

const upcomingReminders = [
  {
    id: 5,
    medicine: 'Blood Pressure Medication',
    time: '7:00 AM',
    date: 'Tomorrow',
    frequency: 'Daily',
  },
  {
    id: 6,
    medicine: 'Calcium Supplement',
    time: '10:00 AM',
    date: 'Tomorrow',
    frequency: 'Daily',
  },
];

export default function MedicineReminders() {
  const [reminders, setReminders] = useState(todayReminders);

  const markAsTaken = (id: number) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, taken: true } : reminder
    ));
  };

  const skipReminder = (id: number) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Medicine Reminders</h1>
        <p className="text-gray-600">
          Never miss a dose with smart medication reminders
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-effect shadow-healthcare border-0 text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <p className="text-sm text-gray-600">Today's Doses</p>
            </CardContent>
          </Card>
          <Card className="glass-effect shadow-healthcare border-0 text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">1</div>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>
          <Card className="glass-effect shadow-healthcare border-0 text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>
          <Card className="glass-effect shadow-healthcare border-0 text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <p className="text-sm text-gray-600">Adherence Rate</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Today's Reminders */}
      <motion.div variants={fadeInUp}>
        <Card className="glass-effect shadow-healthcare border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 text-orange-500 mr-2" />
                  Today's Reminders
                </CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </div>
              <Button className="bg-[#457B9D] hover:bg-[#457B9D]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Reminder
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                variants={scaleOnHover}
                whileHover="hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  reminder.taken 
                    ? 'bg-green-50 border-green-200 opacity-75' 
                    : reminder.color
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Pill className="h-6 w-6 text-[#457B9D]" />
                      </div>
                      {reminder.taken && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{reminder.medicine}</h3>
                        <Badge variant="outline">{reminder.frequency}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{reminder.dosage}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {reminder.time}
                        </span>
                        <span>Next: {reminder.nextDose}</span>
                      </div>
                    </div>
                  </div>
                  
                  {!reminder.taken && (
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => skipReminder(reminder.id)}
                        className="hover:bg-red-50 hover:border-red-200"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Skip
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => markAsTaken(reminder.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Taken
                      </Button>
                    </div>
                  )}
                  
                  {reminder.taken && (
                    <Badge className="bg-green-100 text-green-700">
                      ✓ Completed
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Reminders */}
        <motion.div variants={fadeInUp}>
          <Card className="glass-effect shadow-healthcare border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                Upcoming Reminders
              </CardTitle>
              <CardDescription>
                Next scheduled medications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-white/20"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Pill className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{reminder.medicine}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <span>{reminder.date}</span>
                        <span>•</span>
                        <span>{reminder.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{reminder.frequency}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings */}
        <motion.div variants={fadeInUp}>
          <Card className="glass-effect shadow-healthcare border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 text-purple-500 mr-2" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Customize your reminder preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive alerts on your device</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Reminders</p>
                  <p className="text-sm text-gray-500">Get text message alerts</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Daily summary emails</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Smart Reminders</p>
                  <p className="text-sm text-gray-500">AI-powered timing optimization</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Button className="w-full bg-[#E63946] hover:bg-[#E63946]/90">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}