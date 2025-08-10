const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { findOpenPorts } = require('./scanner');

function startServer(port) {
  const app = express();
  const distPath = path.join(__dirname, '..', 'extension', 'dist');

  // Check if the dist directory exists before starting the server
  if (!fs.existsSync(distPath)) {
    console.error('Error: The extension has not been built yet.');
    console.error('Please run `lcd build` before starting the server.');
    process.exit(1);
  }

  app.use(cors());
  app.use(express.json());

  // Serve the static files from the extension's dist directory
  app.use(express.static(distPath));

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
    console.log(`\n🚀 Server and Web UI listening on http://localhost:${port}`);
    console.log('\nAPI Endpoints:');
    console.log(`  POST /api/open-ports - Scan for open ports.`);
    console.log('\nExample usage with curl:');
    console.log(`  curl -X POST -H "Content-Type: application/json" -d '{"ports": [3000, 8080]}' http://localhost:${port}/api/open-ports`);
    console.log('\nSee README.md for more details.\n');
  });
}

module.exports = { startServer };