let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { getBooking, UpdateBookingStatus, DeleteBookingHistory } = require("../../controller/Booking.controller");

let router = express.Router();

router.get("/",Authenticate,Authorize("admin"),getBooking);
router.put("/status/:id",Authenticate, Authorize("admin"),UpdateBookingStatus)
router.delete("/delete/:id",Authenticate, Authorize("admin"),DeleteBookingHistory)





module.exports = router;    