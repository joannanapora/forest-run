
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useMeetingPointDetails = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',

            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                minWidth: 150,
                maxWidth: 300,
            },
        },
        multilineInput: {
            maxHeight: 100,
            overflow: 'auto'
        }
    }),
);