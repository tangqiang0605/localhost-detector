import { useState, useEffect } from 'react';
import './App.css';

const DEFAULT_PORTS = [
  '3000', '8080', '8000', '5173', '4200', '8081', '5000-5010'
];

// Helper to check if running in a Chrome extension context
const isExtension = window.chrome && window.chrome.runtime && window.chrome.runtime.id;

// If not in an extension, mock the necessary chrome APIs to use localStorage
if (!isExtension) {
  console.log("DEV MODE: Mocking chrome APIs with localStorage.");
  window.chrome = {
    ...window.chrome,
    storage: {
      local: {
        get: (keys, callback) => {
          const key = Object.keys(keys)[0];
          const defaultValue = keys[key];
          try {
            const value = localStorage.getItem(key);
            const result = { [key]: value ? JSON.parse(value) : defaultValue };
            callback(result);
          } catch (e) {
            console.error("Error reading from mock storage:", e);
            callback({ [key]: defaultValue });
          }
        },
        set: (items, callback) => {
          try {
            const key = Object.keys(items)[0];
            localStorage.setItem(key, JSON.stringify(items[key]));
            if (callback) callback();
          } catch (e) {
            console.error("Error writing to mock storage:", e);
          }
        },
      },
    },
    action: {
      setBadgeText: () => { /* Mocked: Does nothing in dev mode */ },
      setBadgeBackgroundColor: () => { /* Mocked: Does nothing in dev mode */ },
    },
  };
}

function App() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState(null);
  const [ports, setPorts] = useState([]);
  const [newPort, setNewPort] = useState('');

  useEffect(() => {
    chrome.storage.local.get({ customPorts: DEFAULT_PORTS }, (result) => {
      setPorts(result.customPorts);
      scanPorts(result.customPorts);
    });
  }, []);

  const scanPorts = async (portsToScan) => {
    try {
      const response = await fetch('http://localhost:9999/api/open-ports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ports: portsToScan })
      });
      if (!response.ok) throw new Error('Server responded with an error');
      const data = await response.json();
      setUrls(data);
      setError(null);
      chrome.action.setBadgeText({ text: String(data.length) });
      chrome.action.setBadgeBackgroundColor({ color: '#28a745' });
    } catch (e) {
      setError('Failed to connect to `lcd` server.');
      chrome.action.setBadgeText({ text: '!' });
      chrome.action.setBadgeBackgroundColor({ color: '#d9534f' });
    }
  };

  const handleAddPort = () => {
    if (newPort && !ports.includes(newPort)) {
      const updatedPorts = [...ports, newPort];
      setPorts(updatedPorts);
      chrome.storage.local.set({ customPorts: updatedPorts });
      setNewPort('');
      scanPorts(updatedPorts);
    }
  };

  const handleRemovePort = (portToRemove) => {
    const updatedPorts = ports.filter(p => p !== portToRemove);
    setPorts(updatedPorts);
    chrome.storage.local.set({ customPorts: updatedPorts });
    scanPorts(updatedPorts);
  };

  const handleResetPorts = () => {
    setPorts(DEFAULT_PORTS);
    chrome.storage.local.set({ customPorts: DEFAULT_PORTS });
    scanPorts(DEFAULT_PORTS);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h4>Open Local Ports</h4>
        {urls.length > 0 && !error ? (
          <ul className="port-list">
            {urls.map(url => (
              <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>
            ))}
          </ul>
        ) : !error && (
          <p className="no-ports-msg">No open ports detected.</p>
        )}
        {error && <p className="error-msg">{error}</p>}
      </div>

      <div className="port-management">
        <h5>Manage Ports</h5>
        <div className="tag-container">
          {ports.map(port => (
            <span key={port} className="tag">
              {port}
              <button onClick={() => handleRemovePort(port)}>&times;</button>
            </span>
          ))}
        </div>
        <div className="add-port-form">
          <input 
            type="text" 
            value={newPort} 
            onChange={(e) => setNewPort(e.target.value)} 
            placeholder="e.g., 3001 or 9000-9010"
          />
          <button onClick={handleAddPort}>Add</button>
        </div>
        <button onClick={handleResetPorts} className="reset-btn">Reset to Default</button>
      </div>
    </div>
  );
}

export default App;