import React, { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";

import NoticeBoard from "../../pages/notice-board/articles/notice-board.container";
import CreateEvent from "../../pages/manage/create-event/create-event.container";
import CreateNewPost from "../../pages/manage/create-post/create-post.container";
import DeletePost from "../../pages/manage/delete-post/delete-post.container";
import SignInUp from "../../pages/login/sign-in-sign-up/sign-in-up.component";
import EventList from "../../pages/events/event-list/event-list.component";
import TimeLines from "../../pages/landing/timelines/timelines.component";
import UpcomingEvent from "../../pages/events/event-card/event.component";
import { useMenuDrawerStyles, light, dark } from "./menu-drawer.styles";
import Donate from "../../pages/donate/donate.component";
import Manage from '../../pages/manage/manage.component';
import Username from "../user-area/user-area.container";

import { Switch, Route, withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';

import { selectCurrentUser } from "../../store-redux/user/user.selectors";
import { selectNavTabs } from "../../store-redux/nav/nav.selectors";
import { IUser, ITabs } from '../../store-redux/index';
import { setCurrentUser } from "../../store-redux";
import { createStructuredSelector } from "reselect";

import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, IconButton, ListItem, ListItemIcon, ThemeProvider, } from '@material-ui/core';

import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { DirectionsRun, Nature } from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';

import { createMuiTheme } from "@material-ui/core/styles";


const MenuDrawer = ({ user, tabs, dispatchUser }: { user: IUser, tabs: ITabs, dispatchUser }) => {
  const classes = useMenuDrawerStyles();


  const open = false;
  const [drawer, setDrawer]: [{ right: boolean }, Dispatch<SetStateAction<{ right: boolean }>>] = useState({
    right: false,
  });

  const [theme, setTheme]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
  const appliedTheme = createMuiTheme(theme ? light : dark);


  const handleLogout = (name: string) => {
    if (name === "Sign Out") {
      dispatchUser({});
      localStorage.removeItem('token');
    }
  };

  const getNavTabsBasedOnstate = (tabs) => {
    if (user?.username) {
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

    setDrawer({ ...drawer, [anchor]: open });
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
            onClick={() => handleLogout(element.name)}>
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
            <Route exact path='/manage' component={Manage} />
            <Route path='/manage/add-post' component={CreateNewPost} />
            <Route path='/manage/delete-post' component={DeletePost} />
            <Route path='/manage/create-event' component={CreateEvent} />
            <Route path='/manage/cancel-event' component={CreateEvent} />
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
            open={drawer["right"]}
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
  dispatchUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MenuDrawer)
);
