import { Movie } from './movie.model';

export interface QuizTab {
  id: string;
  displayName: string;
  firebaseId: string;
  tabMovies: Movie[];
  sequenceNo: number;
}
