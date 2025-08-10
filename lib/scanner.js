const portscanner = require('portscanner');

function parsePortInput(input) {
  const result = [];

  // 保证一定是数组，方便统一处理
  const items = Array.isArray(input) ? input : [input];

  for (const item of items) {
    if (typeof item === 'number') {
      result.push(item);                       // 单个数字
    } else if (typeof item === 'string') {
      const range = item.split('-').map(Number);
      if (range.length === 1) {
        result.push(range[0]);                 // 字符串 "5000"
      } else if (range.length === 2) {
        // 字符串 "8000-9000"
        const [start, end] = range;
        for (let p = start; p <= end; p++) {
          result.push(p);
        }
      }
    }
  }
  return [...new Set(result)].sort((a, b) => a - b); // 去重并排序
}

async function findOpenPorts(ports) {
  const openPorts = [];
  const parsedPorts = parsePortInput(ports); // 解析输入的端口
  for (const port of parsedPorts) {
    const status = await portscanner.checkPortStatus(port, 'localhost');
    if (status === 'open') {
      openPorts.push(port);
    }
  }
  return openPorts;
}

module.exports = { findOpenPorts };
