import { Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      React App
      <Switch>
        <Route path="/auth" component={AuthPage} />
      </Switch>
    </div>
  );
};

export default App;
