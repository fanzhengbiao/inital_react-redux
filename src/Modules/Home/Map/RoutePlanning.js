import React from 'react'
import BMap from 'BMap'
import _ from 'lodash'
import classNames from 'classnames'
import appstrings from 'Strings/936/common'
import { object, array, string, func } from 'prop-types'
import { View, Modal, Image, Text, ScrollView, Icon } from 'thanos'

const DEFAULT_PLAN_NUMBER = 3;
const DEFAULT_PLAN_NUMBER_ARRAY = [0,1,2];
const SVG_IDS = ['bus', 'driving', 'walking'];
/**用来处理点击检索结果某一条，动态绘制地图 */
const PLAN_DEFAULT = SVG_IDS.reduce((rs, item) => {
  rs[item] = {
    number: 0, // 表示选中的是第一条检索记录
    data: {} // 存放所有的检索数据
  }
  return rs;
}, {});


class RoutePlanItem extends React.Component {
  static propTypes = {
    desc: array,
    dura: array,
    dist: array,
    current_key: string,
    drawLine: func
  };
  static defaultProps = {
    desc: [],
    dura: [],
    dist: [],
    current_key: 'bus',
    drawLine: () => {}
  };

  constructor(props) {
    super(props);
    const local_state = SVG_IDS.reduce((rs, x) => {
      const lol_tmp = DEFAULT_PLAN_NUMBER_ARRAY.reduce((rt, y) => {
        rt[`item_${y}`] = false;
        return rt;
      }, {})
      rs[x] = lol_tmp;
      return rs;
    }, {})

    this.state = {
      planItems: local_state
    }
  }

  saveRef = (name) => {
    return node => {
      this[name] = node;
    };
  }

  changePlansShow = (index) => {
    const _history = this.state.planItems[this.props.current_key][`item_${index}`]

    const _tmp_state = this.state.planItems;
    _tmp_state[this.props.current_key][`item_${index}`] = !_history;

    this.setState({
      planItems: _tmp_state
    }, () => {
      if (!_history) this.props.drawLine(index);
    })
  }

  renderPlansPanel = () => {
    const { planItems } = this.state;
    const { desc, current_key, dura, dist } = this.props;

    return desc && desc.map((item, index) => { // html <span>
      const display_cls = planItems[current_key][`item_${index}`];
      const zuijia_cls = !_.isEqual(index, 0) && _.isEqual(index, _.size(desc) - 1);
      const other_cls = !_.isEqual(index, 0) && !_.isEqual(index, _.size(desc) - 1);
      let text = appstrings.routePlan.tuijian;
      if (zuijia_cls) {
        text = appstrings.routePlan.juliduan;
      } else if (other_cls) {
        text = appstrings.routePlan.beixuan;
      }
      const panel_title_cls = classNames({
        'panel_title': true,
        'open': display_cls,
        'zuijia': zuijia_cls,
        'other': other_cls
      })
      const panel_content_cls = classNames({
        'panel_content': true,
        'show': display_cls
      })

      return (
        <View className='' key={`r-result-${current_key}-${index}`}>
          <View className={panel_title_cls} onClick={() => this.changePlansShow(index)}>
            <Text className='panel_left' text={text} />
            <View className='panel_right'>
              <Text text={`${appstrings.routePlan.time}：${dura[index]}`} />
              <Text text={dist[index]} />
            </View>
          </View>
          <View className={panel_content_cls} >
            <View className='route_plan_point_pos'><Image source={require('Images/dt-qd.svg')} size='lg'/></View>
            <View dangerouslySetInnerHTML={{ __html: item }} />
            <View className='route_plan_point_pos'><Image source={require('Images/dt-zd.svg')} size='lg'/></View>
          </View>
        </View>
      )
    });
  }

  render() {
    return (
      <ScrollView className='route_plan_scroll'>
        {this.renderPlansPanel()}
      </ScrollView>
    )
  }
}




