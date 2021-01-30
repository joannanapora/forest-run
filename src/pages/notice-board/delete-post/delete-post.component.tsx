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


const articles = [
    {
        id: 'a119fc1c-0ee0-4660-ace0-796f8087227c',
        title: 'Vegan Recipies',
        keywords: [{ name: 'vegan', id: 0 }, { name: 'recipies', id: 1 }, { name: 'health', id: 2 }, { name: 'food', id: 4 }],
        date: '10.10.20',
    },
    {
        id: "e60eb629-61f8-48f4-922a-633526e5965b",
        title: '10 Best London Parks for Running',
        keywords: [{ name: 'shoes', id: 0 }, { name: 'running', id: 1 }, { name: 'best10', id: 2 }],
        date: '10.10.20',
    },
    {
        id: "299067c6-db4c-49bc-aa86-a455bda13bf9",
        title: 'Which park is the best for running?',
        keywords: [{ name: 'park', id: 0 }, { name: 'runners', id: 1 }],
        date: '10.10.20',
    },
];

const DeletePost = ({ history }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const classes = useDeletePostStyles();

    const listState = articles.map(a => ({
        [a.id]: false
    }))

    // [
    //     {"299067c6-db4c-49bc-aa86-a455bda13bf9": false},
    //     {"e60eb629-61f8-48f4-922a-633526e5965b": false},
    // ]

    // {checkedB: false}


    const [articleState, setArticleStateState] = React.useState(listState);


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

    const [modalStyle] = useState(getModalStyle);

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
                size="large"
                className={classes.buttonBack}
                startIcon={< ArrowBackIcon />}
            >
                Back
      </Button>
            <div className={classes.checkboxes}>
                <FormGroup>
                    {
                        articles.map((article) => {
                            return (
                                <FormControlLabel key={article.id}
                                    control={
                                        <Checkbox
                                            checked={articleState[article.id]}
                                            onChange={handleChange}
                                            name={article.id}
                                            color="primary"
                                        />
                                    }

                                    label={
                                        <div className={classes.articlesFormLabel}>
                                            <div className={classes.date}>
                                                Date: {article.date}
                                            </div>
                                            <div>
                                                Title: {article.title}
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