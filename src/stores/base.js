import { observable, runInAction, action } from 'mobx'
import axios from 'axios'

class Store {
    @observable list = []
    @observable entry = null
    constructor(url) {
        this.url = url
    }
    fetchList(params) {
        axios.get(this.url, {params})
            .then(res => {
                runInAction(() => {
                    this.list = res.data
                })
            })
    }
    update(entryId, entry) {
        return axios.post(`${this.url}/${entryId}`, entry)
    }
    @action.bound
    remove(entry) {
        axios.delete(`${this.url}/${entry.id}`)
            .then(res => {
                runInAction(() => {
                    this.list = this.list.filter(b => b.id !== entry.id)
                })
            })
    }
    fetch(entryId) {
        return axios.get(`${this.url}/${entryId}`)
            .then(action(res => {
                this.entry = res.data
            }))
    }
    add(entry) {
        return axios.post(`${this.url}`, entry)
    }
    @action.bound
    set(entry, key, value) {
        this.update(entry.id, {
            [key]: value
        })
        .then(action(res => {

            this.list = this.list.map(entry => {
                const nextEntry = res.data

                return entry.id === nextEntry.id ?
                    nextEntry :
                    entry
            })
        }))
    }
}

export default Store