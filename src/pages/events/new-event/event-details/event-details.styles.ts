import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


export const usePersonalStyles = makeStyles((theme: Theme) =>
    createStyles({
        favselects: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },

        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);