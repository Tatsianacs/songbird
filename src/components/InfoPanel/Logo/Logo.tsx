import logo from '../../../images/logo.png';
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


export function Logo() {
  const classes = useStyles();

  return (
    <div>
      <img src={logo} alt="logo" className={classes.logo}/>
    </div>
  );
}
