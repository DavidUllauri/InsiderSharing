import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';

import CompanyState from './context/company/CompanyState';
import './App.css';

const App = () => {
  return (
    <CompanyState>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </Fragment>
      </Router>
    </CompanyState>
  );
};

export default App;
