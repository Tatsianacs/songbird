import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import AnswersList from '../List';
import Description from '../Description/Description';
import { Movie } from '../../../../models/movie.model';

interface AnswersProps {
  requiredAnswer: Movie | null;
  answers: Movie[] | null;
  onCorrectAnswerChange: (score: number) => void;
  onAnswerClick: (isCorrect: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    skeleton: {
      width: 300,
      height: '50px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '100%',
      boxSizing: 'border-box'
    },
    paper2: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '100%',
      boxSizing: 'border-box',
      maxWidth: 250
    },
    description: {
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

  const test = (score: number) => {
    props.onCorrectAnswerChange(score);
  };

  const test2 = (id: string) => {
    const shouldStopPlayer = (id === props.requiredAnswer?.id);
    props.onAnswerClick(shouldStopPlayer);
    const answer = props.answers?.find(el => el.id === id);

    setSelectedAnswer(answer || null);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems='stretch' justify='center'>
        <Grid item>
          <Paper className={classes.paper2}>
            {!props.answers?.length ? <Skeleton variant="rect" height={300} width={200}/> :
              <AnswersList answers={props.answers} requiredAnswer={props.requiredAnswer} onCorrectAnswerChange={test}
                           onSelectedAnswer={test2}/>}
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            {selectedAnswer ?
              <Description option={selectedAnswer}/>
              :
              <div className={classes.description}>Прослушайте трейлер и выберите фильм, которому он принадлежит</div>
            }
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
