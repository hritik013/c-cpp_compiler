import React from 'react';
import { Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      className="bg-blue-700 text-white shadow-md"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <Code2 className="mr-2" size={28} />
          <h1 className="text-2xl font-bold">C/C++ Compiler</h1>
        </div>
        
      </div>
    </motion.header>
  );
};

export default Header;
