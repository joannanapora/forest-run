
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useSignInUpStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '80vh',
            flexGrow: 1,
            overflow: 'auto',
            height: '100%',
            [theme.breakpoints.down("xs")]: {
                padding: theme.spacing(6, 30, 5, 11),
            },
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(10, 35, 5, 5),
                minHeight: theme.spacing(10)
            },
            [theme.breakpoints.up("md")]: {
                padding: theme.spacing(10, 40, 5, 10),
                minHeight: '700vh'
            },
            [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(10, 55, 5, 25),
                minHeight: '700vh'
            },
            [theme.breakpoints.up("xl")]: {
                padding: theme.spacing(10, 55, 5, 25),
                minHeight: '700vh'

            },
        },
        paper: {
            textAlign: 'center',
            color: theme.palette.text.secondary,
            padding: theme.spacing(5, 6, 1, 6),
            alignItems: 'center',
            width: '100%',
            overflow: 'auto',
            [theme.breakpoints.up("xl")]: {
                minHeight: '80vh',
            },
            [theme.breakpoints.up("lg")]: {
                minHeight: '80vh',
            },
            [theme.breakpoints.up("md")]: {
                minHeight: '80vh',
            },
            [theme.breakpoints.up("sm")]: {
                minHeight: '80vh',
            },
        },
        title: {
            paddingBottom: theme.spacing(5),
        }
    }));