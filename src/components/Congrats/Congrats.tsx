import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import oscar from '../../images/win.png';
import DataTable from '../DataTable/DataTable';
import appConfig from '../../config/app-config.json';
import { UserGameData } from '../../models/user-game.model';

interface CongratsProps {
  score: number;
  resultsData: UserGameData[];
  onResetClick: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '16px',
      marginTop: '16px'
    },
    image: {
      width: '100%',
      maxWidth: '300px',
      height: 'auto'
    },
    visuals: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '100%',
      flexWrap: 'wrap',
      margin: '16px 0'
    }
  }),
);

export function Congrats(props: CongratsProps) {
  const classes = useStyles();
  const MAX_SCORE = appConfig.numberOfAnswers * appConfig.maxScorePerQuestion;
  const [gifPath, setGifPath] = useState('');

  useEffect(() => {
    const searchTag = (props.score !== MAX_SCORE) ? 'thumbs up' : 'applause';
    fetch(`${appConfig.giphyApiPath}?api_key=${appConfig.giphyApiKey}&tag=${encodeURIComponent(searchTag)}&limit=1`)
      .then(res => res.json())
      .then(
        (result: any) => {
          setGifPath(result.data.fixed_width_downsampled_url);
        },
        (error) => {
          setGifPath('');
        }
      );
  }, [props.score]);

  return (
    <Paper className={classes.root}>

      <Typography variant="h5" color="textSecondary">Вы набрали {props.score} баллов из {MAX_SCORE} возможных.
      </Typography>
      {props.score === MAX_SCORE && <Typography variant="h4" color="textPrimary">Поздравляем! Игра окончена.
      </Typography>}

      <div className={classes.visuals}>
        {gifPath && <img src={gifPath} alt="gif"/>}
        {props.score === MAX_SCORE && <img src={oscar} alt="oscar" className={classes.image}/>}
      </div>

      <DataTable rows={props.resultsData}/>
      {props.score !== MAX_SCORE &&
      <>
          <Typography variant="h6" color="textSecondary">
              Попробуйте пройти еще раз
          </Typography>
          <Button fullWidth variant="contained" color="primary" onClick={props.onResetClick}>
              Начать сначала
          </Button>
      </>}
    </Paper>
  );
}
