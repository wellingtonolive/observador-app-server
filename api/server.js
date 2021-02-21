const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routes/usuario')
require('dotenv').config()
require('./config/database/config')()

const app = express();

app.use(bodyParser.json())
require('./config/autenticacao/Config_Passport')(app)

app.use('/',userRouter)

app.listen(Number(process.env.PORT), () =>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

