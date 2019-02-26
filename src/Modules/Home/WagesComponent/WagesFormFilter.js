import React, { Component } from 'react';
import {
  Form, Row, Col, Input, Button, Icon,
} from 'antd';
import { WAGES_FORM_FILEDS } from './Store/constant';


class WagesComponentForm extends Component {
  state = {
    expand: false,
  };

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? WAGES_FORM_FILEDS.length : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < WAGES_FORM_FILEDS.length; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={WAGES_FORM_FILEDS[i].name}>
            {getFieldDecorator(WAGES_FORM_FILEDS[i].fileds, {
              rules: [{
                required: true,
                message: 'Input something!',
              }],
            })(
              <Input />
            )}
          </Form.Item>
        </Col>
      );
    }
    return children;
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render() {
    const collapse = WAGES_FORM_FILEDS.length > 6 ? (
      <span className='expand-btn' onClick={this.toggle} >
        Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
      </span>
    ) : null;

    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">Search</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
            {collapse}
          </Col>
        </Row>
      </Form>
    );
  }
}

const WagesFormFilter = Form.create({ name: 'advanced_search' })(WagesComponentForm);
export default WagesFormFilter;