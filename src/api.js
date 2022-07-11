import env from "react-dotenv";

const BASE_URL = "https://api.themoviedb.org/3";

// getTv
export const getTvAiringToday = async () => {
  return await fetch(
    `${BASE_URL}/tv/airing_today?api_key=${env.API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getTvDetail = async (id) => {
  return await fetch(
    `${BASE_URL}/tv/${id}?api_key=${env.API_KEY}&language=ko`
  ).then((res) => res.json());
};

// getMovie
export const getNowPlay = async () => {
  return await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${env.API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getSimilarTvs = async (id) => {
  return await fetch(
    `${BASE_URL}/tv/${id}/similar?api_key=${env.API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getLatestMovies = async () => {
<<<<<<< HEAD
  return await fetch(`${BASE_URL}/movie/latest?api_key=${env.API_KEY}&language=ko`).then((res) => res.json())
}
export const getPopulaMovies = async () => {
  return await fetch(`${BASE_URL}/movie/popular?api_key=${env.API_KEY}&languge=ko`).then(res => res.json())
}

=======
  return await fetch(
    `${BASE_URL}/movie/latest?api_key=${env.API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getPopulaMovies = async () => {
  return await fetch(
    `${BASE_URL}/movie/popular?api_key=${env.API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getUpcomingMovies = async () => {
  return await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${env.API_KEY}&language=ko`
  ).then((res) => res.json());
};
export const getTopRatedMovies = async () => {
  return await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${env.API_KEY}&language=ko`
  ).then((res) => res.json());
};
>>>>>>> d3e89bdffd6af4a7ead572a3a54c66f6c8bd91d6
// getMovie
