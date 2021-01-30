import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


export const useSignUpStyles = makeStyles((theme: Theme) =>
    createStyles({
        textfield: {
            width: '100%',
            margin: '1vw 0'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        loginButton: {
            margin: theme.spacing(3)
        },
    }));