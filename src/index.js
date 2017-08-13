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
import BannerEdit from './pages/BannerEdit';
import GoodEdit from './pages/GoodEdit';
import GoodList from './pages/GoodList';
import Category from './pages/Category';


import stores from './stores'
import './utils/configureAxios'

useStrict(true)

ReactDOM.render(
    <Provider {...stores}>
        <Router history={browserHistory}>
            <Route path="/" component={Home}>
                <Route path="banner" component={Banner}></Route>
                <Route path="banner/create" component={BannerEdit}></Route>
                <Route path="banner/edit/:id" component={BannerEdit}></Route>
                <Route path="addGood" component={GoodEdit}></Route>
                <Route path="goods" component={GoodList}></Route>
                <Route path="category" component={Category}></Route>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
