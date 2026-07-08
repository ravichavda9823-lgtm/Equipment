let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { getInquirary, ReplyInquiry, DeleteInquiry } = require("../../controller/inquirary.controller");



let router = express.Router();

router.get("/",Authenticate,Authorize("admin"),getInquirary);
router.put("/reply/:id", Authenticate,Authorize("admin"),ReplyInquiry);
router.delete("/delete/:id",Authenticate, Authorize("admin"),DeleteInquiry)





module.exports = router;    