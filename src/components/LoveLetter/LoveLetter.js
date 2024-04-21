import React, { useState, useRef } from 'react';
import './LoveLetter.css';
import audioFile from './kushi.mp3';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullSize, setIsFullSize] = useState(false);
  const audioRef = useRef(null);

  const handleNonFiniteError = (element, propertyName, value) => {
    if (element && Number.isFinite(value)) {
      element[propertyName] = value;
    } else {
      console.error(`Error: Failed to set the '${propertyName}' property on '${element && element.tagName}': The provided value '${value}' is non-finite.`);
      // Handle the error gracefully here, such as setting a default value or displaying a message to the user
    }
  };

  const handleOpenLetter = (startTime = 0) => {
    setIsOpen(true);
    setTimeout(() => {
      setIsFullSize(true);
      if (audioRef.current) {
        if (audioRef.current.readyState >= 0.3) {
          handleNonFiniteError(audioRef.current, 'currentTime', startTime);
          audioRef.current.play()
            .then(() => console.log("Playback succeeded"))
            .catch(e => console.error("Playback failed:", e));
        } else {
          console.log("Audio is not ready yet");
        }
      }
    }, 800);
  };

  const handleCloseLetter = () => {
    setIsFullSize(false);
    setTimeout(() => {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      } catch (error) {
        console.error("Error pausing audio:", error);
      }
      setIsOpen(false);
    }, 800);
  };

  return (
    <div className={`envelope ${isOpen ? 'open' : ''}`} onClick={!isFullSize ? handleOpenLetter : handleCloseLetter}>
      <div className="flap"></div>
      <div className="body"></div>
      <div className={`letter ${isFullSize ? 'fullSize' : ''}`}>
        Hey there SRII ❤️! Just wanted to say hi and see how you're doing. It's been so long since talking to you, missed you!
      </div>
      <audio ref={audioRef} src={audioFile} onError={(e) => console.error('Audio error:', e.message)} />
    </div>
  );
};

export default LoveLetter;
