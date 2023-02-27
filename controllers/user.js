const express = require("express");
const { hashPassword } = require("../middlewares/auth");
const { returnJWT } = require("../middlewares/jwt-service");
const { quiz } = require("../models");
const { questions } = require("../models");
const {users} = require('../models')
const log = require("../utils/logger");
const bcrypt = require('bcrypt')
const createUser = async () =>{
    

}
const userLogin = async (credentials) => {
    try {
      credentials.email = credentials.email.toLowerCase();
      let user = await users.findOne({
        where: { email: credentials.email },
      });
      if (!user) {
        return {
          status: 401,
          message: "Invalid email or password!",
        };
      }
      const isMatch = await bcrypt.compare(credentials.password, user.password);
      if (!isMatch) {
        return {
          status: 401,
          message: "Invalid email or password!",
        };
      }
       delete user.password
      const jwt = await returnJWT(user);
      //   let session = await createSession(user.id);
      return {
        status: 200,
        message: "User login is valid.",
        jwt: jwt,
      };
    } catch (error) {
      log.info(error);
      return {
        status: 500,
        message: "Something went wrong",
      };
    }
  };

  module.exports = {
    userLogin,
    createUser
  }