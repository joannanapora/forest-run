import React, { useState } from 'react';
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

enum QuickActions {
    CREATE_POST = 'Create Post',
    DELETE_POST = 'Delete Post',
    SEARCH_POST = 'Search Post'
}

const articles = [
    {
        id: 0,
        title: 'Vegan Recipies',
        keywords: [{ name: 'vegan', id: 0 }, { name: 'recipies', id: 1 }, { name: 'health', id: 2 }, { name: 'food', id: 4 }],
        image: "https://img.delicious.com.au/akWRpqCk/del/2016/04/silvia-collocas-vegan-lentil-and-sweet-potato-chickpea-stew-29566-3.jpg",
        author: 'Robby Dick',
        date: '10.10.20',
        text: "RICHMOND PAR The largest of London’s Royal Parks, Richmond Park is the famous home to the beautiful Isabella Plantation, and herds of protected deer. An acclaimed cyclist favourite, Richmond also has much to offer the running community. With an abundance of dirt paths, this is a great option for those seeking longer runs on a terrain more forgiving than the London pavement. Its vast network of trails means you’re never short for choice, and can get creative with the routes you take. Run through gardens, along lakes, and take in views of the beautiful fauna. Richmond Park is an undulating paradise for runners. A run through the gates of this spot will have you feeling worlds away from busy city life. CONCLUSION No matter where you are in London, you’re never far from some green space. Whether you\'re a new runner still dipping your toes into the sport or a seasoned run of all race distances, why not explore one of these fantastic spots on your next run. From flat fast courses, to undulating hills and steep climbs, there’s something for everyone."
    },
    {
        id: 1,
        title: '10 Best London Parks for Running',
        keywords: [{ name: 'shoes', id: 0 }, { name: 'running', id: 1 }, { name: 'best10', id: 2 }],
        image: "https://cdn.shopify.com/s/files/1/0851/4276/files/greenwich_park_for_running.jpg?v=1592808345",
        author: "Sara Connor",
        date: '10.10.20',
        text: "RICHMOND PAR The largest of London’s Royal Parks, Richmond Park is the famous home to the beautiful Isabella Plantation, and herds of protected deer. An acclaimed cyclist favourite, Richmond also has much to offer the running community. With an abundance of dirt paths, this is a great option for those seeking longer runs on a terrain more forgiving than the London pavement. Its vast network of trails means you’re never short for choice, and can get creative with the routes you take. Run through gardens, along lakes, and take in views of the beautiful fauna. Richmond Park is an undulating paradise for runners. A run through the gates of this spot will have you feeling worlds away from busy city life. CONCLUSION No matter where you are in London, you’re never far from some green space. Whether you\'re a new runner still dipping your toes into the sport or a seasoned run of all race distances, why not explore one of these fantastic spots on your next run. From flat fast courses, to undulating hills and steep climbs, there’s something for everyone."
    },
    {
        id: 2,
        title: 'Which park is the best for running?',
        keywords: [{ name: 'park', id: 0 }, { name: 'runners', id: 1 }],
        image: "https://gorunningtours.com/wp-content/uploads/2015/06/Bangkok_parkrun_6k_750x500.jpg",
        author: "Thimoty Lloyd",
        date: '10.10.20',
        text: "RICHMOND PAR The largest of London’s Royal Parks, Richmond Park is the famous home to the beautiful Isabella Plantation, and herds of protected deer. An acclaimed cyclist favourite, Richmond also has much to offer the running community. With an abundance of dirt paths, this is a great option for those seeking longer runs on a terrain more forgiving than the London pavement. Its vast network of trails means you’re never short for choice, and can get creative with the routes you take. Run through gardens, along lakes, and take in views of the beautiful fauna. Richmond Park is an undulating paradise for runners. A run through the gates of this spot will have you feeling worlds away from busy city life. CONCLUSION No matter where you are in London, you’re never far from some green space. Whether you\'re a new runner still dipping your toes into the sport or a seasoned run of all race distances, why not explore one of these fantastic spots on your next run. From flat fast courses, to undulating hills and steep climbs, there’s something for everyone."
    },
]

const actions = [
    { icon: < PostAdd />, name: QuickActions.CREATE_POST },
    { icon: <DeleteForever />, name: QuickActions.DELETE_POST },
    { icon: <Search />, name: QuickActions.SEARCH_POST },
];


const NoticeBoard = ({ history }) => {
    const classes = useNoticeBoardStyles();

    const [openSearchModal, setopenSearchModal] = useState(false);

    const [open, setOpen] = React.useState(false);

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
            redirectToCreatePost();
        }
        if (name === QuickActions.DELETE_POST) {
            redirectToDeletePost();
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
                    direction='down'
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
                <div className={classes.articles}>
                    {articles.map(article => {
                        return (
                            <Card key={article.id} className={classes.cardRoot}>
                                <CardMedia
                                    className={classes.media}
                                    image={article.image}
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        {article.title}
                                    </Typography>
                                    <Typography color="textSecondary" >
                                        {article.text}
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.keywordsList}>
                                    <Typography>Date: {article.date}</Typography>Author: {article.author}<Typography></Typography><Typography className={classes.keywords}>
                                        {
                                            article.keywords.map(k => {
                                                return (<Typography key={k.id} >#{k.name}</Typography>);
                                            })
                                        }</Typography>
                                </CardActions>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div >

    );
}

export default withRouter(NoticeBoard);