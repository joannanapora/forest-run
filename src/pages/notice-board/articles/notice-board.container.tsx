import React, { Dispatch, SetStateAction, useState } from "react";

import ReactHtmlParser from "react-html-parser";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
} from "@material-ui/core";

import { useNoticeBoardStyles } from "./notice-board.styles";
import SearchPost from "../search-post/search-post.component";
import { withRouter } from "react-router-dom";
import { GET_POSTS } from "../../../grapQL/post/post.query";
import { useQuery } from "@apollo/react-hooks";
import { format } from "date-fns";
import { Alert } from "@material-ui/lab";
import CircularIndeterminate from "../../../shared/spinner.component";

const NoticeBoard = () => {
  const classes = useNoticeBoardStyles();

  const [searchPhrase, setSearchPhrase]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: {
      filters: {
        me: false,
        phrase: searchPhrase,
      },
    },
  });

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await setSearchPhrase(event.target.value);
    refetch();
  };

  if (error) {
    return (
      <div className={classes.alert}>
        <Alert severity="error">Ooops! Try again later.</Alert>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.speedDial}>
        <SearchPost onChange={handleSearch} value={searchPhrase} />
      </div>
      <div className={classes.scrollArea}>
        {!data || loading ? (
          <CircularIndeterminate />
        ) : (
          <div className={classes.articles}>
            {data?.posts?.map((post) => {
              return (
                <Card key={post.id} className={classes.cardRoot}>
                  <CardMedia
                    className={classes.media}
                    image="https://images.pexels.com/videos/1448735/free-video-1448735.jpg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  />
                  <CardContent>
                    <Typography variant="h6">{post.title}</Typography>
                    <div className={classes.textPost} color="textSecondary">
                      {ReactHtmlParser(post.text)}
                    </div>
                  </CardContent>
                  <CardActions className={classes.keywordsList}>
                    <div>
                      Date: {format(new Date(post.dateCreated), "dd/MM/yyyy")}
                    </div>
                    Author: {post.user?.username}
                    <div className={classes.keywords}>
                      {post.keywords.map((k, i) => {
                        return <div key={i}>#{k}</div>;
                      })}
                    </div>
                  </CardActions>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(NoticeBoard);
