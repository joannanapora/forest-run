
import { Button, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreatePostStyles } from './create-post.styles';
import PublishIcon from '@material-ui/icons/Publish';
import Modal from '@material-ui/core/Modal';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Alert from '@material-ui/lab/Alert';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

interface ChipData {
    key: number;
    label: string;
}



const CreatePost = ({ history }) => {
    const [chip, setChip]: [string, any] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const [alert, setAlert] = useState({
        emptyText: false,
        emptyTitle: false,
        tooLessKeywords: false,
    });

    const [postValues, setPostValues] = useState({
        title: '',
        text: '',
        keywords: [
            { key: 0, label: 'Enter 3-10 keywords' },
        ],
        image: File,
    });

    useEffect(() => {
    }, [postValues.keywords])


    const handleChipDelete = (chipToDelete: ChipData) => () => {
        const newKeywords = postValues.keywords.filter((keyword) => {
            return keyword.key !== chipToDelete.key
        });
        setPostValues({ ...postValues, keywords: newKeywords })
    };

    const classes = useCreatePostStyles();

    const handleTextChange = (value) => {
        setPostValues({ ...postValues, text: value });
    };

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostValues({ ...postValues, title: event.target.value })
    };

    const onChipKeydown = (event) => {
        if (chip.length < 3) {
            return;
        }
        if (event.key === 'Enter' || event.key === 'Tab' || event.key === ',') {
            const nextKey = postValues.keywords.length > 0 ?
                postValues.keywords[postValues.keywords.length - 1].key + 1
                : 1;

            const newKeywordsList = [...postValues.keywords, { label: event.target.value, key: nextKey }];
            setPostValues({ ...postValues, keywords: newKeywordsList });

            setChip('')
        }
    }

    const handleChipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value[event.target.value.length - 1] === ' ' || event.target.value[0] === ',' ?
            setChip(event.target.value.slice(0, -1)) :
            setChip(event.target.value);
    };


    const offAlert = () => {
        setTimeout(() => {
            setAlert({
                ...alert,
                emptyText: false,
                emptyTitle: false,
                tooLessKeywords: false,
            });
        }, 8000);
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

    const [modalStyle] = useState(getModalStyle);

    const handleYes = () => {
        setOpenModal(false);
        redirectToArticles()
    }

    const handleNo = () => {
        setOpenModal(false);
    }

    const redirectToArticles = () => {
        if (history) {
            history.push('/notice-board/')
        }
    }

    const handleModalClose = () => {
        setOpenModal(false);
    };


    const handlePublishButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (postValues.title.length < 1) {
            setAlert({
                ...alert,
                emptyTitle: true
            })
            offAlert();
            return
        };
        if (postValues.text.length < 1) {
            setAlert({
                ...alert,
                emptyText: true
            })
            offAlert();
            return
        };
        if (postValues.keywords.length < 4) {
            setAlert({
                ...alert,
                tooLessKeywords: true
            })
            offAlert();
            return
        };

        setOpenModal(true);
    };


    const bodyConfirmModal = (
        <div style={modalStyle} className={classes.paper}>
            <Typography>Are you sure you want to publish?</Typography>
            <div className={classes.confirmButtons}>
                <Button
                    onClick={handleNo}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                >
                    No
      </Button>
                <Button
                    onClick={handleYes}
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
        <div className={classes.container} >
            <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.buttonBack}
                startIcon={< ArrowBackIcon />}
                onClick={redirectToArticles}
            >
                Back
      </Button>
            {
                alert.emptyText ? (
                    <Alert onChange={offAlert} severity="error">Text field is empty</Alert>
                ) : null
            }
            {
                alert.emptyTitle ? (
                    <Alert onChange={offAlert} severity="error">Title field is empty</Alert>
                ) : null
            }
            {
                alert.tooLessKeywords ? (
                    <Alert onChange={offAlert} severity="error">Too less keywords</Alert>
                ) : null
            }
            <ReactQuill className={classes.quill} value={postValues.text}
                onChange={handleTextChange} />
            <div className={classes.postDetails}>
                <TextField
                    className={classes.postTextFields}
                    value={postValues.title}
                    id="standard-textarea"
                    label="Title"
                    onChange={handleTitle}
                />
                <TextField
                    className={classes.postTextFields}
                    value={chip}
                    id="keywords"
                    label="Keywords"
                    onKeyDown={onChipKeydown}
                    onChange={handleChipChange}
                />
            </div>
            <Paper component="ul" className={classes.chipRoot}>
                {postValues.keywords.map((data) => {
                    let icon;

                    if (data.label === 'Enter 3-10 keywords') {
                        icon = <TagFacesIcon />;
                    }

                    return (
                        <li key={data.key}>
                            <Chip
                                icon={icon}
                                label={data.label}
                                onDelete={data.label === 'Enter 3-10 keywords' ? undefined : handleChipDelete(data)}
                                className={classes.chip}
                            />
                        </li>
                    );
                })}
            </Paper>
            <Button
                onClick={handlePublishButton}
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<PublishIcon />}
            >
                Publish
      </Button>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {bodyConfirmModal}
            </Modal>
        </div>
    )
}

export default CreatePost;