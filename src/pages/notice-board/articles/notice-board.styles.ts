import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useNoticeBoardStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            margin: theme.spacing(3),

        },
        container: {
            height: '100%',
            display: 'flex',
            flexDirection: 'row'
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
            width: '100%',
            [theme.breakpoints.down("sm")]: {
                paddingBottom: theme.spacing(6),
                margin: 0
            },
            [theme.breakpoints.up("md")]: {
                padding: theme.spacing(4, 2, 5, 3),
            },
            [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(4, 2, 5, 3),
            },
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3, 5),
        },
        speedDial: {
            height: '100%',
            padding: theme.spacing(7),
            paddingRight: theme.spacing(0),
            paddingLeft: theme.spacing(3),
        },
        scrollArea: {
            paddingTop: theme.spacing(5),
            height: '100%',
            overflow: 'auto'
        }
    }));
