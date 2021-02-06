import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useNoticeBoardStyles } from './notice-board.styles';
import SearchPost from '../search-post/search-post.component';
import { withRouter } from 'react-router-dom';
import { GET_POSTS } from '../../../grapQL/post/post.query';
import { useLazyQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';
import { Alert } from '@material-ui/lab';


const NoticeBoard = () => {
    const classes = useNoticeBoardStyles();
    const [searchPhrase, setSearchPhrase]: [string, Dispatch<SetStateAction<string>>] = useState('');

    const [searchPost, { loading, error, data }] = useLazyQuery(GET_POSTS, {
        variables: {
            filters: {
                me: false,
                phrase: searchPhrase
            }
        },
    });

    useEffect(() => {
        searchPost();
    }, [searchPhrase]);


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPhrase(event.target.value);
    };
    if (error) {
        return (
            <Alert severity="error">Ooops! Try again later.</Alert>)
    }

    // if (!data) {
    //     return (
    //         <Alert severity="error">Ooops! Try again later.</Alert>
    //     )
    // };

    if (loading) {
        return (
            <div className={classes.container}>
                <div className={classes.speedDial}>
                    <SearchPost onChange={handleSearch} value={searchPhrase} />
                </div>
                <div className={classes.scrollArea}>
                    <div className={classes.articles}>
                        <Card className={classes.cardRoot}>
                            <CardMedia
                                className={classes.media}
                                image="https://img.delicious.com.au/akWRpqCk/del/2016/04/silvia-collocas-vegan-lentil-and-sweet-potato-chickpea-stew-29566-3.jpg"
                            />
                            <CardContent>
                                <Typography variant="h6">
                                    ...Loading
                                    </Typography>
                                <Typography color="textSecondary" >
                                    ...Loading
                                    </Typography>
                            </CardContent>
                            <CardActions className={classes.keywordsList}>
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </div >
        )
    };


    return (
        <div className={classes.container}>
            <div className={classes.speedDial}>
                <SearchPost onChange={handleSearch} value={searchPhrase} />
            </div>
            <div className={classes.scrollArea}>
                {
                    data.posts.length < 1 ?
                        <div className={classes.noResults}>
                            <Typography className={classes.cardRoot}>
                                NO RESULTS
                                    </Typography>
                        </div>
                        :
                        <div className={classes.articles}>
                            {data?.posts?.map(post => {
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
                }
            </div>
        </div >
    );
};


export default withRouter(NoticeBoard);

