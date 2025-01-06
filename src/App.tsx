import React, { useState, useEffect } from 'react';
import './App.css';
import RightSideBar from './components/RightSideBar';
import LeftSideBar from './components/LeftSideBar';
import Middle from './components/Middle';
import LoadingScreen from './utils/LoadingScreen';
import Auth from './login/Auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [runtimeMin, setRuntimeMin] = useState<number | ''>('');
  const [runtimeMax, setRuntimeMax] = useState<number | ''>('');
  const [ratingMin, setRatingMin] = useState<number | ''>('');
  const [ratingMax, setRatingMax] = useState<number | ''>('');
  const [releaseYearMin, setReleaseYearMin] = useState<number | ''>('');
  const [releaseYearMax, setReleaseYearMax] = useState<number | ''>('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isLeftSectionHidden, setIsLeftSectionHidden] = useState(false);
  const [isRightSectionHidden, setIsRightSectionHidden] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [currentSection, setCurrentSection] = useState('middle'); // Mobilos navigációhoz

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingPage(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <>
      <LoadingScreen show={isLoadingPage} />
      <div className="container">
        {/* Mobilos navigáció gombok */}
        <div className="nav-buttons">
          <div className="indicator" style={{ left: currentSection === 'left' ? '4.5%' : currentSection === 'middle' ? '35%' : '66%' }} />
          <button
            className={`nav-button ${currentSection === 'left' ? 'active' : ''}`}
            onClick={() => handleSectionChange('left')}
          >
            <img src="id-card.png" alt="left" />
          </button>
          <button
            className={`nav-button ${currentSection === 'middle' ? 'active' : ''}`}
            onClick={() => handleSectionChange('middle')}
          >
            <img src="hot-sale.png" alt="middle" />
          </button>
          <button
            className={`nav-button ${currentSection === 'right' ? 'active' : ''}`}
            onClick={() => handleSectionChange('right')}
          >
            <img src="archive.png" alt="right" />
          </button>
        </div>

        <div
          className={`left-section section ${isLeftSectionHidden ? 'hidden' : ''} ${
            currentSection === 'left' ? 'active' : ''
          }`}
        >
          <LeftSideBar
            runtimeMin={runtimeMin}
            setRuntimeMin={setRuntimeMin}
            runtimeMax={runtimeMax}
            setRuntimeMax={setRuntimeMax}
            ratingMin={ratingMin}
            setRatingMin={setRatingMin}
            ratingMax={ratingMax}
            setRatingMax={setRatingMax}
            releaseYearMin={releaseYearMin}
            setReleaseYearMin={setReleaseYearMin}
            releaseYearMax={releaseYearMax}
            setReleaseYearMax={setReleaseYearMax}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            isLeftHidden={isLeftSectionHidden}
            setLeftIsHidden={setIsLeftSectionHidden}
          />
        </div>

        <div className={`middle-section section ${currentSection === 'middle' ? 'active' : ''}`}>
          <Middle
            runtimeMin={runtimeMin}
            runtimeMax={runtimeMax}
            ratingMin={ratingMin}
            ratingMax={ratingMax}
            releaseYearMin={releaseYearMin}
            releaseYearMax={releaseYearMax}
            selectedGenres={selectedGenres}
          />
          <div className="placeholder-card">
            <img src="src/assets/cinevibe_logo.png" alt="tmdb" />
          </div>
        </div>

        <div
          className={`right-section section ${isRightSectionHidden ? 'hidden' : ''} ${
            currentSection === 'right' ? 'active' : ''
          }`}
        >
          <RightSideBar
            isRightHidden={isRightSectionHidden}
            setRightIsHidden={setIsRightSectionHidden}
          />
        </div>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
