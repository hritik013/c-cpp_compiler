import React from 'react';
import { Code2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <Code2 className="mr-2" size={28} />
          <h1 className="text-2xl font-bold">C++ Compiler</h1>
        </div>
        <p className="text-blue-100 mt-1">
          Write, compile and view results in one place
        </p>
      </div>
    </header>
  );
};

export default Header;