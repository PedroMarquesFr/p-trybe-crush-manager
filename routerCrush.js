const express = require("express");
const fsMethods = require("./services/fslol");

const router = express.Router();
const newFsMethods = fsMethods();

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
