let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { getEquipment, AddEquipment, getEquipmentByCategory, getEquipmentById } = require("../../controller/equipment.controller");


let router = express.Router();


router.get("/",getEquipment);
router.get("/:id",Authenticate,Authorize("user"),getEquipmentById);
router.get("/category/:category_id",Authenticate,Authorize("user"),getEquipmentByCategory);




module.exports = router;    