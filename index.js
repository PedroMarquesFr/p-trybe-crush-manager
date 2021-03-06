const express = require("express");
const router = require("./router");

const app = express();
const SUCCESS = 200;
app.use(express.json());

app.use(function (req, res, next) {
  console.log(`- ${req.method} ${req.path}`);
  /* Termina a operação no middleware e chama o próximo middleware ou rota */
  next();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get("/", (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(router);

app.use((err, req, res, next) => {
  res.status(500).send({ error: `${err} ou algum erro interno` });
});

app.listen(3000, () => console.log("top"));
