import BannerStore from './banner'
import GoodStore from './good'
import { bannerUrl, goodUrl, categoryUrl } from '../api'
import BaseStore from './base'
import CategoryStore from './category'


export default {
    bannerStore: new BannerStore(),
    goodStore: new GoodStore(goodUrl),
    categoryStore: new CategoryStore(categoryUrl),
}