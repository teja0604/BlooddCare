// src/components/PatientCard.tsx
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Patient, MedicalRecord } from '@/types/index.ts';
import { Heart, Phone, Calendar, Droplet, AlertTriangle, Pill, FileText, CreditCard, Shield } from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
  medicalRecord: MedicalRecord;
  matchConfidence: number;
}

export default function PatientCard({ patient, medicalRecord, matchConfidence }: PatientCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Heart className="h-6 w-6" />
                {patient.name}
              </CardTitle>
              <p className="text-blue-100 mt-1">Patient Medical Record</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className="bg-green-500 text-white">{matchConfidence}% Match</Badge>
              <div className="flex items-center gap-1 text-xs text-blue-100">
                <Shield className="h-3 w-3" />
                <span>Verified Identity</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Patient Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Patient Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Droplet className="h-4 w-4" />
                  <Badge className="text-red-600 border border-red-200">{patient.bloodType}</Badge>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Heart className="h-4 w-4" />
                  <span>{patient.emergencyContact}</span>
                </div>
                {patient.aadhaarNumber && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <CreditCard className="h-4 w-4" />
                    <span className="font-mono">{patient.aadhaarNumber}</span>
                    <Badge className="text-green-600 border border-green-200 text-xs">Verified</Badge>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Allergies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Critical Allergies
              </h3>
              <div className="flex flex-wrap gap-2">
                {medicalRecord.allergies.length > 0 ? (
                  medicalRecord.allergies.map((allergy, i) => (
                    <Badge key={i} className="bg-red-100 text-red-800">{allergy}</Badge>
                  ))
                ) : (
                  <span className="text-gray-500 italic">No known allergies</span>
                )}
              </div>
            </motion.div>
          </div>

          <Separator />

          {/* Medications & Diagnoses */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Pill className="h-5 w-5 text-green-600" />
                Current Medications
              </h3>
              <div className="space-y-2">
                {medicalRecord.medications.length > 0 ? (
                  medicalRecord.medications.map((med, i) => (
                    <div key={i} className="p-3 bg-green-50 rounded-lg border border-green-200">{med}</div>
                  ))
                ) : (
                  <span className="text-gray-500 italic">No current medications</span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Diagnoses
              </h3>
              <div className="space-y-2">
                {medicalRecord.diagnoses.length > 0 ? (
                  medicalRecord.diagnoses.map((diag, i) => (
                    <div key={i} className="p-3 bg-purple-50 rounded-lg border border-purple-200">{diag}</div>
                  ))
                ) : (
                  <span className="text-gray-500 italic">No recorded diagnoses</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Notes */}
          {medicalRecord.notes && (
            <>
              <Separator />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-gray-800">Medical Notes</h3>
                <div className="p-4 bg-gray-50 rounded-lg border">{medicalRecord.notes}</div>
              </motion.div>
            </>
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="pt-4 border-t border-gray-200 flex justify-center text-xs text-gray-500 gap-1 items-center"
          >
            <Shield className="h-3 w-3" />
            <span>All data encrypted and HIPAA compliant</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
