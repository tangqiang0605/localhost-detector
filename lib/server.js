const express = require('express');
const cors = require('cors');
const { findOpenPorts } = require('./scanner');

function startServer(port) {
  const app = express();

  // Use the cors middleware
  app.use(cors());

  // Middleware to parse JSON bodies
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
    console.log(`Server listening on http://localhost:${port}`);
  });
}

module.exports = { startServer };