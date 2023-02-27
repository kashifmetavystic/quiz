const express = require("express");
const { quiz } = require("../models");
const { questions ,users_quiz } = require("../models");

const log = require("../utils/logger");


const createQuiz =async (body,userId) => {
  try{
    const createdQuiz = await quiz.create({
      name: body.title,
      description: body.description,
      userId: userId
    });

    // loop through the questions in the request body and add them to the quiz
    for (const questionData of body.questions) {
      // create a new question with the provided data
      const question = await questions.create({
        question: questionData.text,
        optionA: questionData.optionA,
        optionB: questionData.optionB,
        optionC: questionData.optionC,
        answer: questionData.answer,
        quizId: createdQuiz.id
      });
    }
    return{
     status: 200,
     message: "Quiz created successfully",
     quiz: createdQuiz
    }
  }catch(error){
  log.info(error)
  return {
    status: 500,
    message: `error due to: ${error.message}`,
  };
  }
};

const submitQuiz = async (body,userId) =>{
    try {
      // retrieve the quiz from the database using the quiz ID
      const getQuiz = await quiz.findOne({ where: { id: body.quizId } });
  
      if (!getQuiz) {

        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      // retrieve the questions for the quiz from the database
      const getQuestions = await questions.findAll({where:{quizId: body.quizId}});
  
      // calculate the user's score
      let score = 0;
  
      for (const answerData of body.answers) {
        const question = await questions.findOne({where:{id: answerData.questionId}});
       
        if (!question) {
          return {
            status: 400,
            message: `Question with ID ${answerData.questionId} not found` }
        }
  
        if (answerData.answer === question.answer) {
          score++;
        }
      }
  
  // store the user's score in the database
  const userQuiz = await users_quiz.create({
    userId: userId,
    quizId: body.quizId,
    score: score
  });
  
  // return a response indicating whether the user's answers were correct or not, and their overall score
   return{
    status: 200,
    correct: score,
    incorrect: getQuestions.length - score,
    score: score,
    totalQuestions: getQuestions.length
  };
  } catch (err) {
  console.error(err);
  return{
    status: 500,
    message: `error due to: ${err.message}`
  }
  }
}


const getQuiz = async (id) => {
  try{
    const Quiz = await quiz.findOne({
      where: { id: id },
      include: { model: questions ,
    attributes: { exclude: ['answer' ,'quizId'] }
      
    },
    });
  if(!Quiz){
    return{
      status: 400,
      message: "No quiz Found",
    }
  }else{
    return{
      status: 200,
      message: "Quiz found",
      Quiz: Quiz
    }
  }
  }catch(error){
    log.info(error)
    return {
      status: 500,
      message: `error due to: ${error.message}`,
    };
  }
};




module.exports = {
  createQuiz,
  submitQuiz,
  getQuiz,
  
};
