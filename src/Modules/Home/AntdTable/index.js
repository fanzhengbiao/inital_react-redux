import React, { Component } from 'react';
import moment from 'moment';
import { array, func } from 'prop-types';
import { Table, Form, Row, Col, Input, Button, Select, DatePicker, Card } from 'antd';
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
const STRINGS = {
  filter: {
    searchOpt: '查询条件',
    loginName: '登录名',
    userId: '用户ID',
    releaseTime: '练习发布时间',
    jsTime: '结算时间',
    searchBtn: '查询',
    title: '新版作业金币查询'
  }
}
const FAILED = {
  filter: {
    typeGroups: 'types',
    typeInput: 'email',
    lxStartTime: 'lianxiStart',
    lxEndTime: 'lianxiEnd',
    jsTiem: 'jsTime',
  },
  table: {
    rowNumber: 'rowNumber',
    hwName: 'hw_name',
    hwType: 'hw_type',
    classid: 'classid',
    classname: 'classname',
    jsClassPersonNumber: 'jsClsPerson',
    jsReadCount: 'jsReadCount',
    jsSheBei: 'jsShebei',
    jsRate: 'jsRate',
    currentClassCount: 'currentClassCount',
    currenRead: 'currentRead',
    currentSheBei: 'currentShebei',
    currentRate: 'currentRate'
  }
}



class GoldSearchFilter extends React.Component {
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const fields = this.props.form.getFieldsValue();
    const inputRules = {
      rules: [{ required: true, message: '请输入内容'}]
    }
    const rangeConfig = {
      rules: [{ required: true, message: '请选择时间' }]
    };
    const datePickerConfig = {
      rules: [{
        required: true,
        message: !fields['release-range-picker'] ? '请先选择发布时间' : '请选择时间'
      }]
    };
    const datePickerDisabledDate = function (current) {
      return current <= new Date(fields['release-range-picker'][1]).getTime();
   };

    return (
      <Row gutter={20}>
        <Col span={3}>
          <Form.Item label={STRINGS.filter.searchOpt} style={FORM_ITEM_STYLE}>
            {getFieldDecorator(FAILED.filter.typeGroups,{ initialValue: '1' })(
              <Select>
                <Option value="1">{STRINGS.filter.loginName}</Option>
                <Option value="2">{STRINGS.filter.userId}</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item >
            {getFieldDecorator(FAILED.filter.typeInput, inputRules)(<Input />)}
          </Form.Item>
        </Col>

        <Col span={7}>
          <Form.Item label={STRINGS.filter.releaseTime} style={FORM_ITEM_STYLE}>
            {getFieldDecorator('release-range-picker', rangeConfig)(
              <RangePicker
              />
            )}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label={STRINGS.filter.jsTime} style={FORM_ITEM_STYLE}>
            {getFieldDecorator(FAILED.filter.jsTiem, datePickerConfig)(
              <DatePicker
                disabled={!fields['release-range-picker'] ? true : false}
                disabledDate={datePickerDisabledDate}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={1} style={{ textAlign: 'right', marginTop: '4px' }}>
          <Button type="primary" htmlType="submit">{STRINGS.filter.searchBtn}</Button>
         </Col>
      </Row>
    )
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const releaseRangeValue = fieldsValue['release-range-picker'];
        const values = {
          [FAILED.filter.typeGroups]: fieldsValue[FAILED.filter.typeGroups],
          [FAILED.filter.typeInput]: fieldsValue[FAILED.filter.typeInput],
          [FAILED.filter.lxStartTime]: releaseRangeValue && releaseRangeValue[0].format('YYYY-MM-DD'),
          [FAILED.filter.lxEndTime]: releaseRangeValue && releaseRangeValue[1].format('YYYY-MM-DD'),
          [FAILED.filter.jsTiem]: fieldsValue[FAILED.filter.jsTiem].format('YYYY-MM-DD'),
        };
        console.log('Received values of form: ', values);
        this.props.onHandleSearch(values)
      }
    });

  }

  render() {
    return (
      <Card title={STRINGS.filter.title} style={BODY_MARGIN_STYLE}>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} >
          {this.getFields()}
        </Form>
      </Card>
    );
  }
}
const GoldSearchForm = Form.create({ name: 'advanced_search' })(GoldSearchFilter);

