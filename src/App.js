import React, { Component } from "react";
import { AddUsers } from "./components/AddUsers";
import { Users } from "./components/Users";
import { Home } from "./components/Home";
import { Movies } from "./components/Movies";
import { Root } from "./components/Root";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { Welcome } from "./components/Welcome";
export const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path={"/"} component={Welcome} />
            <Route component={DefaultRoute} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function DefaultRoute() {
  return (
    <div>
      <Root />
      <Route path={"/home"} component={Home} />
      <Route path={"/movies"} component={Movies} />
      <Route path={"/users"} component={Users} />
      <Route path={"/addUsers"} component={AddUsers} />
    </div>
  );
}

export default App;
