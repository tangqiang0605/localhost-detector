import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpenPorts = async () => {
      try {
        const response = await fetch('http://localhost:9999/api/open-ports');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUrls(data);

        if (chrome.runtime?.id) {
          chrome.action.setBadgeText({ text: String(data.length) });
          chrome.action.setBadgeBackgroundColor({ color: '#007bff' });
        }

      } catch (e) {
        setError('Failed to connect to the `lcd` server.');
        console.error(e);
        if (chrome.runtime?.id) {
          chrome.action.setBadgeText({ text: '!' });
          chrome.action.setBadgeBackgroundColor({ color: '#d9534f' });
        }
      }
    };

    fetchOpenPorts();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h4>Open Local Ports</h4>
        {urls.length > 0 && !error ? (
          <ul>
            {urls.map(url => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          !error && <p>No open ports detected.</p>
        )}
      </div>
      
      {error ? (
        <div className="footer-error">
            <p><b>{error}</b></p>
            <p>Please run the `lcd` command in your terminal:</p>
            <code>npm install -g local-port-detector && lcd</code>
        </div>
      ) : (
        <div className="footer">
          <p>This plugin lists your open localhost dev servers.</p>
        </div>
      )}
    </div>
  );
}

export default App;