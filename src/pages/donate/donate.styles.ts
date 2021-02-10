import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


export const useDonateStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            [theme.breakpoints.down("xs")]: {
                padding: theme.spacing(15, 33, 2, 4),
            },
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(15, 33, 0, 3),
            },
            [theme.breakpoints.up("md")]: {
                padding: theme.spacing(15, 30, 5, 3),
            },
            [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(15, 80, 0, 60),
            },
        },
        alert: {
            width: '100%',
            '& > * + *': {
                marginTop: '2rem'
            },
        },
        alertContainer: {
            marginTop: '2rem',
        },
        donate: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(1, 2, 3, 2),
        },
        donateButton: {
            marginTop: theme.spacing(3),
            alignSelf: 'center',

        }
    }));