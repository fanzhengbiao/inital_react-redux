import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { array } from 'prop-types';
import { Route } from "react-router-dom";
import zh_cn from 'Styles/Js/localMessage';
import Map from './Map';
import SliceBoxOne from './SliceBox/SliceBoxOne';
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
    default_select_key:  [],
    default_open_key: []
  };

  constructor(props) {
    super(props);
    this.default_value = {
      select_key: this._getStorageSelectKey().select_key,
      open_key: this._getStorageSelectKey().open_key
    };
  }

  _getStorageSelectKey = () => {
    const storage_key = sessionStorage.getItem('slice_session_key');
    if (!storage_key || storage_key === null) {
      return {
        select_key: [`${zh_cn.leftMenus.SubMenu[DEFAULT_MENUS_KEYS[0]].key}_1`],
        open_key: [zh_cn.leftMenus.SubMenu[DEFAULT_MENUS_KEYS[0]].key]
      };
    } else {
      return JSON.parse(storage_key);
    }
  }

  _changeLocalRouter = (child, open_key) => {
    const { url } = this.props.match;
    sessionStorage.setItem('slice_session_key', JSON.stringify({
      select_key: [child.key],
      open_key: [open_key]
    }));
    this.props.history.replace(`${url}${child.route}`);
  }

  _renderSubMenu = () => {
    const subMenus = zh_cn.leftMenus.SubMenu;
    return DEFAULT_MENUS_KEYS.map(menu_key => {
      const childre_tmp = subMenus[menu_key];
      const childrenItem = childre_tmp.children && childre_tmp.children.map(child => {
        return (
          <Menu.Item key={child.key} onClick={() => this._changeLocalRouter(child, menu_key)}>
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
          defaultSelectedKeys={this.default_value.select_key}
          defaultOpenKeys={this.default_value.open_key}
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
        <Route exact path={`${url}/slicebox`} component={SliceBoxOne}/>
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
