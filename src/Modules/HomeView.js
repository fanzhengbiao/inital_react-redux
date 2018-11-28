import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import Home from 'Modules/Home';
import { Layout } from 'antd';
import NavBarComponent from 'Modules/Component/NavBarComponent';
const { Footer } = Layout;


class HomeView extends Component {

  saveRef = (name) => {
    return node => {
      this[name] = node;
    };
  }

  getHomeView = (props) => {
    return <Home {...props}/>
  }

  _renderFooter = () => {
    return (
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    )
  }

  render() {
    return (
      <div className = 'lj_demo'>
        <Layout>
          <Route path="/" ref={this.saveRef('nav-bar')} component={NavBarComponent} />
          <div className = 'lj_demo_content'>
            <Route path="/" exact render={()=> <Redirect to='/home' /> } />
            <Route path="/home" component={this.getHomeView}/>
          </div>
          {this._renderFooter()}
        </Layout>
      </div>
    );
  }
}

export default HomeView;
