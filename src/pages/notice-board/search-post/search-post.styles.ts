import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';


export const useSearchPostStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(2), marginLeft: theme.spacing(2)
        },
        button: {
            marginLeft: theme.spacing(3)
        },
        textfield: {
            minWidth: theme.spacing(25)
        },
    }),
);
