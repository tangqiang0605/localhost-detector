const express = require('express');
const cors = require('cors');
const { findOpenPorts } = require('./scanner');

function startServer(port) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.post('/api/open-ports', async (req, res) => {
    try {
      const { ports } = req.body;
      if (!ports || !Array.isArray(ports)) {
        return res.status(400).json({ error: 'Invalid or missing ports list in request body.' });
      }
      const openPorts = await findOpenPorts(ports);
      const urls = openPorts.map(p => `http://localhost:${p}`);
      res.json(urls);
    } catch (error) {
      console.error('Error scanning ports:', error);
      res.status(500).json({ error: 'Failed to scan ports' });
    }
  });

  app.listen(port, () => {
    console.log(`\n🚀 Server listening on http://localhost:${port}`);
    console.log('\nAPI Endpoints:');
    console.log(`  POST /api/open-ports - Scan for open ports.`);
    console.log('\nExample usage with curl:');
    console.log(`  curl -X POST -H "Content-Type: application/json" -d '{"ports": [3000, 8080]}' http://localhost:${port}/api/open-ports`);
    console.log('\nSee README.md for more details.\n');
  });
}

module.exports = { startServer };