import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';


export const useSearchPostStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: theme.spacing(3),
        },
        button: {
            margin: theme.spacing(2),
        },
    }),
);
