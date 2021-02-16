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
            width: theme.spacing(14),
            height: theme.spacing(14),
        },
        textField: {
            width: '25ch',
        },
        alert: {
            marginBottom: theme.spacing(1),
        },
        usernameButton: {
            margin: theme.spacing(2, 0, 2, 0),
        }
    }
    ),
);