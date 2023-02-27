// express router
const express = require("express");
const { result } = require("lodash");
const { createQuiz, getAllQuizes, getQuiz, deleteQuiz, updatedQuiz, submitQuiz } = require("../controllers/quiz");

const router = express.Router();
// models
const db = require("../models");
const { sendErrorResp } = require("../utils/common-utils");
const { error } = require("../utils/logger");

router.post("/", async (req, res) => {
  console.log('____jwt' , req.jwt.data.id)
  createQuiz(req.body, req.jwt.data.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get("/:id", async (req, res) => {
  getQuiz(req.params.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.post('/submit-quiz' ,async (req,res)=>{
  submitQuiz(req.body, req.jwt.id)
  .then((result) => res.status(result.status).send(result))
  .catch((error)=>{
    sendErrorResp(error,req,res);
  })
})

module.exports = router;
