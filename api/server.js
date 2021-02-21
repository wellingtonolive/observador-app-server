const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/usuario");
const championshipRouter = require("./routes/Championship");
const gameRouter = require("./routes/Game");
require("dotenv").config();
require("./config/database/config")();

const app = express();

app.use(bodyParser.json());
require("./config/autenticacao/Config_Passport")(app);
app.use(cors());

app.use("/", userRouter);
app.use("/", championshipRouter);
app.use("/", gameRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
