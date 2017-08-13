class Base {
    constructor(proxy) {
        this.proxy = proxy
    }
    list = (req, res) => {
        this.proxy.list()
            .then(result => {
                res.send(result)
            })
    }
    show = (req, res) => {
        const entryId = req.params.id

        this.proxy.show(entryId)
            .then(result => {
                res.send(result)
            })
    }
    add = (req, res) => {
        this.proxy.add(req.body)
            .then(result => {
                res.sendStatus(200)
            })
    }
    update = (req, res) => {
        const _id = req.params.id

        this.proxy.update(_id, req.body)
            .then(result => {
                res.send(result)
            })
    }
    remove = (req, res) => {
        const _id = req.params.id
        if (_id) {
            this.proxy.remove({
                _id,
            })
            .then(result => {
                res.sendStatus(200)
            })
        }
    }
}

module.exports = Base
