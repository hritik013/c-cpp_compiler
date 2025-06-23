import React, { useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import Output from "./components/Output";
import Tokens from "./components/Tokens";
import { motion } from "framer-motion";
import "./App.css";

// 🔁 Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25
    }
  }
};

const fadeSlideVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 16,
      stiffness: 120
    }
  }
};

function App() {
  const [code, setCode] = useState(
    '// Enter your C++ code here\n#include <iostream>\n\nint main() {\n  std::cout << "Hello, World!" << std::endl;\n  return 0;\n}'
  );
  const [output, setOutput] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [status, setStatus] = useState("idle");
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [tokens, setTokens] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/src/backend/output.txt");
      const text = await response.text();
      setOutput(text);
      setStatus("success");
    } catch (error) {
      setOutput("Failed to load output.txt");
      setStatus("error");
    }
  };

  const handleShowBoth = async () => {
    try {
      const [outputRes, tokensRes] = await Promise.all([
        fetch("/src/backend/compile.txt"),
        fetch("/src/backend/tokens.txt")
      ]);

      const [outputText, tokensText] = await Promise.all([
        outputRes.text(),
        tokensRes.text()
      ]);

      setOutput(outputText);
      setTokens(tokensText);
      setStatus("success");
    } catch (err) {
      setOutput("Failed to load output.");
      setTokens("Failed to load tokens.");
      setStatus("error");
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Header />
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors duration-200`}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </motion.button>
        </div>

        {/* Animated grid with staggered children */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Code Editor Section */}
          <motion.div
            variants={fadeSlideVariant}
            className={`rounded-lg overflow-hidden shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`px-4 py-3 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } border-b ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
            >
              <h2 className="text-lg font-semibold">Code Editor</h2>
            </div>
            <div className="p-4">
              <CodeEditor
                code={code}
                setCode={setCode}
                isDarkMode={isDarkMode}
              />

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={handleSubmit}
                  disabled={isCompiling}
                  className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 ${
                    isCompiling
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isCompiling ? "Compiling..." : "Compile"}
                </button>

                <button
                  onClick={handleShowBoth}
                  className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 ${
                    isDarkMode
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  Show
                </button>
              </div>
            </div>
          </motion.div>

          {/* Output + Tokens Section */}
          <motion.div variants={fadeSlideVariant}>
            <Output output={output} status={status} isDarkMode={isDarkMode} />
            <Tokens tokens={tokens} isDarkMode={isDarkMode} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default App;
