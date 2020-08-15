import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    logo: {
      width: '80px',
      height: '80px'
    }
  }),
);


export function Game() {
  const classes = useStyles();

  return (
    <div>
    </div>
  );
}
