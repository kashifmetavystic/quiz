const jwt = require('jsonwebtoken');
const log = require("../utils/logger");
require("dotenv");
const returnJWT = async (data, expiry) => {
  try {
    let token = jwt.sign({data}, process.env.JWT_SECRET);
    return {
      success: true,
      message: "Authentication successful!",
      token: token,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wronge",
    };
  }
};

module.exports = {
  returnJWT,
};
