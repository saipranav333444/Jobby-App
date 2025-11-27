import { Switch, Route, BrowserRouter } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import JobsItemDetails from "./components/JobItemDetails";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobsItemDetails} />
    </Switch>
  </BrowserRouter>
);

export default App;
