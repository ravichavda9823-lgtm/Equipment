let express = require("express");
const { Registration, Login, EditProfile, getUser, BlockUser } = require("../controller/auth.controller");

let router = express.Router();

router.post("/signup", Registration);
router.post("/signin", Login);
router.put("/update/:id", EditProfile);
router.put("/block/:id", BlockUser);
router.get("/user", getUser);




module.exports = router;