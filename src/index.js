import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css';
import { Router, browserHistory, Route } from 'react-router'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'

import Home from './pages/Home';
import Banner from './pages/Banner';

import stores from './stores'

useStrict(true)

ReactDOM.render(
    <Provider {...stores}>
        <Router history={browserHistory}>
            <Route path="/" component={Home}>
                <Route path="banner" component={Banner}></Route>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
