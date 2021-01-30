
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useSignInUpStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
            flexGrow: 1,
            overflow: 'auto',

            // [theme.breakpoints.down("sm")]: {
            //     // overflow: 'auto',
            // },
            // [theme.breakpoints.up("md")]: {
            //     margin: '0 8vw',
            //     padding: theme.spacing(2),
            // },
            // [theme.breakpoints.up("lg")]: {
            //     padding: theme.spacing(2),
            //     margin: '0 8vw',
            // },
        },
        paper: {
            marginTop: theme.spacing(5),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            padding: theme.spacing(5),
            minHeight: '40vw',
            alignItems: 'center',
            width: '100%'
        },
    }));