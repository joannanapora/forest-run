import React, { Dispatch, SetStateAction, useState } from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { DeleteForever, PostAdd, Search } from '@material-ui/icons';
import { useNoticeBoardStyles } from './notice-board.styles';
import Modal from '@material-ui/core/Modal';
import SearchPost from '../search-post/search-post.component';
import { withRouter } from 'react-router-dom';
import { GET_POSTS } from '../../../grapQL/post/post.query';
import { useQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';
import Spinner from '../../../shared/spinner/spinner.component';
import { Alert } from '@material-ui/lab';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../store-redux/user/user.selectors';
import { connect } from 'react-redux';
import { IUser } from '../../../store-redux/'
import { isEmpty } from 'lodash';

enum QuickActions {
    CREATE_POST = 'Create Post',
    DELETE_POST = 'Delete Post',
    SEARCH_POST = 'Search Post'
}

const actions = [
    { icon: < PostAdd />, name: QuickActions.CREATE_POST },
    { icon: <DeleteForever />, name: QuickActions.DELETE_POST },
    { icon: <Search />, name: QuickActions.SEARCH_POST },
];


const NoticeBoard = ({ history, user }: { history, user: IUser }) => {
    const classes = useNoticeBoardStyles();

    const [openSearchModal, setopenSearchModal] = useState(false);
    const [errorAlert, setErrorAlert]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [login, setPleaseLogIn]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);


    const [open, setOpen] = React.useState(false);

    const getPostsParams = {
        filters: { me: false }
    };

    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: getPostsParams,
    });

    if (loading) {
        return (
            <div className={classes.container}>
                <div className={classes.speedDial}>
                    <SpeedDial
                        ariaLabel="SpeedDial example"
                        icon={<SettingsIcon />}
                        open
                        direction='right'
                    >
                    </SpeedDial>
                </div>
                <div className={classes.articles}>
                    <Card className={classes.cardRoot}>
                        <CardMedia
                            className={classes.media}
                            image=''
                        />
                        <CardContent>
                        </CardContent>
                        <CardActions className={classes.keywordsList}>
                            <Spinner />
                        </CardActions>
                    </Card>
                </div>
            </div>
        )
    }

    if (error) {
        setErrorAlert(true);
    }

    const { posts } = data

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const redirectToCreatePost = () => {
        if (history) {
            history.push('/notice-board/create-post')
        }
    }

    const redirectToDeletePost = () => {
        if (history) {
            history.push('/notice-board/delete-post')
        }
    }


    const onSearch = (phrase: string) => {
        setopenSearchModal(false);
    }

    const bodySearchPost = (
        <div
            className={classes.paper}>
            <SearchPost onSearch={onSearch} />
        </div>
    );


    const handleTool = (name) => {
        if (name === QuickActions.SEARCH_POST) {
            setopenSearchModal(true);
        }
        if (name === QuickActions.CREATE_POST) {
            if (!isEmpty(user)) {
                redirectToCreatePost()
            } else { setPleaseLogIn(true) }
        }
        if (name === QuickActions.DELETE_POST) {
            if (!isEmpty(user)) {
                redirectToDeletePost()
            } else { setPleaseLogIn(true) }

        }
    };


    const handleModalClose = () => {
        setopenSearchModal(false);
    };

    return (
        <div className={classes.container}>
            <Modal
                open={openSearchModal}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {bodySearchPost}
            </Modal>
            <div className={classes.speedDial}>
                <SpeedDial
                    ariaLabel="SpeedDial example"
                    icon={<SettingsIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    direction='right'
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => handleTool(action.name)}
                        />
                    ))}
                </SpeedDial>
            </div>
            <div className={classes.scrollArea}>
                {login ?
                    <Alert severity="error">You must be login to Create Post or Delete Post </Alert> : null
                }
                {
                    errorAlert ?
                        <Alert severity="error">Ooops! Something went wrong, try again later.</Alert> : null
                }

                <div className={classes.articles}>
                    {posts.map(post => {
                        return (
                            <Card key={post.id} className={classes.cardRoot}>
                                <CardMedia
                                    className={classes.media}
                                    image="https://img.delicious.com.au/akWRpqCk/del/2016/04/silvia-collocas-vegan-lentil-and-sweet-potato-chickpea-stew-29566-3.jpg"
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        {post.title}
                                    </Typography>
                                    <Typography color="textSecondary" >
                                        {post.text}
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.keywordsList}>
                                    <div>Date: {format(new Date(post.dateCreated), 'dd/MM/yyyy')}</div>Author: {post.user.username}<div className={classes.keywords}>
                                        {
                                            post.keywords.map((k, i) => {
                                                return (<div key={i} >#{k}</div>);
                                            })
                                        }</div>
                                </CardActions>
                            </Card>
                        )
                    })}
                </div>

            </div>
        </div >

    );
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
});

export default withRouter(connect(
    mapStateToProps,
    null)
    (NoticeBoard));

