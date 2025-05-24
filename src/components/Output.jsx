import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const Output = ({ output, status, isDarkMode }) => {
  const statusConfig = {
    idle: {
      icon: <Clock className="text-gray-400" size={20} />,
      text: 'Waiting for compilation',
      bgColor: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
      textColor: isDarkMode ? 'text-gray-300' : 'text-gray-600'
    },
    compiling: {
      icon: <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>,
      text: 'Compiling your code...',
      bgColor: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100',
      textColor: isDarkMode ? 'text-blue-300' : 'text-blue-700'
    },
    success: {
      icon: <CheckCircle className="text-green-500" size={20} />,
      text: 'Compilation successful',
      bgColor: isDarkMode ? 'bg-green-900/30' : 'bg-green-100',
      textColor: isDarkMode ? 'text-green-300' : 'text-green-700'
    },
    error: {
      icon: <AlertTriangle className="text-red-500" size={20} />,
      text: 'Compilation failed',
      bgColor: isDarkMode ? 'bg-red-900/30' : 'bg-red-100',
      textColor: isDarkMode ? 'text-red-300' : 'text-red-700'
    }
  };
  
  const currentStatus = statusConfig[status];

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
        <h2 className="text-lg font-semibold">Output</h2>
      </div>
      
      <div className={`p-4 ${currentStatus.bgColor} ${currentStatus.textColor} mb-3 rounded-md flex items-center`}>
        <span className="mr-2">{currentStatus.icon}</span>
        <span>{currentStatus.text}</span>
      </div>
      
      <div className="p-4">
        <pre className={`w-full p-3 rounded-md font-mono text-sm whitespace-pre-wrap min-h-[200px] max-h-[400px] overflow-auto ${
          isDarkMode 
            ? 'bg-gray-900 text-gray-100' 
            : 'bg-gray-50 text-gray-900'
        } ${
          status === 'error' ? (isDarkMode ? 'border-red-700' : 'border-red-300') : ''
        } border`}>
          {output || 'No output yet. Click "Compile & Run" to see the results.'}
        </pre>
      </div>
    </div>
  );
};

Output.propTypes = {
  output: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['idle', 'compiling', 'success', 'error']).isRequired,
  isDarkMode: PropTypes.bool.isRequired
};

export default Output; 