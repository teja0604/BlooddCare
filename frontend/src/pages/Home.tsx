// src/pages/Home.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiUsers, FiActivity, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import heroImage from '@/assets/hero-blood-donation.jpg';

const Home = () => {
  const stats = [
    { icon: FiUsers, value: "50K+", label: "Lives Saved", color: "text-success" },
    { icon: FiHeart, value: "25K+", label: "Active Donors", color: "text-primary" },
    { icon: FiActivity, value: "1.2M", label: "Blood Units", color: "text-medical-blue" },
    { icon: FiMapPin, value: "500+", label: "Partner Hospitals", color: "text-warning" }
  ];

  const features = [
    {
      image: "/safeandsecure.svg.jpeg",
      title: "Safe & Secure",
      description: "Medical-grade safety protocols and secure data handling"
    },
    {
      image: "/realtimematching.svg.jpeg",
      title: "Real-time Matching",
      description: "Instant matching of donors with urgent blood requirements"
    },
    {
      image: "/communitydriven.svg.jpeg",
      title: "Community Driven",
      description: "Join thousands of heroes saving lives through blood donation"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-medical py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                >
                  <FiHeart className="w-4 h-4 animate-pulse-soft" />
                  <span>Saving Lives Together</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Donate Blood,{' '}
                  <span className="bg-gradient-primary">
                    Save Lives
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Join our community of heroes and help those in need. Every donation can save up to three lives. 
                  Your contribution makes a difference in someone's world.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/register">
                  <Button className="btn-medical-primary group px-8 py-4 text-lg">
                    <FiHeart className="w-5 h-5 mr-2" />
                    Become a Donor
                    <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link to="/requests">
                  <Button className="btn-medical-secondary px-8 py-4 text-lg">
                    <FiActivity className="w-5 h-5 mr-2" />
                    Find Blood
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img 
                  src={heroImage}
                  alt="Blood donation center with medical professionals"
                  className="rounded-2xl shadow-medical w-full h-auto animate-float"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-hero opacity-20 blur-2xl rounded-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="flex justify-center">
                  <div className="card-stat">
                    <stat.icon className={`w-10 h-10 mx-auto ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose BloodCare?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide a secure, efficient, and compassionate platform for blood donation management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="card-medical text-center space-y-4 h-full">
                  <div className="flex justify-center">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-24 h-24 object-contain rounded-2xl shadow-md hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-red-600">
                Ready to Save Lives?
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Join thousands of donors who are making a difference. 
                Your donation could be the gift of life for someone in need.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-red-600 text-white hover:bg-red-700 px-8 py-4 text-lg font-semibold rounded-lg shadow">
                  <FiHeart className="w-5 h-5 mr-2" />
                  Register as Donor
                </Button>
              </Link>
              
              <Link to="/login">
                <Button className="bg-red-600 text-white hover:bg-red-700 px-8 py-4 text-lg font-semibold rounded-lg shadow">
                  <FiUsers className="w-5 h-5 mr-2" />
                  Login to Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
