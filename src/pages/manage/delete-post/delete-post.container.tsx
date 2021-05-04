import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

import { useDeletePostStyles } from "./delete-post.styles";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button, Typography } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";
import Alert from "@material-ui/lab/Alert";
import CircularIndeterminate from "../../../shared/spinner.component";

import { withRouter } from "react-router-dom";
import { DELETE_POST, GET_POSTS } from "../../../grapQL";

import { useMutation, useQuery } from "@apollo/react-hooks";

import { format } from "date-fns";

interface IAllAlerts {
  postDeleted: boolean;
  internalBackendError: boolean;
  pleaseLogIn: boolean;
}

const DeletePost = ({ history }: { history }) => {
  const classes = useDeletePostStyles();
  const [articleState, setArticleStateState] = useState(null);
  const [modalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [alert, setAlert]: [
    IAllAlerts,
    Dispatch<SetStateAction<IAllAlerts>>
  ] = useState({
    internalBackendError: false,
    pleaseLogIn: false,
    postDeleted: false,
  });

  useEffect(() => {
    refetch();
  });

  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: {
      filters: {
        me: true,
        phrase: "",
      },
    },
    onCompleted: (result) => {
      let articlesStateObj = {};

      result.posts.forEach((post) => {
        articlesStateObj[post.id] = false;
      });

      setArticleStateState(articlesStateObj);
    },
    onError: (e) => {
      if ((e.graphQLErrors[0].message as any).statusCode === 500) {
        setAlert({ ...alert, internalBackendError: true });
      }
      if (
        e.graphQLErrors[0].message === "Cannot read property 'sub' of undefined"
      ) {
        setAlert({ ...alert, pleaseLogIn: true });
      }
    },
  });

  const [deletePost] = useMutation(DELETE_POST, {
    onError: (e) => {
      if ((e.graphQLErrors[0].message as any).statusCode === 500) {
        setAlert({ ...alert, internalBackendError: true });
      }
      if (
        e.graphQLErrors[0].message === "Cannot read property 'sub' of undefined"
      ) {
        setAlert({ ...alert, pleaseLogIn: true });
      }
    },
    onCompleted: () => {
      setOpenModal(false);
      refetch();
      setAlert({ ...alert, postDeleted: true });
    },
  });

  if (error) {
    return (
      <div className={classes.alert}>
        <Alert severity="warning">Please login.</Alert>
      </div>
    );
  }

  const handleYes = () => {
    let listOfObjectsToDelete = [];

    for (const postId in articleState) {
      if (articleState[postId] === true) {
        listOfObjectsToDelete.push(postId);
      }
    }
    deletePost({
      variables: {
        ids: listOfObjectsToDelete,
      },
      refetchQueries: [
        {
          query: GET_POSTS,
          variables: {
            filters: {
              me: false,
              phrase: "",
            },
          },
        },
      ],
    });
  };
  const handleNo = () => {
    setOpenModal(false);
  };

  const redirectToManage = () => {
    if (history) {
      history.push("/manage/");
    }
  };

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

  const handleDeleteButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOpenModal(true);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setArticleStateState({ ...articleState, [id]: event.target.checked });
  };

  let checkIfDisableButton = true;

  for (const postId in articleState) {
    if (articleState[postId] === true) {
      checkIfDisableButton = false;
    }
  }

  return (
    <div className={classes.container}>
      <Button
        onClick={redirectToManage}
        variant="contained"
        color="primary"
        size="medium"
        className={classes.buttonBack}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
      {!data || loading ? (
        <CircularIndeterminate />
      ) : (
        <div className={classes.checkboxes}>
          {alert.internalBackendError ? (
            <Alert severity="error">
              Ooops! Something went wrong, try again later.
            </Alert>
          ) : null}
          {alert.postDeleted ? (
            <Alert severity="success">Post/s has been deleted.</Alert>
          ) : null}
          <FormGroup>
            {articleState
              ? data?.posts?.map((post) => {
                  return (
                    <FormControlLabel
                      key={post.id}
                      control={
                        <Checkbox
                          checked={articleState[post.id]}
                          onChange={(e) => handleChange(e, post.id)}
                          name={post.id}
                          color="primary"
                        />
                      }
                      label={
                        <div className={classes.articlesFormLabel}>
                          <div className={classes.date}>
                            {format(new Date(post.dateCreated), "dd/MM/yyyy")}
                          </div>
                          <div>{post.title}</div>
                        </div>
                      }
                    />
                  );
                })
              : null}
          </FormGroup>
        </div>
      )}
      <Button
        onClick={handleDeleteButton}
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<DeleteIcon />}
        disabled={data?.posts.length < 1 || checkIfDisableButton}
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
  );
};

export default withRouter(DeletePost);
