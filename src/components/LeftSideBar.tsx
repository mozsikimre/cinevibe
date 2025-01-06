import { useEffect, useState } from 'react';
import GenreDropdown from '../utils/GenreDropdown';
import ThemeSelector from '../utils/ThemesDropdown';
import './../utils/GenreDropdown.css';
import { fetchRandomMovie } from '../api/MovieApi';
import { useNavigate } from 'react-router-dom';
import { getUserData, handleLogout } from '../login/AuthHelpers'; 

import './LeftSideBar.css';

interface LeftSideBarProps {
  runtimeMin: number | '';
  setRuntimeMin: React.Dispatch<React.SetStateAction<number | ''>>;
  runtimeMax: number | '';
  setRuntimeMax: React.Dispatch<React.SetStateAction<number | ''>>;
  ratingMin: number | '';
  setRatingMin: React.Dispatch<React.SetStateAction<number | ''>>;
  ratingMax: number | '';
  setRatingMax: React.Dispatch<React.SetStateAction<number | ''>>;
  releaseYearMin: number | '';
  setReleaseYearMin: React.Dispatch<React.SetStateAction<number | ''>>;
  releaseYearMax: number | '';
  setReleaseYearMax: React.Dispatch<React.SetStateAction<number | ''>>;
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
  isLeftHidden: boolean;
  setLeftIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({
  runtimeMin, setRuntimeMin,
  runtimeMax, setRuntimeMax,
  ratingMin, setRatingMin,
  ratingMax, setRatingMax,
  releaseYearMin, setReleaseYearMin,
  releaseYearMax, setReleaseYearMax,
  selectedGenres, setSelectedGenres,
  isLeftHidden, setLeftIsHidden
}) => {
  const [localRuntimeMin, setLocalRuntimeMin] = useState<number | ''>(runtimeMin);
  const [localRuntimeMax, setLocalRuntimeMax] = useState<number | ''>(runtimeMax);
  const [localRatingMin, setLocalRatingMin] = useState<number | ''>(ratingMin);
  const [localRatingMax, setLocalRatingMax] = useState<number | ''>(ratingMax);
  const [localReleaseYearMin, setLocalReleaseYearMin] = useState<number | ''>(releaseYearMin);
  const [localReleaseYearMax, setLocalReleaseYearMax] = useState<number | ''>(releaseYearMax);
  const [localGenres, setLocalGenres] = useState<string[]>(selectedGenres);

  const [username, setUsername] = useState<string | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = getUserData(setUsername); // Felhasználóadatok beállítása
    return () => unsubscribe(); // Listener törlése a komponens eltávolításakor
  }, []);

  const handleAuthClick = () => {
    if (username) {
      handleLogout(setUsername); // Kijelentkeztetés
    } else {
      navigate('/auth'); // Bejelentkezés oldalra irányítás
    }
  };

  const handleSave = async () => {
    setRuntimeMin(localRuntimeMin);
    setRuntimeMax(localRuntimeMax);
    setRatingMin(localRatingMin);
    setRatingMax(localRatingMax);
    setReleaseYearMin(localReleaseYearMin);
    setReleaseYearMax(localReleaseYearMax);
    setSelectedGenres(localGenres);

    // Film lekérése új szűrőértékekkel
    await fetchRandomMovie(
      localRuntimeMin,
      localRuntimeMax,
      localRatingMin,
      localRatingMax,
      localReleaseYearMin,
      localReleaseYearMax,
      localGenres,
      true // Új oldal lekérése a mentéskor
    );
  };

  const handleClear = async () => {
    setLocalRuntimeMin('');
    setLocalRuntimeMax('');
    setLocalRatingMin('');
    setLocalRatingMax('');
    setLocalReleaseYearMin('');
    setLocalReleaseYearMax('');
    setLocalGenres([]);

    // Film lekérése alapértelmezett szűrőkkel
    await fetchRandomMovie('', '', '', '', '', '', [], true);
  };

  const handleToggle = () => {
    setLeftIsHidden(prev => !prev); // Oldalsáv megjelenítésének váltása
  };

  return (
    <div className={`left-container ${isLeftHidden ? 'hidden' : ''}`}>
      <div className='user-container'>
        <div className='user-icon-container'>
          <img src="src/assets/user.png" alt="user-icon" />
        </div>
        {username ? username : 'Guest'}
      </div>

      <img src={`src/assets/eye${isLeftHidden ? '-hidden' : ''}.png`} 
            alt="hide-button-left" 
            className='hide-button-left' 
            onClick={handleToggle}
      />

      <div className='filters-container'>
        <a>Filters</a>
        <span />

        <div className="runtime-filter">
          <label htmlFor="runtime-min">Runtime </label>
          <div className='runtime-input-container'>
            <input
              type="number"
              id="runtime-min"
              placeholder="Min (min)"
              aria-label="Min runtime"
              min="1"
              value={localRuntimeMin}
              onChange={(e) => setLocalRuntimeMin(e.target.value ? Number(e.target.value) : '')}
            />
            <input
              type="number"
              id="runtime-max"
              placeholder="Max (min)"
              aria-label="Max runtime"
              min="1"
              value={localRuntimeMax}
              onChange={(e) => setLocalRuntimeMax(e.target.value ? Number(e.target.value) : '')}
            />
          </div>
        </div>

        <div className="rating-filter">
          <label htmlFor="rating-min">Rating </label>
          <div className='rating-input-container'>
            <input
              type="number"
              id="rating-min"
              placeholder="Min rating"
              aria-label="Min rating"
              step="1"
              min="1"
              max="10"
              value={localRatingMin}
              onChange={(e) => setLocalRatingMin(e.target.value ? Number(e.target.value) : '')}
            />
            <input
              type="number"
              id="rating-max"
              placeholder="Max rating"
              aria-label="Max rating"
              step="1"
              min="1"
              max="10"
              value={localRatingMax}
              onChange={(e) => setLocalRatingMax(e.target.value ? Number(e.target.value) : '')}
            />
          </div>
        </div>

        <div className="release-date-filter">
          <label htmlFor="release-date-min">Release Year </label>
          <div className='release-date-input-container'>
            <input
              type="number"
              id="release-date-min"
              aria-label="Min release year"
              placeholder="Min year"
              min="1900"
              max="2100"
              value={localReleaseYearMin}
              onChange={(e) => setLocalReleaseYearMin(e.target.value ? Number(e.target.value) : '')}
            />
            <input
              type="number"
              id="release-date-max"
              aria-label="Max release year"
              placeholder="Max year"
              min="1900"
              max="2100"
              value={localReleaseYearMax}
              onChange={(e) => setLocalReleaseYearMax(e.target.value ? Number(e.target.value) : '')}
            />
          </div>
        </div>

        <div className='genre-filter'>
          <GenreDropdown selectedGenres={localGenres} setSelectedGenres={setLocalGenres} />
        </div>

        <div className='middle-btn-container'>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>

      <div className='themes-container'>
        <ThemeSelector />
      </div>

      <div className='bottom-btn-container'>
        <button className='auth-btn' onClick={handleAuthClick}>
          <img src={`src/assets/${username ? 'logout' : 'login'}.png`} alt="auth-icon" />
          <p>{username ? 'Logout' : 'Login'}</p>
        </button>
      </div>
      <div className='powered-by'>
        <p>Powered By</p>
        <div className='powered-by-img'>
          <img src="src\assets\tmdb.png" alt="tmdb-mark" className='tmdb'/>
          <img src="src\assets\flaticon.png" alt="flaticon-mark" className='flaticon'/>
          <img src="src\assets\firebase.png" alt="firebase" className='firebase' />
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;