import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import HorizontalStepper from '../Stepper/HorizontalStepper';
import { TABS } from '../../config/tab-config';
import { InfoPanel } from '../InfoPanel/IntroPanel';
import { Congrats } from '../Congrats/Congrats';
import { Game } from '../Game/Game';
import { UserGameData } from '../../models/user-game.model';

function App() {

  const TAB_LABELS = TABS.map(tab => tab.displayName);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [isGameEnded, setGameEndedStatus] = useState(false);
  const [score, setScore] = useState(0);
  const [gameData, setGameData] = useState<UserGameData[]>([]);

  const reset = () => {
    setActiveTab(TABS[0]);
    setGameEndedStatus(false);
    setScore(0);
    setGameData([]);
  };

  return (
    <Container maxWidth="md">
      <InfoPanel score={score}/>
      <HorizontalStepper activeStepIndex={activeTab?.sequenceNo} stepLabels={TAB_LABELS}/>
      {isGameEnded ?
        <Congrats resultsData={gameData} score={score} onResetClick={reset}/> :
        <Game/>}
    </Container>
  );
}

export default App;
