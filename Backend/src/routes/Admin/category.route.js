let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { AddCategory, getCategory, DeleteCategory, EditCategory } = require("../../controller/category.controller");

let router = express.Router();

router.post("/addcategory",Authenticate,Authorize("admin"),AddCategory);
router.get("/",Authenticate,Authorize("admin"),getCategory);
router.put("/update/:id",Authenticate,Authorize("admin"),EditCategory);
router.delete("/delete/:id",Authenticate,Authorize("admin"),DeleteCategory);


module.exports = router;    