
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useEventListStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        control: {
        },
        rootfilters: {
            display: 'flex',
            padding: theme.spacing(1, 0, 2, 2),
        },
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        paper: {
        },
        svg: {
        },
        button: {
        },
        eventListPage: {
            padding: theme.spacing(8, 28, 5, 0),
            height: '100%',
            overflow: 'auto',
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(8, 28, 5, 0),
            },
        }
    }),
);