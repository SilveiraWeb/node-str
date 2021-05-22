"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../controllers/order_controller");

// routes controllers
router.get("/", controller.get);
router.post("/", controller.post);

module.exports = router;