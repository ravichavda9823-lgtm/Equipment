let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { Booking, getBooking } = require("../../controller/Booking.controller");

let router = express.Router();

router.post("/equipmentbooking",Authenticate,Authorize("user"),Booking);
router.get("/",Authenticate,Authorize("user"),getBooking);



module.exports = router; 