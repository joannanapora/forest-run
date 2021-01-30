
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useEventListStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: '5rem',
            height: '100%',
            overflow: 'auto',
            padding: theme.spacing(6),
        },
        control: {
            padding: theme.spacing(2),
        },
        rootfiltersOn: {
            height: 140,
            marginLeft: 0
        },
        rootfiltersOff: {
            height: 50,
            marginLeft: 0
        },
        container: {
            display: 'flex',
        },
        paper: {
            margin: theme.spacing(1),
            width: 300,
        },
        svg: {
            width: '100%',
            height: 100,
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);