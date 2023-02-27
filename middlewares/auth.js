// is user logged in middleware express
const bcrypt = require("bcrypt");
const log = require("../utils/logger");
const jwt = require("jsonwebtoken");
require("dotenv");
const isLoggedIn = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token || token == "undefined") {
    res.status(401).json("Unauthorize user");
    return 0;
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        res.status(403).send(err.message);
      } else if (!decoded) {
        res.status(403).send("Unauthorized user");
      }else{
        req.jwt = decoded;
        next();
      }
    });
  
  } catch (error) {
    log.info(error);
    res.status(500).json("Something went wronge");
  }
};

const hashPassword = async (password, saltRounds = 10, next) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash password
    return await bcrypt.hash(password, salt);
  } catch (error) {
    log.info(error);
    console.log(error);
  }
  // Return null if error
  return null;
};
module.exports = {
  isLoggedIn,
  hashPassword,
  // blacklist,
};
