
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useMeetingPointDetails = makeStyles((theme: Theme) =>
    createStyles({
        meetingPoint: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
        }
    }),
);