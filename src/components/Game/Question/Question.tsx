import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { QuizPlayer } from '../../QuizPlayer/QuizPlayer';
import { Skeleton } from '@material-ui/lab';
import { Movie } from '../../../models/movie.model';
import stubImage from '../../../images/stub.png';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    stub: {
      width: '150px',
      height: 'auto'
    }
  }),
);

interface QuestionProps {
  shouldStop: boolean;
  activeQuestion: Movie | null;
  correctAnswerExists: boolean;
}


export function Question(props: QuestionProps) {
  const classes = useStyles();

  return (
    <div>
      <div>
        <img src={props.correctAnswerExists ? props.activeQuestion?.themoviedbImagePath : stubImage}
             alt="stub"
             className={classes.stub}/></div>
      <div className='quiz__player'>
        {props.correctAnswerExists ? <h3>{props.activeQuestion?.themoviedbTitle}</h3> :
          <h3 className='quiz__name'>Угадай *** по трейлеру </h3>}
        <Divider/>
        {props.activeQuestion && props.activeQuestion.urlPath ?
          <QuizPlayer shouldStop={props.shouldStop} activeQuestionPath={props.activeQuestion.urlPath}/> :
          <div className='quiz__skeleton'><Skeleton variant="text"/></div>}
      </div>
    </div>
  );
}
