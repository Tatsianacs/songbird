import logo from '../../../images/logo.png';
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    logo: {
      width: '80px',
      height: '80px'
    },
    h1: {
      fontSize: '24px'
    }
  }),
);


export function Logo() {
  const classes = useStyles();

  return (
    <Typography variant="h1" className={classes.h1}>
      <img src={logo} alt="logo" className={classes.logo}/>
    </Typography>
  );
}
