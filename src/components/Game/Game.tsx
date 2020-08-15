import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { QuizTab } from '../../models/quiz-tab.model';
import { Question } from './Question/Question';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {}
  }),
);

interface GameProps {
  onGameStatusChange: (score: number) => void;
  onActiveTabChange: (tab: QuizTab) => void;
  onScoreChange: (score: number, answer: string) => void;
}

export function Game(props: GameProps) {

  const classes = useStyles();
  const [shouldStop, setStopStatus] = useState(false);
  const [hasCorrectAnswer, setCorrectAnswerStatus] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleNextButtonClick = () => {}

  return (
    <div className='game'>
      <Question shouldStop={shouldStop} activeQuestion={activeQuestion} correctAnswerExists={hasCorrectAnswer}/>
        <div className='quiz__button'>
          <Button fullWidth variant="contained" color="primary" disabled={!hasCorrectAnswer}
                  onClick={handleNextButtonClick}>
            Дальше
          </Button>
        </div>
      {/*<div className='game__main'>*/}


      {/*  <AutoGrid onAnswerClick={this.handlePlayerStop} requiredAnswer={this.state.activeQuestion}*/}
      {/*            answers={this.state.activeAnswers}*/}
      {/*            onCorrectAnswerChange={this.handleCorrectAnswer}/>*/}
      {/*</div>*/}
    </div>
  );
}
