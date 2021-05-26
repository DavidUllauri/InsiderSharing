import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Owner from './components/pages/Owner';
import Transactions from './components/pages/Transactions';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';

import TransactionsState from './context/transactions/TransactionsState';
import CompanyState from './context/company/CompanyState';
import OwnerState from './context/owner/OwnerState';
import AuthState from './context/auth/AuthState';
import ProfileState from './context/profile/ProfileState';
import './App.css';

const App = () => {
  return (
    <AuthState>
      <ProfileState>
        <CompanyState>
          <OwnerState>
            <TransactionsState>
              <Router>
                <Fragment>
                  <Navbar />
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/:ticker' component={Owner} />
                    <Route path='/:ticker/:filing_id' component={Transactions} />
                  </Switch>
                </Fragment>
              </Router>
            </TransactionsState>
          </OwnerState>
        </CompanyState>
      </ProfileState>
    </AuthState>
  );
};

export default App;
