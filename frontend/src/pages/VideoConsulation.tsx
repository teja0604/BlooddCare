import { motion } from 'framer-motion';
import { Video, Calendar, Clock, User, Phone, MessageCircle, FileText, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/buttons';
import { Badge } from '@/components/ui/badges';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatars';
import { fadeInUp, staggerContainer, scaleOnHover } from '@/lib/animation';

const availableDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    rating: 4.9,
    experience: '15 years',
    nextAvailable: 'Today 2:00 PM',
    consultationFee: '$75',
    image: '/api/placeholder/64/64',
    languages: ['English', 'Spanish'],
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'General Physician',
    rating: 4.8,
    experience: '12 years',
    nextAvailable: 'Today 4:30 PM',
    consultationFee: '$60',
    image: '/api/placeholder/64/64',
    languages: ['English', 'Mandarin'],
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatologist',
    rating: 4.9,
    experience: '10 years',
    nextAvailable: 'Tomorrow 10:00 AM',
    consultationFee: '$80',
    image: '/api/placeholder/64/64',
    languages: ['English', 'Spanish'],
  },
];

const upcomingConsultations = [
  {
    id: 1,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: 'Today',
    time: '2:00 PM',
    type: 'Follow-up',
    duration: '30 minutes',
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    specialty: 'General Physician',
    date: 'Tomorrow',
    time: '10:30 AM',
    type: 'General Consultation',
    duration: '45 minutes',
  },
];

const consultationHistory = [
  {
    id: 1,
    doctor: 'Dr. Emily Rodriguez',
    date: '2024-01-10',
    diagnosis: 'Skin Consultation',
    prescription: 'Topical cream prescribed',
    status: 'Completed',
  },
  {
    id: 2,
    doctor: 'Dr. Sarah Johnson',
    date: '2024-01-05',
    diagnosis: 'Heart Health Checkup',
    prescription: 'Blood pressure medication',
    status: 'Completed',
  },
];

export default function VideoConsultation() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Video Consultation</h1>
        <p className="text-gray-600">
          Connect with qualified doctors from the comfort of your home
        </p>
      </motion.div>

      {/* Quick Start Video Call */}
      <motion.div variants={fadeInUp}>
        <Card className="glass-effect shadow-healthcare border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Video className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Video Consultation</h2>
                <p className="text-gray-600 mb-6">
                  Connect instantly with available doctors or schedule for later
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90">
                  <Video className="h-5 w-5 mr-2" />
                  Start Now
                </Button>
                <Button size="lg" variant="outline">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Later
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Doctors */}
      <motion.div variants={fadeInUp}>
        <Card className="glass-effect shadow-healthcare border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 text-blue-500 mr-2" />
              Available Doctors
            </CardTitle>
            <CardDescription>
              Choose from our qualified healthcare professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  variants={scaleOnHover}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-2 hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={doctor.image} alt={doctor.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                              {doctor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{doctor.rating}</span>
                              <span className="text-sm text-gray-500">({doctor.experience})</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Next Available:</span>
                            <span className="font-medium">{doctor.nextAvailable}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Consultation Fee:</span>
                            <span className="font-medium text-[#457B9D]">{doctor.consultationFee}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {doctor.languages.map((language) => (
                            <Badge key={language} variant="outline" className="text-xs">
                              {language}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 bg-[#457B9D] hover:bg-[#457B9D]/90">
                            <Video className="h-4 w-4 mr-1" />
                            Consult
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Consultations */}
        <motion.div variants={fadeInUp}>
          <Card className="glass-effect shadow-healthcare border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 text-green-500 mr-2" />
                Upcoming Consultations
              </CardTitle>
              <CardDescription>
                Your scheduled appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingConsultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className="p-4 bg-green-50/50 rounded-xl border border-green-200/50"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{consultation.doctor}</h3>
                      <Badge variant="outline">{consultation.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{consultation.specialty}</p>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {consultation.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {consultation.time}
                      </span>
                      <span>{consultation.duration}</span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="bg-[#E63946] hover:bg-[#E63946]/90">
                        <Video className="h-4 w-4 mr-1" />
                        Join Call
                      </Button>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Consultation History */}
        <motion.div variants={fadeInUp}>
          <Card className="glass-effect shadow-healthcare border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 text-purple-500 mr-2" />
                Recent Consultations
              </CardTitle>
              <CardDescription>
                Your consultation history and prescriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {consultationHistory.map((consultation) => (
                <div
                  key={consultation.id}
                  className="p-4 bg-white/50 rounded-xl border border-white/20"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{consultation.doctor}</h3>
                      <Badge className="bg-green-100 text-green-700">
                        {consultation.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{consultation.diagnosis}</p>
                    <p className="text-sm text-gray-500">{consultation.date}</p>
                    <div className="text-sm bg-blue-50 p-2 rounded border border-blue-200">
                      <strong>Prescription:</strong> {consultation.prescription}
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Features */}
      <motion.div variants={fadeInUp}>
        <Card className="glass-effect shadow-healthcare border-0">
          <CardHeader>
            <CardTitle>Platform Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium">HD Video Calls</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm font-medium">Digital Prescriptions</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-sm font-medium">24/7 Support</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-sm font-medium">Secure Messaging</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}