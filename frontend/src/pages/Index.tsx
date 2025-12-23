// Update this page (the content is just a fallback if you fail to update the page)

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiHome } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 max-w-md"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center">
            <FiHeart className="w-10 h-10 text-white animate-pulse-soft" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            BloodCare
          </h1>
          <p className="text-xl text-muted-foreground">
            Professional blood donation management system
          </p>
        </div>
        
        <Link to="/">
          <Button className="btn-medical-primary">
            <FiHome className="w-5 h-5 mr-2" />
            Go to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Index;
