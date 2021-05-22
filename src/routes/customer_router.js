"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../controllers/customer_controller");

// routes controllers
router.get("/",controller.get)
router.post("/", controller.post);
//router.put("/:id", controller.put);
//router.delete("/:id", controller.del);

module.exports = router;