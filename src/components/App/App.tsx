import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import HorizontalStepper from '../Stepper/HorizontalStepper';
import { TABS } from '../../config/tab-config';
import { InfoPanel } from '../InfoPanel/IntroPanel';

interface GameData {
  question: string;
  answer: string;
  score: number;
}

function App() {

  const TAB_LABELS = TABS.map(tab => tab.displayName);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [isGameEnded, setGameStatus] = useState(false);
  const [score, setScore] = useState(0);
  const [gameData, setGameData] = useState<GameData[]>([]);

  return (
    <Container maxWidth="md">
      <InfoPanel score={score}/>
      <HorizontalStepper activeStepIndex={activeTab?.sequenceNo} stepLabels={TAB_LABELS}/>
    </Container>
  );
}

export default App;
