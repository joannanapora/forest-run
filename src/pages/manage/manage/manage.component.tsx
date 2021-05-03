import React from "react";

import { useManageStyles } from "./manage.styles";

import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { selectCurrentUser } from "../../../store-redux/user/user.selectors";
import { IUser } from "../../../store-redux/user/user.reducer";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const cards = [
  {
    url: "https://www.flaticon.com/premium-icon/icons/svg/3222/3222020.svg",
    title: "Add Post",
    width: "25%",
    id: 0,
  },
  {
    url: "https://www.flaticon.com/premium-icon/icons/svg/3221/3221897.svg",
    title: "Delete Post",
    width: "25%",
    id: 1,
  },
  {
    url: "https://www.flaticon.com/premium-icon/icons/svg/3475/3475884.svg",
    title: "Create Event",
    width: "25%",
    id: 2,
  },
  {
    url: "https://www.flaticon.com/premium-icon/icons/svg/4144/4144559.svg",
    title: "Cancel Event",
    width: "25%",
    id: 3,
  },
];

const Manage = ({ history, user }: { history; user: IUser }) => {
  const classes = useManageStyles();

  const handleRedirectTo = (title) => {
    if (title === "Add Post") {
      history.push("/manage/add-post");
    }
    if (title === "Delete Post") {
      history.push("/manage/delete-post");
    }
    if (title === "Create Event") {
      history.push("/manage/create-event");
    }
    if (title === "Cancel Event") {
      history.push("/manage/cancel-event");
    }
  };

  return (
    <div className={classes.root}>
      {cards.map((image) => (
        <ButtonBase
          onClick={() => handleRedirectTo(image.title)}
          focusRipple
          key={image.id}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="h4"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps, null)(Manage));
