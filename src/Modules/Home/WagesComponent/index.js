import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectWagesDataSource, makeSelectWagesLoading } from './Store/selectores';
import WagesFormFilter from './WagesFormFilter';
import WagesFormResult from './WagesFormResult';


class WagesComponent extends Component {

  handlerSearch = () => {

  }

  render() {
    const { datasource, loading } = this.props;
    console.log('sdsdsdsdsd', this.props)

    return (
      [
        <WagesFormFilter
          onHandlerFilter={() => this.handlerSearch()}
        />,
        <WagesFormResult
          loading={loading}
          datasource={datasource}
        />
      ]
    );
  }
}

const mapStateToProps = createStructuredSelector({
  datasource: makeSelectWagesDataSource,
  loading: makeSelectWagesLoading
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeTabsId: () => dispatch({ type: ''})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WagesComponent);