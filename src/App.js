import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './views/Login';
import FormTask from './views/FormTask';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/form" exact>
            <FormTask />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
