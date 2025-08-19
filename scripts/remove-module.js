import fs from 'fs';
import path from 'path';

const htmlPath = path.join(process.cwd(), 'dist', 'index.html');

try {
  // Read the HTML file
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Remove type="module" from script tags
  html = html.replace(/type="module"/g, '');
  
  // Write the modified HTML back
  fs.writeFileSync(htmlPath, html);
  
  console.log('✅ Successfully removed type="module" from script tags');
} catch (error) {
  console.error('❌ Error removing module type:', error);
  process.exit(1);
} 