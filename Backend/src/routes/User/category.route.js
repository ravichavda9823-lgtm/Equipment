let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { AddCategory, getCategory } = require("../../controller/category.controller");

let router = express.Router();

router.get("/",getCategory);



module.exports = router;    