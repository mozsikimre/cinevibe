import React, { useState, useEffect } from 'react';
import './Middle.css';
import { extractAverageColor, applyBackgroundGradient } from '../utils/ColorHelper';
import useDrag from '../utils/UseDrag';
import MovieCard from './MovieCard';
import { fetchRandomMovie } from '../api/MovieApi';
import { auth, firebaseService } from '../api/Firebase';

interface MiddleProps {
  runtimeMin: number | '';
  runtimeMax: number | '';
  ratingMin: number | '';
  ratingMax: number | '';
  releaseYearMin: number | '';
  releaseYearMax: number | '';
  selectedGenres: string[];
}

const Middle: React.FC<MiddleProps> = ({
  runtimeMin, runtimeMax, ratingMin, ratingMax,
  releaseYearMin, releaseYearMax, selectedGenres
}) => {
  // Állapotok a filmhez és a különböző UI elemekhez
  const [movie, setMovie] = useState<any | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  // Drag funkció beállítása, meghívja a handleMovieDrag-et
  const { dragItemRef, handleMouseDown } = useDrag((direction) => handleMovieDrag(direction));

  // Film húzása közbeni műveletek kezelése
  const handleMovieDrag = async (direction: string) => {
    setIsDragging(true);
    setIsLoading(true);

    // Film mentése Firebase-be a felhasználói tevékenység szerint
    if (movie) {
      const movieTitle = movie.title;
      const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      const uid = auth.currentUser?.uid;

      if (uid) {
        let action: 'like' | 'dislike' | 'mark' | undefined;
        if (direction === 'like') {
          action = 'like';
        } else if (direction === 'dislike') {
          action = 'dislike';
        } else if (direction === 'mark') {
          action = 'mark';
        }

        // Ha van művelet, mentjük Firebase-be
        if (action) {
          await firebaseService.saveMovieToFirebase(uid, movieTitle, posterPath, action); 
        }
      } else {
        console.error('User is not authenticated');
      }
    }

    // Új véletlen film betöltése a szűrők alapján
    const newMovie = await fetchRandomMovie(runtimeMin, runtimeMax, ratingMin, ratingMax, releaseYearMin, releaseYearMax, selectedGenres);
    
    // Új film beállítása és animáció frissítése
    if (newMovie) {
      setMovie(newMovie);
      setIsVisible(false);
      setAnimationClass('');
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }

    setIsLoading(false);
    setIsDragging(false);
  };

  // Gombnyomás események kezelése, például like, dislike vagy mark
  const handleButtonClick = async (action: 'like' | 'dislike' | 'mark') => {
    if (movie) {
      const movieTitle = movie.title;
      const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; 

      // Animáció beállítása a művelet szerint
      if (action === 'like') {
        setAnimationClass('swipe-right');
      } else if (action === 'dislike') {
        setAnimationClass('swipe-left');
      } else if (action === 'mark') {
        setAnimationClass('swipe-up');
      }

      const uid = auth.currentUser?.uid;
      if (uid) {
        await firebaseService.saveMovieToFirebase(uid, movieTitle, posterPath, action); 
      } else {
        console.error('User is not authenticated');
      }

      // Rövid késleltetés után új film betöltése
      setTimeout(() => {
        handleMovieDrag(''); 
      }, 500);
    }
  };

  // Első film betöltése komponens betöltésekor
  useEffect(() => {
    const initializeMovies = async () => {
      const initialMovie = await fetchRandomMovie(
        runtimeMin, runtimeMax, ratingMin, ratingMax, releaseYearMin, releaseYearMax, selectedGenres
      );
      setMovie(initialMovie);
      setIsVisible(true);
    };
  
    initializeMovies();
  }, [runtimeMin, runtimeMax, ratingMin, ratingMax, releaseYearMin, releaseYearMax, selectedGenres]);

  // Háttérszín beállítása a film poszterének átlag színe alapján
  useEffect(() => {
    if (movie?.poster_path) {
      const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      extractAverageColor(imgUrl)
        .then(color => {
          applyBackgroundGradient(color);
        })
        .catch(error => console.error('Error extracting color:', error));
    }
  }, [movie]);

  return (
    <div className="middle-containers">
      {!isLoading && movie && (
        <div
          className={`middle-container current-movie ${isVisible ? 'visible' : 'hidden'} ${animationClass}`}
          ref={dragItemRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          style={{
            zIndex: isDragging ? 1 : 2,
          }}
        >
          <MovieCard
            title={movie.title}
            genres={movie.genres}
            overview={movie.overview}
            director={movie.director}
            voteAverage={movie.vote_average}
            runtime={movie.runtime}
            releaseDate={movie.release_date}
            posterPath={movie.poster_path}
            onLike={() => handleButtonClick('like')}
            onDislike={() => handleButtonClick('dislike')}
            onMark={() => handleButtonClick('mark')}
          />
        </div>
      )}
    </div>
  );
};

export default Middle;
