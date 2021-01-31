import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useCreatePostStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(5, 35, 0, 3),
            minWidth: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: theme.spacing(5),
        },
        button: {
            margin: theme.spacing(3),
        },
        paper: {
            position: 'absolute',
            width: 300,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        confirmButtons: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        buttonBack: {
            display: 'flex',
            justifyContent: 'start',
            margin: theme.spacing(0, 0, 5, 0),
            maxWidth: theme.spacing(11),
        },
        quill: {
            height: '100%',
            maxHeight: '30vh',
            overflow: 'auto'
        },
        postDetails: {
            display: 'flex',
            width: '100%',
            [theme.breakpoints.down("sm")]: {
                flexDirection: 'column',
                justifyContent: 'center'
            },
            justifyContent: 'space-evenly',
        },
        postTextFields: {
            display: 'flex',
            paddingBottom: theme.spacing(2),
            width: '100%',
            [theme.breakpoints.down("sm")]: {
                width: '100%',
                height: '100%',
                overflow: 'auto',
            }, [theme.breakpoints.down("md")]: {
                minWidth: 230,
                maxWidth: 230,
                display: 'flex',
                alignSelf: 'center',
                height: '100%',
                overflow: 'auto',
            },
            [theme.breakpoints.down("lg")]: {
                minWidth: 230,
                maxWidth: 230,
            },
        },
        chipRoot: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: theme.spacing(0.5),
            margin: 0,
        },
        chip: {
            margin: theme.spacing(0.5),
        },
    }));