class RoutePlanning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      active: 'bus',
      planResult: PLAN_DEFAULT
    }
    this.transit = undefined;
    this.driving = undefined;
    this.walking = undefined;
  }

  componentDidMount() {
    this._loadPlanResult();
  }

  openModal(val = false) {
    this.setState({ visible: val })
  }

  _loadPlanResult = () => {
    if (this.props.startPot && this.props.endPot) {
      switch(this.state.active) {
        case 'bus': {
          this.transit = new BMap.TransitRoute(this.props.map, {
            renderOptions: { map: this.props.map, autoViewport: true },
            pageCapacity: DEFAULT_PLAN_NUMBER,
            onSearchComplete: result => this._publicSearchComplete(result, 'bus'),
            onMarkersSet: (rs) => this._addPointStartAndEnd(rs)
          });
          this.transit.search(this.props.startPot, this.props.endPot);
          break;
        }
        case 'driving': {
          this.driving = new BMap.DrivingRoute(this.props.map, {
            renderOptions:{map: this.props.map, autoViewport: true},
            pageCapacity: DEFAULT_PLAN_NUMBER,
            onSearchComplete: result => this._publicSearchComplete(result, 'driving'),
            onMarkersSet: (rs) => this._addPointStartAndEnd(rs)
          });
			    this.driving.search(this.props.startPot, this.props.endPot);
          break;
        }
        case 'walking': {
          this.walking = new BMap.WalkingRoute(this.props.map, {
            renderOptions:{map: this.props.map, autoViewport: true},
            pageCapacity: DEFAULT_PLAN_NUMBER,
            onSearchComplete: result => this._publicSearchComplete(result, 'walking'),
            onMarkersSet: (rs) => this._addPointStartAndEnd(rs)
          });
			    this.walking.search(this.props.startPot, this.props.endPot);
          break;
        }
        default: {}
      }
    }
  }

  /**路线规划接口数据 */
  _publicSearchComplete = (result, type) => {
    const that = this;
    let [_local_tmp, _local_func] = [undefined, () => {}];
    switch(type) {
      case 'bus': {
        _local_tmp = that.transit;
        _local_func = that._drawBusLineComplete(result);
        break;
      }
      case 'driving': {
        _local_tmp = that.driving;
        _local_func = that._drivingLineComplete(result);
        break;
      }
      case 'walking': {
        _local_tmp = that.walking;
        _local_func = that._walkingLineComplete(result);
        break;
      }
      default: {
      }
    }

    if (_local_tmp && _local_tmp.getStatus() === window.BMAP_STATUS_SUCCESS){
      const planResult = that.state.planResult;
      planResult[that.state.active] = {
        number: 0,
        data: result
      }
      that.setState({ planResult: planResult }, _local_func);
    }
  }

  /** 1: bus start*/
  _addPointStartAndEnd = (rs = undefined) => {
    const end_icon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 28), {
      offset: new BMap.Size(12, 28),
      imageOffset: new BMap.Size(0, -24, -25 * 28)
    });
    const start_icon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
      offset: new BMap.Size(10, 25),
      imageOffset: new BMap.Size(0, 0, -10 * 25)
    });
    const myStart = new BMap.Marker(this.props.startPot, {icon: start_icon});
    const myEnd = new BMap.Marker(this.props.endPot,{icon: end_icon});
    if (rs) {
      this.props.map.removeOverlay(rs[0].marker); //删除起点
      this.props.map.removeOverlay(rs[rs.length-1].marker);//删除终点
    }
    this.props.map.addOverlay(myStart);
    this.props.map.addOverlay(myEnd);
  }

  _drawBusLineComplete = (result) => {
    this.props.map.clearOverlays();
    if (!result) {
      return this._resultNoPlan();
    }

    const firstPlan = result.getPlan(this.state.planResult[this.state.active].number);
    if (firstPlan) {
      // 绘制步行线路
      for (let i = 0; i < firstPlan.getNumRoutes(); i++){
        const walk = firstPlan.getRoute(i);
        if (walk.getDistance(false) > 0){
          // 步行线路有可能为0
          this.props.map.addOverlay(new BMap.Polyline(walk.getPath(), {strokeColor: 'blue', strokeWeight: 5, strokeOpacity: 0.4}));
        }
      }
      // 绘制公交线路
      for (let i = 0; i < firstPlan.getNumLines(); i++){
        const line = firstPlan.getLine(i);
        this.props.map.addOverlay(new BMap.Polyline(line.getPath(), {strokeColor: 'blue', strokeWeight: 5, strokeOpacity: 0.4 }));
      }
    }
    this._addPointStartAndEnd();
  }
  /**切换结果路线 */
  _busChangeLine = (index) => {
    const _local_tmp = this.state.planResult;
    _local_tmp[this.state.active].number = index;
    this.setState({
      planResult: _local_tmp
    }, () => this._drawBusLineComplete(_local_tmp[this.state.active].data))
  }
  _busPlan_Item = () => {
    const _planResult = this.state.planResult;
    const active = this.state.active;
    const xr_list = _planResult[active].data || {};

    if (_.size(Object.keys(xr_list)) === 0) {
      return;
    }

    if (xr_list.getNumPlans() === 0) {
      return this._resultNoPlan();
    }

    const [desc, dura, dist] = [[], [], []];
    for (let i = 0; i < xr_list.getNumPlans(); i++){
      desc.push(xr_list.getPlan(i).getDescription());
      dura.push(xr_list.getPlan(i).getDuration());
      dist.push(xr_list.getPlan(i).getDistance());
    }
    console.log('公交方案个数：', xr_list.getNumPlans());
    return <RoutePlanItem desc={desc} dura={dura} dist={dist} current_key='bus' drawLine={(index) => this._busChangeLine(index)}/>;
  }
  /** bus end */


  /** 2: driving start 3.0不支持关键字搜索*/
  _drivingLineComplete = (result) => {
    this.props.map.clearOverlays();
    if (!result) {
      return this._resultNoPlan();
    }
  }
  _driving_Item = () => {
    const _planResult = this.state.planResult;
    const active = this.state.active;
    const xr_list = _planResult[active].data || {};

    if (_.size(Object.keys(xr_list)) === 0) {
      return;
    }
    if (xr_list.getNumPlans() === 0) {
      return this._resultNoPlan();
    }

    const [desc, dura, dist] = [[], [], []];
    for (let i = 0; i < xr_list.getNumPlans(); i++){ //方案个数(有可能会有多个方案)
      const desc_tmp = [];
      const plan = xr_list.getPlan(i); // 获取第几套方案
      dura.push(plan.getDuration());
      dist.push(plan.getDistance());

      for(let j = 0; j < plan.getNumRoutes(); j++){
        const route = plan.getRoute(j);
        for (let k = 0; k < route.getNumSteps(); k++){
          const step = route.getStep(k);
          desc_tmp.push(`<View class='driv_desc_item'>${step.getDescription()}</View>`);
        }
      }
      desc.push(desc_tmp.join(''));
    }

    console.log('驾车方案个数：', xr_list.getNumPlans());
    return <RoutePlanItem desc={desc} dura={dura} dist={dist} current_key='driving'/>;
  }
  /**driving end */


  /** 3: walking start */
  _walkingLineComplete = (result) => {
    this.props.map.clearOverlays();
    if (!result) {
      return this._resultNoPlan();
    }
  }
  _walking_Item = () => {
    const _planResult = this.state.planResult;
    const active = this.state.active;
    const xr_list = _planResult[active].data || {};

    if (_.size(Object.keys(xr_list)) === 0) {
      return;
    }
    if (xr_list.getNumPlans() === 0) {
      return this._resultNoPlan();
    }

    const [desc, dura, dist] = [[], [], []];
    for (let i = 0; i < xr_list.getNumPlans(); i++){ //方案个数(有可能会有多个方案)
      const desc_tmp = [];
      const plan = xr_list.getPlan(i).getNumRoutes(); // 指定方案下面的线路个数
      dura.push(xr_list.getPlan(i).getDuration());
      dist.push(xr_list.getPlan(i).getDistance());

      for(let j = 0; j < plan; j++){
        const route = xr_list.getPlan(i).getRoute(j);
        for (let k = 0; k < route.getNumSteps(); k++){ //线路关键点个数
          var step = route.getStep(k);
          desc_tmp.push(`<View class='driv_desc_item'>${step.getDescription()}</View>`);
        }
      }
      desc.push(desc_tmp.join(''));
    }
    console.log('步行方案个数：', xr_list.getNumPlans());
    return <RoutePlanItem desc={desc} dura={dura} dist={dist} current_key='walking'/>;
  }
  /** end */


  routePlanTitle = () => {
    const route_title = SVG_IDS.reduce((rs, item) => {
      const route_class = classNames({
        'route_plan_item': true,
        'active': item === this.state.active
      })

      rs.push(
        <View key={`route_plan_pop_${item}`} className={route_class} onClick={() => this.setState({ active: item }, () => this._loadPlanResult())}>
          <Image source={require(`Images/${item}.svg`)} size='md'/>
          <Text text={appstrings.routePlan[item]} />
        </View>
      )
      return rs;
    }, []);

    return (
      <View className='route_plan_panel'>
        {route_title}
      </View>
    )
  }

  /** 判断是否有数据 */
  _isLoading = () => {
    const data = this.state.planResult[this.state.active].data;
    if (_.size(data) > 0) {
      return;
    }
    return <View className='route_plan_modal_nodata'><Icon type='loading' /></View>
  }

  /**没有搜索出来数据 */
  _resultNoPlan = () => {
    return (
      <View className='no_route_plan'>
        <Image source={require('Images/noPlan.svg')} size='lg' />
        <Text text={appstrings.routePlan.noPlan} />
      </View>
    )
  }

  render() {
    return (
      <Modal
        popup
        className="route_plan_modal"
        visible={this.state.visible}
        onClose={() => this.openModal()}
        animationType="slide-up"
      >
        {this.routePlanTitle()}
        {_.isEqual(this.state.active, 'bus') && this._busPlan_Item()}
        {_.isEqual(this.state.active, 'driving') && this._driving_Item()}
        {_.isEqual(this.state.active, 'walking') && this._walking_Item()}
        {this._isLoading()}
      </Modal>
    )
  }
}

RoutePlanning.propTypes = {
  map: object.isRequired,
  startPot: object.isRequired,
  endPot: object.isRequired
}

RoutePlanning.defaultProps = {
  map: {},
  startPot: new BMap.Point(116.310791, 40.003419),
  endPot: new BMap.Point(116.486419, 39.877282)
}

export default RoutePlanning;