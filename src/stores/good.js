import { observable, runInAction, action } from 'mobx'
import BaseStore from './base'
import { categoryUrl } from '../api'
import axios from 'axios'

class Store extends BaseStore {
    @observable categories = []
    @action
    fetchCategories() {
        axios.get(categoryUrl)
            .then(action((res) => {
                this.categories = res.data
            }))
    }
}

export default Store