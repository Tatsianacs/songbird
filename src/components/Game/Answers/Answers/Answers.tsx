import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import AnswersList from '../AnswersList/AnswersList';
import Description from '../Description/Description';
import { Movie } from '../../../../models/movie.model';
import { Button } from '@material-ui/core';

interface AnswersProps {
  requiredAnswer: Movie | null;
  hasCorrectAnswer: boolean;
  answers: Movie[] | null;
  onCorrectAnswerChange: (score: number) => void;
  onAnswerClick: (isCorrect: boolean) => void;
  onNextClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    skeleton: {
      width: 200,
      height: 300
    },
    description: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '100%',
      boxSizing: 'border-box'
    },
    list: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '100%',
      boxSizing: 'border-box',
      maxWidth: 250
    },
    hint: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }
  })
);

export default function Answers(props: AnswersProps) {
  const classes = useStyles();
  const [selectedAnswer, setSelectedAnswer] = useState<Movie | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [props.requiredAnswer]);

  const emitCorrectAnswer = (score: number) => {
    props.onCorrectAnswerChange(score);
  };

  const emitNextClick = () => {
    props.onNextClick();
  };

  const changeSelectedAnswer = (id: string) => {
    const shouldStopPlayer = (id === props.requiredAnswer?.id);
    props.onAnswerClick(shouldStopPlayer);
    const answer = props.answers?.find(el => el.id === id);

    setSelectedAnswer(answer || null);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems='stretch' justify='center'>
        <Grid item>
          <Paper className={classes.list}>
            {!props.answers?.length ?
              <Skeleton variant="rect" className={classes.skeleton}/> :
              <AnswersList answers={props.answers} requiredAnswer={props.requiredAnswer}
                           onCorrectAnswerChange={emitCorrectAnswer}
                           onSelectedAnswer={changeSelectedAnswer}/>}
            <Button fullWidth variant="contained" color="primary" disabled={!props.hasCorrectAnswer}
                    onClick={emitNextClick}>Дальше
            </Button>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.description}>
            {selectedAnswer ?
              <Description option={selectedAnswer}/> :
              <div className={classes.hint}>Прослушайте трейлер и выберите фильм, которому он принадлежит</div>
            }
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
