import React, { useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import Output from './components/Output';
import { compileCode } from './services/compilerService';
import './App.css';

function App() {
  const [code, setCode] = useState('// Enter your C++ code here\n#include <iostream>\n\nint main() {\n  std::cout << "Hello, World!" << std::endl;\n  return 0;\n}');
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [status, setStatus] = useState('idle');
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  const handleSubmit = async () => {
    try {
      setIsCompiling(true);
      setStatus('compiling');
      
      const result = await compileCode(code);
      
      setOutput(result);
      setStatus('success');
    } catch (error) {
      setOutput(error instanceof Error ? error.message : 'An unknown error occurred');
      setStatus('error');
    } finally {
      setIsCompiling(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200`}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <h2 className="text-lg font-semibold">Code Editor</h2>
            </div>
            <div className="p-4">
              <CodeEditor 
                code={code} 
                setCode={setCode} 
                isDarkMode={isDarkMode} 
              />
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isCompiling}
                  className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 ${
                    isCompiling 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isCompiling ? 'Compiling...' : 'Compile & Run'}
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <Output 
              output={output} 
              status={status} 
              isDarkMode={isDarkMode} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;