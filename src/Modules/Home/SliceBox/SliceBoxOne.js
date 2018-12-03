import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';



export default class SliceBoxOne extends Component {
  constructor(props) {
    super(props);
    window.$ = $;
    window.jQuery = $;
  }

  componentDidMount() {
    this._loadSliceJs(require('./js/jquery.slicebox.js'));
    setTimeout(this._initFunc(), 100)
  }

  _loadSliceJs = (url, callback) => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    if (typeof(callback) !== 'undefined') {
      if (script.readyState) {
        script.onreadystatechange = () => {
          if (_.isEqual(script.readyState, 'loaded') || _.isEqual(script.readyState, 'complete')) {
            script.onreadystatechange = null;
            callback();
          }
        }
      } else {
        script.onload = () => callback();
      }
    }
    script.src = url;
    document.body.appendChild(script);
}

  _initFunc = () => {
    const Page = (function() {
      const $navArrows = $('#nav-arrows').hide(),
            $shadow = $('#shadow').hide(),
            slicebox = $('#sb-slider').slicebox({
              onReady: function() {
                $navArrows.show();
                $shadow.show();
              },
              orientation: 'r',
              cuboidsRandom: true,
              disperseFactor: 30
            }),

            init = function() {
              initEvents();
            },
            initEvents = function() {
              // add navigation events
              $navArrows.children(':first').on('click', function() {
                slicebox.next();
                return false;
              });

              $navArrows.children(':last').on('click', function() {
                slicebox.previous();
                return false;
              });
            };
        return { init : init };
    })();
    Page.init();
  }

  _renderWrapper = () => {
    let img_dom = [];
    for (let i = 1; i <= 7; i ++) {
      img_dom.push(
        <li key={`slice_box_${i}`} >
          <a href='#'><img src={require(`Styles/Images/${i}.jpg`)} alt='images' /> </a>
        </li>
      )
    }

    return (
      <div className="wrapper">
        <ul id="sb-slider" className="sb-slider">
          {img_dom}
        </ul>
        <div id="shadow" className="shadow" />
        <div id="nav-arrows" className="nav-arrows">
          <a href='#'>Next</a>
          <a href='#'>Previous</a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        {this._renderWrapper()}
      </div>
    )
  }
}