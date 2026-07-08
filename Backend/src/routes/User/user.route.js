let express = require("express");

const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { Profile } = require("../../controller/user.controller");
const { EditProfile } = require("../../controller/auth.controller");

let router = express.Router();

router.get("/profile", Authenticate, Authorize("user"), Profile);
router.get("/profilehome", Profile);
router.put("/update/:id", Authenticate , Authorize("user") , EditProfile);


module.exports = router;
