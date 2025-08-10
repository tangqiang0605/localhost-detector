const express = require('express');
const { findOpenPorts } = require('./scanner');

function startServer(port) {
  const app = express();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.get('/api/open-ports', async (req, res) => {
    try {
      const openPorts = await findOpenPorts();
      const urls = openPorts.map(p => `http://localhost:${p}`);
      res.json(urls);
    } catch (error) {
      res.status(500).json({ error: 'Failed to scan ports' });
    }
  });

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

module.exports = { startServer };
