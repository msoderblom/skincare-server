import React from "react";
import * as S from "./styled";
import { Toolbar, List, Drawer, ListItem, Divider } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem style={{ fontWeight: "bold" }}>Blog</ListItem>
          <ListItem>
            <NavLink
              to="/blog"
              exact
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              All Posts
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              exact
              to="/blog/create-post"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              Create Post
            </NavLink>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem style={{ fontWeight: "bold" }}>Skinfluencers</ListItem>
          <ListItem>
            <NavLink
              to="/skinfluencers"
              exact
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              All Skinfluencers
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              exact
              to="/skinfluencers/create"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              Create Skinfluencer
            </NavLink>
          </ListItem>
        </List>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
