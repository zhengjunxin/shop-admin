import { observable, runInAction, action } from 'mobx'
import axios from 'axios'

class Store {
    @observable banners = []
    @observable banner = null
    fetchBanners() {
        axios.get('/banners')
            .then(res => {

                runInAction(() => {
                    this.banners = res.data.banners
                })
            })
    }
    updateBanner(bannerId, props) {
        return axios.post(`/banner/${bannerId}`, props)
    }
    @action.bound
    toggleBannerStatus(banner) {
        this.updateBanner(banner.id, {
            enabled: banner.enabled ? 0 : 1,
        })
            .then(res => {
                const nextBanner = res.data.banner

                runInAction(() => {
                    this.banners = this.banners.map(banner => {
                        if (banner.id === nextBanner.id) {
                            return nextBanner
                        }
                        else {
                            return banner
                        }
                    })
                })
            })
    }
    @action.bound
    deleteBanner(banner) {
        axios.delete(`/banner/${banner.id}`)
            .then(res => {
                runInAction(() => {
                    this.banners = this.banners.filter(b => b.id !== banner.id)
                })
            })
    }
    fetchBanner(bannerId) {
        return axios.get(`/banner/${bannerId}`)
            .then(res => {
                runInAction(() => {
                    this.banner = res.data.banner
                })
            })
    }

}

export default Store