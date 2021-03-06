const express = require("express");
const randtoken = require("rand-token");
const router = express.Router();
const fsMethods = require("./services/fslol");
// const ppid = require("./services/token");

let tokens = [];

router.post("/", (req, res) => {
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

module.exports = router;
