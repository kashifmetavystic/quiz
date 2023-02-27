// express router
const express = require("express");
const router = express.Router();
const log = require("../utils/logger");
const jwt = require("jsonwebtoken");
const quizRoutes = require('../routes/quiz');
const { userLogin } = require("../controllers/user");
const { isLoggedIn } = require("../middlewares/auth");



router.post("/login", (req, res) => {
  userLogin(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      log.info(error);
      res.send(error);
    });
});


router.use("/quiz", isLoggedIn ,quizRoutes );



module.exports = router;
