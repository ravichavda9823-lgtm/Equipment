let jwt = require("jsonwebtoken");
require("dotenv").config();
let KEY = process.env.KEY;

let Authenticate = async (req, res, next) => {
  try {
    let authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized acess : Header not provide",
      });
    }
    let token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized acess : Token not provide",
      });
    }
    jwt.verify(token, KEY, (err, data) => {
      if (err) {
        console.log("JWT: ",err);

        return res.status(401).json({
          status: false,
          message: "Unauthorized acess : Invalid or exipred Token",
        });
      }
      req.user = data;
      next();
    });
  } catch (e) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized acess : Token is exipred",
    });
  }
};



const Authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        status: false,
        message: "Access Not Permitted.",
      });
    }
    next();
  };
};


module.exports = { Authenticate , Authorize};