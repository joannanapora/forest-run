import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useCreatePostStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(8, 31, 0, 1),
            },
            [theme.breakpoints.down("md")]: {
                padding: theme.spacing(8, 31, 0, 1),
            },
            padding: theme.spacing(13, 35, 0, 5),
            minWidth: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
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
            justifyContent: 'center',
            maxWidth: theme.spacing(12),
            marginBottom: theme.spacing(3),
            [theme.breakpoints.down("md")]: {
                marginBottom: theme.spacing(1),
            },
        },
        quill: {
            height: '100%',
            maxHeight: '30vh',
            overflow: 'auto'
        },
        postDetails: {
            [theme.breakpoints.down("sm")]: {
                display: 'flex',
                flexDirection: 'column',
                margin: theme.spacing(0, 0, 2, 3)
            },
            [theme.breakpoints.down("md")]: {
                display: 'flex',
                flexDirection: 'column'
            },
            display: 'flex',
            justifyContent: 'space-evenly',
            margin: theme.spacing(2, 0, 5, 4)
        },
        postTextFields: {
            paddingBottom: theme.spacing(1),
            [theme.breakpoints.down("sm")]: {
                display: 'flex',
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
        alert: {
            marginTop: theme.spacing(8)
        },
        upload: {
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            justifySelf: 'center',
            [theme.breakpoints.down("sm")]: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%'
            },
            [theme.breakpoints.down("md")]: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%'
            },
            marginTop: theme.spacing(1)

        },
        image: {
            padding: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(2),
            minWidth: 150,
            maxWidth: 300,
        },
    }));