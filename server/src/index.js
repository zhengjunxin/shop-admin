import express from 'express'
import path from 'path'

const app = express()
const port = 8080
const build = path.resolve(__dirname, '../../build')
const index = path.join(build, './index.html')


app.use(express.static(build))

app.get('/list', (req, res) => {
    res.send(JSON.stringify({
        data: {
            a: 1,
        },
        ret: 0,
    }))
})

app.get('*', (req, res) => {
    res.sendFile(index)
})

app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`)
})