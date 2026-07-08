let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const dashborad = require("../../controller/admin.controller");


let router = express.Router();

router.get("/dashborad",Authenticate,Authorize("admin"),dashborad);


module.exports = router;



