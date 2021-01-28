
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useSignInUpStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            [theme.breakpoints.down("sm")]: {
                overflow: 'hidden'
            },
            [theme.breakpoints.up("md")]: {
                margin: '0 8vw',
                padding: theme.spacing(2),
                overflow: 'hidden'

            },
            [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(2),
                margin: '0 8vw',
                overflow: 'hidden'
            },
        },
        paper: {
            textAlign: 'center',
            color: theme.palette.text.secondary,
            padding: theme.spacing(5),
            minHeight: '40vw',
            alignItems: 'center',
            height: '100%',
            width: '100%'
        },
    }));