
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useSignInUpStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
            flexGrow: 1,
            overflow: 'auto',
            [theme.breakpoints.down("xs")]: {
                padding: theme.spacing(6, 25, 5, 11),
                minHeight: theme.spacing(10)
            },
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(6, 25, 5, 11),
                minHeight: theme.spacing(10)
            },
            [theme.breakpoints.up("md")]: {
                padding: theme.spacing(10, 30, 3, 10),
                minHeight: theme.spacing(57)
            },
            [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(10, 40, 3, 25),
                minHeight: theme.spacing(60)
            },
            [theme.breakpoints.up("xl")]: {
                padding: theme.spacing(10, 35, 3, 25),
                minHeight: theme.spacing(60)
            },
        },
        paper: {
            textAlign: 'center',
            color: theme.palette.text.secondary,
            padding: theme.spacing(3, 6, 1, 6),
            alignItems: 'center',
            width: '100%',
            [theme.breakpoints.up("xl")]: {
                minHeight: theme.spacing(60)
            },
            [theme.breakpoints.up("lg")]: {
                minHeight: theme.spacing(58)
            },
            [theme.breakpoints.up("md")]: {
                minHeight: theme.spacing(58)
            },
            [theme.breakpoints.up("sm")]: {
                minHeight: theme.spacing(58)
            },
        },
    }));