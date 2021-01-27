import { grey } from '@material-ui/core/colors';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


export const useAvatarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: "column",
        },
        large: {
            width: theme.spacing(20),
            height: theme.spacing(20),
        },
        profileButtons: {
            display: 'flex',
            justifyContent: 'space-evenly'
        }
    }
    ),
);