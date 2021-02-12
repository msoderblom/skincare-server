import { Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CreateThreadPage from "./pages/forum/CreateThreadPage";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      React App
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route path="/forum/create-thread" component={CreateThreadPage} />
      </Switch>
    </div>
  );
};

export default App;
