import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/run-code', (req, res) => {
  const { code } = req.body;

  const testFilePath = path.join(__dirname, 'test1.cpp');
  const outputExe = path.join(__dirname, 'output.exe');
  const outputTxt = path.join(__dirname, 'output.txt');

  // Step 1: Write code to test1.cpp
  fs.writeFileSync(testFilePath, code);

  // Step 2: Compile the backend program
  const compileCmd = `g++ file_opener.cpp scanner.cpp parser.cpp semantics.cpp -o "${outputExe}"`;

  exec(compileCmd, { cwd: __dirname }, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Compilation error:', stderr);
      return res.status(500).json({ output: `❌ Compilation failed:\n${stderr}`, status: 'error' });
    }

    // Step 3: Run the compiled executable and redirect output to output.txt
    const runCmd = `"${outputExe}" "${testFilePath}" > "${outputTxt}"`;

    exec(runCmd, { cwd: __dirname }, (runErr, runStdout, runStderr) => {
      if (runErr) {
        console.error('❌ Runtime error:', runStderr);
        return res.status(500).json({ output: `❌ Runtime error:\n${runStderr}`, status: 'error' });
      }

      // Step 4: Read output from output.txt
      fs.readFile(outputTxt, 'utf8', (readErr, data) => {
        if (readErr) {
          return res.status(500).json({ output: '❌ Failed to read output file.', status: 'error' });
        }

        res.json({ output: data, status: 'success' });
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});   