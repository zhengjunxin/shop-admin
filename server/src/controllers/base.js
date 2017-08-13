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
        res.send('show')
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
