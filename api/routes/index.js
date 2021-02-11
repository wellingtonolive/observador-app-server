const bodyParser = require('body-parser')
const usuario = require('./usuario')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(usuario)
}
