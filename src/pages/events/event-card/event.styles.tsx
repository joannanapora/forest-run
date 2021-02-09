import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useEventStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 415,
            minWidth: 300
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            fontSize: 17,
        },
        alertContainer: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        counter: {
            marginLeft: theme.spacing(2),
        }
    }),
);
