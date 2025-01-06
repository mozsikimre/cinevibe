// Toast.tsx
import React, { useEffect, useState } from 'react';
import './ErrorToast.css';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const TOAST_DURATION = 5000; // Duration in milliseconds

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Start a timer for the toast based on TOAST_DURATION
    const timer = setTimeout(onClose, TOAST_DURATION);

    // Calculate decrement for each interval to match the duration
    const decrement = 100 / (TOAST_DURATION / 100);
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(prev - decrement, 0));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className="toast">
        <span>{message}</span>
        <button className="close-btn" onClick={onClose}>
            <img src="src\assets\close.png" alt="close" />
        </button>
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default Toast;
