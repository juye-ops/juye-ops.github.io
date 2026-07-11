const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_USERNAME = "juye-ops"
const GITHUB_REPOSITORY = "blog-contents"
const GITHUB_BRANCH = "data";
const GITHUB_BASE = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}/${GITHUB_BRANCH}`;

const DATA_FILENAME = {
  POSTS_TREE: "posts.tree.json",
  POSTS_FLAT: "posts.flat.json",
  PORTFOLIO: "portfolio.json",
  ABOUT: "about.json",
};

const OUTPUT_DIR = path.join(process.cwd(), 'src/shared/metadata');

// 디렉토리 생성
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function downloadFile(fileName) {
  const url = `${GITHUB_BASE}/${fileName}`
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${fileName}: ${res.statusCode}`));
        return;
      }
      const filePath = path.join(OUTPUT_DIR, fileName);
      const writeStream = fs.createWriteStream(filePath);
      res.pipe(writeStream);
      writeStream.on('finish', () => {
        writeStream.close();
        console.log(`✅ Downloaded: ${fileName}`);
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('🚀 Starting prebuild data fetch...');
  try {
    await Promise.all([
      downloadFile(DATA_FILENAME.POSTS_TREE),
      downloadFile(DATA_FILENAME.POSTS_FLAT),
      downloadFile(DATA_FILENAME.PORTFOLIO),
      downloadFile(DATA_FILENAME.ABOUT),
    ]);
    console.log('🎉 All data downloaded successfully!');
  } catch (err) {
    console.error('❌ Fetch failed:', err.message);
    process.exit(1);
  }
}

run();