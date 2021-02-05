import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


export const useSignUpStyles = makeStyles((theme: Theme) =>
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
            marginTop: theme.spacing(2)
        },
    }));