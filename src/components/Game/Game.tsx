import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { QuizTab } from '../../models/quiz-tab.model';
import { Question } from './Question/Question';
import Answers from './Answers/Answers/Answers';
import { Movie } from '../../models/movie.model';
import { getRandomElements } from '../../helpers/helper';
import { forkJoin, of, Subscription } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import appConfig from '../../config/app-config.json';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ImdbMovieData } from '../../models/imdb-movie.model';
import { fromPromise } from 'rxjs/internal-compatibility';
import firebase from '../../config/firebase';

const storage = firebase.storage().ref();
let fetchMovieSubscription: Subscription;

const getQuizOptions = (movies: Movie[]) => {
  return getRandomElements(movies, 6);
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '12px 0'
    }
  }),
);

interface GameProps {
  activeTab: QuizTab | null;
  onNextButtonClick: () => void;
  onActiveTabChange: (tab: QuizTab) => void;
  onScoreChange: (score: number, answer: string) => void;
}

export function Game(props: GameProps) {

  const classes = useStyles();

  const [shouldStop, setStopStatus] = useState(false);
  const [hasCorrectAnswer, setCorrectAnswerStatus] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<Movie | null>(null);
  const [activeAnswers, setActiveAnswers] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = (trailers: Movie[]) => {
      fetchMovieSubscription = forkJoin(...getMovies(trailers))
        .subscribe(() => {
          setActiveAnswers(trailers);
          const activeQuestion = getRandomElements(trailers, 1)[0];
          setActiveQuestion(activeQuestion);
        });
    };

    const getMovies = (trailers: Movie[]) => {
      return trailers.map(trailer => fetchMovieData(trailer));
    };

    const fetchMovieData = (trailer: Movie) => {
      return forkJoin([fetchTrailerUrl(trailer), fetchMovieImdbInfo(trailer)]);
    };

    const fetchMovieImdbInfo = (trailer: Movie) => {
      const apiPath = trailer.isTv ? 'tv' : 'movie';
      return fromFetch(`https://api.themoviedb.org/3/${apiPath}/${trailer.themoviedbId}?api_key=${appConfig.theMovieDbApiKey}&language=ru-RU`)
        .pipe(
          switchMap(response => {
            if (response.ok) {
              return response.json();
            } else {
              return of({ error: true, message: `Error ${response.status}` });
            }
          }),
          tap((data: ImdbMovieData) => {
            trailer.themoviedbOverview = data.overview;
            trailer.themoviedbOriginalTitle = data.original_title || data.original_name;
            trailer.themoviedbTitle = data.title || data.name;
            trailer.themoviedbImagePath = `https://image.tmdb.org/t/p/w154${data.poster_path}`;
            trailer.themoviedbVote = data.vote_average;
            trailer.themoviedbYear = (data.release_date || data.first_air_date)?.slice(0, 4);
          }),
          catchError(err => {
            return of({ error: true, message: err.message });
          })
        );
    };

    const fetchTrailerUrl = (trailer: Movie) => {
      if (!props.activeTab) {
        return of();
      }
      return fromPromise(storage.child('Audio').child(props.activeTab.firebaseId).child(`${trailer.firebaseId}.mp3`)
        .getDownloadURL())
        .pipe(
          tap(url => trailer.urlPath = url),
          catchError(() => of(''))
        );
    };

    if (props.activeTab) {
      resetGame();
      const movies: Movie[] = props.activeTab?.tabMovies;
      fetchMovies(getQuizOptions(movies));
    }

    return () => {
      fetchMovieSubscription && fetchMovieSubscription.unsubscribe();
    };
  }, [props.activeTab]);

  const resetGame = () => {
    setStopStatus(false);
    setCorrectAnswerStatus(false);
    setActiveQuestion(null);
    setActiveAnswers([]);
  };

  const handleNextButtonClick = () => {
    if (hasCorrectAnswer) {
      props.onNextButtonClick();
    }
  };

  const handlePlayerStop = (shouldStop: boolean) => {
    setStopStatus(shouldStop);
  };

  const handleCorrectAnswer = (score: number) => {
    setCorrectAnswerStatus(true);
    const answerTitle = activeQuestion?.themoviedbTitle || 'Unknown';
    props.onScoreChange(score, answerTitle);
  };

  return (
    <div className={classes.root}>
      <Question shouldStop={shouldStop} activeQuestion={activeQuestion} correctAnswerExists={hasCorrectAnswer}/>
      <Answers onAnswerClick={handlePlayerStop} requiredAnswer={activeQuestion} answers={activeAnswers}
               hasCorrectAnswer={hasCorrectAnswer} onNextClick={handleNextButtonClick}
               onCorrectAnswerChange={handleCorrectAnswer}/>
    </div>
  );
}
