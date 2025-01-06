import './GenreDropdown.css';

import React, { useState } from 'react';

const GenreDropdown: React.FC<{ selectedGenres: string[]; setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>; }> = ({ selectedGenres, setSelectedGenres }) => {
  const [isOpen, setIsOpen] = useState(false);
  const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'ScienceFiction', 'TVMovie', 'Thriller', 'War', 'Western'];

  // Legördülő menü nyitása/zárása
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
<div className="genre-dropdown">

  <button onClick={toggleDropdown} className="dropdown-button">

    {isOpen ? 'Select Genres' : selectedGenres.length > 0 ? `Selected Genres` : 'Select Genres'}
  </button>
  <img src="src\assets\arrow.png" alt="arrow" className={`genre-arrow ${isOpen ? 'rotated' : ''}`}  />
  {!isOpen && selectedGenres.length > 0 && (
    <div className="selected-genres">
      {selectedGenres.join(', ')}
    </div>
  )}

  <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
    {genres.map(genre => (
      <div 
        key={genre} 
        className={`dropdown-item ${selectedGenres.includes(genre) ? 'selected' : ''}`} 
        onClick={() => handleToggleGenre(genre)}
      >
        {genre}
      </div>
    ))}
  </div>
</div>
  );
};

export default GenreDropdown;
