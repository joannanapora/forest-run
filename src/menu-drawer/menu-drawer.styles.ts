import { makeStyles, ThemeOptions } from '@material-ui/core';

export const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
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
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
        fontFamily: 'Goldman',

    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
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
        overflow: 'auto',
        flexGrow: 1,
        padding: theme.spacing(3),
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
        height: '8vw',
        fontSize: '1.5vw'
    }
}));

export const light: ThemeOptions = {
    typography: {
        fontFamily: 'Goldman',
    },
    palette: {
        type: 'light',
        primary: {
            main: '#de9b35',
        },
        secondary: {
            main: '#5d79ae'
        }
    }
};

export const dark: ThemeOptions = {
    typography: {
        fontFamily: 'Goldman'
    },
    palette: {
        type: 'dark',
        primary: {
            main: '#5d79ae'
        },
        secondary: {
            main: '#de9b35'
        }
    },
};