import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDeletePostStyles } from './delete-post.styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router-dom';
import { GET_POSTS } from '../../../grapQL/post/post.query';
import { useQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';


const DeletePost = ({ history }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const classes = useDeletePostStyles();

    const getPostParams = {
        filters: { me: true }
    };

    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: getPostParams,
    });

    const { posts } = data

    const listState = posts.map(post => ({
        [post.id]: false
    }))

    const [articleState, setArticleStateState] = useState(listState);
    const [modalStyle] = useState(getModalStyle);



    if (loading) {
        return (<div>Loading...</div>)
    }
    if (error) return (<div>ERRRORRR</div>);






    function rand() {
        return Math.round(Math.random() * 20) - 10;
    };

    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    };

    const handleNo = () => {
        setOpenModal(false);
    };

    const redirectToArticles = () => {
        if (history) {
            history.push('/notice-board/')
        }
    };

    const handleYes = () => {
        handleDelete();
    };

    const handleDelete = () => {
        ///delete post 
    }

    const handleModalClose = () => {
        setOpenModal(false);
    };


    const bodyConfirmDelete = (
        <div style={modalStyle} className={classes.paper}>
            <Typography>Are you sure you want to delete?</Typography>
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


    const handleDeleteButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setOpenModal(true);
    };



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticleStateState({ ...articleState, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.container} >
            <Button
                onClick={redirectToArticles}
                variant="contained"
                color="primary"
                size="medium"
                className={classes.buttonBack}
                startIcon={< ArrowBackIcon />}
            >
                Back
      </Button>
            <div className={classes.checkboxes}>
                <FormGroup>
                    {
                        posts.map((post) => {
                            return (
                                <FormControlLabel key={post.id}
                                    control={
                                        <Checkbox
                                            checked={articleState[post.id]}
                                            onChange={handleChange}
                                            name={post.title}
                                            color="primary"
                                        />
                                    }

                                    label={
                                        <div className={classes.articlesFormLabel}>
                                            <div className={classes.date}>
                                                {format(new Date(post.dateCreated), 'dd/MM/yyyy')}
                                            </div>
                                            <div>
                                                {post.title}
                                            </div>
                                        </div>
                                    }

                                />
                            )
                        })
                    }
                </FormGroup>
            </div>
            <Button
                onClick={handleDeleteButton}
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<DeleteIcon />}
            >
                DELETE
      </Button>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {bodyConfirmDelete}
            </Modal>
        </div>
    )
};

export default withRouter(DeletePost);