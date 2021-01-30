import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useUploadStyles = makeStyles((theme: Theme) =>
    createStyles({
        upload: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        successUpload: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        image: {
            padding: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 150,
            maxWidth: 300,
        },
    }));
