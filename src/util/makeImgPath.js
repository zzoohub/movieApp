const BASE_URL = "https://image.tmdb.org/t/p";

export const makeImgPath = (id, format) => {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
};
