import { Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SkinfluencersPage from "./pages/SkinfluencersPage";
import CreateThreadPage from "./pages/forum/CreateThreadPage";
import ForumFeedPage from "./pages/forum/ForumFeedPage";
import ThreadDetailPage from "./pages/forum/ThreadDetailPage";
import PostDetailPage from "./pages/blog/PostDetailPage";
import Header from "./components/Header";
import BlogFeedPage from "./pages/blog/BlogFeedPage";

const App = () => {
  return (
    <div>
      <Header />
      React App
      <Switch>
        <Route exact path="/auth" component={AuthPage} />
        <Route exact path="/skinfluencers" component={SkinfluencersPage} />
        <Route exact path="/blog" component={BlogFeedPage} />
        <Route exact path="/blog/post/:id" component={PostDetailPage} />
        <Route exact path="/forum" component={ForumFeedPage} />
        <Route exact path="/forum/thread/:id" component={ThreadDetailPage} />
        <Route exact path="/forum/create-thread" component={CreateThreadPage} />
      </Switch>
    </div>
  );
};

export default App;

// TODO: Create protected (check login) route for /forum/create-thread
