import fs from 'fs';
import path from 'path';

const htmlPath = path.join(process.cwd(), 'dist', 'index.html');

try {
  // Read the HTML file
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Remove type="module" and add defer attribute
  html = html.replace(/type="module"/g, 'defer');
  
  // Write the modified HTML back
  fs.writeFileSync(htmlPath, html);
  
  console.log('✅ Successfully modified script tags for GitHub Pages compatibility');
} catch (error) {
  console.error('❌ Error in post-build script:', error);
  process.exit(1);
} 