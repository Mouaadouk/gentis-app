import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  AppBar: {
    backgroundColor: "#D25F2C",
  },
}));
function Header() {
  const history = useHistory();
  const classes = useStyles();
  return (
    <AppBar className={classes.AppBar} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Pokemon App
        </Typography>
        <IconButton onClick={() => history.push("/")}>
          <HomeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
