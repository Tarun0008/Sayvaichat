import React, { useState, useEffect } from 'react';
import './style.css';

function REC() {
  const [receivedImage, setReceivedImage] = useState(null);

  useEffect(() => {
    // Fetch the received image from the server when the component mounts
    fetch('/get-received-image') // Ensure this endpoint matches your Flask route
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        // Convert the received blob to an object URL
        const imageURL = URL.createObjectURL(blob);
        setReceivedImage(imageURL); // Set the received image URL to state
      })
      .catch(error => console.error('Error fetching image:', error));
  }, []);

  return (
    <div className='whole'>
      <div className="image-frame">
        <div className="axes-container">
          <div className='heading'>
            <h2>Received Image</h2>
          </div>
          <div className="image-container">
            {receivedImage && ( // Display the image if it exists
              <img
                src={receivedImage}
                alt="Received Image"
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
          <br/>
          <button className='button-17'>
            Receive
          </button>
        </div>
      </div>
    </div>
  );
}

export default REC;
