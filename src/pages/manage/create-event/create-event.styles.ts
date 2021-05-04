import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useCreateEventStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      marginTop: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3, 30, 5, 6),
        overflow: "auto",
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(4, 2, 5, 6),
        overflow: "auto",
      },
      [theme.breakpoints.up("lg")]: {
        padding: theme.spacing(4, 70, 0, 70),
        overflow: "auto",
      },
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
      width: "50vw",
    },
    resetContainer: {
      paddingLeft: theme.spacing(2),
      width: "50vw",
    },
    confirmButtons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    paper: {
      position: "absolute",
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3, 4),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      background: "#fff",
    },
    buttonBack: {
      display: "flex",
      justifyContent: "start",
      margin: theme.spacing(5, 0, 1, 0),
      maxWidth: theme.spacing(13),
    },
    alert: {
      marginTop: theme.spacing(4),
      width: "45vw",
      paddingBottom: theme.spacing(4),
    },
    stepper: {
      width: "50vw",
    },
  })
);
