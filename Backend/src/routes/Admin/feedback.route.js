let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { getFeedback, replyFeedback, DeleteFeedback } = require("../../controller/feedback.controller");


let router = express.Router();


router.get("/",Authenticate,Authorize("admin"),getFeedback);
router.put("/reply/:id", Authenticate,Authorize("admin"),replyFeedback);
router.delete("/delete/:id",Authenticate,Authorize("admin"),DeleteFeedback);






module.exports = router;    