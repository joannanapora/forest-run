import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useSpinnerStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
);