import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useCreateEventStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            marginTop: theme.spacing(2),
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(3, 30, 5, 6),
                overflow: 'auto'
            },
            [theme.breakpoints.up("md")]: {
                padding: theme.spacing(4, 2, 5, 6),
                overflow: 'auto'
            },
            [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(4, 2, 5, 7),
                overflow: 'auto'
            },
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
        confirmButtons: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        paper: {
            position: 'absolute',
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3, 2),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        buttonBack: {
            display: 'flex',
            justifyContent: 'start',
            margin: theme.spacing(2, 0, 3, 0),
            maxWidth: theme.spacing(11),
        },
        alert: {
            marginTop: theme.spacing(6),
            width: '90vw',
        },
        stepper: {
            width: '90vw',
        }

    }),
);