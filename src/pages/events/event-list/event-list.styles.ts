
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useEventListStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        control: {
        },
        rootfilters: {
            display: 'flex',
            padding: theme.spacing(2, 0, 2, 2),
        },
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            overflow: 'auto',
        },
        paper: {
            display: 'flex',
            justifyContent: 'space-evenly',
            minWidth: '350px'
        },
        svg: {
        },
        button: {
        },
        eventListPage: {
            height: '100%',
            overflow: 'auto',
            [theme.breakpoints.down("xs")]: {
                padding: theme.spacing(8, 28, 2, 0),
            },
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(8, 28, 2, 0),
            },
            [theme.breakpoints.down("md")]: {
                padding: theme.spacing(8, 28, 7, 0),
            },
            [theme.breakpoints.down("lg")]: {
                padding: theme.spacing(8, 28, 7, 0),
            },
            [theme.breakpoints.down("xl")]: {
                padding: theme.spacing(8, 28, 7, 0),
            },
        },
        alert: {
            marginTop: theme.spacing(8)
        },
        mutationAlert: {
            marginBottom: theme.spacing(2)
        },
    }));