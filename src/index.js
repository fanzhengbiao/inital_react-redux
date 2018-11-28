import React from 'react';
import ReactDOM from 'react-dom';
import 'Styles/index.less';
import * as serviceWorker from 'Styles/Js/serviceWorker';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";
import HomeView from "Modules/HomeView";


window.onerror = () => {  //当js出错时调用
  return true;
}

ReactDOM.render(
  <AppContainer>
    <Provider>
      <Router>
        <HomeView/>
      </Router>
    </Provider>
  </AppContainer>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
