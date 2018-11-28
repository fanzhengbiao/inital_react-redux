import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Home from 'Modules/Home';
import { Button } from 'antd';


class HomeView extends Component {

  saveRef = (name) => {
    return node => {
      this[name] = node;
    };
  }

  getHomeView = (props) => {
    return <Home {...props}/>
  }

  render() {
    return (
      <div className = 'App'>
        <header className="App-header">
          <Route path="/" ref={this.saveRef('nav-bar')} component={this.getHomeView} />
          <div className = 'content'>
            <Button type="primary">Button</Button>
            <Route exact path="/add" component={this.getHomeView}/>
            <Route exact path="/update/:param" component={this.getHomeView}/>
          </div>
        </header>
      </div>
    );
  }
}

export default HomeView;
