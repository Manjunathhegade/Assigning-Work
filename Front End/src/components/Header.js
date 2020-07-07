import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import CreateUser from "./CreateUser";
import Exercises from "./Exercises";
import Home from "./Home";
import Assign from "./assign";
import ViewWork from "./viewAssignedWork";
import ViewExerices from "./ViewExerices";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(1),
    color: "#fff",
    textDecoration: "none",
    fontSize: 18
  }
}));

export default function Header() {
  const classes = useStyles();
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" />
            <ul>
              <NavLink
                to="/"
                className={classes.menuButton} style={{ textDecoration: "none" }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "#fff"
                }}
              >
                Home
              </NavLink>
            </ul>
            <ul>
              <NavLink to="/CreateUser" className={classes.menuButton} >
                Add User
              </NavLink>
            </ul>
            <ul>
              <NavLink to="/Exercises" className={classes.menuButton} >
                Exercises
              </NavLink>
            </ul>
            <ul>
              <NavLink to="/ViewExerices" className={classes.menuButton}>
                View Exercises
              </NavLink>
            </ul>
          </Toolbar>
        </AppBar>
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/CreateUser/:id">
          <CreateUser />
        </Route>
        <Route path="/CreateUser">
          <CreateUser />
        </Route>
        <Route path="/Exercises">
          <Exercises />
        </Route>
        <Route path="/Exercises/:id">
          <Exercises />
        </Route>
        <Route path="/ViewExerices">
          <ViewExerices />
        </Route>
        <Route path="/assign/:id">
          <Assign />
        </Route>
        <Route path="/viewAssignWork/:id">
          <ViewWork />
        </Route>
      </Switch>
    </Router>
  );
}
