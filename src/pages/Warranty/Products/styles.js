import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  mainContainer: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignItems: "baseline",
    marginInline: "auto",
    maxWidth: 1400,
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },

  products_count: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },

  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  [theme.breakpoints.down("sm")]: {
    appBar: {
      padding: "10px 20px",
    },
    heading: {
      display: "none",
    },
    userName: {
      display: "none",
    },
    image: {
      marginLeft: "5px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "flex-end",
      width: "160px",
    },
  },

  actionDiv: {
    textAlign: "center",
  },
}));
