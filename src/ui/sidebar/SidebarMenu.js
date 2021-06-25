import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import { Link } from "react-router-dom";

import routes from "../../shared/routes/AdminRoutes";
const useStyles = makeStyles((theme) => ({
  menuLink: {
    display: "flex",
    textDecoration: "none",
  },
}));

const SidebarMenu = () => {
  const userObj = useSelector(selectUser);
  const classes = useStyles();
  return (
    <>
      <List>
        {Array.isArray(routes) &&
          userObj &&
          routes.map(
            (route, index) =>
              (route.accessTo == "all" || route.accessTo == userObj.role) && (
                <ListItem button key={route.title + index}>
                  <Link
                    to={`/secured${route.path}`}
                    className={classes.menuLink}
                  >
                    <ListItemIcon>{route.icon}</ListItemIcon>
                    <ListItemText primary={route.title} />
                  </Link>
                </ListItem>
              )
          )}
      </List>
    </>
  );
};

export default SidebarMenu;
