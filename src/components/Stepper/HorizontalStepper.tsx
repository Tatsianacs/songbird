import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const MAX_STEP: number = 6;

interface StepperProps {
  activeStepIndex?: number;
  stepLabels: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    },
    horizontal: {
      padding: '16px',
      flexWrap: 'wrap'
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

export default function HorizontalStepper(props: StepperProps) {
  const classes = useStyles();
  const activeIndex = typeof props.activeStepIndex === 'undefined' ? MAX_STEP : props.activeStepIndex;

  return (
    <div className={classes.root}>
      <Stepper className={classes.horizontal} orientation="horizontal" activeStep={activeIndex}>
        {props.stepLabels.map((label: string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
