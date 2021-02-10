import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useDeletePostStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: theme.spacing(7, 35, 0, 3),
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(7, 30, 0, 1),
            },
        },
        button: {
            margin: theme.spacing(2),
        },
        paper: {
            position: 'absolute',
            width: 300,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(3, 3, 2, 3),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        confirmButtons: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: theme.spacing(2),
        },
        buttonBack: {
            display: 'flex',
            justifyContent: 'start',
            margin: theme.spacing(3, 0, 5, 0),
            maxWidth: theme.spacing(11),
        },
        checkboxes: {
            height: '',
            overflow: 'auto',
            [theme.breakpoints.down("lg")]: {
                padding: theme.spacing(2, 0, 3, 1),
            },
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(0, 0, 2, 0),
            },

        },
        articlesFormLabel: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly'
        },
        date: {
            marginRight: theme.spacing(4),
            marginLeft: theme.spacing(4),
            [theme.breakpoints.down("sm")]: {
                marginRight: theme.spacing(1),
                marginLeft: theme.spacing(1),
            }
        },
        alert: {
            marginTop: theme.spacing(8),
        }
    }));