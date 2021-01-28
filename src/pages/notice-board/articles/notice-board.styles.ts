import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useNoticeBoardStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(10),
            marginLeft: theme.spacing(3),

        },
        container: {
            height: '100%',
        },
        root: {
            transform: 'translateZ(0px)',
            flexGrow: 1,
            display: 'flex'
        },
        keywordsList: {
            display: 'flex',
            justifyContent: 'space-evenly'
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
            padding: theme.spacing(2, 4, 5),
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3, 5),
        },
        speedDial: {
            padding: theme.spacing(2, 4, 3),
            position: 'fixed',
            bottom: theme.spacing(22),
            right: '0',
            height: '100px'
        },
        scrollArea: {
            paddingTop: theme.spacing(5),
            height: '100%',
            overflow: 'auto'
        }
    }));
