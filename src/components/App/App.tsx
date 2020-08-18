import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import HorizontalStepper from '../Stepper/HorizontalStepper';
import { TABS } from '../../config/tab-config';
import { InfoPanel } from '../InfoPanel/IntroPanel';
import { Congrats } from '../Congrats/Congrats';
import { Game } from '../Game/Game';
import { UserGameData } from '../../models/user-game.model';
import { QuizTab } from '../../models/quiz-tab.model';

const TAB_LABELS = TABS.map(tab => tab.displayName);

function App() {

  const [activeTab, setActiveTab] = useState<QuizTab | null>(TABS[0]);
  const [isGameEnded, setGameEndedStatus] = useState(false);
  const [score, setScore] = useState(0);
  const [gameData, setGameData] = useState<UserGameData[]>([]);
  const [gameTime, setGameTime] = useState(0);
  const [sessionData, setSessionData] = useState<any[]>(Object.keys(localStorage)
    .filter(el => el.includes('movieQuizData'))
    .map(k => JSON.parse(localStorage.getItem(k) || '')) || []);

  const reset = () => {
    setActiveTab(TABS[0]);
    setGameEndedStatus(false);
    setScore(0);
    setGameData([]);
  };

  const changeScore = (score: number, answer: string) => {
    setScore(prevState => score + prevState);
    const requiredData = [...gameData];
    const newData = {
      question: activeTab?.displayName || 'Unknown',
      answer: answer,
      score: score
    };
    requiredData.push(newData);
    setGameData(requiredData);
  };

  useEffect(() => {
    setGameTime(window.performance.now());
  }, []);


  const endGame = () => {
    const userTime = window.performance.now();
    const roundedTimeInSeconds =  Math.round(userTime / 1000);
    const date = new Date().toLocaleString();
    // todo set in useEffect
    setGameTime(prevState => ( userTime - prevState));
    const currentSessionData = { question: date, answer: roundedTimeInSeconds.toString(), score: score };
    debugger
    const dataToBeUpdated = [...sessionData, currentSessionData];
    setSessionData(dataToBeUpdated);
    localStorage.setItem(`movieQuizData${date}`, JSON.stringify(currentSessionData));
    setGameEndedStatus(true);
  };

  const clickNext = () => {
    if (activeTab?.sequenceNo === (TABS.length - 1)) {
      setActiveTab(null);
      endGame();
    } else {
      const requiredIndex = activeTab?.sequenceNo || 0;
      setActiveTab(TABS[requiredIndex + 1]);
    }
  };

  const changeActiveTab = (tab: QuizTab) => {
    setActiveTab(tab);
  };

  return (
    <Container maxWidth="md">
      <InfoPanel score={score}/>
      <HorizontalStepper activeStepIndex={activeTab?.sequenceNo} stepLabels={TAB_LABELS}/>
      {isGameEnded ?
        <Congrats resultsData={gameData} sessions={sessionData} score={score} time={gameTime} onResetClick={reset}/> :
        <Game activeTab={activeTab} onScoreChange={changeScore} onNextButtonClick={clickNext}
              onActiveTabChange={changeActiveTab}/>}
    </Container>
  );
}

export default App;
