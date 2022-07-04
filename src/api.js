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
// getMovie
