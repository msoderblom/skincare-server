import { Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

const App = () => {
  return (
    <div>
      React App
      <Switch>
        <Route path="/auth" component={AuthPage} />
      </Switch>
    </div>
  );
};

export default App;
