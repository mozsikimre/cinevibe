import React, { useState } from 'react';
import './ThemesDropdown.css';

const themes = ['Dark', 'Light'];

const ThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>(themes[0]); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectTheme = (theme: string) => {
    setSelectedTheme(theme);
    

    document.body.className = ''; 
    if (theme === 'Dark') {
      document.body.classList.add('dark-theme');
    } else if (theme === 'Light') {
      document.body.classList.add('light-theme');
    }
  };

  return (
    <div className="themes-dropdown">
      <button onClick={toggleDropdown} className="themes-dropdown-button">

        {`Selected Theme · ${selectedTheme}`}
      </button>
      <img src="arrow.png" alt="arrow" className={`themes-arrow ${isOpen ? 'rotated' : ''}`}  />
      {(
        <ul className={`themes-dropdown-menu ${isOpen ? 'open' : ''}`}>
          {themes.map((theme) => (
            <li
              key={theme}
              onClick={() => selectTheme(theme)}
              className={`themes-dropdown-item ${selectedTheme === theme ? 'themes-selected' : ''}`}
            >
              {theme}
              <span className={`color-box ${selectedTheme === theme ? 'filled' : ''}`}></span>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default ThemeSelector;
