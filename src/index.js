import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CIT from './components/cit';
import SPEED from './nwspeed/speed';
import SEND from './send/send';
import RECEIVE from './receive/receive'; 
import Chat from './chatgpt/chat';

function Main() {
  const [showCIT, setShowCIT] = useState(false);
  const [showSPEED, setShowSPEED] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [showRec, setShowRec] = useState(false);

  const handleInkButtonClick = () => {
    setShowCIT(true);
    setShowSPEED(false);
    setShowSend(false);
    setShowRec(false);
  };

  const handleSpeedButtonClick = () => {
    setShowSPEED(true);
    setShowCIT(false);
    setShowSend(false);
    setShowRec(false);
  };

  const handleSendButtonClick = () => {
    setShowSend(true);
    setShowSPEED(false);
    setShowCIT(false);
    setShowRec(false);
  };

  const handleReceiveButtonClick = () => {
    setShowRec(true);
    setShowSend(false);
    setShowSPEED(false);
    setShowCIT(false);
  };

  window.triggerInkButtonClick = handleInkButtonClick;
  window.triggerSpeedButtonClick = handleSpeedButtonClick;
  window.triggerSendButtonClick = handleSendButtonClick;
  window.triggerReceiveButtonClick = handleReceiveButtonClick;

  return (
    <React.StrictMode>
      {/* Rendering components based on state */}
      {showCIT ? <CIT /> : showSPEED ? <SPEED /> : showSend ? <SEND /> : showRec ? <RECEIVE /> : <App />}
    </React.StrictMode>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Chat />, rootElement);

export default Main;
