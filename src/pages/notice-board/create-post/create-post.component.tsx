
import { Button, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect, FunctionComponent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreatePostStyles } from './create-post.styles';
import PublishIcon from '@material-ui/icons/Publish';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Alert from '@material-ui/lab/Alert';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { CREATE_POST } from '../../../grapQL/post/post.mutation';
import { useMutation } from '@apollo/react-hooks';
import SpinnerButton from '../../../shared/spinner/spinner-button.component';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { StaticContext } from 'react-router';

interface ChipData {
    key: number;
    label: string;
}

function CreateNewPost({ history }) {
    const [chip, setChip]: [string, any] = useState('');

    const [alert, setAlert] = useState({
        emptyText: false,
        emptyTitle: false,
        tooLessKeywords: false,
        somethingWentWrong: false,
    });

    const [postValues, setPostValues] = useState({
        title: '',
        text: '',
        keywords: [],
        image: File,
    });

    const [createPost, { loading, error }] = useMutation(
        CREATE_POST
    );

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


    const handlePublishButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (postValues.title.length < 1) {
            setAlert({
                ...alert,
                emptyTitle: true
            });
        };
        if (postValues.text.length < 1) {
            setAlert({
                ...alert,
                emptyText: true
            });
        };
        if (postValues.keywords.length < 3) {
            setAlert({
                ...alert,
                tooLessKeywords: true
            });
        };
        createPost(
            {
                variables: {
                    title: postValues.title,
                    text: postValues.text,
                    keywords: postValues.keywords.map((keyword) => {
                        return keyword.label;
                    })
                }
            }
        );
        redirectToArticles();
    };

    if (error) {
        setAlert({ ...alert, somethingWentWrong: true })
    };


    if (loading) {
        return (
            <div className={classes.container}>
                <Button
                    disabled
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.buttonBack}
                    startIcon={<ArrowBackIcon />}
                    onClick={redirectToArticles}
                >
                    Back
                </Button>
                <ReactQuill className={classes.quill} value={postValues.text}
                    onChange={handleTextChange} />
                <div className={classes.postDetails}>
                    <TextField
                        disabled
                        className={classes.postTextFields}
                        value={postValues.title}
                        id="standard-textarea"
                        label="Title"
                        onChange={handleTitle} />
                    <TextField
                        disabled
                        className={classes.postTextFields}
                        value={chip}
                        id="keywords"
                        label="Keywords"
                        onKeyDown={onChipKeydown}
                        onChange={handleChipChange} />
                </div>
                <Paper component="ul" className={classes.chipRoot}>
                </Paper>
                <SpinnerButton startIcon={<PublishIcon />} loading={loading} buttonLabel={'Publish'} onClick={handlePublishButton} />
            </div>
        );
    }

    if (!loading) {
        return (
            <div className={classes.container}>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.buttonBack}
                    startIcon={<ArrowBackIcon />}
                    onClick={redirectToArticles}
                >
                    ack
                </Button>
                {alert.somethingWentWrong ? (
                    <Alert severity="error">Ooops! Something went wrong, try again later.</Alert>
                ) : null}
                {alert.emptyText ? (
                    <Alert severity="error">Text field is empty</Alert>
                ) : null}
                {alert.emptyTitle ? (
                    <Alert severity="error">Title field is empty</Alert>
                ) : null}
                {alert.tooLessKeywords ? (
                    <Alert severity="error">Too less keywords</Alert>
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
                <SpinnerButton startIcon={<PublishIcon />} loading={loading} buttonLabel={'Publish'} onClick={handlePublishButton} />
            </div>
        );
    };

    return (
        <></>
    );
}

export default withRouter(CreateNewPost);