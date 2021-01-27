
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useEventListStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: '5rem',
            height: '100%',
            overflow: 'auto',
            padding: theme.spacing(8),
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);