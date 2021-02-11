const express = require('express')
const userRouter = require('./routes/usuario')
require('dotenv').config()
require('./config/database/config')()


const app = express();

app.use('/',userRouter)


app.listen(Number(process.env.PORT), () =>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

