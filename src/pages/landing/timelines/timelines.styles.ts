import { makeStyles } from '@material-ui/core/styles';


export const useTimeLinesStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    padding: theme.spacing(8, 30, 0, 0)

  },
  paper: {
    padding: theme.spacing(1)
  },
}));