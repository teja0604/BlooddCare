import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TestTube,
  Calendar,
  Clock,
  FileText,
  Download,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/buttons";
import { Badge } from "@/components/ui/badges";
import {
  fadeInUp,
  staggerContainer,
  scaleOnHover,
} from "@/lib/animation";
import {
  getPackages,
  bookPackage,
  getResults,
  downloadResult,
  getAppointments,
  scheduleAppointment,
  rescheduleAppointment,
  getAppointmentDetails,
  requestHomeCollection,
  getAppointmentHistory,
  getHealthReports,
} from "@/services/labService";
import { toast } from "@/hooks/use-toast";

// ✅ Mock fallback data (UI won’t break if API fails)
const mockTestPackages = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    description: "Comprehensive blood analysis including RBC, WBC, platelets",
    price: "$45",
    duration: "24 hours",
    fasting: false,
    rating: 4.9,
    tests: ["Red Blood Cells", "White Blood Cells", "Platelets", "Hemoglobin"],
  },
  {
    id: 2,
    name: "Lipid Profile",
    description: "Cholesterol and triglyceride levels assessment",
    price: "$35",
    duration: "12 hours",
    fasting: true,
    rating: 4.8,
    tests: ["Total Cholesterol", "LDL", "HDL", "Triglycerides"],
  },
];

const mockResults = [
  {
    id: 1,
    testName: "Complete Blood Count",
    date: "2024-01-15",
    status: "Normal",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    testName: "Lipid Profile",
    date: "2024-01-10",
    status: "Attention Required",
    doctor: "Dr. Michael Chen",
  },
];

const mockAppointments = [
  {
    id: 1,
    testName: "Annual Health Checkup",
    date: "2024-01-25",
    time: "9:00 AM",
    location: "City Lab Center",
    instructions: "Fasting required - 12 hours",
  },
];

