import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useCreatePostStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
            minWidth: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
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
            padding: theme.spacing(2, 4, 3),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        confirmButtons: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
    }));