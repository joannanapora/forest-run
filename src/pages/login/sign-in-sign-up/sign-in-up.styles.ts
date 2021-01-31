
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useSignInUpStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
            flexGrow: 1,
            overflow: 'auto',
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(2, 32, 8, 2),
            },
            [theme.breakpoints.up("md")]: {
                padding: theme.spacing(2, 33, 6, 2),
            },
            [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(6, 33, 6, 5),
            },
        },
        paper: {
            marginTop: theme.spacing(5),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            padding: theme.spacing(3),
            height: '100%',
            alignItems: 'center',
            width: '100%'
        },
    }));