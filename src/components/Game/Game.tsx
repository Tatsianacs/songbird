import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
    }
  }),
);


export function Game() {
  const classes = useStyles();

  return (
    <div className='game'>
      {/*<div className='game__main'>*/}
      {/*  <div className='quiz__main'>*/}
      {/*    <div><img src={this.state.correctAnswerExists ? this.state.activeQuestion?.themoviedbImagePath : stubImage}*/}
      {/*              alt="stub"*/}
      {/*              className='quiz__img'/></div>*/}
      {/*    <div className='quiz__player'>*/}
      {/*      {this.state.correctAnswerExists ? <h3>{this.state.activeQuestion?.themoviedbTitle}</h3> :*/}
      {/*        <h3 className='quiz__name'>Угадай *** по трейлеру </h3>}*/}
      {/*      <Divider/>*/}
      {/*      {this.state.activeQuestion ?*/}
      {/*        <QuizPlayer shouldStop={this.state.shouldStop} activeQuestion={this.state.activeQuestion}/> :*/}
      {/*        <div className='quiz__skeleton'><Skeleton variant="text"/></div>}*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <div className='quiz__button'>*/}
      {/*    <Button fullWidth variant="contained" color="primary" disabled={!this.state.correctAnswerExists}*/}
      {/*            onClick={this.handleNextButtonClick}>*/}
      {/*      Дальше*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*  <AutoGrid onAnswerClick={this.handlePlayerStop} requiredAnswer={this.state.activeQuestion}*/}
      {/*            answers={this.state.activeAnswers}*/}
      {/*            onCorrectAnswerChange={this.handleCorrectAnswer}/>*/}
      {/*</div>*/}
    </div>
  );
}
