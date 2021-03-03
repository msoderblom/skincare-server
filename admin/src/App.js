import React from "react";
import { Switch, Route } from "react-router-dom";
import BlogPage from "./pages/blog/BlogPage";
import UsersPage from "./pages/users/UsersPage";
import CreatePostPage from "./pages/blog/CreatePostPage";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import SkinfluencersPage from "./pages/skinfluencers/SkinfluencersPage/SkinfluencersPage";
import CreateSkinfluencerPage from "./pages/skinfluencers/CreateSkinfluencerPage";
import ForumPage from "./pages/forum/ForumPage";
import ResellersPage from "./pages/k-beauty/ResellersPage";
import BrandsPage from "./pages/k-beauty/BrandsPage";
import CreateResellerPage from "./pages/k-beauty/CreateResellerPage";
import CreateBrandPage from "./pages/k-beauty/CreateBrandPage";
// import Notification from "./components/Notification";

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
        {/* <Notification notify={notify} setNotify={setNotify} /> */}
        <Switch>
          <Route exact path="/users" component={UsersPage} />
          <Route exact path="/skinfluencers" component={SkinfluencersPage} />
          <Route
            exact
            path="/skinfluencers/create"
            component={CreateSkinfluencerPage}
          />
          <Route exact path="/k-beauty/resellers" component={ResellersPage} />
          <Route
            exact
            path="/k-beauty/resellers/create"
            component={CreateResellerPage}
          />
          <Route
            exact
            path="/k-beauty/brands/create"
            component={CreateBrandPage}
          />
          <Route exact path="/k-beauty/brands" component={BrandsPage} />
          <Route exact path="/blog" component={BlogPage} />
          <Route exact path="/blog/create-post" component={CreatePostPage} />
          <Route exact path="/forum" component={ForumPage} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
