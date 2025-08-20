import { execSync } from 'child_process';
import { rmSync, cpSync, mkdirSync } from 'fs';
import { join } from 'path';

const apps = [
  { name: 'pokemon', path: 'pokémon-trivia-challenge' },
  { name: 'math', path: 'princess-math-quest' },
  { name: 'opposites', path: 'opposites-flash-cards-for-kids' },
  { name: 'lightbulb', path: 'light-bulb-app' },
  { name: 'maze', path: 'maze-solver-app' },
  { name: 'green-thumb', path: 'green-thumb-ai' },
  { name: 'weekly-history', path: 'weekly-history-app' }
];

console.log('🚀 Starting build process...');

// Ensure public directory exists
try {
  mkdirSync('public', { recursive: true });
} catch (error) {
  // Directory already exists
}

// Build each sub-app
for (const app of apps) {
  console.log(`📦 Building ${app.name} app...`);
  
  try {
    // Install dependencies
    console.log(`  Installing dependencies for ${app.name}...`);
    execSync('npm install', { cwd: app.path, stdio: 'inherit' });
    
    // Build the app
    console.log(`  Building ${app.name}...`);
    execSync('npm run build', { cwd: app.path, stdio: 'inherit' });
    
    // Copy to public directory
    const sourceDir = join(app.path, 'dist');
    const targetDir = join('public', app.name);
    
    console.log(`  Copying ${app.name} to public/${app.name}...`);
    rmSync(targetDir, { recursive: true, force: true });
    cpSync(sourceDir, targetDir, { recursive: true });
    
    console.log(`✅ ${app.name} built successfully!`);
  } catch (error) {
    console.error(`❌ Error building ${app.name}:`, error.message);
    process.exit(1);
  }
}

console.log('🎉 All sub-apps built successfully!');
console.log('📁 Sub-apps are now available in:');
apps.forEach(app => console.log(`   - public/${app.name}/`));
