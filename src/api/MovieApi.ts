const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// A műfajok ID értékei, amelyeket a TMDb API használ
const genreMap: { [key: string]: number } = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  ScienceFiction: 878,
  TVMovie: 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

// A letöltött filmek listája, amíg el nem fogynak
let storedMovies: any[] = [];

// A következő előkészített film változója
let nextMovie: any = null;

// Véletlenszerű film lekérő függvény
export const fetchRandomMovie = async (
  runtimeMin: number | '',
  runtimeMax: number | '',
  ratingMin: number | '',
  ratingMax: number | '',
  releaseYearMin: number | '',
  releaseYearMax: number | '',
  selectedGenres: string[],
  forceNewPage: boolean = false,
  placeholderDelay: number = 600
) => {
  // API kérés konfigurálása
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };

  // Új oldal letöltése, ha az előző elfogyott vagy frissítés szükséges
  if (storedMovies.length === 0 || forceNewPage) {
    const randomPage = Math.floor(Math.random() * 500) + 1;

    // Műfajok ID-k beállítása a kiválasztott műfajok alapján
    const genreIds = selectedGenres
      .map(genre => genreMap[genre])
      .filter(id => id !== undefined);

    const genreQuery = genreIds.length > 0 ? `&with_genres=${genreIds.join(',')}` : '';
    console.log(genreQuery);

    // API URL a szűrők alapján
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPage}&sort_by=popularity.desc&vote_average.gte=${ratingMin}&vote_average.lte=${ratingMax}&with_runtime.gte=${runtimeMin}&with_runtime.lte=${runtimeMax}&release_date.gte=${releaseYearMin}&release_date.lte=${releaseYearMax}${genreQuery}`;

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      storedMovies = data.results;

      //DEBUG: Display the list of films
      //console.log('Requested movies:', storedMovies);

    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // Ha van tárolt film a listában, választunk egyet
  if (storedMovies.length > 0) {
    let selectedMovie;

    // Előkészített film kiválasztása, ha elérhető
    if (nextMovie) {
      selectedMovie = nextMovie;
    } else {
      const randomIndex = Math.floor(Math.random() * storedMovies.length);
      selectedMovie = storedMovies.splice(randomIndex, 1)[0];
    }

    // Következő előkészítése a listából
    if (storedMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * storedMovies.length);
      nextMovie = storedMovies.splice(randomIndex, 1)[0];
    } else {
      nextMovie = null;
    }

    // Film részleteinek lekérése
    const movieDetailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}?language=en-US`, options);
    const movieDetails = await movieDetailsResponse.json();

    // Rendező adatainak lekérése
    const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits`, options);
    const creditsData = await creditsResponse.json();

    // Rendező kiválasztása
    const director = creditsData.crew.find((member: any) => member.job === 'Director')?.name || 'No data available';

    // Helyettesítő kártya háttérképének frissítése a következő filmmel
    if (nextMovie) {
      setTimeout(() => {
        const placeholderCard = document.querySelector('.placeholder-card') as HTMLElement;
        if (placeholderCard) {
          placeholderCard.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${nextMovie.poster_path})`;
        }
      }, placeholderDelay);
    }

    // Film részleteinek visszaadása a rendezővel együtt
    return { ...movieDetails, director };
  }

  // Ha nincs több film, null érték visszaadása
  return null;
};
