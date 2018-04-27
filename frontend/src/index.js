import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import Companies from './companies.js';

import EntryForm from './entry_form.js';
import Entries from './entries.js';

const Footer = (props) => {
  return (
    <div id="myfooter">
    <br/>
    <hr/>
      <footer>
        <p>Nathan Hull, CIS658 Final, 2018</p>
        <p>Student Interview Expense Logger</p>
      </footer>
    </div>
  );
}


ReactDOM.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/companies/:id/entries/create" component={EntryForm} />
        <Route path="/companies/:id/entries/:pid" component={EntryForm} />
        <Route path="/companies/:id/entries" component={Entries} />
        <Route path="/companies" component={Companies} />
        <Route path="/" component={Companies} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
, document.getElementById('root'));

registerServiceWorker();
