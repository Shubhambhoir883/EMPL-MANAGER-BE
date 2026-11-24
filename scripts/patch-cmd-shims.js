import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const binDir = path.resolve(__dirname, '..', 'node_modules', '.bin');

if (fs.existsSync(binDir)) {
  const files = fs.readdirSync(binDir);
  for (const file of files) {
    if (file.endsWith('.cmd')) {
      const filePath = path.join(binDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('SET dp0=%~dp0')) {
        fs.writeFileSync(filePath, content.replace(/SET dp0=%~dp0/g, 'SET "dp0=%~dp0"'), 'utf8');
      }
    }
  }
}
