const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require('morgan')
const path = require("path");
const userRouter = require("./routes/usuario");
const championshipRouter = require("./routes/Championship");
const gameRouter = require("./routes/Game");
const athleteRouter = require("./routes/Athlete");
const arquivosRouter = require('./routes/Arquivos');
require("dotenv").config();
require("./config/database/config")();

const app = express();

app.use(bodyParser.json());
require("./config/autenticacao/Config_Passport")(app);
app.use(cors());
app.use(express.urlencoded({extended:true}));


app.use("/", userRouter);
app.use("/", championshipRouter);
app.use("/", gameRouter);
app.use("/", athleteRouter);
app.use("/", express.static(path.resolve(__dirname, "..", "tmp", "uploads")), arquivosRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
