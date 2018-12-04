import React from 'react';
import Mock from 'mockjs';
import { Icon, Divider } from 'antd';
const Random = Mock.Random;



export const columns = [{
  title: 'Name',
  width: '10%',
  align: 'center',
  dataIndex: 'name',
  render: text => <a href="javascript:;">{text}</a>,
  sorter: (a, b) => a.name.length - b.name.length
}, {
  title: 'Age',
  width: '10%',
  align: 'center',
  dataIndex: 'age',
  sorter: (a, b) => a.age - b.age
}, {
  title: 'Phone',
  width: '15%',
  align: 'center',
  dataIndex: 'phone',
  sorter: (a, b) => a.phone - b.phone
}, {
  title: 'Address',
  width: '25%',
  align: 'center',
  dataIndex: 'address',
}, {
  title: '入网时间',
  width: '15%',
  align: 'center',
  dataIndex: 'time',
  sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
}, {
  title: 'Action',
  key: 'action',
  width: '18%',
  align: 'center',
  render: (text, record) => (
    <span>
      <a href="javascript:;">delete</a>
      <Divider type="vertical" />
      <a href="javascript:;" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];


export const getData = () => {
  const data = [];
  for (let i = 0; i <= 21; i++) {
    data.push({
      key: i.toString(),
      name: Random.cname(),
      age: Random.integer(1, 100),
      phone: Mock.mock({
        'regexp': /^1[0-9]{10}/
      }).regexp,
      time: Random.datetime(),
      address: Random.county(true),
    });
  }
  return data;
};
