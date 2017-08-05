import { observable, runInAction } from 'mobx'
import axios from 'axios'

class Store {
    @observable banners = []
    fetchBanners() {
        axios.get('/banners')
            .then(res => {
                runInAction(() => {
                    this.banners = res.data.banner
                })
            })
    }
}

export default Store