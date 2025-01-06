import React from 'react';
import './LoadingScreen.css';
interface LoadingScreenProps {
  show: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ show }) => {
  if (!show) return null;


  return (
    <div className="loading-screen">
      <div className="image-container">
      <img src="v_logo.png" alt="Image 2" className="image-v" />
        <img src="c_logo.png" alt="Image 1" className="image-c" />

      </div>
      <p className="loading-text">Cinevibe</p>
    </div>
  );
};

export default LoadingScreen;
