import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';

import 'nprogress/nprogress.css';
import 'bulma/css/bulma.css';
import 'normalize.css';
import 'colors.css';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
