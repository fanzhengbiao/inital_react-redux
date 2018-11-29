import React, { Component } from 'react';
import BMap from 'BMap'
import ReactDOM from 'react-dom'
import SearchBox from './SearchBox';
const MAP_SEARCH_KEY_WORD = 'map_key_word_search';
function createSearchBoxPosition(){
    this.defaultAnchor = window.BMAP_ANCHOR_TOP_LEFT;
    this.defaultOffset = new BMap.Size(10, 10);
}


export default class Map extends Component {
  constructor(props){
    super(props);
    this.info = {
      lng: 116.331978,
      lat: 39.9511
    }
    this.map = undefined;
    this.marker = undefined;
    this.geolocation = undefined;
  }

  componentDidMount(){
    setTimeout(this.onIdle, 100);
  }

  loadmap = () => {
    this.map = new BMap.Map("map_container"); // 创建Map实例
    this.geolocation = new BMap.Geolocation();
    this.map.centerAndZoom(new BMap.Point(this.info.lng, this.info.lat), 15); // 初始化地图,设置中心点坐标和地图级别
    this.map.setCurrentCity('北京');
    this.map.enableScrollWheelZoom(true);
    this.map.addControl(new BMap.CityListControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT,
      enableGeolocation: true
    }));
    this.loadSeachBox();
  }

  /**添加自定义搜索框 */
  loadSeachBox = () => {
    createSearchBoxPosition.prototype = new BMap.Control();
    createSearchBoxPosition.prototype.initialize = (map) => {
      ReactDOM.render(<SearchBox mapId={MAP_SEARCH_KEY_WORD} map={this.map} setMarker={point => this.setMarker(point)}/>,
        document.getElementById(MAP_SEARCH_KEY_WORD))

      const local_dom_tmp = document.getElementById(MAP_SEARCH_KEY_WORD);
      map.getContainer().appendChild(local_dom_tmp);
      return local_dom_tmp;
    };
    var searchBoxCtrl = new createSearchBoxPosition();
    this.map.addControl(searchBoxCtrl);
  }

  setMarker(_point) {
    if ((!this.marker) && (this.map)){
        this.marker = new BMap.Marker(_point);
        this.map.addOverlay(this.marker);
        this.marker.enableDragging();
        this.marker.addEventListener("dragend", this.markerMoved);
    } else {
        this.marker.setPosition(_point);
    }
  }

  markerMoved = (e) => {
    const point = this.marker.getPosition();
    this.info.lng = point.lng;
    this.info.lat = point.lat;
  }

  openInfoWindow = () => {
    var point = new BMap.Point(this.info.lng, this.info.lat);
    this.map.openInfoWindow(this.infoWindow, point);
  }

  onIdle = () => {
    let BMapObject = window.BMap;
    if (typeof(BMapObject) === 'object') {
      this.loadmap();
    } else {
      setTimeout(this.onIdle,100);
    }
  }

  getMapView = () => {
    return <div className='map_container' id='map_container' />;
  }

  getMapSearch = () => {
    return <div id='map_key_word_search'/>;
  }

  render() {
    return (
      <div className='container'>
        {this.getMapView()}
        {this.getMapSearch()}
      </div>
    );
  }
}