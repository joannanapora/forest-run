import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useNoticeBoardStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            margin: theme.spacing(3),
            minHeight: 300,
        },
        container: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(1, 30, 3, 0),
            },
            [theme.breakpoints.up("md")]: {
                padding: theme.spacing(1, 30, 3, 0),
            },
            [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(1, 30, 3, 0),
            },
        },
        keywordsList: {
            display: 'flex',
            justifyContent: 'space-evenly',

            [theme.breakpoints.down("sm")]: {
                flexDirection: 'column'
            },
        },
        keywords: {
            display: 'flex',
            flexDirection: 'row',
            fontSize: 20,
            padding: theme.spacing(1),
        },
        media: {
            height: 160,
        },
        articles: {
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3, 5),
        },
        speedDial: {
            padding: theme.spacing(6, 0, 2, 2),
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(6, 0, 0, 2),
            },
            [theme.breakpoints.up("md")]: {
                padding: theme.spacing(6, 0, 0, 2),
            },
        },
        scrollArea: {
            paddingTop: theme.spacing(1),
            height: '100%',
            overflow: 'auto'
        },
        noResults: {
            marginLeft: theme.spacing(7),
        }
    }));
