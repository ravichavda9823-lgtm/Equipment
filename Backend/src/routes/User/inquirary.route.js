let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { AddInquirary, getInquirary } = require("../../controller/inquirary.controller");

let router = express.Router();

router.post("/addinquirary",Authenticate,Authorize("user"),AddInquirary);
router.get("/",Authenticate,Authorize("user"),getInquirary);



module.exports = router;    