import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import BlogPage from "./pages/blog/BlogPage";
import CreatePostPage from "./pages/blog/CreatePostPage";

const App = () => {
  return (
    <div className="App">
      admin app
      <Switch>
        <Route exact path="/blog" component={BlogPage} />
        <Route exact path="/blog/create-post" component={CreatePostPage} />
      </Switch>
    </div>
  );
};

export default App;
