import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { patientAPI } from '@/services/api';
import { Patient, MedicalRecord } from '@/types';
import { 
  UserPlus, 
  Fingerprint, 
  Phone, 
  Calendar, 
  Droplet, 
  Heart, 
  Pill, 
  AlertTriangle, 
  FileText,
  Upload,
  CheckCircle,
  X,
  CreditCard,
  Shield
} from 'lucide-react';

export default function PatientEnrollment() {
  const [patient, setPatient] = useState<Omit<Patient, 'id' | 'createdAt'>>({
    name: '',
    phone: '',
    dateOfBirth: '',
    bloodType: '',
    emergencyContact: '',
    aadhaarNumber: '',
  });

  const [medicalRecord, setMedicalRecord] = useState<Omit<MedicalRecord, 'id' | 'patientId' | 'createdAt' | 'updatedAt'>>({
    medications: [],
    allergies: [],
    diagnoses: [],
    notes: '',
  });

  const [fingerprintFile, setFingerprintFile] = useState<File | null>(null);
  const [currentMedication, setCurrentMedication] = useState('');
  const [currentAllergy, setCurrentAllergy] = useState('');
  const [currentDiagnosis, setCurrentDiagnosis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleAddMedication = () => {
    if (currentMedication.trim()) {
      setMedicalRecord(prev => ({
        ...prev,
        medications: [...prev.medications, currentMedication.trim()]
      }));
      setCurrentMedication('');
    }
  };

  const handleAddAllergy = () => {
    if (currentAllergy.trim()) {
      setMedicalRecord(prev => ({
        ...prev,
        allergies: [...prev.allergies, currentAllergy.trim()]
      }));
      setCurrentAllergy('');
    }
  };

  const handleAddDiagnosis = () => {
    if (currentDiagnosis.trim()) {
      setMedicalRecord(prev => ({
        ...prev,
        diagnoses: [...prev.diagnoses, currentDiagnosis.trim()]
      }));
      setCurrentDiagnosis('');
    }
  };

  const removeMedication = (index: number) => {
    setMedicalRecord(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const removeAllergy = (index: number) => {
    setMedicalRecord(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const removeDiagnosis = (index: number) => {
    setMedicalRecord(prev => ({
      ...prev,
      diagnoses: prev.diagnoses.filter((_, i) => i !== index)
    }));
  };

  const handleFingerprintUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFingerprintFile(file);
    } else {
      setError('Please select a valid image file for fingerprint');
    }
  };

  const validateAadhaar = (aadhaar: string) => {
    const aadhaarRegex = /^\d{4}-\d{4}-\d{4}$/;
    return aadhaarRegex.test(aadhaar);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAadhaar(patient.aadhaarNumber)) {
      setError('Please enter a valid Aadhaar number in XXXX-XXXX-XXXX format');
      return;
    }
    
    if (!fingerprintFile) {
      setError('Please upload a fingerprint image');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await patientAPI.enroll({
        patient,
        medicalRecord,
        fingerprintImage: fingerprintFile,
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Enrollment failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="shadow-2xl border-0 bg-white text-center p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Enrollment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Patient has been successfully enrolled in the BloodCare system with both fingerprint and Aadhaar verification.
            </p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 hover:bg-red-700"
            >
              Enroll Another Patient
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-2">
            Patient Enrollment
          </h1>
          <p className="text-gray-600">Register a new patient with fingerprint and Aadhaar authentication</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Patient Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-700 text-white">
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={patient.name}
                      onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                      placeholder="Enter patient's full name"
                      required
                    />
                  </div>
                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={patient.phone}
                        onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
                        placeholder="+91-98765-43210"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  {/* DOB */}
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={patient.dateOfBirth}
                        onChange={(e) => setPatient({ ...patient, dateOfBirth: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  {/* Blood Type */}
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <div className="relative">
                      <Droplet className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="bloodType"
                        value={patient.bloodType}
                        onChange={(e) => setPatient({ ...patient, bloodType: e.target.value })}
                        placeholder="A+, B-, O+, etc."
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Aadhaar */}
                  <div className="space-y-2">
                    <Label htmlFor="aadhaarNumber" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-orange-600" />
                      Aadhaar Number
                    </Label>
                    <Input
                      id="aadhaarNumber"
                      value={patient.aadhaarNumber}
                      onChange={(e) => setPatient({ ...patient, aadhaarNumber: e.target.value })}
                      placeholder="1234-5678-9012"
                      pattern="\d{4}-\d{4}-\d{4}"
                      title="Please enter Aadhaar number in XXXX-XXXX-XXXX format"
                      required
                    />
                    <p className="text-xs text-gray-500">Format: XXXX-XXXX-XXXX</p>
                  </div>
                  {/* Emergency Contact */}
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <div className="relative">
                      <Heart className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="emergencyContact"
                        value={patient.emergencyContact}
                        onChange={(e) => setPatient({ ...patient, emergencyContact: e.target.value })}
                        placeholder="Emergency contact name and phone"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Medical Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-700 text-white">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Medical Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Medications */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-green-600" />
                    Current Medications
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={currentMedication}
                      onChange={(e) => setCurrentMedication(e.target.value)}
                      placeholder="Enter medication name"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMedication())}
                    />
                    <Button type="button" onClick={handleAddMedication} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {medicalRecord.medications.map((med, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                        {med}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeMedication(index)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Allergies */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Allergies
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={currentAllergy}
                      onChange={(e) => setCurrentAllergy(e.target.value)}
                      placeholder="Enter allergy"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAllergy())}
                    />
                    <Button type="button" onClick={handleAddAllergy} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {medicalRecord.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="bg-red-100 text-red-800">
                        {allergy}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeAllergy(index)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Diagnoses */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    Diagnoses
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={currentDiagnosis}
                      onChange={(e) => setCurrentDiagnosis(e.target.value)}
                      placeholder="Enter diagnosis"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDiagnosis())}
                    />
                    <Button type="button" onClick={handleAddDiagnosis} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {medicalRecord.diagnoses.map((diagnosis, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-100 text-purple-800">
                        {diagnosis}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeDiagnosis(index)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Medical Notes</Label>
                  <Textarea
                    id="notes"
                    value={medicalRecord.notes}
                    onChange={(e) => setMedicalRecord({ ...medicalRecord, notes: e.target.value })}
                    placeholder="Enter any additional medical information..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Fingerprint Upload */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-700 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="h-5 w-5" />
                  Biometric Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">
                      Dual authentication: Fingerprint + Aadhaar for maximum security
                    </span>
                  </div>
                  
                  <Label htmlFor="fingerprint">Upload Fingerprint Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
                    <input
                      id="fingerprint"
                      type="file"
                      accept="image/*"
                      onChange={handleFingerprintUpload}
                      className="hidden"
                    />
                    <label htmlFor="fingerprint" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        {fingerprintFile ? fingerprintFile.name : 'Click to upload fingerprint image'}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full max-w-md bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium py-3 text-lg"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : (
                'Enroll Patient with Dual Authentication'
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
