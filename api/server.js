require('dotenv').config()
require('./config/database/config')()
const express = require('express')

const app = express();

app.use(express.json())


const userRouters = require('./routes/usuario')
app.use("/api",userRouters)

app.listen(Number(process.env.PORT), () =>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

