const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function buildExtension(outDir) {
  const extensionDir = path.join(__dirname, '..', 'extension');
  const buildDir = path.join(extensionDir, 'dist');
  const targetDir = path.resolve(process.cwd(), outDir);

  console.log('Building the extension...');
  try {
    execSync('npm run build', { cwd: extensionDir, stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to build the extension.');
    console.log('❗️ 请尝试如下命令以安装构建依赖: ')
    console.log(`cd ${extensionDir} && npm install && cd ${process.cwd()}`)
    process.exit(1);
  }

  console.log(`Exporting extension to ${targetDir}...`);
  try {
    await fs.emptyDir(targetDir);
    await fs.copy(buildDir, targetDir);
    console.log('\nExtension built successfully!');
    console.log('\nTo use the extension in Chrome:');
    console.log('1. Open Chrome and navigate to chrome://extensions');
    console.log('2. Enable "Developer mode" in the top right corner');
    console.log('3. Click "Load unpacked" and select the following directory:');
    console.log(`   ${targetDir}`);
  } catch (error) {
    console.error(`Failed to export the extension: ${error.message}`);
  }
}

module.exports = { buildExtension };