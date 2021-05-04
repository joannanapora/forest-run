import { makeStyles } from "@material-ui/core/styles";

export const useTimeLinesStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    paddingTop: "8rem",
    paddingRight: "16rem",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));
