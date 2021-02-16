import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        wrapper: {
            margin: theme.spacing(2),
            position: 'relative',
            display: 'flex',
            justifyContent: 'center'
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '60%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    }),
);

const SpinnerButton = ({ buttonLabel, onClick, loading, ...props }) => {
    const classes = useStyles();
    const timer = React.useRef<number>();

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);


    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                {<Button
                    {...props}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={onClick}
                >
                    {buttonLabel}
                </Button>}
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </div>
    );
};

export default SpinnerButton;