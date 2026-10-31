export const MOVIE_APP_BASE_PATH = "/projects/movie-app";

export const movieDetailsPath = (id: string) =>
  `${MOVIE_APP_BASE_PATH}/movie/${id}`;
