let app = require("./app");
const { connectDb } = require("./config/connection");
require("dotenv").config();
let PORT = process.env.PORT;

connectDb();

app.listen(PORT,() =>{
     console.log("server started");
})