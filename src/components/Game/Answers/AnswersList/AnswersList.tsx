import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Radio, RadioProps, withStyles } from '@material-ui/core';
import { Howl } from 'howler';
import { green } from '@material-ui/core/colors';
import { Movie } from '../../../../models/movie.model';
import appConfig from '../../../../config/app-config.json';

interface AnswerListProps {
  answers: Movie[];
  requiredAnswer: Movie | null;
  onCorrectAnswerChange: (score: number) => void;
  onSelectedAnswer: (id: string) => void;
}

const correctSound = new Howl({
  src: ['sounds/correct.mp3']
});

const wrongSound = new Howl({
  src: ['sounds/wrong.mp3']
});

const GreenRadio = withStyles({
  root: {
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%'
    },
  }),
);

export default function AnswersList(props: AnswerListProps) {
  const classes = useStyles();
  const [reviewedAnswerIds, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Movie | null>(null);
  const [isScoreUpdated, setScoreUpdatedState] = useState<boolean>(false);

  useEffect(() => {
    setScoreUpdatedState(false);
    setSelectedAnswer(null);
    setAnswers([]);
  }, [props.answers]);

  const playSound = (answerId: string) => {
    if (answerId !== props.requiredAnswer?.id) {
      wrongSound.play();
    } else {
      correctSound.play();
    }
  };

  const updateScore = (answerId: string) => {
    if (!isScoreUpdated && answerId === props.requiredAnswer?.id) {
      const score = appConfig.maxScorePerQuestion - reviewedAnswerIds.length;
      setScoreUpdatedState(true);
      props.onCorrectAnswerChange(score);
    }
  };

  const updateReviewedAnswers = (selectedAnswerId: string) => {
    if (selectedAnswer?.id !== selectedAnswerId) {
      const requiredAnswer = props.answers?.find(el => el.id === selectedAnswerId);
      if (requiredAnswer) {
        setSelectedAnswer(requiredAnswer);
        props.onSelectedAnswer(selectedAnswerId);
        if (selectedAnswerId && !reviewedAnswerIds.includes(selectedAnswerId)) {
          const newAnswers = [...reviewedAnswerIds, requiredAnswer.id];
          setAnswers(newAnswers);
        }
      }
    }
  };

  const handleClick = (selectedAnswerId: string) => () => {
    playSound(selectedAnswerId);
    updateScore(selectedAnswerId);
    updateReviewedAnswers(selectedAnswerId);
  };

  return (
    <List className={classes.root}>
      {props.answers.map((value: Movie) => {
        const labelId = value.themoviedbTitle;

        return (
          <ListItem key={value.id} selected={value.id===selectedAnswer?.id} role={undefined} dense button onClick={handleClick(value.id)}>
            <ListItemIcon>
              {(props.requiredAnswer?.id === value.id) && reviewedAnswerIds.includes(value.id) ?
                <GreenRadio value={value.id} checked={reviewedAnswerIds.includes(value.id)}/> :
                <Radio value={value.id} checked={reviewedAnswerIds.includes(value.id)}/>}
            </ListItemIcon>
            <ListItemText id={labelId} primary={labelId}/>
          </ListItem>
        );
      })}
    </List>
  );
}
