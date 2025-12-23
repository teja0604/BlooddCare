import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Navigation, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/buttons';
import { Badge } from '@/components/ui/badges';
import { fadeInUp, staggerContainer, glowPulse } from '@/lib/animation';

const nearbyDonors = [
  {
    id: 1,
    name: 'John Smith',
    bloodType: 'O+',
    distance: '0.5 km',
    lastDonation: '3 months ago',
    availability: 'Available',
    phone: '+1 234-567-8901',
    location: 'Downtown Medical Center',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    bloodType: 'A-',
    distance: '1.2 km',
    lastDonation: '2 months ago',
    availability: 'Available',
    phone: '+1 234-567-8902',
    location: 'City General Hospital',
  },
  {
    id: 3,
    name: 'Mike Davis',
    bloodType: 'B+',
    distance: '2.1 km',
    lastDonation: '4 months ago',
    availability: 'Busy',
    phone: '+1 234-567-8903',
    location: 'Metro Health Clinic',
  },
  {
    id: 4,
    name: 'Emily Chen',
    bloodType: 'AB-',
    distance: '2.8 km',
    lastDonation: '1 month ago',
    availability: 'Available',
    phone: '+1 234-567-8904',
    location: 'St. Mary Medical Center',
  },
];

export default function DonorMap() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Donor Map</h1>
        <p className="text-gray-600">
          Find nearby blood donors and connect instantly
        </p>
      </motion.div>

      {/* Emergency SOS Button */}
      <motion.div variants={fadeInUp} className="flex justify-center">
        <motion.div
          variants={glowPulse}
          initial="initial"
          animate="animate"
        >
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg"
          >
            <AlertCircle className="h-6 w-6 mr-2" />
            Emergency Blood Request
          </Button>
        </motion.div>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div variants={fadeInUp}>
        <Card className="glass-effect shadow-healthcare border-0">
          <CardContent className="p-0">
            <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="text-center space-y-2 z-10">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto" />
                <p className="text-lg font-semibold text-gray-700">Interactive Map</p>
                <p className="text-sm text-gray-500">Real-time donor locations</p>
              </div>
              
              {/* Simulated donor pins */}
              <div className="absolute top-16 left-20">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              </div>
              <div className="absolute top-32 right-24">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              </div>
              <div className="absolute bottom-20 left-32">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Nearby Donors List */}
      <motion.div variants={fadeInUp}>
        <Card className="glass-effect shadow-healthcare border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Navigation className="h-5 w-5 text-blue-500 mr-2" />
              Nearby Donors
            </CardTitle>
            <CardDescription>
              Blood donors within 5km radius
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {nearbyDonors.map((donor, index) => (
              <motion.div
                key={donor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    {donor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-900">{donor.name}</p>
                      <Badge 
                        variant="outline" 
                        className="bg-red-50 text-red-700 border-red-200"
                      >
                        {donor.bloodType}
                      </Badge>
                      <Badge 
                        variant={donor.availability === 'Available' ? 'default' : 'secondary'}
                        className={donor.availability === 'Available' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {donor.availability}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {donor.distance}
                      </span>
                      <span>Last donation: {donor.lastDonation}</span>
                    </div>
                    <p className="text-sm text-gray-600">{donor.location}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-[#457B9D] hover:bg-[#457B9D]/90 hover:scale-105 transition-transform"
                    disabled={donor.availability === 'Busy'}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-effect shadow-healthcare border-0 text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-red-600">24</div>
              <p className="text-sm text-gray-600">Donors Nearby</p>
            </CardContent>
          </Card>
          <Card className="glass-effect shadow-healthcare border-0 text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">18</div>
              <p className="text-sm text-gray-600">Available Now</p>
            </CardContent>
          </Card>
          <Card className="glass-effect shadow-healthcare border-0 text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">2.1km</div>
              <p className="text-sm text-gray-600">Average Distance</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}