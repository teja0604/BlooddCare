import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, MapPin, Clock, Heart, Zap, Users, Car } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, staggerContainer, glowPulse } from '@/lib/animation';

// --- MOCK DATA ---
const defaultEmergencyContacts = [
  { id: 1, name: 'Emergency Services', number: '911', type: 'General Emergency', icon: AlertTriangle, color: 'bg-red-600' },
  { id: 2, name: 'Poison Control', number: '1-800-222-1222', type: 'Poison Emergency', icon: Zap, color: 'bg-orange-600' },
  { id: 3, name: 'Crisis Helpline', number: '988', type: 'Mental Health Crisis', icon: Heart, color: 'bg-purple-600' },
  { id: 4, name: 'Blood Bank Emergency', number: '1-800-BLOOD-NOW', type: 'Blood Emergency', icon: Heart, color: 'bg-red-500' },
];

const defaultNearbyHospitals = [
  { id: 1, name: 'City General Hospital', distance: '0.8 km', eta: '3 minutes', emergency: true, trauma: true, phone: '+1 234-567-8901' },
  { id: 2, name: 'Metro Emergency Center', distance: '1.2 km', eta: '5 minutes', emergency: true, trauma: false, phone: '+1 234-567-8902' },
  { id: 3, name: 'St. Mary Medical Center', distance: '2.1 km', eta: '7 minutes', emergency: true, trauma: true, phone: '+1 234-567-8903' },
];

const defaultEmergencyTips = [
  { title: 'Heart Attack', symptoms: 'Chest pain, shortness of breath, nausea', action: 'Call 911 immediately, chew aspirin if available' },
  { title: 'Stroke', symptoms: 'Face drooping, arm weakness, speech difficulty', action: 'Call 911, note time of symptom onset' },
  { title: 'Severe Bleeding', symptoms: 'Heavy bleeding that won\'t stop', action: 'Apply direct pressure, elevate if possible, call 911' },
  { title: 'Allergic Reaction', symptoms: 'Difficulty breathing, swelling, hives', action: 'Use EpiPen if available, call 911 immediately' },
];

// --- TYPES ---
type EmergencyContact = typeof defaultEmergencyContacts[0];
type Hospital = typeof defaultNearbyHospitals[0];
type Tip = typeof defaultEmergencyTips[0];

