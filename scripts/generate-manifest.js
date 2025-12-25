const fs = require('fs');
const path = require('path');

// Path to public folder
const publicDir = path.join(__dirname, '../public');
const manifestPath = path.join(publicDir, 'samples-manifest.json');

// Read all files in public directory
fs.readdir(publicDir, (err, files) => {
  if (err) {
    console.error('Error reading public directory:', err);
    process.exit(1);
  }

  // Filter only .json files, excluding samples-manifest.json itself
  const jsonFiles = files
    .filter(file => file.endsWith('.json') && file !== 'samples-manifest.json')
    .sort();

  // Create manifest object
  const manifest = {
    files: jsonFiles
  };

  // Write manifest file
  fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), (err) => {
    if (err) {
      console.error('Error writing manifest file:', err);
      process.exit(1);
    }

    console.log('✅ Manifest generated successfully!');
    console.log(`📄 Found ${jsonFiles.length} JSON file(s):`);
    jsonFiles.forEach(file => console.log(`   - ${file}`));
  });
});
