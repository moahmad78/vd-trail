const fs = require('fs');
const path = require('path');
const archiver = require('archiver').archiver || require('archiver');

async function deploy() {
  console.log("Starting deployment packaging for Hostinger...");
  
  const deployDir = path.join(__dirname, 'hostinger-deploy');
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true, force: true });
  }
  
  // 1. Copy standalone
  console.log("Copying .next/standalone...");
  const standaloneDir = path.join(__dirname, '.next', 'standalone');
  if (!fs.existsSync(standaloneDir)) {
    console.error("❌ .next/standalone not found! Did you run 'npm run build'?");
    process.exit(1);
  }
  fs.cpSync(standaloneDir, deployDir, { recursive: true });

  // 2. Copy .env
  console.log("Copying .env...");
  if (fs.existsSync(path.join(__dirname, '.env'))) {
    fs.copyFileSync(path.join(__dirname, '.env'), path.join(deployDir, '.env'));
  } else {
    console.warn("⚠️ Warning: No .env file found to copy!");
  }

  // 3. Copy public and static
  console.log("Copying public and .next/static...");
  if (fs.existsSync(path.join(__dirname, 'public'))) {
    fs.cpSync(path.join(__dirname, 'public'), path.join(deployDir, 'public'), { recursive: true });
  }
  if (fs.existsSync(path.join(__dirname, '.next', 'static'))) {
    fs.cpSync(path.join(__dirname, '.next', 'static'), path.join(deployDir, '.next', 'static'), { recursive: true });
  }

  // 4. Copy Prisma schema
  console.log("Copying prisma/schema.prisma...");
  if (fs.existsSync(path.join(__dirname, 'prisma'))) {
    fs.cpSync(path.join(__dirname, 'prisma'), path.join(deployDir, 'prisma'), { recursive: true });
  }

  // 5. Zip it up
  console.log("Zipping files into deploy.zip...");
  const output = fs.createWriteStream(path.join(__dirname, 'deploy.zip'));
  const ArchiverZip = require('archiver').ZipArchive;
  const archive = new ArchiverZip({ zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`🔥 Success! deploy.zip is ready (${archive.pointer()} total bytes)`);
    console.log("Cleaning up temporary deployment folder...");
    fs.rmSync(deployDir, { recursive: true, force: true });
    console.log("🚀 Task Completed! Project root directory me 'deploy.zip' file successfully generate ho gayi hai.");
  });

  archive.on('error', (err) => { throw err; });
  archive.pipe(output);
  archive.directory(deployDir, false);
  archive.finalize();
}

deploy().catch(console.error);