export default function EmergencySOS() {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(defaultEmergencyContacts);
  const [nearbyHospitals, setNearbyHospitals] = useState<Hospital[]>(defaultNearbyHospitals);
  const [emergencyTips, setEmergencyTips] = useState<Tip[]>(defaultEmergencyTips);

  // Fetch data from backend on mount
  useEffect(() => {
    fetchEmergencyContacts();
    fetchNearbyHospitals();
    fetchEmergencyTips();
  }, []);

  // --- API CALLS ---
  const fetchEmergencyContacts = async () => {
    try {
      const res = await fetch('/api/emergency/contacts');
      if (!res.ok) throw new Error('Failed to fetch contacts');
      const data: EmergencyContact[] = await res.json();
      setEmergencyContacts(data);
    } catch (err) {
      console.error(err);
      setEmergencyContacts(defaultEmergencyContacts); // fallback
    }
  };

  const fetchNearbyHospitals = async () => {
    try {
      const res = await fetch('/api/emergency/hospitals');
      if (!res.ok) throw new Error('Failed to fetch hospitals');
      const data: Hospital[] = await res.json();
      setNearbyHospitals(data);
    } catch (err) {
      console.error(err);
      setNearbyHospitals(defaultNearbyHospitals);
    }
  };

  const fetchEmergencyTips = async () => {
    try {
      const res = await fetch('/api/emergency/tips');
      if (!res.ok) throw new Error('Failed to fetch tips');
      const data: Tip[] = await res.json();
      setEmergencyTips(data);
    } catch (err) {
      console.error(err);
      setEmergencyTips(defaultEmergencyTips);
    }
  };

  // --- BUTTON HANDLERS ---
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Location: ${position.coords.latitude}, ${position.coords.longitude}`);
          // TODO: send location to backend or alert contacts
        },
        () => alert('Unable to get location')
      );
    }
  };

  const handleAlertContacts = () => {
    alert('Contacts alerted! (Integrate backend to send SMS/notification)');
  };

  const handleCallAmbulance = () => {
    alert('Calling ambulance... (Integrate backend for real service)');
  };

  const handleUpdateMedicalInfo = () => {
    alert('Medical info updated! (Integrate backend API)');
  };

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Emergency SOS</h1>
        <p className="text-gray-600">
          Quick access to emergency services and critical health information
        </p>
      </motion.div>

      {/* Emergency SOS Button */}
      <motion.div variants={fadeInUp} className="flex justify-center">
        <motion.div variants={glowPulse} initial="initial" animate="animate" className="relative">
          <Button
            size="lg"
            onClick={() => handleCall('911')}
            className="w-48 h-48 rounded-full bg-red-600 hover:bg-red-700 text-white text-xl font-bold shadow-2xl"
          >
            <div className="flex flex-col items-center space-y-2">
              <AlertTriangle className="h-16 w-16" />
              <span>EMERGENCY</span>
              <span className="text-sm">PRESS & HOLD</span>
            </div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button size="lg" className="h-20 flex-col space-y-2 bg-red-600 hover:bg-red-700 text-white" onClick={() => handleCall('911')}>
            <Phone className="h-6 w-6" />
            <span className="text-sm">Call 911</span>
          </Button>
          <Button size="lg" variant="outline" className="h-20 flex-col space-y-2 border-red-200 hover:bg-red-50" onClick={handleShareLocation}>
            <MapPin className="h-6 w-6 text-red-600" />
            <span className="text-sm">Share Location</span>
          </Button>
          <Button size="lg" variant="outline" className="h-20 flex-col space-y-2 border-blue-200 hover:bg-blue-50" onClick={handleAlertContacts}>
            <Users className="h-6 w-6 text-blue-600" />
            <span className="text-sm">Alert Contacts</span>
          </Button>
          <Button size="lg" variant="outline" className="h-20 flex-col space-y-2 border-green-200 hover:bg-green-50" onClick={handleCallAmbulance}>
            <Car className="h-6 w-6 text-green-600" />
            <span className="text-sm">Call Ambulance</span>
          </Button>
        </div>
      </motion.div>

      {/* Emergency Contacts */}
      <motion.div variants={fadeInUp}>
        <Card className="glass-effect shadow-healthcare border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 text-red-500 mr-2" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>Quick access to emergency services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyContacts.map((contact) => (
                <motion.div key={contact.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card className="border-2 hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center`}>
                          <contact.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.type}</p>
                          <p className="text-lg font-bold text-[#457B9D]">{contact.number}</p>
                        </div>
                        <Button size="sm" className="bg-[#E63946] hover:bg-[#E63946]/90" onClick={() => handleCall(contact.number)}>
                          Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Nearby Hospitals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={fadeInUp}>
          <Card className="glass-effect shadow-healthcare border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                Nearby Hospitals
              </CardTitle>
              <CardDescription>Emergency facilities in your area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {nearbyHospitals.map((hospital) => (
                <div key={hospital.id} className="p-4 bg-white/50 rounded-xl border border-white/20">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{hospital.name}</h3>
                      <div className="flex space-x-1">
                        {hospital.emergency && <Badge className="bg-red-100 text-red-700">Emergency</Badge>}
                        {hospital.trauma && <Badge className="bg-orange-100 text-orange-700">Trauma</Badge>}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hospital.distance}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {hospital.eta} ETA
                      </span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="bg-[#E63946] hover:bg-[#E63946]/90" onClick={() => handleCall(hospital.phone)}>
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <MapPin className="h-4 w-4 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Emergency Tips */}
        <motion.div variants={fadeInUp}>
          <Card className="glass-effect shadow-healthcare border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 text-green-500 mr-2" />
                Emergency First Aid
              </CardTitle>
              <CardDescription>Quick reference for common emergencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/50 rounded-xl border border-white/20"
                >
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900">{tip.title}</h3>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="font-medium text-gray-700">Symptoms: </span>
                        <span className="text-gray-600">{tip.symptoms}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Action: </span>
                        <span className="text-gray-600">{tip.action}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Medical Information */}
      <motion.div variants={fadeInUp}>
        <Card className="glass-effect shadow-healthcare border-0">
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
            <CardDescription>Keep your emergency medical information updated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Blood Type</h3>
                <p className="text-lg font-bold text-red-600">O+</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Allergies</h3>
                <p className="text-sm text-gray-600">Penicillin, Shellfish</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Emergency Contact</h3>
                <p className="text-sm text-gray-600">John Doe - +1 234-567-8900</p>
              </div>
            </div>
            <Button className="w-full mt-4 bg-[#457B9D] hover:bg-[#457B9D]/90" onClick={handleUpdateMedicalInfo}>
              Update Medical Information
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
