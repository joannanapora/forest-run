
import { Button, Typography } from '@material-ui/core';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreatePostStyles } from './create-post.styles';
import PublishIcon from '@material-ui/icons/Publish';
import Modal from '@material-ui/core/Modal';


const CreatePost = ({ history }) => {
    const [text, setText]: [string, any] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);
    const classes = useCreatePostStyles();

    const handleChange = (value) => {
        setText(value)
    };

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

    const handleNo = () => {
        setOpenModal(false);
    }

    const redirectToArticles = () => {
        if (history) {
            history.push('/notice-board/')
        }
    }

    const handleYes = () => {
        setOpenModal(false);
        redirectToArticles();
    }


    const handleModalClose = () => {
        setOpenModal(false);
    };

    const [modalStyle] = React.useState(getModalStyle);

    const bodyConfirmPost = (
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



    const handlePublishButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (text.length < 1) {
            alert('Input is empty')
            return;
        };

        setOpenModal(true);
    };

    return (
        <div className={classes.container} >
            <ReactQuill value={text}
                onChange={handleChange} />
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
                {bodyConfirmPost}
            </Modal>
        </div>
    )
}

export default CreatePost;