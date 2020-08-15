import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { QuizTab } from '../../models/quiz-tab.model';
import { Question } from './Question/Question';
import { Button } from '@material-ui/core';
import Answers from './Answers/Answers/Answers';
import { Movie } from '../../models/movie.model';
import { getRandomElements } from '../../helpers/helper';
import { forkJoin, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import appConfig from '../../config/app-config.json';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ImdbMovieData } from '../../models/imdb-movie.model';
import { fromPromise } from 'rxjs/internal-compatibility';
import firebase from '../../config/firebase';

const storage = firebase.storage().ref();

const useStyles = makeStyles(() =>
  createStyles({
    root: {}
  }),
);

interface GameProps {
  activeTab: QuizTab | null;
  onGameStatusChange: (score: number) => void;
  onActiveTabChange: (tab: QuizTab) => void;
  onScoreChange: (score: number, answer: string) => void;
}

export function Game(props: GameProps) {

  const classes = useStyles();

  const [shouldStop, setStopStatus] = useState(false);
  const [hasCorrectAnswer, setCorrectAnswerStatus] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeAnswers, setActiveAnswers] = useState<Movie[]>([]);

  useEffect(() => {
    if (props.activeTab) {
      fetchMovies(getQuizOptions());
    }
  }, [props.activeTab]);

  const fetchMovies = (trailers: Movie[]) => {
    forkJoin(...getMovies(trailers))
      .subscribe(() => {
        setActiveAnswers(trailers);
        const activeQuestion = getRandomElements(trailers, 1)[0];
        setActiveQuestion(activeQuestion);
      });
  };

  const getQuizOptions = () => {
    let movies: Movie[] | any = props.activeTab?.tabMovies;
    return getRandomElements(movies, 6);
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
        tap(url => trailer.urlPath = url)
      );
  };

  const handleNextButtonClick = () => {
  };

  const handlePlayerStop = () => {
    setStopStatus(true);
  };

  const handleCorrectAnswer = () => {
  };

  return (
    <div className='game'>
      <Question shouldStop={shouldStop} activeQuestion={activeQuestion} correctAnswerExists={hasCorrectAnswer}/>
      <div className='quiz__button'>
        <Button fullWidth variant="contained" color="primary" disabled={!hasCorrectAnswer}
                onClick={handleNextButtonClick}>
          Дальше
        </Button>
      </div>
      <Answers onAnswerClick={handlePlayerStop} requiredAnswer={activeQuestion} answers={activeAnswers}
               onCorrectAnswerChange={handleCorrectAnswer}/>
    </div>
  );
}
