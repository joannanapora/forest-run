import { makeStyles, ThemeOptions, Theme } from '@material-ui/core';

export const drawerWidth = 240;

export const useMenuDrawerStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        height: '100%',
        backgroundColor: 'primary',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        overflow: 'hidden',
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    menuList: {
        height: theme.spacing(8),
        minWidth: theme.spacing(30),
        '.MuiTouchRipple-root': {

        }
    },
    paper: {
        minWidth: 300,
    },
    drawer: {
        minWidth: 400,
    },

}));

export const light: ThemeOptions = {
    typography: {
        fontWeightBold: 1000,
        fontFamily: 'Amatic SC',
        fontSize: 20,
    },
    palette: {
        type: 'light',
        primary: {
            main: '#003d00',
        },
        secondary: {
            main: '#c8e6c9'
        },
    },
    transitions: {}
};

export const dark: ThemeOptions = {
    typography: {
        fontFamily: 'Amatic SC',
        fontSize: 20,
    },
    palette: {
        type: 'dark',
        primary: {
            main: '#c49000',
        },
        secondary: {
            main: '#f0f4c3'
        },
    },
};