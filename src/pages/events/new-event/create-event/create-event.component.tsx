import React, { Dispatch, SetStateAction, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UploudEventImage from '../event-image/uploud-event-image-step.component';
import MeetingPoint from '../event-meetpoint/event-meetpoint.component';
import EventDetails from '../event-details/event-details.component';
import { useCardEditStyles } from './create-event.styles';
import { Paper, StepContent, StepLabel } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Modal from '@material-ui/core/Modal';


function getSteps() {
    return ['Set up event details', 'Meeting place and Event description', 'Upload Event Image'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return (
                <EventDetails />
            );
        case 1:
            return (
                <MeetingPoint />
            );
        case 2:
            return (
                <UploudEventImage />

            );
        default:
            return 'Unknown step';
    }
}

interface Notifications {
    internalBackendError: boolean;
    missedInputs: boolean;
    eventCreated: boolean;
}

const CardEdit = () => {
    const classes = useCardEditStyles();
    const [activeStep, setActiveStep]: [number, Dispatch<SetStateAction<number>>] = useState(1);
    const [openModal, setOpenModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [alert, setAlert]: [Notifications, Dispatch<SetStateAction<Notifications>>] = useState({
        internalBackendError: false,
        missedInputs: false,
        eventCreated: false
    });

    const steps = getSteps();

    const offAlert = () => {
        setTimeout(() => {
            setAlert({
                internalBackendError: false,
                missedInputs: false,
                eventCreated: false
            })
        }, 5000);
    }

    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }

    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const handleModalNo = () => {
        setOpenModal(false);
    }


    const handleModalYes = () => {
        setOpenModal(false);
        setActiveStep(0);
    }


    const handleModalClose = () => {
        setOpenModal(false);
    };

    const [modalStyle] = React.useState(getModalStyle);

    const bodyConfirmPost = (
        <div style={modalStyle} className={classes.paper}>
            <Typography>Are you sure you want to reset?</Typography>
            <div className={classes.confirmButtons}>
                <Button
                    onClick={handleModalNo}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                >
                    No
      </Button>
                <Button
                    onClick={handleModalYes}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                >
                    Yes
      </Button>
            </div>
        </div>
    );


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setOpenModal(true);
    };

    const handleSubmit = () => {
        setAlert({ ...alert, eventCreated: true });
        offAlert();
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <div>{getStepContent(index)}</div>
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
                        {
                            alert.eventCreated ? (
                                <Alert severity="success">New event has been created</Alert>
                            ) : null
                        }
                        {
                            alert.internalBackendError ? (
                                <Alert severity="error">Ooops! Something went wrong, try again later.</Alert>
                            ) : null
                        }
                        {
                            alert.missedInputs ? (
                                <Alert severity="error">It looks like you missed something in form! </Alert>
                            ) : null
                        }
                    </div>
                </Paper>
            )}
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {bodyConfirmPost}
            </Modal>
        </div>
    );
}

export default CardEdit;