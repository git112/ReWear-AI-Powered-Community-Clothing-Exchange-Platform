const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create simple placeholder images using SVG
const createPlaceholderSVG = (filename, text, color = '#4F46E5') => {
  const svg = `
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="${color}" opacity="0.1"/>
  <rect width="400" height="400" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="10,5"/>
  <text x="200" y="200" font-family="Arial, sans-serif" font-size="24" fill="${color}" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;

  fs.writeFileSync(path.join(uploadsDir, filename), svg);
  console.log(`Created placeholder: ${filename}`);
};

// Create placeholder images
createPlaceholderSVG('placeholder1.jpg', 'Denim Jacket', '#1E40AF');
createPlaceholderSVG('placeholder2.jpg', 'Floral Dress', '#059669');
createPlaceholderSVG('placeholder3.jpg', 'White T-Shirt', '#6B7280');

console.log('Placeholder images created successfully!'); 