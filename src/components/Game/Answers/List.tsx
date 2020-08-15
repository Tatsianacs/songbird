import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Radio, RadioProps, withStyles } from '@material-ui/core';
import { Howl } from 'howler';
import { green } from '@material-ui/core/colors';
import { Movie } from '../../../models/movie.model';

export const GreenRadio = withStyles({
  root: {
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

interface AnswerListProps {
  answers: Movie[];
  requiredAnswer: Movie | null;
  onCorrectAnswerChange: (score: number) => void;
  onSelectedAnswer: (id: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundImage: 'linear-gradient(to top, white 0%, #dfe9f3 100%)'
    },
  }),
);

export default function AnswersList(props: AnswerListProps) {
  const classes = useStyles();
  const [reviewedAnswerIds, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Movie | null>(null);
  const [isScoreUpdated, setScoreState] = useState<boolean>(false);
  const sound1 = new Howl({
    src: ['sounds/correct.mp3']
  });
  const sound2 = new Howl({
    src: ['sounds/wrong.mp3']
  });

  useEffect(() => {
    if (!props.answers?.length) {
      setScoreState(false);
      setSelectedAnswer(null);
      setAnswers([]);
    }
  }, [props.answers]);

  const handleClick = (selectedAnswerId: string) => () => {

    if (selectedAnswerId === props.requiredAnswer?.id) {
      sound1.play();
    } else {
      sound2.play();
    }


    if (!isScoreUpdated && selectedAnswerId === props.requiredAnswer?.id) {
      setScoreState(true);
      const score = 5 - reviewedAnswerIds.length;
      props.onCorrectAnswerChange(score);
    }

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

  return (
    <List className={classes.root}>
      {props.answers.map((value) => {
        const labelId = value.themoviedbTitle;

        return (
          <ListItem key={value.id} role={undefined} dense button onClick={handleClick(value.id)}>
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