const columns = [{
  title: '序号',
  width: '3%',
  align: 'center',
  dataIndex: FAILED.table.rowNumber
}, {
  title: '练习名称',
  width: '15%',
  align: 'center',
  dataIndex: FAILED.table.hwName
}, {
  title: '练习类型',
  width: '8%',
  align: 'center',
  dataIndex: FAILED.table.hwType
}, {
  title: '班级ID',
  width: '5%',
  align: 'center',
  dataIndex: FAILED.table.classid,
}, {
  title: '班级名称',
  width: '8%',
  align: 'center',
  dataIndex: FAILED.table.classname,
}, {
  title: '结算时班级人数',
  width: '7%',
  align: 'center',
  dataIndex: FAILED.table.jsClassPersonNumber
}, {
  title: '结算期阅读数',
  width: '8%',
  align: 'center',
  dataIndex: FAILED.table.jsReadCount
}, {
  title: '结算期设备',
  width: '5%',
  align: 'center',
  dataIndex: FAILED.table.jsSheBei
}, {
  title: '结算期阅读率',
  width: '7%',
  align: 'center',
  dataIndex: FAILED.table.jsRate,
  render: text => <span>{text}%</span>,
}, {
  title: '当前班级人数',
  width: '5%',
  align: 'center',
  dataIndex: FAILED.table.currentClassCount,
}, {
  title: '当前阅读数',
  width: '5%',
  align: 'center',
  dataIndex: FAILED.table.currenRead,
}, {
  title: '当前设备数',
  width: '5%',
  align: 'center',
  dataIndex: FAILED.table.currentSheBei,
}, {
  title: '当前阅读率',
  width: '5%',
  align: 'center',
  dataIndex: FAILED.table.currentRate,
  render: text => <span>{text}%</span>,
}];

const getData = () => {
  const data = [];
  for (let i = 0; i <= 21; i++) {
    data.push({
      key: i.toString(),
      [FAILED.table.rowNumber]: i + 1,
      [FAILED.table.hwName]: Random.csentence( 1, 10 ), // 作业名称
      [FAILED.table.hwType]: Random.csentence( 1, 10 ), // 作业类型
      [FAILED.table.classid]: Random.integer(10000, 99999), // 班级ID
      [FAILED.table.classname]: Random.name(), // 班级名称
      [FAILED.table.jsClassPersonNumber]: Random.integer(1, 100), // 结算班级人数
      [FAILED.table.jsReadCount]: Random.integer(1, 100), // 结算期阅读数
      [FAILED.table.jsSheBei]: Random.integer(1, 100), // 结算设备数
      [FAILED.table.jsRate]: Random.integer(1, 100), // 结算期阅读率
      [FAILED.table.currentClassCount]: Random.integer(1, 100), // 当前班级人数
      [FAILED.table.currenRead]: Random.integer(1, 100), // 当前阅读数
      [FAILED.table.currentSheBei]: Random.integer(1, 100), // 当前设备数
      [FAILED.table.currentRate]: Random.integer(1, 100) // 当前阅读率
    });
  }
  return data;
};

export default class GoldSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: []
    }
  }
  static propTypes = {
    dataSource: array,
    onhandleGoldSearch: func
  }
  static defaultProps = {
    dataSource: [],
    onhandleGoldSearch: () => {}
  }
  queryData = filter => {
    const that = this;
    setTimeout(() => {
      fetch('https://www.easy-mock.com/mock/59801fd8a1d30433d84f198c/example/user/all', {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          //'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        //body: JSON.stringify(filter)
      })
      .then(res => res.json())
      .then(data => {
        console.log('+++++++', filter);
        this.setState({
          loading: false,
          data: getData()
        })
      })
      .catch(e => console.log('错误:', e))
    }, 1000)
  }

  searchData = (filter) => {
    this.setState({
      loading: true
    }, () => this.queryData(filter))
  }



  render() {
    return (
      <div>
        <GoldSearchForm onHandleSearch={filter => this.searchData(filter)} />
        <Table
          style={BODY_MARGIN_STYLE}
          bordered
          loading={this.state.loading}
          columns={columns}
          dataSource={this.state.data}
          size="middle"
        />
      </div>
    )
  }
}