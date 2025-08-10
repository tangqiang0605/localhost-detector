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
      } catch (e) {
        setError('Failed to fetch open ports. Is the `lcd` server running?');
        console.error(e);
      }
    };

    fetchOpenPorts();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Open Local Ports</h2>
        {error && <p className="error">{error}</p>}
        {urls.length > 0 ? (
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
      </header>
    </div>
  );
}
export default App;
