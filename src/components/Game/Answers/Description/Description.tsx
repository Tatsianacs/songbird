import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Divider } from '@material-ui/core';
import './Description.scss';
import { Movie } from '../../../../models/movie.model';
import { QuizPlayer } from '../../../QuizPlayer/QuizPlayer';

interface DescriptionProps {
  option: Movie
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    audioPlayer: {
      outline: 0,
      '& *': {
        outline: 0
      }
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      backgroundImage: 'linear-gradient(to top, #dfe9f3 0%, white 100%)'
    },
    image: {
      width: 150,
      height: 'auto'
    },
    grid: {
      justifyContent: 'center'
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '5px'
    },
    description: {
      textAlign: 'justify',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineClamp: 10,
      boxOrient: 'vertical',
      display: 'box'
    }
  })
);

export default function Description(props: DescriptionProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} className={classes.grid}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="poster"
                src={props.option.themoviedbImagePath}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="subtitle2" component="h3" gutterBottom>
                  {props.option.themoviedbTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Оригинальное название: {props.option.themoviedbOriginalTitle}
                </Typography>
                <Divider/>
                <Typography title={props.option.themoviedbOverview} gutterBottom variant="subtitle1"
                            component="p" className={classes.description}>
                  {props.option.themoviedbOverview}
                </Typography>
                <QuizPlayer activeQuestionPath={props.option.urlPath || ''}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
