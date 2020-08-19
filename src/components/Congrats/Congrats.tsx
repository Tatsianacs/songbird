import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import oscar from '../../images/win.png';
import DataTable from '../DataTable/DataTable';
import appConfig from '../../config/app-config.json';
import { TableData } from '../../models/table-data.model';

interface CongratsProps {
  score: number;
  resultsData: TableData[];
  sessions: any[];
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
    },
    hint: {
      margin: '16px 0'
    },
    table: {
      margin: '16px 0',
      width: '100%'
    }
  }),
);
const MAX_SCORE = appConfig.numberOfAnswers * appConfig.maxScorePerQuestion;

export function Congrats(props: CongratsProps) {
  const classes = useStyles();
  const [gifPath, setGifPath] = useState('');

  useEffect(() => {
    const searchTag = (props.score !== MAX_SCORE) ? 'thumbs up' : 'applause';
    fetch(`${appConfig.giphyApiPath}?api_key=${appConfig.giphyApiKey}&tag=${encodeURIComponent(searchTag)}&limit=1`)
      .then(res => res.json())
      .then(
        (result: any) => {
          setGifPath(result.data.fixed_width_downsampled_url);
        },
        () => {
          setGifPath('');
        }
      );
  }, [props.score]);

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h2" color="textSecondary">Вы набрали {props.score} баллов
        из {MAX_SCORE} возможных
      </Typography>
      {props.score === MAX_SCORE &&
      <Typography variant="h5" component="h2" color="textPrimary">Поздравляем! Игра окончена.
      </Typography>}

      <div className={classes.visuals}>
        {gifPath && <img src={gifPath} alt="gif"/>}
        {props.score === MAX_SCORE && <img src={oscar} alt="oscar" className={classes.image}/>}
      </div>
      <div className={classes.table}>
        <DataTable rows={props.resultsData} header={['Категория фильма', 'Правильный ответ', 'Ваш балл']}/>
      </div>
      <Typography variant="subtitle1" component="span" color="textSecondary" className={classes.hint}>
        Ваши результаты по всем играм:
      </Typography>
      <DataTable rows={props.sessions} header={['Дата', 'Время прохождения (сек)', 'Ваш балл']}/>
      {props.score !== MAX_SCORE &&
      <>
          <Typography variant="subtitle1" component="span" color="textSecondary" className={classes.hint}>
              Попробуйте пройти еще раз
          </Typography>
          <Button fullWidth variant="contained" color="primary" onClick={props.onResetClick}>
              Начать сначала
          </Button>
      </>}
    </Paper>
  );
}
