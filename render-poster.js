const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.resolve(__dirname, 'poster.html');
const outPath = path.resolve(__dirname, 'src', 'assets', 'vyapar-digital-instagram-post.png');
const downloadsPath = 'C:\\Users\\kesha.000\\Downloads\\vyapar-digital-instagram-post.png';

// Also create a standalone export HTML with zero outer margins for exact 1080x1350 snapshot
let html = fs.readFileSync(htmlPath, 'utf8');
// Remove the toolbar and body padding for the snapshot version
const snapshotHtml = html
  .replace('<div class="screen-toolbar" id="screenToolbar">', '<div class="screen-toolbar" id="screenToolbar" style="display: none !important;">')
  .replace('body {', 'body { padding: 0 !important; margin: 0 !important; background: transparent !important; } .poster-canvas { box-shadow: none !important; margin: 0 !important; } body_orig {');

const snapshotPath = path.resolve(__dirname, 'poster-snapshot.html');
fs.writeFileSync(snapshotPath, snapshotHtml, 'utf8');

const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--window-size=1080,1350',
  '--screenshot=' + outPath,
  'file:///' + snapshotPath.replace(/\\/g, '/')
];

console.log('Rendering 1080x1350 Instagram poster screenshot...');
const res = spawnSync(chromePath, args, { stdio: 'inherit' });

if (fs.existsSync(outPath)) {
  console.log('Successfully generated poster at:', outPath, 'Size:', fs.statSync(outPath).size);
  fs.copyFileSync(outPath, downloadsPath);
  console.log('Copied to Downloads folder at:', downloadsPath);
  // Clean up temporary snapshot file
  try { fs.unlinkSync(snapshotPath); } catch (e) {}
} else {
  console.error('Failed to generate poster');
}
