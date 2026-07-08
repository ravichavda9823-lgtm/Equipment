let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { AddFeedback, getFeedback } = require("../../controller/feedback.controller");

let router = express.Router();

router.post("/addfeedback",Authenticate,Authorize("user"),AddFeedback);
router.get("/",getFeedback);



module.exports = router;    