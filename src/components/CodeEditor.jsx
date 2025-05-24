import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const CodeEditor = ({ code, setCode, isDarkMode, setOutput, setStatus }) => {
  const textareaRef = useRef(null);

  // Handle tab key in textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Insert 2 spaces for tab
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);

      // Move cursor position after the inserted tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStatus('compiling');
      fetch('http://localhost:5000/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.text())
        .then((msg) => {
          setOutput(msg);
          setStatus('success');
        })
        .catch((err) => {
          console.error('Error saving code:', err);
          setOutput(err.message);
          setStatus('error');
        });
    }, 1000); // debounce save after 1s of inactivity

    return () => clearTimeout(timeoutId);
  }, [code, setOutput, setStatus]);

  // Auto-adjust height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  return (
    <div className="code-editor-container">
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`w-full p-3 font-mono text-sm resize-none outline-none transition-colors duration-200 rounded-md ${
          isDarkMode 
            ? 'bg-gray-800 text-gray-100 border border-gray-700' 
            : 'bg-gray-50 text-gray-900 border border-gray-200'
        }`}
        rows={10}
        spellCheck={false}
        aria-label="Code editor"
      />
      <style jsx>{`
        .code-editor-container {
          position: relative;
        }
        textarea {
          min-height: 300px;
          overflow-y: auto;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  setOutput: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired
};

export default CodeEditor;