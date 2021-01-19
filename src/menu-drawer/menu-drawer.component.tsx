import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ThemeProvider } from '@material-ui/core'
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { createMuiTheme } from '@material-ui/core/styles';
import { useStyles, light, dark } from './menu-drawer.styles';
import PlayerAvatar from './avatar.component';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import MyPlayerCard from '../pages/player-card/my-player-card.component';
import { Switch, Route, withRouter, Link } from "react-router-dom";
import SignInUp from '../pages/signin-signup/signin-signup.component';

const MenuDrawer = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [theme, setTheme] = React.useState(true);
    const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />
    const appliedTheme = createMuiTheme(theme ? light : dark);
    const mode = useTheme();

    const MenuTabs = [
        {
            name: "Player Card",
            id: 0,
            url: "/player-card",
        },
        {
            name: "Players/Teams",
            id: 1,
            url: "/player-card",
        },
        {
            name: "Chat",
            id: 2,
            url: "/chat",
        },
        {
            name: "Sign Up",
            id: 3,
            url: "/sign-up"
        }];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={appliedTheme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <Typography variant="h5" noWrap className={classes.title}>
                            CS:GO {<i className="material-icons md-48"><SportsEsportsIcon /></i>} Teams
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="mode"
                            onClick={() => setTheme(!theme)}
                        >
                            {icon}
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                            className={clsx(open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <Switch>
                        <Route exact path='/' component={MyPlayerCard} />
                        <Route exact path='/player-card' component={MyPlayerCard} />
                        <Route exact path='/sign-up' component={SignInUp} />
                        <Route exact path='/chat' component={MyPlayerCard} />
                    </Switch>
                </main>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {mode.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>

                    <List>
                        <PlayerAvatar />
                    </List>

                    <List>
                        {MenuTabs.map((element) => (
                            <Link to={element.url}>
                                <ListItem className={classes.menuList} button key={element.id}>
                                    <ListItemIcon>{element.name}</ListItemIcon>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
            </div>
        </ThemeProvider>
    );
};


export default withRouter(MenuDrawer);