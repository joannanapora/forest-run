import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useCardEditStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            padding: theme.spacing(5),
            height: '100%',
            marginTop: theme.spacing(2),
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
    }),
);