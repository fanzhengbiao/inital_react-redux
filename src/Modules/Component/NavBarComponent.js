import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import zh_cn from 'Styles/Js/localMessage';
const { Header } = Layout;


export default class NavBarComponent extends Component {
  state = {
    current: '1'
  }

  toggle = (key) => {
    this.setState({
      current: key,
    });
  }

  _renderMenuItem = () => {
    const items = zh_cn.header.title;
    return items && items.map(item => {
      return (
        <Menu.Item
          key={item.key}
          onClick={() => this.toggle(item.key)}
        >
          {item.text}
        </Menu.Item>
      );
    })
  }

  render() {
    return (
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          className='header_menu'
          defaultSelectedKeys={[this.state.current]}
        >
          {this._renderMenuItem()}
        </Menu>
      </Header>
    );
  }
}