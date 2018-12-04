import React, { Component } from 'react';
import { array } from 'prop-types';
import { Table } from 'antd';
import { columns, getData } from './columns';


export default class AntdTable extends Component {
  static propTypes = {
    dataSource: array
  }
  static defaultProps = {
    dataSource: []
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
      <Table
        bordered
        loading={false}
        columns={columns}
        dataSource={getData()}
        rowSelection={this._getSelection()}
        // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
      />
    )
  }
}