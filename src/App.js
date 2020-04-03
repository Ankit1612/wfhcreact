import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './Footer';
import Welcome from './Welcome';
import Challenge from './Challenge';
import createHistory from "history/createBrowserHistory";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import ShareUrl from './ShareUrl';
import User from './User';
import Accept from './Accept';
export const history = createHistory();

function App() {

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path={"/"} component={Welcome} />
            <Route path={"/challenge"} component={Challenge} />
            <Route path="/profile/:username" component={ShareUrl} />
                        <Route path="/accept" component={Accept} />

            <Route path="/:uniquecode" component={User} />
            <Route path="/accept" component={Accept} />
          </Switch>
        </div>
        <div className="Footer">
         <Footer />
        </div>
      </BrowserRouter>
    );
  }

export default App;