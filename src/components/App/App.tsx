import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import HorizontalStepper from '../Stepper/HorizontalStepper';
import { TABS } from '../../config/tab-config';
import { InfoPanel } from '../InfoPanel/IntroPanel';
import { Congrats } from '../Congrats/Congrats';
import { Game } from '../Game/Game';
import { UserGameData } from '../../models/user-game.model';
import { QuizTab } from '../../models/quiz-tab.model';

function App() {

  const TAB_LABELS = TABS.map(tab => tab.displayName);
  const [activeTab, setActiveTab] = useState<QuizTab | null>(TABS[0]);
  const [isGameEnded, setGameEndedStatus] = useState(false);
  const [score, setScore] = useState(0);
  const [gameData, setGameData] = useState<UserGameData[]>([]);

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

  const endGame = () => {
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
        <Congrats resultsData={gameData} score={score} onResetClick={reset}/> :
        <Game activeTab={activeTab} onScoreChange={changeScore} onNextButtonClick={clickNext}
              onActiveTabChange={changeActiveTab}/>}
    </Container>
  );
}

export default App;
