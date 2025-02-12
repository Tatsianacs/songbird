import coin from '../../../images/coin.png';
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

interface ScoreProps {
  score: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    score: {
      width: '70px',
      height: '70px'
    },
    text: {
      marginRight: '16px'
    }
  }),
);


export function Score(props: ScoreProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="span" color="textSecondary" className={classes.text}>{props.score}</Typography>
      <img src={coin} alt="score" className={classes.score}/>
    </div>
  );
}
