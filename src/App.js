import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AppContainer from "./AppContainer";
import "./App.scss";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <Router>
      <Switch>
        <AppContainer path="/" />
      </Switch>
    </Router>
  );
}

export default App;
