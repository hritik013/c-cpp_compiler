import React from 'react';
import PropTypes from 'prop-types';
import { FileText } from 'lucide-react';

const Tokens = ({ tokens, isDarkMode }) => {
  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FileText size={20} />
          Tokens
        </h2>
      </div>
      
      <div className="p-4">
        <pre className={`w-full p-3 rounded-md font-mono text-sm whitespace-pre-wrap min-h-[200px] max-h-[400px] overflow-auto ${
          isDarkMode 
            ? 'bg-gray-900 text-gray-100' 
            : 'bg-gray-50 text-gray-900'
        } border`}>
          {tokens || 'No tokens yet. Click "Show Tokens" to display them.'}
        </pre>
      </div>
    </div>
  );
};

Tokens.propTypes = {
  tokens: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};

export default Tokens;
