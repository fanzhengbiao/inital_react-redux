import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import createReducer from './Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory'


export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const history = createHistory();
  const routemiddleware = routerMiddleware(history)

  const middlewares = [
    sagaMiddleware,
    routemiddleware
  ];

  const store = createStore(
    createReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  return store;
}
