import { createSelector } from 'reselect';



const selectWagesStateDataSource = state => state['wages'].get('dataSource');
const selectWagesStateLoading = state => state['wages'].get('loading');
const makeSelectWagesDataSource = createSelector(
  selectWagesStateDataSource,
  datasource => datasource.toJS()
);
const makeSelectWagesLoading = createSelector(
  selectWagesStateLoading,
  loading => loading
);

export {
  makeSelectWagesDataSource,
  makeSelectWagesLoading
};
