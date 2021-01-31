import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Button, ThemeProvider } from "@material-ui/core";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { createMuiTheme } from "@material-ui/core/styles";
import { useMenuDrawerStyles, light, dark } from "./menu-drawer.styles";
import Username from "../avatar/avatar.component";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import SignInUp from "../../pages/login/sign-in-sign-up/sign-in-up.component";
import TimeLines from "../../pages/landing/timelines/timelines.component";
import CardEdit from "../../pages/events/new-event/create-event/create-event.component";
import { DirectionsRun, Nature } from "@material-ui/icons";
import UpcomingEvent from "../../pages/events/event-card/event.component";
import EventList from "../../pages/events/event-list/event-list.component";
import NoticeBoard from "../../pages/notice-board/articles/notice-board.component";
import Donate from "../../pages/donate/donate.component";
import CreatePost from "../../pages/notice-board/create-post/create-post.component";
import DeletePost from "../../pages/notice-board/delete-post/delete-post.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../store-redux/user/user.selectors";
import { connect } from "react-redux";
import { setCurrentUser } from "../../store-redux/user";
import { selectNavTabs } from "../../store-redux/nav/nav.selectors";

const MenuDrawer = ({ user, dispatchSetCurrentUser, tabs }) => {
  const classes = useMenuDrawerStyles();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(true);
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
  const appliedTheme = createMuiTheme(theme ? light : dark);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {}, [user]);

  const handleLinkClick = (name: string) => {
    if (name === "Sign Out") {
      dispatchSetCurrentUser({});
      localStorage.removeItem("accessToken");
    }
  };

  const getNavTabsBasedOnstate = (tabs) => {
    if (user.username) {
      return tabs.filter((s) => {
        return s.name !== "Sign In";
      });
    } else {
      return tabs.filter((s) => {
        return s.name !== "Sign Out";
      });
    }
  };

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  type Anchor = "top" | "left" | "bottom" | "right";

  const newTabs: any[] = getNavTabsBasedOnstate(tabs);

  const list = (anchor: Anchor) => (
    <List>
      <List>
        <Username />
      </List>
      <List>
        {newTabs.map((element) => (
          <Link
            style={{ textDecoration: "none" }}
            key={element.id}
            to={element.url}
            onClick={() => handleLinkClick(element.name)}>
            <ListItem className={classes.menuList} button>
              <ListItemIcon>{element.name}</ListItemIcon>
            </ListItem>
          </Link>
        ))}
      </List>
    </List>
  );

  return (
    <ThemeProvider theme={appliedTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar>
            <Typography variant='h5' noWrap className={classes.title}>
              {
                <i className='material-icons md-48'>
                  <Nature />
                </i>
              }
              {
                <i className='material-icons md-48'>
                  <DirectionsRun />
                </i>
              }
              Run Forest, Run
            </Typography>
            <IconButton
              edge='end'
              color='inherit'
              aria-label='mode'
              onClick={() => setTheme(!theme)}>
              {icon}
            </IconButton>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='end'
              onClick={toggleDrawer("right", true)}
              className={clsx(open && classes.hide)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}>
          <Switch>
            <Route exact path='/' component={TimeLines} />
            <Route path='/notice-board/create-post' component={CreatePost} />
            <Route path='/notice-board/delete-post' component={DeletePost} />
            <Route path='/create-event' component={CardEdit} />
            <Route path='/upcoming-events' component={EventList} />
            <Route path='/sign-up' component={SignInUp} />
            <Route path='/messages' component={UpcomingEvent} />
            <Route path='/notice-board' component={NoticeBoard} />
            <Route path='/donate' component={Donate} />
          </Switch>
        </main>
        <React.Fragment key={"right"}>
          <Drawer
            className={classes.drawer}
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}>
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  tabs: selectNavTabs,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MenuDrawer)
);
