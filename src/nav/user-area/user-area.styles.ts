import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


export const useUserAreaStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: "column",
        },
        large: {
            width: theme.spacing(18),
            height: theme.spacing(18),
        },
        textField: {
            width: '25ch',
        },
        alertContainer: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        usernameButton: {
            margin: theme.spacing(2, 0, 2, 0),
        }

    }
    ),
);