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
                <Route path="banners/list" component={Banner}></Route>
                <Route path="banners/add" component={BannerEdit}></Route>
                <Route path="banners/edit/:id" component={BannerEdit}></Route>

                <Route path="goods/list" component={GoodList}></Route>
                <Route path="goods/add" component={GoodEdit}></Route>
                <Route path="good/edit/:id" component={GoodEdit}></Route>
                
                <Route path="categories/list" component={Category}></Route>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
