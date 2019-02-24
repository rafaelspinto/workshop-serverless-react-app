import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Centered from './components/Centered';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Centered>
          <Route exact path="/" component={ContactForm} />
          <Route exact path="/contacts" component={ContactList} />
        </Centered>
      </Router>
    );
  }
}