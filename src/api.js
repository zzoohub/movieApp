import env from "react-dotenv";

const BASE_URL = "https://api.themoviedb.org/3";

export const getPopulaTvs = async (page) => {
  return await fetch(
    `${BASE_URL}/tv/popular?api_key=${env.API_KEY}&language=ko&page=${page}`
  ).then((res) => res.json());
};
