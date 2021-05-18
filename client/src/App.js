import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Search from './components/search/Search';
import Company from './components/search/Company';

import './App.css';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Search />
      <Company />
    </Fragment>
  );
};

export default App;
