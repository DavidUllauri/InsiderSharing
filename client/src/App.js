import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Owner from './components/pages/Owner';
import Transactions from './components/pages/Transactions';

import CompanyState from './context/company/CompanyState';
import OwnerState from './context/owner/OwnerState';
import TransactionsState from './context/transactions/TransactionsState';
import './App.css';

const App = () => {
  return (
    <CompanyState>
      <OwnerState>
        <TransactionsState>
          <Router>
            <Fragment>
              <Navbar />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/:ticker' component={Owner} />
                <Route path='/:ticker/:filing_id' component={Transactions} />
              </Switch>
            </Fragment>
          </Router>
        </TransactionsState>
      </OwnerState>
    </CompanyState>
  );
};

export default App;
