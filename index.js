

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './components/pages/Cart/StateProvider';
import { initialState } from './components/pages/Cart/reducer.js'
import reducer from './components/pages/Cart/reducer'

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
   






// import React from 'react';
// import ReactDOM from 'react-dom';

// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));
