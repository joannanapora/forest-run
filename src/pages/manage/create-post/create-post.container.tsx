
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import { useCreatePostStyles } from './create-post.styles';

import { Button, FormControl, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import PublishIcon from '@material-ui/icons/Publish';
import Alert from '@material-ui/lab/Alert';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import { CREATE_POST, GET_POSTS } from '../../../grapQL';
import { useMutation } from '@apollo/react-hooks';

import SpinnerButton from '../../../shared/spinner-button.component';
import { withRouter } from 'react-router-dom';
import { postImage } from '../../../axios/image.api';


interface ChipData {
    key: number;
    label: string;
}


interface IAllPostDetails {
    title: string,
    text: string,
    keywords: ChipData[],
    image: File,
}

interface IAllAlerts {
    emptyText: boolean;
    emptyTitle: boolean;
    tooLessKeywords: boolean;
    internalBackendError: boolean;
    pleaseLogIn: boolean;
}

function CreateNewPost({ history }) {
    const [chip, setChip]: [string, Dispatch<SetStateAction<string>>] = useState('');
    const [imgid, setImageId]: [string, Dispatch<SetStateAction<string>>] = useState("");
    const [imageLoading, setImageLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    const [alert, setAlert]: [IAllAlerts, Dispatch<SetStateAction<IAllAlerts>>] = useState({
        emptyText: false,
        emptyTitle: false,
        tooLessKeywords: false,
        internalBackendError: false,
        pleaseLogIn: false
    });

    const [postValues, setPostValues]: [IAllPostDetails, Dispatch<SetStateAction<IAllPostDetails>>] = useState({
        title: '',
        text: '',
        keywords: [],
        image: null,
    });

    const [createPost, { loading }] = useMutation(
        CREATE_POST, {
        onCompleted: () => {
            redirectToArticles();
        },
        onError: (e) => {
            if ((e.graphQLErrors[0].message as any).statusCode === 500) {
                setAlert({ ...alert, internalBackendError: true });
            }
            if ((e.graphQLErrors[0].message) === "Token error: jwt expired") {
                setAlert({ ...alert, pleaseLogIn: true })
            }
        },
    });

    useEffect(() => {
    }, [postValues.keywords]);


    const handleChipDelete = (chipToDelete: ChipData) => () => {
        const newKeywords = postValues.keywords.filter((keyword) => {
            return keyword.key !== chipToDelete.key;
        });
        setPostValues({ ...postValues, keywords: newKeywords });
    };

    const classes = useCreatePostStyles();

    const handleTextChange = (value) => {
        setPostValues({ ...postValues, text: value });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageLoading(true)
        postImage(event.target.files[0])
            .then((result) => {
                setPostValues({ ...postValues, image: event.target.files[0] });
                setImageId(result.data.id);
                setImageLoading(false);
            })
    };

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlert({
            ...alert,
            emptyText: false,
            emptyTitle: false,
            tooLessKeywords: false
        });
        setPostValues({ ...postValues, title: event.target.value });
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

            setChip('');
        }
    };

    const handleChipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value[event.target.value.length - 1] === ' ' || event.target.value[0] === ',' ?
            setChip(event.target.value.slice(0, -1)) :
            setChip(event.target.value);
    };


    const redirectToArticles = () => {
        if (history) {
            history.push('/notice-board');
        }
    };

    const redirectBack = () => {
        if (history) {
            history.push('/manage');
        }
    };


    const handlePublishButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!postValues.text) {
            setAlert({
                ...alert,
                emptyText: true
            });
            return
        };
        if (postValues.title.length < 1) {
            setAlert({
                ...alert,
                emptyTitle: true
            });
            return
        };
        if (postValues.keywords.length < 3) {
            setAlert({
                ...alert,
                tooLessKeywords: true
            });
            return
        };
        createPost(
            {
                variables: {
                    title: postValues.title,
                    imageId: imgid,
                    text: postValues.text,
                    keywords: postValues.keywords.map((keyword) => {
                        return keyword.label;
                    })
                },
                refetchQueries: [{
                    query: GET_POSTS,
                    variables: {
                        filters: {
                            me: false,
                            phrase: ""
                        }
                    }
                }],
            }
        );
    };

    return (
        <div className={classes.container}>
            <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.buttonBack}
                startIcon={<ArrowBackIcon />}
                onClick={redirectBack}
            >
                BACK
        </Button>
            {alert.internalBackendError ? (
                <Alert severity="error">Ooops! Something went wrong, try again later.</Alert>
            ) : null}
            {alert.pleaseLogIn ? (
                <Alert severity="warning">Please log in to delete post.</Alert>
            ) : null}
            {alert.emptyText ? (
                <Alert severity="error">Text field is empty</Alert>
            ) : null}
            {alert.emptyTitle ? (
                <Alert severity="error">Title field is empty</Alert>
            ) : null}
            {alert.tooLessKeywords ? (
                <Alert severity="error">Please enter at least 3 keywords</Alert>
            ) : null}
            <ReactQuill className={classes.quill} value={postValues.text}
                onChange={handleTextChange} />
            <div className={classes.postDetails}>
                <TextField
                    className={classes.postTextFields}
                    value={postValues.title}
                    id="standard-textarea"
                    label="Title"
                    onChange={handleTitle} />
                <TextField
                    className={classes.postTextFields}
                    value={chip}
                    id="keywords"
                    label="Keywords"
                    onKeyDown={onChipKeydown}
                    onChange={handleChipChange} />
            </div>
            <div className={classes.upload}>
                {postValues.image || imageLoading ?
                    <FormControl className={classes.formControl}>
                        <img className={classes.image} alt={imageLoading ? "Uploading..." : "Success!"} />
                    </FormControl>
                    :
                    <FormControl className={classes.formControl}>
                        <Button
                            variant="contained"
                            component="label"
                        >Upload File
                    <input
                                hidden
                                type="file"
                                onChange={handleImageChange}
                            />
                        </Button>
                    </FormControl>}
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
                                className={classes.chip} />
                        </li>
                    );
                })}
            </Paper>
            <SpinnerButton loading={loading} startIcon={<PublishIcon />} buttonLabel={'Publish'} onClick={handlePublishButton} />
        </div>
    );
}

export default withRouter(CreateNewPost);