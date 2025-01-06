import React from 'react';
import './Middle.css';

interface MovieCardProps {
  title: string;
  genres: { name: string }[];
  overview: string;
  director: string;
  voteAverage: number;
  runtime: number;
  releaseDate: string;
  posterPath: string;
  onLike: () => void; 
  onDislike: () => void; 
  onMark: () => void; 
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  genres,
  overview,
  director,
  voteAverage,
  runtime,
  releaseDate,
  posterPath,
  onLike,
  onDislike,
  onMark,
}) => {
  return (
    <div className="movie-info" 
      style={{
        backgroundImage: posterPath
          ? `url(https://image.tmdb.org/t/p/w500${posterPath})`
          : undefined
      }}>
      <div className='preview-container'>
        <span className='title-text'>{title}</span>
        <div className='genres-container'>
          {genres.slice(0, 6).map((genre) => (
            <span className='genre-item' key={genre.name}>
              {genre.name}
            </span>
          )) || 'Nincs adat'}
        </div>

        <div className='buttons'>
          <button className='dislike' onClick={onDislike}>
            <img src="close.png" alt="dislike" />
          </button>
          <button className='mark' onClick={onMark}>
            <img src="bookmark.png" alt="mark" />
          </button>
          <button className='like' onClick={onLike}>
            <img src="like.png" alt="like" />
          </button>
        </div>
      </div>
      <div className='more-info-container'>
        <span className='under-blur'></span>
        <div className='more-info'>
          <span className='short-description-header'>More About</span>
          <p className='short-description'>{overview}</p>

          <span className='genres-header'>Genres</span>
          <span className='genres'>{genres.map((genre) => genre.name).join(', ')}</span>

          <div className='director-container'>
            <span>Director</span>
            <p className='director'>{director || 'Nincs adat'}</p>
          </div>
          <div className='rating-container'>
            <span>Rating</span>
            <p className='rating'>
              {voteAverage + ' / 10 ' || 'Nincs adat'}
              <img src="star.png" alt="star" />
            </p>
          </div>
          <div className='runtime-container'>
            <span>Runtime</span>
            <p className='runtime'>{runtime} min</p>
          </div>
          <div className='release-date-container'>
            <span>Release Date</span>
            <p className='release-date'>{releaseDate || 'Nincs adat'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
