import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css';
import { Router, browserHistory, Route } from 'react-router'

import Home from './pages/Home';
import Banner from './pages/Banner';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Home}>
            <Route path="banner" component={Banner}></Route>
        </Route>
    </Router>, document.getElementById('root'));
registerServiceWorker();
