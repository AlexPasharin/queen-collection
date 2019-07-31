import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

const _findIndex = Array.prototype.findIndex

Array.prototype.findIndex = function (predicate) {
  const index = _findIndex.call(this, predicate)

  if (index < 0)
    return null

  return index
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
