import React from 'react';
import { Icon, Divider } from 'antd';



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
  title: 'Address',
  width: '40%',
  align: 'center',
  dataIndex: 'address',
}, {
  title: 'Action',
  key: 'action',
  width: '35%',
  align: 'center',
  render: (text, record) => (
    <span>
      <a href="javascript:;">add</a>
      <Divider type="vertical" />
      <a href="javascript:;">delete</a>
      <Divider type="vertical" />
      <a href="javascript:;" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];


export const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}];
