import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UploudEventImage from './upload/uploud-event-image-step.component';
import MeetingPoint from './event-meetpoint/event-meetpoint.component';
import EventDetails from './event-details/event-details.component';
import { useCardEditStyles } from './create-event.styles';
import { Paper, StepContent, StepLabel } from '@material-ui/core';

function getSteps() {
    return ['Upload Event Image', 'Set up event details', 'Meeting place and Event description'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return (
                <UploudEventImage />
            );
        case 1:
            return (
                <EventDetails />
            );
        case 2:
            return (
                <MeetingPoint />
            );
        case 3:
            return (
                <MeetingPoint />
            );
        default:
            return 'Unknown step';
    }
}

const CardEdit = () => {
    const classes = useCardEditStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSubmit = () => {

    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <div className={classes.actionsContainer}>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
            </Button>
                        <Button variant="contained"
                            color="primary"
                            onClick={handleSubmit} className={classes.button}>
                            Submit
            </Button>
                    </div>
                </Paper>
            )}
        </div>
    );
}

export default CardEdit;