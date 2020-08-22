import React from 'react';
import { Logo } from './Logo/Logo';
import { Score } from './Score/Score';
import { createStyles, makeStyles } from '@material-ui/core/styles';

interface InfoPanelProps {
  score: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }),
);

export function InfoPanel(props: InfoPanelProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Logo/>
      <Score score={props.score}/>
    </div>
  );
}
