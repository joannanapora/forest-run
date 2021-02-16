import React, { Dispatch, SetStateAction, useState } from 'react';

import { useCreateEventStyles } from './create-event.styles';

import MeetingPoint from './new-event/event-meetpoint/event-details.component';
import UploudEventImage from './new-event/event-image/event-image.component';
import EventDetails from './new-event/event-details/event-info.component';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Alert from '@material-ui/lab/Alert';
import Step from '@material-ui/core/Step';

import { mapOptionsToWhen } from '../../../models/when.enum';

import { Paper, StepContent, StepLabel } from '@material-ui/core';

import { useMutation } from '@apollo/react-hooks';
import { postImage } from '../../../axios/image.api';
import { CREATE_EVENT, GET_EVENTS } from '../../../grapQL';

function getSteps() {
    return ['Set up event details', 'Meeting place and Event description', 'Upload Event Image'];
}

interface Notifications {
    internalBackendError: boolean;
    dateInPast: boolean;
    missedInputs: {
        emptyWhen: boolean;
        emptyLocation: boolean;
        emptyDate: boolean;
        emptyDistance: boolean;
        emptyTime: boolean;
    };
    eventCreated: boolean;
    pleaseLogin: boolean;
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

const CreateEvent = ({ history }) => {
    const classes = useCreateEventStyles();
    const [activeStep, setActiveStep]: [number, Dispatch<SetStateAction<number>>] = useState(0);
    const [openModal, setOpenModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [imageLoading, setImageLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [imgid, setImageId]: [string, Dispatch<SetStateAction<string>>] = useState("");
    const [alert, setAlert]: [Notifications, Dispatch<SetStateAction<Notifications>>] = useState({
        internalBackendError: false,
        dateInPast: false,
        missedInputs: {
            emptyWhen: false,
            emptyLocation: false,
            emptyDate: false,
            emptyDistance: false,
            emptyTime: false,
        },
        eventCreated: false,
        pleaseLogin: false,
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


    const [modalStyle] = useState(getModalStyle);
    const [dateValue, changeDate] = useState(new Date());
    const [timeValue, changeTime] = useState(new Date());

    const [createEvent] = useMutation(CREATE_EVENT, {
        onCompleted: () => {
            setAlert({ ...alert, eventCreated: true });
        },
        onError: (error) => {
            if ((error.graphQLErrors[0].message as any).statusCode === 500) {
                setAlert({ ...alert, internalBackendError: true });
            }
            if ((error.graphQLErrors[0].message as any).statusCode === 400) {
                if ((error.graphQLErrors[0].message as any).message === "date-in-past") {
                    setAlert({ ...alert, dateInPast: true });
                }
            }
            if ((error.graphQLErrors[0].message) === "Cannot read property 'sub' of undefined") {
                setAlert({ ...alert, pleaseLogin: true })
            }
        }
    });

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
            dateInPast: false,
            pleaseLogin: false,
        });
        if (prop === 'image') {
            setImageLoading(true)
            postImage(event.target.files[0])
                .then((result) => {
                    setAllDetails({ ...allDetails, image: event.target.files[0] });
                    setImageId(result.data.id);
                    setImageLoading(false)
                })
        }
        if (prop === 'distance' && event.target.value.length > 5) {
            setAllDetails({ ...allDetails, distance: event.target.value.slice(0, -1) });
        }
        else {
            setAllDetails({ ...allDetails, [prop]: event.target.value });
        }
    };



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
                        imageLoading={imageLoading}
                    />

                );
            default:
                return 'Unknown step';
        }
    }

    const steps = getSteps();


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

    const redirectToManage = () => {
        if (history) {
            history.push('/manage')
        }
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

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
                    ...mapOptionsToWhen(allDetails.when) === 0 && { date: dateValue.toISOString() },
                    time: timeValue.toISOString(),
                    location: allDetails.location,
                    distance: Number(allDetails.distance),
                    organizerName: allDetails.organizerName,
                    organizerPhoneNumber: allDetails.organizerPhoneNumber,
                    meetingPoint: allDetails.meetingPoint,
                    description: allDetails.eventDescription,
                    ...!!imgid && { imageId: imgid }
                },
                refetchQueries: [{
                    query: GET_EVENTS,
                    variables: {
                        filters: {
                            me: false,
                            participateCounter: undefined,
                            distance: undefined,
                            joined: false,
                        }
                    }
                }],
            },

        );
    }

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


    return (
        <div className={classes.root}>
            <Button
                onClick={redirectToManage}
                variant="contained"
                color="primary"
                size="medium"
                className={classes.buttonBack}
                startIcon={< ArrowBackIcon />}
            >
                Back
      </Button>
            <Stepper className={classes.stepper} activeStep={activeStep} orientation="vertical">
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
                    <Typography>All Steps Completed</Typography>
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
                                <div className={classes.alert}><Alert severity="success">New event has been created.</Alert></div>
                            ) : null
                        }
                        {
                            alert.internalBackendError ? (
                                <div className={classes.alert}><Alert severity="error">Ooops! Something went wrong, try again later.</Alert></div>
                            ) : null
                        }
                        {
                            alert.dateInPast ? (
                                <div className={classes.alert}><Alert severity="error">You've entered date in the past.</Alert></div>
                            ) : null
                        }
                        {
                            alert.pleaseLogin ? (
                                <div className={classes.alert}><Alert severity="error">Please login to create event.</Alert></div>
                            ) : null
                        }
                    </div >
                </Paper >
            )}
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {bodyConfirmPost}
            </Modal>
        </div >
    )
};

export default CreateEvent;