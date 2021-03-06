const express = require("express");
const fsMethods = require("./services/fslol");

const router = express.Router();
const newFsMethods = fsMethods();

let idCount = 1;

router.get("/", (req, res) => {
  newFsMethods
    .list()
    .then((r) => res.json(r))
    .catch((err) => {
      console.log("tamo no get", err);
      res.json([]);
    });
});

router.get("/:id", (req, res) => {
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

const validaToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ message: "Token não encontrado" });
  if (authorization && authorization.length !== 16)
    return res.status(401).json({ message: "Token inválido" });
  next();
};

const validaCorpoeHeader = (req, res, next) => {
  const dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  const { name, age, date } = req.body;

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
  if (!date || !date.datedAt || (!date.rate && date.rate != 0))
    return res.status(400).json({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  if (!dateRegex.test(date.datedAt))
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  if (date.rate < 1 || date.rate > 5)
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  next();
};

router.post("/", validaToken, validaCorpoeHeader, (req, res) => {
  console.log("ta td certo, logica de adicao");
  const { name, age, date } = req.body;
  const resp = { id: 5, name, age, date };
  idCount += 1;
  newFsMethods.add(resp);
  return res.status(201).json(resp);
});

router.put("/:id", validaToken, validaCorpoeHeader, (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  newFsMethods.edit(parseInt(id), { name, age, date }).then((r) => {
    return res.status(200).json({ id: parseInt(id), name, age, date });
  });
});

module.exports = router;
