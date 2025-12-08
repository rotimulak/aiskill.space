const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../public/images/imagefavico.png');
const publicPath = path.join(__dirname, '../public');
const appPath = path.join(__dirname, '../src/app');

async function generateFavicons() {
  console.log('Generating favicons from:', inputPath);

  // Проверяем существование файла
  if (!fs.existsSync(inputPath)) {
    console.error('Source image not found:', inputPath);
    process.exit(1);
  }

  const image = sharp(inputPath);

  // 1. favicon.ico для src/app (Next.js автоматически использует)
  // Создаём 32x32 PNG, потом конвертируем
  await image
    .clone()
    .resize(32, 32)
    .toFile(path.join(appPath, 'icon.png'));
  console.log('✓ Created src/app/icon.png (32x32)');

  // 2. Apple Touch Icon (180x180)
  await image
    .clone()
    .resize(180, 180)
    .toFile(path.join(appPath, 'apple-icon.png'));
  console.log('✓ Created src/app/apple-icon.png (180x180)');

  // 3. favicon-16x16.png
  await image
    .clone()
    .resize(16, 16)
    .toFile(path.join(publicPath, 'favicon-16x16.png'));
  console.log('✓ Created public/favicon-16x16.png');

  // 4. favicon-32x32.png
  await image
    .clone()
    .resize(32, 32)
    .toFile(path.join(publicPath, 'favicon-32x32.png'));
  console.log('✓ Created public/favicon-32x32.png');

  // 5. Android Chrome icons
  await image
    .clone()
    .resize(192, 192)
    .toFile(path.join(publicPath, 'android-chrome-192x192.png'));
  console.log('✓ Created public/android-chrome-192x192.png');

  await image
    .clone()
    .resize(512, 512)
    .toFile(path.join(publicPath, 'android-chrome-512x512.png'));
  console.log('✓ Created public/android-chrome-512x512.png');

  // 6. Создаём ICO файл (содержит 16x16 и 32x32)
  // Sharp не поддерживает ICO напрямую, создаём PNG и переименовываем
  // Для полноценного ICO нужен дополнительный пакет, но Next.js работает с PNG
  await image
    .clone()
    .resize(48, 48)
    .toFile(path.join(publicPath, 'favicon.png'));
  console.log('✓ Created public/favicon.png (48x48)');

  // 7. Web manifest
  const manifest = {
    name: "Envise",
    short_name: "Envise",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#7c3aed",
    background_color: "#030712",
    display: "standalone"
  };

  fs.writeFileSync(
    path.join(publicPath, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('✓ Created public/site.webmanifest');

  console.log('\n✅ All favicons generated successfully!');
  console.log('\nNext.js will automatically use src/app/icon.png and src/app/apple-icon.png');
}

generateFavicons().catch(console.error);
