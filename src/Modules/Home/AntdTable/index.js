import React, { Component } from 'react';
import moment from 'moment';
import { array, func } from 'prop-types';
import { Table, Icon, Form, Row, Col, Input, Button, Select, DatePicker, Card } from 'antd';
import Mock from 'mockjs';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { Option } = Select;
const { RangePicker } = DatePicker;
const Random = Mock.Random;
const FORM_ITEM_STYLE = {
  display: 'flex',
  'alignItem': 'center',
  'justifyContent': 'flex-end'
}
const BODY_MARGIN_STYLE = {
  margin: '10px'
}
const GOLD_INFO_STYLE = {
  padding: '10px'
}





class GoldSearchFilter extends React.Component {
  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  getFields() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={16}>
        <Col span={3}>
          <Form.Item label='查询条件' style={FORM_ITEM_STYLE}>
            {getFieldDecorator('type',{ initialValue: '1' })(
              <Select>
                <Option value="1">登录名</Option>
                <Option value="2">用户ID</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item >
            {getFieldDecorator('email')(<Input />)}
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label='查询区间' style={FORM_ITEM_STYLE}>
            <RangePicker onChange={this.onChange} />
          </Form.Item>
        </Col>
        <Col span={1} style={{ textAlign: 'right', marginTop: '4px' }}>
          <Button type="primary" htmlType="submit">查询</Button>
         </Col>
      </Row>
    )
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  render() {
    return (
      <Card title="新版作业金币查询" style={BODY_MARGIN_STYLE}>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} >
          {this.getFields()}
        </Form>
      </Card>
    );
  }
}

const GoldSearchForm = Form.create({ name: 'advanced_search' })(GoldSearchFilter);



const GoldSearchInfo = () => {
  const firstRow = (
    <Row gutter={24} type="flex" justify="start">
      <Col span={6} style={GOLD_INFO_STYLE}>
        <div className='ant-col-4'>
          用户ID:
        </div>
        <div className='ant-col-10'>
          sdsdsd
        </div>
      </Col>
      <Col span={6} style={GOLD_INFO_STYLE}>
        <div className='ant-col-4'>
        登录名:
        </div>
        <div className='ant-col-10'>
          sdsdsd
        </div>
      </Col>
      <Col span={6} style={GOLD_INFO_STYLE}>
        <div className='ant-col-4'>
          姓名:
        </div>
        <div className='ant-col-10'>
          sdsdsd
        </div>
      </Col>
      <Col span={6} style={GOLD_INFO_STYLE}>
        <div className='ant-col-4'>
        身份:
        </div>
        <div className='ant-col-10'>
          sdsdsd
        </div>
      </Col>
    </Row>
  )

  const sencodeRow = (
    <Row gutter={24} type="flex" justify="start">
      <Col span={6} style={GOLD_INFO_STYLE}>
        <div className='ant-col-4'>
          所属学校:
        </div>
        <div className='ant-col-10'>
          sdsdsd
        </div>
      </Col>
      <Col span={6} style={GOLD_INFO_STYLE}>
        <div className='ant-col-4'>
          查询时间:
        </div>
        <div className='ant-col-10'>
          sdsdsd
        </div>
      </Col>
      <Col span={6} style={GOLD_INFO_STYLE}>
        <div className='ant-col-6'>
          本月收入金币:
        </div>
        <div className='ant-col-10'>
          sdsdsd
        </div>
      </Col>
    </Row>
  )

  return (
    <div className="gutter-example" style={BODY_MARGIN_STYLE}>
      <Card>
        {firstRow}
        {sencodeRow}
      </Card>
    </div>
  )
}



const columns = [{
  title: '序号',
  width: '5%',
  align: 'center',
  dataIndex: 'index'
}, {
  title: '结算开始时间',
  width: '10%',
  align: 'center',
  dataIndex: 'startTime',
  sorter: (a, b) => a.startTime > b.startTime
}, {
  title: '结算结束时间',
  width: '10%',
  align: 'center',
  dataIndex: 'endTime',
  sorter: (a, b) => a.endTime > b.endTime
}, {
  title: '作业名称',
  width: '15%',
  align: 'center',
  dataIndex: 'hwname'
}, {
  title: '班级ID',
  width: '5%',
  align: 'center',
  dataIndex: 'classid',
}, {
  title: '结算时班级人数',
  width: '10%',
  align: 'center',
  dataIndex: 'classNumber'
}, {
  title: '结算期有效阅读数',
  width: '10%',
  align: 'center',
  dataIndex: 'readCount'
}, {
  title: '结算期有效阅读率',
  width: '10%',
  align: 'center',
  dataIndex: 'readRate',
  render: text => <span>{text}%</span>,
}, {
  title: '当前阅读数',
  width: '10%',
  align: 'center',
  dataIndex: 'currentReadCount',
}, {
  title: '当前阅读率',
  width: '10%',
  align: 'center',
  dataIndex: 'currentReadRate',
  render: text => <span>{text}%</span>,
}, {
  title: '金币',
  width: '10%',
  align: 'center',
  dataIndex: 'goldCount',
}];

const getData = () => {
  const data = [];
  for (let i = 0; i <= 21; i++) {
    data.push({
      key: i.toString(),
      index: i + 1,
      startTime: Random.date('yyyy-MM-dd'), // 开始时间
      endTime: Random.date('yyyy-MM-dd'), // 结束时间
      hwname: Random.csentence( 1, 10 ), // 作业名称
      classid: Random.integer(10000, 99999), // 班级ID
      classNumber: Random.integer(1, 100), // 结算班级人数
      readCount: Random.integer(1, 100), // 结算期有效阅读数
      readRate: Random.integer(1, 100), // 结算期有效阅读率
      currentReadCount: Random.integer(1, 100), // 当前阅读数
      currentReadRate: Random.integer(1, 100), // 当前阅读率
      goldCount: Random.integer(1, 1000) // 金币
    });
  }
  return data;
};

export default class GoldSearch extends Component {
  static propTypes = {
    dataSource: array,
    onhandleGoldSearch: func
  }
  static defaultProps = {
    dataSource: [],
    onhandleGoldSearch: () => {}
  }

  _getSelection = () => {
    return {
      type: 'checkbox',
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.key === '3',
        name: record.name,
      }),
    }
  }

  render() {
    return (
      <div>
        <GoldSearchForm />
        <GoldSearchInfo />
        <Table
          style={BODY_MARGIN_STYLE}
          bordered
          loading={false}
          columns={columns}
          dataSource={getData()}
          size="small"
        />
      </div>
    )
  }
}