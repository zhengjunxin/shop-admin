import { observable, runInAction, action } from 'mobx'
import request from '../utils/request'

class Store {
    @observable banners = []
    @observable banner = null
    fetchBanners() {
        request.get('/banners')
            .then(res => {

                runInAction(() => {
                    this.banners = res.data.banners
                })
            })
    }
    updateBanner(bannerId, props) {
        return request.post(`/banner/${bannerId}`, props)
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
        request.delete(`/banner/${banner.id}`)
            .then(res => {
                runInAction(() => {
                    this.banners = this.banners.filter(b => b.id !== banner.id)
                })
            })
    }
    fetchBanner(bannerId) {
        return request.get(`/banner/${bannerId}`)
            .then(res => {
                runInAction(() => {
                    this.banner = res.data.banner
                })
            })
    }
    addBanner(banner) {
        return request.post('/banner', banner)
    }
}

export default Store