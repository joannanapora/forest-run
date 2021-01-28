import { makeStyles } from '@material-ui/core/styles';


export const useDonateStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
        maxWidth: '350px',
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5rem'
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
});