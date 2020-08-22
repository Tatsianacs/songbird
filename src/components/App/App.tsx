import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import HorizontalStepper from '../Stepper/HorizontalStepper';
import { TABS } from '../../config/tab-config';
import { InfoPanel } from '../InfoPanel/IntroPanel';
import { Congrats } from '../Congrats/Congrats';
import { Game } from '../Game/Game';
import { QuizTab } from '../../models/quiz-tab.model';
import { TableData } from '../../models/table-data.model';

const TAB_LABELS = TABS.map(tab => tab.displayName);

function App() {
  const [activeTab, setActiveTab] = useState<QuizTab | null>(TABS[0]);
  const [isGameEnded, setGameEndedStatus] = useState(false);
  const [score, setScore] = useState(0);
  const [gameData, setGameData] = useState<TableData[]>([]);
  const [gameStartTime, setGameStartTime] = useState(0);
  const [sessionData, setSessionData] = useState<TableData[]>(Object.keys(localStorage)
    .filter(el => el.includes('movieQuizData'))
    .map(k => JSON.parse(localStorage.getItem(k) || '')) || []);

  useEffect(() => {
    setGameStartTime(window.performance.now());
  }, []);

  const reset = () => {
    setActiveTab(TABS[0]);
    setGameEndedStatus(false);
    setScore(0);
    setGameData([]);
    setGameStartTime(window.performance.now());
  };

  const changeScore = (score: number, answer: string) => {
    setScore(prevState => score + prevState);
    const newData = {
      main: activeTab?.displayName || 'Unknown',
      middle: answer,
      score: score
    };
    const requiredData = [...gameData, newData];
    setGameData(requiredData);
  };

  const endGame = () => {
    const newSessionData = getSessionData();
    localStorage.setItem(`movieQuizData${newSessionData.main}`, JSON.stringify(newSessionData));
    const dataToBeUpdated = [...sessionData, newSessionData];
    setSessionData(dataToBeUpdated);
    setGameEndedStatus(true);
  };

  const getSessionData = () => {
    const userGameEndTime = window.performance.now();
    const roundedTimeInSeconds = Math.round((userGameEndTime - gameStartTime) / 1000);
    const date = new Date().toLocaleString();
    return { main: date, middle: roundedTimeInSeconds.toString(), score: score };
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
        <Congrats resultsData={gameData} sessions={sessionData} score={score} onResetClick={reset}/> :
        <Game activeTab={activeTab} onScoreChange={changeScore} onNextButtonClick={clickNext}
              onActiveTabChange={changeActiveTab}/>}
    </Container>
  );
}

export default App;
