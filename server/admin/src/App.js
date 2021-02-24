import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import BlogPage from "./pages/blog/BlogPage";
import CreatePostPage from "./pages/blog/CreatePostPage";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar/Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // paddingLeft: drawerWidth + 30,
    paddingTop: 70,
  },
}));
const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <main className={classes.content}>
        <Switch>
          <Route exact path="/blog" component={BlogPage} />
          <Route exact path="/blog/create-post" component={CreatePostPage} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
