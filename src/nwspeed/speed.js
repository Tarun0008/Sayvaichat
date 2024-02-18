import React, { useState, useEffect } from 'react';
import './style.css';

function SPEED() {
  const [speed, setSpeed] = useState(null);

  const handleSpeed = () => {
    fetch('/speed')
      .then(response => response.json())
      .then(data => setSpeed(data.devices[0]))
      .catch(error => console.error('Error fetching speed:', error));
  };

  useEffect(() => {
    handleSpeed();
  }, []);

  return (
    <div className='whole'>
      <div className='heading'>
        <h2>Network Speed Tester</h2>
      </div>
      <br />
      <center>
        {speed && (
          <table className='network-table'>
            <thead>
              <tr>
                <th>Measurement</th>
                <th>Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Download Speed</td>
                <td>{speed.down} Kbps</td>
              </tr>
              <tr>
                <td>Upload Speed</td>
                <td>{speed.up} Kbps</td>
              </tr>
            </tbody>
          </table>
        )}
        <br />
        <button className='button-17' onClick={handleSpeed}>Get Speed</button>
      </center>
    </div>
  );
}

export default SPEED;
