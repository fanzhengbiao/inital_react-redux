import { fromJS } from 'immutable';


const initState = fromJS({
  dataSource: [],
  loading: false
});


const reducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default {
  wages: reducer
};
