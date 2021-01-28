import { makeStyles, ThemeOptions } from '@material-ui/core';

export const drawerWidth = 240;

export const useMenuDrawerStyles = makeStyles((theme) => ({
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
        height: '4rem',
    }
}));

export const light: ThemeOptions = {
    typography: {
        fontWeightBold: 1000,
        fontFamily: 'Amatic SC',
        fontSize: 20
    },
    palette: {
        type: 'light',
        primary: {
            main: '#003d00',
        },
        secondary: {
            main: '#fff263'
        }
    }
};

export const dark: ThemeOptions = {
    typography: {
        fontFamily: 'Amatic SC',
        fontSize: 20,
    },
    palette: {
        type: 'dark',
        primary: {
            main: '#c49000'
        },
        secondary: {
            main: '#c49000'
        }
    },
};