import React, { useRef } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

interface QuizPlayerProps {
  activeQuestionPath: string;
  shouldStop?: boolean;
}

export function QuizPlayer(props: QuizPlayerProps) {
  const player = useRef(null);

  return (
    <div>
      <AudioPlayer
        ref={player}
        customProgressBarSection={
          [
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION
          ]
        }
        showJumpControls={false}
        customControlsSection={[RHAP_UI.VOLUME]}
        autoPlayAfterSrcChange={false}
        src={props.activeQuestionPath}
      />
    </div>
  );
}
