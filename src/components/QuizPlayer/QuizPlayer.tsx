import React, { useEffect, useRef } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import playCircleOutlined from '@iconify/icons-ant-design/play-circle-outlined';
import pauseCircleOutlined from '@iconify/icons-ant-design/pause-circle-outlined';
import './QuizPlayer.scss';

interface QuizPlayerProps {
  activeQuestionPath: string;
  shouldStop?: boolean;
}

const playIcon = <Icon icon={playCircleOutlined}/>;
const pauseIcon = <Icon icon={pauseCircleOutlined}/>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    audioPlayer: {
      outline: 0,
      '& *': {
        outline: 0
      }
    }
  })
);

export function QuizPlayer(props: QuizPlayerProps) {
  const classes = useStyles();

  const player = useRef(null);

  useEffect(() => {
    if (props.shouldStop) {
      (player?.current as any).audio.current.pause();
    }
  }, [props.shouldStop]);

  return (
    <div>
      <AudioPlayer
        ref={player}
        className={classes.audioPlayer}
        customProgressBarSection={
          [
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION
          ]
        }
        customIcons={{
          play: playIcon,
          pause: pauseIcon
        }}
        showJumpControls={false}
        customControlsSection={[RHAP_UI.VOLUME]}
        autoPlayAfterSrcChange={false}
        src={props.activeQuestionPath}
      />
    </div>
  );
}
