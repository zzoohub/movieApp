const BASE_URL = "https://api.themoviedb.org/3";

// getTv
export const getTvAiringToday = async () => {
  return await fetch(
    `${BASE_URL}/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getTvDetail = async (id) => {
  return await fetch(
    `${BASE_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getTvPopular = async (id) => {
  return await fetch(
    `${BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getSimilarTvs = async (id) => {
  return await fetch(
    `${BASE_URL}/tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};

export const getTvOnTheAir = async () => {
  return await fetch(
    `${BASE_URL}/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getTopRatedTvs = async () => {
  return await fetch(
    `${BASE_URL}/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getTvGenres = async () => {
  return await fetch(
    `${BASE_URL}/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getTvRecommendations = async () => {
  return await fetch(
    `${BASE_URL}/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};

// getMovie
export const getSimilarMovies = async (id) => {
  return await fetch(
    `${BASE_URL}/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getNowPlay = async () => {
  return await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getMovieGenres = async () => {
  return await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  ).then((res) => res.json());
};
export const getLatestMovies = async () => {
  return await fetch(
    `${BASE_URL}/movie/latest?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getPopulaMovies = async () => {
  return await fetch(
    `${BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getUpcomingMovies = async () => {
  return await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getTopRatedMovies = async () => {
  return await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getMovieDetail = async (id) => {
  return await fetch(
    `${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
  ).then((res) => res.json());
};


export const getTrending = async (page) => {
  return await fetch(
    `${BASE_URL}/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=ko&page=${page}`
  ).then((res) => res.json());
};
