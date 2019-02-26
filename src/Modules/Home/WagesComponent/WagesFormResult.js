import React, { Component } from 'react';
import { array, bool } from 'prop-types';
import { Table } from 'antd';
import { TABLE_COLUMNS } from './Store/constant';


export default class WagesFormResult extends Component {
  static propTypes = {
    dataSource: array,
    loading: bool
  }
  static defaultProps = {
    dataSource: [],
    loading: false
  }

  render() {
    const { dataSource, loading } = this.props;
    return (
      <Table
        bordered
        loading={loading}
        columns={TABLE_COLUMNS}
        dataSource={dataSource}
      />
    )
  }
}