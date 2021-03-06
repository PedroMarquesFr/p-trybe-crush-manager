const express = require("express");
const routerCrush  = require("./routerCrush");
const routerLogin  = require("./routerLogin");
const router = express.Router();

const fsMethods = require("./services/fslol");
// const ppid = require("./services/token");
const newFsMethods = fsMethods();

router.use("/crush",routerCrush)
router.use("/login",routerLogin)


module.exports = router;
