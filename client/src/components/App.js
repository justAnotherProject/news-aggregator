import React from 'react';
import NProgress from 'nprogress';

import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import Nav from './Nav';
import Footer from './Footer';

import Home from './Home';

export default class App extends React.Component {
  componentWillMount() {
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={Home} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
