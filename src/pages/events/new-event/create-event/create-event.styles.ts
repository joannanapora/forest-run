import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useCardEditStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            marginTop: theme.spacing(2),
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(4, 30, 5, 0),
                overflow: 'auto'
            },
            [theme.breakpoints.up("md")]: {
                padding: theme.spacing(5, 2, 5, 0),
                overflow: 'auto'
            },
            [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(5, 2, 5, 0),
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
            width: 300,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },

    }),
);