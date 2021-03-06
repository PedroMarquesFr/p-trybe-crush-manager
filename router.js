const express = require("express");
const randtoken = require("rand-token");
const router = express.Router();

let idCount = 1;

const fsMethods = require("./services/fslol");
// const ppid = require("./services/token");
const newFsMethods = fsMethods();
router.get("/crush", (req, res) => {
  newFsMethods
    .list()
    .then((r) => res.json(r))
    .catch((err) => {
      console.log("tamo no get", err);
      res.json([]);
    });
});
router.get("/crush/:id", (req, res) => {
  const { id } = req.params;
  newFsMethods
    .list()
    .then((r) => {
      const doesPersonExists = r.find((person) => person.id === parseInt(id));
      if (doesPersonExists) {
        return res.json(doesPersonExists);
      }
      return res.status(404).json({
        message: "Crush não encontrado",
      });
    })
    .catch((err) => {
      console.log("tamo no get", err);
      res.json([]);
    });
});

let tokens = [];

router.post("/login", (req, res) => {
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const { email, password } = req.body;
  if (!email)
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  if (!regexEmail.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (!password)
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  if (password.toString().length < 6) {
    return res.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }
  const token = randtoken.generate(16);
  tokens = [...tokens, token];
  console.log(tokens);
  res.json({ token: token });
});

const validaToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ message: "Token não encontrado" });
  if (authorization && authorization.length !== 16)
    return res.status(401).json({ message: "Token inválido" });
  next();
};

router.post("/crush", validaToken, (req, res) => {
  const dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  const { name, age, date } = req.body;

  // if (token === undefined) {
  //   return res.status(401).json({
  //     message: "Token não encontrado",
  //   });
  // }

  // if (!tks.find((registeredToken) => token === registeredToken))
  //   return res.status(401).json({
  //     message: "Token inválido",
  //   });
  if (!name)
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  if (name.length < 3)
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  if (!age)
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  if (age < 18)
    return res.status(400).json({
      message: "O crush deve ser maior de idade",
    });
  if (!date || !date.datedAt || !date.rate)
    return res.status(400).json({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  if (!dateRegex.test(date.datedAt))
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  if (date.rate < 1 || date.rate>5)
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  console.log("ta td certo, logica de adicao");
  const resp = { id: 5, name, age, date };
  idCount += 1;
  newFsMethods.add(resp);
  return res.status(201).json(resp);
});

module.exports = router;
