import React, { Dispatch, SetStateAction, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UploudEventImage from '../event-image/event-image.component';
import MeetingPoint from '../event-meetpoint/event-meetpoint.component';
import EventDetails from '../event-details/event-details.component';
import { useCardEditStyles } from './create-event.styles';
import { Paper, StepContent, StepLabel } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Modal from '@material-ui/core/Modal';
import { CREATE_EVENT } from '../../../../grapQL';
import { useMutation } from '@apollo/react-hooks';
import { mapOptionsToWhen, When } from '../../../../models/when.enum';
import SpinnerButton from '../../../../shared/spinner/spinner-button.component';


function getSteps() {
    return ['Set up event details', 'Meeting place and Event description', 'Upload Event Image'];
}

interface Notifications {
    internalBackendError: boolean;
    missedInputs: {
        emptyWhen: boolean;
        emptyLocation: boolean;
        emptyDate: boolean;
        emptyDistance: boolean;
        emptyTime: boolean;
    };
    eventCreated: boolean;
}

interface IAllEventDetails {
    organizerName: string;
    organizerPhoneNumber: string;
    meetingPoint: string;
    eventDescription: string;
    location: string;
    when: string;
    distance: string;
    image: File;
}

const CreateEvent = () => {
    const classes = useCardEditStyles();
    const [activeStep, setActiveStep]: [number, Dispatch<SetStateAction<number>>] = useState(0);
    const [openModal, setOpenModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [alert, setAlert]: [Notifications, Dispatch<SetStateAction<Notifications>>] = useState({
        internalBackendError: false,
        missedInputs: {
            emptyWhen: false,
            emptyLocation: false,
            emptyDate: false,
            emptyDistance: false,
            emptyTime: false,
        },
        eventCreated: false
    });

    const [allDetails, setAllDetails]: [IAllEventDetails, Dispatch<SetStateAction<IAllEventDetails>>] = useState({
        organizerName: '',
        organizerPhoneNumber: '',
        meetingPoint: '',
        eventDescription: '',
        location: '',
        when: '',
        distance: '',
        image: null,
    })


    const handleDetailChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlert({
            missedInputs: {
                emptyWhen: false,
                emptyLocation: false,
                emptyDate: false,
                emptyDistance: false,
                emptyTime: false
            },
            eventCreated: false,
            internalBackendError: false,
        });
        if (prop === 'image') {
            setAllDetails({ ...allDetails, image: event.target.files[0] });
        } else {
            setAllDetails({ ...allDetails, [prop]: event.target.value });
        }
    };


    const [dateValue, changeDate] = useState(new Date());
    const [timeValue, changeTime] = useState(new Date());



    const handleValidation = (): boolean => {
        if (allDetails.when === '') {
            setAlert({ ...alert, missedInputs: { ...alert.missedInputs, emptyWhen: true } });
            return false;
        }
        if (timeValue === null) {
            setAlert({ ...alert, missedInputs: { ...alert.missedInputs, emptyTime: true } });
            return false;
        }
        if (allDetails.location === '') {
            setAlert({ ...alert, missedInputs: { ...alert.missedInputs, emptyLocation: true } });
            return false;
        }
        if (allDetails.distance === '') {
            setAlert({ ...alert, missedInputs: { ...alert.missedInputs, emptyDistance: true } });
            return false;
        }
        if (dateValue === null && allDetails.when === 'one time event') {
            setAlert({ ...alert, missedInputs: { ...alert.missedInputs, emptyDate: true } });
            return false;
        }

        return true;
    };



    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return (
                    <EventDetails
                        dateValue={dateValue}
                        timeValue={timeValue}
                        locationValue={allDetails.location}
                        distanceValue={allDetails.distance}
                        whenValue={allDetails.when}
                        changeWhen={handleDetailChange('when')}
                        changeDistance={handleDetailChange('distance')}
                        changeLocation={handleDetailChange('location')}
                        changeDate={changeDate}
                        changeTime={changeTime}
                        distanceRequiredAlert={alert.missedInputs.emptyDistance}
                        dateRequiredAlert={alert.missedInputs.emptyDate}
                        timeRequiredAlert={alert.missedInputs.emptyTime}
                        whenRequiredAlert={alert.missedInputs.emptyWhen}
                        locationRequiredAlert={alert.missedInputs.emptyLocation}
                    />
                );
            case 1:
                return (
                    <MeetingPoint
                        changeOrganizerName={handleDetailChange('organizerName')}
                        changeOrganizerPhoneNumber={handleDetailChange('organizerPhoneNumber')}
                        changeMeetingPoint={handleDetailChange('meetingPoint')}
                        changeEventDescription={handleDetailChange('eventDescription')}
                        organizerNameValue={allDetails.organizerName}
                        organizerPhoneNumberValue={allDetails.organizerPhoneNumber}
                        meetingPointValue={allDetails.meetingPoint}
                        eventDescriptionValue={allDetails.eventDescription} />
                );
            case 2:
                return (
                    <UploudEventImage
                        onImageUpload={handleDetailChange('image')}
                        imageValue={allDetails.image}
                    />

                );
            default:
                return 'Unknown step';
        }
    }

    const steps = getSteps();


    const [createEvent, { loading, error, data }] = useMutation(CREATE_EVENT, {
        onCompleted: () => {
            setAlert({ ...alert, eventCreated: true });
        },
        onError: (error) => setAlert({ ...alert, internalBackendError: true }),
    });


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
        const isValidate = handleValidation();
        if (isValidate) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setOpenModal(true);
    };

    const handleSubmit = () => {
        createEvent(
            {
                variables: {
                    when: mapOptionsToWhen(allDetails.when),
                    date: "2021-03-03T21:40:50.119Z",
                    time: '11:11',
                    location: allDetails.location,
                    distance: Number(allDetails.distance),
                    organiserName: allDetails.organizerName,
                    organiserPhoneNumber: allDetails.organizerPhoneNumber,
                    meetingPoint: allDetails.meetingPoint,
                    description: allDetails.eventDescription

                }
            }
        );
    }

    if (loading) {
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
                            <Button onClick={handleReset} disabled className={classes.button}>
                                Reset
                            </Button>
                            <SpinnerButton className={classes.button} loading={loading} buttonLabel={'Submit'} onClick={handleSubmit} />
                        </div>
                    </Paper>
                )}
            </div>
        )
    };

    if (!loading) {
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
        )
    }

    return (
        <></>
    );
}

export default CreateEvent;