export default function LabTests() {
  const [packages, setPackages] = useState<any[]>(mockTestPackages);
  const [results, setResults] = useState<any[]>(mockResults);
  const [appointments, setAppointments] = useState<any[]>(mockAppointments);

  useEffect(() => {
    loadData();
  }, []);

  // 🔹 Load all API data (fallback to mock on error)
  const loadData = async () => {
    try {
      const [pkgRes, resRes, appRes] = await Promise.all([
        getPackages(),
        getResults(),
        getAppointments(),
      ]);
      setPackages(pkgRes || mockTestPackages);
      setResults(resRes || mockResults);
      setAppointments(appRes || mockAppointments);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to load lab data, showing demo data.",
        variant: "destructive",
      });
    }
  };

  // 📦 Book Now
  const handleBook = async (id: number) => {
    await bookPackage(id);
    toast({ title: "Booked", description: "Your test has been booked." });
    loadData();
  };

  // 📄 Download result
  const handleDownload = async (id: number) => {
    const file = await downloadResult(id);
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `result-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
  };

  // 📅 Reschedule
  const handleReschedule = async (id: number) => {
    await rescheduleAppointment(id, {
      newDate: "2024-02-01",
      newTime: "10:00",
    });
    toast({
      title: "Rescheduled",
      description: "Your appointment has been rescheduled.",
    });
    loadData();
  };

  // 📅 View Details
  const handleViewDetails = async (id: number) => {
    const res = await getAppointmentDetails(id);
    toast({
      title: "Appointment Details",
      description: JSON.stringify(res, null, 2),
    });
  };

  // 📅 Schedule New
  const handleSchedule = async () => {
    await scheduleAppointment({
      testName: "New Test",
      date: "2024-02-05",
      time: "9:30 AM",
    });
    toast({
      title: "Scheduled",
      description: "New test appointment added.",
    });
    loadData();
  };

  // ⚡ Quick Actions
  const handleHomeCollection = async () => {
    await requestHomeCollection({ address: "123 Street, City" });
    toast({
      title: "Home Collection",
      description: "Lab will contact you shortly.",
    });
  };

  const handleViewAllResults = async () => {
    const res = await getResults();
    toast({
      title: "All Results",
      description: `Found ${res.length} results.`,
    });
  };

  const handleAppointmentHistory = async () => {
    const res = await getAppointmentHistory();
    toast({
      title: "History",
      description: `Found ${res.length} past appointments.`,
    });
  };

  const handleHealthReports = async () => {
    const res = await getHealthReports();
    toast({
      title: "Reports",
      description: `Found ${res.length} reports.`,
    });
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
        <h1 className="text-3xl font-bold text-gray-900">Lab Tests</h1>
        <p className="text-gray-600">
          Book lab tests, view results, and track your health metrics
        </p>
      </motion.div>

      {/* Test Packages */}
      <motion.div variants={fadeInUp}>
        <Card className="glass-effect shadow-healthcare border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TestTube className="h-5 w-5 text-purple-500 mr-2" />
              Popular Test Packages
            </CardTitle>
            <CardDescription>
              Comprehensive health screening packages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((testPackage, index) => (
                <motion.div
                  key={testPackage.id}
                  variants={scaleOnHover}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-2 hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-gray-900">
                              {testPackage.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {testPackage.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-[#457B9D]">
                              {testPackage.price}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">
                                {testPackage.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {testPackage.duration}
                          </span>
                          <Badge
                            variant={
                              testPackage.fasting ? "secondary" : "outline"
                            }
                          >
                            {testPackage.fasting
                              ? "Fasting Required"
                              : "No Fasting"}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">
                            Includes:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {testPackage.tests.map((test: string) => (
                              <Badge
                                key={test}
                                variant="outline"
                                className="text-xs"
                              >
                                {test}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button
                          className="w-full bg-[#E63946] hover:bg-[#E63946]/90"
                          onClick={() => handleBook(testPackage.id)}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Now
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Results */}
        <motion.div variants={fadeInUp}>
          <Card className="glass-effect shadow-healthcare border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 text-green-500 mr-2" />
                Recent Results
              </CardTitle>
              <CardDescription>
                Your latest test results and reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/20"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">
                      {result.testName}
                    </p>
                    <p className="text-sm text-gray-600">by {result.doctor}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {result.date}
                      </span>
                      <Badge
                        variant={
                          result.status === "Normal" ? "default" : "secondary"
                        }
                        className={
                          result.status === "Normal"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(result.id)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div variants={fadeInUp}>
          <Card className="glass-effect shadow-healthcare border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>
                Your scheduled lab appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/50"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {appointment.testName}
                      </h3>
                      <Badge variant="outline">{appointment.date}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {appointment.time}
                      </span>
                      <span>{appointment.location}</span>
                    </div>
                    <div className="text-sm text-gray-600 bg-yellow-50 p-2 rounded border border-yellow-200">
                      <strong>Instructions:</strong> {appointment.instructions}
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReschedule(appointment.id)}
                      >
                        Reschedule
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#457B9D] hover:bg-[#457B9D]/90"
                        onClick={() => handleViewDetails(appointment.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                className="w-full bg-[#E63946] hover:bg-[#E63946]/90"
                onClick={handleSchedule}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule New Test
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={fadeInUp}>
        <Card className="glass-effect shadow-healthcare border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 hover:scale-105 transition-transform"
                onClick={handleHomeCollection}
              >
                <TestTube className="h-6 w-6 text-purple-500" />
                <span className="text-sm">Home Collection</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 hover:scale-105 transition-transform"
                onClick={handleViewAllResults}
              >
                <FileText className="h-6 w-6 text-green-500" />
                <span className="text-sm">View All Results</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 hover:scale-105 transition-transform"
                onClick={handleAppointmentHistory}
              >
                <Calendar className="h-6 w-6 text-blue-500" />
                <span className="text-sm">Appointment History</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 hover:scale-105 transition-transform"
                onClick={handleHealthReports}
              >
                <Download className="h-6 w-6 text-orange-500" />
                <span className="text-sm">Health Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
