let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const {
  AddEquipment,
  getEquipment,
  DeleteEquipment,
  EditEquipment,
} = require("../../controller/equipment.controller");

let router = express.Router();

router.post("/addequipment", Authenticate, Authorize("admin"), AddEquipment);
router.get("/", Authenticate, Authorize("admin"), getEquipment);
router.put("/update/:id", Authenticate, Authorize("admin"), EditEquipment);
router.delete("/delete/:id", Authenticate, Authorize("admin"), DeleteEquipment);

module.exports = router;
