let express = require("express");
let app = express();
let cors = require("cors");

app.use (
    cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    })
)
//middleware

app.use(express.json());


//common

let AuthRoute = require("./routes/auth.route");

//Admin Routes

let AdminRoute = require("./routes/Admin/admin.route");
let AdminCategoryRoute = require("./routes/Admin/category.route")
let AdminEquipmentRoute = require("./routes/Admin/equipment.route")
let AdminFeedbackRoute = require("./routes/Admin/feedback.route")
let AdminInquiararyRoute = require("./routes/Admin/inquiry.route")
let AdminBookingRoute = require("./routes/Admin/booking.route")






//User routess

let UserRoute = require("./routes/User/user.route")
let UserCategoryRoute = require("./routes/User/category.route")
let UserEquipmentRoute = require("./routes/User/equipment.route")
let UserBookingRoute = require("./routes/User/booking.route")
let UserFeedbackRoute = require("./routes/User/feedback.route")
let UserInquiararyRoute = require("./routes/User/inquirary.route")
let UserPaymentRoute = require("./routes/User/payment.route")








//common

app.use("/api/auth",AuthRoute);


//admin

app.use("/api/admin/",AdminRoute);
app.use("/api/admin/category",AdminCategoryRoute);
app.use("/api/admin/equipment",AdminEquipmentRoute)
app.use("/api/admin/feedback",AdminFeedbackRoute)
app.use("/api/admin/inquiry",AdminInquiararyRoute)
app.use("/api/admin/booking",AdminBookingRoute);







//user

app.use("/api/user/",UserRoute);
app.use("/api/user/category",UserCategoryRoute);
app.use("/api/user/equipment",UserEquipmentRoute);
app.use("/api/user/booking",UserBookingRoute);
app.use("/api/user/feedback",UserFeedbackRoute);
app.use("/api/user/inquirary",UserInquiararyRoute);
app.use("/api/user/payment",UserPaymentRoute);








module.exports = app;