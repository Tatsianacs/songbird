import { EN_MOVIES } from './en-movie-config';
import { RU_MOVIES } from './ru-movie-config';
import { CARTOONS } from './cartoon-config';
import { NEW_MOVIES } from './new-movie-config';
import { SERIES } from './series-config';
import { OSCAR_MOVIES } from './oscar-movie-config';
import { QuizTab } from '../models/quiz-tab.model';

export const TABS: QuizTab[] = [
  {
    id: 'en_movie',
    displayName: 'Зарубежные',
    firebaseId: 'EN',
    sequenceNo: 0,
    tabMovies: EN_MOVIES
  },
  {
    id: 'ru_movie',
    displayName: 'Русские',
    firebaseId: 'RU',
    sequenceNo: 1,
    tabMovies: RU_MOVIES
  },
  {
    id: 'cartoon',
    displayName: 'Мультфильмы',
    firebaseId: 'CARTOON',
    sequenceNo: 2,
    tabMovies: CARTOONS
  },
  {
    id: 'series',
    displayName: 'Сериалы',
    firebaseId: 'SOAP',
    sequenceNo: 3,
    tabMovies: SERIES
  },
  {
    id: 'newest',
    displayName: 'Новейшие',
    firebaseId: '2020',
    sequenceNo: 4,
    tabMovies: NEW_MOVIES
  },
  {
    id: 'oscar',
    displayName: 'Оскар',
    firebaseId: 'BEST',
    sequenceNo: 5,
    tabMovies: OSCAR_MOVIES
  }
];
