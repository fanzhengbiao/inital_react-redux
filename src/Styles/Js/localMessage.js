const zh_cn = {
  map: {
    placeholder: '搜地点，搜公交'
  },
  header: {
    title: [
      { key: '1', text: '功能集合'},
      { key: '2', text: '其他功能'},
      { key: '3', text: '你来扩展'}
    ]
  },
  leftMenus: {
    SubMenu: {
      nav_1: {
        key: 'nav_1',
        text: '樊正彪',
        type: 'user',
        children: [
          { key: 'nav_1_1', text: 'MapComponent', route: '/map'},
          { key: 'nav_1_2', text: 'SliceBox3D', route: '/slicebox'},
          { key: 'nav_1_3', text: 'Antd-Table', route: '/antdTable'},
          { key: 'nav_1_4', text: 'StyleComponent', route: '/styleComponent'},
          { key: 'nav_1_5', text: 'chart', route: '/chart'}
        ]
      },
      nav_2: {
        key: 'nav_2',
        text: '图标',
        type: 'laptop',
        children: [
          { key: 'nav_2_1', text: 'option5', route: '/progress'},
          { key: 'nav_2_2', text: 'option6', route: '/test1'},
          { key: 'nav_2_3', text: 'option7', route: '/test2'},
          { key: 'nav_2_4', text: 'option8', route: '/test3'}
        ]
      },
      nav_3: {
        key: 'nav_3',
        text: '其他',
        type: 'notification',
        children: [
          { key: 'nav_3_1', text: '工资计算', route: '/wages'},
          { key: 'nav_3_2', text: 'option10', route: '/test5'}
        ]
      }
    }
  }
}

export default zh_cn;