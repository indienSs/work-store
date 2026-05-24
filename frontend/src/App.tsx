import { useState, useEffect } from 'react';

function App() {
  const [status, setStatus] = useState('checking...');

  useEffect(() => {
    fetch('http://localhost:3000/health')
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>My App</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}

export default App;