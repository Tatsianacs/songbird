/*
    Properties from IMDB API
    https://developer.imdb.com/
 */
export interface ImdbMovieData {
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  original_name?: string;
  original_title?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
}
