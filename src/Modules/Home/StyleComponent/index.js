import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import ValidateProps from './ValidateProps';
import ChildNodeProps from './ChildNodeProps';
import StyledExtends from './StyledExtends';
import ReplaceDOMTag from './ReplaceDOMTag';
import Rotate from './Rotate';
const gridStyle = {
  width: '100%',
  height: '370px',
  textAlign: 'center',
  'margin-bottom': '15px'
};
const tableStyle = {
  height: '100%',
  background: '#ECECEC',
  padding: '30px'
}


class StyleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this._changeCardLoadingStatus()
  }

  _changeCardLoadingStatus = () => {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)
  }

  _firstRow = () => {
    const { loading } = this.state;
    return (
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Validate Props" size='small' bordered={false} style={gridStyle} loading={loading}>
            <ValidateProps />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Styled Components 透传属性" bordered={false} style={gridStyle} loading={loading}>
            <ChildNodeProps />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Styled Components extends" bordered={false} style={gridStyle} loading={loading}>
            <StyledExtends />
          </Card>
        </Col>
      </Row>
    )
  }

  _secondRow = () => {
    const { loading } = this.state;
    return (
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Replace DOM Tag" size='small' bordered={false} style={gridStyle} loading={loading}>
            <ReplaceDOMTag />
          </Card>
        </Col>
        <Col span={16}>
          <Card title="Rotate CSS" bordered={false} style={gridStyle} loading={loading}>
            <Rotate />
          </Card>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <div style={tableStyle}>
        {this._firstRow()}
        {this._secondRow()}
      </div>
    )
  }
}



export default StyleComponent;