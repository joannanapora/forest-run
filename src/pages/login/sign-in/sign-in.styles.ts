import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useSignInStyles = makeStyles((theme: Theme) =>
    createStyles({
        textfield: {
            width: '100%',
            margin: theme.spacing(0.5),

        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        loginButton: {
            marginTop: theme.spacing(2),
        },
        alert: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
        alertContainer: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    }));