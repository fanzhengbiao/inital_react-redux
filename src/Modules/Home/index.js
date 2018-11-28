import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { array } from 'prop-types';
import { Route } from "react-router-dom";
import zh_cn from 'Styles/Js/localMessage';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const DEFAULT_MENUS_KEYS = Object.keys(zh_cn.leftMenus.SubMenu);



class Home extends Component {
  static propTypes = {
    default_select_key: array,
    default_open_key: array
  };
  static defaultProps = {
    default_select_key:  [`${zh_cn.leftMenus.SubMenu[DEFAULT_MENUS_KEYS[0]].key}_1`],
    default_open_key: [zh_cn.leftMenus.SubMenu[DEFAULT_MENUS_KEYS[0]].key]
  };

  _renderSubMenu = () => {
    const subMenus = zh_cn.leftMenus.SubMenu;
    return DEFAULT_MENUS_KEYS.map(menu_key => {
      const childre_tmp = subMenus[menu_key];
      const childrenItem = childre_tmp.children && childre_tmp.children.map(child => {
        return (
          <Menu.Item key={child.key}>
            {child.text}
          </Menu.Item>
        )
      });

      return (
        <SubMenu key={childre_tmp.key} title={<span><Icon type={childre_tmp.type} />{childre_tmp.text}</span>}>
          {childrenItem}
        </SubMenu>
      )
    })
  }

  _renderSider = () => {
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={this.props.default_select_key}
          defaultOpenKeys={this.props.default_open_key}
          style={{ height: '100%' }}
        >
          {this._renderSubMenu()}
        </Menu>
      </Sider>
    )
  }

  _renderContent = () => {
    return (
      <Content style={{ padding: '0 24px', minHeight: 600 }}>
        <Route exact path="/map" component={this._getHomeView}/>
        <Route exact path="/chart" component={this._getHomeView}/>
        <Route exact path="/progress" component={this._getHomeView}/>
        <Route exact path="/countdown" component={this._getHomeView}/>
      </Content>
    )
  }

  render() {
    console.log('====', this.props)
    return (
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          {this._renderSider()}
          {this._renderContent()}
        </Layout>
      </Content>
    );
  }
}

export default Home;
