const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', 'Untitled design.png');
const appDir = path.join(__dirname, '..', 'app');
const publicDir = path.join(__dirname, '..', 'public');

async function generateIcons() {
  try {
    console.log('Starting icon generation...');

    // Create directories if they don't exist
    if (!fs.existsSync(appDir)) {
      fs.mkdirSync(appDir, { recursive: true });
    }
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate favicon.ico (32x32)
    await sharp(inputFile)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✓ Generated favicon.ico (32x32)');

    // Generate icon.png (32x32)
    await sharp(inputFile)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(appDir, 'icon.png'));
    console.log('✓ Generated icon.png (32x32)');

    // Generate apple-icon.png (180x180)
    await sharp(inputFile)
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(appDir, 'apple-icon.png'));
    console.log('✓ Generated apple-icon.png (180x180)');

    // Generate opengraph-image.png (1200x630)
    // Create a canvas with the logo centered
    const ogWidth = 1200;
    const ogHeight = 630;
    const logoSize = 400;

    // Create background with gradient
    const bgSvg = `
      <svg width="${ogWidth}" height="${ogHeight}">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0e1a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1a2332;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${ogWidth}" height="${ogHeight}" fill="url(#grad)"/>
      </svg>
    `;

    const background = await sharp(Buffer.from(bgSvg)).png().toBuffer();
    const logo = await sharp(inputFile)
      .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    // Composite logo on background
    await sharp(background)
      .composite([{
        input: logo,
        left: Math.floor((ogWidth - logoSize) / 2),
        top: Math.floor((ogHeight - logoSize) / 2)
      }])
      .png()
      .toFile(path.join(appDir, 'opengraph-image.png'));
    console.log('✓ Generated opengraph-image.png (1200x630)');

    // Generate twitter-image.png (1200x630) - same as opengraph
    await sharp(background)
      .composite([{
        input: logo,
        left: Math.floor((ogWidth - logoSize) / 2),
        top: Math.floor((ogHeight - logoSize) / 2)
      }])
      .png()
      .toFile(path.join(appDir, 'twitter-image.png'));
    console.log('✓ Generated twitter-image.png (1200x630)');

    console.log('\n✅ All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
