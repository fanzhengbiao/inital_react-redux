import React, { Component } from 'react';
import BMap from 'BMap'


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
    this.map.addControl(new BMap.MapTypeControl());
    this.map.setCurrentCity('北京');
    this.map.enableScrollWheelZoom(true);
    this.map.addControl(new BMap.CityListControl({
      anchor: window.BMAP_ANCHOR_TOP_LEFT,
    }));
    this.createMarker();
  }

  createMarker = () => {
    if ((!this.marker) && (this.map)){
      const point = new BMap.Point(this.info.lng, this.info.lat);
      this.marker = new BMap.Marker(point);
      this.marker.addEventListener("click",()=>{this.openInfoWindow()});
      this.map.addOverlay(this.marker);
    }
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

  render() {
    return (
      <div className='container'>
        {this.getMapView()}
      </div>
    );
  }
}