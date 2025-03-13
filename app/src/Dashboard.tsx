import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [btcPrice, setBtcPrice] = useState<string>('Loading...');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    fetchPrice();

    return () => clearInterval(timer);
  }, []);

  const fetchPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await response.json();
      setBtcPrice(data.bitcoin.usd.toLocaleString('en-US'));
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
      setBtcPrice('Error');
    }
  };

  return (
    <div className="container">
      <img src="/uwyo.png" alt="University of Wyoming Logo" className="logo" />
      <h1>University of Wyoming Blockchain Club</h1>
      <img src="/uwyoblockchain.png" alt="Blockchain Club Logo" className="logo" />

      <div className="section">
        <h2>Current Time & Block Height</h2>
        <p>{currentTime}</p>
        <p>Bitcoin Block Height: <strong>832,000</strong></p>
      </div>

      <div className="section">
        <h2>Node Connection Status</h2>
        <p>Status: <strong>Connected</strong></p>
        <p>Uptime: <strong>5 days, 3 hours</strong></p>
        <img src="/node.jpg" alt="Node Status Image" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
      </div>

      <div className="section">
        <h2>Connected Internal Peers</h2>
        <p>Peers: <strong>3</strong></p>
        <ul>
          <li>Wyoming Community College - Status: Connected</li>
          <li>Casper College - Status: Connected</li>
          <li>Laramie Blockchain Club - Status: Connected</li>
        </ul>
        <button className="button" onClick={() => window.location.href = 'map.html'}>
          View Peer Map
        </button>
      </div>

      <div className="section">
        <h2>Club Twitter Feed</h2>
        <p>Latest Tweets:</p>
        <p>"Excited to announce our new Bitcoin research initiative at UWyo!"</p>
      </div>

      <div className="section">
        <h2>Bitcoin Price</h2>
        <p>Current Price: $<strong>{btcPrice}</strong></p>
        <p>Last Updated: {lastUpdated}</p>
        <button onClick={fetchPrice} className="button">Refresh Price</button>
      </div>
    </div>
  );
};

export default Dashboard;

