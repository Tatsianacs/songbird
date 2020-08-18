import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { QuizPlayer } from '../../QuizPlayer/QuizPlayer';
import { Skeleton } from '@material-ui/lab';
import { Movie } from '../../../models/movie.model';
import stubImage from '../../../images/stub.png';
import roundStarRate from '@iconify/icons-ic/round-star-rate';
import Icon from '@iconify/react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '16px',
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '12px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      backgroundImage: 'linear-gradient(to top, #dfe9f3 0%, white 100%)',
      borderRadius: '2px',
      boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
    },
    title: {
      display: 'flex',
      alignItems: 'center'
    },
    image: {
      width: '120px',
      height: 'auto',
      marginRight: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '4px'
    },
    player: {
      flexGrow: 1
    },
    skeleton: {
      marginTop: '28px'
    },
    text: {
      marginRight: '4px'
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
    <div className={classes.root}>
      <div>
        <img src={props.correctAnswerExists ? props.activeQuestion?.themoviedbImagePath : stubImage}
             alt="stub"
             className={classes.image}/>
      </div>
      <div className={classes.player}>
        {props.correctAnswerExists ?
          <div className={classes.title}>
            <Typography variant="h6" component="h2" color="textPrimary" className={classes.text}>
              {props.activeQuestion?.themoviedbTitle} ({props.activeQuestion?.themoviedbYear})
            </Typography>
            <Typography variant="caption" color="textSecondary">
              <Icon icon={roundStarRate} color="#FFCC00"/>
              {props.activeQuestion?.themoviedbVote}
            </Typography>
          </div> :
          <Typography variant="h6" component="h2" color="textPrimary">
            Угадай *** по трейлеру
          </Typography>}
        <Divider/>
        {props.activeQuestion && props.activeQuestion.urlPath ?
          <QuizPlayer shouldStop={props.shouldStop} activeQuestionPath={props.activeQuestion.urlPath}/> :
          <div className={classes.skeleton}><Skeleton variant="text"/></div>}
      </div>
    </div>
  );
}
