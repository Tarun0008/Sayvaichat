import React, { useState } from 'react';
import './style.css';

function SEND() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetIP, setTargetIP] = useState('');


  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleIPChange = event => {
    setTargetIP(event.target.value); // Update the target IP when the input changes
  };

  const handleUpload = () => {
    if (!selectedFile || !targetIP) {
      console.error('Please select a file and enter a target IP address');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('/send-image', {
      method: 'POST',
      body: formData,
      headers: {
        'Target-IP': targetIP // Send the target IP in the header
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Image sent:', data);
        // Optionally update state or display a message upon successful image transfer
      })
      .catch(error => console.error('Error sending image:', error));
  };

  return (
    <div className='whole'>
      <div className='heading'>
        <h2>Share a Image</h2>
      </div>
      <br />
      <center>
        <div>
          <input type='file' onChange={handleFileChange} />
          <input type='text' placeholder='Target IP' value={targetIP} onChange={handleIPChange} />
          <br/><br/>
          <button className='button-17' onClick={handleUpload}>Upload Image</button>
        </div>
        
      </center>
    </div>
  );
}

export default SEND;
