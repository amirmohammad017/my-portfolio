export interface MovieSummary {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieRating {
  Source: string;
  Value: string;
}

export interface MovieDetails extends MovieSummary {
  Rated?: string;
  Runtime?: string;
  Genre?: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  BoxOffice?: string;
  Awards?: string;
  imdbRating?: string;
  Ratings?: MovieRating[];
}

export interface MovieSearchResult {
  movies: MovieSummary[];
  totalResults: number;
}
