import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Link as RouterLink, withRouter } from "react-router-dom";
import Link from "@material-ui/core/Link";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  const currentPath = props.location.pathname;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Brand Service
          </Typography>
          {currentPath === "/" ? (
            <Link
              style={{ "padding-right": 50 }}
              color="inherit"
              component={RouterLink}
              to="/resources"
            >
              Go to Resources
            </Link>
          ) : (
            <Link
              style={{ paddingRight: 50 }}
              color="inherit"
              className="links"
              component={RouterLink}
              to="/"
            >
              Go to Users
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ButtonAppBar));
