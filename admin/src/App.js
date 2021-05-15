import React, { useEffect } from "react";
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
import ResellerDetailPage from "./pages/k-beauty/ResellerDetailPage";
import BrandDetailPage from "./pages/k-beauty/BrandDetailPage";
import BrandsPage from "./pages/k-beauty/BrandsPage";
import CreateResellerPage from "./pages/k-beauty/CreateResellerPage";
import CreateBrandPage from "./pages/k-beauty/CreateBrandPage";
import SkinfluencerDetailPage from "./pages/skinfluencers/SkinfluencerDetailPage/SkinfluencerDetailPage";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { decode } from "jsonwebtoken";
import { adminTypes } from "./redux/admin";
// import Notification from "./components/Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // paddingLeft: drawerWidth + 30,
    paddingTop: 80,
  },
}));
const App = () => {
  const classes = useStyles();
  const { admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch({ type: adminTypes.SIGN_OUT });
  };
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const token = profile?.token;
    if (token) {
      const decodedToken = decode(token);
      // Check if the users token has expired, if true then logout will
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        signOut();
      }

      if (profile.admin) {
        dispatch({
          type: adminTypes.SET_ADMIN,
          payload: profile.admin,
        });
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      {admin && (
        <>
          <Header /> <Sidebar />
        </>
      )}

      <main className={classes.content}>
        {/* <Notification notify={notify} setNotify={setNotify} /> */}
        <Switch>
          <Route exact path="/" component={SignInPage} />
          <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
          <ProtectedRoute exact path="/users" component={UsersPage} />
          <ProtectedRoute
            exact
            path="/skinfluencers"
            component={SkinfluencersPage}
          />
          <ProtectedRoute
            exact
            path="/skinfluencers/create"
            component={CreateSkinfluencerPage}
          />
          <ProtectedRoute
            exact
            path="/skinfluencers/:id"
            component={SkinfluencerDetailPage}
          />
          <ProtectedRoute
            exact
            path="/skinfluencers/:id/edit"
            render={(props) => <SkinfluencerDetailPage {...props} edit />}
          />
          <ProtectedRoute
            exact
            path="/k-beauty/resellers"
            component={ResellersPage}
          />
          <ProtectedRoute
            exact
            path="/k-beauty/resellers/create"
            component={CreateResellerPage}
          />
          <ProtectedRoute
            exact
            path="/k-beauty/resellers/:id/edit"
            render={(props) => <ResellerDetailPage {...props} edit />}
          />
          <ProtectedRoute
            exact
            path="/k-beauty/resellers/:id"
            component={ResellerDetailPage}
          />
          <ProtectedRoute
            exact
            path="/k-beauty/brands/:id/edit"
            render={(props) => <BrandDetailPage {...props} edit />}
          />
          <ProtectedRoute
            exact
            path="/k-beauty/brands/:id"
            component={BrandDetailPage}
          />
          <ProtectedRoute
            exact
            path="/k-beauty/brands/create"
            component={CreateBrandPage}
          />
          <ProtectedRoute
            exact
            path="/k-beauty/brands"
            component={BrandsPage}
          />
          <ProtectedRoute exact path="/blog" component={BlogPage} />
          <ProtectedRoute
            exact
            path="/blog/create-post"
            component={CreatePostPage}
          />
          <ProtectedRoute exact path="/forum" component={ForumPage} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
