import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import BlogPage from "./pages/BlogPage";

const App = () => {
  return (
    <div className="App">
      admin app
      <Switch>
        <Route exact path="/blog" component={BlogPage} />
      </Switch>
    </div>
  );
};

export default App;
