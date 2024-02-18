import React, { useState } from 'react';
import './style.css';

function CIT() {
  const [devices, setDevices] = useState([]);

  const handleScan = () => {
    fetch('/scan') // Assuming Flask server is running on the same host
      .then(response => response.json())
      .then(data => setDevices(data.devices))
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div className='whole'>
      <div className='heading'>
        <h2>Network Scanner</h2>
      </div>
      <br />
      <center>
       
        <table className='network-table'>
          <thead>
            <tr>
              <th>IP Address</th>
              <th>MAC Address</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => (
              <tr key={index}>
                <td>{device.ip}</td>
                <td>{device.mac}</td>
                <td>{device.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br/>
        <button className='button-17' onClick={handleScan}>Start Scan</button>
      </center>
    </div>
  );
}

export default CIT;
