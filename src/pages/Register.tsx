// src/pages/Register.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiLock } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    age: '',
    city: '',
    role: 'USER',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        bloodGroup: formData.bloodGroup,
      };

      // ✅ FIX: Use backend on port 8081
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Registration failed");
      }

      console.log("✅ Registration success");
      alert("Registration successful!");
      navigate("/login");
    } catch (error: any) {
      console.error("❌ Registration failed:", error.message);
      alert(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <FiHeart className="w-8 h-8 text-white animate-pulse-soft" />
              </div>
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold text-foreground">Join BloodCare</h2>
              <p className="text-muted-foreground mt-2">
                Register to start saving lives through blood donation
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <Card className="card-medical">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={e => handleInputChange("name", e.target.value)}
                      className="input-medical pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={e => handleInputChange("email", e.target.value)}
                      className="input-medical pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-medium">Phone Number</Label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={e => handleInputChange("phone", e.target.value)}
                      className="input-medical pl-10"
                    />
                  </div>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-foreground font-medium">Age</Label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="age"
                      type="number"
                      min="18"
                      max="65"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={e => handleInputChange("age", e.target.value)}
                      className="input-medical pl-10"
                    />
                  </div>
                </div>

                {/* Blood Type */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Blood Type</Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={value => handleInputChange("bloodGroup", value)}
                  >
                    <SelectTrigger className="input-medical">
                      <SelectValue placeholder="Select your blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-foreground font-medium">City</Label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="city"
                      type="text"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={e => handleInputChange("city", e.target.value)}
                      className="input-medical pl-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter a strong password"
                      value={formData.password}
                      onChange={e => handleInputChange("password", e.target.value)}
                      className="input-medical pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Role selection */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Registration Type</Label>
                <Select
                  value={formData.role}
                  onValueChange={value => handleInputChange("role", value)}
                >
                  <SelectTrigger className="input-medical">
                    <SelectValue placeholder="Select registration type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">Patient/Family</SelectItem>
                    <SelectItem value="DONOR">Blood Donor</SelectItem>
                    <SelectItem value="HOSPITAL">Hospital/Medical Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="btn-medical-primary w-full py-6 text-lg"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <>
                    <FiHeart className="w-5 h-5 mr-2" />
                    Register Account
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Footer */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary-dark font-semibold transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
