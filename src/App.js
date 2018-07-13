import React, { Component } from 'react';
import routes from './routes';
import './App.css';
import { HashRouter } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          {routes}
        </HashRouter>
      </div>
    );
  }
}

export default App;
