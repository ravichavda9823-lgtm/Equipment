const express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { createOrder } = require("../../controller/payment.controller");



const router = express.Router();

router.post("/createorder", Authenticate, Authorize("user"),createOrder);

module.exports = router;