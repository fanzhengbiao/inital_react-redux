import React, { Component } from 'react'
import BMap from 'BMap'
import ReactDom from 'react-dom'
import zh_cn from 'Styles/Js/localMessage'
import { Icon, Button } from 'antd'
import { string, object } from 'prop-types'
const PAGE_CAPA_CITY = 10;


class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.my_value = '';
    this.state = {
      input_value: ''
    }
  }

  componentDidMount() {
    this.local_map = new BMap.LocalSearch(this.props.map, {
      renderOptions: {map: this.props.map, panel: 'search_result_panel'},
      pageCapacity: PAGE_CAPA_CITY
    });
    this.auto_complete = new BMap.Autocomplete({
      'input': 'suggestId',
      'location': this.props.map
    });
    this.searchInputEnter();
    this.props.map.addEventListener('click',this.onMapClick);
    this.auto_complete.addEventListener('onconfirm', e => this.onConfirm(e));
  }

  /**添加搜索框回车事件 */
  searchInputEnter = () => {
    ReactDom.findDOMNode(this.search_input).addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        this.local_map.search(this.state.input_value)
      }
      if (e.keyCode === 38 || e.keyCode === 40) {
        ReactDom.findDOMNode(this.mapSearchRef).innerHTML = '';
      }
    })
  }

  onMapClick = () => {
    let inner_html = ReactDom.findDOMNode(this.mapSearchRef).innerHTML;
    if (inner_html !== '') {
      ReactDom.findDOMNode(this.mapSearchRef).innerHTML = '';
    }
  }

  /**添加鼠标点击下拉列表事件 */
  onConfirm = (e) => {
    const _tmp_value = e.item.value;
    this.my_value = _tmp_value.province + _tmp_value.city + _tmp_value.district + _tmp_value.street + _tmp_value.business;
    this.setState({ input_value: this.my_value }, () => this.setPlace());
  }

  /**查找元素 */
  findDOMById = (id) => {
    return document.getElementById(id);
  }

  /**搜索结果定位 */
  setPlace = () => {
    const that = this;
    const map = that.props.map;
    function first_result() {
      const _point = local.getResults().getPoi(0).point;
      if (_point && (_point.lng && _point.lat)) {
        that.props.setMarker(_point);
        map.centerAndZoom(_point, 18);
      }
    }

    const local = new BMap.LocalSearch(map, {
      onSearchComplete: first_result
    });
    local.search(this.my_value);
  }

  /**清除关键字 */
  clearInputValue = () => {
    this.setState({
      input_value: ''
    }, () => {
      this.local_map.clearResults();
      ReactDom.findDOMNode(this.mapSearchRef).innerHTML = ''
    })
  }

  changeInput = (e) => {
    ReactDom.findDOMNode(this.mapSearchRef).innerHTML = ''
    this.setState({
      input_value: e.target.value
    })
  }

  /** render seachr box dom */
  renderSearchBox = () => {
    return (
      <div className='searchbox'>
        <div className='searchbox-container' >
          <div className='searchbox-content' >
            <input
              type='text'
              id='suggestId'
              ref={ref => this.search_input = ref}
              value={this.state.input_value}
              onChange={e => this.changeInput(e)}
              placeholder={zh_cn.map.placeholder}
              className='searchbox-content-common'
            />

            {this.state.input_value !== '' ? (
              <Icon
                type='close'
                onClick={() => this.clearInputValue()}
              />
            ) : ''}

          </div>
          <Button
            icon="search"
            type="primary"
            onClick={() => this.local_map.search(this.state.input_value)}
          >
            Search
          </Button>
        </div>
      </div>
    )
  }

  render() {
    return [
      <div className='map_key_word_search'>
        {this.renderSearchBox()}
      </div>,
      <div id='search_result_panel' ref={ref => this.mapSearchRef = ref} />
    ]
  }
}

SearchBox.propTypes = {
  mapId: string.isRequired,
  map: object.isRequired
};

export default SearchBox;
