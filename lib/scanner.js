const portscanner = require('portscanner');

// A list of common development ports to check.
const PORTS_TO_CHECK = [
  3000, 3001, 3002, 3003,
  5000, 5001,
  5173, // Vite
  8000, 8080, 8888,
  9000, 9090
];

async function findOpenPorts() {
  const openPorts = [];
  for (const port of PORTS_TO_CHECK) {
    const status = await portscanner.checkPortStatus(port, 'localhost');
    if (status === 'open') {
      openPorts.push(port);
    }
  }
  return openPorts;
}

module.exports = { findOpenPorts };
