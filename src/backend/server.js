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

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../../dist')));

app.post('/run-code', (req, res) => {
  const { code } = req.body;

  const testFilePath = path.join(__dirname, 'test1.cpp');
  const outputExe = path.join(__dirname, 'output.exe');

  fs.writeFileSync(testFilePath, code);

  const compileCmd = `g++ file_opener.cpp scanner.cpp parser.cpp semantics.cpp -o "${outputExe}"`;

  exec(compileCmd, { cwd: __dirname }, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Compilation error:', stderr);
      return res.status(500).send(`❌ Compilation failed:\n${stderr}`);
    }

    const runCmd = `"${outputExe}" "${testFilePath}"`;
    exec(runCmd, { cwd: __dirname }, (runErr, runOut, runErrOut) => {
      if (runErr) {
        console.error('❌ Runtime error:', runErrOut);
        return res.status(500).send(`❌ Runtime error:\n${runErrOut}`);
      }

      res.send(runOut);
    });
  });
});

// Catch-all handler to serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});