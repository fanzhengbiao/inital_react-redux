import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { array } from 'prop-types';
import { Route } from "react-router-dom";
import zh_cn from 'Styles/Js/localMessage';
import Map from './Map'
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const layout_count = { padding: '0 50px' };
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

  _changeLocalRouter = (route_path) => {
    const { url } = this.props.match;
    this.props.history.replace(`${url}${route_path}`);
  }

  _renderSubMenu = () => {
    const subMenus = zh_cn.leftMenus.SubMenu;
    return DEFAULT_MENUS_KEYS.map(menu_key => {
      const childre_tmp = subMenus[menu_key];
      const childrenItem = childre_tmp.children && childre_tmp.children.map(child => {
        return (
          <Menu.Item key={child.key} onClick={() => this._changeLocalRouter(child.route)}>
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
    const { url } = this.props.match;
    return (
      <Content>
        <Route exact path={`${url}/map`} component={Map}/>
        <Route exact path={`${url}/chart`} component={this._getHomeView}/>
        <Route exact path={`${url}/progress`} component={this._getHomeView}/>
        <Route exact path={`${url}/countdown`} component={this._getHomeView}/>
      </Content>
    )
  }

  render() {
    console.log('====', this.props)
    return (
      <Content style={{ layout_count }}>
        <Layout>
          {this._renderSider()}
          {this._renderContent()}
        </Layout>
      </Content>
    );
  }
}

export default Home;
