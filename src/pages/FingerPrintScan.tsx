import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { patientAPI } from '@/services/api';
import { PatientMatchResponse, AadhaarVerificationRequest } from '@/types';
import PatientCard from '@/PatientCard';
import { 
  Fingerprint, 
  Upload, 
  Scan, 
  AlertCircle, 
  Search,
  Loader2,
  CreditCard,
  Shield,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function FingerprintScan() {
  const [fingerprintFile, setFingerprintFile] = useState<File | null>(null);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isVerifyingAadhaar, setIsVerifyingAadhaar] = useState(false);
  const [scanResult, setScanResult] = useState<PatientMatchResponse | null>(null);
  const [error, setError] = useState('');
  const [aadhaarValidation, setAadhaarValidation] = useState<{
    isValid: boolean;
    patientFound: boolean;
    message: string;
  } | null>(null);

  const handleFingerprintUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFingerprintFile(file);
      setError('');
      setScanResult(null);
    } else {
      setError('Please select a valid image file for fingerprint');
    }
  };

  const handleFingerprintScan = async () => {
    if (!fingerprintFile) {
      setError('Please upload a fingerprint image first');
      return;
    }

    setIsScanning(true);
    setError('');
    setScanResult(null);

    try {
      const result = await patientAPI.scanFingerprint({ fingerprintImage: fingerprintFile });
      setScanResult(result);
    } catch (err) {
      if (err instanceof Error && err.message.includes('404')) {
        setError('No matching patient found in the database. Try Aadhaar verification as backup.');
      } else {
        setError(err instanceof Error ? err.message : 'Scan failed');
      }
    } finally {
      setIsScanning(false);
    }
  };

  const validateAadhaar = (aadhaar: string) => {
    const aadhaarRegex = /^\d{4}-\d{4}-\d{4}$/;
    return aadhaarRegex.test(aadhaar);
  };

  const handleAadhaarVerification = async () => {
    if (!validateAadhaar(aadhaarNumber)) {
      setError('Please enter a valid Aadhaar number in XXXX-XXXX-XXXX format');
      return;
    }

    setIsVerifyingAadhaar(true);
    setError('');
    setAadhaarValidation(null);

    try {
      const validation = await patientAPI.verifyAadhaar({ aadhaarNumber });
      setAadhaarValidation(validation);
      
      if (validation.patientFound) {
        // If patient found, fetch their records
        const result = await patientAPI.searchByAadhaar({ aadhaarNumber });
        setScanResult(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Aadhaar verification failed');
    } finally {
      setIsVerifyingAadhaar(false);
    }
  };

  const resetScan = () => {
    setFingerprintFile(null);
    setAadhaarNumber('');
    setScanResult(null);
    setError('');
    setAadhaarValidation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Emergency Patient Lookup
          </h1>
          <p className="text-gray-600">Dual authentication: Fingerprint scanning + Aadhaar verification</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!scanResult ? (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Shield className="h-6 w-6" />
                    Dual Authentication Scanner
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-8">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-6"
                    >
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  <Tabs defaultValue="fingerprint" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="fingerprint" className="flex items-center gap-2">
                        <Fingerprint className="h-4 w-4" />
                        Fingerprint Scan
                      </TabsTrigger>
                      <TabsTrigger value="aadhaar" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Aadhaar Backup
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="fingerprint" className="space-y-6">
                      {/* Fingerprint Upload Area */}
                      <div className="relative">
                        <input
                          id="fingerprint-scan"
                          type="file"
                          accept="image/*"
                          onChange={handleFingerprintUpload}
                          className="hidden"
                        />
                        
                        <motion.label
                          htmlFor="fingerprint-scan"
                          className="block cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`
                            border-3 border-dashed rounded-xl p-12 text-center transition-all duration-300
                            ${fingerprintFile 
                              ? 'border-green-400 bg-green-50' 
                              : 'border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50'
                            }
                          `}>
                            <motion.div
                              animate={fingerprintFile ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 0.5 }}
                            >
                              {fingerprintFile ? (
                                <div className="text-green-600">
                                  <Fingerprint className="h-16 w-16 mx-auto mb-4" />
                                  <p className="text-lg font-semibold">{fingerprintFile.name}</p>
                                  <p className="text-sm text-green-500 mt-2">Ready to scan</p>
                                </div>
                              ) : (
                                <div className="text-gray-500">
                                  <Upload className="h-16 w-16 mx-auto mb-4" />
                                  <p className="text-lg font-semibold">Upload Fingerprint</p>
                                  <p className="text-sm mt-2">Click to select fingerprint image</p>
                                </div>
                              )}
                            </motion.div>
                          </div>
                        </motion.label>
                      </div>

                      {/* Fingerprint Scan Button */}
                      <Button
                        onClick={handleFingerprintScan}
                        disabled={!fingerprintFile || isScanning}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 text-lg relative overflow-hidden"
                      >
                        <AnimatePresence mode="wait">
                          {isScanning ? (
                            <motion.div
                              key="scanning"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-3"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Loader2 className="h-5 w-5" />
                              </motion.div>
                              Scanning Fingerprint...
                            </motion.div>
                          ) : (
                            <motion.div
                              key="scan"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-3"
                            >
                              <Scan className="h-5 w-5" />
                              Start Fingerprint Scan
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Scanning Animation Effect */}
                        {isScanning && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </Button>

                      {/* Scanning Visual Effect */}
                      {isScanning && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center"
                        >
                          <motion.div
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              ease: "easeInOut" 
                            }}
                            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white mb-4"
                          >
                            <Search className="h-8 w-8" />
                          </motion.div>
                          <p className="text-gray-600 font-medium">
                            Searching patient database...
                          </p>
                        </motion.div>
                      )}
                    </TabsContent>

                    <TabsContent value="aadhaar" className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <Shield className="h-5 w-5 text-orange-600" />
                          <span className="text-sm text-orange-700">
                            Use Aadhaar verification when fingerprint scanning is unavailable or fails
                          </span>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="aadhaar" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-orange-600" />
                            Aadhaar Number
                          </Label>
                          <Input
                            id="aadhaar"
                            value={aadhaarNumber}
                            onChange={(e) => setAadhaarNumber(e.target.value)}
                            placeholder="1234-5678-9012"
                            pattern="\d{4}-\d{4}-\d{4}"
                            className="text-lg py-3"
                          />
                          <p className="text-xs text-gray-500">Format: XXXX-XXXX-XXXX</p>
                        </div>

                        {aadhaarValidation && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <Alert className={aadhaarValidation.patientFound ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}>
                              {aadhaarValidation.patientFound ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-orange-600" />
                              )}
                              <AlertDescription className={aadhaarValidation.patientFound ? 'text-green-700' : 'text-orange-700'}>
                                {aadhaarValidation.message}
                              </AlertDescription>
                            </Alert>
                          </motion.div>
                        )}

                        <Button
                          onClick={handleAadhaarVerification}
                          disabled={!aadhaarNumber || isVerifyingAadhaar}
                          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 text-lg"
                        >
                          {isVerifyingAadhaar ? (
                            <div className="flex items-center gap-3">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Loader2 className="h-5 w-5" />
                              </motion.div>
                              Verifying Aadhaar...
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-5 w-5" />
                              Verify Aadhaar Number
                            </div>
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Button
                  onClick={resetScan}
                  variant="outline"
                  className="mb-6"
                >
                  <Scan className="h-4 w-4 mr-2" />
                  Scan Another Patient
                </Button>
              </div>

              <PatientCard
                patient={scanResult.patient}
                medicalRecord={scanResult.medicalRecord}
                matchConfidence={scanResult.matchConfidence}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  scanResult.matchMethod === 'FINGERPRINT' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {scanResult.matchMethod === 'FINGERPRINT' ? (
                    <Fingerprint className="h-4 w-4" />
                  ) : (
                    <CreditCard className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">
                    Verified via {scanResult.matchMethod === 'FINGERPRINT' ? 'Fingerprint' : 'Aadhaar'}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}