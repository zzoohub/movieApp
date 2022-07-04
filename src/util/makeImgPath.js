const BASE_URL = "https://image.tmdb.org/t/p";

export const makeImgPath = (id, format) => {
  return `${BASE_URL}/${format ? format : "original"}/${id}`;
};
