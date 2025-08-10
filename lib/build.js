const path = require('path');
const { execSync } = require('child_process');

async function buildExtension() {
  const extensionDir = path.join(__dirname, '..', 'extension');

  console.log('Building the extension...');
  try {
    execSync('npm run build', { cwd: extensionDir, stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to build the extension.');
    console.log('❗️ 请尝试如下命令以安装构建依赖: ')
    console.log(`cd ${extensionDir} && npm install && cd ${process.cwd()}`)
    process.exit(1);
  }
}

module.exports = { buildExtension };